"use client";

export default function StatsBar() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-bg-secondary rounded-lg border border-bg-tertiary p-4">
        <p className="text-2xl font-bold text-accent-amber">15</p>
        <p className="text-sm text-text-primary mt-1">Lessons Available</p>
        <p className="text-xs text-text-secondary mt-0.5">all unlocked</p>
      </div>
      <div className="bg-bg-secondary rounded-lg border border-bg-tertiary p-4">
        <p className="text-2xl font-bold text-accent-amber">3</p>
        <p className="text-sm text-text-primary mt-1">Tracks</p>
        <p className="text-xs text-text-secondary mt-0.5">Beginner to Advanced</p>
      </div>
      <div className="bg-bg-secondary rounded-lg border border-bg-tertiary p-4">
        <p className="text-2xl font-bold text-accent-amber">30+</p>
        <p className="text-sm text-text-primary mt-1">Chords</p>
        <p className="text-xs text-text-secondary mt-0.5">in the library</p>
      </div>
    </div>
  );
}
