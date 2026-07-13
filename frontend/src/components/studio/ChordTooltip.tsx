"use client";

import { getChordShape } from "@/lib/theory/voicings";
import { isBarreChord } from "@/lib/utils/chords";
import Link from "next/link";

interface ChordTooltipProps {
  chord: string;
}

export default function ChordTooltip({ chord }: ChordTooltipProps) {
  const shape = getChordShape(chord);
  const barre = isBarreChord(chord);

  return (
    <div className="min-w-48">
      <div className="text-center mb-2">
        <span className="text-lg font-bold font-mono text-accent-amber">
          {chord}
        </span>
      </div>

      {shape && (
        <div className="flex justify-center mb-3">
          <svg viewBox="0 0 120 160" className="w-28 h-36">
            <line x1="20" y1="20" x2="20" y2="140" stroke="#A0AEC0" strokeWidth="1.5" />
            <line x1="40" y1="20" x2="40" y2="140" stroke="#A0AEC0" strokeWidth="1.5" />
            <line x1="60" y1="20" x2="60" y2="140" stroke="#A0AEC0" strokeWidth="1.5" />
            <line x1="80" y1="20" x2="80" y2="140" stroke="#A0AEC0" strokeWidth="1.5" />
            <line x1="100" y1="20" x2="100" y2="140" stroke="#A0AEC0" strokeWidth="1.5" />

            <line x1="20" y1="30" x2="100" y2="30" stroke="#A0AEC0" strokeWidth="1.5" />
            <line x1="20" y1="50" x2="100" y2="50" stroke="#A0AEC0" strokeWidth="1.5" />
            <line x1="20" y1="70" x2="100" y2="70" stroke="#A0AEC0" strokeWidth="1.5" />
            <line x1="20" y1="90" x2="100" y2="90" stroke="#A0AEC0" strokeWidth="1.5" />
            <line x1="20" y1="110" x2="100" y2="110" stroke="#A0AEC0" strokeWidth="1.5" />

            <line x1="15" y1="20" x2="105" y2="20" stroke="#A0AEC0" strokeWidth="2.5" />

            {shape.positions
              .filter((p) => p.fret > 0)
              .map((p, i) => (
                <circle
                  key={i}
                  cx={20 + (5 - p.string) * 20}
                  cy={30 + (p.fret - 1) * 20}
                  r={6}
                  fill="#FFB703"
                />
              ))}
            {shape.positions
              .filter((p) => p.fret === 0)
              .map((p, i) => (
                <text
                  key={i}
                  x={20 + (5 - p.string) * 20}
                  y={14}
                  textAnchor="middle"
                  fill="#A0AEC0"
                  fontSize="10"
                >
                  O
                </text>
              ))}
          </svg>
        </div>
      )}

      {!shape && (
        <p className="text-text-muted text-xs text-center mb-2">
          {chord}
        </p>
      )}

      {barre && (
        <Link
          href="/academy/barre-chords"
          className="block text-center text-xs text-accent-amber hover:text-accent-amber/80 transition-colors mt-2 pt-2 border-t border-bg-secondary"
        >
          New to this shape? Watch the Barre Chord Guide →
        </Link>
      )}
    </div>
  );
}
