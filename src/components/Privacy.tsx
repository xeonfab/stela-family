import { useScrollReveal } from "@/hooks/useScrollReveal";

const Privacy = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className={`container mx-auto px-6 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-serif-display text-3xl lg:text-4xl font-bold text-foreground mb-16">
          Un Espace Privé et Contrôlé.
        </h2>

        <div className="relative w-80 h-80 mx-auto">
          {/* Outer circle */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/20 flex items-end justify-center pb-6">
            <span className="text-sm text-muted-foreground font-sans-body">Public (Infos Cérémonie)</span>
          </div>
          {/* Middle circle */}
          <div className="absolute inset-10 rounded-full border-2 border-primary/30 bg-primary/5 flex items-end justify-center pb-5">
            <span className="text-sm text-muted-foreground font-sans-body">Proches (Mot de passe)</span>
          </div>
          {/* Center circle */}
          <div className="absolute inset-20 rounded-full bg-primary/15 border-2 border-primary/50 flex items-center justify-center">
            <span className="text-sm font-semibold text-foreground font-sans-body">Famille (Admin)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
