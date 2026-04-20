"use client";

const steps = [
  {
    num: "01",
    title: "Describe your vision",
    description:
      "Type a natural language prompt — \"Create a pricing page with 3 tiers\" or \"Build a dashboard for SaaS analytics\".",
    visual: (
      <div className="bg-bg-primary rounded-lg p-4 border border-border-default space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-violet-primary text-sm">✦</span>
          <span className="text-xs text-text-muted font-mono">AI Workspace</span>
        </div>
        <div className="bg-bg-surface rounded-md px-3 py-2.5 border border-border-default">
          <span className="text-sm text-text-secondary">
            Create a modern pricing page with free, pro, and enterprise tiers.
            Use a dark theme with violet accents.
          </span>
        </div>
        <div className="flex justify-end">
          <div className="px-3 py-1.5 bg-violet-primary rounded-md text-xs text-white">
            Generate →
          </div>
        </div>
      </div>
    ),
  },
  {
    num: "02",
    title: "AI generates your design",
    description:
      "DesignFlow's AI understands design patterns, layout systems, and modern aesthetics. It generates real, editable design output in seconds.",
    visual: (
      <div className="bg-bg-primary rounded-lg p-4 border border-border-default space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-mint font-medium">● Generating...</span>
          <span className="text-xs text-text-muted">3 components</span>
        </div>
        <div className="space-y-2">
          {["Header component", "Pricing grid", "CTA section"].map((item, i) => (
            <div key={item} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${i < 2 ? 'bg-mint/20 text-mint' : 'bg-violet-primary/20 text-violet-light'}`}>
                {i < 2 ? '✓' : '⟳'}
              </div>
              <span className="text-sm text-text-secondary">{item}</span>
              <div className="ml-auto h-1 rounded-full bg-bg-surface w-16 overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r from-violet-primary to-mint`} style={{ width: i === 0 ? '100%' : i === 1 ? '100%' : '60%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "03",
    title: "Push to Figma instantly",
    description:
      "One click sends your generated designs directly to Figma. Real frames, proper auto-layout, text styles, and components — not flat images.",
    visual: (
      <div className="bg-bg-primary rounded-lg p-4 border border-border-default space-y-3">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 38 57" className="text-[#A259FF]">
            <path fill="#0ACF83" d="M19 57c5.523 0 10-4.477 10-10V38H19c-5.523 0-10 4.477-10 10s4.477 10 10 10z"/>
            <path fill="#A259FF" d="M9 28.5c0-5.523 4.477-10 10-10h10v20H19c-5.523 0-10-4.477-10-10z"/>
            <path fill="#F24E1E" d="M9 9.5C9 3.977 13.477-.5 19-.5h10v20H19C13.477 19.5 9 15.023 9 9.5z"/>
            <path fill="#FF7262" d="M19 -.5h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H19V-.5z"/>
            <path fill="#1ABCFE" d="M39 28.5c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"/>
          </svg>
          <span className="text-xs text-text-secondary">Figma Sync</span>
          <span className="ml-auto text-xs text-mint">Connected ●</span>
        </div>
        <div className="bg-bg-surface rounded-md p-3 border border-mint/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-mint text-sm">✓</span>
            <span className="text-sm text-text-primary">Pushed 3 frames to Figma</span>
          </div>
          <span className="text-xs text-text-muted">pricing-page-v1 · 1,240 × 900</span>
        </div>
      </div>
    ),
  },
  {
    num: "04",
    title: "Trigger motion & export",
    description:
      "Connect to After Effects. Queue animation workflows, run motion scripts, and export production-ready assets — all from your browser.",
    visual: (
      <div className="bg-bg-primary rounded-lg p-4 border border-border-default space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#9999FF] flex items-center justify-center">
            <span className="text-[8px] text-white font-bold">Ae</span>
          </div>
          <span className="text-xs text-text-secondary">Motion Queue</span>
        </div>
        <div className="space-y-2">
          {[
            { name: "hero-entrance.jsx", status: "Done", color: "text-mint" },
            { name: "card-stagger.jsx", status: "Running", color: "text-violet-light" },
            { name: "cta-reveal.jsx", status: "Queued", color: "text-text-muted" },
          ].map((job) => (
            <div key={job.name} className="flex items-center gap-3 py-1.5 px-2 rounded bg-bg-surface/50">
              <span className="text-xs text-text-secondary font-mono flex-1 truncate">{job.name}</span>
              <span className={`text-xs ${job.color}`}>{job.status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-primary/5 rounded-full blur-[150px]" />

      <div className="max-w-3xl mx-auto text-center mb-20 relative">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mint mb-4 block">
          How it works
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          Four steps from{" "}
          <span className="text-gradient">idea to production</span>
        </h2>
        <p className="text-lg text-text-secondary leading-relaxed">
          A seamless pipeline that replaces hours of manual work with an
          automated flow you control with plain English.
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-primary/50 via-mint/30 to-transparent hidden sm:block" />

        {steps.map((step, index) => (
          <div
            key={step.num}
            className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20 last:mb-0 items-center ${
              index % 2 === 1 ? "md:direction-rtl" : ""
            }`}
          >
            {/* Text side */}
            <div className={`${index % 2 === 1 ? "md:order-2 md:text-left" : ""} md:direction-ltr`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-mono text-violet-primary font-semibold">
                  {step.num}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-violet-primary/30 to-transparent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Visual side */}
            <div className={`${index % 2 === 1 ? "md:order-1" : ""} md:direction-ltr`}>
              {step.visual}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
