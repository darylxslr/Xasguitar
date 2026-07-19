"use client";

import { ChordShape } from "@/types/theory";

interface ChordDiagramProps {
  shape: ChordShape;
  size?: number;
}

const STRING_COUNT = 6;
const FRET_COUNT = 5;

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

function assignFingers(
  dots: { string: number; fret: number; finger?: number }[],
  barres?: { fret: number; fromString: number; toString: number }[]
): number[] {
  const fretted = dots.filter((d) => d.fret > 0);
  if (fretted.length === 0) return dots.map(() => 0);

  const lowestFret = Math.min(...fretted.map((d) => d.fret));
  const atLowest = fretted.filter((d) => d.fret === lowestFret);
  const lowestHasBarre = atLowest.length > 1;

  const fixed = new Map<string, number>();

  for (const d of fretted) {
    const key = `${d.string}-${d.fret}`;
    if (d.finger) {
      fixed.set(key, d.finger);
    } else if (isUnderBarre(d, barres)) {
      fixed.set(key, 1);
    } else if (lowestHasBarre && d.fret === lowestFret) {
      fixed.set(key, 1);
    }
  }

  const remaining = fretted.filter((d) => !fixed.has(`${d.string}-${d.fret}`));

  if (remaining.length > 0) {
    const usedSet = new Set(fixed.values());
    const offset = usedSet.has(1) ? 1 : 0;
    const uniqueFrets = [...new Set(remaining.map((d) => d.fret))].sort((a, b) => a - b);
    const fretFingerBase = new Map<number, number>();
    uniqueFrets.forEach((f, i) => fretFingerBase.set(f, i));
    for (const d of remaining) {
      const base = fretFingerBase.get(d.fret) ?? 0;
      const sameFret = remaining.filter((pp) => pp.fret === d.fret);
      const idxInFret = sameFret
        .sort((a, b) => b.string - a.string)
        .findIndex((pp) => pp.string === d.string && pp.fret === d.fret);
      fixed.set(`${d.string}-${d.fret}`, Math.min(base + idxInFret + 1 + offset, 4));
    }
  }

  return dots.map((d) => fixed.get(`${d.string}-${d.fret}`) ?? 0);
}

export default function ChordDiagram({ shape, size = 120 }: ChordDiagramProps) {
  const padding = 16;
  const stringSpacing = (size - padding * 2) / (STRING_COUNT - 1);
  const fretSpacing = (size - padding * 2) / FRET_COUNT;
  const dotRadius = stringSpacing * 0.35;

  const minFret = Math.min(...shape.positions.map((p) => p.fret).filter((f) => f > 0), 1);
  const fretOffset = minFret > 1 ? minFret - 1 : 0;

  const openStrings: boolean[] = Array(STRING_COUNT).fill(false);
  const mutedStrings: boolean[] = Array(STRING_COUNT).fill(false);
  const dots: { string: number; fret: number; finger?: number }[] = [];

  for (let s = 0; s < STRING_COUNT; s++) {
    const pos = shape.positions.find((p) => p.string === STRING_COUNT - s);
    if (!pos) {
      mutedStrings[s] = true;
    } else if (pos.fret === 0) {
      openStrings[s] = true;
    } else {
      dots.push({ string: s, fret: pos.fret, finger: pos.finger });
    }
  }

  const fingerNums = assignFingers(dots, shape.barres);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0"
    >
      {/* vertical strings */}
      {Array.from({ length: STRING_COUNT }).map((_, i) => (
        <line
          key={`s${i}`}
          x1={padding + i * stringSpacing}
          y1={padding}
          x2={padding + i * stringSpacing}
          y2={size - padding}
          stroke="currentColor"
          strokeWidth={i < 4 ? 1.2 : 0.8}
          className="text-text-secondary"
        />
      ))}

      {/* horizontal frets */}
      {Array.from({ length: FRET_COUNT + 1 }).map((_, i) => (
        <line
          key={`f${i}`}
          x1={padding}
          y1={padding + i * fretSpacing}
          x2={size - padding}
          y2={padding + i * fretSpacing}
          stroke={i === 0 ? "currentColor" : "currentColor"}
          strokeWidth={i === 0 ? 3 : 1}
          className={i === 0 ? "text-text-primary" : "text-bg-tertiary"}
        />
      ))}

      {/* fret number label */}
      {fretOffset > 0 && (
        <text
          x={padding - 8}
          y={padding}
          textAnchor="end"
          fontSize={10}
          className="fill-text-muted"
        >
          {minFret}fr
        </text>
      )}

      {/* open/muted markers above nut */}
      {Array.from({ length: STRING_COUNT }).map((_, i) => {
        const cx = padding + i * stringSpacing;
        const cy = padding - 8;
        if (openStrings[i]) {
          return (
            <text
              key={`o${i}`}
              x={cx}
              y={cy + 3}
              textAnchor="middle"
              fontSize={11}
              className="fill-text-secondary"
            >
              O
            </text>
          );
        }
        if (mutedStrings[i]) {
          return (
            <text
              key={`x${i}`}
              x={cx}
              y={cy + 3}
              textAnchor="middle"
              fontSize={11}
              className="fill-text-muted"
            >
              X
            </text>
          );
        }
        return null;
      })}

      {/* finger dots */}
      {dots.map((dot, i) => {
        const cx = padding + dot.string * stringSpacing;
        const cy = padding + (dot.fret - fretOffset - 1) * fretSpacing + fretSpacing / 2;
        const finger = fingerNums[i];
        const color = FINGER_COLORS[finger] || "#fbbf24";
        return (
          <g key={`d${i}`}>
            <circle cx={cx} cy={cy} r={dotRadius} fill={color} />
            <text
              x={cx}
              y={cy + 1}
              textAnchor="middle"
              fontSize={dotRadius * 0.9}
              fill="#fff"
              fontWeight="700"
            >
              {finger}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
