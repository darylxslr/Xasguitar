export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: string;
  videoUrl?: string;
  content: string;
  tags: string[];
}

export interface Track {
  id: Difficulty;
  label: string;
  color: string;
  lessons: Lesson[];
}
