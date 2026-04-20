"use client";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "AI Prompt Workspace",
    description:
      "Describe what you want to build in natural language. DesignFlow generates production-ready UI components, layouts, and complete page designs.",
    gradient: "from-violet-primary to-violet-light",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Figma Sync",
    description:
      "One-click push to Figma. Your AI-generated designs appear directly on canvas — frames, styles, auto-layout, and all. No copy-paste ever.",
    gradient: "from-[#0ACF83] to-[#A259FF]",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
    title: "Motion Pipeline",
    description:
      "Connect designs to After Effects automatically. Trigger animation workflows, generate motion scripts, and export production-ready assets.",
    gradient: "from-[#00D4FF] to-violet-primary",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: "Template Library",
    description:
      "Start from battle-tested templates — landing pages, dashboards, design systems, onboarding flows. Customize everything with AI assistance.",
    gradient: "from-mint to-[#00D4FF]",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Team Collaboration",
    description:
      "Shared projects, real-time sync, design reviews, and handoffs. Built for agencies and teams that move fast together.",
    gradient: "from-warning to-[#FF6B6B]",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Analytics & Insights",
    description:
      "Track design velocity, prompt usage, team productivity, and project timelines. See exactly where your creative pipeline stands.",
    gradient: "from-[#FF6B6B] to-violet-primary",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      {/* Section header */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-primary mb-4 block">
          Features
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          Everything you need to{" "}
          <span className="text-gradient">ship design faster</span>
        </h2>
        <p className="text-lg text-text-secondary leading-relaxed">
          One platform to replace your fragmented workflow of 10 different tools.
          Generate, sync, animate, and deliver — all connected.
        </p>
      </div>

      {/* Feature grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="group relative bg-bg-secondary border border-border-default rounded-2xl p-7 hover:border-violet-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-primary/5"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon */}
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 text-white group-hover:scale-110 transition-transform duration-300`}
            >
              {feature.icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold mb-2.5 text-text-primary">
              {feature.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {feature.description}
            </p>

            {/* Hover glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-gradient-to-br from-violet-primary/5 to-transparent" />
          </div>
        ))}
      </div>
    </section>
  );
}
