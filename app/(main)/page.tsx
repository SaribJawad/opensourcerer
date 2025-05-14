import FeaturesSection from "../_components/FeaturesSection";
import HeroSection from "../_components/HeroSection";
import ReadyToStartSection from "../_components/ReadyToStartSection";
import StatsSection from "../_components/StatsSection";
import TrendingSection from "../_components/TrendingSection";

export const metadata = {
  title: "OpenSourcerer – Find Open Source Projects",
  description:
    "The best place to discover, explore, and contribute to open-source projects.",
};

export default function Home() {
  return (
    <div className="w-full  pt-14">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TrendingSection />
      <ReadyToStartSection />
    </div>
  );
}
