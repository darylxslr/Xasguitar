"use client";

import { Lesson } from "@/types/lesson";
import { Clock, Tag } from "lucide-react";
import Badge from "@/components/ui/Badge";
import VideoEmbed from "./VideoEmbed";

interface LessonPlayerProps {
  lesson: Lesson;
}

export default function LessonPlayer({ lesson }: LessonPlayerProps) {
  return (
    <div className="flex flex-col gap-6">
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

      {lesson.videoUrl && <VideoEmbed videoId={lesson.videoUrl} />}

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
  );
}
