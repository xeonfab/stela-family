import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2 } from "lucide-react";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate magic link send
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0EB] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-10 md:p-12">
          {/* Logo */}
          <div className="text-center mb-10">
            <span className="font-serif-display text-2xl tracking-wide text-[#3A3A3A]">
              Stela
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif-display text-2xl md:text-3xl text-center text-[#2C2C2C] mb-3 leading-tight">
            Accéder à vos sanctuaires
          </h1>
          <p className="text-center text-[#8A8478] text-sm leading-relaxed mb-8">
            Saisissez votre adresse e-mail pour recevoir un lien d'accès sécurisé, sans mot de passe.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B5AD9E]" />
              <Input
                type="email"
                placeholder="Votre e-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (sent) setSent(false);
                }}
                className="pl-10 h-12 rounded-xl border-[#E5E0D8] bg-[#FAFAF7] text-[#3A3A3A] placeholder:text-[#C0B9AD] focus-visible:ring-[#C5A66B]/30 focus-visible:border-[#C5A66B] transition-colors"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              disabled={!email || loading || sent}
              className="w-full h-12 rounded-xl bg-[#3A3A3A] hover:bg-[#2C2C2C] text-white font-sans-body text-sm tracking-wide transition-all duration-300 disabled:opacity-40"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Envoi en cours…
                </span>
              ) : (
                "Recevoir mon lien d'accès"
              )}
            </Button>
          </form>

          {/* Success state */}
          <div
            className={`mt-5 flex items-center gap-2 justify-center transition-all duration-500 ${
              sent
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <CheckCircle2 className="h-4 w-4 text-[#8BAA91]" />
            <span className="text-sm text-[#8BAA91]">
              Lien envoyé ! Veuillez vérifier votre boîte de réception.
            </span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#B5AD9E] mt-8">
          Vos données sont protégées et hébergées en France.
        </p>
      </div>
    </div>
  );
};

export default Connexion;
