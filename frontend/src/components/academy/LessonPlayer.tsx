"use client";

import { Lesson } from "@/types/lesson";
import { BookOpen, Clock, Tag } from "lucide-react";
import Badge from "@/components/ui/Badge";
import InteractiveFretboard from "./InteractiveFretboard";

interface LessonPlayerProps {
  lesson: Lesson;
}

export default function LessonPlayer({ lesson }: LessonPlayerProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className="flex-1 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{lesson.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant={lesson.difficulty}>{lesson.difficulty}</Badge>
              <span className="flex items-center gap-1 text-sm text-text-muted">
                <Clock className="w-4 h-4" />
                {lesson.duration}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary rounded-xl border border-bg-tertiary p-6">
          <div className="prose prose-invert max-w-none">
            <p className="text-text-primary leading-relaxed whitespace-pre-line">
              {lesson.content}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-text-muted" />
          {lesson.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>

      <div className="lg:w-96 shrink-0">
        <div className="bg-bg-secondary rounded-xl border border-bg-tertiary p-4 sticky top-20">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Practice Fretboard
          </h3>
          <InteractiveFretboard />
        </div>
      </div>
    </div>
  );
}
