"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LessonPlayer from "@/components/academy/LessonPlayer";
import { tracks } from "@/data/lessons";

export default function LessonPage() {
  const params = useParams();
  const slug = params.slug as string;

  const allLessons = tracks.flatMap((t) => t.lessons);
  const lesson = allLessons.find((l) => l.slug === slug);

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-4">
        <p className="text-text-secondary">Lesson not found</p>
        <Link
          href="/academy"
          className="text-accent-amber hover:underline"
        >
          Back to Academy
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        href="/academy"
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Academy
      </Link>
      <LessonPlayer lesson={lesson} />
    </div>
  );
}
