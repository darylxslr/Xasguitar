"use client";

import { useState, useCallback, useMemo } from "react";
import { STANDARD_TUNING, STRING_COUNT, FRET_COUNT } from "@/constants/music";
import { noteToIndex, indexToNote } from "@/lib/theory/transposition";
import { Music } from "lucide-react";
import { NotePosition } from "@/types/theory";

interface PlayedNote {
  string: number;
  fret: number;
  note: string;
}

interface InteractiveFretboardProps {
  highlightedPositions?: NotePosition[];
  barres?: { fret: number; fromString: number; toString: number }[];
}

const FINGER_COLORS: Record<number, string> = {
  1: "#ef4444",
  2: "#3b82f6",
  3: "#22c55e",
  4: "#f59e0b",
};

function isUnderBarre(
  pos: { string: number; fret: number },
  barres?: { fret: number; fromString: number; toString: number }[]
): boolean {
  if (!barres) return false;
  return barres.some((b) => {
    const lo = Math.min(b.fromString, b.toString);
    const hi = Math.max(b.fromString, b.toString);
    return pos.fret === b.fret && pos.string >= lo && pos.string <= hi;
  });
}

export default function InteractiveFretboard({ highlightedPositions, barres }: InteractiveFretboardProps) {
  const [playedNotes, setPlayedNotes] = useState<PlayedNote[]>([]);
  const [hovered, setHovered] = useState<{ string: number; fret: number } | null>(null);

  const highlightSet = useMemo(() => {
    if (!highlightedPositions) return new Set<string>();
    return new Set(
      highlightedPositions
        .filter((p) => p.fret > 0)
        .map((p) => `${p.string}-${p.fret}`)
    );
  }, [highlightedPositions]);

  const highlightFingers = useMemo(() => {
    if (!highlightedPositions) return new Map<string, number>();
    const map = new Map<string, number>();
    const fretted = highlightedPositions.filter((p) => p.fret > 0);
    if (fretted.length === 0) return map;

    const lowestFret = Math.min(...fretted.map((p) => p.fret));
    const atLowest = fretted.filter((p) => p.fret === lowestFret);
    const lowestHasBarre = atLowest.length > 1;

    const fixed = new Map<string, number>();

    for (const p of fretted) {
      const key = `${p.string}-${p.fret}`;
      if (p.finger) {
        fixed.set(key, p.finger);
      } else if (isUnderBarre(p, barres)) {
        fixed.set(key, 1);
      } else if (lowestHasBarre && p.fret === lowestFret) {
        fixed.set(key, 1);
      }
    }

    const remaining = fretted.filter((p) => !fixed.has(`${p.string}-${p.fret}`));

    if (remaining.length > 0) {
      const usedSet = new Set(fixed.values());
      const offset = usedSet.has(1) ? 1 : 0;
      const uniqueFrets = [...new Set(remaining.map((p) => p.fret))].sort((a, b) => a - b);
      const fretBase = new Map<number, number>();
      uniqueFrets.forEach((f, i) => fretBase.set(f, i));
      for (const p of remaining) {
        const base = fretBase.get(p.fret) ?? 0;
        const sameFret = remaining.filter((pp) => pp.fret === p.fret);
        const idx = sameFret
          .sort((a, b) => b.string - a.string)
          .findIndex((pp) => pp.string === p.string && pp.fret === p.fret);
        const finger = Math.min(base + idx + 1 + offset, 4);
        fixed.set(`${p.string}-${p.fret}`, finger);
      }
    }

    return fixed;
  }, [highlightedPositions, barres]);

  const fretsToShow = 12;
  const stringSpacing = 28;
  const fretSpacing = 40;
  const padding = { top: 30, left: 40, right: 20 };

  const width = padding.left + fretsToShow * fretSpacing + padding.right;
  const height = padding.top + (STRING_COUNT - 1) * stringSpacing + 30;

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
        {[...STANDARD_TUNING].reverse().map((note, si) => (
          <text
            key={`open-${si}`}
            x={padding.left - 10}
            y={padding.top + si * stringSpacing}
            textAnchor="end"
            dominantBaseline="central"
            fill="#A0AEC0"
            fontSize="9"
            fontWeight="700"
          >
            {note.replace(/\d/g, "")}
          </text>
        ))}

        {Array.from({ length: STRING_COUNT }).map((_, si) => {
          const y = padding.top + si * stringSpacing;
          return (
            <line
              key={`str-${si}`}
              x1={padding.left}
              y1={y}
              x2={padding.left + fretsToShow * fretSpacing}
              y2={y}
              stroke="#A0AEC0"
              strokeWidth={si < 2 ? 1.5 : 2.5}
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

        {Array.from({ length: STRING_COUNT }).map((_, si) => {
          const guitarStr = si + 1;
          return Array.from({ length: fretsToShow }).map((_, fi) => {
            const fretNum = fi + 1;
            const cx = padding.left + (fretNum - 0.5) * fretSpacing;
            const cy = padding.top + si * stringSpacing;
            const played = isPlayed(si, fretNum);
            const isHovered =
              hovered?.string === si && hovered?.fret === fretNum;
            const isHighlighted = highlightSet.has(`${guitarStr}-${fretNum}`);
            const hlFinger = highlightFingers.get(`${guitarStr}-${fretNum}`);
            const hlColor = hlFinger ? FINGER_COLORS[hlFinger] : undefined;

            return (
              <g
                key={`click-${si}-${fi}`}
                className="cursor-pointer"
                onClick={() => handleClick(si, fretNum)}
                onMouseEnter={() => setHovered({ string: si, fret: fretNum })}
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
                {isHighlighted && !played && (
                  <circle cx={cx} cy={cy} r={9} fill={hlColor ?? "#FFB703"} opacity={0.6} />
                )}
                {isHighlighted && !played && (
                  <text
                    x={cx}
                    y={cy + 3}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="9"
                    fontWeight="700"
                  >
                    {hlFinger ?? ""}
                  </text>
                )}
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
                    {getNoteAt(si, fretNum)}
                  </text>
                )}
              </g>
            );
          });
        })}

        {Array.from({ length: fretsToShow + 1 }, (_, i) => i).map((f) => (
          <text
            key={`fret-num-${f}`}
            x={f === 0 ? padding.left : padding.left + (f - 0.5) * fretSpacing}
            y={padding.top - 10}
            textAnchor="middle"
            fill="#6B7280"
            fontSize="9"
          >
            {f}
          </text>
        ))}
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
