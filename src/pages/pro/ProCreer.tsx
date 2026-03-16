import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Plus, X, Download, Mail, QrCode } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/* ───────── Date Picker Field ───────── */
function DatePickerField({ label, placeholder }: { label: string; placeholder: string }) {
  const [date, setDate] = useState<Date>();

  return (
    <div>
      <Label className="text-[#2C2C2C]/70 text-xs">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full mt-1 justify-start text-left font-normal border-[#2C2C2C]/10 bg-white hover:bg-white focus-visible:ring-[#D4AF37]/40",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
            {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={fr}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

/* ───────── Ecrin Selection Cards ───────── */
const ecrins = [
  {
    id: "essentiel",
    title: "L'Essentiel",
    subtitle: "Le sanctuaire 100% numérique",
    description: "Un espace de recueillement intime et partagé pour rassembler les souvenirs.",
  },
  {
    id: "frene",
    title: "L'Édition Frêne",
    subtitle: "La douceur du bois clair",
    description: "Stèle minimaliste en Frêne massif usinée en France, ouvrant le sanctuaire d'un simple effleurement.",
  },
  {
    id: "signature",
    title: "L'Édition Signature",
    subtitle: "La profondeur du Noyer",
    description: "Stèle d'exception en Noyer massif, finition huilée premium, pour un hommage intemporel.",
  },
];

/* ───────── SUCCESS MODAL ───────── */
function SuccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border-[#2C2C2C]/10 sm:rounded-2xl max-w-md text-center">
        <DialogHeader className="items-center">
          <div className="mx-auto w-40 h-40 border-2 border-dashed border-[#D4AF37]/30 rounded-2xl flex items-center justify-center mb-4 bg-[#D4AF37]/[0.03]">
            <QrCode className="h-20 w-20 text-[#D4AF37]/60" />
          </div>
          <DialogTitle className="font-serif text-2xl text-[#2C2C2C]">Sanctuaire créé</DialogTitle>
          <DialogDescription className="text-[#2C2C2C]/50">
            Le QR Code et l'espace de recueillement sont prêts.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button
            className="w-full h-11 rounded-xl font-medium"
            style={{ backgroundColor: "#D4AF37", color: "#fff" }}
          >
            <Download className="mr-2 h-4 w-4" />
            Télécharger le présentoir A4 (PDF)
          </Button>
          <Button
            variant="outline"
            className="w-full h-11 rounded-xl border-[#2C2C2C]/10 text-[#2C2C2C]/70"
          >
            <Mail className="mr-2 h-4 w-4" />
            Envoyer l'accès à la famille
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ───────── PAGE ───────── */
export default function ProCreer() {
  const [selectedEcrin, setSelectedEcrin] = useState("frene");
  const [additionalEmails, setAdditionalEmails] = useState<string[]>([]);
  const [showAdditional, setShowAdditional] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const addAdditionalEmail = () => {
    const trimmed = newEmail.trim();
    if (trimmed && trimmed.includes("@") && !additionalEmails.includes(trimmed)) {
      setAdditionalEmails([...additionalEmails, trimmed]);
      setNewEmail("");
    }
  };

  const removeAdditionalEmail = (email: string) => {
    setAdditionalEmails(additionalEmails.filter((e) => e !== email));
  };

  const buttonLabel = selectedEcrin === "essentiel"
    ? "Générer le sanctuaire"
    : "Générer le sanctuaire & Lancer la fabrication";

  return (
    <>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-2">Créer un nouveau sanctuaire</h1>
        <p className="text-[#2C2C2C]/50 mb-3">
          Générez l'espace de recueillement et commandez la stèle personnalisée.
        </p>
        <Link to="/memorial" className="inline-flex items-center gap-1.5 text-[13px] text-[#C5A66B] hover:text-[#b8954f] transition-colors mb-12">
          Voir un exemple de sanctuaire →
        </Link>

        {/* ── Section 1 : Le Défunt ── */}
        <div className="bg-white border border-[#2C2C2C]/[0.06] rounded-2xl p-8 mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-6 font-medium">Le Défunt</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <Label className="text-[#2C2C2C]/60 text-xs">Prénom</Label>
              <Input placeholder="Jean-Claude" className="mt-1.5 border-[#2C2C2C]/[0.08] bg-[#FAFAFA] focus-visible:ring-[#D4AF37]/40 h-11" />
            </div>
            <div>
              <Label className="text-[#2C2C2C]/60 text-xs">Nom</Label>
              <Input placeholder="Dubois" className="mt-1.5 border-[#2C2C2C]/[0.08] bg-[#FAFAFA] focus-visible:ring-[#D4AF37]/40 h-11" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <DatePickerField label="Date de naissance" placeholder="JJ/MM/AAAA" />
            <DatePickerField label="Date de départ" placeholder="JJ/MM/AAAA" />
          </div>
        </div>

        {/* ── Section 2 : La Famille ── */}
        <div className="bg-white border border-[#2C2C2C]/[0.06] rounded-2xl p-8 mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-6 font-medium">Les Administrateurs</p>
          <div>
            <Label className="text-[#2C2C2C]/60 text-xs">E-mail du référent principal</Label>
            <Input type="email" placeholder="marie.dubois@email.com" className="mt-1.5 border-[#2C2C2C]/[0.08] bg-[#FAFAFA] focus-visible:ring-[#D4AF37]/40 h-11" />
          </div>

          {additionalEmails.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {additionalEmails.map((email) => (
                <span key={email} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F5F3] text-sm text-[#2C2C2C]/60 border border-[#2C2C2C]/[0.06]">
                  {email}
                  <button onClick={() => removeAdditionalEmail(email)} className="text-[#2C2C2C]/30 hover:text-[#2C2C2C]/60 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {showAdditional && (
            <div className="mt-4">
              <Label className="text-[#2C2C2C]/60 text-xs">E-mail d'un proche</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  type="email"
                  placeholder="proche@email.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addAdditionalEmail(); } }}
                  className="border-[#2C2C2C]/[0.08] bg-[#FAFAFA] focus-visible:ring-[#D4AF37]/40 h-11"
                />
                <Button type="button" variant="outline" onClick={addAdditionalEmail} className="h-11 px-4 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/5 shrink-0">
                  Ajouter
                </Button>
              </div>
            </div>
          )}

          <button type="button" onClick={() => setShowAdditional(true)} className="flex items-center gap-1.5 mt-5 text-sm text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors">
            <Plus className="h-4 w-4" />
            Ajouter un proche pour l'aider à gérer l'espace
          </button>
        </div>

        {/* ── Section 3 : Le Choix de l'Écrin ── */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-6 font-medium">Sélectionnez l'écrin mémoriel</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ecrins.map((ecrin) => {
              const isSelected = selectedEcrin === ecrin.id;
              return (
                <button
                  key={ecrin.id}
                  type="button"
                  onClick={() => setSelectedEcrin(ecrin.id)}
                  className={cn(
                    "relative text-left p-6 rounded-2xl border-2 transition-all duration-300 group",
                    isSelected
                      ? "border-[#D4AF37] bg-[#D4AF37]/[0.03] shadow-[0_0_0_1px_rgba(212,175,55,0.15)]"
                      : "border-[#2C2C2C]/[0.06] bg-white hover:border-[#2C2C2C]/[0.12] hover:shadow-sm"
                  )}
                >
                  <div className={cn(
                    "absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center",
                    isSelected ? "border-[#D4AF37] bg-[#D4AF37]" : "border-[#2C2C2C]/20 bg-transparent"
                  )}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <h3 className={cn("font-serif text-lg mb-1 transition-colors", isSelected ? "text-[#D4AF37]" : "text-[#2C2C2C]")}>{ecrin.title}</h3>
                  <p className="text-[#2C2C2C]/50 text-xs font-medium tracking-wide mb-3">{ecrin.subtitle}</p>
                  <p className="text-[#2C2C2C]/40 text-sm leading-relaxed">{ecrin.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Action ── */}
        <div className="flex justify-end pb-8">
          <Button onClick={() => setShowSuccess(true)} className="h-13 px-10 text-base font-semibold rounded-full btn-gold-jewel text-white tracking-wide">
            {buttonLabel}
          </Button>
        </div>
      </div>

      <SuccessModal open={showSuccess} onClose={() => { setShowSuccess(false); navigate("/pro/sanctuaire/1"); }} />
    </>
  );
}
