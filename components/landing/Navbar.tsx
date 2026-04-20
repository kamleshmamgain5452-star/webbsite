"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border-default"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-primary to-mint flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="white"
              className="drop-shadow-sm"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Design<span className="text-violet-primary">Flow</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#workflow"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Pricing
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors px-4 py-2"
          >
            Log in
          </Link>
          <Link
            href="/dashboard"
            className="text-sm bg-violet-primary hover:bg-violet-hover text-white px-5 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-violet-primary/25"
          >
            Get started free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-0.5 bg-text-primary transition-all ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-text-primary transition-all ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-text-primary transition-all ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-primary/95 backdrop-blur-xl border-b border-border-default px-6 pb-6 space-y-4">
          <a
            href="#features"
            className="block text-sm text-text-secondary hover:text-text-primary"
          >
            Features
          </a>
          <a
            href="#workflow"
            className="block text-sm text-text-secondary hover:text-text-primary"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="block text-sm text-text-secondary hover:text-text-primary"
          >
            Pricing
          </a>
          <Link
            href="/login"
            className="block text-sm text-text-secondary hover:text-text-primary"
          >
            Log in
          </Link>
          <Link
            href="/dashboard"
            className="block text-sm bg-violet-primary text-white px-5 py-2.5 rounded-lg text-center"
          >
            Get started free
          </Link>
        </div>
      )}
    </nav>
  );
}
