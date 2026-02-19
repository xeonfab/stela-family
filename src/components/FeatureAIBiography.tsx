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
    <section ref={ref} className="py-24 lg:py-32 overflow-hidden">
      <div
        className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Full-bleed image background with rounded corners */}
        <div className="relative rounded-3xl overflow-hidden min-h-[700px] lg:min-h-[800px] flex items-center justify-center">
          {/* Background image */}
          <img
            src={womanWriting}
            alt="Une femme écrivant ses souvenirs à la lumière dorée"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Warm dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

          {/* Centered content stack */}
          <div className="relative z-10 w-full max-w-xl mx-auto px-6 py-16 lg:py-20 flex flex-col items-center gap-10">
            {/* UI Mockup Card — frosted glass */}
            <div
              className={`w-full rounded-3xl bg-white/80 backdrop-blur-md shadow-golden-glow border-luxury p-6 lg:p-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wand2 size={18} className="text-primary" />
                </div>
                <p className="font-serif-display text-lg font-semibold text-foreground">
                  Assistant de Rédaction
                </p>
              </div>

              <div className="rounded-2xl bg-secondary p-4 mb-4">
                <p className="text-xs text-muted-foreground font-sans-body mb-1.5 uppercase tracking-wider">
                  Vos mots
                </p>
                <p className="text-sm text-foreground italic leading-relaxed">
                  "Il aimait le jardinage, le jazz et ses petits-enfants..."
                </p>
              </div>

              <div className="relative rounded-2xl p-4 overflow-hidden">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
                <div className="absolute -inset-1 rounded-2xl bg-primary/5 blur-xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-primary" />
                    <p className="text-xs text-primary font-sans-body font-semibold uppercase tracking-wider">
                      Biographie générée
                    </p>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    "Passionné de nature, Jean cultivait son jardin comme il
                    cultivait ses amitiés : avec patience et amour. Mélomane
                    averti, les notes de jazz rythmaient ses dimanches en
                    famille..."
                  </p>
                </div>
              </div>
            </div>

            {/* Text Block */}
            <div
              className={`space-y-6 text-center transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <p className="text-primary font-sans-body uppercase tracking-[0.2em] text-sm font-semibold">
                Plume Assistée
              </p>
              <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                Les mots vous manquent ?{" "}
                <em className="not-italic font-serif-display italic text-primary">
                  L'IA les trouve pour vous.
                </em>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-lg mx-auto">
                L'angoisse de la page blanche n'a pas sa place ici. Répondez à
                quelques questions simples sur sa vie, ses passions, son
                caractère... et laissez notre assistant de rédaction générer une
                biographie fidèle, émouvante et parfaitement rédigée.
              </p>
              <ul className="space-y-4 pt-4 inline-flex flex-col items-start">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <Sparkles size={18} className="text-primary" />
                    </div>
                    <span className="text-white/90 font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureAIBiography;
