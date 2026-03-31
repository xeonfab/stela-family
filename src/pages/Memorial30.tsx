import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Lock, Mic, Video } from "lucide-react";
import portraitImg from "@/assets/jean-claude-portrait-new.jpg";

/* ─── Mock Data ─── */
const deceased = {
  firstName: "Jean-Claude",
  lastName: "Dubois",
  birth: "12 mars 1954",
  death: "8 novembre 2026",
};

const quotes = [
  {
    text: "Il disait toujours que le bonheur, c'était une table bien garnie et des gens qu'on aime autour. Rien de plus.",
    author: "Marie, sa fille",
  },
  {
    text: "Un matin d'hiver, il m'a pris la main et m'a dit : « Tu sais, la vie ne se mesure pas en années, mais en matins où l'on a envie de se lever. »",
    author: "Hélène, son épouse",
  },
  {
    text: "Papa avait cette manie de siffloter dans l'atelier. On savait toujours quand il était heureux — c'est-à-dire presque tout le temps.",
    author: "Thomas, son fils",
  },
];

const photos = [
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    caption: "Été 1987, vacances en Bretagne",
  },
  {
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    caption: "Noël 2019, la dernière photo de famille au complet",
  },
  {
    src: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76cb?w=800&q=80",
    caption: "Son jardin, son refuge",
  },
];

const mediaItems = [
  { type: "audio" as const, title: "Message vocal à Marie", author: "Jean-Claude", duration: "1:42" },
  { type: "video" as const, title: "Anniversaire des 70 ans", author: "Thomas", duration: "3:18" },
  { type: "audio" as const, title: "Il raconte son enfance", author: "Hélène", duration: "4:05" },
];

/* ─── Entry Vestibule ─── */
const EntryVestibule = ({ onEnter }: { onEnter: () => void }) => (
  <motion.div
    key="vestibule"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F7F5]"
  >
    <div className="text-center space-y-6 px-6">
      <div className="mx-auto w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-foreground/10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.08)] mb-2">
        <img src={portraitImg} alt={`${deceased.firstName} ${deceased.lastName}`} className="w-full h-full object-cover" />
      </div>
      <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground/90">
        {deceased.firstName} {deceased.lastName}
      </h1>
      <p className="text-sm tracking-[0.15em] text-muted-foreground">
        {deceased.birth} — {deceased.death}
      </p>
      <button
        onClick={onEnter}
        className="mt-10 px-8 py-3 rounded-full border border-foreground/20 text-sm tracking-wide text-foreground/80 hover:bg-foreground/5 transition-all duration-500"
      >
        Entrer dans le sanctuaire
      </button>
    </div>
  </motion.div>
);

/* ─── Tab: L'Empreinte ─── */
const EmpreinteTab = () => (
  <div className="max-w-2xl mx-auto space-y-16 py-12 px-6">
    {quotes.map((q, i) => (
      <motion.blockquote
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.15, duration: 0.6 }}
        className="space-y-4"
      >
        <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/85 italic">
          « {q.text} »
        </p>
        <footer className="text-xs tracking-[0.1em] text-muted-foreground uppercase">
          — {q.author}
        </footer>
        {i < quotes.length - 1 && (
          <div className="pt-8 flex justify-center">
            <div className="w-8 h-px bg-foreground/10" />
          </div>
        )}
      </motion.blockquote>
    ))}
  </div>
);

/* ─── Tab: Les Instants ─── */
const InstantsTab = () => (
  <div className="max-w-2xl mx-auto space-y-14 py-12 px-6">
    {photos.map((p, i) => (
      <motion.figure
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.12, duration: 0.6 }}
        className="space-y-3"
      >
        <img
          src={p.src}
          alt={p.caption}
          className="w-full rounded-lg object-cover aspect-[4/3]"
          loading="lazy"
        />
        <figcaption className="text-xs tracking-wide text-muted-foreground text-center">
          {p.caption}
        </figcaption>
      </motion.figure>
    ))}
  </div>
);

/* ─── Tab: L'Écho ─── */
const EchoTab = () => (
  <div className="max-w-2xl mx-auto space-y-6 py-12 px-6">
    {mediaItems.map((m, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
        className="flex items-center gap-4 p-5 rounded-xl border border-stone-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 cursor-pointer group"
        role="button"
        tabIndex={0}
        aria-label={`Lancer ${m.title}`}
      >
        <div className="w-11 h-11 rounded-full bg-stone-100 flex items-center justify-center shrink-0 group-hover:bg-stone-200 transition-colors duration-300">
          {m.type === "audio" ? (
            <Mic size={16} className="text-foreground/60" />
          ) : (
            <Video size={16} className="text-foreground/60" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground/90 truncate">{m.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{m.author}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono text-muted-foreground">{m.duration}</span>
          <div className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play size={14} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

/* ─── Main Page ─── */
const Memorial30 = () => {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!hasEntered && <EntryVestibule onEnter={() => setHasEntered(true)} />}
      </AnimatePresence>

      {hasEntered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="min-h-screen bg-[#F7F7F5] flex flex-col"
        >
          {/* Header */}
          <header className="pt-12 pb-6 text-center">
            <h1 className="font-serif text-2xl md:text-3xl tracking-tight text-foreground/90">
              {deceased.firstName} {deceased.lastName}
            </h1>
            <p className="text-xs tracking-[0.12em] text-muted-foreground mt-2">
              {deceased.birth} — {deceased.death}
            </p>
          </header>

          {/* Tabs */}
          <Tabs defaultValue="empreinte" className="flex-1 flex flex-col">
            <div className="flex justify-center px-4">
              <TabsList className="bg-transparent border-b border-border/30 rounded-none h-auto p-0 gap-8">
                <TabsTrigger
                  value="empreinte"
                  className="rounded-none bg-transparent px-0 pb-3 text-xs tracking-[0.15em] uppercase text-stone-400 data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground/40"
                >
                  L'Empreinte
                </TabsTrigger>
                <TabsTrigger
                  value="instants"
                  className="rounded-none bg-transparent px-0 pb-3 text-xs tracking-[0.15em] uppercase text-stone-400 data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground/40"
                >
                  Les Instants
                </TabsTrigger>
                <TabsTrigger
                  value="echo"
                  className="rounded-none bg-transparent px-0 pb-3 text-xs tracking-[0.15em] uppercase text-stone-400 data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground/40"
                >
                  L'Écho
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="empreinte" className="flex-1">
              <EmpreinteTab />
            </TabsContent>
            <TabsContent value="instants" className="flex-1">
              <InstantsTab />
            </TabsContent>
            <TabsContent value="echo" className="flex-1">
              <EchoTab />
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <footer className="py-8 text-center">
            <button className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300">
              <Lock size={10} />
              Gérer le sanctuaire
            </button>
          </footer>
        </motion.div>
      )}
    </>
  );
};

export default Memorial30;
