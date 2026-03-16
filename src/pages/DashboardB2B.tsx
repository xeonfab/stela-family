import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  PlusCircle,
  BookOpen,
  Building2,
  Download,
  MoreHorizontal,
  QrCode,
  Mail,
  ChevronLeft,
  Plus,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
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
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ActiveView = "create" | "registry" | "agency" | "sanctuary";

const sidebarItems = [
  { id: "create" as const, label: "Créer un sanctuaire", icon: PlusCircle },
  { id: "registry" as const, label: "Registre des familles", icon: BookOpen },
  { id: "agency" as const, label: "Mon Agence", icon: Building2 },
];

const mockFamilies = [
  { id: 1, name: "Jean-Claude Dubois", created: "15 Fév 2026", email: "marie.dubois@email.com", status: "Actif" },
  { id: 2, name: "Marguerite Lefèvre", created: "10 Fév 2026", email: "paul.lefevre@email.com", status: "Actif" },
  { id: 3, name: "Henri Martin", created: "02 Fév 2026", email: "sophie.martin@email.com", status: "Suspendu" },
  { id: 4, name: "Colette Bernard", created: "28 Jan 2026", email: "lucas.bernard@email.com", status: "Actif" },
];

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

/* ───────── Multi Email Input ───────── */
function MultiEmailInput() {
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");

  const addEmail = () => {
    const trimmed = currentEmail.trim();
    if (trimmed && trimmed.includes("@") && !emails.includes(trimmed)) {
      setEmails([...emails, trimmed]);
      setCurrentEmail("");
    }
  };

  const removeEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addEmail();
    }
  };

  return (
    <div className="mb-10">
      <Label className="text-[#2C2C2C]/70 text-xs">Adresses e-mail des administrateurs</Label>

      {/* Email chips */}
      {emails.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 mb-2">
          {emails.map((email) => (
            <span
              key={email}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-sm text-[#2C2C2C]/70 border border-stone-200/60"
            >
              {email}
              <button onClick={() => removeEmail(email)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <Input
        className="mt-1 border-[#2C2C2C]/10 bg-white focus-visible:ring-[#D4AF37]/40"
        type="email"
        placeholder="famille@email.com"
        value={currentEmail}
        onChange={(e) => setCurrentEmail(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        onClick={addEmail}
        className="flex items-center gap-1.5 mt-2 text-xs text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors"
      >
        <Plus className="h-3.5 w-3.5" />
        Ajouter une autre adresse e-mail
      </button>
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

/* ───────── VIEW 1: Create ───────── */
function ViewCreate({ onSuccess }: { onSuccess: () => void }) {
  const [selectedEcrin, setSelectedEcrin] = useState("frene");
  const [additionalEmails, setAdditionalEmails] = useState<string[]>([]);
  const [showAdditional, setShowAdditional] = useState(false);
  const [newEmail, setNewEmail] = useState("");

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
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-2">Créer un nouveau sanctuaire</h1>
      <p className="text-[#2C2C2C]/50 mb-12">
        Générez l'espace de recueillement et commandez la stèle personnalisée.
      </p>

      {/* ── Section 1 : Le Défunt ── */}
      <div className="bg-white border border-[#2C2C2C]/[0.06] rounded-2xl p-8 mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-6 font-medium">Le Défunt</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <Label className="text-[#2C2C2C]/60 text-xs">Prénom</Label>
            <Input
              placeholder="Jean-Claude"
              className="mt-1.5 border-[#2C2C2C]/[0.08] bg-[#FAFAFA] focus-visible:ring-[#D4AF37]/40 h-11"
            />
          </div>
          <div>
            <Label className="text-[#2C2C2C]/60 text-xs">Nom</Label>
            <Input
              placeholder="Dubois"
              className="mt-1.5 border-[#2C2C2C]/[0.08] bg-[#FAFAFA] focus-visible:ring-[#D4AF37]/40 h-11"
            />
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
          <Input
            type="email"
            placeholder="marie.dubois@email.com"
            className="mt-1.5 border-[#2C2C2C]/[0.08] bg-[#FAFAFA] focus-visible:ring-[#D4AF37]/40 h-11"
          />
        </div>

        {/* Additional emails */}
        {additionalEmails.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {additionalEmails.map((email) => (
              <span
                key={email}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F5F3] text-sm text-[#2C2C2C]/60 border border-[#2C2C2C]/[0.06]"
              >
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
              <Button
                type="button"
                variant="outline"
                onClick={addAdditionalEmail}
                className="h-11 px-4 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/5 shrink-0"
              >
                Ajouter
              </Button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowAdditional(true)}
          className="flex items-center gap-1.5 mt-5 text-sm text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Ajouter un proche pour l'aider à gérer l'espace
        </button>
      </div>

      {/* ── Section 3 : Le Choix de l'Écrin ── */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-6 font-medium">
          Sélectionnez l'écrin mémoriel
        </p>
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
                {/* Selection indicator */}
                <div
                  className={cn(
                    "absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center",
                    isSelected
                      ? "border-[#D4AF37] bg-[#D4AF37]"
                      : "border-[#2C2C2C]/20 bg-transparent"
                  )}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <h3 className={cn(
                  "font-serif text-lg mb-1 transition-colors",
                  isSelected ? "text-[#D4AF37]" : "text-[#2C2C2C]"
                )}>
                  {ecrin.title}
                </h3>
                <p className="text-[#2C2C2C]/50 text-xs font-medium tracking-wide mb-3">
                  {ecrin.subtitle}
                </p>
                <p className="text-[#2C2C2C]/40 text-sm leading-relaxed">
                  {ecrin.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Action ── */}
      <div className="flex justify-end pb-8">
        <Button
          onClick={onSuccess}
          className="h-13 px-10 text-base font-semibold rounded-full btn-gold-jewel text-white tracking-wide"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}

/* ───────── VIEW 2: Registry ───────── */
function ViewRegistry() {
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-2">Registre des Sanctuaires</h1>
      <p className="text-[#2C2C2C]/60 mb-8">L'ensemble des espaces générés pour vos familles.</p>

      <div className="border border-[#2C2C2C]/8 rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#2C2C2C]/8 hover:bg-transparent">
              <TableHead className="text-[#2C2C2C]/50 text-xs uppercase tracking-wider font-normal">Défunt</TableHead>
              <TableHead className="text-[#2C2C2C]/50 text-xs uppercase tracking-wider font-normal">Créé le</TableHead>
              <TableHead className="text-[#2C2C2C]/50 text-xs uppercase tracking-wider font-normal">Garant</TableHead>
              <TableHead className="text-[#2C2C2C]/50 text-xs uppercase tracking-wider font-normal">Statut</TableHead>
              <TableHead className="text-[#2C2C2C]/50 text-xs uppercase tracking-wider font-normal text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockFamilies.map((f) => (
              <TableRow key={f.id} className="border-b border-[#2C2C2C]/5 hover:bg-[#D4AF37]/[0.03]">
                <TableCell className="font-medium text-[#2C2C2C]">{f.name}</TableCell>
                <TableCell className="text-[#2C2C2C]/60">{f.created}</TableCell>
                <TableCell className="text-[#2C2C2C]/60">{f.email}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      f.status === "Actif"
                        ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                        : "bg-[#2C2C2C]/5 text-[#2C2C2C]/40"
                    }`}
                  >
                    {f.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#2C2C2C]/40 hover:text-[#D4AF37]">
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#2C2C2C]/40 hover:text-[#2C2C2C]">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border-[#2C2C2C]/10">
                        <DropdownMenuItem className="text-[#2C2C2C]/70 cursor-pointer">Suspendre le lien</DropdownMenuItem>
                        <DropdownMenuItem className="text-[#2C2C2C]/70 cursor-pointer">Modifier l'email</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/* ───────── VIEW 3: Agency ───────── */
function ViewAgency() {
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
        <Button
          variant="outline"
          className="rounded-xl border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/5"
        >
          Recharger mes crédits
        </Button>
      </div>
    </div>
  );
}

/* ───────── VIEW 4: Sanctuary Dashboard ───────── */
function ViewSanctuary({ onBack }: { onBack: () => void }) {
  const timelineSteps = [
    { label: "Commande validée", done: true },
    { label: "En fabrication", done: true, active: true },
    { label: "Expédiée vers l'agence", done: false },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-[#2C2C2C]/50 hover:text-[#2C2C2C]/80 transition-colors mb-8"
      >
        <ChevronLeft className="h-4 w-4" />
        Retour aux sanctuaires
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-10">
        <div className="flex-1">
          <h1 className="font-serif text-3xl md:text-4xl text-[#2C2C2C]">
            Sanctuaire de Jean-Claude Dubois
          </h1>
          <p className="text-[#2C2C2C]/40 text-sm mt-1">1948 – 2026</p>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Sanctuaire Actif
        </span>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── Left Column (3/5) ── */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-[#2C2C2C]/[0.06] rounded-2xl p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-8 font-medium">
              Kit de Cérémonie
            </p>

            {/* QR Code placeholder */}
            <div className="mx-auto w-48 h-48 border-2 border-dashed border-[#D4AF37]/25 rounded-2xl flex items-center justify-center bg-[#D4AF37]/[0.02] mb-8">
              <QrCode className="h-24 w-24 text-[#D4AF37]/50" />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <Button className="w-full h-12 rounded-full btn-gold-jewel text-white font-semibold tracking-wide">
                <Download className="mr-2 h-4 w-4" />
                Télécharger le présentoir A4 (PDF)
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 rounded-full border-[#2C2C2C]/[0.1] text-[#2C2C2C]/60 hover:bg-[#2C2C2C]/[0.02] hover:border-[#2C2C2C]/[0.15]"
              >
                <Mail className="mr-2 h-4 w-4" />
                Renvoyer les accès à la famille
              </Button>
              <p className="text-center text-[11px] text-[#2C2C2C]/30 italic mt-1">
                Les accès initiaux ont été envoyés automatiquement à la création.
              </p>
            </div>
          </div>
        </div>

        {/* ── Right Column (2/5) ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Card: Suivi de la Stèle */}
          <div className="bg-white border border-[#2C2C2C]/[0.06] rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-1 font-medium">
              Suivi de la Stèle
            </p>
            <p className="font-serif text-lg text-[#2C2C2C] mb-6">Édition Frêne</p>

            {/* Mini timeline */}
            <div className="relative pl-6 space-y-5 mb-5">
              {timelineSteps.map((step, i) => (
                <div key={i} className="relative flex items-start gap-3">
                  {/* Vertical line */}
                  {i < timelineSteps.length - 1 && (
                    <span
                      className={cn(
                        "absolute left-[-16px] top-5 w-[1.5px] h-8",
                        step.done ? "bg-[#D4AF37]/40" : "bg-[#2C2C2C]/[0.08]"
                      )}
                    />
                  )}
                  {/* Dot */}
                  <span
                    className={cn(
                      "absolute left-[-20px] top-[3px] w-[9px] h-[9px] rounded-full border-2 shrink-0",
                      step.done
                        ? "border-[#D4AF37] bg-[#D4AF37]"
                        : "border-[#2C2C2C]/20 bg-white"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm",
                      step.active
                        ? "text-[#D4AF37] font-medium"
                        : step.done
                        ? "text-[#2C2C2C]/70"
                        : "text-[#2C2C2C]/30"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#2C2C2C]/35 italic">
              Usinage en cours dans nos ateliers français.
            </p>
          </div>

          {/* Card: Accès Famille */}
          <div className="bg-white border border-[#2C2C2C]/[0.06] rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-5 font-medium">
              Accès Famille
            </p>

            <div className="space-y-3 mb-5">
              {/* Contact 1 */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-[#2C2C2C]/70 truncate">marie.dubois@email.com</span>
                <span className="shrink-0 text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/15">
                  Référent
                </span>
              </div>
              {/* Contact 2 */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-[#2C2C2C]/70 truncate">lucas.dubois@email.com</span>
                <span className="shrink-0 text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-[#2C2C2C]/[0.05] text-[#2C2C2C]/40 border border-[#2C2C2C]/[0.08]">
                  Co-administrateur
                </span>
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

/* ───────── SUCCESS MODAL ───────── */
function SuccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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

/* ───────── MAIN PAGE ───────── */
export default function DashboardB2B() {
  const [active, setActive] = useState<ActiveView>("create");
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[#2C2C2C]/8 bg-[#F5F5F3] px-4 py-8">
        <Link to="/" className="flex items-center gap-2 text-[#2C2C2C]/40 text-sm mb-10 hover:text-[#2C2C2C]/60 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Retour au site
        </Link>
        <p className="font-serif text-lg text-[#2C2C2C] mb-8">Espace Pro</p>
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                active === item.id
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] font-medium"
                  : "text-[#2C2C2C]/50 hover:text-[#2C2C2C]/80 hover:bg-[#2C2C2C]/[0.03]"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#F5F5F3] border-b border-[#2C2C2C]/8 flex items-center gap-1 px-3 py-2 overflow-x-auto">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-all ${
              active === item.id
                ? "bg-[#D4AF37]/10 text-[#D4AF37] font-medium"
                : "text-[#2C2C2C]/50"
            }`}
          >
            <item.icon className="h-3.5 w-3.5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 px-6 md:px-16 py-12 md:py-16 mt-12 md:mt-0">
        {active === "create" && <ViewCreate onSuccess={() => { setShowSuccess(true); }} />}
        {active === "registry" && <ViewRegistry onOpenSanctuary={() => setActive("sanctuary")} />}
        {active === "agency" && <ViewAgency />}
        {active === "sanctuary" && <ViewSanctuary onBack={() => setActive("registry")} />}
      </main>

      <SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
