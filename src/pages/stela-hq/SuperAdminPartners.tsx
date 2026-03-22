import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, FileText, Copy, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

// --- Types ---

interface Agency {
  kind: "agency";
  id: string;
  name: string;
  location: string;
  contactName: string;
  contactEmail: string;
  volume: number;
  status: "active" | "pending";
  siret: string;
  billingAddress: string;
  shippingAddress: string;
  lastSanctuary: string;
}

interface Officiant {
  kind: "officiant";
  id: string;
  name: string;
  promoCode: string;
  uses: number;
  commissionDue: number;
  iban: string;
  commissionMonth: number;
}

type Partner = Agency | Officiant;

// --- Mock Data ---

const MOCK_AGENCIES: Agency[] = [
  {
    kind: "agency",
    id: "ag-1",
    name: "Pompes Funèbres de l'Estuaire",
    location: "Saint-Nazaire (44)",
    contactName: "Marc Lefèvre",
    contactEmail: "m.lefevre@pf-estuaire.fr",
    volume: 47,
    status: "active",
    siret: "812 345 678 00012",
    billingAddress: "12 rue du Port, 44600 Saint-Nazaire",
    shippingAddress: "12 rue du Port, 44600 Saint-Nazaire",
    lastSanctuary: "14/03/2026",
  },
  {
    kind: "agency",
    id: "ag-2",
    name: "Maison Bernard",
    location: "Nantes (44)",
    contactName: "Sophie Bernard",
    contactEmail: "s.bernard@maison-bernard.fr",
    volume: 23,
    status: "active",
    siret: "923 456 789 00034",
    billingAddress: "8 avenue de la Paix, 44000 Nantes",
    shippingAddress: "8 avenue de la Paix, 44000 Nantes",
    lastSanctuary: "02/03/2026",
  },
  {
    kind: "agency",
    id: "ag-3",
    name: "Funérarium du Littoral",
    location: "La Baule (44)",
    contactName: "Jean-Pierre Morel",
    contactEmail: "jp.morel@funerarium-littoral.fr",
    volume: 0,
    status: "pending",
    siret: "734 567 890 00056",
    billingAddress: "3 boulevard de l'Océan, 44500 La Baule",
    shippingAddress: "3 boulevard de l'Océan, 44500 La Baule",
    lastSanctuary: "—",
  },
];

const MOCK_OFFICIANTS: Officiant[] = [
  {
    kind: "officiant",
    id: "off-1",
    name: "Claire Fontaine",
    promoCode: "FONTAINE-10",
    uses: 12,
    commissionDue: 120.0,
    iban: "FR76 •••• •••• •••• •••• 4521",
    commissionMonth: 120.0,
  },
  {
    kind: "officiant",
    id: "off-2",
    name: "Thomas Lefranc",
    promoCode: "LEFRANC-15",
    uses: 5,
    commissionDue: 75.0,
    iban: "FR76 •••• •••• •••• •••• 8934",
    commissionMonth: 75.0,
  },
];

// --- Components ---

