import { Mic, Video, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const microFeatures = [
  { icon: Mic, label: "Lecteur Audio Intégré" },
  { icon: Video, label: "Support Vidéo 4K" },
  { icon: Heart, label: "Réactions des proches" },
];

const FeatureMemoryWall = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div
        className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Visual — Masonry Mockup */}
        <div
          className={`flex-1 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
        >
          <div className="rounded-3xl shadow-golden-glow border-luxury bg-card p-4 max-w-lg mx-auto">
            <div className="columns-2 gap-3 space-y-3">
              {/* Photo large */}
              <img
                src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=500&fit=crop"
                alt="Rome"
                className="w-full rounded-2xl object-cover break-inside-avoid"
                loading="lazy"
              />

              {/* Quote card */}
              <div className="rounded-2xl bg-secondary p-5 break-inside-avoid">
                <p className="font-serif-display text-foreground italic text-sm leading-relaxed">
                  "Life is for the living. Death is for the dead. Let life be like music. And death a note unsaid."
                </p>
                <p className="text-muted-foreground text-xs mt-3">— Langston Hughes</p>
              </div>
              {/* Audio player card */}
              <div className="rounded-2xl bg-secondary p-4 break-inside-avoid space-y-2">
                <p className="text-xs text-muted-foreground font-sans-body">Message vocal</p>
                <p className="text-sm font-semibold text-foreground">Thomas</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-primary ml-0.5" />
                  </div>
                  <div className="flex-1 flex items-end gap-[2px] h-5">
                    {[3, 5, 8, 4, 7, 10, 6, 9, 3, 7, 5, 8, 4, 6, 9, 5, 3, 7, 10, 6, 4, 8, 5, 3].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/40 rounded-full" style={{ height: `${h * 2}px` }} />
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground">1:24</span>
                </div>
              </div>
              {/* Photo */}
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&sat=-100"
                alt="Famille"
                className="w-full rounded-2xl object-cover break-inside-avoid"
                loading="lazy"
              />

              {/* Video thumbnail */}
              <div className="relative rounded-2xl overflow-hidden break-inside-avoid">
                <img
                  src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=250&fit=crop"
                  alt="Vidéo"
                  className="w-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-foreground ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className={`flex-1 space-y-6 text-center lg:text-left transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
        >
          <p className="text-primary font-sans-body uppercase tracking-[0.2em] text-sm font-semibold">
            Immersion Totale
          </p>
          <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
            Retrouvez son rire, sa voix, son histoire.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Recueillez les rires en photos les anecdotes audio et les vidéos. Réécoutez sa voix, revivez ses rires.
          </p>
          <ul className="space-y-4 pt-4">
            {microFeatures.map((f, i) => (
              <li key={i} className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon size={20} className="text-primary" />
                </div>
                <span className="text-foreground font-medium">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FeatureMemoryWall;
