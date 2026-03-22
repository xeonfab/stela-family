import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

const Bienvenue = () => {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  // Mock data — would come from URL params or API
  const prenom = "Jean-Claude";
  const agence = "Pompes Funèbres de l'Estuaire";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-card rounded-2xl shadow-soft border border-border/60 p-8 md:p-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <span className="font-serif-display text-2xl tracking-wide text-gradient-gold select-none">
          Stela
        </span>

        {/* Title */}
        <h1 className="font-serif-display text-2xl md:text-3xl text-foreground text-center leading-snug">
          Bienvenue dans le sanctuaire de {prenom}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-center text-sm md:text-base leading-relaxed">
          Ce mémorial a été préparé avec soin par l'agence{" "}
          <span className="font-medium text-foreground">{agence}</span>.
          Il est désormais le vôtre. Veuillez prendre connaissance et accepter
          les conditions d'utilisation pour accéder à cet espace de
          recueillement.
        </p>

        {/* Legal checkbox */}
        <div className="w-full bg-secondary/50 rounded-xl p-5 flex items-start gap-3">
          <Checkbox
            id="rgpd"
            checked={accepted}
            onCheckedChange={(v) => setAccepted(v === true)}
            className="mt-0.5 border-muted-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <label
            htmlFor="rgpd"
            className="text-sm text-foreground/80 leading-relaxed cursor-pointer select-none"
          >
            J'accepte les{" "}
            <a
              href="/cgu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Conditions Générales d'Utilisation (CGU)
            </a>{" "}
            et la{" "}
            <a
              href="/confidentialite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Politique de Confidentialité
            </a>{" "}
            de Stela.
          </label>
        </div>

        {/* CTA */}
        <button
          disabled={!accepted}
          onClick={() => navigate("/memorial")}
          className="w-full py-4 rounded-full bg-foreground text-background font-medium text-base transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
        >
          Activer mon Sanctuaire et y accéder
        </button>
      </div>
    </div>
  );
};

export default Bienvenue;
