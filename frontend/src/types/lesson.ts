export type Difficulty = "starter" | "beginner" | "intermediate" | "advanced";
export type LessonStatus = "completed" | "active" | "locked";

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: string;
  videoUrl?: string;
  content: string;
  tags: string[];
  status?: LessonStatus;
}

export interface Track {
  id: Difficulty;
  label: string;
  color: string;
  lessons: Lesson[];
}
