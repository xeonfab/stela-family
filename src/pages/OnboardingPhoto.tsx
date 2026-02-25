import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Loader2 } from "lucide-react";

const OnboardingPhoto = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/memorial");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[hsl(40,33%,97%)]">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="font-serif-display text-3xl md:text-4xl font-medium text-foreground">
          Bienvenue.
        </h1>

        <p className="text-sm leading-relaxed text-muted-foreground font-sans-body">
          Avant l'hommage, prenez un instant pour personnaliser ce lieu.
        </p>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mx-auto flex items-center justify-center w-52 h-52 md:w-64 md:h-64 rounded-2xl border-2 border-dashed border-stone-300 hover:border-[#D4AF37]/50 transition-colors duration-300 cursor-pointer group"
        >
          {loading ? (
            <Loader2 size={28} className="text-[#D4AF37] animate-spin" />
          ) : (
            <Camera size={28} className="text-stone-300 group-hover:text-[#D4AF37]/60 transition-colors duration-300" />
          )}
        </button>

        <p className="text-xs leading-relaxed text-muted-foreground font-sans-body max-w-xs mx-auto">
          <span className="font-medium text-foreground/70">Ajouter sa photographie</span>
          <br />
          Choisissez une image qui lui ressemble, elle accueillera vos proches.
        </p>
      </div>
    </div>
  );
};

export default OnboardingPhoto;
