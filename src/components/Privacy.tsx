import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ShieldCheck, Lock, EyeOff, Check, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ShieldCheck,
    title: "Le Sas de Modération",
    description: "Activez l'approbation préalable. Aucun souvenir n'apparaît publiquement sans votre validation.",
  },
  {
    icon: Lock,
    title: "La Question Secrète",
    description:
      "Protégez l'accès au mémorial par une question intime (ex\u00a0: «\u00a0Quel était le surnom de son chien\u00a0?\u00a0») connue seuls des vrais proches.",
  },
  {
    icon: EyeOff,
    title: "Confidentialité Garantie",
    description: "Vos données ne sont jamais vendues. Pas de publicité, pas de tracking. Un sanctuaire inviolable.",
  },
];

const Privacy = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-ceremony">
      <div
        className={`container mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Text */}
          <div className="space-y-8">
            <div>
              <span className="text-primary font-sans-body text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">
                Sérénité Totale
              </span>
              <h2 className="font-serif-display text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                Un sanctuaire privé, réservé à ceux qui l'aimaient.
              </h2>
              <p className="mt-4 text-muted-foreground font-sans-body text-base lg:text-lg leading-relaxed max-w-lg">
                Contrairement aux réseaux sociaux, ici, vous êtes chez vous. Stela vous offre un contrôle absolu sur qui
                accède et qui publie.
              </p>
            </div>

            <ul className="space-y-6">
              {features.map((f) => (
                <li key={f.title} className="flex gap-4 items-start">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <f.icon className="h-4 w-4 text-primary" />
                  </span>
                  <div>
                    <h3 className="font-sans-body text-sm font-semibold text-foreground">{f.title}</h3>
                    <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mt-0.5">
                      {f.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Moderation card mockup */}
          <div className="relative flex items-center justify-center">
            {/* Background shield glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
              <ShieldCheck className="h-72 w-72 text-primary" strokeWidth={0.7} />
            </div>

            {/* Floating moderation card */}
            <div className="relative w-full max-w-sm animate-float">
              <div className="rounded-3xl backdrop-blur-xl bg-background/70 border-luxury shadow-golden-glow p-6 space-y-5">
                {/* Card header */}
                <div className="flex items-center justify-between">
                  <h4 className="font-sans-body text-sm font-semibold text-foreground">Approbation en attente</h4>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary font-sans-body">
                    1
                  </span>
                </div>

                {/* Pending item */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold font-sans-body">
                      S
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans-body text-sm font-medium text-foreground truncate">
                      Sophie a partagé une photo
                    </p>
                    <p className="font-sans-body text-xs text-muted-foreground">Il y a 2 minutes</p>
                  </div>
                  {/* Blurry thumbnail */}
                  <div className="h-10 w-10 rounded-lg bg-primary/10 blur-[2px] shrink-0" />
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="flex-1 rounded-xl bg-gradient-to-b from-primary to-[hsl(43_56%_42%)] text-primary-foreground font-sans-body text-xs gap-1.5"
                  >
                    <Check className="h-3.5 w-3.5" /> Approuver
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 rounded-xl font-sans-body text-xs text-muted-foreground gap-1.5"
                  >
                    <X className="h-3.5 w-3.5" /> Masquer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
