"use client";

import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-mint/30 bg-mint/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
          <span className="text-xs font-medium text-mint">
            Limited beta — 200 spots remaining
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          Ready to transform{" "}
          <span className="text-gradient">your workflow?</span>
        </h2>
        <p className="text-lg text-text-secondary mb-10 leading-relaxed">
          Join the designers and agencies already using DesignFlow to ship 10×
          faster. No credit card required.
        </p>

        {/* Email form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full sm:flex-1 px-5 py-3.5 bg-bg-secondary border border-border-default rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-violet-primary/50 focus:ring-1 focus:ring-violet-primary/20 transition-all"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-violet-primary hover:bg-violet-hover text-white font-medium rounded-xl transition-all hover:shadow-xl hover:shadow-violet-primary/30 hover:scale-[1.02] whitespace-nowrap"
            >
              Join waitlist →
            </button>
          </form>
        ) : (
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-mint/10 border border-mint/30 rounded-xl">
            <span className="text-mint text-lg">✓</span>
            <span className="text-sm text-text-primary">
              You&apos;re on the list. We&apos;ll reach out soon.
            </span>
          </div>
        )}

        <p className="text-xs text-text-muted mt-6">
          Free tier included · No spam · Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}
