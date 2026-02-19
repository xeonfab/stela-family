import { BookOpen } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const PremiumUpsell = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-14 lg:py-16"
      style={{ backgroundColor: "#F5F4F0" }}
    >
      <div
        className={`container mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <BookOpen size={24} className="mx-auto text-primary" />

          <h2 className="font-serif-display text-2xl lg:text-3xl font-bold text-foreground leading-tight">
            L'héritage entre vos mains.
          </h2>

          <p className="font-sans-body text-muted-foreground leading-relaxed">
            À tout moment après la cérémonie, transformez ce sanctuaire numérique
            en un magnifique recueil imprimé. Vos photos, messages et biographies
            sont mis en page automatiquement dans un livre d'art premium
            (disponible en option).
          </p>
        </div>
      </div>
    </section>
  );
};

export default PremiumUpsell;
