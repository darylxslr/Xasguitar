const MUSICBRAINZ_URL = "https://musicbrainz.org/ws/2";

export interface MusicBrainzResult {
  id: string;
  title: string;
  artist: string;
  score: number;
}

export async function searchSong(query: string): Promise<MusicBrainzResult[]> {
  try {
    const res = await fetch(
      `${MUSICBRAINZ_URL}/recording?query=${encodeURIComponent(query)}&fmt=json&limit=10`,
      { headers: { "User-Agent": "Xasguitar/1.0.0" } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.recordings || []).map((r: any) => ({
      id: r.id,
      title: r.title,
      artist: r["artist-credit"]?.[0]?.name || "Unknown",
      score: r.score || 0,
    }));
  } catch {
    return [];
  }
}
