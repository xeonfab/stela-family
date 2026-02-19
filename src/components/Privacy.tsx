import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ShieldCheck, Lock, EyeOff } from "lucide-react";
import holdingOldPhoto from "@/assets/holding-old-photo.jpg";

const features = [
  {
    icon: ShieldCheck,
    title: "Modération simplifiée : Vous validez chaque message ou photo avant sa publication.",
  },
  {
    icon: Lock,
    title: "Accès intime : Une simple question personnelle remplace les mots de passe complexes.",
  },
  {
    icon: EyeOff,
    title: "Vie privée garantie : Pas de publicité, pas de Google, pas de revente de données.",
  },
];

const Privacy = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-ceremony lg:py-[48px]">
      <div className="py-[92px] px-[128px]">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Text */}
          <div className="space-y-8">
            <div>
              <span className="text-primary font-sans-body text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">
                Sérénité Totale
              </span>
              <h2 className="font-serif-display text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                Un sanctuaire privé, réservé à <em className="italic">ceux qui l'aimaient.</em>
              </h2>
              <p className="mt-4 text-muted-foreground font-sans-body text-base lg:text-lg leading-relaxed max-w-lg">
                Un espace sécurisé, loin du bruit des réseaux sociaux, où vous gardez le contrôle absolu sur les
                souvenirs partagés.
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
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Photo */}
          <div className="flex items-center justify-center">
            <img
              src={holdingOldPhoto}
              alt="Personne tenant une vieille photo de famille"
              className="w-full h-auto rounded-3xl object-cover shadow-golden-glow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
