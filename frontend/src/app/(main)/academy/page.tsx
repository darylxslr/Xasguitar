import DashboardHeader from "@/components/academy/DashboardHeader";
import StatsBar from "@/components/academy/StatsBar";
import CurriculumGrid from "@/components/academy/CurriculumGrid";
import { tracks } from "@/data/lessons";

export default function AcademyPage() {
  return (
    <div className="w-full px-4 py-8 font-sans">
      <DashboardHeader />
      <StatsBar />
      <CurriculumGrid tracks={tracks} />
    </div>
  );
}
