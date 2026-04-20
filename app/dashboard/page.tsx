"use client";

import { useState } from "react";
import Link from "next/link";

const mockProjects = [
  {
    id: 1,
    name: "Acme Landing Page",
    description: "Complete redesign of the Acme Corp landing page with AI-generated components",
    status: "In Progress",
    lastModified: "2 hours ago",
    components: 12,
    gradient: "from-violet-primary to-[#00D4FF]",
  },
  {
    id: 2,
    name: "E-commerce Dashboard",
    description: "Admin dashboard for managing products, orders, and customers",
    status: "Done",
    lastModified: "1 day ago",
    components: 24,
    gradient: "from-mint to-[#00D4FF]",
  },
  {
    id: 3,
    name: "Mobile Banking App",
    description: "Fintech mobile app screens — onboarding, transactions, portfolio",
    status: "In Progress",
    lastModified: "3 hours ago",
    components: 18,
    gradient: "from-[#FF6B6B] to-warning",
  },
  {
    id: 4,
    name: "Design System v2",
    description: "Updated design system tokens, components, and documentation",
    status: "Draft",
    lastModified: "5 days ago",
    components: 36,
    gradient: "from-violet-light to-violet-primary",
  },
  {
    id: 5,
    name: "SaaS Onboarding Flow",
    description: "Multi-step onboarding screens with progress tracking and personalization",
    status: "In Progress",
    lastModified: "30 min ago",
    components: 8,
    gradient: "from-mint to-violet-primary",
  },
  {
    id: 6,
    name: "Marketing Website",
    description: "Agency portfolio site with case studies and contact forms",
    status: "Draft",
    lastModified: "1 week ago",
    components: 15,
    gradient: "from-[#FF6B6B] to-violet-primary",
  },
];

const statusColors: Record<string, string> = {
  "In Progress": "text-violet-light bg-violet-primary/15",
  Done: "text-mint bg-mint/15",
  Draft: "text-text-muted bg-bg-elevated",
};

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-sm text-text-muted mt-1">
            {mockProjects.length} projects · 3 in progress
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center bg-bg-surface border border-border-default rounded-lg p-0.5">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-md transition-all ${view === "grid" ? "bg-bg-elevated text-text-primary" : "text-text-muted"}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-md transition-all ${view === "list" ? "bg-bg-elevated text-text-primary" : "text-text-muted"}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>

          {/* New Project */}
          <Link
            href="/dashboard/workspace"
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-primary hover:bg-violet-hover text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-violet-primary/25"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New project
          </Link>
        </div>
      </div>

      {/* Project grid */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            : "space-y-3"
        }
      >
        {mockProjects.map((project) => (
          <Link
            key={project.id}
            href="/dashboard/workspace"
            className={`group block bg-bg-secondary border border-border-default rounded-xl hover:border-violet-primary/30 transition-all duration-300 overflow-hidden ${
              view === "list" ? "flex items-center" : ""
            }`}
          >
            {/* Color strip */}
            <div
              className={`${view === "grid" ? "h-1.5 w-full" : "w-1.5 self-stretch"} bg-gradient-to-r ${project.gradient}`}
            />
            <div className={`p-5 ${view === "list" ? "flex items-center gap-6 flex-1" : ""}`}>
              <div className={view === "list" ? "flex-1" : ""}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm group-hover:text-violet-light transition-colors">
                    {project.name}
                  </h3>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-text-muted line-clamp-2 mb-3">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>{project.components} components</span>
                <span>{project.lastModified}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
