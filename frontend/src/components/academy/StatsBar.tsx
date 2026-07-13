"use client";

const stats = [
  { label: "Lessons Completed", value: 3, sub: "of 15 total" },
  { label: "Practice Streak", value: 0, sub: "days in a row" },
  { label: "Chords Learned", value: 12, sub: "out of 40+" },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-bg-secondary rounded-lg border border-bg-tertiary p-4 hover:border-accent-amber/20 transition-colors"
        >
          <p className="text-2xl font-bold text-accent-amber">{stat.value}</p>
          <p className="text-sm text-text-primary mt-1">{stat.label}</p>
          <p className="text-xs text-text-secondary mt-0.5">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
}
