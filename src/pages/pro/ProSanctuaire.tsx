import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Download, RefreshCw, Send, Plus, Trash2, PauseCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import chevaletImg from "@/assets/ceremony-chevalet.png";
import lettreImg from "@/assets/ceremony-lettre.png";

const pdfCards = [
  {
    title: "Présentoir A4",
    description:
      "Un chevalet élégant à imprimer et disposer lors de la cérémonie pour inviter les proches à rejoindre l'espace.",
    image: chevaletImg,
  },
  {
    title: "Cartes de Livret",
    description:
      "De petites cartes à glisser dans le livret de cérémonie avec le QR code d'accès au sanctuaire.",
    image: lettreImg,
  },
];

export default function ProSanctuaire() {
  const navigate = useNavigate();
  const [emails, setEmails] = useState(["marie.dubois@email.com", "lucas.dubois@email.com"]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);
  const [sanctuaryActive, setSanctuaryActive] = useState(true);

  const timelineSteps = [
    { label: "Commande validée", done: true },
    { label: "En fabrication", done: true, active: true },
    { label: "Expédiée vers l'agence", done: false },
  ];

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleAddEmail = () => {
    const trimmed = newEmail.trim();
    if (!isValidEmail(trimmed)) {
      setEmailError("Veuillez entrer une adresse e-mail valide.");
      return;
    }
    if (emails.includes(trimmed)) {
      setEmailError("Cette adresse est déjà dans la liste.");
      return;
    }
    setEmails((prev) => [...prev, trimmed]);
    setNewEmail("");
    setEmailError("");
    setShowAddModal(false);
    toast.success(`Accès envoyé à ${trimmed}`);
  };

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
        <div className="flex items-center gap-2 self-start">
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
            sanctuaryActive ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "bg-[#2C2C2C]/5 text-[#2C2C2C]/40"
          }`}>
            {sanctuaryActive ? "Actif" : "Suspendu"}
          </span>
          <button
            onClick={() => {
              setSanctuaryActive((prev) => !prev);
              toast.success(sanctuaryActive ? "Sanctuaire suspendu." : "Sanctuaire réactivé.");
            }}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#2C2C2C]/[0.12] text-[#2C2C2C]/40 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-colors"
            title={sanctuaryActive ? "Suspendre le sanctuaire" : "Réactiver le sanctuaire"}
          >
            <PauseCircle className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stacked layout */}
      <div className="flex flex-col gap-6">
        {/* Kit de Cérémonie — Cards */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-4 font-medium">Kit de Cérémonie</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pdfCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-3xl border border-[#2C2C2C]/[0.06] shadow-sm overflow-hidden"
              >
                <div className="aspect-[4/3] w-full bg-stone-50">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-lg font-semibold text-[#2C2C2C] mb-1">
                    {card.title}
                  </h2>
                  <p className="text-sm text-[#2C2C2C]/50 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="border-t border-[#2C2C2C]/[0.06] bg-[#2C2C2C]/[0.015] p-6">
                  <div className="flex flex-col gap-3">
                    <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-white text-sm font-medium rounded-full hover:bg-[#c9a432] transition-colors btn-gold-jewel">
                      <Download size={15} />
                      Télécharger le PDF
                    </button>
                    <button
                      onClick={() => toast.success("PDF régénéré avec succès")}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-transparent border border-[#2C2C2C]/[0.12] text-[#2C2C2C]/60 text-sm font-medium rounded-full hover:border-[#2C2C2C]/[0.2] hover:text-[#2C2C2C]/80 transition-colors">
                      <RefreshCw size={14} />
                      Régénérer le PDF
                    </button>
                  </div>
                  <p className="text-center text-[11px] text-[#2C2C2C]/30 mt-3">
                    Régénérez le fichier si vous avez modifié la photo ou le nom du mémorial.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accès Famille + Suivi Commande — côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accès Famille */}
          <div className="bg-white border border-[#2C2C2C]/[0.06] rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-5 font-medium">Accès Famille</p>
            <div className="space-y-3 mb-5">
              {emails.map((email) => (
                <div key={email} className="flex items-center justify-between gap-2">
                  <span className="text-sm text-[#2C2C2C]/70 truncate">{email}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toast.success(`Accès renvoyés à ${email}`)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-[#2C2C2C]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/[0.06] transition-colors"
                      title="Renvoyer les accès"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setEmailToDelete(email)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-[#2C2C2C]/30 hover:text-red-500/70 hover:bg-red-50 transition-colors"
                      title="Supprimer l'accès"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => { setShowAddModal(true); setNewEmail(""); setEmailError(""); }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-transparent border border-[#2C2C2C]/[0.12] text-[#2C2C2C]/60 text-sm font-medium rounded-full hover:border-[#2C2C2C]/[0.2] hover:text-[#2C2C2C]/80 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Ajouter un accès
            </button>
            <p className="text-[11px] text-[#2C2C2C]/30 italic mt-3">
              Les accès initiaux ont été envoyés automatiquement à la création.
            </p>
          </div>

          {/* Suivi de la Commande */}
          <div className="bg-white border border-[#2C2C2C]/[0.06] rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/40 mb-1 font-medium">Suivi de la Commande</p>
            <p className="font-serif text-lg text-[#2C2C2C] mb-4">Édition Frêne</p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              En fabrication
            </span>
            <button
              onClick={() => toast.success("Téléchargement de la facture en cours")}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-transparent border border-[#2C2C2C]/[0.12] text-[#2C2C2C]/60 text-sm font-medium rounded-full hover:border-[#2C2C2C]/[0.2] hover:text-[#2C2C2C]/80 transition-colors">
              <Download size={14} />
              Télécharger la facture
            </button>
          </div>
        </div>
      </div>

      {/* Modale Ajouter un accès */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-md bg-[#FAF9F7] border-[#2C2C2C]/[0.06]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-[#2C2C2C]">Ajouter un accès</DialogTitle>
            <p className="text-sm text-[#2C2C2C]/50 mt-1">
              Entrez l'adresse e-mail du proche à inviter.
            </p>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <Input
                type="email"
                placeholder="exemple@email.com"
                value={newEmail}
                onChange={(e) => { setNewEmail(e.target.value); setEmailError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleAddEmail()}
                className="h-12 rounded-xl border-[#2C2C2C]/[0.1] bg-white text-[#2C2C2C] placeholder:text-[#2C2C2C]/30 focus-visible:ring-[#D4AF37]/30"
              />
              {emailError && (
                <p className="text-xs text-red-500/80 mt-1.5">{emailError}</p>
              )}
            </div>
            <Button
              onClick={handleAddEmail}
              disabled={!newEmail.trim()}
              className="w-full h-12 rounded-full bg-[#D4AF37] hover:bg-[#c9a432] text-white font-medium btn-gold-jewel"
            >
              Envoyer l'invitation
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modale Suppression d'accès */}
      <Dialog open={!!emailToDelete} onOpenChange={(open) => !open && setEmailToDelete(null)}>
        <DialogContent className="sm:max-w-md bg-[#FAF9F7] border-[#2C2C2C]/[0.06]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-[#2C2C2C]">Supprimer cet accès ?</DialogTitle>
            <p className="text-sm text-[#2C2C2C]/50 mt-1">
              L'adresse <span className="font-medium text-[#2C2C2C]/70">{emailToDelete}</span> n'aura plus accès à ce sanctuaire.
            </p>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setEmailToDelete(null)}
              className="flex-1 h-12 rounded-full border-[#2C2C2C]/[0.12] text-[#2C2C2C]/60"
            >
              Annuler
            </Button>
            <Button
              onClick={() => {
                setEmails((prev) => prev.filter((e) => e !== emailToDelete));
                toast.success(`Accès supprimé pour ${emailToDelete}`);
                setEmailToDelete(null);
              }}
              className="flex-1 h-12 rounded-full bg-[#2C2C2C] hover:bg-[#2C2C2C]/90 text-white font-medium"
            >
              Confirmer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
