"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroRef.current.style.setProperty("--mouse-x", `${x}%`);
      heroRef.current.style.setProperty("--mouse-y", `${y}%`);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, #7F5AF0 0%, transparent 70%)",
            top: "var(--mouse-y, 30%)",
            left: "var(--mouse-x, 50%)",
            transform: "translate(-50%, -50%)",
            transition: "top 0.8s ease-out, left 0.8s ease-out",
          }}
        />
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-[100px] animate-float top-[60%] left-[20%] bg-mint" />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] animate-float top-[20%] right-[10%] bg-violet-light delay-300" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(127,90,240,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127,90,240,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-primary/30 bg-violet-primary/10 mb-8 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
          <span className="text-xs font-medium text-violet-light">
            Now in public beta — join 2,400+ designers
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-up delay-100">
          From prompt to{" "}
          <span className="text-gradient">production</span>
          <br />
          in one flow
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-fade-up delay-200 leading-relaxed">
          The AI-powered creative platform that connects your design tools.
          Generate UI, sync to Figma, trigger motion, export — all from one
          workspace.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up delay-300">
          <a
            href="/dashboard"
            className="group relative px-8 py-3.5 bg-violet-primary hover:bg-violet-hover text-white font-medium rounded-xl transition-all hover:shadow-2xl hover:shadow-violet-primary/30 hover:scale-[1.02]"
          >
            <span className="relative z-10">Start building for free</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-primary to-mint opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 ml-2">→</span>
          </a>
          <a
            href="#workflow"
            className="px-8 py-3.5 border border-border-subtle text-text-secondary hover:text-text-primary hover:border-text-muted font-medium rounded-xl transition-all"
          >
            See how it works
          </a>
        </div>

        {/* Dashboard Preview */}
        <div className="relative max-w-4xl mx-auto animate-fade-up delay-400">
          <div className="relative rounded-xl overflow-hidden border border-border-default glow-violet">
            {/* Mock Dashboard */}
            <div className="bg-bg-secondary p-1">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-primary rounded-t-lg">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-danger/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-mint/60" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-text-muted font-mono">
                    app.designflow.io/workspace
                  </span>
                </div>
              </div>
              {/* Dashboard content mockup */}
              <div className="bg-bg-primary p-6 rounded-b-lg">
                <div className="flex gap-4">
                  {/* Sidebar mock */}
                  <div className="w-48 space-y-2 hidden sm:block">
                    {["Projects", "Workspace", "Figma Sync", "Motion", "Settings"].map((item, i) => (
                      <div
                        key={item}
                        className={`px-3 py-2 rounded-lg text-xs ${
                          i === 1
                            ? "bg-violet-primary/15 text-violet-light"
                            : "text-text-muted"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  {/* Main area mock */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-bg-surface border border-border-default">
                      <span className="text-violet-primary">✦</span>
                      <span className="text-sm text-text-muted">
                        Create a modern SaaS landing page with dark theme...
                      </span>
                      <span className="ml-auto text-xs bg-violet-primary/20 text-violet-light px-2.5 py-1 rounded-md">
                        ⌘ Enter
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { label: "Hero Section", color: "from-violet-primary/20 to-transparent" },
                        { label: "Feature Grid", color: "from-mint/20 to-transparent" },
                        { label: "Pricing Cards", color: "from-violet-light/20 to-transparent" },
                      ].map((card) => (
                        <div
                          key={card.label}
                          className={`rounded-lg p-4 bg-gradient-to-b ${card.color} border border-border-default`}
                        >
                          <div className="w-full h-16 rounded bg-bg-elevated mb-2" />
                          <span className="text-xs text-text-secondary">{card.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Reflection glow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-violet-primary/10 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  );
}
