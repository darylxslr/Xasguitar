import { Song } from "@/types/song";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export interface AnalysisResult {
  song: Song | null;
  error: string | null;
}

export async function analyzeSong(
  file: File | string,
  onProgress?: (progress: string) => void
): Promise<AnalysisResult> {
  try {
    const formData = new FormData();
    if (typeof file === "string") {
      formData.append("url", file);
    } else {
      formData.append("audio", file);
    }

    const res = await fetch(`${BACKEND_URL}/api/v1/analyze`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) return { song: null, error: "Failed to start analysis." };

    const { jobId } = await res.json();
    return await pollAnalysis(jobId, onProgress);
  } catch {
    return { song: null, error: "Failed to start analysis." };
  }
}

async function pollAnalysis(
  jobId: string,
  onProgress?: (progress: string) => void
): Promise<AnalysisResult> {
  for (;;) {
    let res: Response;
    try {
      res = await fetch(`${BACKEND_URL}/api/v1/analyze/${jobId}`);
    } catch {
      return { song: null, error: "Lost connection to the analysis service." };
    }
    if (!res.ok) return { song: null, error: "Analysis job not found." };

    const data = await res.json();
    onProgress?.(data.progress || "");

    if (data.status === "done") return { song: resolveSong(data.song), error: null };
    if (data.status === "error") {
      return { song: null, error: data.error || "Analysis failed." };
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
}

function resolveSong(data: unknown): Song {
  const song = data as Song;
  return {
    ...song,
    media: {
      ...song.media,
      audioUrl: song.media?.audioUrl
        ? song.media.audioUrl.startsWith("http")
          ? song.media.audioUrl
          : `${BACKEND_URL}${song.media.audioUrl}`
        : undefined,
    },
  };
}

export async function transcribeChords(
  file: File
): Promise<{ chordTimeline: Song["chordTimeline"] } | null> {
  try {
    const formData = new FormData();
    formData.append("audio", file);

    const res = await fetch(`${BACKEND_URL}/api/v1/transcribe`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
