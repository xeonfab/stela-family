import { useState, useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Feather, Heart, Quote, Music, Camera, BookOpen, Clock, ArrowLeft, MessageCircle, X, Pencil, Download, Sparkles, Lock, Menu, BookOpenCheck, Settings } from "lucide-react";
import JewelCandle from "@/components/JewelCandle";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import portraitImg from "@/assets/jean-claude-portrait-new.jpg";
import couplePhoto from "@/assets/jc-couple-70s.jpg";
import jcGardening from "@/assets/jc-gardening.jpg";
import jcTrumpet from "@/assets/jc-trumpet.jpg";
import jcHiking from "@/assets/jc-hiking.jpg";
import AddMemoryModal from "@/components/AddMemoryModal";

/* ─── Memory Card Data ─── */
type Memory = {
  type: "photo" | "audio" | "quote" | "video";
  image?: string;
  text?: string;
  title?: string;
  duration?: string;
  author: string;
  hearts: number;
  pending?: boolean;
};

const pendingMemories: Memory[] = [
  {
    type: "photo" as const,
    image: jcHiking,
    text: "Cette photo date de notre dernière escapade ensemble dans les Alpes. Tu étais si heureux ce jour-là, le vent dans les cheveux et le sourire aux lèvres. Je chéris ce moment plus que tout.",
    author: "Nathalie",
    hearts: 0,
    pending: true,
  },
  {
    type: "quote" as const,
    text: "« Tu m'as appris que la vraie richesse, c'est le temps qu'on offre aux autres. Merci pour toutes ces heures passées à m'écouter et me conseiller. »",
    author: "Julien (Neveu)",
    hearts: 0,
    pending: true,
  },
];

const memories: Memory[] = [
  {
    type: "photo" as const,
    image: jcGardening,
    text: "Chaque rose plantée ici porte ton souvenir. Tu me manques au quotidien.",
    author: "Marie",
    hearts: 34,
  },
  {
    type: "audio" as const,
    title: "Souvenir vocal de Léo",
    duration: "1:24",
    author: "Léo",
    hearts: 18,
  },
  {
    type: "quote" as const,
    text: "« Allez, on ouvre une bonne bouteille ! » — Ta phrase fétiche qui résonnera toujours.",
    author: "Michel",
    hearts: 52,
  },
  {
    type: "video" as const,
    image: jcTrumpet,
    title: "Noël 2018 — Son solo de saxo",
    author: "Famille Dubois",
    hearts: 41,
  },
  {
    type: "quote" as const,
    text: "« Merci Monsieur Dubois pour vos cours d'histoire passionnants. Vous m'avez donné le goût d'apprendre. »",
    author: "Thomas, ancien élève",
    hearts: 12,
  },
  {
    type: "photo" as const,
    image: jcTrumpet,
    text: "Ton premier concert au caveau. Inoubliable.",
    author: "Marc",
    hearts: 28,
  },
  {
    type: "audio" as const,
    title: "La chanson que tu m'as apprise",
    duration: "2:12",
    author: "Emma (Petite-fille)",
    hearts: 45,
  },
  {
    type: "quote" as const,
    text: "« Ta recette de bœuf bourguignon restera un secret bien gardé, mais nos fous rires en cuisine, je ne les oublierai jamais. »",
    author: "Sophie",
    hearts: 31,
  },
  {
    type: "photo" as const,
    image: jcGardening,
    text: "La première rose de la saison a éclos aujourd'hui. Je sais que tu veilles sur elle.",
    author: "Marie",
    hearts: 89,
  },
  {
    type: "video" as const,
    image: couplePhoto,
    title: "Anniversaire surprise 2022",
    author: "Famille Dubois",
    hearts: 56,
  },
  {
    type: "quote" as const,
    text: "« Un collègue en or, toujours prêt à dépanner avec le sourire. Tu vas nous manquer au lycée. »",
    author: "Claire et Paul",
    hearts: 19,
  },
  {
    type: "photo" as const,
    image: jcHiking,
    text: "Notre dernière randonnée au Puy de Dôme.",
    author: "Michel",
    hearts: 37,
  },
  {
    type: "audio" as const,
    title: "Souvenir de notre voyage en Italie",
    duration: "1:47",
    author: "Antoine",
    hearts: 22,
  },
  {
    type: "quote" as const,
    text: "« Je garde précieusement le livre que tu m'as offert. Tes annotations dans la marge sont de vrais trésors. »",
    author: "Lucie",
    hearts: 14,
  },
];

