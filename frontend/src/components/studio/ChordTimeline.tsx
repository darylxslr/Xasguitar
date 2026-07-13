"use client";

import { useRef, useEffect, useState } from "react";
import { useStudioStore } from "@/stores/studio";
import Tooltip from "@/components/ui/Tooltip";
import ChordTooltip from "./ChordTooltip";

export default function ChordTimeline() {
  const { getDisplayChords, currentTime } = useStudioStore();
  const chords = getDisplayChords();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentTime]);

  const activeIndex = chords.findIndex(
    (c, i) =>
      currentTime >= c.timestamp &&
      (i === chords.length - 1 || currentTime < chords[i + 1].timestamp)
  );

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto px-4 py-4 space-y-2 scroll-smooth"
    >
      {chords.map((item, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={i}
            ref={isActive ? activeRef : undefined}
            className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
              isActive
                ? "bg-accent-amber/10 border-l-2 border-accent-amber"
                : "border-l-2 border-transparent"
            }`}
          >
            <span className="text-xs font-mono text-text-muted shrink-0 w-10 pt-1">
              {Math.floor(item.timestamp / 60)}:
              {String(Math.floor(item.timestamp % 60)).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <Tooltip content={<ChordTooltip chord={item.chord} />}>
                <span
                  className={`inline-block font-mono font-semibold text-base px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    isActive ? "text-accent-amber bg-accent-amber/5" : "text-accent-cyan hover:text-accent-amber"
                  }`}
                >
                  {item.chord}
                </span>
              </Tooltip>
              <span className="text-text-primary text-sm ml-2">
                {item.lyrics}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
