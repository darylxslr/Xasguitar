"use client";

import { useState, useCallback } from "react";
import { STANDARD_TUNING, STRING_COUNT, FRET_COUNT, NOTES } from "@/constants/music";
import { noteToIndex, indexToNote } from "@/lib/theory/transposition";
import { Play, Music } from "lucide-react";

interface PlayedNote {
  string: number;
  fret: number;
  note: string;
}

export default function InteractiveFretboard() {
  const [playedNotes, setPlayedNotes] = useState<PlayedNote[]>([]);
  const [hovered, setHovered] = useState<{ string: number; fret: number } | null>(null);

  const fretsToShow = 12;
  const stringSpacing = 28;
  const fretSpacing = 40;
  const padding = { top: 30, left: 40, right: 20 };

  const width = padding.left + fretsToShow * fretSpacing + padding.right;
  const height = padding.top + (STRING_COUNT - 1) * stringSpacing + 10;

  const getNoteAt = useCallback((stringIdx: number, fret: number): string => {
    const openNote = STANDARD_TUNING[stringIdx];
    const openIdx = noteToIndex(openNote);
    return indexToNote(openIdx + fret);
  }, []);

  const handleClick = useCallback((stringIdx: number, fret: number) => {
    const note = getNoteAt(stringIdx, fret);
    const alreadyPlayed = playedNotes.find(
      (pn) => pn.string === stringIdx && pn.fret === fret
    );

    if (alreadyPlayed) {
      setPlayedNotes((prev) =>
        prev.filter((pn) => !(pn.string === stringIdx && pn.fret === fret))
      );
    } else {
      setPlayedNotes((prev) => [...prev, { string: stringIdx, fret, note }]);
    }
  }, [getNoteAt, playedNotes]);

  const isPlayed = (si: number, fi: number) =>
    playedNotes.some((pn) => pn.string === si && pn.fret === fi);

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {Array.from({ length: STRING_COUNT }).map((_, si) => {
          const y = padding.top + si * stringSpacing;
          return (
            <line
              key={`str-${si}`}
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
              key={`frt-${fi}`}
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
            const cx = padding.left + (fi + 1) * fretSpacing;
            const cy = padding.top + si * stringSpacing;
            const played = isPlayed(si, fi + 1);
            const isHovered =
              hovered?.string === si && hovered?.fret === fi + 1;

            return (
              <g
                key={`click-${si}-${fi}`}
                className="cursor-pointer"
                onClick={() => handleClick(si, fi + 1)}
                onMouseEnter={() => setHovered({ string: si, fret: fi + 1 })}
                onMouseLeave={() => setHovered(null)}
              >
                <rect
                  x={cx - fretSpacing / 2}
                  y={cy - stringSpacing / 2}
                  width={fretSpacing}
                  height={stringSpacing}
                  fill={played ? "#FFB703" : isHovered ? "#FFB703" : "transparent"}
                  opacity={played ? 0.2 : isHovered ? 0.1 : 0}
                  rx={4}
                />
                {played && (
                  <circle cx={cx} cy={cy} r={9} fill="#FFB703" />
                )}
                {played && (
                  <text
                    x={cx}
                    y={cy + 3}
                    textAnchor="middle"
                    fill="#121212"
                    fontSize="8"
                    fontWeight="700"
                  >
                    {getNoteAt(si, fi + 1)}
                  </text>
                )}
              </g>
            );
          })
        )}

        {[3, 5, 7, 9, 12].map((f) => {
          if (f > fretsToShow) return null;
          return (
            <text
              key={`dot-${f}`}
              x={padding.left + f * fretSpacing + fretSpacing / 2}
              y={padding.top + (STRING_COUNT - 1) * stringSpacing + 18}
              textAnchor="middle"
              fill="#6B7280"
              fontSize="8"
            >
              {f}
            </text>
          );
        })}
      </svg>

      {playedNotes.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
            <Music className="w-3 h-3" />
            <span>Played notes:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {playedNotes.map((pn, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-xs font-mono bg-accent-amber/10 text-accent-amber"
              >
                {pn.note} (str {pn.string + 1}, fret {pn.fret})
              </span>
            ))}
            <button
              onClick={() => setPlayedNotes([])}
              className="px-2 py-0.5 rounded text-xs text-text-muted hover:text-text-primary transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
