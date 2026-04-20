"use client";

import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For individuals exploring AI-powered design.",
    features: [
      "3 projects",
      "50 AI prompts / month",
      "Basic templates",
      "Community support",
      "1 GB cloud storage",
    ],
    cta: "Start free",
    highlighted: false,
    gradient: "",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For professionals who ship design daily.",
    features: [
      "Unlimited projects",
      "500 AI prompts / month",
      "Figma Sync",
      "AE Motion connector",
      "Priority support",
      "50 GB cloud storage",
      "Custom templates",
      "Version history",
    ],
    cta: "Get Pro",
    highlighted: true,
    gradient: "from-violet-primary to-mint",
    badge: "Most Popular",
  },
  {
    name: "Team",
    price: "$49",
    period: "/seat/month",
    description: "For agencies and teams that move fast.",
    features: [
      "Everything in Pro",
      "Unlimited AI prompts",
      "Team collaboration",
      "Shared template library",
      "Analytics dashboard",
      "SSO & admin controls",
      "200 GB cloud storage",
      "Dedicated support",
    ],
    cta: "Start team trial",
    highlighted: false,
    gradient: "",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-primary mb-4 block">
          Pricing
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          Simple pricing,{" "}
          <span className="text-gradient">powerful tools</span>
        </h2>
        <p className="text-lg text-text-secondary leading-relaxed mb-8">
          Start free. Upgrade when you need more power.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-bg-secondary border border-border-default rounded-full p-1">
          <button
            className={`px-5 py-2 rounded-full text-sm transition-all ${
              !annual
                ? "bg-violet-primary text-white"
                : "text-text-muted hover:text-text-secondary"
            }`}
            onClick={() => setAnnual(false)}
          >
            Monthly
          </button>
          <button
            className={`px-5 py-2 rounded-full text-sm transition-all ${
              annual
                ? "bg-violet-primary text-white"
                : "text-text-muted hover:text-text-secondary"
            }`}
            onClick={() => setAnnual(true)}
          >
            Annual
            <span className="ml-1.5 text-[10px] text-mint font-medium">
              -20%
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-8 transition-all duration-300 ${
              plan.highlighted
                ? "bg-bg-secondary border-2 border-violet-primary/50 scale-[1.02] shadow-2xl shadow-violet-primary/10"
                : "bg-bg-secondary border border-border-default hover:border-border-subtle"
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-violet-primary to-mint rounded-full text-xs font-semibold text-white">
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-sm text-text-muted mb-4">
                {plan.description}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">
                  {plan.price === "$0"
                    ? "$0"
                    : annual
                    ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}`
                    : plan.price}
                </span>
                <span className="text-text-muted text-sm">{plan.period}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="mt-0.5 flex-shrink-0"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke={plan.highlighted ? "#7F5AF0" : "#2A2A3C"}
                      strokeWidth="1"
                    />
                    <path
                      d="M5 8l2 2 4-4"
                      stroke={plan.highlighted ? "#7F5AF0" : "#525868"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${
                plan.highlighted
                  ? "bg-violet-primary hover:bg-violet-hover text-white shadow-lg shadow-violet-primary/20 hover:shadow-xl hover:shadow-violet-primary/30"
                  : "border border-border-subtle text-text-secondary hover:text-text-primary hover:border-text-muted"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
