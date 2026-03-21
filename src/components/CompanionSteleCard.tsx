import { ArrowRight } from "lucide-react";

const CompanionSteleCard = () => (
  <div className="break-inside-avoid mb-6">
    <div className="bg-card rounded-2xl border border-primary/15 shadow-md overflow-hidden">
      {/* Placeholder image */}
      <div className="w-full aspect-[4/3] bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--secondary))] flex items-center justify-center">
        <p className="text-muted-foreground/40 text-xs tracking-widest uppercase">Photo d'ambiance</p>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="font-serif-display text-lg text-foreground leading-snug">
          Gardez ce lien près de vous.
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Permettez à ce sanctuaire de vivre également dans votre foyer. La Stèle Compagne est un objet
          d'artisanat pensé pour les proches souhaitant un espace de recueillement privé chez eux.
        </p>
        <div className="flex justify-center pt-1">
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-card text-foreground text-sm font-medium hover:border-primary/40 hover:text-primary transition-all duration-300">
            Découvrir l'Édition Compagne
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CompanionSteleCard;
