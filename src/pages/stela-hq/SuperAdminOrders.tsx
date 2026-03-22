import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TreePine, Cloud, ExternalLink, X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";

type OrderType = "b2b-stele" | "b2c-noyer" | "b2c-frene" | "b2c-heritage";
type PaymentStatus = "paid" | "to-invoice";
type OrderStatus = "to-ship" | "shipped" | "digital-active";

interface Order {
  id: string;
  date: string;
  type: OrderType;
  typeLabel: string;
  buyer: string;
  buyerEmail: string;
  sanctuary: string;
  payment: PaymentStatus;
  status: OrderStatus;
  article: string;
  address?: string;
  phone?: string;
  tracking?: string;
  nfcId?: string;
  stripeLink?: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "#CMD-1042",
    date: "18 mars 2026",
    type: "b2b-stele",
    typeLabel: "B2B - Stèle Principale",
    buyer: "PF Estuaire",
    buyerEmail: "contact@pf-estuaire.fr",
    sanctuary: "Jean-Claude Dubois",
    payment: "to-invoice",
    status: "to-ship",
    article: "1x Stèle Principale — Granit Noir",
    address: "PF Estuaire — 12 rue des Lilas, 33000 Bordeaux",
    phone: "05 56 12 34 56",
  },
  {
    id: "#CMD-1041",
    date: "15 mars 2026",
    type: "b2c-noyer",
    typeLabel: "B2C - Édition Noyer",
    buyer: "Lucie Bernard",
    buyerEmail: "lucie.bernard@gmail.com",
    sanctuary: "Marie-Thérèse Bernard",
    payment: "paid",
    status: "shipped",
    article: "1x Édition Personnelle — Noyer",
    address: "Lucie Bernard — 8 avenue Foch, 75016 Paris",
    phone: "06 78 90 12 34",
    tracking: "6A12345678901",
    nfcId: "NFC-00891",
    stripeLink: "https://dashboard.stripe.com/payments/pi_xxx",
  },
  {
    id: "#CMD-1040",
    date: "14 mars 2026",
    type: "b2c-heritage",
    typeLabel: "B2C - Ext. Héritage",
    buyer: "Sophie Morel",
    buyerEmail: "sophie.morel@outlook.fr",
    sanctuary: "André Morel",
    payment: "paid",
    status: "digital-active",
    article: "1x Extension Héritage (Numérique)",
    stripeLink: "https://dashboard.stripe.com/payments/pi_yyy",
  },
  {
    id: "#CMD-1039",
    date: "12 mars 2026",
    type: "b2c-frene",
    typeLabel: "B2C - Édition Frêne",
    buyer: "Marc Lefèvre",
    buyerEmail: "marc.lef@free.fr",
    sanctuary: "Paulette Lefèvre",
    payment: "paid",
    status: "to-ship",
    article: "1x Édition Personnelle — Frêne",
    address: "Marc Lefèvre — 3 impasse du Chêne, 69003 Lyon",
    phone: "06 11 22 33 44",
    stripeLink: "https://dashboard.stripe.com/payments/pi_zzz",
  },
  {
    id: "#CMD-1038",
    date: "10 mars 2026",
    type: "b2b-stele",
    typeLabel: "B2B - Stèle Principale",
    buyer: "Roc Eclerc Nantes",
    buyerEmail: "commandes@roc-eclerc-nantes.fr",
    sanctuary: "Gérard Fontaine",
    payment: "to-invoice",
    status: "shipped",
    article: "1x Stèle Principale — Marbre Blanc",
    address: "Roc Eclerc — 45 boulevard de la Prairie, 44000 Nantes",
    phone: "02 40 55 66 77",
    tracking: "6A98765432100",
    nfcId: "NFC-00887",
  },
];

