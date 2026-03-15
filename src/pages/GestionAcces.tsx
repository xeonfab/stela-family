import { useState } from "react";
import { toast } from "sonner";
import { Plus, X, UserPlus } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Role = "Famille" | "Officiant";

interface User {
  name: string;
  email: string;
  role: Role;
}

const fakeUsers: User[] = [
  { name: "Marie Dubois", email: "marie.dubois@email.com", role: "Famille" },
  { name: "Lucas Martin", email: "lucas.martin@email.com", role: "Famille" },
  { name: "Sophie Lefèvre", email: "sophie.lefevre@email.com", role: "Officiant" },
];

const GestionAcces = () => {
  const [users, setUsers] = useState<User[]>(fakeUsers);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Famille");

  const handleRoleChange = (index: number, newRole: Role) => {
    const updated = [...users];
    updated[index] = { ...updated[index], role: newRole };
    setUsers(updated);
    toast(`Rôle de ${updated[index].name} mis à jour.`, {
      style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" },
    });
  };

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    const newUser: User = {
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
    };
    setUsers([...users, newUser]);
    setInviteEmail("");
    setInviteRole("Famille");
    setShowInvite(false);
    toast("Invitation envoyée avec succès.", {
      style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" },
    });
  };

  const handleRemove = (index: number) => {
    const removed = users[index];
    setUsers(users.filter((_, i) => i !== index));
    toast(`Accès de ${removed.name} supprimé.`, {
      style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" },
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="py-4 px-6">
        <AdminSidebar />
      </header>

      <div className="max-w-xl mx-auto px-6 pb-20">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#2C2C2C] mb-3">
            Gestion des Accès
          </h1>
        </div>

        {/* Add access button */}
        <div className="flex justify-end mb-6">
          <Button
            variant="outline"
            onClick={() => setShowInvite(true)}
            className="rounded-full border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/5 text-xs uppercase tracking-widest font-medium px-5 gap-2"
          >
            <Plus className="h-3.5 w-3.5" />
            Ajouter un accès
          </Button>
        </div>

        {/* Users list */}
        <div className="space-y-3">
          {users.map((user, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200/60 px-6 py-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#2C2C2C] truncate">{user.name}</p>
                <p className="text-xs text-stone-400 truncate">{user.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(idx, e.target.value as Role)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border appearance-none cursor-pointer focus:outline-none transition-colors ${
                    user.role === "Famille"
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20"
                      : "bg-stone-50 text-stone-500 border-stone-200"
                  }`}
                >
                  <option value="Famille">Famille</option>
                  <option value="Officiant">Officiant</option>
                </select>
                <button
                  onClick={() => handleRemove(idx)}
                  className="text-stone-300 hover:text-stone-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite modal */}
      <Dialog open={showInvite} onOpenChange={setShowInvite}>
        <DialogContent className="bg-white border-stone-100 sm:rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-[#2C2C2C] flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-[#D4AF37]" />
              Ajouter un accès
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div>
              <Label className="text-[#2C2C2C]/70 text-xs uppercase tracking-widest mb-2 block">
                Adresse e-mail
              </Label>
              <Input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="exemple@email.com"
                className="border-stone-200 bg-white focus-visible:ring-[#D4AF37]/40"
              />
            </div>

            <div>
              <Label className="text-[#2C2C2C]/70 text-xs uppercase tracking-widest mb-3 block">
                Rôle
              </Label>
              <RadioGroup
                value={inviteRole}
                onValueChange={(v) => setInviteRole(v as Role)}
                className="flex gap-3"
              >
                <label
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border cursor-pointer transition-all flex-1 ${
                    inviteRole === "Famille"
                      ? "border-[#D4AF37]/30 bg-[#D4AF37]/5"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <RadioGroupItem value="Famille" className="border-[#D4AF37] text-[#D4AF37]" />
                  <div>
                    <p className="text-sm font-medium text-[#2C2C2C]">Famille</p>
                    <p className="text-[10px] text-stone-400">Droits complets</p>
                  </div>
                </label>
                <label
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border cursor-pointer transition-all flex-1 ${
                    inviteRole === "Officiant"
                      ? "border-[#D4AF37]/30 bg-[#D4AF37]/5"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <RadioGroupItem value="Officiant" className="border-[#D4AF37] text-[#D4AF37]" />
                  <div>
                    <p className="text-sm font-medium text-[#2C2C2C]">Officiant</p>
                    <p className="text-[10px] text-stone-400">Droits restreints</p>
                  </div>
                </label>
              </RadioGroup>
            </div>

            <Button
              onClick={handleInvite}
              disabled={!inviteEmail.trim()}
              className="w-full h-11 rounded-xl font-medium text-white"
              style={{ backgroundColor: "#D4AF37" }}
            >
              Envoyer l'invitation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestionAcces;
