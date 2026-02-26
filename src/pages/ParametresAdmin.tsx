import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const fakeUsers = [
  { name: "Marie Dubois", email: "marie.dubois@email.com", role: "Garant (Admin)" },
  { name: "Lucas Martin", email: "lucas.martin@email.com", role: "Invité" },
  { name: "Sophie Lefèvre", email: "sophie.lefevre@email.com", role: "Invité" },
];

const ParametresAdmin = () => {
  const [nom, setNom] = useState("Jean-Claude Dubois");
  const [email, setEmail] = useState("famille.dubois@email.com");
  const [users, setUsers] = useState(fakeUsers);

  const handleRoleChange = (index: number, newRole: string) => {
    const updated = [...users];
    updated[index] = { ...updated[index], role: newRole };
    setUsers(updated);
    toast(`Rôle de ${updated[index].name} mis à jour.`, {
      style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" },
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="py-6 px-6">
        <Link
          to="/memorial-admin"
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Retour au sanctuaire</span>
        </Link>
      </header>

      {/* Content */}
      <div className="max-w-xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#2C2C2C] mb-3">
            Paramètres & Accès
          </h1>
        </div>

        {/* Section 1: Profil */}
        <section className="mb-12">
          <h2 className="font-serif text-xl font-semibold text-[#2C2C2C] mb-6">Mon Profil</h2>
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
        </section>

        {/* Section 2: Gestion des accès */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-[#2C2C2C] mb-6">Gestion des Accès</h2>
          <div className="space-y-3">
            {users.map((user, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/60 px-6 py-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#2C2C2C] truncate">{user.name}</p>
                  <p className="text-xs text-stone-400 truncate">{user.email}</p>
                </div>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(idx, e.target.value)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border appearance-none cursor-pointer focus:outline-none transition-colors ${
                    user.role === "Garant (Admin)"
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20"
                      : "bg-stone-50 text-stone-500 border-stone-200"
                  }`}
                >
                  <option value="Garant (Admin)">Garant (Admin)</option>
                  <option value="Invité">Invité</option>
                </select>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ParametresAdmin;
