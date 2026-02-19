import { Button } from "@/components/ui/button";
import { Star, Heart, Play, Quote, Music } from "lucide-react";
import { Link } from "react-router-dom";
import portraitImg from "@/assets/jean-claude-portrait.jpg";

const AudioWaveform = () => (
  <svg viewBox="0 0 120 24" className="w-full h-6" fill="none">
    {[4,8,14,6,18,10,20,8,16,12,22,6,14,10,18,8,12,20,6,16,10,14,8,18,12,6,20,14,8,16].map((h, i) => (
      <rect key={i} x={i * 4} y={12 - h / 2} width="2" rx="1" height={h} className="fill-amber-500/60" />
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
          Rassemblez photos, voix et hommages dans un écrin numérique partagé.
          Un espace digne et sécurisé pour que leur souvenir continue de vivre à travers vous.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button className="rounded-full bg-gradient-to-b from-primary to-[hsl(43_56%_42%)] text-primary-foreground hover:opacity-90 transition-all duration-200 hover:scale-105 px-8 py-6 text-base shadow-gold">
            Créer le Mémorial (49€)
          </Button>
          <Button variant="outline" className="rounded-full border-muted-foreground/30 text-foreground px-8 py-6 text-base hover:bg-secondary transition-transform duration-200 hover:scale-105" asChild>
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

      {/* Right — Sanctuary UI Mockup */}
      <div className="flex-1 flex justify-center">
        <div className="relative" style={{ perspective: "1200px" }}>
          {/* Background depth card */}
          <div
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-primary/10 border border-primary/10"
            style={{ transform: "rotateY(-4deg) rotateX(4deg) translate(12px, 12px)" }}
          />

          {/* Main card */}
          <div
            className="relative w-[320px] sm:w-[400px] lg:w-[460px] bg-[hsl(40_30%_98%/0.92)] backdrop-blur-xl rounded-3xl border border-border/40 shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.2)] overflow-hidden"
            style={{ transform: "rotateY(-4deg) rotateX(4deg)" }}
          >
            {/* Profile header */}
            <div className="pt-8 pb-4 px-6 text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-full border-[3px] border-primary/30 shadow-golden-glow overflow-hidden">
                <img src={portraitImg} alt="Jean-Claude Dubois" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-foreground">Jean-Claude Dubois</h3>
              <p className="text-xs tracking-[0.25em] text-muted-foreground">1948 — 2024</p>
              <p className="text-[11px] text-muted-foreground/80 italic font-serif-display leading-relaxed max-w-[280px] mx-auto">
                «&nbsp;Il cultivait son jardin comme il cultivait ses amitiés&nbsp;: avec patience, lumière et amour.&nbsp;»
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-1 px-4 border-b border-border/30 pb-0">
              <span className="px-3 py-2 text-[10px] font-medium text-amber-600 border-b-2 border-amber-500">Le Mur des Souvenirs</span>
              <span className="px-3 py-2 text-[10px] text-muted-foreground">Sa Biographie</span>
              <span className="px-3 py-2 text-[10px] text-muted-foreground">Le Roman de sa Vie</span>
            </div>

            {/* Masonry grid */}
            <div className="p-4 grid grid-cols-3 gap-2.5 auto-rows-min">
              {/* Card 1 — Photo + caption (spans 1 col, tall) */}
              <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden border border-border/30 bg-background">
                <img
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&h=360&fit=crop"
                  alt="Jardin de roses"
                  className="w-full h-28 object-cover"
                  loading="lazy"
                />
                <div className="p-2 space-y-1">
                  <p className="text-[8px] text-muted-foreground leading-relaxed">Chaque rose plantée ici porte ton souvenir. Tu me manques au quotidien.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] font-medium text-foreground">— Marie</span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Heart size={7} className="fill-amber-500" />
                      <span className="text-[7px]">34</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 — Audio player */}
              <div className="col-span-2 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-2.5 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                    <Play size={10} className="text-white ml-0.5" fill="white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-medium text-foreground">Souvenir vocal de Léo</p>
                    <p className="text-[7px] text-muted-foreground">1:24</p>
                  </div>
                </div>
                <AudioWaveform />
                <div className="flex items-center justify-between">
                  <span className="text-[7px] text-muted-foreground">— Léo</span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Heart size={7} className="fill-amber-500" />
                    <span className="text-[7px]">18</span>
                  </div>
                </div>
              </div>

              {/* Card 3 — Quote */}
              <div className="col-span-2 rounded-2xl border border-border/30 bg-background p-3 text-center space-y-1.5">
                <Quote size={16} className="mx-auto text-amber-400/60" />
                <p className="text-[9px] italic font-serif-display text-foreground leading-relaxed">
                  «&nbsp;Allez, on ouvre une bonne bouteille&nbsp;!&nbsp;» — Ta phrase fétiche qui résonnera toujours.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-[7px] text-muted-foreground">— Michel</span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Heart size={7} className="fill-amber-500" />
                    <span className="text-[7px]">52</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating accent card — Audio snippet */}
          <div
            className="absolute -left-6 bottom-20 w-40 bg-background/90 backdrop-blur-md rounded-xl border border-border/40 p-2.5 shadow-golden-glow animate-float z-10 hidden sm:block"
            style={{ transform: "rotateY(-3deg) rotateX(2deg)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Music size={9} className="text-amber-600" />
              </div>
              <div>
                <p className="text-[8px] font-medium text-foreground">Noël 2018</p>
                <p className="text-[7px] text-muted-foreground">Son solo de saxo</p>
              </div>
            </div>
          </div>

          {/* Floating accent card — Heart counter */}
          <div
            className="absolute -right-4 top-28 bg-background/90 backdrop-blur-md rounded-xl border border-border/40 px-3 py-2 shadow-golden-glow animate-float z-10 hidden sm:block"
            style={{ animationDelay: "2s", transform: "rotateY(3deg) rotateX(-2deg)" }}
          >
            <div className="flex items-center gap-1.5">
              <Heart size={12} className="fill-amber-500 text-amber-500" />
              <span className="text-[10px] font-medium text-foreground">127 souvenirs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
