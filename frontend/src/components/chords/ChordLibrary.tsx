"use client";

import { useState } from "react";
import { getChordShape, chordCategories } from "@/lib/theory/voicings";
import { ChordShape } from "@/types/theory";
import ChordCard from "./ChordCard";
import ChordPopup from "./ChordPopup";

const categories = [
  "Open", "Barre", "7th", "Major 7th", "Minor 7th",
  "Sus", "Add9", "6th", "Dim/Aug", "Power",
] as const;

export default function ChordLibrary() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [popupChord, setPopupChord] = useState<{ shape: ChordShape; category: string } | null>(null);

  const allChords = chordCategories.flatMap((c) =>
    c.chords.map((name) => ({ name, category: c.category }))
  );

  const filtered = activeCategory === "All"
    ? allChords
    : allChords.filter((c) => c.category === activeCategory);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-accent-amber/20 text-accent-amber"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map(({ name, category }) => {
          const shape = getChordShape(name);
          if (!shape) return null;
          return (
            <ChordCard
              key={name}
              shape={shape}
              category={category}
              onSelect={() => setPopupChord({ shape, category })}
            />
          );
        })}
      </div>

      {popupChord && (
        <ChordPopup shape={popupChord.shape} category={popupChord.category} onClose={() => setPopupChord(null)} />
      )}
    </div>
  );
}
