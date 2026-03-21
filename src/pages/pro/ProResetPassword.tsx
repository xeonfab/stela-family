import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ProResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const isValid = password.length >= 6 && password === confirm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#FAF9F7" }}>
      <Card className="w-full max-w-md border-[#2C2C2C]/[0.06] shadow-[0_2px_24px_-4px_rgba(0,0,0,0.06)]">
        <CardContent className="pt-10 pb-8 px-8">
          {/* Logo */}
          <p className="font-serif text-3xl tracking-wide text-center mb-1" style={{ color: "#C5A66B" }}>
            Stela
          </p>

          {done ? (
            <div className="text-center mt-8">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "rgba(197,166,107,0.1)" }}>
                <CheckCircle className="w-7 h-7" style={{ color: "#C5A66B" }} />
              </div>
              <h2 className="font-serif text-xl text-[#2C2C2C] mb-3">
                Mot de passe mis à jour
              </h2>
              <p className="text-[13px] text-[#2C2C2C]/50 leading-relaxed mb-8">
                Votre nouveau mot de passe a été enregistré avec succès. Vous pouvez maintenant vous connecter.
              </p>
              <Link
                to="/pro/login"
                className="inline-flex items-center justify-center w-full rounded-full font-medium tracking-wide h-11 px-8 text-sm text-white"
                style={{ backgroundColor: "#C5A66B" }}
              >
                Se connecter
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-xl text-[#2C2C2C] text-center mt-6 mb-1">
                Nouveau mot de passe
              </h1>
              <p className="text-[13px] text-[#2C2C2C]/45 text-center mb-8">
                Choisissez un nouveau mot de passe pour votre espace professionnel.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="new-password" className="text-[13px] text-[#2C2C2C]/60">
                    Nouveau mot de passe
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="border-[#2C2C2C]/10 focus-visible:ring-[#D4AF37]/30 bg-transparent"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm-password" className="text-[13px] text-[#2C2C2C]/60">
                    Confirmer le mot de passe
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="border-[#2C2C2C]/10 focus-visible:ring-[#D4AF37]/30 bg-transparent"
                  />
                  {confirm && password !== confirm && (
                    <p className="text-[12px] text-red-400 mt-1">Les mots de passe ne correspondent pas.</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={!isValid || loading}
                  className="w-full rounded-full font-medium tracking-wide"
                  style={{ backgroundColor: "#C5A66B", color: "#fff" }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Mise à jour…
                    </span>
                  ) : (
                    "Mettre à jour le mot de passe"
                  )}
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
