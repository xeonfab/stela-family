import { useState } from "react";
import { CheckCircle } from "lucide-react";

const InvitationPrivee = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", agency: "", city: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Logo */}
        <div className="text-center mb-12">
          <span className="font-serif-display text-4xl font-bold text-[#D4AF37]">S</span>
        </div>

        {/* Overline */}
        <p className="text-center text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium mb-6">
          Invitation confidentielle
        </p>

        {/* Title */}
        <h1 className="font-serif-display text-3xl md:text-4xl text-[#2C2C2C] text-center leading-snug">
          Découvrez le standard d'excellence pour vos devis Prestige.
        </h1>

        {/* Subtitle */}
        <p className="text-center text-[#666666] mt-4 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Vous avez été sélectionné parmi les agences de votre région. Demandez votre chevalet d'essai en chêne massif
          <span className="whitespace-nowrap"> (Valeur 119€)</span>, offert pour votre agence.
        </p>

        {/* Product Teaser */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-soft aspect-video bg-stone-100 flex items-center justify-center">
          <img
            src="/placeholder.svg"
            alt="Chevalet mémorial en chêne massif dans un cadre funéraire élégant"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form / Success */}
        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="border border-stone-100 shadow-sm p-8 rounded-2xl mt-10 bg-white/80"
          >
            <div className="space-y-6">
              {[
                { key: "name", label: "Prénom et Nom", type: "text", placeholder: "Jean Dupont" },
                { key: "agency", label: "Nom de l'Agence", type: "text", placeholder: "Pompes Funèbres du Centre" },
                { key: "city", label: "Ville de l'Agence", type: "text", placeholder: "Lyon" },
                { key: "phone", label: "Numéro de téléphone (Ligne directe)", type: "tel", placeholder: "06 12 34 56 78" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs text-stone-500 mb-1.5 font-medium">{label}</label>
                  <input
                    required
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full border-0 border-b border-stone-200 bg-transparent py-2.5 text-sm text-stone-800 placeholder:text-stone-300 focus:border-[#D4AF37] focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full mt-8 py-3.5 rounded-full bg-[#D4AF37] text-white font-medium text-sm hover:bg-[#c9a432] transition-colors shadow-gold"
            >
              Recevoir mon chevalet d'essai gratuit
            </button>

            <p className="text-center text-xs italic text-[#888888] mt-4">
              Sans engagement. Limité à 5 agences pilotes par département.
            </p>
          </form>
        ) : (
          <div className="border border-stone-100 shadow-sm p-12 rounded-2xl mt-10 bg-white/80 text-center">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="text-[#D4AF37]" size={28} />
            </div>
            <h2 className="font-serif-display text-2xl text-[#2C2C2C] mb-3">Demande confirmée.</h2>
            <p className="text-stone-500 text-sm leading-relaxed max-w-md mx-auto">
              Merci. Notre fondateur vous appellera d'ici 24&nbsp;heures sur votre ligne directe pour organiser la
              livraison de votre chevalet en mains propres.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitationPrivee;
