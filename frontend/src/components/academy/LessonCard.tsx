"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Lesson } from "@/types/lesson";

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link href={`/academy/${lesson.slug}`}>
      <Card hover className="h-full flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <Badge variant={lesson.difficulty}>{lesson.difficulty}</Badge>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Clock className="w-3 h-3" />
            {lesson.duration}
          </span>
        </div>
        <h3 className="text-text-primary font-semibold mb-1">{lesson.title}</h3>
        <p className="text-text-muted text-sm flex-1">{lesson.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {lesson.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs bg-bg-tertiary text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </Card>
    </Link>
  );
}
