import { useNavigate } from "react-router-dom";

const EmailInvitation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[hsl(40,33%,97%)]">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-sans-body">
            Espace de mémoire
          </p>
        </div>

        <h1 className="font-serif-display text-3xl md:text-4xl font-medium text-foreground leading-tight">
          L'espace de mémoire de<br />Jean-Claude Dubois
        </h1>

        <div className="w-12 h-px bg-[#D4AF37]/40 mx-auto" />

        <p className="text-base leading-relaxed text-muted-foreground font-sans-body max-w-md mx-auto">
          Avec toute la délicatesse de la Maison Dubois, l'espace de recueillement dédié à la mémoire
          de Jean-Claude est désormais prêt. En tant que garant de cette mémoire, nous vous invitons
          à ouvrir les portes de ce lieu intime.
        </p>

        <button
          onClick={() => navigate("/onboarding/mot-de-passe")}
          className="mt-4 inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#D4AF37] text-white text-sm font-medium tracking-wide hover:bg-[#c9a432] transition-colors duration-300 shadow-[0_4px_20px_-4px_rgba(212,175,55,0.3)]"
        >
          Accéder à l'espace
        </button>
      </div>
    </div>
  );
};

export default EmailInvitation;
