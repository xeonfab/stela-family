import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SuperAdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      navigate("/stela-hq");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-8 space-y-6 shadow-2xl"
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-white tracking-tight">
                Administration Centrale
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Accès réservé à l'équipe Stela
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300 text-xs uppercase tracking-wider">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@stela.fr"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-xs uppercase tracking-wider">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-white/20"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full bg-white text-slate-900 hover:bg-slate-200 font-semibold rounded-xl h-11"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-slate-900" />
            ) : (
              "Accéder au QG"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
