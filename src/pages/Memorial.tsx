import { useState, useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Feather, Quote, Music, Camera, BookOpen, Clock, ArrowLeft, MessageCircle, Flame, X, Lock, Pencil, Plus, Upload, CalendarDays } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import portraitImg from "@/assets/jean-claude-portrait-new.jpg";
import couplePhoto from "@/assets/jc-couple-70s.jpg";
import jcGardening from "@/assets/jc-gardening.jpg";
import jcTrumpet from "@/assets/jc-trumpet.jpg";
import jcHiking from "@/assets/jc-hiking.jpg";
import AddMemoryModal from "@/components/AddMemoryModal";
import LivingCandle from "@/components/LivingCandle";
import LivingHeart from "@/components/LivingHeart";

/* ─── Memory Card Data ─── */
type Memory = {
  type: "photo" | "audio" | "quote" | "video";
  image?: string;
  text?: string;
  title?: string;
  duration?: string;
  author: string;
  hearts: number;
};
const memories: Memory[] = [
  { type: "photo", image: jcGardening, text: "Chaque rose plantée ici porte ton souvenir. Tu me manques au quotidien.", author: "Marie", hearts: 34 },
  { type: "audio", title: "Souvenir vocal de Léo", duration: "1:24", author: "Léo", hearts: 18 },
  { type: "quote", text: "« Allez, on ouvre une bonne bouteille ! » — Ta phrase fétiche qui résonnera toujours.", author: "Michel", hearts: 52 },
  { type: "video", image: jcTrumpet, title: "Noël 2018 — Son solo de saxo", author: "Famille Dubois", hearts: 41 },
  { type: "quote", text: "« Merci Monsieur Dubois pour vos cours d'histoire passionnants. Vous m'avez donné le goût d'apprendre. »", author: "Thomas, ancien élève", hearts: 12 },
  { type: "photo", image: jcTrumpet, text: "Ton premier concert au caveau. Inoubliable.", author: "Marc", hearts: 28 },
  { type: "audio", title: "La chanson que tu m'as apprise", duration: "2:12", author: "Emma (Petite-fille)", hearts: 45 },
  { type: "quote", text: "« Ta recette de bœuf bourguignon restera un secret bien gardé, mais nos fous rires en cuisine, je ne les oublierai jamais. »", author: "Sophie", hearts: 31 },
  { type: "photo", image: jcGardening, text: "La première rose de la saison a éclos aujourd'hui. Je sais que tu veilles sur elle.", author: "Marie", hearts: 89 },
  { type: "video", image: couplePhoto, title: "Anniversaire surprise 2022", author: "Famille Dubois", hearts: 56 },
  { type: "quote", text: "« Un collègue en or, toujours prêt à dépanner avec le sourire. Tu vas nous manquer au lycée. »", author: "Claire et Paul", hearts: 19 },
  { type: "photo", image: jcHiking, text: "Notre dernière randonnée au Puy de Dôme.", author: "Michel", hearts: 37 },
  { type: "audio", title: "Souvenir de notre voyage en Italie", duration: "1:47", author: "Antoine", hearts: 22 },
  { type: "quote", text: "« Je garde précieusement le livre que tu m'as offert. Tes annotations dans la marge sont de vrais trésors. »", author: "Lucie", hearts: 14 },
];

