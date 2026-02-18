import { useScrollReveal } from "@/hooks/useScrollReveal";

const events = [
{ year: "1954", title: "Naissance à Marseille", desc: "Un jour d'été, une étoile s'est levée." },
{ year: "1980", title: "Mariage avec Marie", desc: "La promesse d'une vie ensemble, tenue jusqu'au bout." },
{ year: "1992", title: "Naissance de Thomas", desc: "Le plus beau cadeau qu'ils aient reçu." },
{ year: "2023", title: "L'hommage", desc: "Sa lumière continue de briller à travers nous." }];


const FeatureTimeline = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 lg:py-[64px]">
      <div className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Text */}
        <div className={`flex-1 space-y-6 text-center lg:text-left transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
          <p className="text-primary font-sans-body uppercase tracking-[0.2em] text-sm font-semibold">Fil d'Ariane</p>
          <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
            Le fil de sa vie, retissé avec <em className="not-italic font-serif-display italic text-primary">clarté.</em>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Mettez de l'ordre dans le chaos des souvenirs. Notre interface organise automatiquement les moments clés chronologiquement. De sa naissance à ses plus grands accomplissements.
          </p>
        </div>

        {/* Visual — Timeline mockup */}
        <div className={`flex-1 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
          <div className="rounded-3xl shadow-golden-glow border-luxury bg-card p-8 lg:p-10 max-w-md mx-auto">
            <p className="font-serif-display text-lg font-semibold text-foreground mb-8">Biographie</p>
            <div className="relative pl-8">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-primary/30" />
              {events.map((ev, i) =>
              <div key={i} className="relative mb-10 last:mb-0">
                  <div className="absolute -left-5 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-card" />
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif-display text-primary font-bold text-lg shrink-0">{ev.year}</span>
                  </div>
                  <p className="font-semibold text-foreground mt-1">{ev.title}</p>
                  <p className="text-muted-foreground text-sm mt-0.5 italic">{ev.desc}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default FeatureTimeline;