/* ─── Timeline Data ─── */
type TimelineEntry =
  | { type: "standard"; year: string; title: string; desc: string }
  | { type: "photo"; year: string; title: string; desc: string; photo: string; caption: string }
  | { type: "audio"; year: string; title: string; desc: string; attribution: string; quote: string; duration: string; current: string };

const timeline: TimelineEntry[] = [
  { type: "standard", year: "1948", title: "Naissance en Auvergne", desc: "Un matin de printemps, au cœur des volcans endormis, une vie commence." },
  { type: "photo", year: "1972", title: "La rencontre avec Marie", desc: "Un regard croisé dans une librairie de Clermont-Ferrand. Le coup de foudre fut immédiat.", photo: couplePhoto, caption: "Photo d'époque, été 1972." },
  { type: "standard", year: "1985", title: "Premier poste de professeur", desc: "Il entre dans sa classe d'histoire pour la première fois. Des centaines d'élèves suivront." },
  { type: "audio", year: "1998", title: "Une anecdote de Michel", desc: "", attribution: "Souvenir partagé par Michel R., ami et collègue.", quote: "\"Je n'oublierai jamais son discours pour mon départ en retraite. Il avait fait rire et pleurer toute la salle. Sacré Jean-Claude.\"", duration: "1:30", current: "0:45" },
  { type: "standard", year: "2010", title: "La retraite et le jardin parfait", desc: "Enfin le temps de cultiver ses roses, ses amitiés et le bonheur simple d'être grand-père." },
];

/* ─── Audio Waveform SVG ─── */
const AudioWaveform = () => (
  <div className="flex items-end gap-[2px] h-8">
    {[3, 5, 8, 4, 7, 10, 6, 3, 8, 5, 9, 4, 7, 3, 6, 8, 5, 3, 7, 4, 9, 6, 3, 5, 8].map((h, i) => (
      <div key={i} className="w-[3px] rounded-full bg-amber-600/40" style={{ height: `${h * 3}px` }} />
    ))}
  </div>
);

