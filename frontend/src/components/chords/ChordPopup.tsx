"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChordShape } from "@/types/theory";
import { getUsedFingers } from "@/lib/theory/fingers";
import ChordDiagram from "./ChordDiagram";
import HandDiagram from "./HandDiagram";
import InteractiveFretboard from "@/components/academy/InteractiveFretboard";

interface ChordPopupProps {
  shape: ChordShape;
  category?: string;
  onClose: () => void;
}

export default function ChordPopup({ shape, category, onClose }: ChordPopupProps) {
  const usedFingers = getUsedFingers(shape);
  const isBarre = (shape.barres?.length ?? 0) > 0;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="bg-bg-secondary rounded-2xl border border-bg-tertiary p-8 w-full max-w-5xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary">{shape.name}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex flex-col items-center gap-2 shrink-0">
              <HandDiagram usedFingers={usedFingers} isBarre={isBarre} />
              <div className="text-center">
                <p className="text-xs text-text-muted leading-tight">
                  Left hand &middot; Palm facing you
                </p>
                <p className="text-[11px] text-text-muted/60 leading-tight mt-0.5">
                  Colored fingers are pressing strings
                </p>
              </div>
            </div>

            <div className="flex-1 w-full min-w-0">
              <div className="max-w-2xl">
                <InteractiveFretboard highlightedPositions={shape.positions} barres={shape.barres} />
              </div>
              <p className="text-[11px] text-text-muted/60 mt-2 text-center">
                Tap any fret to know its note name &mdash; highlighted dots show the chord shape
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 shrink-0">
              <ChordDiagram shape={shape} size={160} />
              <span className="text-xs text-text-muted uppercase tracking-wider">
                {shape.name}
              </span>
              {category && (
                <span className="text-[10px] text-text-muted/50 uppercase tracking-widest">
                  {category}
                </span>
              )}
            </div>
          </div>

          {isBarre && (
            <p className="text-xs text-text-muted mt-4 text-center">
              Barre with finger 1 across all strings
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-6 pt-4 border-t border-bg-tertiary text-[11px] text-text-muted">
            <span className="text-text-muted/60 font-medium">Legends:</span>
            <span className="flex items-center gap-1">
              <span className="font-mono text-sm font-bold text-text-secondary">X</span>
              Muted
            </span>
            <span className="flex items-center gap-1">
              <span className="font-mono text-sm font-bold text-text-secondary">O</span>
              Open
            </span>
            <span className="flex items-center gap-1">
              <span className="font-mono text-xs text-text-secondary">0 1 2 &hellip; 12</span>
              <span className="text-text-muted/60">Fret</span>
            </span>
            <span className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((n) => (
                <span key={n} className="flex items-center gap-0.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b"][n - 1] }}
                  />
                  <span>{n}</span>
                </span>
              ))}
              <span className="ml-0.5 text-text-muted/60">Finger</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5">
                <span className="w-4 rounded-full inline-block bg-current" style={{ height: 2.5 }} />
                <span className="font-mono text-xs text-text-secondary font-bold">EADG</span>
              </span>
              <span className="text-text-muted/30">|</span>
              <span className="flex items-center gap-0.5">
                <span className="w-4 rounded-full inline-block bg-current" style={{ height: 1.2 }} />
                <span className="font-mono text-xs text-text-secondary font-bold">BE</span>
              </span>
              <span className="ml-0.5 text-text-muted/60">String</span>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
