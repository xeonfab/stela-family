import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Sanctuary {
  id: string;
  firstName: string;
  lastName: string;
  birthYear: string;
  deathYear: string;
  photo: string;
  role: "Garant" | "Invité" | "Officiant";
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

const roleStyles: Record<Sanctuary["role"], string> = {
  Garant: "bg-[#C5A66B]/10 text-[#C5A66B] border-[#C5A66B]/20",
  Invité: "bg-[#8BAA91]/10 text-[#6B8F72] border-[#8BAA91]/20",
  Officiant: "bg-[#A09484]/10 text-[#7A6E60] border-[#A09484]/20",
};

const MesSanctuaires = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/connexion");
  };

  return (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-[#E8E3DC] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="font-serif-display text-xl tracking-wide text-[#3A3A3A]">
            Stela
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-[#8A8478] hover:text-[#3A3A3A] transition-colors duration-300"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="font-serif-display text-2xl md:text-3xl text-[#2C2C2C] mb-2">
          Vos espaces de recueillement
        </h1>
        <p className="text-[#8A8478] text-sm mb-10">
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
    <div className="bg-white rounded-2xl border border-[#EBE7E0] shadow-[0_2px_16px_rgba(0,0,0,0.03)] p-8 flex flex-col items-center text-center hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-500">
      {/* Photo */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#EBE7E0] mb-5">
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
      <p className="text-sm text-[#B5AD9E] mb-4">
        {sanctuary.birthYear} — {sanctuary.deathYear}
      </p>

      {/* Role badge */}
      <Badge
        className={`mb-6 text-xs font-medium px-3 py-1 rounded-full border ${roleStyles[sanctuary.role]}`}
        variant="outline"
      >
        {sanctuary.role}
      </Badge>

      {/* CTA */}
      <Button
        variant="outline"
        onClick={() => navigate("/memorial")}
        className="w-full rounded-xl border-[#DDD8D0] text-[#5A5347] hover:bg-[#F5F0EB] hover:border-[#C5A66B] hover:text-[#3A3A3A] transition-all duration-300 text-sm"
      >
        Accéder au sanctuaire
      </Button>
    </div>
  );
}

export default MesSanctuaires;
