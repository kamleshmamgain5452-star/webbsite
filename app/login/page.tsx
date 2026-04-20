"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock auth — in production, connect to Supabase
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-bg-secondary overflow-hidden items-center justify-center">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-violet-primary/15 blur-[120px] top-1/4 left-1/4" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-mint/10 blur-[100px] bottom-1/4 right-1/4 animate-float" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(127,90,240,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(127,90,240,0.4) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-md px-12">
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-primary to-mint flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span className="text-xl font-semibold">
              Design<span className="text-violet-primary">Flow</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold mb-4 tracking-tight">
            Ship design at the speed of thought
          </h1>
          <p className="text-text-secondary leading-relaxed mb-8">
            One platform for AI generation, Figma sync, motion pipelines, and
            team collaboration. From prompt to production.
          </p>

          {/* Testimonial */}
          <div className="bg-bg-primary/40 backdrop-blur rounded-xl p-5 border border-border-default">
            <p className="text-sm text-text-secondary leading-relaxed italic mb-4">
              &quot;DesignFlow cut our design-to-handoff time from 3 days to 4
              hours. The AI workspace is genuinely magical.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-primary to-mint flex items-center justify-center text-xs font-bold text-white">
                SK
              </div>
              <div>
                <p className="text-sm font-medium">Sarah Kim</p>
                <p className="text-xs text-text-muted">
                  Design Lead, Acme Studios
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Auth form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-bg-primary">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link
            href="/"
            className="flex items-center gap-2 mb-10 lg:hidden"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-primary to-mint flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span className="text-lg font-semibold">
              Design<span className="text-violet-primary">Flow</span>
            </span>
          </Link>

          <h2 className="text-2xl font-bold mb-2">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-text-muted mb-8">
            {mode === "login"
              ? "Sign in to continue to your workspace"
              : "Start building with AI-powered design"}
          </p>

          {/* Google SSO */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-bg-secondary border border-border-default rounded-xl text-sm font-medium hover:border-border-subtle hover:bg-bg-surface transition-all mb-6">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-default" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-bg-primary text-text-muted">
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border-default rounded-xl text-sm focus:outline-none focus:border-violet-primary/50 focus:ring-1 focus:ring-violet-primary/20 transition-all placeholder:text-text-muted"
                  placeholder="Jane Designer"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-bg-secondary border border-border-default rounded-xl text-sm focus:outline-none focus:border-violet-primary/50 focus:ring-1 focus:ring-violet-primary/20 transition-all placeholder:text-text-muted"
                placeholder="you@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-bg-secondary border border-border-default rounded-xl text-sm focus:outline-none focus:border-violet-primary/50 focus:ring-1 focus:ring-violet-primary/20 transition-all placeholder:text-text-muted"
                placeholder="••••••••"
                required
              />
            </div>

            {mode === "login" && (
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-xs text-violet-primary hover:text-violet-light transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-violet-primary hover:bg-violet-hover text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-violet-primary/25"
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-sm text-text-muted text-center mt-6">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-violet-primary hover:text-violet-light transition-colors font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-violet-primary hover:text-violet-light transition-colors font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
