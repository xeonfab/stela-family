import { Button } from "@/components/ui/button";
import { Check, Lock, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    name: "L'Essentiel",
    price: "79€",
    subtitle: "Paiement unique. Aucun abonnement.",
    features: [
      "Espace de recueillement privatif",
      "Dépôt de photos, vidéos et anecdotes",
      "Affiches et QR Codes pour la cérémonie (Prêt-à-imprimer)",
    ],
    cta: "Créer le sanctuaire",
    featured: false,
  },
  {
    name: "L'Édition Frêne",
    price: "199€",
    subtitle: "Le sanctuaire numérique + La stèle en bois massif.",
    features: [
      "Toutes les fonctions du sanctuaire numérique",
      "Stèle minimaliste en Frêne clair (15×10 cm)",
      "Puce NFC invisible intégrée",
      "Gravure laser sur mesure (Nom, Prénom, Dates)",
      "Livraison sécurisée à domicile",
    ],
    cta: "Commander l'Édition Frêne",
    featured: true,
  },
  {
    name: "L'Édition Signature",
    price: "249€",
    subtitle: "Le sanctuaire numérique + La stèle en noyer.",
    features: [
      "Toutes les fonctions du sanctuaire numérique",
      "Stèle minimaliste en Noyer massif (Finition huilée premium)",
      "Puce NFC invisible intégrée",
      "Gravure laser sur mesure",
      "Livraison sécurisée à domicile",
    ],
    cta: "Commander l'Édition Noyer",
    featured: false,
  },
];

const Pricing = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[hsl(40,33%,97%)]">
      <div
        className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-muted-foreground font-sans-body uppercase tracking-widest text-sm">
            Nos offres
          </p>
          <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-foreground">
            Choisissez votre sanctuaire
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-end">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-3xl bg-card p-8 lg:p-10 text-center space-y-6 transition-all duration-300 ${
                plan.featured
                  ? "border border-primary/50 shadow-golden-glow md:-mt-4 md:pb-12 md:pt-10 z-10"
                  : "border-[0.5px] border-border/60 shadow-sm"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold tracking-wider uppercase px-4 py-1 rounded-full">
                  Populaire
                </span>
              )}

              <h3 className="font-serif-display text-xl font-semibold text-foreground">
                {plan.name}
              </h3>

              <div>
                <span className="font-serif-display text-5xl font-bold text-gradient-gold">
                  {plan.price}
                </span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {plan.subtitle}
              </p>

              <ul className="space-y-3 text-left mx-auto max-w-xs">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-foreground text-sm">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.featured ? "gold" : "goldOutline"}
                className="w-full py-6 text-base"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Reassurance */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mt-12">
          <Lock size={16} className="text-primary" />
          <span>Paiements sécurisés. Données hébergées et protégées en France.</span>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mt-16">
          <Accordion type="single" collapsible className="text-left">
            <AccordionItem value="storage" className="border-border/40">
              <AccordionTrigger className="font-serif-display font-medium text-foreground text-base hover:no-underline">
                Quelle est la capacité du sanctuaire numérique ?
              </AccordionTrigger>
              <AccordionContent className="font-sans-body text-muted-foreground leading-relaxed text-sm">
                Chaque espace est conçu pour accueillir généreusement les mémoires d'une vie : un nombre de textes illimité, jusqu'à 1 000 photos haute définition et 60 minutes de vidéo. Si l'élan de vos proches dépasse cette capacité, une extension vous sera proposée en douceur pour prolonger l'espace sans aucune contrainte.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Guarantee */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mt-10">
          <Shield size={16} />
          <span>Prenez le temps de l'essayer. Garantie intégrale 30 jours.</span>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
