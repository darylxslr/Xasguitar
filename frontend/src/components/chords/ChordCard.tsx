"use client";

import { ChordShape } from "@/types/theory";
import ChordDiagram from "./ChordDiagram";

interface ChordCardProps {
  shape: ChordShape;
  category: string;
  onSelect?: (shape: ChordShape) => void;
}

export default function ChordCard({ shape, category, onSelect }: ChordCardProps) {
  return (
    <button
      onClick={() => onSelect?.(shape)}
      className="bg-bg-secondary rounded-xl border border-bg-tertiary p-4 flex flex-col items-center gap-2 transition-colors hover:border-accent-amber/30 text-left w-full"
    >
      <ChordDiagram shape={shape} />
      <span className="text-sm font-bold text-text-primary">{shape.name}</span>
      <span className="text-xs text-text-muted uppercase tracking-wider">{category}</span>
    </button>
  );
}
