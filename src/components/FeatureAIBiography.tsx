import { Sparkles, Wand2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import womanWriting from "@/assets/woman-writing.jpg";

const features = [
  "Génération instantanée de la biographie",
  "Ton ajustable : Solennel, Joyeux ou Poétique",
  "Correction orthographique automatique",
];

const FeatureAIBiography = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 overflow-hidden bg-background">
      <div
        className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Layered Visual Stack */}
          <div
            className={`relative transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            {/* Base Layer — Photo */}
            <div className="relative">
              <img
                src={womanWriting}
                alt="Une femme écrivant ses souvenirs à la lumière dorée"
                className="w-full rounded-3xl object-cover aspect-[4/5] max-h-[600px]"
              />
            </div>

            {/* Top Layer — UI Card, offset down-right */}
            <div className="absolute bottom-[-40px] right-[-40px] w-[85%] max-w-sm rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl border-luxury p-6 lg:p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wand2 size={18} className="text-primary" />
                </div>
                <p className="font-serif-display text-base font-semibold text-foreground">
                  Assistant de Rédaction
                </p>
              </div>

              <div className="rounded-2xl bg-secondary p-3.5 mb-3">
                <p className="text-xs text-muted-foreground font-sans-body mb-1 uppercase tracking-wider">
                  Vos mots
                </p>
                <p className="text-sm text-foreground italic leading-relaxed">
                  "Il aimait le jardinage, le jazz et ses petits-enfants..."
                </p>
              </div>

              <div className="relative rounded-2xl p-3.5 overflow-hidden">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
                <div className="absolute -inset-1 rounded-2xl bg-primary/5 blur-xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles size={14} className="text-primary" />
                    <p className="text-xs text-primary font-sans-body font-semibold uppercase tracking-wider">
                      Biographie générée
                    </p>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    "Passionné de nature, Jean cultivait son jardin comme il
                    cultivait ses amitiés : avec patience et amour..."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Text Content */}
          <div
            className={`flex flex-col justify-center lg:pl-12 xl:pl-16 space-y-6 pt-16 lg:pt-0 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            <p className="text-primary font-sans-body uppercase tracking-[0.2em] text-sm font-semibold">
              Plume Assistée
            </p>
            <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
              Les mots vous manquent ?{" "}
              <em className="not-italic font-serif-display italic text-primary">
                L'IA les trouve pour vous.
              </em>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              L'angoisse de la page blanche n'a pas sa place ici. Répondez à
              quelques questions simples sur sa vie, ses passions, son
              caractère... et laissez notre assistant de rédaction générer une
              biographie fidèle, émouvante et parfaitement rédigée.
            </p>
            <ul className="space-y-4 pt-4">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles size={18} className="text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureAIBiography;
