import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

interface Sanctuary {
  id: string;
  firstName: string;
  lastName: string;
  birthYear: string;
  deathYear: string;
  photo: string;
  role: "Famille" | "Officiant";
}

const mockSanctuaries: Sanctuary[] = [
  {
    id: "1",
    firstName: "Jean-Claude",
    lastName: "Dumont",
    birthYear: "1948",
    deathYear: "2024",
    photo: "/src/assets/jean-claude-portrait-new.jpg",
    role: "Garant",
  },
  {
    id: "2",
    firstName: "Marguerite",
    lastName: "Lefèvre",
    birthYear: "1932",
    deathYear: "2023",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    role: "Invité",
  },
  {
    id: "3",
    firstName: "Pierre",
    lastName: "Arnaud",
    birthYear: "1955",
    deathYear: "2024",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    role: "Officiant",
  },
];

const roleLabels: Record<Sanctuary["role"], string> = {
  Garant: "Garant",
  Invité: "Invité",
  Officiant: "Officiant",
};

const MesSanctuaires = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navbar */}
      <nav className="border-b border-stone-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif-display text-2xl font-bold text-[#D4AF37]">S</span>
          <button
            onClick={() => navigate("/connexion")}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-stone-400 hover:text-stone-600 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {/* Overline */}
        <p className="text-center text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium mb-4">
          Tableau de bord
        </p>

        {/* Title */}
        <h1 className="font-serif-display text-3xl md:text-4xl text-[#2C2C2C] text-center leading-snug mb-3">
          Vos espaces de recueillement
        </h1>

        <p className="text-center text-[#666666] text-base leading-relaxed max-w-xl mx-auto mb-12">
          Retrouvez les sanctuaires auxquels vous avez accès.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSanctuaries.map((s) => (
            <SanctuaryCard key={s.id} sanctuary={s} />
          ))}
        </div>
      </main>
    </div>
  );
};

function SanctuaryCard({ sanctuary }: { sanctuary: Sanctuary }) {
  const navigate = useNavigate();

  return (
    <div className="border border-stone-100 shadow-sm rounded-2xl bg-white/80 p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-500">
      {/* Photo */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-stone-100 mb-5">
        <img
          src={sanctuary.photo}
          alt={`${sanctuary.firstName} ${sanctuary.lastName}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <h2 className="font-serif-display text-lg text-[#2C2C2C] mb-1">
        {sanctuary.firstName} {sanctuary.lastName}
      </h2>

      {/* Dates */}
      <p className="text-sm text-stone-400 mb-4">
        {sanctuary.birthYear} — {sanctuary.deathYear}
      </p>

      {/* Role badge */}
      <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium border border-[#D4AF37]/20 rounded-full px-3 py-1 mb-6">
        {roleLabels[sanctuary.role]}
      </span>

      {/* CTA */}
      <button
        onClick={() => navigate("/memorial-admin")}
        className="w-full py-2.5 rounded-full border border-stone-200 text-sm text-stone-600 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
      >
        Accéder au sanctuaire
      </button>
    </div>
  );
}

export default MesSanctuaires;
