import { Button } from "@/components/ui/button";
import { Star, Play, Heart, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import jeanClaudePortrait from "@/assets/jean-claude-portrait.jpg";

const AudioWaveform = () => (
  <svg viewBox="0 0 60 24" className="w-full h-5" preserveAspectRatio="none">
    {[3,7,12,8,16,10,14,6,18,9,13,5,11,15,7,12,8,16,10,6].map((h, i) => (
      <rect key={i} x={i * 3} y={12 - h / 2} width="2" rx="1" height={h} className="fill-primary/60" />
    ))}
  </svg>
);

const HeroSection = () => (
  <section className="pt-28 pb-20 lg:pb-32 lg:pt-36 overflow-hidden">
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
          <Button className="rounded-full bg-gradient-to-b from-primary to-[hsl(43_56%_42%)] text-primary-foreground hover:opacity-90 transition-all duration-200 hover:scale-105 px-8 py-6 text-base shadow-gold">
            Créer le Mémorial (79€)
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-muted-foreground/30 text-foreground px-8 py-6 text-base hover:bg-secondary transition-transform duration-200 hover:scale-105"
            asChild
          >
            <Link to="/memorial">Voir un exemple</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 justify-center lg:justify-start text-muted-foreground text-sm">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-primary text-primary" />
            ))}
          </div>
          <span>Déjà 500+ cérémonies accompagnées</span>
        </div>
      </div>

      {/* Right — Jean-Claude Sanctuary Mockup */}
      <div className="flex-1 flex justify-center">
        <div className="relative" style={{ perspective: "1200px" }}>
          {/* Shadow card behind for depth */}
          <div
            className="absolute inset-2 bg-muted/40 rounded-3xl blur-sm"
            style={{ transform: "rotateY(-4deg) rotateX(4deg) translateZ(-20px)" }}
          />

          {/* Main card */}
          <div
            className="relative w-[320px] sm:w-[400px] lg:w-[460px] bg-background/90 backdrop-blur-xl rounded-3xl border border-border/30 shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.25)] overflow-hidden"
            style={{ transform: "rotateY(-4deg) rotateX(4deg)" }}
          >
            {/* Profile header */}
            <div className="pt-8 pb-4 px-6 text-center space-y-2.5">
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-primary/30 overflow-hidden shadow-golden-glow">
                <img src={jeanClaudePortrait} alt="Jean-Claude Dubois" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-foreground">Jean-Claude Dubois</h3>
              <p className="text-[11px] tracking-[0.2em] text-muted-foreground">1948 — 2024</p>
              <p className="text-[10px] text-muted-foreground/80 italic font-serif-display leading-relaxed max-w-[260px] mx-auto">
                « Il cultivait son jardin comme il cultivait ses amitiés : avec patience, lumière et amour. »
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-1 px-4 pb-3">
              <div className="px-3 py-1.5 text-[9px] font-semibold text-primary border-b-2 border-primary">Le Mur des Souvenirs</div>
              <div className="px-3 py-1.5 text-[9px] text-muted-foreground">Sa Biographie</div>
              <div className="px-3 py-1.5 text-[9px] text-muted-foreground">Le Roman de sa Vie</div>
            </div>

            {/* Mini masonry grid */}
            <div className="px-4 pb-5 grid grid-cols-2 gap-2.5">
              {/* Card 1 — Photo */}
              <div className="rounded-xl overflow-hidden border border-border/30 bg-background shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&h=200&fit=crop"
                  alt="Jardin de roses"
                  className="w-full h-24 object-cover"
                  loading="lazy"
                />
                <div className="p-2">
                  <p className="text-[8px] text-muted-foreground leading-relaxed line-clamp-2">
                    Chaque rose plantée ici porte ton souvenir...
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[7px] font-medium text-foreground">Marie</span>
                    <div className="flex items-center gap-0.5 text-primary">
                      <Heart size={7} className="fill-primary" />
                      <span className="text-[7px]">34</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 — Audio */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-2.5 flex flex-col justify-between shadow-sm">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Play size={8} className="text-primary-foreground ml-0.5" />
                  </div>
                  <span className="text-[8px] font-medium text-foreground">Souvenir vocal de Léo</span>
                </div>
                <AudioWaveform />
                <span className="text-[7px] text-muted-foreground mt-1.5">1:24</span>
              </div>

              {/* Card 3 — Quote (spans full width) */}
              <div className="col-span-2 rounded-xl border border-border/30 bg-background p-3 shadow-sm text-center">
                <Quote size={12} className="text-primary/40 mx-auto mb-1" />
                <p className="text-[9px] text-foreground italic font-serif-display leading-relaxed">
                  « Allez, on ouvre une bonne bouteille ! » — Ta phrase fétiche qui résonnera toujours.
                </p>
                <p className="text-[7px] font-medium text-muted-foreground mt-1.5">Michel</p>
              </div>
            </div>
          </div>

          {/* Floating card — Noël */}
          <div
            className="absolute -left-6 bottom-20 w-40 bg-background/90 backdrop-blur-md rounded-xl border border-border/40 p-2.5 shadow-golden-glow animate-float z-10"
            style={{ transform: "rotateY(-3deg) rotateX(2deg)" }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Play size={7} className="text-primary ml-0.5" />
              </div>
              <span className="text-[8px] font-medium text-foreground">Noël 2018</span>
            </div>
            <p className="text-[7px] text-muted-foreground mt-1">Son solo de saxo légendaire</p>
          </div>

          {/* Floating card — Counter */}
          <div
            className="absolute -right-4 top-28 w-32 bg-background/90 backdrop-blur-md rounded-xl border border-border/40 p-2.5 shadow-golden-glow animate-float z-10"
            style={{ animationDelay: "2s", transform: "rotateY(3deg) rotateX(-2deg)" }}
          >
            <p className="text-xl font-bold text-primary font-serif-display text-center">127</p>
            <p className="text-[8px] text-muted-foreground text-center">souvenirs partagés</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
