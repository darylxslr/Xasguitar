"use client";

interface VideoEmbedProps {
  videoId: string;
}

export default function VideoEmbed({ videoId }: VideoEmbedProps) {
  if (!videoId) return null;

  return (
    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-xl"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title="YouTube lesson"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
