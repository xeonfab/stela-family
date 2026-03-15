import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const plans = [
  {
    name: "L'Essentiel",
    price: "79€",
    subtitle: "L'espace de recueillement intime, 100% accessible.",
    features: [
      "Un lieu de mémoire personnel et partagé à vie.",
      "Dépôt illimité de photos, vidéos et instants précieux.",
      "Affiches de cérémonie et livret d'accueil élégants.",
      "Un sanctuaire numérique complet, sans stèle physique.",
    ],
    cta: "Ouvrir ce sanctuaire",
    featured: false,
  },
  {
    name: "L'Édition Frêne",
    price: "199€",
    subtitle: "La douceur du bois clair, le lien préservé.",
    features: [
      "Lien invisible : effleurez le bois pour ouvrir l'espace de recueillement.",
      "Stèle minimaliste en Frêne clair massif (17 × 10 cm).",
      "Gravure artisanale sur-mesure (Nom, Prénom, Dates).",
      "Livré dans son coffret de remise premium.",
      "Accès à vie à toutes les fonctions du sanctuaire.",
    ],
    cta: "Personnaliser la stèle",
    featured: true,
  },
  {
    name: "L'Édition Signature",
    price: "249€",
    subtitle: "L'élégance absolue et la profondeur du Noyer.",
    features: [
      "Lien invisible : effleurez le bois pour ouvrir l'espace de recueillement.",
      "Stèle minimaliste en Noyer massif sombre (17 × 10 cm).",
      "Finition huilée premium.",
      "Gravure artisanale sur-mesure.",
      "Livré dans son coffret de remise premium.",
      "Accès à vie à toutes les fonctions du sanctuaire.",
    ],
    cta: "Personnaliser la stèle",
    featured: false,
  },
];

const Pricing = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: '#F0EBE3' }}>
      <div
        className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-sans-body uppercase tracking-[0.3em] text-sm" style={{ color: '#8A7D72' }}>
            Nos offres
          </p>
          <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#2C2C2C' }}>
            Choisissez votre sanctuaire de mémoire
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-end">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 lg:p-10 text-center space-y-6 transition-all duration-300 ${
                plan.featured
                  ? "md:-mt-4 md:pb-12 md:pt-10 z-10"
                  : ""
              }`}
              style={{
                background: plan.featured ? '#FFFDF9' : '#FAF8F5',
                border: plan.featured ? '1px solid #C5A66B' : '0.5px solid #D9D0C5',
                boxShadow: plan.featured
                  ? '0 8px 40px -8px rgba(197, 166, 107, 0.18), 0 2px 12px -2px rgba(0,0,0,0.04)'
                  : '0 2px 8px -2px rgba(0,0,0,0.04)',
              }}
            >
              {plan.featured && (
                <span
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-sans-body font-semibold tracking-[0.2em] uppercase px-5 py-1.5 rounded-full"
                  style={{ background: '#C5A66B', color: '#FFFDF9' }}
                >
                  Populaire
                </span>
              )}

              <h3 className="font-serif-display text-xl font-semibold" style={{ color: '#2C2C2C' }}>
                {plan.name}
              </h3>

              <div>
                <span className="font-serif-display text-5xl font-bold" style={{ color: '#C5A66B' }}>
                  {plan.price}
                </span>
              </div>

              <p className="font-sans-body text-sm leading-relaxed italic" style={{ color: '#6B6159' }}>
                {plan.subtitle}
              </p>

              <ul className="space-y-3 text-left mx-auto max-w-xs">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm font-sans-body" style={{ color: '#3D3832' }}>
                    <span className="shrink-0 mt-0.5" style={{ color: '#B8A88A' }}>—</span>
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
        <div className="flex items-center justify-center gap-2 text-sm mt-12" style={{ color: '#8A7D72' }}>
          <Lock size={16} style={{ color: '#C5A66B' }} />
          <span className="font-sans-body">Paiements sécurisés. Vos souvenirs sont sanctuarisés et protégés en France.</span>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
