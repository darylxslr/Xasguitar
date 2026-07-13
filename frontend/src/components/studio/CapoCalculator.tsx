"use client";

import { useStudioStore } from "@/stores/studio";
import { recommendCapo } from "@/lib/theory/capo";

export default function CapoCalculator() {
  const { song } = useStudioStore();
  if (!song) return null;

  const chords = song.chordTimeline.map((c) => c.chord);
  const uniqueChords = [...new Set(chords)];
  const suggestions = recommendCapo(uniqueChords, song.metadata.key);

  if (suggestions.length === 0) {
    return (
      <div className="bg-bg-secondary rounded-xl border border-bg-tertiary p-4">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
          Capo Calculator
        </h3>
        <p className="text-text-secondary text-sm">
          This song already uses beginner-friendly open shapes.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary rounded-xl border border-bg-tertiary p-4">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
        Capo Calculator
      </h3>

      <div className="space-y-3">
        {suggestions.map((s, i) => (
          <div
            key={i}
            className="bg-bg-tertiary rounded-lg p-3 border border-bg-tertiary"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-accent-amber font-bold text-sm">
                Capo {s.capoFret === 1 ? "Fret 1" : `Fret ${s.capoFret}`}
              </span>
              <span className="text-xs text-text-muted">recommended</span>
            </div>
            <p className="text-text-secondary text-sm mb-2">{s.explanation}</p>
            <div className="flex flex-wrap gap-1.5">
              {s.simplifiedChords.slice(0, 6).map((chord, ci) => (
                <span
                  key={ci}
                  className="px-2 py-0.5 rounded text-xs font-mono bg-accent-cyan/10 text-accent-cyan"
                >
                  {chord}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