const FlameRitual = () => {
  const [isLit, setIsLit] = useState(false);
  const [litCount] = useState(12);

  const handleLight = () => {
    if (isLit) return;
    setIsLit(true);
    toast("Votre lumière a été déposée avec douceur.", {
      style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" },
    });
  };

  return (
    <div className="flex flex-col items-center mt-6 mb-8 gap-2.5">
      <button onClick={handleLight} className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full transition-all duration-700 ease-in-out focus:outline-none ${isLit ? "bg-amber-50 border border-[#D4AF37]/40 shadow-[0_0_20px_-5px_rgba(212,175,55,0.15)]" : "bg-white border border-stone-200 hover:border-stone-300 shadow-sm"}`} aria-label="Allumer une bougie">
        <JewelCandle size={20} lit={isLit} />
        <span className={`text-sm font-medium transition-all duration-700 ${isLit ? "text-amber-800" : "text-stone-600"}`}>
          {isLit ? `Vous veillez avec ${litCount} proches` : "Allumer une bougie"}
        </span>
      </button>
      <p className={`text-xs transition-all duration-700 text-center max-w-[280px] ${isLit ? "italic text-stone-400" : "text-stone-400"}`}>
        {isLit ? "Cette bougie brillera 7 jours. Revenez la raviver." : `${litCount} proches veillent sur ce sanctuaire.`}
      </p>
    </div>
  );
};

/* ─── Timeline "Theater Mode" Detail ─── */
const TimelineDetailModal = ({ event, open, onOpenChange }: { event: TimelineEntry | null; open: boolean; onOpenChange: (v: boolean) => void }) => {
  if (!event) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[#FAF9F6] border-stone-200 rounded-2xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">{event.title}</DialogTitle>
        {event.type === "photo" && <img src={event.photo} alt={event.caption} className="w-full h-56 object-cover" />}
        <div className="p-8 space-y-4">
          <span className="text-xs tracking-[0.2em] uppercase text-amber-600 font-medium">{event.year}</span>
          <h3 className="font-serif text-2xl font-semibold text-stone-900">{event.title}</h3>
          {event.desc && <p className="text-stone-600 leading-relaxed">{event.desc}</p>}
          {event.type === "photo" && <p className="text-xs text-stone-400 italic">{event.caption}</p>}
          {event.type === "audio" && (
            <div className="space-y-3">
              <p className="text-xs text-stone-400">{event.attribution}</p>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-stone-100">
                <button className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center shrink-0 hover:bg-amber-700 transition-colors">
                  <Play size={14} className="text-white ml-0.5" fill="currentColor" />
                </button>
                <AudioWaveform />
                <span className="text-xs text-stone-400 font-mono shrink-0">{event.current} / {event.duration}</span>
              </div>
              <p className="text-stone-600 italic leading-relaxed">{event.quote}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ─── Memory Wall "Theater Mode" Detail ─── */
const MemoryDetailModal = ({ memory, open, onOpenChange }: { memory: Memory | null; open: boolean; onOpenChange: (v: boolean) => void }) => {
  if (!memory) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[#FAF9F6] border-stone-200 rounded-2xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">{memory.title || memory.author}</DialogTitle>
        {(memory.type === "photo" || memory.type === "video") && memory.image && (
          <div className="relative">
            <img src={memory.image} alt={memory.title || memory.text || ""} className="w-full max-h-72 object-cover" />
            {memory.type === "video" && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
                  <Play size={26} className="text-stone-800 ml-0.5" />
                </div>
              </div>
            )}
          </div>
        )}
        <div className="p-8 space-y-4">
          {memory.type === "quote" && <Quote size={28} className="mx-auto text-amber-600/30" />}
          {memory.title && <h3 className="font-serif text-xl font-semibold text-stone-900">{memory.title}</h3>}
          {memory.text && (
            <p className={`text-stone-600 leading-relaxed ${memory.type === "quote" ? "font-serif text-lg italic text-center" : ""}`}>
              {memory.text}
            </p>
          )}
          {memory.type === "audio" && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-stone-100">
                <button className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center shrink-0 hover:bg-amber-700 transition-colors">
                  <Play size={16} className="text-white ml-0.5" fill="currentColor" />
                </button>
                <AudioWaveform />
                <span className="text-xs text-stone-400 font-mono shrink-0">{memory.duration}</span>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <span className="text-sm text-stone-400">— {memory.author}</span>
            <div className="flex items-center gap-1.5 text-amber-600">
              <Heart size={16} className="fill-amber-600" />
              <span className="text-sm font-medium">{memory.hearts}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ClampedText = ({ text, onReadMore }: { text: string; onReadMore: () => void }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);
  useEffect(() => {
    const el = textRef.current;
    if (el) setIsClamped(el.scrollHeight > el.clientHeight);
  }, [text]);
  return (
    <>
      <p ref={textRef} className="text-sm text-stone-500 leading-relaxed line-clamp-3">{text}</p>
      {isClamped && (
        <button onClick={(e) => { e.stopPropagation(); onReadMore(); }} className="text-xs italic text-amber-600 hover:text-amber-700 transition-colors mt-1 font-serif">
          Lire la suite
        </button>
      )}
    </>
  );
};

/* ─── Editable Wrapper (hover pencil icon) ─── */
const EditableField = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative group/edit inline-block ${className}`}>
    {children}
    <div className="absolute -right-7 top-1/2 -translate-y-1/2 opacity-70 group-hover/edit:opacity-100 transition-opacity duration-300">
      <div className="w-6 h-6 rounded-full bg-white shadow-sm border border-stone-200 flex items-center justify-center">
        <Pencil size={11} className="text-[#D4AF37]" />
      </div>
    </div>
  </div>
);