const typeConfig: Record<OrderType, { icon: typeof Briefcase; className: string }> = {
  "b2b-stele": { icon: Briefcase, className: "bg-slate-100 text-slate-700 border-slate-200" },
  "b2c-noyer": { icon: TreePine, className: "bg-amber-50 text-amber-700 border-amber-200" },
  "b2c-frene": { icon: TreePine, className: "bg-orange-50 text-orange-700 border-orange-200" },
  "b2c-heritage": { icon: Cloud, className: "bg-violet-50 text-violet-700 border-violet-200" },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, { label: string; className: string }> = {
    "to-ship": { label: "🟡 À expédier", className: "bg-yellow-50 text-yellow-800 border-yellow-200" },
    "shipped": { label: "🟢 Expédié", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    "digital-active": { label: "🔵 Activé (Numérique)", className: "bg-blue-50 text-blue-700 border-blue-200" },
  };
  const s = map[status];
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.className}`}>{s.label}</span>;
}

function PaymentBadge({ payment }: { payment: PaymentStatus }) {
  if (payment === "paid") return <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Payé (Stripe)</span>;
  return <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600">À facturer</span>;
}

function TypeBadge({ type, label }: { type: OrderType; label: string }) {
  const cfg = typeConfig[type];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.className}`}>
      <Icon size={13} />
      {label}
    </span>
  );
}

function OrderDetailsDrawer({ order, onClose }: { order: Order; onClose: () => void }) {
  const isPhysical = order.status !== "digital-active";

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto bg-background shadow-xl border-l"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-semibold text-foreground">{order.id}</span>
            <StatusBadge status={order.status} />
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 p-6">
          {/* Bloc 1 — Article & Appairage */}
          <div className="rounded-lg bg-muted/40 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Article & Appairage</h3>
            <p className="text-sm text-muted-foreground">{order.article}</p>
            {isPhysical && (
              <div className="flex gap-2">
                <Input placeholder="ID Puce NFC" defaultValue={order.nfcId ?? ""} className="h-9 text-sm" />
                <Button size="sm" variant="outline" className="shrink-0 h-9 text-xs">Lier au sanctuaire</Button>
              </div>
            )}
          </div>

          {/* Bloc 2 — Expédition */}
          {isPhysical && (
            <div className="rounded-lg bg-muted/40 p-4 space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Expédition</h3>
              {order.address && <p className="text-sm text-muted-foreground">{order.address}</p>}
              {order.phone && <p className="text-sm text-muted-foreground">Tél : {order.phone}</p>}
              <div className="flex gap-2">
                <Input placeholder="N° de suivi (Colissimo)" defaultValue={order.tracking ?? ""} className="h-9 text-sm" />
                <Button size="sm" className="shrink-0 h-9 bg-foreground text-background hover:bg-foreground/90 text-xs">Marquer comme expédié</Button>
              </div>
            </div>
          )}

          {/* Bloc 3 — Facturation */}
          <div className="rounded-lg bg-muted/40 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Facturation</h3>
            <p className="text-sm text-muted-foreground">{order.buyerEmail}</p>
            {order.stripeLink ? (
              <a href={order.stripeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline">
                Voir sur Stripe <ExternalLink size={13} />
              </a>
            ) : (
              <p className="text-sm italic text-muted-foreground">Sera inclus dans le relevé mensuel B2B.</p>
            )}
          </div>

          {/* Bloc 4 — Sanctuaire */}
          <div className="rounded-lg bg-muted/40 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Sanctuaire</h3>
            <p className="text-sm text-muted-foreground">{order.sanctuary}</p>
            <Button size="sm" variant="outline" className="h-9 text-xs">Ouvrir le sanctuaire</Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export default function SuperAdminOrders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const filtered = MOCK_ORDERS.filter((o) => {
    if (activeTab === "to-ship") return o.status === "to-ship";
    if (activeTab === "done") return o.status === "shipped" || o.status === "digital-active";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-semibold text-foreground">Gestion des Commandes</h1>
        <p className="text-sm text-muted-foreground mt-1">Suivi des commandes physiques et numériques.</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Toutes les commandes</TabsTrigger>
          <TabsTrigger value="to-ship">🔴 À expédier</TabsTrigger>
          <TabsTrigger value="done">🟢 Terminées</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="rounded-xl border border-gray-100 bg-background overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Commande & Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Acheteur</TableHead>
                  <TableHead>Sanctuaire Lié</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((order) => (
                  <TableRow
                    key={order.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <TableCell>
                      <span className="font-semibold text-foreground text-sm">{order.id}</span>
                      <br />
                      <span className="text-xs text-muted-foreground">{order.date}</span>
                    </TableCell>
                    <TableCell><TypeBadge type={order.type} label={order.typeLabel} /></TableCell>
                    <TableCell className="text-sm text-foreground">{order.buyer}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{order.sanctuary}</TableCell>
                    <TableCell><PaymentBadge payment={order.payment} /></TableCell>
                    <TableCell><StatusBadge status={order.status} /></TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                      Aucune commande dans cette catégorie.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
