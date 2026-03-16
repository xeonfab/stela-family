import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    // Future: real auth
    setTimeout(() => {
      window.location.href = "/pro/creer";
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

          {/* Heading */}
          <h1 className="font-serif text-xl text-[#2C2C2C] text-center mt-6 mb-1">
            Accès Partenaire
          </h1>
          <p className="text-[13px] text-[#2C2C2C]/45 text-center mb-8">
            Connectez-vous à votre espace professionnel Stela.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
            <Link
              to="#"
              className="text-[12px] text-[#2C2C2C]/35 hover:text-[#2C2C2C]/55 transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