/* ─── Pending Memory Card Wrapper ─── */
const PendingCardWrapper = ({ children, onApprove, onKeepPrivate }: { children: React.ReactNode; onApprove: () => void; onKeepPrivate: () => void }) => {
  const [resolved, setResolved] = useState(false);
  const [fading, setFading] = useState(false);

  const handleAction = (action: () => void) => {
    setFading(true);
    setTimeout(() => {
      setResolved(true);
      action();
    }, 500);
  };

  if (resolved) {
    return <>{children}</>;
  }

  return (
    <div className={`relative transition-all duration-500 ${fading ? "opacity-70" : ""}`}>
      <div className={`transition-all duration-500 ${fading ? "" : "border-2 border-dashed border-[#D4AF37]/50 rounded-2xl bg-amber-50/30"}`}>
        {!fading && (
          <div className="px-4 pt-3 pb-1">
            <p className="text-xs italic text-stone-400">En attente de votre validation</p>
          </div>
        )}
        {children}
        {!fading && (
          <div className="flex items-center gap-2 px-4 pb-4 pt-1">
            <button
              onClick={(e) => { e.stopPropagation(); handleAction(onApprove); }}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#D4AF37] text-white text-xs font-medium rounded-full hover:bg-[#c9a432] transition-colors"
            >
              <Sparkles size={12} />
              Rendre public
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleAction(onKeepPrivate); }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs text-stone-400 hover:text-stone-600 transition-colors border border-stone-200 rounded-full bg-transparent"
            >
              <Lock size={12} />
              Garder intime
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Guardian Banner ─── */
const GuardianBanner = () => (
  <div className="sticky top-0 z-50 bg-[#1A1A1A] text-white px-6 py-3">
    <div className="max-w-6xl mx-auto flex items-center justify-between text-sm">
      <span className="flex items-center gap-2">
        🔒 <span className="font-medium">Mode Gardien</span> <span className="hidden sm:inline text-white/70">: Vous veillez sur ce sanctuaire.</span>
      </span>
      <span className="hidden md:inline text-white/70">✨ 2 souvenirs attendent votre regard.</span>
      <button className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-xs">
        <Download size={14} />
        <span className="hidden sm:inline">Obtenir le Kit Cérémonie (PDF)</span>
      </button>
    </div>
  </div>
);

/* ─── Timeline Tab ─── */
const TimelineTab = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEntry | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const openDetail = (ev: TimelineEntry) => { setSelectedEvent(ev); setModalOpen(true); };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-200 md:-translate-x-px" />
        {timeline.map((event, i) => (
          <div key={i} className={`relative flex items-start mb-4 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
            {event.type === "audio" ? (
              <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center -translate-x-3 mt-0.5 z-10">
                <MessageCircle size={13} className="text-amber-600" />
              </div>
            ) : (
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-amber-600 border-[3px] border-[#FAF9F6] shadow-sm -translate-x-1.5 mt-1.5 z-10" />
            )}
            <div onClick={() => openDetail(event)} className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] cursor-pointer group ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"} ${event.type === "audio" ? "bg-amber-50/50 rounded-2xl p-4" : ""}`}>
              <span className="text-xs tracking-[0.2em] uppercase text-amber-600 font-medium">{event.year}</span>
              <h3 className="font-serif text-lg font-semibold text-stone-900 mt-0.5 mb-1 group-hover:text-amber-700 transition-colors">{event.title}</h3>
              {event.desc && <ClampedText text={event.desc} onReadMore={() => openDetail(event)} />}
              {event.type === "photo" && (
                <div className="mt-3">
                  <img src={event.photo} alt={event.caption} className="rounded-xl shadow-md w-full object-cover max-h-44" loading="lazy" />
                  <p className="text-xs text-stone-400 italic mt-1.5">{event.caption}</p>
                </div>
              )}
              {event.type === "audio" && (
                <div className="mt-2 space-y-2">
                  <p className="text-xs text-stone-400">{event.attribution}</p>
                  <div className={`flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 shadow-sm border border-stone-100 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    <button className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center shrink-0 hover:bg-amber-700 transition-colors" onClick={(e) => e.stopPropagation()}>
                      <Play size={12} className="text-white ml-0.5" fill="currentColor" />
                    </button>
                    <AudioWaveform />
                    <span className="text-xs text-stone-400 font-mono shrink-0">{event.current} / {event.duration}</span>
                  </div>
                  <p className="text-sm text-stone-600 italic leading-relaxed line-clamp-3">{event.quote}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <TimelineDetailModal event={selectedEvent} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

/* ─── Render a single memory card ─── */
const MemoryCard = ({ memory, onClick }: { memory: Memory; onClick: () => void }) => {
  if (memory.type === "photo") {
    return (
      <div onClick={onClick} className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 cursor-pointer group hover:shadow-md transition-shadow">
        <img src={memory.image} alt={memory.text} className="w-full h-52 object-cover" loading="lazy" />
        <div className="p-5 space-y-3">
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">{memory.text}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400">— {memory.author}</span>
            <div className="flex items-center gap-1 text-amber-600"><Heart size={14} className="fill-amber-600" /><span className="text-xs">{memory.hearts}</span></div>
          </div>
        </div>
      </div>
    );
  }
  if (memory.type === "audio") {
    return (
      <div onClick={onClick} className="break-inside-avoid bg-amber-50/50 rounded-2xl p-5 shadow-sm border border-amber-100/50 space-y-4 cursor-pointer group hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md hover:bg-amber-700 transition-colors" onClick={(e) => e.stopPropagation()}>
            <Play size={16} className="ml-0.5" />
          </button>
          <div><p className="text-sm font-medium text-stone-800">{memory.title}</p><p className="text-xs text-stone-400">{memory.duration}</p></div>
        </div>
        <AudioWaveform />
        <div className="flex items-center justify-between">
          <span className="text-xs text-stone-400">— {memory.author}</span>
          <div className="flex items-center gap-1 text-amber-600"><Heart size={14} className="fill-amber-600" /><span className="text-xs">{memory.hearts}</span></div>
        </div>
      </div>
    );
  }
  if (memory.type === "quote") {
    return (
      <div onClick={onClick} className="break-inside-avoid bg-white rounded-2xl p-8 shadow-sm border border-stone-100 text-center cursor-pointer group hover:shadow-md transition-shadow">
        <Quote size={24} className="mx-auto text-amber-600/30 mb-4" />
        <p className="font-serif text-lg text-stone-800 leading-relaxed italic mb-4 line-clamp-3">{memory.text}</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs text-stone-400">— {memory.author}</span>
          <div className="flex items-center gap-1 text-amber-600"><Heart size={14} className="fill-amber-600" /><span className="text-xs">{memory.hearts}</span></div>
        </div>
      </div>
    );
  }
  if (memory.type === "video") {
    return (
      <div onClick={onClick} className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 cursor-pointer group hover:shadow-md transition-shadow">
        <div className="relative">
          <img src={memory.image} alt={memory.title} className="w-full h-48 object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg"><Play size={22} className="text-stone-800 ml-0.5" /></div>
          </div>
        </div>
        <div className="p-5 space-y-2">
          <div className="flex items-center gap-2 text-stone-400 text-xs"><Music size={12} /><span>Vidéo</span></div>
          <p className="text-sm font-medium text-stone-800">{memory.title}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400">— {memory.author}</span>
            <div className="flex items-center gap-1 text-amber-600"><Heart size={14} className="fill-amber-600" /><span className="text-xs">{memory.hearts}</span></div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

/* ═══════════════════ MAIN ADMIN PAGE ═══════════════════ */
const MemorialAdmin = () => {
  const [activeTab, setActiveTab] = useState("souvenirs");
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [memoryDetailOpen, setMemoryDetailOpen] = useState(false);

  const openMemoryDetail = (memory: Memory) => {
    setSelectedMemory(memory);
    setMemoryDetailOpen(true);
  };

  const handleApprove = (author: string) => {
    toast(`Le souvenir de ${author} est désormais visible par tous.`, {
      style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" },
    });
  };

  const handleKeepPrivate = (author: string) => {
    toast(`Le souvenir de ${author} reste intime.`, {
      style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" },
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* ─── Subtle grain overlay ─── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1]">
        <svg width="100%" height="100%">
          <filter id="grain-admin">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-admin)" />
        </svg>
      </div>

      {/* ─── Guardian Banner ─── */}
      <GuardianBanner />

      {/* ─── Top bar ─── */}
      <header className="py-4 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors">
          <ArrowLeft size={18} />
          <span>Retour</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 hover:border-stone-300 transition-colors bg-white/60">
              <Menu size={18} className="text-stone-500" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#FAFAFA] border-l border-stone-200/60 w-72 p-0">
            <SheetTitle className="sr-only">Menu administrateur</SheetTitle>
            <nav className="flex flex-col justify-center h-full px-10 gap-8">
              <Link to="/kit-ceremonie" className="font-serif text-2xl text-[#2C2C2C] hover:text-[#D4AF37] transition-colors flex items-center gap-3">
                <BookOpenCheck size={20} strokeWidth={1.5} />
                Kit de Cérémonie
              </Link>
              <Link to="/parametres" className="font-serif text-2xl text-[#2C2C2C] hover:text-[#D4AF37] transition-colors flex items-center gap-3">
                <Settings size={20} strokeWidth={1.5} />
                Paramètres de l'espace
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* ─── Sacred Header with Editable Fields ─── */}
      <section className="pt-8 pb-12 px-6 text-center">
        {/* Portrait — Editable */}
        <EditableField className="mx-auto">
          <div className="mx-auto w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-[3px] border-amber-600/20 shadow-[0_0_60px_-10px_rgba(212,175,55,0.2)] mb-8 cursor-pointer">
            <img src={portraitImg} alt="Jean-Claude Dubois" className="w-full h-full object-cover" />
          </div>
        </EditableField>

        {/* Name — Editable */}
        <EditableField>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-3 cursor-pointer">
            Jean-Claude Dubois
          </h1>
        </EditableField>

        {/* Dates — Editable */}
        <EditableField>
          <p className="text-sm tracking-[0.3em] uppercase text-stone-400 mb-8 cursor-pointer">1948 — 2024</p>
        </EditableField>

        {/* Epitaph — Editable */}
        <EditableField>
          <p className="font-serif italic text-lg md:text-xl text-stone-500 max-w-xl mx-auto leading-relaxed cursor-pointer">
            « Il cultivait son jardin comme il cultivait ses amitiés&nbsp;: avec patience, lumière et amour. »
          </p>
        </EditableField>

        <FlameRitual />
      </section>

      {/* ─── Sticky Tabs ─── */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-[52px] z-40 bg-[#FAF9F6]/80 backdrop-blur-xl border-b border-stone-200/50">
          <div className="max-w-3xl mx-auto px-6">
            <TabsList className="w-full bg-transparent h-14 gap-0">
              <TabsTrigger value="souvenirs" className="flex-1 h-full rounded-none border-b-2 border-transparent text-stone-400 data-[state=active]:text-amber-700 data-[state=active]:border-amber-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium text-sm transition-colors">
                Souvenirs
              </TabsTrigger>
              <TabsTrigger value="biographie" className="flex-1 h-full rounded-none border-b-2 border-transparent text-stone-400 data-[state=active]:text-amber-700 data-[state=active]:border-amber-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium text-sm transition-colors">
                Biographie
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex-1 h-full rounded-none border-b-2 border-transparent text-stone-400 data-[state=active]:text-amber-700 data-[state=active]:border-amber-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium text-sm transition-colors">
                Roman de sa Vie
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* ─── TAB 1: Memory Wall with Pending Cards ─── */}
        <TabsContent value="souvenirs" className="mt-0">
          {/* Moderation notification banner */}
          <div className="max-w-5xl mx-auto px-6 pt-8">
            <div className="flex items-center justify-between bg-[#D4AF37]/10 rounded-xl px-6 py-4 border border-[#D4AF37]/15">
              <p className="font-serif text-[#2C2C2C] text-sm md:text-base">
                3 nouveaux hommages attendent votre regard.
              </p>
              <Link
                to="/moderation"
                className="text-sm font-medium text-[#D4AF37] hover:text-[#c9a432] transition-colors whitespace-nowrap ml-4"
              >
                Ouvrir →
              </Link>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {/* Pending cards first */}
              {pendingMemories.map((memory, idx) => (
                <PendingCardWrapper
                  key={`pending-${idx}`}
                  onApprove={() => handleApprove(memory.author)}
                  onKeepPrivate={() => handleKeepPrivate(memory.author)}
                >
                  <MemoryCard memory={memory} onClick={() => openMemoryDetail(memory)} />
                </PendingCardWrapper>
              ))}
              {/* Standard cards */}
              {memories.map((memory, idx) => (
                <MemoryCard key={idx} memory={memory} onClick={() => openMemoryDetail(memory)} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ─── TAB 2: Biography ─── */}
        <TabsContent value="biographie" className="mt-0">
          <div className="max-w-2xl mx-auto px-6 py-16">
            <article className="prose prose-stone prose-lg max-w-none">
              <p className="text-stone-600 leading-[1.9] text-lg first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-amber-700 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                Jean-Claude était un homme de terre et d'esprit. Professeur d'histoire passionné, il a éveillé la
                curiosité de centaines d'élèves au fil de ses trente années d'enseignement. Son regard pétillant et sa
                voix grave captivaient son auditoire dès les premières minutes.
              </p>
              <p className="text-stone-600 leading-[1.9] text-lg mt-6">
                Mais c'est dans son jardin, entouré de ses rosiers et de ses petits-enfants, qu'il trouvait sa véritable
                paix. Chaque dimanche, la famille se réunissait autour de sa grande table en bois pour partager un repas
                qui durait des heures — ponctué de rires, de débats passionnés et de bouteilles soigneusement choisies.
              </p>
              <p className="text-stone-600 leading-[1.9] text-lg mt-6">
                Un épicurien au rire tonitruant, un conteur intarissable, un grand-père extraordinaire. Il laisse
                derrière lui un jardin en fleur et des cœurs à jamais marqués par sa lumière.
              </p>
            </article>
          </div>
        </TabsContent>

        {/* ─── TAB 3: Timeline ─── */}
        <TabsContent value="timeline" className="mt-0">
          <TimelineTab />
        </TabsContent>
      </Tabs>

      {/* FAB hidden on admin — moderation is the priority */}

      <MemoryDetailModal memory={selectedMemory} open={memoryDetailOpen} onOpenChange={setMemoryDetailOpen} />
      <AddMemoryModal open={memoryModalOpen} onOpenChange={setMemoryModalOpen} />

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-xs text-stone-300">Cet espace est privé et sécurisé par la famille.</p>
      </div>

      <div className="h-24" />
    </div>
  );
};

export default MemorialAdmin;
