const YT_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export function extractYouTubeId(url: string): string | null {
  const match = url.match(YT_REGEX);
  return match?.[1] || null;
}

export function isValidYouTubeUrl(url: string): boolean {
  return YT_REGEX.test(url);
}
