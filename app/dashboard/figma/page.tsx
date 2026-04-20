"use client";

import { useState } from "react";

interface FigmaFrame {
  id: string;
  name: string;
  size: string;
  synced: boolean;
  lastSync: string;
}

const mockFrames: FigmaFrame[] = [
  { id: "1", name: "Hero Section — Landing", size: "1440 × 900", synced: true, lastSync: "2 min ago" },
  { id: "2", name: "Feature Grid", size: "1440 × 1200", synced: true, lastSync: "5 min ago" },
  { id: "3", name: "Pricing Cards", size: "1440 × 800", synced: false, lastSync: "Pending" },
  { id: "4", name: "Dashboard — Overview", size: "1440 × 1024", synced: true, lastSync: "1 hour ago" },
  { id: "5", name: "Mobile — Onboarding", size: "390 × 844", synced: false, lastSync: "Not synced" },
];

export default function FigmaPage() {
  const [connected, setConnected] = useState(true);

  return (
    <div>
      {/* Connection card */}
      <div className="bg-bg-secondary border border-border-default rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Figma icon */}
            <div className="w-12 h-12 rounded-xl bg-bg-surface flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 38 57">
                <path fill="#0ACF83" d="M19 57c5.523 0 10-4.477 10-10V38H19c-5.523 0-10 4.477-10 10s4.477 10 10 10z"/>
                <path fill="#A259FF" d="M9 28.5c0-5.523 4.477-10 10-10h10v20H19c-5.523 0-10-4.477-10-10z"/>
                <path fill="#F24E1E" d="M9 9.5C9 3.977 13.477-.5 19-.5h10v20H19C13.477 19.5 9 15.023 9 9.5z"/>
                <path fill="#FF7262" d="M19 -.5h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H19V-.5z"/>
                <path fill="#1ABCFE" d="M39 28.5c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Figma Connection</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${connected ? 'bg-mint animate-pulse' : 'bg-text-muted'}`} />
                <span className="text-xs text-text-muted">
                  {connected ? "Connected via DesignFlow plugin" : "Not connected"}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setConnected(!connected)}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              connected
                ? "border border-border-default text-text-muted hover:border-danger hover:text-danger"
                : "bg-violet-primary hover:bg-violet-hover text-white"
            }`}
          >
            {connected ? "Disconnect" : "Connect"}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Frames", value: "5", icon: "□" },
          { label: "Synced", value: "3", icon: "✓" },
          { label: "Pending", value: "2", icon: "⟳" },
          { label: "Last Sync", value: "2m", icon: "⏱" },
        ].map((stat) => (
          <div key={stat.label} className="bg-bg-secondary border border-border-default rounded-xl p-4">
            <span className="text-2xl font-bold">{stat.value}</span>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Frames list */}
      <div className="bg-bg-secondary border border-border-default rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border-default flex items-center justify-between">
          <h3 className="text-sm font-semibold">Design Frames</h3>
          <button className="text-xs text-violet-primary hover:text-violet-light transition-colors">
            Sync all →
          </button>
        </div>
        <div className="divide-y divide-border-default">
          {mockFrames.map((frame) => (
            <div key={frame.id} className="flex items-center px-5 py-4 hover:bg-bg-surface/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-bg-surface border border-border-default flex items-center justify-center mr-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{frame.name}</p>
                <p className="text-xs text-text-muted">{frame.size}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-muted hidden sm:block">{frame.lastSync}</span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    frame.synced
                      ? "bg-mint/15 text-mint"
                      : "bg-warning/15 text-warning"
                  }`}
                >
                  {frame.synced ? "Synced" : "Pending"}
                </span>
                <button className="p-1.5 hover:bg-bg-surface rounded-lg transition-all text-text-muted hover:text-text-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10" />
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
