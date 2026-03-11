import { useState } from "react";
import { Link2, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import AdminSidebar from "@/components/AdminSidebar";

const Confidentialite = () => {
  const [pinProtection, setPinProtection] = useState(false);
  const [pinCode, setPinCode] = useState("");

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="py-4 px-6">
        <AdminSidebar />
      </header>

      <div className="max-w-xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#2C2C2C] mb-3">
            Confidentialité du sanctuaire
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/60 p-6 space-y-5">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 w-9 h-9 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
              <Link2 size={16} className="text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#2C2C2C]">Accès par lien secret</p>
              <p className="text-xs text-stone-400 leading-relaxed mt-0.5">
                Toute personne possédant le lien ou le QR code peut se recueillir. Invisible sur les moteurs de recherche.
              </p>
            </div>
            <div className="mt-1">
              <div className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[11px] font-medium">
                Activé
              </div>
            </div>
          </div>

          <div className="h-px bg-stone-100" />

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 w-9 h-9 rounded-full bg-stone-50 flex items-center justify-center shrink-0">
                <ShieldCheck size={16} className="text-stone-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2C2C2C]">Protéger par un code d'accès</p>
                <p className="text-xs text-stone-400 leading-relaxed mt-0.5">
                  Les visiteurs devront saisir un code PIN à 4 chiffres avant de pouvoir accéder au mémorial.
                </p>
              </div>
              <Switch
                checked={pinProtection}
                onCheckedChange={setPinProtection}
                className="mt-1 data-[state=checked]:bg-[#D4AF37]"
              />
            </div>

            {pinProtection && (
              <div className="ml-[3.25rem] animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs text-stone-400 uppercase tracking-wider mb-1.5">Code PIN (4 chiffres)</label>
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="• • • •"
                  className="w-32 text-center tracking-[0.5em] text-lg font-medium border border-stone-200 bg-[#FAFAFA] text-[#2C2C2C] focus-visible:ring-1 focus-visible:ring-[#D4AF37]/40 focus-visible:border-[#D4AF37]/50 rounded-lg h-11"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confidentialite;
