import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Inbox,
  LayoutGrid,
  Settings,
  Eye,
  Pin,
  Archive,
  Image,
  EyeOff,
  Type,
  Camera,
  Mic,
  Video,
  HardDrive,
  ChevronRight,
  MessageSquareText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import jcHiking from "@/assets/jc-hiking.jpg";

/* ─── Types ─── */
type SidebarEntry = "inbox" | "sanctuary" | "settings";
type SanctuarySubNav = "mots" | "photos" | "voix";

type InboxItem = {
  id: number;
  kind: "message" | "photo";
  senderName: string;
  senderRelation?: string;
  text: string;
  image?: string;
  caption?: string;
};

/* ─── Mock data ─── */
const inboxItems: InboxItem[] = [
  {
    id: 1,
    kind: "message",
    senderName: "Paul Martin",
    text: "Toutes mes pensées vous accompagnent dans cette épreuve. Jean-Claude était un homme d'une générosité rare.",
  },
  {
    id: 2,
    kind: "photo",
    senderName: "Julie",
    senderRelation: "Fille",
    text: "Les étés en Provence",
    image: jcHiking,
    caption: "Les étés en Provence",
  },
  {
    id: 3,
    kind: "message",
    senderName: "Marie Lefort",
    text: "Je garde précieusement le souvenir de nos longues discussions au jardin. Il savait écouter comme personne.",
  },
];

/* ─── Sidebar nav items ─── */
const navItems: { key: SidebarEntry; label: string; icon: typeof Inbox }[] = [
  { key: "inbox", label: "Boîte de réception", icon: Inbox },
  { key: "sanctuary", label: "Gérer le Sanctuaire", icon: LayoutGrid },
  { key: "settings", label: "Paramètres & Stockage", icon: Settings },
];

const sanctuarySubs: { key: SanctuarySubNav; label: string; icon: typeof Type }[] = [
  { key: "mots", label: "Mots", icon: Type },
  { key: "photos", label: "Photos", icon: Camera },
  { key: "voix", label: "Voix & Vidéos", icon: Mic },
];

