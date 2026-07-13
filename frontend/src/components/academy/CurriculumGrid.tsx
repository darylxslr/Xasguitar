"use client";

import { ChevronDown } from "lucide-react";
import { Track } from "@/types/lesson";
import LessonCard from "./LessonCard";

interface CurriculumGridProps {
  tracks: Track[];
}

const trackLabels: Record<string, string> = {
  beginner: "Track 1: Beginner Fundamentals",
  intermediate: "Track 2: Intermediate Techniques",
  advanced: "Track 3: Advanced Theory & Mastery",
};

export default function CurriculumGrid({ tracks }: CurriculumGridProps) {
  return (
    <div className="space-y-4">
      {tracks.map((track, index) => {
        const completed = track.lessons.filter(
          (l) => l.status === "completed"
        ).length;
        const total = track.lessons.length;
        const pct = total > 0 ? (completed / total) * 100 : 0;

        return (
          <div key={track.id}>
            {index > 0 && (
              <div className="border-t border-bg-tertiary mb-8" />
            )}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: track.color }}
                />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  {trackLabels[track.id] || track.label}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-secondary">
                  {completed}/{total}
                </span>
                <div className="w-20 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-amber rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
              {track.lessons.map((lesson) => (
                <LessonCard key={lesson.slug} lesson={lesson} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
