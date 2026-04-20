"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("Jane Designer");
  const [email, setEmail] = useState("jane@acmestudios.com");
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [desktopAutoLaunch, setDesktopAutoLaunch] = useState(true);

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-2">Settings</h2>
      <p className="text-sm text-text-muted mb-8">
        Manage your account and preferences
      </p>

      {/* Profile section */}
      <section className="mb-10">
        <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">
          Profile
        </h3>
        <div className="bg-bg-secondary border border-border-default rounded-xl p-6 space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-primary to-mint flex items-center justify-center text-lg font-bold text-white">
              JD
            </div>
            <div>
              <p className="text-sm font-medium">{name}</p>
              <button className="text-xs text-violet-primary hover:text-violet-light transition-colors">
                Change avatar
              </button>
            </div>
          </div>
          
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-bg-primary border border-border-default rounded-lg text-sm focus:outline-none focus:border-violet-primary/50 transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-bg-primary border border-border-default rounded-lg text-sm focus:outline-none focus:border-violet-primary/50 transition-all"
            />
          </div>

          <button className="px-4 py-2 bg-violet-primary hover:bg-violet-hover text-white text-sm font-medium rounded-lg transition-all">
            Save changes
          </button>
        </div>
      </section>

      {/* Preferences */}
      <section className="mb-10">
        <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">
          Preferences
        </h3>
        <div className="bg-bg-secondary border border-border-default rounded-xl divide-y divide-border-default">
          {/* Theme */}
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-text-muted mt-0.5">Choose your visual preference</p>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-bg-primary border border-border-default rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-primary/50"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium">Email notifications</p>
              <p className="text-xs text-text-muted mt-0.5">Receive updates about your projects</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-11 h-6 rounded-full transition-all ${notifications ? "bg-violet-primary" : "bg-bg-elevated"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${notifications ? "left-5.5" : "left-0.5"}`} style={{ left: notifications ? '22px' : '2px' }} />
            </button>
          </div>

          {/* Desktop auto-launch */}
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium">Auto-launch desktop connector</p>
              <p className="text-xs text-text-muted mt-0.5">Start the desktop app at system login</p>
            </div>
            <button
              onClick={() => setDesktopAutoLaunch(!desktopAutoLaunch)}
              className={`relative w-11 h-6 rounded-full transition-all ${desktopAutoLaunch ? "bg-violet-primary" : "bg-bg-elevated"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all`} style={{ left: desktopAutoLaunch ? '22px' : '2px' }} />
            </button>
          </div>
        </div>
      </section>

      {/* Subscription */}
      <section className="mb-10">
        <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">
          Subscription
        </h3>
        <div className="bg-bg-secondary border border-border-default rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Pro Plan</span>
                <span className="text-[10px] px-2 py-0.5 bg-violet-primary/15 text-violet-light rounded-full font-medium">Active</span>
              </div>
              <p className="text-xs text-text-muted mt-1">$15/month · Billed annually</p>
            </div>
            <button className="text-xs text-text-muted hover:text-text-secondary border border-border-default px-3 py-1.5 rounded-lg transition-all">
              Manage billing
            </button>
          </div>
          {/* Usage bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
              <span>AI Prompts used</span>
              <span>312 / 500</span>
            </div>
            <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-primary to-mint rounded-full" style={{ width: "62%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section>
        <h3 className="text-sm font-semibold text-danger mb-4 uppercase tracking-wider">
          Danger Zone
        </h3>
        <div className="bg-bg-secondary border border-danger/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-xs text-text-muted mt-0.5">Permanently delete your account and all data</p>
            </div>
            <button className="text-xs text-danger border border-danger/30 px-4 py-2 rounded-lg hover:bg-danger/10 transition-all">
              Delete account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
