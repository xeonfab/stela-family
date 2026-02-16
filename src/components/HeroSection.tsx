import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const photos = [
  { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=400&fit=crop", h: "h-48" },
  { url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=300&fit=crop&sat=-100", h: "h-36" },
  { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=350&fit=crop", h: "h-44" },
  { url: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=300&h=280&fit=crop&sat=-100", h: "h-32" },
  { url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=300&h=380&fit=crop", h: "h-40" },
  { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=320&fit=crop&sat=-100", h: "h-36" },
];

const HeroSection = () => (
  <section className="pt-28 pb-20 lg:pb-32 lg:pt-36">
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
          <Button variant="outline" className="rounded-full border-muted-foreground/30 text-foreground px-8 py-6 text-base hover:bg-secondary transition-transform duration-200 hover:scale-105">
            Voir un exemple
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

      {/* Right — iPhone mockup */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-[280px] h-[560px] bg-foreground rounded-[3rem] p-3 shadow-golden-glow">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-b-2xl z-10" />
          <div className="w-full h-full bg-background rounded-[2.4rem] overflow-hidden p-2">
            <div className="columns-2 gap-2 space-y-2">
              {photos.map((p, i) => (
                <img
                  key={i}
                  src={p.url}
                  alt="Souvenir"
                  className={`${p.h} w-full object-cover rounded-xl break-inside-avoid`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
