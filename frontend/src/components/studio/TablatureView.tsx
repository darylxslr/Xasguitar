"use client";

import { useStudioStore } from "@/stores/studio";

export default function TablatureView() {
  const { song, getDisplayChords } = useStudioStore();
  const chords = getDisplayChords();

  if (!song) return null;

  const strings = ["e|", "B|", "G|", "D|", "A|", "E|"];

  return (
    <div className="bg-bg-secondary rounded-xl border border-bg-tertiary p-4 overflow-x-auto">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
        Tablature
      </h3>

      <div className="font-mono text-xs leading-relaxed">
        {chords.length > 0 && (
          <div className="flex gap-4 mb-2 text-accent-amber font-semibold">
            {chords.slice(0, 8).map((c, i) => (
              <span key={i} className="w-12 text-center">{c.chord}</span>
            ))}
          </div>
        )}

        {strings.map((stringLabel, si) => (
          <div key={si} className="flex items-center gap-2">
            <span className="text-text-muted w-6 shrink-0 text-right">{stringLabel}</span>
            <span className="text-text-primary tracking-widest">
              {"-" .repeat(si === 0 ? 48 : 48)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3 text-text-muted text-xs">
        <span>↓ downstroke</span>
        <span>↑ upstroke</span>
        <span className="text-accent-amber">● muted</span>
      </div>
    </div>
  );
}
