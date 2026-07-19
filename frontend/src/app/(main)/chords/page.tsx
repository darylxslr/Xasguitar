import ChordLibrary from "@/components/chords/ChordLibrary";

export default function ChordsPage() {
  return (
    <div className="w-full px-4 py-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            Chord Library
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Browse common guitar chords — tap any to see the fingering
          </p>
        </div>
        <ChordLibrary />
      </div>
    </div>
  );
}
