import { useState } from "react";
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

type ActiveView = "create" | "registry" | "agency";

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

/* ───────── VIEW 1: Create ───────── */
function ViewCreate({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-2">Nouveau Sanctuaire</h1>
      <p className="text-[#2C2C2C]/60 mb-10">
        Générez un espace de recueillement et son kit de cérémonie en quelques secondes.
      </p>

      {/* Section 1 */}
      <p className="text-xs uppercase tracking-widest text-[#2C2C2C]/40 mb-4">Le Défunt</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="text-[#2C2C2C]/70 text-xs">Prénom</Label>
          <Input className="mt-1 border-[#2C2C2C]/10 bg-white focus-visible:ring-[#D4AF37]/40" />
        </div>
        <div>
          <Label className="text-[#2C2C2C]/70 text-xs">Nom</Label>
          <Input className="mt-1 border-[#2C2C2C]/10 bg-white focus-visible:ring-[#D4AF37]/40" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <Label className="text-[#2C2C2C]/70 text-xs">Année de naissance</Label>
          <Input className="mt-1 border-[#2C2C2C]/10 bg-white focus-visible:ring-[#D4AF37]/40" placeholder="1942" />
        </div>
        <div>
          <Label className="text-[#2C2C2C]/70 text-xs">Année de départ</Label>
          <Input className="mt-1 border-[#2C2C2C]/10 bg-white focus-visible:ring-[#D4AF37]/40" placeholder="2026" />
        </div>
      </div>

      {/* Section 2 */}
      <p className="text-xs uppercase tracking-widest text-[#2C2C2C]/40 mb-4">Les Administrateurs (Famille)</p>
      <MultiEmailInput />

      <Button
        onClick={onSuccess}
        className="w-full h-12 text-base font-medium rounded-xl"
        style={{ backgroundColor: "#D4AF37", color: "#fff" }}
      >
        <QrCode className="mr-2 h-5 w-5" />
        Générer le sanctuaire & le QR Code
      </Button>
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
        {active === "create" && <ViewCreate onSuccess={() => setShowSuccess(true)} />}
        {active === "registry" && <ViewRegistry />}
        {active === "agency" && <ViewAgency />}
      </main>

      <SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}
