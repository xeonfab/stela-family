import { Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import premiumBookMockup from "@/assets/premium-book-mockup.jpg";

const bullets = [
  "Mise en page automatique (aucun effort)",
  "Impression qualité Édition (Papier d'art 170g)",
  "Couverture rigide et reliure cousue",
];

const PremiumUpsell = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#EAE8E4" }}
    >
      <div
        className={`container mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left — Book Visual (2/5) */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-foreground/5 translate-x-3 translate-y-3" />
              <img
                src={premiumBookMockup}
                alt="Le Recueil — livre d'art mémorial imprimé"
                className="relative rounded-2xl shadow-2xl w-full max-w-sm object-cover"
              />
            </div>
          </div>

          {/* Right — Copy (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            <p className="font-sans-body uppercase tracking-[0.2em] text-sm text-primary font-medium">
              L'Héritage Tangible
            </p>

            <h2 className="font-serif-display text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              Le Recueil : de l'écran à vos mains.
            </h2>

            <p className="text-muted-foreground leading-relaxed max-w-xl">
              Ne laissez pas ces précieux témoignages se perdre dans le cloud.
              Quelques semaines ou quelques mois après la cérémonie, Stela vous
              permet de transformer l'intégralité du mémorial — biographie,
              photos, messages des proches — en un magnifique livre d'art
              imprimé.
            </p>

            <ul className="space-y-3 pt-2">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-foreground"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                    <Check size={14} className="text-primary" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <p className="text-muted-foreground text-sm italic pt-2">
              Disponible en option depuis l'espace administrateur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumUpsell;
