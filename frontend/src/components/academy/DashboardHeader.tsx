"use client";

export default function DashboardHeader() {
  return (
    <div className="bg-bg-secondary rounded-lg border border-bg-tertiary p-5 mb-8">
    <div className="space-y-1">
      <p className="text-xs tracking-widest uppercase text-text-secondary">Welcome</p>
      <h1 className="text-3xl font-bold text-text-primary tracking-tight">
        Guitar Academy
      </h1>
      <p className="text-sm text-text-secondary">
        Open lessons &mdash; pick up and play at your own pace
      </p>
    </div>
    </div>
  );
}
