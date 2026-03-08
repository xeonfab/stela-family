import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilAdmin = () => {
  const [nom, setNom] = useState("Jean-Claude Dubois");
  const [email, setEmail] = useState("famille.dubois@email.com");

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="py-6 px-6">
        <Link
          to="/memorial-admin"
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Retour au sanctuaire</span>
        </Link>
      </header>

      <div className="max-w-xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#2C2C2C] mb-3">
            Mon Profil
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/60 p-6 space-y-5">
          <div>
            <label className="block text-xs text-stone-400 uppercase tracking-wider mb-1.5">Nom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-[#FAFAFA] text-[#2C2C2C] text-sm focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-400 uppercase tracking-wider mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-[#FAFAFA] text-[#2C2C2C] text-sm focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-colors"
            />
          </div>
          <button className="px-5 py-2 text-sm text-stone-500 border border-stone-200 rounded-full hover:border-stone-300 hover:text-stone-700 transition-colors">
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilAdmin;
