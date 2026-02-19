import { Button } from "@/components/ui/button";
import { Star, Image, AlignLeft, Mic, Heart } from "lucide-react";
import { Link } from "react-router-dom";

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

      {/* Right — Biography Dashboard Mockup */}
      <div className="flex-1 flex justify-center">
        <div className="relative" style={{ perspective: "1200px" }}>
          {/* Main browser frame */}
          <div
            className="relative w-[340px] sm:w-[420px] lg:w-[480px] bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-[0_25px_80px_-15px_hsl(var(--primary)/0.25)] overflow-hidden"
            style={{ transform: "rotateY(-5deg) rotateX(5deg)" }}
          >
            {/* Browser top bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-background/60">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent/50" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-muted/50 rounded-md px-3 py-1 text-[10px] text-muted-foreground text-center">
                  stela.memorial/arthur-rimbaud
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-5 space-y-4">
              {/* Profile header */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-muted to-muted/60 border-2 border-primary/20 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
                    alt="Portrait"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif-display text-lg font-bold text-foreground">Arthur Rimbaud</h3>
                <p className="text-xs text-muted-foreground">1854 — 1891</p>
                <p className="text-[11px] text-muted-foreground/80 italic">
                  "I is another. If brass wakes up a trumpet, it is not its fault."
                </p>
                <p className="text-[10px] text-muted-foreground/60">Poet, Visionary, Revolutionary</p>
              </div>

              {/* Tabs */}
              <div className="flex justify-center gap-1">
                <div className="px-4 py-1.5 text-[10px] text-muted-foreground rounded-full">Timeline</div>
                <div className="px-4 py-1.5 text-[10px] font-medium text-foreground bg-muted/50 rounded-full">
                  Tributes
                </div>
              </div>

              {/* Filter pills */}
              <div className="flex justify-center gap-1.5 flex-wrap">
                <span className="px-3 py-1 text-[9px] font-medium bg-primary text-primary-foreground rounded-full">
                  All
                </span>
                <span className="px-3 py-1 text-[9px] text-muted-foreground bg-muted/40 rounded-full flex items-center gap-1">
                  <Image size={8} /> Photos
                </span>
                <span className="px-3 py-1 text-[9px] text-muted-foreground bg-muted/40 rounded-full flex items-center gap-1">
                  <AlignLeft size={8} /> Stories
                </span>
                <span className="px-3 py-1 text-[9px] text-muted-foreground bg-muted/40 rounded-full flex items-center gap-1">
                  <Mic size={8} /> Voices
                </span>
              </div>

              {/* Content grid */}
              <div className="grid grid-cols-3 gap-2">
                {/* Photo card */}
                <div className="col-span-1 rounded-xl overflow-hidden border border-border/30 bg-background">
                  <img
                    src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=200&h=160&fit=crop"
                    alt="Trip to Rome"
                    className="w-full h-20 object-cover"
                    loading="lazy"
                  />
                  <div className="p-1.5">
                    <p className="text-[8px] text-muted-foreground">Trip to Rome, 2018</p>
                    <div className="flex items-center gap-0.5 mt-1 text-primary">
                      <Heart size={7} className="fill-primary" />
                      <span className="text-[7px]">24</span>
                    </div>
                  </div>
                </div>

                {/* Story card */}
                <div className="col-span-1 rounded-xl border border-border/30 bg-background p-2 flex flex-col justify-between">
                  <p className="text-[7px] text-muted-foreground leading-relaxed line-clamp-5">
                    Chaque année, à son anniversaire, je visite Charleville et je laisse des fleurs devant sa maison
                    d'enfance...
                  </p>
                  <div className="mt-1.5">
                    <p className="text-[7px] font-medium text-foreground">Claire R.</p>
                    <div className="flex items-center gap-0.5 text-primary">
                      <Heart size={7} className="fill-primary" />
                      <span className="text-[7px]">27</span>
                    </div>
                  </div>
                </div>

                {/* Quote card */}
                <div className="col-span-1 rounded-xl border border-border/30 bg-primary/5 p-2 flex flex-col justify-between">
                  <p className="text-[8px] text-foreground italic font-serif-display leading-snug">
                    « On n'est pas sérieux, quand on a dix-sept ans. »
                  </p>
                  <div className="flex items-center gap-0.5 mt-1 text-primary">
                    <Heart size={7} className="fill-primary" />
                    <span className="text-[7px]">28</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating card 1 — Quote */}
          <div
            className="absolute -left-8 bottom-16 w-44 bg-background/90 backdrop-blur-md rounded-xl border border-border/40 p-3 shadow-golden-glow animate-float z-10"
            style={{ transform: "rotateY(-3deg) rotateX(2deg)" }}
          >
            <p className="text-[10px] text-foreground italic font-serif-display leading-snug">
              « Je est un autre » — des mots qui ont changé le monde.
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[8px] text-muted-foreground">1 month ago</span>
              <div className="flex items-center gap-0.5 text-primary">
                <Heart size={8} className="fill-primary" />
                <span className="text-[8px]">39</span>
              </div>
            </div>
          </div>

          {/* Floating card 2 — Story snippet */}
          <div
            className="absolute -right-6 top-24 w-40 bg-background/90 backdrop-blur-md rounded-xl border border-border/40 p-3 shadow-golden-glow animate-float z-10"
            style={{ animationDelay: "2s", transform: "rotateY(3deg) rotateX(-2deg)" }}
          >
            <p className="text-[9px] text-muted-foreground leading-relaxed line-clamp-3">
              J'ai grandi en lisant ses Illuminations. Chaque poème était une fenêtre ouverte sur des mondes
              impossibles...
            </p>
            <p className="text-[8px] font-medium text-foreground mt-1.5">Michel L.</p>
            <div className="flex items-center gap-0.5 text-primary mt-0.5">
              <Heart size={8} className="fill-primary" />
              <span className="text-[8px]">41</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
