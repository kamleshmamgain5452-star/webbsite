"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  artifacts?: { name: string; type: string }[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Welcome to DesignFlow Workspace. Integrated with Groq for low-latency generation. Choose your preferred model and describe what you'd like to create.",
    timestamp: "Just now",
  },
];

const groqModels = [
  { id: "deepseek-r1-distill-llama-70b", name: "DeepSeek R1 (Reasoning)" },
  { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B (Fast)" },
  { id: "llama-3.3-70b-specdec", name: "Llama 3.3 70B (SpecDec)" },
  { id: "llama-3.1-70b-versatile", name: "Llama 3.1 70B" },
  { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B (Instant)" },
  { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B" },
  { id: "gemma2-9b-it", name: "Gemma 2 9B" },
];

const suggestions = [
  "Create a pricing page with 3 tiers",
  "Build a SaaS dashboard layout",
  "Design a mobile onboarding flow",
  "Generate a design system with tokens",
];

export default function WorkspacePage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedModel, setSelectedModel] = useState(groqModels[0].id);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [sessionKey, setSessionKey] = useState(process.env.NEXT_PUBLIC_DEFAULT_SESSION_KEY || "default-session-key");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Establish WebSocket connection to the Relay Server
    const relayUrl = process.env.NEXT_PUBLIC_RELAY_URL || "wss://connector-production-cc6f.up.railway.app";
    const ws = new WebSocket(relayUrl);

    ws.onopen = () => {
      console.log("Connected to DesignFlow Relay ✓");
      // Register this browser tab
      ws.send(JSON.stringify({
        type: "register_browser",
        sessionKey: sessionKey
      }));
      setSocket(ws);
      setPulse(true);
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        console.log("Relay message:", msg);
      } catch (err) {
        console.error("Failed to parse relay message", err);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from Relay");
      setSocket(null);
      setPulse(false);
    };

    return () => ws.close();
  }, [sessionKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const pushToFigma = async (description: string) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      alert("Not connected to the relay server. Make sure node cloud-relay.js is running.");
      return;
    }

    // Step 1: Convert the text description into executable Figma API code
    try {
      const res = await fetch("/api/figma-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await res.json();

      if (data.error) {
        alert("Failed to generate Figma script: " + data.error);
        return;
      }

      // Step 2: Send the executable script to the relay → connector → Figma plugin
      socket.send(JSON.stringify({
        type: "run_figma",
        sessionKey: sessionKey,
        script: data.script,
      }));

      // Pulse the sync indicator
      setPulse(true);
      setTimeout(() => setPulse(false), 2000);

      console.log("✅ Figma script sent to relay");
    } catch (err: any) {
      alert("Push to Figma failed: " + err.message);
    }
  };

  const handleSend = (text?: string) => {
    const content = text || input;
    if (!content.trim() || isGenerating) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);

    // Call Real Groq AI API
    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: content, model: selectedModel }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);

        const assistantMessage: Message = {
          id: messages.length + 2,
          role: "assistant",
          content: data.content,
          timestamp: data.timestamp,
          artifacts: [
            { name: "layout.tsx", type: "component" },
            { name: "tokens.json", type: "design-tokens" },
          ],
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsGenerating(false);
      })
      .catch((err) => {
        const errorMessage: Message = {
          id: messages.length + 2,
          role: "assistant",
          content: `Error: ${err.message}. Make sure your GROQ_API_KEY is set in Vercel.`,
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsGenerating(false);
      });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Connection Status & Model Selector */}
      <div className="mb-6 flex items-center justify-between px-4 py-2 bg-bg-surface border border-border-default rounded-xl">
        <div className="flex items-center gap-6">
          {/* Connection Status */}
          <div className="flex items-center gap-3 border-r border-border-default pr-6">
            <div className="relative">
              <div className={`w-2.5 h-2.5 rounded-full ${pulse ? 'bg-mint' : 'bg-text-muted'}`} />
              {pulse && <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-mint animate-ping opacity-40" />}
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted leading-none mb-1">
                Live Sync
              </div>
              <div className="text-xs font-semibold text-text-secondary">
                Linked to Studio: <span className="text-violet-light">{sessionKey}</span>
              </div>
            </div>
          </div>

          {/* Model Selector */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted leading-none mb-1">
              AI Engine (Groq)
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-transparent border-none text-xs font-semibold text-text-primary focus:outline-none cursor-pointer hover:text-violet-light transition-colors"
            >
              {groqModels.map((m) => (
                <option key={m.id} value={m.id} className="bg-bg-secondary text-text-primary">
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <div className="text-[9px] text-text-muted uppercase font-bold tracking-tighter">Latency</div>
            <div className="text-xs font-mono text-mint">12ms</div>
          </div>
          <button className="px-3 py-1 bg-bg-primary hover:bg-bg-secondary border border-border-default rounded-md text-[10px] font-bold text-text-secondary transition-all">
            Disconnect
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-primary to-mint flex items-center justify-center flex-shrink-0 mt-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
            )}

            <div
              className={`max-w-2xl ${
                msg.role === "user"
                  ? "bg-violet-primary/15 border border-violet-primary/20 rounded-2xl rounded-tr-md px-5 py-3"
                  : "bg-bg-secondary border border-border-default rounded-2xl rounded-tl-md px-5 py-4"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {msg.content}
              </p>

              {/* Artifacts */}
              {msg.artifacts && (
                <div className="mt-4 space-y-2">
                  <span className="text-xs text-text-muted font-medium uppercase tracking-wider">
                    Generated files
                  </span>
                  {msg.artifacts.map((artifact) => (
                    <div
                      key={artifact.name}
                      className="flex items-center gap-3 px-3 py-2 bg-bg-primary rounded-lg border border-border-default"
                    >
                      <div className="w-7 h-7 rounded bg-bg-surface flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-violet-light"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-mono text-text-primary">
                          {artifact.name}
                        </span>
                        <span className="text-[10px] text-text-muted ml-2">
                          {artifact.type}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={() => pushToFigma(msg.content)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-primary/15 text-violet-light text-xs rounded-lg hover:bg-violet-primary/25 transition-all"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                      </svg>
                      Push to Figma
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-mint/15 text-mint text-xs rounded-lg hover:bg-mint/25 transition-all">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                      Queue motion
                    </button>
                  </div>
                </div>
              )}

              <span className="text-[10px] text-text-muted mt-2 block">
                {msg.timestamp}
              </span>
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-primary to-violet-light flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold text-white">
                JD
              </div>
            )}
          </div>
        ))}

        {/* Generating indicator */}
        {isGenerating && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-primary to-mint flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div className="bg-bg-secondary border border-border-default rounded-2xl rounded-tl-md px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-violet-primary animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-violet-primary animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-violet-primary animate-bounce delay-200" />
                </div>
                <span className="text-xs text-text-muted">Generating design...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="px-4 py-2 bg-bg-surface border border-border-default rounded-xl text-xs text-text-secondary hover:text-text-primary hover:border-violet-primary/30 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3 items-end bg-bg-secondary border border-border-default rounded-xl p-3">
        <div className="flex-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe what you want to design..."
            className="w-full bg-transparent text-sm resize-none focus:outline-none placeholder:text-text-muted max-h-32"
            rows={1}
          />
        </div>
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isGenerating}
          className="flex-shrink-0 p-2.5 bg-violet-primary hover:bg-violet-hover text-white rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
