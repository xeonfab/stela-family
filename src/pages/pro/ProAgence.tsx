import { Button } from "@/components/ui/button";

export default function ProAgence() {
  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-2">Paramètres de l'agence</h1>
      <p className="text-[#2C2C2C]/60 mb-10">Informations et abonnement de votre établissement.</p>

      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-[#2C2C2C]/40 mb-3">Établissement</p>
        <p className="text-xl text-[#2C2C2C] font-medium">Pompes Funèbres Dubois</p>
        <p className="text-[#2C2C2C]/50 text-sm">12 rue de la Paix, 75002 Paris</p>
      </div>

      <div className="border border-[#2C2C2C]/8 rounded-xl p-8 bg-white mb-6">
        <p className="text-xs uppercase tracking-widest text-[#2C2C2C]/40 mb-4">Abonnement & Crédits</p>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-5xl font-serif text-[#D4AF37]">12</span>
          <span className="text-[#2C2C2C]/50 text-sm">sanctuaires restants</span>
        </div>
        <p className="text-[#2C2C2C]/40 text-xs mb-6">dans votre pack actuel</p>
        <Button variant="outline" className="rounded-xl border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/5">
          Recharger mes crédits
        </Button>
      </div>
    </div>
  );
}
