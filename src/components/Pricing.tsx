import { Button } from "@/components/ui/button";
import { Check, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  "Hébergement illimité",
  "Kit Cérémonie inclus",
  "Aucune publicité",
  "Support prioritaire",
];

const Pricing = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className={`container mx-auto px-6 flex justify-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="w-full max-w-md rounded-3xl bg-card border-2 border-primary shadow-gold p-10 text-center space-y-8">
          <p className="text-muted-foreground font-sans-body uppercase tracking-widest text-sm">Paiement unique</p>
          <div>
            <span className="font-serif-display text-6xl font-bold text-foreground">49€</span>
          </div>
          <p className="text-muted-foreground">Valable 25 ans. Sans abonnement.</p>

          <ul className="space-y-3 text-left mx-auto max-w-xs">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-foreground">
                <Check size={18} className="text-primary shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/85 transition-transform duration-200 hover:scale-105 py-6 text-base shadow-gold">
            Créer le Mémorial
          </Button>

          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Shield size={16} />
            <span>Garantie Satisfait ou Remboursé 30 jours</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
