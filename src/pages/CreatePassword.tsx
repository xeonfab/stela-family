import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const CreatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length > 0) {
      navigate("/onboarding/photo");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[hsl(40,33%,97%)]">
      <div className="max-w-sm w-full text-center space-y-8">
        <h1 className="font-serif-display text-3xl md:text-4xl font-medium text-foreground">
          Protégez cet espace.
        </h1>

        <p className="text-sm leading-relaxed text-muted-foreground font-sans-body">
          Choisissez un mot de passe confidentiel pour sécuriser vos souvenirs
          et valider les hommages de vos proches.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe secret"
              className="w-full bg-transparent border-b border-border focus:border-[#D4AF37] outline-none py-3 text-center text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors duration-300 font-sans-body"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={password.trim().length === 0}
            className="inline-flex items-center justify-center px-10 py-3 rounded-full bg-[#D4AF37] text-white text-sm font-medium tracking-wide hover:bg-[#c9a432] transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(212,175,55,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Entrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;
