import { Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const timelineItems = [
  { year: "1960", label: "Naissance" },
  { year: "1985", label: "Mariage" },
  { year: "2023", label: "Hommage" },
];

const Features = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-serif-display text-3xl lg:text-4xl font-bold text-center mb-16 text-foreground">
          Les Fonctionnalités du Sanctuaire
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto auto-rows-[200px]">
          {/* Card A — Mur de Souvenirs (2 cols) */}
          <div className="md:col-span-2 row-span-2 rounded-3xl shadow-soft bg-card p-8 flex flex-col justify-between overflow-hidden relative">
            <div>
              <h3 className="font-serif-display text-2xl font-semibold text-foreground mb-2">Le Mur de Souvenirs Vivant</h3>
              <p className="text-muted-foreground">Photos, vidéos et messages réunis dans une mosaïque interactive.</p>
            </div>
            <div className="columns-3 gap-2 mt-6">
              {[
                "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=150&fit=crop",
                "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&h=200&fit=crop&sat=-100",
                "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&h=180&fit=crop",
                "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200&h=160&fit=crop&sat=-100",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=190&fit=crop",
                "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=200&h=170&fit=crop&sat=-100",
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="w-full h-auto rounded-xl mb-2 break-inside-avoid object-cover" loading="lazy" />
              ))}
            </div>
          </div>

          {/* Card B — Timeline (1 col, tall) */}
          <div className="row-span-2 rounded-3xl shadow-soft bg-card p-8 flex flex-col">
            <h3 className="font-serif-display text-xl font-semibold text-foreground mb-6">La Timeline Interactive</h3>
            <div className="flex-1 relative pl-8">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-primary/30" />
              {timelineItems.map((item, i) => (
                <div key={i} className="relative mb-10 last:mb-0">
                  <div className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-primary border-4 border-card" />
                  <p className="font-serif-display text-lg font-bold text-foreground">{item.year}</p>
                  <p className="text-muted-foreground text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card C — Bio IA (wide, bottom) */}
          <div className="md:col-span-3 rounded-3xl shadow-soft bg-card p-8 flex items-center gap-6">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Sparkles size={28} className="text-primary" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl font-semibold text-foreground mb-1">Biographie Assistée par IA</h3>
              <p className="text-muted-foreground italic">"L'IA vous aide à trouver les mots justes pour raconter leur histoire avec dignité..."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
