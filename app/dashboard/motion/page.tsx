"use client";

interface MotionJob {
  id: string;
  name: string;
  script: string;
  status: "completed" | "running" | "queued" | "failed";
  duration?: string;
  timestamp: string;
}

const mockJobs: MotionJob[] = [
  { id: "1", name: "Hero entrance animation", script: "hero-entrance.jsx", status: "completed", duration: "12s", timestamp: "5 min ago" },
  { id: "2", name: "Card stagger reveal", script: "card-stagger.jsx", status: "running", duration: "—", timestamp: "2 min ago" },
  { id: "3", name: "CTA pulse effect", script: "cta-pulse.jsx", status: "queued", timestamp: "Just now" },
  { id: "4", name: "Pricing slide-in", script: "pricing-slide.jsx", status: "queued", timestamp: "Just now" },
  { id: "5", name: "Logo morph transition", script: "logo-morph.jsx", status: "failed", duration: "3s", timestamp: "1 hour ago" },
  { id: "6", name: "Page scroll parallax", script: "scroll-parallax.jsx", status: "completed", duration: "8s", timestamp: "2 hours ago" },
];

const statusConfig: Record<string, { color: string; bg: string; label: string; dot: string }> = {
  completed: { color: "text-mint", bg: "bg-mint/15", label: "Done", dot: "bg-mint" },
  running: { color: "text-violet-light", bg: "bg-violet-primary/15", label: "Running", dot: "bg-violet-primary animate-pulse" },
  queued: { color: "text-text-muted", bg: "bg-bg-elevated", label: "Queued", dot: "bg-text-muted" },
  failed: { color: "text-danger", bg: "bg-danger/15", label: "Failed", dot: "bg-danger" },
};

export default function MotionPage() {
  const completedCount = mockJobs.filter((j) => j.status === "completed").length;
  const runningCount = mockJobs.filter((j) => j.status === "running").length;

  return (
    <div>
      {/* AE Connection */}
      <div className="bg-bg-secondary border border-border-default rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00005B] flex items-center justify-center">
              <span className="text-[#9999FF] font-bold text-sm">Ae</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">After Effects Connector</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                <span className="text-xs text-text-muted">
                  Desktop app connected · Watching for scripts
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-xs font-medium border border-border-default text-text-secondary rounded-lg hover:border-border-subtle transition-all">
              View logs
            </button>
            <button className="px-4 py-2 text-xs font-medium bg-violet-primary hover:bg-violet-hover text-white rounded-lg transition-all">
              Run all queued
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Jobs", value: mockJobs.length.toString() },
          { label: "Completed", value: completedCount.toString() },
          { label: "Running", value: runningCount.toString() },
          { label: "Success Rate", value: `${Math.round((completedCount / mockJobs.length) * 100)}%` },
        ].map((stat) => (
          <div key={stat.label} className="bg-bg-secondary border border-border-default rounded-xl p-4">
            <span className="text-2xl font-bold">{stat.value}</span>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Jobs list */}
      <div className="bg-bg-secondary border border-border-default rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border-default flex items-center justify-between">
          <h3 className="text-sm font-semibold">Motion Queue</h3>
          <button className="text-xs text-text-muted hover:text-text-primary transition-colors">
            Clear completed
          </button>
        </div>
        <div className="divide-y divide-border-default">
          {mockJobs.map((job) => {
            const config = statusConfig[job.status];
            return (
              <div
                key={job.id}
                className="flex items-center px-5 py-4 hover:bg-bg-surface/50 transition-all"
              >
                {/* Status dot */}
                <div className={`w-2.5 h-2.5 rounded-full ${config.dot} mr-4 flex-shrink-0`} />

                {/* Script icon */}
                <div className="w-9 h-9 rounded-lg bg-bg-surface border border-border-default flex items-center justify-center mr-4">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{job.name}</p>
                  <p className="text-xs text-text-muted font-mono">{job.script}</p>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4">
                  {job.duration && (
                    <span className="text-xs text-text-muted hidden sm:block">{job.duration}</span>
                  )}
                  <span className="text-xs text-text-muted hidden sm:block">{job.timestamp}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${config.bg} ${config.color}`}>
                    {config.label}
                  </span>
                  {job.status === "failed" && (
                    <button className="p-1.5 hover:bg-bg-surface rounded-lg transition-all text-text-muted hover:text-warning">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="1 4 1 10 7 10" />
                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
