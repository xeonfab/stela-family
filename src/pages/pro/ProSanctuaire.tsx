import { useNavigate } from "react-router-dom";
import { ChevronLeft, QrCode, Download, Mail, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function ProSanctuaire() {
  const navigate = useNavigate();

  const timelineSteps = [
    { label: "Commande validée", done: true },
    { label: "En fabrication", done: true, active: true },
    { label: "Expédiée vers l'agence", done: false },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <button
        onClick={() => navigate("/pro/registre")}
        className="flex items-center gap-1.5 text-sm text-[#2C2C2C]/50 hover:text-[#2C2C2C]/80 transition-colors mb-8"
      >
        <ChevronLeft className="h-4 w-4" />
        Retour aux sanctuaires
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-10">
        <div className="flex-1">
          <h1 className="font-serif text-3xl md:text-4xl text-[#2C2C2C]">Jean-Claude Dubois</h1>
          <p className="text-[#2C2C2C]/40 text-sm mt-1">1948 – 2026</p>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Sanctuaire Actif
        </span>
      </div>

      {/* Stacked layout */}
      <div className="flex flex-col gap-6">
        {/* Kit de Cérémonie */}
        <div>
          <div className="bg-white border border-[#2C2C2C]/[0.06] rounded-2xl p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-8 font-medium">Kit de Cérémonie</p>
            <div className="mx-auto w-48 h-48 border-2 border-dashed border-[#D4AF37]/25 rounded-2xl flex items-center justify-center bg-[#D4AF37]/[0.02] mb-8">
              <QrCode className="h-24 w-24 text-[#D4AF37]/50" />
            </div>
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <Button className="w-full h-12 rounded-full btn-gold-jewel text-white font-semibold tracking-wide">
                <Download className="mr-2 h-4 w-4" />
                Télécharger le présentoir A4 (PDF)
              </Button>
              <Button variant="outline" className="w-full h-12 rounded-full border-[#2C2C2C]/[0.1] text-[#2C2C2C]/60 hover:bg-[#2C2C2C]/[0.02] hover:border-[#2C2C2C]/[0.15]">
                <Mail className="mr-2 h-4 w-4" />
                Renvoyer les accès à la famille
              </Button>
              <p className="text-center text-[11px] text-[#2C2C2C]/30 italic mt-1">
                Les accès initiaux ont été envoyés automatiquement à la création.
              </p>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Suivi de la Stèle */}
          <div className="bg-white border border-[#2C2C2C]/[0.06] rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-1 font-medium">Suivi de la Stèle</p>
            <p className="font-serif text-lg text-[#2C2C2C] mb-6">Édition Frêne</p>
            <div className="relative pl-6 space-y-5 mb-5">
              {timelineSteps.map((step, i) => (
                <div key={i} className="relative flex items-start gap-3">
                  {i < timelineSteps.length - 1 && (
                    <span className={cn("absolute left-[-16px] top-5 w-[1.5px] h-8", step.done ? "bg-[#D4AF37]/40" : "bg-[#2C2C2C]/[0.08]")} />
                  )}
                  <span className={cn("absolute left-[-20px] top-[3px] w-[9px] h-[9px] rounded-full border-2 shrink-0", step.done ? "border-[#D4AF37] bg-[#D4AF37]" : "border-[#2C2C2C]/20 bg-white")} />
                  <span className={cn("text-sm", step.active ? "text-[#D4AF37] font-medium" : step.done ? "text-[#2C2C2C]/70" : "text-[#2C2C2C]/30")}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#2C2C2C]/35 italic">Usinage en cours dans nos ateliers français.</p>
          </div>

          {/* Accès Famille */}
          <div className="bg-white border border-[#2C2C2C]/[0.06] rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-5 font-medium">Accès Famille</p>
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#2C2C2C]/70 truncate">marie.dubois@email.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#2C2C2C]/70 truncate">lucas.dubois@email.com</span>
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-sm text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors">
              <Plus className="h-4 w-4" />
              Ajouter un accès
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
