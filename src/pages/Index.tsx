import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

import FeatureMemoryWall from "@/components/FeatureMemoryWall";
import FeatureTimeline from "@/components/FeatureTimeline";
import FeatureAIBiography from "@/components/FeatureAIBiography";
import FeatureCeremonyKit from "@/components/FeatureCeremonyKit";
import PremiumUpsell from "@/components/PremiumUpsell";
import Privacy from "@/components/Privacy";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        
        <FeatureMemoryWall />
        <FeatureTimeline />
        <FeatureAIBiography />
        <FeatureCeremonyKit />
        <PremiumUpsell />
        <Privacy />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
