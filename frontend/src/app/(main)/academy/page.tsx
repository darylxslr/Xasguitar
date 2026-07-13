import CurriculumGrid from "@/components/academy/CurriculumGrid";
import { tracks } from "@/data/lessons";

export default function AcademyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">
          Guitar Academy
        </h1>
        <p className="text-text-secondary mt-2">
          All lessons unlocked from day one. Learn at your own pace.
        </p>
      </div>
      <CurriculumGrid tracks={tracks} />
    </div>
  );
}
