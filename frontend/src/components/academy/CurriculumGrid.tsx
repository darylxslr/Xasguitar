"use client";

import { Track } from "@/types/lesson";
import LessonCard from "./LessonCard";

interface CurriculumGridProps {
  tracks: Track[];
}

export default function CurriculumGrid({ tracks }: CurriculumGridProps) {
  return (
    <div className="space-y-8">
      {tracks.map((track) => (
        <div key={track.id}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: track.color }}
            />
            <h2 className="text-lg font-semibold text-text-primary">
              {track.label}
            </h2>
            <span className="text-xs text-text-muted">
              {track.lessons.length} lessons
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {track.lessons.map((lesson) => (
              <LessonCard key={lesson.slug} lesson={lesson} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