/* ─── Intimate memories (kept private by admin) ─── */
const intimateMemories: Memory[] = [
  { type: "quote", text: "« Papa, tu te souviens quand on se cachait sous la table pour manger du chocolat en secret ? Je n'ai jamais oublié. »", author: "Hélène (Fille)", hearts: 3 },
  { type: "photo", image: jcGardening, text: "Sa dernière lettre, écrite à la main, que nous gardons précieusement.", author: "Marie", hearts: 1 },
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
      <button
        onClick={handleLight}
        className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full transition-all duration-700 ease-in-out focus:outline-none ${
          isLit
            ? "bg-amber-50 border border-[#D4AF37]/40 shadow-[0_0_20px_-5px_rgba(212,175,55,0.15)]"
            : "bg-white border border-stone-200 hover:border-stone-300 shadow-sm"
        }`}
        aria-label="Allumer une bougie"
      >
        <Flame size={20} fill="currentColor" strokeWidth={1.5}
          className={`transition-all duration-700 ${isLit ? "text-amber-500 fill-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "text-amber-400 fill-amber-400 animate-flame-pulse"}`}
        />
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
            <p className={`text-stone-600 leading-relaxed ${memory.type === "quote" ? "font-serif text-lg italic text-center" : ""}`}>{memory.text}</p>
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
            <div className="flex items-center gap-3">
              <LivingCandle count={memory.hearts} size={16} />
              <LivingHeart count={Math.floor(memory.hearts * 0.6)} size={16} />
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

/* ─── Timeline Edit Modal ─── */
const TimelineEditModal = ({ open, onOpenChange, initialData }: { open: boolean; onOpenChange: (v: boolean) => void; initialData?: { year?: string; title?: string; desc?: string } }) => {
  const [year, setYear] = useState(initialData?.year || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [desc, setDesc] = useState(initialData?.desc || "");

  useEffect(() => {
    if (open) {
      setYear(initialData?.year || "");
      setTitle(initialData?.title || "");
      setDesc(initialData?.desc || "");
    }
  }, [open, initialData]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[#FAF9F6] border-stone-200 rounded-2xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">Éditer un chapitre</DialogTitle>
        <div className="p-8 space-y-6">
          <h3 className="font-serif text-xl font-semibold text-stone-900">
            {initialData?.year ? "Modifier ce chapitre" : "Nouveau chapitre"}
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-500 tracking-wide">Date / Année</label>
              <Input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Ex: 1972"
                className="border-0 border-b border-stone-200 rounded-none bg-transparent text-sm text-stone-700 placeholder:text-stone-300 focus-visible:ring-0 focus-visible:border-[#D4AF37]/50 h-11 px-1" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-500 tracking-wide">Titre du chapitre</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: La rencontre avec Marie"
                className="border-0 border-b border-stone-200 rounded-none bg-transparent text-sm text-stone-700 placeholder:text-stone-300 focus-visible:ring-0 focus-visible:border-[#D4AF37]/50 h-11 px-1" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-500 tracking-wide">Le Récit</label>
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Racontez ce moment..."
                rows={4}
                className="w-full resize-none bg-stone-50/60 rounded-xl px-4 py-3 text-sm text-stone-700 leading-relaxed placeholder:text-stone-300 focus:outline-none focus:bg-stone-50 transition-colors border border-stone-100 focus:border-[#D4AF37]/40 min-h-[100px]" />
            </div>
            <div className="border border-dashed border-stone-200 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-stone-300 bg-stone-50/30 cursor-pointer hover:border-stone-300 transition-colors">
              <Upload size={18} strokeWidth={1.5} />
              <span className="text-xs font-medium">Ajouter une photo</span>
            </div>
          </div>
          <button
            onClick={() => {
              toast("Chapitre enregistré.", { style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" } });
              onOpenChange(false);
            }}
            className="w-full py-3 rounded-xl bg-[#D4AF37] text-white font-medium text-sm hover:bg-[#C4A030] transition-colors shadow-md shadow-[#D4AF37]/20 tracking-wide"
          >
            Enregistrer
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ─── Timeline Tab ─── */
/* ─── Biography intro text ─── */
const biographyText = [
  "Jean-Claude était un homme de terre et d'esprit. Professeur d'histoire passionné, il a éveillé la curiosité de centaines d'élèves au fil de ses trente années d'enseignement. Son regard pétillant et sa voix grave captivaient son auditoire dès les premières minutes.",
  "Mais c'est dans son jardin, entouré de ses rosiers et de ses petits-enfants, qu'il trouvait sa véritable paix. Chaque dimanche, la famille se réunissait autour de sa grande table en bois pour partager un repas qui durait des heures — ponctué de rires, de débats passionnés et de bouteilles soigneusement choisies.",
  "Un épicurien au rire tonitruant, un conteur intarissable, un grand-père extraordinaire. Il laisse derrière lui un jardin en fleur et des cœurs à jamais marqués par sa lumière.",
];

/* ─── Son Histoire Tab (Biography + Timeline) ─── */
const SonHistoireTab = ({ isAdmin }: { isAdmin: boolean }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEntry | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editInitialData, setEditInitialData] = useState<{ year?: string; title?: string; desc?: string } | undefined>();
  const [bioEditOpen, setBioEditOpen] = useState(false);

  const openDetail = (ev: TimelineEntry) => {
    if (editMode) return;
    setSelectedEvent(ev);
    setModalOpen(true);
  };

  const openEditModal = (ev?: TimelineEntry) => {
    setEditInitialData(ev ? { year: ev.year, title: ev.title, desc: ev.desc } : undefined);
    setEditModalOpen(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Admin: Edit mode toggle */}
      {isAdmin && (
        <div className="flex items-center justify-end gap-3 mb-8">
          <label className="text-xs text-stone-400 font-medium">Mode Édition</label>
          <Switch checked={editMode} onCheckedChange={setEditMode}
            className="data-[state=checked]:bg-[#D4AF37]" />
        </div>
      )}

      {/* ─── Biography Introduction ─── */}
      <div className="relative mb-16">
        {editMode && (
          <button
            onClick={() => setBioEditOpen(true)}
            className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white border border-[#D4AF37]/30 flex items-center justify-center hover:bg-amber-50 hover:border-[#D4AF37] transition-all shadow-sm z-20"
          >
            <Pencil size={12} className="text-[#D4AF37]" />
          </button>
        )}
        <article className="prose prose-stone prose-lg max-w-none">
          {biographyText.map((paragraph, idx) => (
            <p
              key={idx}
              className={`text-stone-600 leading-[1.9] text-lg ${idx === 0 ? "first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-amber-700 first-letter:float-left first-letter:mr-3 first-letter:mt-1" : "mt-6"}`}
            >
              {paragraph}
            </p>
          ))}
        </article>
      </div>

      {/* ─── Divider ─── */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 h-px bg-stone-200" />
        <span className="text-xs tracking-[0.2em] uppercase text-stone-300 font-medium">Chronologie</span>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      {/* ─── Timeline ─── */}

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-200 md:-translate-x-px" />

        {timeline.map((event, i) => (
          <div key={i}>
            {/* Insert "+" button between events (edit mode) */}
            {editMode && i > 0 && (
              <div className="relative flex justify-center mb-2 mt-1">
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <button
                    onClick={() => openEditModal()}
                    className="w-6 h-6 rounded-full bg-white border border-[#D4AF37]/40 flex items-center justify-center hover:bg-amber-50 hover:border-[#D4AF37] transition-all shadow-sm group"
                  >
                    <Plus size={12} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <div className="h-6" />
              </div>
            )}

            <div
              className={`relative flex items-start mb-4 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Dot / Icon */}
              {event.type === "audio" ? (
                <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center -translate-x-3 mt-0.5 z-10">
                  <MessageCircle size={13} className="text-amber-600" />
                </div>
              ) : (
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-amber-600 border-[3px] border-[#FAF9F6] shadow-sm -translate-x-1.5 mt-1.5 z-10" />
              )}

              {/* Content */}
              <div
                onClick={() => openDetail(event)}
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${editMode ? "" : "cursor-pointer"} group ${
                  i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                } ${event.type === "audio" ? "bg-amber-50/50 rounded-2xl p-4" : ""}`}
              >
                <div className="relative">
                  {/* Edit pencil icon */}
                  {editMode && (
                    <button
                      onClick={(e) => { e.stopPropagation(); openEditModal(event); }}
                      className={`absolute -top-1 ${i % 2 === 0 ? "md:-left-2 -right-1 md:right-auto" : "-right-1"} w-7 h-7 rounded-full bg-white border border-[#D4AF37]/30 flex items-center justify-center hover:bg-amber-50 hover:border-[#D4AF37] transition-all shadow-sm z-20`}
                    >
                      <Pencil size={12} className="text-[#D4AF37]" />
                    </button>
                  )}

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
            </div>
          </div>
        ))}
      </div>

      <TimelineDetailModal event={selectedEvent} open={modalOpen} onOpenChange={setModalOpen} />
      <TimelineEditModal open={editModalOpen} onOpenChange={setEditModalOpen} initialData={editInitialData} />

      {/* Bio Edit Modal */}
      <Dialog open={bioEditOpen} onOpenChange={setBioEditOpen}>
        <DialogContent className="max-w-lg bg-[#FAF9F6] border-stone-200 rounded-2xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">Modifier la biographie</DialogTitle>
          <div className="p-8 space-y-6">
            <h3 className="font-serif text-xl font-semibold text-stone-900">Modifier l'introduction</h3>
            <textarea
              defaultValue={biographyText.join("\n\n")}
              rows={10}
              className="w-full resize-none bg-stone-50/60 rounded-xl px-4 py-3 text-sm text-stone-700 leading-relaxed placeholder:text-stone-300 focus:outline-none focus:bg-stone-50 transition-colors border border-stone-100 focus:border-[#D4AF37]/40 min-h-[200px]"
            />
            <button
              onClick={() => {
                toast("Biographie enregistrée.", { style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" } });
                setBioEditOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-white font-medium text-sm hover:bg-[#C4A030] transition-colors shadow-md shadow-[#D4AF37]/20 tracking-wide"
            >
              Enregistrer
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

/* ─── Memory Card Component (reusable) ─── */
const MemoryCard = ({ memory, onClick }: { memory: Memory; onClick: () => void }) => {
  if (memory.type === "photo") {
    return (
      <div onClick={onClick} className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 cursor-pointer group hover:shadow-md transition-shadow">
        <img src={memory.image} alt={memory.text} className="w-full h-52 object-cover" loading="lazy" />
        <div className="p-5 space-y-3">
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">{memory.text}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400">— {memory.author}</span>
            <div className="flex items-center gap-3">
              <LivingCandle count={memory.hearts} />
              <LivingHeart count={Math.floor(memory.hearts * 0.6)} />
            </div>
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
          <div>
            <p className="text-sm font-medium text-stone-800">{memory.title}</p>
            <p className="text-xs text-stone-400">{memory.duration}</p>
          </div>
        </div>
        <AudioWaveform />
        <div className="flex items-center justify-between">
          <span className="text-xs text-stone-400">— {memory.author}</span>
          <div className="flex items-center gap-3">
            <LivingCandle count={memory.hearts} />
            <LivingHeart count={Math.floor(memory.hearts * 0.6)} />
          </div>
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
          <div className="flex items-center gap-3">
            <LivingCandle count={memory.hearts} />
            <LivingHeart count={Math.floor(memory.hearts * 0.6)} />
          </div>
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
            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
              <Play size={22} className="text-stone-800 ml-0.5" />
            </div>
          </div>
        </div>
        <div className="p-5 space-y-2">
          <div className="flex items-center gap-2 text-stone-400 text-xs"><Music size={12} /><span>Vidéo</span></div>
          <p className="text-sm font-medium text-stone-800">{memory.title}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400">— {memory.author}</span>
            <div className="flex items-center gap-3">
              <LivingCandle count={memory.hearts} />
              <LivingHeart count={Math.floor(memory.hearts * 0.6)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const Memorial = () => {
  const [activeTab, setActiveTab] = useState("souvenirs");
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [memoryDetailOpen, setMemoryDetailOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const openMemoryDetail = (memory: Memory) => {
    setSelectedMemory(memory);
    setMemoryDetailOpen(true);
  };

  const tabTriggerClass = "flex-1 h-full rounded-none border-b-2 border-transparent text-stone-400 data-[state=active]:text-amber-700 data-[state=active]:border-amber-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium text-sm transition-colors";

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* ─── Subtle grain overlay ─── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1]">
        <svg width="100%" height="100%">
          <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* ─── Top bar ─── */}
      <header className="py-4 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors">
          <ArrowLeft size={18} /><span>Retour</span>
        </Link>
      </header>

      {/* ─── Sacred Header ─── */}
      <section className="pt-8 pb-12 px-6 text-center">
        <div className="mx-auto w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-[3px] border-amber-600/20 shadow-[0_0_60px_-10px_rgba(212,175,55,0.2)] mb-8">
          <img src={portraitImg} alt="Jean-Claude Dubois" className="w-full h-full object-cover" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-3">Jean-Claude Dubois</h1>
        <p className="text-sm tracking-[0.3em] uppercase text-stone-400 mb-8">1948 — 2024</p>
        <p className="font-serif italic text-lg md:text-xl text-stone-500 max-w-xl mx-auto leading-relaxed">
          « Il cultivait son jardin comme il cultivait ses amitiés&nbsp;: avec patience, lumière et amour. »
        </p>
        <FlameRitual />
      </section>

      {/* ─── Sticky Tabs ─── */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-0 z-40 bg-[#FAF9F6]/80 backdrop-blur-xl border-b border-stone-200/50">
          <div className="max-w-3xl mx-auto px-6">
            <TabsList className="w-full bg-transparent h-14 gap-0">
              <TabsTrigger value="souvenirs" className={tabTriggerClass}>Souvenirs</TabsTrigger>
              <TabsTrigger value="histoire" className={tabTriggerClass}>Son Histoire</TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="intime" className={tabTriggerClass}>
                  <Lock size={13} className="mr-1.5 opacity-60" />
                  Intime
                </TabsTrigger>
              )}
            </TabsList>
          </div>
        </div>

        {/* ─── TAB 1: Memory Wall ─── */}
        <TabsContent value="souvenirs" className="mt-0">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {memories.map((memory, idx) => (
                <MemoryCard key={idx} memory={memory} onClick={() => openMemoryDetail(memory)} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ─── TAB 2: Son Histoire (Biography + Timeline) ─── */}
        <TabsContent value="histoire" className="mt-0">
          <SonHistoireTab isAdmin={isAdmin} />
        </TabsContent>

        {/* ─── TAB 4: Intime (Admin only) ─── */}
        {isAdmin && (
          <TabsContent value="intime" className="mt-0">
            <div className="max-w-5xl mx-auto px-6 py-12">
              <div className="text-center mb-10">
                <Lock size={20} className="mx-auto text-stone-300 mb-3" />
                <p className="text-sm text-stone-400 italic max-w-md mx-auto">
                  Ces souvenirs sont gardés dans l'intimité. Seuls les gardiens du sanctuaire peuvent les consulter.
                </p>
              </div>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {intimateMemories.map((memory, idx) => (
                  <MemoryCard key={idx} memory={memory} onClick={() => openMemoryDetail(memory)} />
                ))}
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* ─── Floating CTA ─── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setMemoryModalOpen(true)}
          className="flex items-center gap-2.5 px-8 py-4 bg-amber-600 text-white rounded-full shadow-[0_8px_30px_-4px_rgba(217,119,6,0.5)] hover:bg-amber-700 hover:shadow-[0_12px_40px_-4px_rgba(217,119,6,0.6)] transition-all duration-300 hover:scale-105 font-medium text-sm"
        >
          <Feather size={16} />
          Déposer un souvenir
        </button>
      </div>

      <MemoryDetailModal memory={selectedMemory} open={memoryDetailOpen} onOpenChange={setMemoryDetailOpen} />
      <AddMemoryModal open={memoryModalOpen} onOpenChange={setMemoryModalOpen} isAdmin={isAdmin} />

      {/* Bottom spacer for FAB */}
      <div className="h-24" />

      {/* ─── Dev Toggle: Admin / Guest ─── */}
      <div className="fixed bottom-4 right-4 z-[60]">
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="px-4 py-2 rounded-full text-xs font-medium shadow-lg border transition-all duration-200 backdrop-blur-sm bg-white/90 border-stone-200 text-stone-600 hover:bg-stone-50"
        >
          {isAdmin ? "👁 Vue Admin" : "👤 Vue Invité"}
        </button>
      </div>
    </div>
  );
};

export default Memorial;
