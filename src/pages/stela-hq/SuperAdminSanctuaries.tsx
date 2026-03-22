import { useState } from "react";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Infinity, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

// --- Types ---

interface Sanctuary {
  id: string;
  defunctName: string;
  garantEmail: string;
  origin: string;
  plan: "standard" | "heritage";
  usagePercent: number;
  videoUsed: number;
  videoTotal: number;
  createdAt: string;
  nfcId: string;
}

// --- Mock Data ---

const MOCK_SANCTUARIES: Sanctuary[] = [
  {
    id: "s-1",
    defunctName: "Jean-Claude Dubois",
    garantEmail: "lucie.dubois@gmail.com",
    origin: "PF Estuaire",
    plan: "heritage",
    usagePercent: 72,
    videoUsed: 45,
    videoTotal: 60,
    createdAt: "12 Mars 2026",
    nfcId: "NFC-04:F2:1A:3B:7C",
  },
  {
    id: "s-2",
    defunctName: "Marguerite Lefèvre",
    garantEmail: "p.lefevre@orange.fr",
    origin: "PF Estuaire",
    plan: "standard",
    usagePercent: 80,
    videoUsed: 8,
    videoTotal: 10,
    createdAt: "28 Fév 2026",
    nfcId: "NFC-04:A1:9C:2D:5E",
  },
  {
    id: "s-3",
    defunctName: "André Martin",
    garantEmail: "sophie.martin@free.fr",
    origin: "Officiant",
    plan: "standard",
    usagePercent: 35,
    videoUsed: 3,
    videoTotal: 10,
    createdAt: "05 Mars 2026",
    nfcId: "NFC-04:B3:7E:8F:1A",
  },
  {
    id: "s-4",
    defunctName: "Colette Bernard",
    garantEmail: "m.bernard@maison-bernard.fr",
    origin: "Maison Bernard",
    plan: "heritage",
    usagePercent: 12,
    videoUsed: 7,
    videoTotal: 60,
    createdAt: "18 Mars 2026",
    nfcId: "NFC-04:D9:4C:6A:2B",
  },
];

// --- Drawer ---

function SanctuaryDrawer({ sanctuary, onClose }: { sanctuary: Sanctuary; onClose: () => void }) {
  const [newEmail, setNewEmail] = useState("");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

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
              <h2 className="font-serif text-lg font-semibold text-foreground">{sanctuary.defunctName}</h2>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
                Ouvrir le mémorial <ExternalLink size={12} />
              </Button>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X size={18} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4 p-6">
            {/* Bloc 1 — Garant & SAV */}
            <div className="rounded-lg bg-muted/50 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Garant & SAV
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email actuel</span>
                  <span className="font-medium text-foreground">{sanctuary.garantEmail}</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nouvel email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="h-9 text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    onClick={() => {
                      if (newEmail) {
                        toast.success("Email du garant corrigé.");
                        setNewEmail("");
                      }
                    }}
                  >
                    Corriger
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-muted-foreground"
                  onClick={() => toast.success("Email d'accès renvoyé.")}
                >
                  <Mail size={14} />
                  Renvoyer l'email d'accès
                </Button>
              </div>
            </div>

            {/* Bloc 2 — Données & Offre */}
            <div className="rounded-lg bg-muted/50 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Données & Offre
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vidéo utilisée</span>
                  <span className="font-medium text-foreground">
                    {sanctuary.videoUsed}/{sanctuary.videoTotal} min
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium text-foreground">
                    {sanctuary.plan === "heritage" ? "Extension Héritage" : "Standard"}
                  </span>
                </div>
              </div>
              {sanctuary.plan === "standard" && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-3 w-full"
                  onClick={() => toast.success("Extension Héritage activée manuellement.")}
                >
                  Activer l'extension manuellement (Bypass)
                </Button>
              )}
            </div>

            {/* Bloc 3 — Technique */}
            <div className="rounded-lg bg-muted/50 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Technique</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Puce NFC</span>
                <span className="font-mono text-xs font-medium text-foreground">{sanctuary.nfcId}</span>
              </div>
            </div>

            {/* Bloc 4 — Zone de Danger */}
            <div className="rounded-lg border border-destructive/30 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-destructive">Zone de danger</h3>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                onClick={() => toast.error("Sanctuaire suspendu.")}
              >
                Suspendre le sanctuaire
              </Button>
            </div>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}

// --- Main Page ---

export default function SuperAdminSanctuaries() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Sanctuary | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 50;

  const filtered = MOCK_SANCTUARIES.filter(
    (s) =>
      s.defunctName.toLowerCase().includes(search.toLowerCase()) ||
      s.garantEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="font-serif text-2xl font-semibold text-foreground">Registre des Sanctuaires</h1>

      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Rechercher un défunt ou un email de Garant…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Défunt</TableHead>
              <TableHead>Garant</TableHead>
              <TableHead>Origine</TableHead>
              <TableHead>Espace</TableHead>
              <TableHead>Création</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.slice((page - 1) * perPage, page * perPage).map((s) => (
              <TableRow
                key={s.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelected(s)}
              >
                <TableCell className="font-medium">{s.defunctName}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Mail size={13} />
                    {s.garantEmail}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">{s.origin}</Badge>
                </TableCell>
                <TableCell>
                  {s.plan === "heritage" ? (
                    <Badge className="gap-1 border-amber-300 bg-amber-50 text-amber-800">
                      <Infinity size={12} /> Héritage
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Standard ({s.usagePercent}%)
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{s.createdAt}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  Aucun sanctuaire trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Footer pagination */}
        <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
          <span>
            {filtered.length === 0
              ? "0 résultat"
              : `${(page - 1) * perPage + 1}–${Math.min(page * perPage, filtered.length)} sur ${filtered.length}`}
          </span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page * perPage >= filtered.length} onClick={() => setPage(page + 1)}>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {selected && <SanctuaryDrawer sanctuary={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
