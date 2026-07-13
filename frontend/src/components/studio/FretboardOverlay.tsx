"use client";

import { useStudioStore } from "@/stores/studio";
import { generateScale } from "@/lib/theory/scales";
import { STANDARD_TUNING, FRET_COUNT, STRING_COUNT } from "@/constants/music";
import { noteToIndex } from "@/lib/theory/transposition";

export default function FretboardOverlay() {
  const { song } = useStudioStore();
  if (!song) return null;

  const { key, scale } = song.metadata;
  const scalePattern = generateScale(key, scale);
  const scaleNoteSet = new Set(scalePattern.notes);

  const fretsToShow = 15;
  const stringSpacing = 24;
  const fretSpacing = 36;
  const padding = { top: 20, left: 40, right: 20 };

  const width = padding.left + fretsToShow * fretSpacing + padding.right;
  const height = padding.top + (STRING_COUNT - 1) * stringSpacing + 30;

  return (
    <div className="bg-bg-secondary rounded-xl border border-bg-tertiary p-4">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
        {key} {scale} Scale — Fretboard
      </h3>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-lg mx-auto">
        {Array.from({ length: STRING_COUNT }).map((_, si) => {
          const y = padding.top + si * stringSpacing;
          return (
            <line
              key={`string-${si}`}
              x1={padding.left}
              y1={y}
              x2={padding.left + fretsToShow * fretSpacing}
              y2={y}
              stroke={si === 0 ? "#FFB703" : "#A0AEC0"}
              strokeWidth={1.5 + (5 - si) * 0.4}
            />
          );
        })}

        {Array.from({ length: fretsToShow + 1 }).map((_, fi) => {
          const x = padding.left + fi * fretSpacing;
          return (
            <line
              key={`fret-${fi}`}
              x1={x}
              y1={padding.top}
              x2={x}
              y2={padding.top + (STRING_COUNT - 1) * stringSpacing}
              stroke={fi === 0 ? "#FFB703" : "#2A2A2A"}
              strokeWidth={fi === 0 ? 3 : 1}
            />
          );
        })}

        {Array.from({ length: STRING_COUNT }).map((_, si) =>
          Array.from({ length: fretsToShow }).map((_, fi) => {
            const openNote = STANDARD_TUNING[si];
            const openIdx = noteToIndex(openNote);
            const fretNoteIdx = (openIdx + fi + 1) % 12;
            const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
            const note = noteNames[fretNoteIdx];
            const inScale = scaleNoteSet.has(note);

            if (!inScale) return null;

            const cx = padding.left + (fi + 1) * fretSpacing;
            const cy = padding.top + si * stringSpacing;

            return (
              <g key={`dot-${si}-${fi}`}>
                <circle cx={cx} cy={cy} r={8} fill="#FFB703" opacity={0.2} />
                <text
                  x={cx}
                  y={cy + 3}
                  textAnchor="middle"
                  fill="#FFB703"
                  fontSize="8"
                  fontWeight="600"
                >
                  {note}
                </text>
              </g>
            );
          })
        )}

        {[3, 5, 7, 9, 12].includes(fretsToShow) &&
          Array.from({ length: Math.floor(fretsToShow / 12) + 1 }).map((_, i) => {
            const fretNum = i * 12 + (fretsToShow <= 12 ? 0 : 12);
            if (fretNum === 0 || fretNum > fretsToShow) return null;
            return (
              <text
                key={`fretnum-${i}`}
                x={padding.left + fretNum * fretSpacing}
                y={padding.top + (STRING_COUNT - 1) * stringSpacing + 20}
                textAnchor="middle"
                fill="#6B7280"
                fontSize="9"
              >
                {fretNum}
              </text>
            );
          })}
      </svg>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {scalePattern.notes.map((note, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded text-xs font-mono bg-accent-amber/10 text-accent-amber"
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}