/* ─── Component ─── */
const PageModeration = () => {
  const [activeNav, setActiveNav] = useState<SidebarEntry>("inbox");
  const [activeSub, setActiveSub] = useState<SanctuarySubNav>("mots");
  const [items, setItems] = useState(inboxItems);
  const [fadingIds, setFadingIds] = useState<Set<number>>(new Set());

  const pendingCount = items.length;

  const handleAction = (id: number, action: string) => {
    setFadingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setItems((prev) => prev.filter((m) => m.id !== id));
      setFadingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      toast.success(action, {
        description: "L'action a été appliquée avec succès.",
      });
    }, 400);
  };

  /* ─── Concession Widget ─── */
  const ConcessionWidget = () => (
    <div className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-b from-[#FAF6EE] to-[#F5F0E6] p-5 space-y-4">
      <div className="flex items-center gap-2">
        <HardDrive size={16} className="text-[#D4AF37]" />
        <h3 className="font-serif text-sm font-semibold text-stone-800">
          Concession & Héritage
        </h3>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-stone-500">
          <span>Stockage vidéo</span>
          <span className="font-medium text-stone-700">12 min / 15 min</span>
        </div>
        <Progress value={80} className="h-1.5 bg-stone-200 [&>div]:bg-[#D4AF37]" />
      </div>

      <p className="text-xs text-stone-400 leading-relaxed">
        Mémorial garanti jusqu'en <span className="font-medium text-stone-600">2051</span>
      </p>

      <Button
        variant="gold"
        size="sm"
        className="w-full text-xs py-2.5"
        asChild
      >
        <Link to="/capacite">Gérer ma concession Stela</Link>
      </Button>
    </div>
  );

  /* ─── Inbox View ─── */
  const InboxView = () => (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="font-serif text-xl font-semibold text-stone-800">
          Boîte de réception
        </h2>
        {pendingCount > 0 && (
          <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 text-xs font-medium">
            {pendingCount} en attente
          </Badge>
        )}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20">
          <Inbox size={32} className="mx-auto text-stone-300 mb-4" />
          <p className="font-serif text-stone-400 italic">
            Tous les souvenirs ont été traités.
          </p>
        </div>
      )}

      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className={`transition-all duration-400 ${
              fadingIds.has(item.id) ? "opacity-0 scale-[0.97]" : ""
            }`}
          >
            <Card className="border-stone-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300 bg-white overflow-hidden">
              <CardContent className="p-0">
                {/* Sender header */}
                <div className="px-5 pt-5 pb-3 flex items-start justify-between">
                  <div>
                    <p className="text-xs text-stone-400 mb-1">
                      {item.kind === "message"
                        ? "Message de condoléances reçu de"
                        : "Souvenir envoyé par"}
                    </p>
                    <p className="text-sm font-medium text-stone-800">
                      {item.senderName}
                      {item.senderRelation && (
                        <span className="text-stone-400 font-normal">
                          {" "}
                          ({item.senderRelation})
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                    {item.kind === "message" ? (
                      <MessageSquareText size={14} className="text-stone-400" />
                    ) : (
                      <Image size={14} className="text-stone-400" />
                    )}
                  </div>
                </div>

                {/* Image */}
                {item.image && (
                  <div className="px-5 pb-3">
                    <img
                      src={item.image}
                      alt={item.caption || ""}
                      className="w-full h-44 object-cover rounded-xl"
                      loading="lazy"
                    />
                    {item.caption && (
                      <p className="text-xs text-stone-400 mt-2 italic">
                        {item.caption}
                      </p>
                    )}
                  </div>
                )}

                {/* Text */}
                {item.kind === "message" && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-stone-600 leading-relaxed">
                      « {item.text} »
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 px-5 pb-5">
                  <Button
                    variant="gold"
                    size="sm"
                    className="flex-1 text-xs rounded-xl py-2.5"
                    onClick={() =>
                      handleAction(
                        item.id,
                        item.kind === "message"
                          ? "Épinglé dans les Mots"
                          : "Publié dans Photos"
                      )
                    }
                  >
                    {item.kind === "message" ? (
                      <>
                        <Pin size={12} />
                        Épingler dans les Mots
                      </>
                    ) : (
                      <>
                        <Image size={12} />
                        Publier dans Photos
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs rounded-xl py-2.5 border-stone-200 text-stone-500 hover:text-stone-700"
                    onClick={() =>
                      handleAction(
                        item.id,
                        item.kind === "message"
                          ? "Message archivé"
                          : "Souvenir masqué"
                      )
                    }
                  >
                    {item.kind === "message" ? (
                      <>
                        <Archive size={12} />
                        Archiver
                      </>
                    ) : (
                      <>
                        <EyeOff size={12} />
                        Masquer
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  /* ─── Sanctuary placeholder ─── */
  const SanctuaryView = () => (
    <div className="space-y-6">
      <h2 className="font-serif text-xl font-semibold text-stone-800">
        Gérer le Sanctuaire
      </h2>
      <div className="flex gap-2">
        {sanctuarySubs.map((sub) => (
          <button
            key={sub.key}
            onClick={() => setActiveSub(sub.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
              activeSub === sub.key
                ? "bg-stone-800 text-white"
                : "bg-stone-100 text-stone-500 hover:bg-stone-200"
            }`}
          >
            <sub.icon size={13} />
            {sub.label}
          </button>
        ))}
      </div>
      <div className="text-center py-16">
        <p className="text-sm text-stone-400 italic">
          Section « {sanctuarySubs.find((s) => s.key === activeSub)?.label} » — à venir.
        </p>
      </div>
    </div>
  );

  /* ─── Settings placeholder ─── */
  const SettingsView = () => (
    <div className="space-y-6">
      <h2 className="font-serif text-xl font-semibold text-stone-800">
        Paramètres & Stockage
      </h2>
      <div className="text-center py-16">
        <p className="text-sm text-stone-400 italic">
          Paramètres du sanctuaire — à venir.
        </p>
      </div>
    </div>
  );

  const viewMap: Record<SidebarEntry, JSX.Element> = {
    inbox: <InboxView />,
    sanctuary: <SanctuaryView />,
    settings: <SettingsView />,
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1]">
        <svg width="100%" height="100%">
          <filter id="grain-mod">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-mod)" />
        </svg>
      </div>

      {/* ─── Header ─── */}
      <header className="relative z-10 border-b border-stone-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-stone-800">
              L'Atelier de Jean-Claude
            </h1>
            <p className="text-xs text-stone-400 mt-0.5 tracking-wide">
              Espace de curation privé
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-stone-200 text-stone-600 hover:border-stone-300 text-xs gap-1.5"
            asChild
          >
            <Link to="/memorial30">
              <Eye size={13} />
              Voir le Sanctuaire
            </Link>
          </Button>
        </div>
      </header>

      {/* ─── Body ─── */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 lg:gap-8 px-6 py-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 mb-6 lg:mb-0">
          <nav className="space-y-1 mb-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveNav(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                  activeNav === item.key
                    ? "bg-white text-stone-800 font-medium shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100"
                    : "text-stone-500 hover:bg-white/60 hover:text-stone-700"
                }`}
              >
                <item.icon size={16} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.key === "inbox" && pendingCount > 0 && (
                  <Badge className="bg-[#D4AF37] text-white text-[10px] px-1.5 py-0 h-5 font-semibold border-0">
                    {pendingCount}
                  </Badge>
                )}
                {item.key === "sanctuary" && (
                  <ChevronRight size={14} className="text-stone-300" />
                )}
              </button>
            ))}
          </nav>

          <Separator className="mb-6 bg-stone-100" />

          <ConcessionWidget />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{viewMap[activeNav]}</main>
      </div>
    </div>
  );
};

export default PageModeration;
