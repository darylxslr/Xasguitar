"use client";

import Link from "next/link";
import { Clock, BookOpen } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Lesson } from "@/types/lesson";

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link href={`/academy/${lesson.slug}`}>
      <div className="bg-bg-secondary rounded-lg border border-bg-tertiary p-4 flex flex-col gap-3 min-w-[240px] w-60 h-32 snap-start transition-colors hover:border-accent-amber/30 cursor-pointer">
        <div className="flex items-start justify-between">
          <BookOpen className="w-5 h-5 text-accent-amber" />
          <Badge variant={lesson.difficulty}>{lesson.difficulty}</Badge>
        </div>
        <h3 className="text-sm font-semibold text-text-primary leading-snug">
          {lesson.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-auto">
          <Clock className="w-3.5 h-3.5" />
          {lesson.duration}
        </div>
      </div>
    </Link>
  );
}
