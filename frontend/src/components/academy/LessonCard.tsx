"use client";

import Link from "next/link";
import { Clock, CheckCircle2, BookOpen, Lock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Lesson } from "@/types/lesson";

interface LessonCardProps {
  lesson: Lesson;
}

const statusIcon = {
  completed: CheckCircle2,
  active: BookOpen,
  locked: Lock,
};

const statusColors = {
  completed: "text-difficulty-beginner",
  active: "text-accent-amber",
  locked: "text-text-muted",
};

export default function LessonCard({ lesson }: LessonCardProps) {
  const status = lesson.status || "locked";
  const Icon = statusIcon[status];
  const isLocked = status === "locked";
  const isActive = status === "active";

  const content = (
    <div
      className={`bg-bg-secondary rounded-lg border p-4 flex flex-col gap-3 min-w-[240px] w-60 h-32 snap-start transition-colors ${
        isActive
          ? "border-accent-amber/50 ring-1 ring-accent-amber/30"
          : "border-bg-tertiary"
      } ${!isLocked ? "hover:border-accent-amber/30 cursor-pointer" : "opacity-60"}`}
    >
      <div className="flex items-start justify-between">
        <Icon className={`w-5 h-5 ${statusColors[status]}`} />
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
  );

  if (isLocked) return <div>{content}</div>;

  return <Link href={`/academy/${lesson.slug}`}>{content}</Link>;
}
