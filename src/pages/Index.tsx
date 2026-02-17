import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSolution from "@/components/ProblemSolution";
import FeatureMemoryWall from "@/components/FeatureMemoryWall";
import FeatureTimeline from "@/components/FeatureTimeline";
import FeatureCeremonyKit from "@/components/FeatureCeremonyKit";
import Privacy from "@/components/Privacy";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSolution />
        <FeatureMemoryWall />
        <FeatureTimeline />
        <FeatureCeremonyKit />
        <Privacy />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
