import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

type View = "login" | "forgot" | "forgot-success";

export default function ProLogin() {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/pro/creer";
    }, 1200);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView("forgot-success");
    }, 1200);
  };

  const goBack = () => {
    setView("login");
    setForgotEmail("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#FAF9F7" }}>
      <Card className="w-full max-w-md border-[#2C2C2C]/[0.06] shadow-[0_2px_24px_-4px_rgba(0,0,0,0.06)]">
        <CardContent className="pt-10 pb-8 px-8">
          {/* Logo */}
          <p className="font-serif text-3xl tracking-wide text-center mb-1" style={{ color: "#C5A66B" }}>
            Stela
          </p>

          {/* ── LOGIN VIEW ── */}
          {view === "login" && (
            <>
              <h1 className="font-serif text-xl text-[#2C2C2C] text-center mt-6 mb-1">
                Accès Partenaire
              </h1>
              <p className="text-[13px] text-[#2C2C2C]/45 text-center mb-8">
                Connectez-vous à votre espace professionnel Stela.
              </p>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[13px] text-[#2C2C2C]/60">
                    Adresse e-mail professionnelle
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@agence.fr"
                    className="border-[#2C2C2C]/10 focus-visible:ring-[#D4AF37]/30 bg-transparent"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-[13px] text-[#2C2C2C]/60">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="border-[#2C2C2C]/10 focus-visible:ring-[#D4AF37]/30 bg-transparent"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full font-medium tracking-wide"
                  style={{ backgroundColor: "#C5A66B", color: "#fff" }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Connexion…
                    </span>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>

              <div className="text-center mt-5">
                <button
                  type="button"
                  onClick={() => setView("forgot")}
                  className="text-[12px] text-[#2C2C2C]/35 hover:text-[#2C2C2C]/55 transition-colors"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              <div className="text-center mt-3">
                <Link
                  to="/memorial"
                  className="text-[12px] text-[#2C2C2C]/35 hover:text-[#2C2C2C]/55 transition-colors"
                >
                  Voir un exemple de sanctuaire
                </Link>
              </div>
            </>
          )}

          {/* ── FORGOT PASSWORD VIEW ── */}
          {view === "forgot" && (
            <>
              <h1 className="font-serif text-xl text-[#2C2C2C] text-center mt-6 mb-1">
                Mot de passe oublié
              </h1>
              <p className="text-[13px] text-[#2C2C2C]/45 text-center mb-8">
                Entrez votre adresse e-mail professionnelle pour recevoir un lien de réinitialisation.
              </p>

              <form onSubmit={handleForgot} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="forgot-email" className="text-[13px] text-[#2C2C2C]/60">
                    Adresse e-mail professionnelle
                  </Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="nom@agence.fr"
                    className="border-[#2C2C2C]/10 focus-visible:ring-[#D4AF37]/30 bg-transparent"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!forgotEmail || loading}
                  className="w-full rounded-full font-medium tracking-wide"
                  style={{ backgroundColor: "#C5A66B", color: "#fff" }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi…
                    </span>
                  ) : (
                    "Envoyer le lien"
                  )}
                </Button>
              </form>

              <div className="text-center mt-5">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-[12px] text-[#2C2C2C]/35 hover:text-[#2C2C2C]/55 transition-colors"
                >
                  ← Retour à la connexion
                </button>
              </div>
            </>
          )}

          {/* ── FORGOT SUCCESS VIEW ── */}
          {view === "forgot-success" && (
            <div className="text-center mt-8">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "rgba(197,166,107,0.1)" }}
              >
                <CheckCircle className="w-7 h-7" style={{ color: "#C5A66B" }} />
              </div>
              <h2 className="font-serif text-xl text-[#2C2C2C] mb-3">
                Vérifiez votre boîte mail
              </h2>
              <p className="text-[13px] text-[#2C2C2C]/50 leading-relaxed mb-8 max-w-xs mx-auto">
                Si un compte est associé à cette adresse, vous recevrez un lien de réinitialisation sous peu.
              </p>
              <button
                type="button"
                onClick={goBack}
                className="text-[13px] text-[#2C2C2C]/45 hover:text-[#2C2C2C]/65 transition-colors"
              >
                ← Retour à la connexion
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