function PartnerDrawer({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

        {/* Drawer */}
        <motion.aside
          className="relative z-10 flex h-full w-full max-w-md flex-col overflow-y-auto bg-background shadow-xl"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-5">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-lg font-semibold text-foreground">
                {partner.kind === "agency" ? partner.name : partner.name}
              </h2>
              {partner.kind === "agency" && (
                <Badge
                  className={
                    partner.status === "active"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-amber-200 bg-amber-50 text-amber-700"
                  }
                >
                  {partner.status === "active" ? "Actif" : "En attente"}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X size={18} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4 p-6">
            {partner.kind === "agency" ? (
              <AgencyDrawerContent agency={partner} />
            ) : (
              <OfficiantDrawerContent officiant={partner} />
            )}
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}

function AgencyDrawerContent({ agency }: { agency: Agency }) {
  return (
    <>
      {/* Coordonnées */}
      <div className="rounded-lg bg-muted/50 p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Coordonnées</h3>
        <div className="space-y-2 text-sm">
          <Row label="SIRET" value={agency.siret} />
          <Row label="Facturation" value={agency.billingAddress} />
          <Row label="Livraison" value={agency.shippingAddress} />
        </div>
      </div>

      {/* Activité */}
      <div className="rounded-lg bg-muted/50 p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Activité</h3>
        <div className="space-y-2 text-sm">
          <Row label="Stèles commandées" value={String(agency.volume)} />
          <Row label="Dernier sanctuaire" value={agency.lastSanctuary} />
        </div>
      </div>

      {/* Facturation */}
      <div className="rounded-lg bg-muted/50 p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Facturation</h3>
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => toast.success("Relevé généré avec succès.")}
        >
          <FileText size={16} />
          Générer le relevé du mois
        </Button>
      </div>
    </>
  );
}

function OfficiantDrawerContent({ officiant }: { officiant: Officiant }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(officiant.promoCode);
    toast.success("Code copié dans le presse-papier.");
  };

  return (
    <>
      {/* Affiliation */}
      <div className="rounded-lg bg-muted/50 p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Affiliation</h3>
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-muted px-3 py-1.5 font-mono text-sm font-semibold tracking-wide text-foreground">
            {officiant.promoCode}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleCopy}>
            <Copy size={14} />
          </Button>
        </div>
      </div>

      {/* Finances */}
      <div className="rounded-lg bg-muted/50 p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Finances</h3>
        <div className="space-y-2 text-sm">
          <Row label="IBAN" value={officiant.iban} />
          <Row label="Commission ce mois" value={`${officiant.commissionMonth.toFixed(2)} €`} />
        </div>
        <Button
          className="mt-4 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
          onClick={() => toast.success("Commissions marquées comme payées.")}
        >
          Marquer les commissions comme payées
        </Button>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

// --- Main Page ---

export default function SuperAdminPartners() {
  const [tab, setTab] = useState("agencies");
  const [selected, setSelected] = useState<Partner | null>(null);
  const [searchAgency, setSearchAgency] = useState("");
  const [searchOfficiant, setSearchOfficiant] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 50;

  const filteredAgencies = MOCK_AGENCIES.filter((a) =>
    a.name.toLowerCase().includes(searchAgency.toLowerCase())
  );

  const filteredOfficiants = MOCK_OFFICIANTS.filter((o) =>
    o.name.toLowerCase().includes(searchOfficiant.toLowerCase()) ||
    o.promoCode.toLowerCase().includes(searchOfficiant.toLowerCase())
  );

  const handleAction = () => {
    if (tab === "agencies") {
      toast("Invitation envoyée à l'agence.");
    } else {
      toast("Nouveau code officiant créé.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-foreground">Réseau de Partenaires</h1>
        <Button
          className="rounded-full bg-foreground text-background hover:bg-foreground/90"
          onClick={handleAction}
        >
          {tab === "agencies" ? "Inviter une agence" : "Nouveau code Officiant"}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={(v) => { setTab(v); setPage(1); }}>
        <TabsList>
          <TabsTrigger value="agencies">Agences Funéraires</TabsTrigger>
          <TabsTrigger value="officiants">Officiants (Affiliation)</TabsTrigger>
        </TabsList>

        {/* Agencies Tab */}
        <TabsContent value="agencies">
          <div className="mb-4 mt-2">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Rechercher une agence…"
                value={searchAgency}
                onChange={(e) => { setSearchAgency(e.target.value); setPage(1); }}
                className="pl-9"
              />
            </div>
          </div>

          <div className="rounded-xl border bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Raison Sociale</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-center">Volume</TableHead>
                  <TableHead className="text-center">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgencies.slice((page - 1) * perPage, page * perPage).map((a) => (
                  <TableRow
                    key={a.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelected(a)}
                  >
                    <TableCell className="font-medium">{a.name}</TableCell>
                    <TableCell className="text-muted-foreground">{a.location}</TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{a.contactName}</div>
                      <div className="text-xs text-muted-foreground">{a.contactEmail}</div>
                    </TableCell>
                    <TableCell className="text-center">{a.volume}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={
                          a.status === "active"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-amber-200 bg-amber-50 text-amber-700"
                        }
                      >
                        {a.status === "active" ? "Actif" : "En attente"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAgencies.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      Aucune agence trouvée.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Footer pagination */}
            <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
              <span>
                {filteredAgencies.length === 0
                  ? "0 résultat"
                  : `${(page - 1) * perPage + 1}–${Math.min(page * perPage, filteredAgencies.length)} sur ${filteredAgencies.length}`}
              </span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                  <ChevronLeft size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page * perPage >= filteredAgencies.length} onClick={() => setPage(page + 1)}>
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Officiants Tab */}
        <TabsContent value="officiants">
          <div className="mb-4 mt-2">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Rechercher un officiant ou un code…"
                value={searchOfficiant}
                onChange={(e) => { setSearchOfficiant(e.target.value); setPage(1); }}
                className="pl-9"
              />
            </div>
          </div>

          <div className="rounded-xl border bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Code Promo</TableHead>
                  <TableHead className="text-center">Utilisations</TableHead>
                  <TableHead className="text-right">Commission due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOfficiants.slice((page - 1) * perPage, page * perPage).map((o) => (
                  <TableRow
                    key={o.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelected(o)}
                  >
                    <TableCell className="font-medium">{o.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs tracking-wider">
                        {o.promoCode}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">{o.uses} familles</TableCell>
                    <TableCell className="text-right font-medium">{o.commissionDue.toFixed(2)} €</TableCell>
                  </TableRow>
                ))}
                {filteredOfficiants.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                      Aucun officiant trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Footer pagination */}
            <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
              <span>
                {filteredOfficiants.length === 0
                  ? "0 résultat"
                  : `${(page - 1) * perPage + 1}–${Math.min(page * perPage, filteredOfficiants.length)} sur ${filteredOfficiants.length}`}
              </span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                  <ChevronLeft size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page * perPage >= filteredOfficiants.length} onClick={() => setPage(page + 1)}>
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Drawer */}
      <AnimatePresence>
        {selected && <PartnerDrawer partner={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
