import { useState } from "react";
import { CheckCircle, Mail } from "lucide-react";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
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
          Espace personnel
        </p>

        {/* Title */}
        <h1 className="font-serif-display text-3xl md:text-4xl text-[#2C2C2C] text-center leading-snug">
          Accéder à vos sanctuaires
        </h1>

        {/* Subtitle */}
        <p className="text-center text-[#666666] mt-4 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Saisissez votre adresse e-mail pour recevoir un lien d'accès sécurisé, sans mot de passe.
        </p>

        {/* Form / Success */}
        {!sent ? (
          <form
            onSubmit={handleSubmit}
            className="border border-stone-100 shadow-sm p-8 rounded-2xl mt-10 bg-white/80"
          >
            <div>
              <label className="block text-xs text-stone-500 mb-1.5 font-medium">Votre e-mail</label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-300" />
                <input
                  required
                  type="email"
                  placeholder="jean.dupont@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-0 border-b border-stone-200 bg-transparent py-2.5 pl-6 text-sm text-stone-800 placeholder:text-stone-300 focus:border-[#D4AF37] focus:ring-0 focus:outline-none transition-colors"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!email || loading}
              className="w-full mt-8 py-3.5 rounded-full bg-[#D4AF37] text-white font-medium text-sm hover:bg-[#c9a432] transition-colors shadow-gold disabled:opacity-40"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Envoi en cours…
                </span>
              ) : (
                "Recevoir mon lien d'accès"
              )}
            </button>

            <p className="text-center text-xs italic text-[#888888] mt-4">
              Vos données sont protégées et hébergées en France.
            </p>
          </form>
        ) : (
          <div className="border border-stone-100 shadow-sm p-12 rounded-2xl mt-10 bg-white/80 text-center">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="text-[#D4AF37]" size={28} />
            </div>
            <h2 className="font-serif-display text-2xl text-[#2C2C2C] mb-3">Lien envoyé !</h2>
            <p className="text-stone-500 text-sm leading-relaxed max-w-md mx-auto">
              Veuillez vérifier votre boîte de réception. Cliquez sur le lien sécurisé pour accéder à vos sanctuaires.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connexion;
