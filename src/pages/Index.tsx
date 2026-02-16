import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSolution from "@/components/ProblemSolution";
import Features from "@/components/Features";
import CeremonyKit from "@/components/CeremonyKit";
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
        <Features />
        <CeremonyKit />
        <Privacy />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
