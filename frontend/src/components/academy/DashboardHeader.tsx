"use client";

import { Play } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="bg-bg-secondary rounded-lg border border-bg-tertiary p-5 mb-8">
    <div className="flex items-center justify-between gap-6">
      <div className="space-y-1">
        <p className="text-xs tracking-widest uppercase text-text-secondary">Welcome back</p>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">
          Your Guitar Journey
        </h1>
        <p className="text-sm text-text-secondary">
          You&apos;ve completed{" "}
          <span className="text-accent-amber font-semibold">3 </span> of 15 lessons &mdash; keep the momentum!
        </p>
        <div className="w-full max-w-md h-3 bg-bg-tertiary rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-accent-amber rounded-full transition-all"
            style={{ width: "20%" }}
          />
        </div>
      </div>
      <div className="flex flex-col items-stretch gap-1 shrink-0">
        <button className="flex items-center justify-center gap-2 px-3 py-2 bg-accent-amber text-bg-primary text-sm font-bold rounded-lg hover:opacity-90 transition-opacity min-touch">
          <Play className="w-4 h-4" />
          Continue Last Lesson
        </button>
        <span className="text-xs text-text-secondary text-center">Next: Holding, Posture &amp; Tuning</span>
      </div>
    </div>
    </div>
  );
}
