import { Song } from "@/types/song";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function analyzeSong(
  file: File | string
): Promise<Song | null> {
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
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
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
