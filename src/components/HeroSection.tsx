import { Button } from "@/components/ui/button";
import { Star, Play, Heart, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import jeanClaudePortrait from "@/assets/jean-claude-portrait-new.jpg";
import jcGardening from "@/assets/jc-gardening.jpg";

const AudioWaveform = () => (
  <div className="w-full h-[2px] bg-[#EAEAEA] rounded-full relative">
    <div className="absolute left-0 top-0 h-full bg-[#D4AF37] rounded-full" style={{ width: "35%" }} />
    <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" style={{ left: "calc(35% - 3px)" }} />
  </div>
);


const HeroSection = () =>
<section className="pt-28 pb-20 lg:pb-32 lg:pt-36 overflow-hidden py-[92px]">
    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
      {/* Left */}
      <div className="flex-1 text-center lg:text-left space-y-8">
        <h1 className="font-serif-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
          Ne laissez pas leur lumière s'éteindre.
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
          Rassemblez photos,vidéos, voix et hommages dans un écrin numérique partagé. Un espace digne et sécurisé pour
          que leur souvenir continue de vivre à travers vous.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button variant="gold" className="px-8 py-6 text-base">
            Créer le Mémorial (79€)
          </Button>
          <Button
          variant="goldOutline"
          className="px-8 py-6 text-base"
          asChild>

            <Link to="/memorial">Voir un exemple</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 justify-center lg:justify-start text-muted-foreground text-sm">
          <div className="flex">
            {[...Array(5)].map((_, i) =>
          <Star key={i} size={14} className="fill-primary text-primary" />
          )}
          </div>
          <span>Déjà 500+ cérémonies accompagnées</span>
        </div>
      </div>

      {/* Right — Human-centered portrait composition */}
      <div className="flex-1 flex justify-center">
        <div className="relative" style={{ perspective: "1200px" }}>
          {/* Main portrait */}
          <div className="relative z-0">
            <div className="w-[300px] sm:w-[360px] lg:w-[420px] rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.25)] border border-border/30">
              <img
              src={jeanClaudePortrait}
              alt="Jean-Claude Dubois"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy" />

            </div>
            {/* Name & dates below portrait */}
            <div className="text-center mt-5 space-y-1.5">
              <h3 className="font-serif-display text-2xl lg:text-3xl font-bold text-foreground">Jean-Claude Dubois</h3>
              <p className="text-xs tracking-[0.25em] text-muted-foreground">1948 — 2024</p>
              <p className="text-sm text-muted-foreground/80 italic font-serif-display leading-relaxed max-w-[340px] mx-auto mt-2">
                « Il cultivait son jardin comme il cultivait ses amitiés : avec patience, lumière et amour. »
              </p>
            </div>
          </div>

          {/* Floating card — Garden photo */}
          <div
          className="absolute -left-10 top-16 w-36 bg-background/90 backdrop-blur-md rounded-xl border border-border/40 overflow-hidden shadow-golden-glow animate-float z-10"
          style={{ transform: "rotateY(-3deg) rotateX(2deg)" }}>

            <img
            src={jcGardening}
            alt="Jean-Claude dans son jardin de roses"
            className="w-full h-20 object-cover"
            loading="lazy" />

            <div className="p-2">
              <p className="text-[7px] text-muted-foreground line-clamp-2">Chaque rose plantée ici porte ton souvenir...</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[7px] font-medium text-foreground">Marie</span>
                <div className="flex items-center gap-0.5 text-primary">
                  <Heart size={7} className="fill-primary" />
                  <span className="text-[7px]">34</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating card — Audio */}
          <div
          className="absolute -right-8 top-10 w-40 bg-background/90 backdrop-blur-md rounded-xl border border-primary/20 bg-primary/5 p-2.5 shadow-golden-glow animate-float z-10"
          style={{ animationDelay: "1.5s", transform: "rotateY(3deg) rotateX(-2deg)" }}>

            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Play size={8} className="text-primary-foreground ml-0.5" />
              </div>
              <span className="text-[8px] font-medium text-foreground">Souvenir vocal de Léo</span>
            </div>
            <AudioWaveform />
            <span className="text-[7px] text-muted-foreground mt-1.5">1:24</span>
          </div>

          {/* Floating card — Quote */}
          <div
          className="absolute -left-6 bottom-24 w-44 bg-background/90 backdrop-blur-md rounded-xl border border-border/40 p-3 shadow-golden-glow animate-float z-10"
          style={{ animationDelay: "3s", transform: "rotateY(-2deg) rotateX(1deg)" }}>

            <Quote size={10} className="text-primary/40 mb-1" />
            <p className="text-[8px] text-foreground italic font-serif-display leading-relaxed">
              « Allez, on ouvre une bonne bouteille ! »
            </p>
            <p className="text-[7px] font-medium text-muted-foreground mt-1">Michel</p>
          </div>

          {/* Floating card — Counter */}
          <div
          className="absolute -right-4 bottom-32 w-28 bg-background/90 backdrop-blur-md rounded-xl border border-border/40 p-2.5 shadow-golden-glow animate-float z-10"
          style={{ animationDelay: "2s", transform: "rotateY(3deg) rotateX(-2deg)" }}>

            <p className="text-xl font-bold text-primary font-serif-display text-center">127</p>
            <p className="text-[8px] text-muted-foreground text-center">souvenirs partagés</p>
          </div>
        </div>
      </div>
    </div>
  </section>;


export default HeroSection;