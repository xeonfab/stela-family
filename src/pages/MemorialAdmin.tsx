import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Feather, Heart, Quote, Music, Camera, BookOpen, Clock, ArrowLeft, MessageCircle, X, Pencil, Download, Lock, Menu, BookOpenCheck, Settings, PenLine, Mic, ImagePlus, MoreHorizontal, Trash2, Share2, Sparkles, Smartphone, Mail, LinkIcon, Copy, Check, Eye, ChevronRight, CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AudioPlayer from "@/components/AudioPlayer";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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

const memories: Memory[] = [
{
  type: "photo" as const,
  image: jcGardening,
  text: "Chaque rose plantée ici porte ton souvenir. Tu me manques au quotidien.",
  author: "Marie",
  hearts: 34
},
{
  type: "audio" as const,
  title: "Souvenir vocal de Léo",
  duration: "1:24",
  author: "Léo",
  hearts: 18
},
{
  type: "quote" as const,
  text: "« Allez, on ouvre une bonne bouteille ! » — Ta phrase fétiche qui résonnera toujours.",
  author: "Michel",
  hearts: 52
},
{
  type: "video" as const,
  image: jcTrumpet,
  title: "Noël 2018 — Son solo de saxo",
  author: "Famille Dubois",
  hearts: 41
},
{
  type: "quote" as const,
  text: "« Merci Monsieur Dubois pour vos cours d'histoire passionnants. Vous m'avez donné le goût d'apprendre. »",
  author: "Thomas, ancien élève",
  hearts: 12
},
{
  type: "photo" as const,
  image: jcTrumpet,
  text: "Ton premier concert au caveau. Inoubliable.",
  author: "Marc",
  hearts: 28
},
{
  type: "audio" as const,
  title: "La chanson que tu m'as apprise",
  duration: "2:12",
  author: "Emma (Petite-fille)",
  hearts: 45
},
{
  type: "quote" as const,
  text: "« Ta recette de bœuf bourguignon restera un secret bien gardé, mais nos fous rires en cuisine, je ne les oublierai jamais. »",
  author: "Sophie",
  hearts: 31
},
{
  type: "photo" as const,
  image: jcGardening,
  text: "La première rose de la saison a éclos aujourd'hui. Je sais que tu veilles sur elle.",
  author: "Marie",
  hearts: 89
},
{
  type: "video" as const,
  image: couplePhoto,
  title: "Anniversaire surprise 2022",
  author: "Famille Dubois",
  hearts: 56
},
{
  type: "quote" as const,
  text: "« Un collègue en or, toujours prêt à dépanner avec le sourire. Tu vas nous manquer au lycée. »",
  author: "Claire et Paul",
  hearts: 19
},
{
  type: "photo" as const,
  image: jcHiking,
  text: "Notre dernière randonnée au Puy de Dôme.",
  author: "Michel",
  hearts: 37
},
{
  type: "audio" as const,
  title: "Souvenir de notre voyage en Italie",
  duration: "1:47",
  author: "Antoine",
  hearts: 22
},
{
  type: "quote" as const,
  text: "« Je garde précieusement le livre que tu m'as offert. Tes annotations dans la marge sont de vrais trésors. »",
  author: "Lucie",
  hearts: 14
}];


/* ─── Timeline Data ─── */
type TimelineEntry =
{type: "standard";year: string;title: string;desc: string;} |
{type: "photo";year: string;title: string;desc: string;photo: string;caption: string;} |
{type: "audio";year: string;title: string;desc: string;attribution: string;quote: string;duration: string;current: string;};

const timeline: TimelineEntry[] = [
{ type: "standard", year: "1948", title: "Naissance en Auvergne", desc: "Un matin de printemps, au cœur des volcans endormis, une vie commence." },
{ type: "photo", year: "1972", title: "La rencontre avec Marie", desc: "Un regard croisé dans une librairie de Clermont-Ferrand. Le coup de foudre fut immédiat.", photo: couplePhoto, caption: "Photo d'époque, été 1972." },
{ type: "standard", year: "1985", title: "Premier poste de professeur", desc: "Il entre dans sa classe d'histoire pour la première fois. Des centaines d'élèves suivront." },
{ type: "audio", year: "1998", title: "Une anecdote de Michel", desc: "", attribution: "Souvenir partagé par Michel R., ami et collègue.", quote: "\"Je n'oublierai jamais son discours pour mon départ en retraite. Il avait fait rire et pleurer toute la salle. Sacré Jean-Claude.\"", duration: "1:30", current: "0:45" },
{ type: "standard", year: "2010", title: "La retraite et le jardin parfait", desc: "Enfin le temps de cultiver ses roses, ses amitiés et le bonheur simple d'être grand-père." }];


/* AudioWaveform removed — using AudioPlayer component */

const FlameRitual = () => {
  const [isLit, setIsLit] = useState(false);
  const [litCount] = useState(12);

  const handleLight = () => {
    if (isLit) return;
    setIsLit(true);
    toast("Votre lumière a été déposée avec douceur.", {
      style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }
    });
  };

  return (
    <div className="flex flex-col items-center mt-6 mb-8 gap-2.5">
      <button onClick={handleLight} className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full transition-all duration-700 ease-in-out focus:outline-none ${isLit ? "bg-amber-50 border border-[#D4AF37]/40 shadow-[0_0_20px_-5px_rgba(212,175,55,0.15)]" : "bg-white border border-stone-200 hover:border-stone-300 shadow-sm"}`} aria-label="Allumer une bougie">
        <span className={isLit ? "is-active" : ""}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="flame-path" d="M12 1C12 1 4 8.5 4 14a8 8 0 0 0 16 0c0-2.5-1.2-4.8-2.5-6.5-.5.8-1.2 1.5-2 2C15 7 13.5 4 12 1Z" strokeLinejoin="round" />
            <path className="flame-path" d="M12 22a4.5 4.5 0 0 0 4.5-4.5c0-2-1.5-3.5-2.5-4.5-.5.7-1 1.2-1.5 1.5C12 13 11 11.5 10 10c-1.5 2-2.5 4-2.5 5.5A4.5 4.5 0 0 0 12 22Z" strokeLinejoin="round" />
          </svg>
        </span>
        <span className={`text-sm font-medium transition-all duration-700 ${isLit ? "text-amber-800" : "text-stone-600"}`}>
          {isLit ? "Votre lumière brille" : "Allumer une bougie"}
        </span>
      </button>
      <p className={`text-xs transition-all duration-700 text-center max-w-[280px] ${isLit ? "italic text-stone-400" : "text-stone-400"}`}>
        {isLit ? `Avec ${litCount} autres proches. Revenez raviver cette flamme dans 7 jours.` : `${litCount} proches ont laissé une lumière.`}
      </p>
    </div>);

};

/* ─── Timeline "Theater Mode" Detail ─── */
const TimelineDetailModal = ({ event, open, onOpenChange }: {event: TimelineEntry | null;open: boolean;onOpenChange: (v: boolean) => void;}) => {
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
          {event.type === "audio" &&
          <div className="space-y-3">
              <p className="text-xs text-stone-400">{event.attribution}</p>
              <AudioPlayer current={event.current} duration={event.duration} size="sm" className="bg-white rounded-xl px-4 py-3 shadow-sm border border-stone-100" />
              <p className="text-stone-600 italic leading-relaxed">{event.quote}</p>
            </div>
          }
        </div>
      </DialogContent>
    </Dialog>);

};

/* ─── Memory Wall "Theater Mode" Detail ─── */
const MemoryDetailModal = ({ memory, open, onOpenChange }: {memory: Memory | null;open: boolean;onOpenChange: (v: boolean) => void;}) => {
  if (!memory) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[#FAF9F6] border-stone-200 rounded-2xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">{memory.title || memory.author}</DialogTitle>
        {(memory.type === "photo" || memory.type === "video") && memory.image &&
        <div className="relative">
            <img src={memory.image} alt={memory.title || memory.text || ""} className="w-full max-h-72 object-cover" />
            {memory.type === "video" &&
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
                  <Play size={26} className="text-stone-800 ml-0.5" />
                </div>
              </div>
          }
          </div>
        }
        <div className="p-8 space-y-4">
          {memory.type === "quote" && <Quote size={28} className="mx-auto text-amber-600/30" />}
          {memory.title && <h3 className="font-serif text-xl font-semibold text-stone-900">{memory.title}</h3>}
          {memory.text &&
          <p className={`text-stone-600 leading-relaxed ${memory.type === "quote" ? "font-serif text-lg italic text-center" : ""}`}>
              {memory.text}
            </p>
          }
          {memory.type === "audio" &&
          <div className="space-y-3">
              <AudioPlayer duration={memory.duration} className="bg-white rounded-xl px-4 py-3 shadow-sm border border-stone-100" />
            </div>
          }
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <span className="text-sm text-stone-400">— {memory.author}</span>
            <div className="flex items-center gap-1.5 text-amber-600">
              <Heart size={16} className="fill-amber-600" />
              <span className="text-sm font-medium">{memory.hearts}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>);

};

const ClampedText = ({ text, onReadMore }: {text: string;onReadMore: () => void;}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);
  useEffect(() => {
    const el = textRef.current;
    if (el) setIsClamped(el.scrollHeight > el.clientHeight);
  }, [text]);
  return (
    <>
      <p ref={textRef} className="text-sm text-stone-500 leading-relaxed line-clamp-3">{text}</p>
      {isClamped &&
      <button onClick={(e) => {e.stopPropagation();onReadMore();}} className="text-xs italic text-amber-600 hover:text-amber-700 transition-colors mt-1 font-serif">
          Lire la suite
        </button>
      }
    </>);

};

/* ─── Editable Wrapper (hover pencil icon) ─── */
const EditableField = ({ children, className = "" }: {children: React.ReactNode;className?: string;}) =>
<div className={`relative group/edit inline-block ${className}`}>
    {children}
    <div className="absolute -right-7 top-1/2 -translate-y-1/2 opacity-70 group-hover/edit:opacity-100 transition-opacity duration-300">
      <div className="w-6 h-6 rounded-full bg-white shadow-sm border border-stone-200 flex items-center justify-center">
        <Pencil size={11} className="text-[#D4AF37]" />
      </div>
    </div>
  </div>;



/* ─── Guardian Banner ─── */
const GuardianBanner = () => { return null; };














/* ─── Son Histoire Tab (Biography + Timeline) ─── */
const SonHistoireTab = ({ onOpenBiography }: { onOpenBiography: () => void }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEntry | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const openDetail = (ev: TimelineEntry) => {setSelectedEvent(ev);setModalOpen(true);};

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* ─── Biography Introduction ─── */}
      <div className="relative mb-16">
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
        <div className="flex justify-center mt-6">
          <Button variant="goldOutline" size="sm" onClick={onOpenBiography} className="gap-2">
            <Pencil size={14} />
            Modifier
          </Button>
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 h-px bg-stone-200" />
        <span className="text-xs tracking-[0.2em] uppercase text-stone-300 font-medium">Chronologie</span>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      {/* ─── Timeline ─── */}
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-200 md:-translate-x-px" />
        {timeline.map((event, i) =>
        <div key={i} className={`relative flex items-start mb-4 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
            {event.type === "audio" ?
          <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center -translate-x-3 mt-0.5 z-10">
                <MessageCircle size={13} className="text-amber-600" />
              </div> :

          <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-amber-600 border-[3px] border-[#FAF9F6] shadow-sm -translate-x-1.5 mt-1.5 z-10" />
          }
            <div onClick={() => openDetail(event)} className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] cursor-pointer group ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"} ${event.type === "audio" ? "bg-amber-50/50 rounded-2xl p-4" : ""}`}>
              <span className="text-xs tracking-[0.2em] uppercase text-amber-600 font-medium">{event.year}</span>
              <h3 className="font-serif text-lg font-semibold text-stone-900 mt-0.5 mb-1 group-hover:text-amber-700 transition-colors">{event.title}</h3>
              {event.desc && <ClampedText text={event.desc} onReadMore={() => openDetail(event)} />}
              {event.type === "photo" &&
            <div className="mt-3">
                  <img src={event.photo} alt={event.caption} className="rounded-xl shadow-md w-full object-cover max-h-44" loading="lazy" />
                  <p className="text-xs text-stone-400 italic mt-1.5">{event.caption}</p>
                </div>
            }
              {event.type === "audio" &&
            <div className="mt-2 space-y-2">
                  <p className="text-xs text-stone-400">{event.attribution}</p>
                  <AudioPlayer current={event.current} duration={event.duration} size="sm" className={`bg-white rounded-xl px-3 py-2.5 shadow-sm border border-stone-100 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`} />
                  <p className="text-sm text-stone-600 italic leading-relaxed line-clamp-3">{event.quote}</p>
                </div>
            }
            </div>
          </div>
        )}
      </div>
      <TimelineDetailModal event={selectedEvent} open={modalOpen} onOpenChange={setModalOpen} />
    </div>);

};

/* ─── Admin options menu for memory cards ─── */
const AdminCardMenu = ({ author, onHide, onDelete }: {author: string;onHide: () => void;onDelete: () => void;}) =>
<DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button
      onClick={(e) => e.stopPropagation()}
      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-stone-100 flex items-center justify-center hover:bg-white transition-colors">
      
        <MoreHorizontal size={15} className="text-stone-400" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="min-w-[180px] bg-white/95 backdrop-blur-sm border border-stone-100 rounded-xl shadow-lg p-1">
      <DropdownMenuItem onClick={(e) => {e.stopPropagation();onHide();}} className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-stone-600 rounded-lg cursor-pointer">
        <Lock size={14} className="text-stone-400" />
        Rendre intime
      </DropdownMenuItem>
      <DropdownMenuItem onClick={(e) => {e.stopPropagation();onDelete();}} className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-[#8B4513] rounded-lg cursor-pointer">
        <Trash2 size={14} className="text-[#8B4513]" />
        Supprimer
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>;


/* ─── Render a single memory card ─── */
const MemoryCard = ({ memory, onClick, isAdmin = false, onHide, onDelete }: {memory: Memory;onClick: () => void;isAdmin?: boolean;onHide?: () => void;onDelete?: () => void;}) => {
  const adminMenu = isAdmin && onHide && onDelete ? <AdminCardMenu author={memory.author} onHide={onHide} onDelete={onDelete} /> : null;

  if (memory.type === "photo") {
    return (
      <div onClick={onClick} className="relative break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 cursor-pointer group hover:shadow-md transition-shadow">
        {adminMenu}
        <img src={memory.image} alt={memory.text} className="w-full h-52 object-cover" loading="lazy" />
        <div className="p-5 space-y-3">
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">{memory.text}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400">— {memory.author}</span>
            <div className="flex items-center gap-1 text-amber-600"><Heart size={14} className="fill-amber-600" /><span className="text-xs">{memory.hearts}</span></div>
          </div>
        </div>
      </div>);

  }
  if (memory.type === "audio") {
    return (
      <div onClick={onClick} className="relative break-inside-avoid bg-amber-50/50 rounded-2xl p-5 shadow-sm border border-amber-100/50 space-y-4 cursor-pointer group hover:shadow-md transition-shadow">
        {adminMenu}
        <div className="flex items-center gap-3">
          <div><p className="text-sm font-medium text-stone-800">{memory.title}</p><p className="text-xs text-stone-400">{memory.duration}</p></div>
        </div>
        <AudioPlayer duration={memory.duration} size="sm" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-stone-400">— {memory.author}</span>
          <div className="flex items-center gap-1 text-amber-600"><Heart size={14} className="fill-amber-600" /><span className="text-xs">{memory.hearts}</span></div>
        </div>
      </div>);

  }
  if (memory.type === "quote") {
    return (
      <div onClick={onClick} className="relative break-inside-avoid bg-white rounded-2xl p-8 shadow-sm border border-stone-100 text-center cursor-pointer group hover:shadow-md transition-shadow">
        {adminMenu}
        <Quote size={24} className="mx-auto text-amber-600/30 mb-4" />
        <p className="font-serif text-lg text-stone-800 leading-relaxed italic mb-4 line-clamp-3">{memory.text}</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs text-stone-400">— {memory.author}</span>
          <div className="flex items-center gap-1 text-amber-600"><Heart size={14} className="fill-amber-600" /><span className="text-xs">{memory.hearts}</span></div>
        </div>
      </div>);

  }
  if (memory.type === "video") {
    return (
      <div onClick={onClick} className="relative break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 cursor-pointer group hover:shadow-md transition-shadow">
        {adminMenu}
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
      </div>);

  }
  return null;
};

/* ─── Empty State: Ghost Card for Souvenirs ─── */
const EmptySouvenirsState = ({ onDeposit }: {onDeposit: () => void;}) =>
<div className="max-w-5xl mx-auto px-6 py-20 flex items-center justify-center">
    <div className="border-2 border-dashed border-[#EAEAEA] rounded-2xl p-12 md:p-16 max-w-md w-full text-center space-y-6">
      <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto">
        <Camera size={24} className="text-[#D4AF37]" />
      </div>
      <h3 className="font-serif text-xl md:text-2xl text-stone-800">Le début d'un bel hommage.</h3>
      <p className="text-sm text-stone-400 leading-relaxed max-w-xs mx-auto">
        Soyez le premier à déposer une photo, une anecdote ou une voix. Votre premier souvenir guidera et inspirera les proches qui rejoindront bientôt cet espace.
      </p>
      <button
      onClick={onDeposit}
      className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white text-sm font-medium rounded-full hover:bg-[#c9a432] transition-colors shadow-sm">
      
        <Feather size={16} />
        Déposer le premier souvenir
      </button>
    </div>
  </div>;


/* ─── Biography Modal (Modale 1) ─── */
const BiographyModal = ({ open, onOpenChange }: {open: boolean;onOpenChange: (v: boolean) => void;}) => {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"libre" | "guide">("libre");
  const [guidedOrigins, setGuidedOrigins] = useState("");
  const [guidedPassions, setGuidedPassions] = useState("");
  const [guidedHeritage, setGuidedHeritage] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePolish = () => {
    if (!text.trim()) return;
    setIsPolishing(true);
    setTimeout(() => {
      setIsPolishing(false);
      toast("Style amélioré et orthographe corrigée.", {
        style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }
      });
    }, 1800);
  };

  const handleGenerate = () => {
    if (!guidedOrigins.trim() && !guidedPassions.trim() && !guidedHeritage.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const parts = [guidedOrigins, guidedPassions, guidedHeritage].filter(Boolean);
      setText(parts.join("\n\n"));
      setMode("libre");
      setIsGenerating(false);
      toast("Texte généré ! Vous pouvez le modifier librement.", {
        style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }
      });
      setTimeout(() => textareaRef.current?.focus(), 100);
    }, 2200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl w-full h-full sm:h-auto sm:max-h-[90vh] rounded-none sm:rounded-2xl border-0 sm:border border-stone-200/60 bg-[#FAF9F6] p-0 flex flex-col gap-0 [&>button]:hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-2 space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-serif text-2xl text-stone-800">Sa biographie</DialogTitle>
            <button onClick={() => onOpenChange(false)} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors">
              <X size={18} className="text-stone-400" />
            </button>
          </div>

          {/* Segmented Control */}
          <div className="flex bg-stone-100 rounded-full p-1 gap-1">
            <button
              onClick={() => setMode("libre")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 ${
                mode === "libre"
                  ? "bg-white text-stone-800 shadow-sm"
                  : "text-stone-400 hover:text-stone-500"
              }`}
            >
              Écriture libre
            </button>
            <button
              onClick={() => setMode("guide")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition-all duration-300 ${
                mode === "guide"
                  ? "bg-white text-stone-800 shadow-sm"
                  : "text-stone-400 hover:text-stone-500"
              }`}
            >
              Mode guidé (Aide IA)
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-4 pt-2">
          {mode === "libre" ? (
            <div className="space-y-4">
              {/* Premium Textarea */}
              <Textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Commencez à écrire ici... Vous pouvez raconter ses origines, ses passions, ou ce qu'il vous a transmis."
                className="min-h-[280px] bg-[#FDFBF7] border border-stone-200/70 rounded-xl font-serif text-[1.05rem] leading-[1.85] text-stone-700 placeholder:text-stone-400/70 placeholder:font-sans placeholder:text-[0.95rem] placeholder:leading-[1.6] resize-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]/30 focus-visible:border-[#D4AF37]/20 p-5"
              />

              {/* AI Toolbar */}
              <div className="flex">

                <button
                  onClick={handlePolish}
                  disabled={isPolishing || !text.trim()}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    isPolishing
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] animate-pulse cursor-wait"
                      : text.trim()
                        ? "bg-white text-stone-600 border border-stone-200/60 shadow-sm hover:border-[#D4AF37]/40 hover:text-[#D4AF37] hover:shadow-md"
                        : "bg-white/50 text-stone-300 border border-stone-200/30 cursor-not-allowed"
                  }`}
                >
                  <Sparkles size={15} className={isPolishing ? "text-[#D4AF37]" : ""} />
                  {isPolishing ? "Amélioration en cours…" : "Améliorer le style et corriger"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Guided Field 1 */}
              <div className="space-y-1.5">
                <Label className="text-[0.7rem] tracking-[0.15em] uppercase text-stone-400 font-medium">Ses origines</Label>
                <Textarea
                  value={guidedOrigins}
                  onChange={(e) => setGuidedOrigins(e.target.value)}
                  placeholder="Où a-t-il grandi, sa famille..."
                  className="min-h-[80px] bg-[#FDFBF7] border border-stone-200/70 rounded-xl text-[0.95rem] leading-[1.6] text-stone-700 placeholder:text-stone-400/60 resize-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]/30 p-4"
                />
              </div>

              {/* Guided Field 2 */}
              <div className="space-y-1.5">
                <Label className="text-[0.7rem] tracking-[0.15em] uppercase text-stone-400 font-medium">Ses passions & son caractère</Label>
                <Textarea
                  value={guidedPassions}
                  onChange={(e) => setGuidedPassions(e.target.value)}
                  placeholder="Qu'est-ce qui l'animait au quotidien ?"
                  className="min-h-[80px] bg-[#FDFBF7] border border-stone-200/70 rounded-xl text-[0.95rem] leading-[1.6] text-stone-700 placeholder:text-stone-400/60 resize-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]/30 p-4"
                />
              </div>

              {/* Guided Field 3 */}
              <div className="space-y-1.5">
                <Label className="text-[0.7rem] tracking-[0.15em] uppercase text-stone-400 font-medium">Son héritage</Label>
                <Textarea
                  value={guidedHeritage}
                  onChange={(e) => setGuidedHeritage(e.target.value)}
                  placeholder="Que retiendrez-vous de lui ?"
                  className="min-h-[80px] bg-[#FDFBF7] border border-stone-200/70 rounded-xl text-[0.95rem] leading-[1.6] text-stone-700 placeholder:text-stone-400/60 resize-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]/30 p-4"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || (!guidedOrigins.trim() && !guidedPassions.trim() && !guidedHeritage.trim())}
                className={`w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                  isGenerating
                    ? "bg-[#D4AF37]/10 text-[#D4AF37] animate-pulse cursor-wait"
                    : (guidedOrigins.trim() || guidedPassions.trim() || guidedHeritage.trim())
                      ? "bg-white text-stone-600 border border-stone-200/60 shadow-sm hover:border-[#D4AF37]/40 hover:text-[#D4AF37] hover:shadow-md"
                      : "bg-white/50 text-stone-300 border border-stone-200/30 cursor-not-allowed"
                }`}
              >
                <Sparkles size={15} />
                {isGenerating ? "Génération en cours…" : "✨ Générer un texte à partir de ces notes"}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-stone-200/50">
          <button
            onClick={() => {onOpenChange(false);toast("Biographie enregistrée.", { style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" } });}}
            className="w-full py-3.5 bg-[#D4AF37] text-white text-sm font-semibold rounded-full hover:bg-[#c9a432] transition-colors shadow-sm tracking-[0.05em]"
          >
            Enregistrer la biographie
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ─── Chapter Modal (Modale 2) ─── */
const ChapterModal = ({ open, onOpenChange }: {open: boolean;onOpenChange: (v: boolean) => void;}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full h-full sm:h-auto sm:max-h-[90vh] rounded-none sm:rounded-2xl border-0 sm:border border-stone-200/60 bg-[#FAF9F6] p-0 flex flex-col gap-0 [&>button]:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <DialogTitle className="font-serif text-2xl text-stone-800">Nouveau chapitre</DialogTitle>
          <button onClick={() => onOpenChange(false)} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors">
            <X size={18} className="text-stone-400" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
          {/* Row 1: Title + Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[0.7rem] tracking-[0.15em] uppercase text-stone-400 font-medium">Titre de l'événement *</Label>
              <Input placeholder="Rencontre avec Marie" className="bg-white border-stone-200/80 rounded-xl h-11 text-stone-700 placeholder:text-stone-300 focus-visible:ring-1 focus-visible:ring-[#D4AF37]/30" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[0.7rem] tracking-[0.15em] uppercase text-stone-400 font-medium">Année ou date *</Label>
              <Input placeholder="1972" className="bg-white border-stone-200/80 rounded-xl h-11 text-stone-700 placeholder:text-stone-300 focus-visible:ring-1 focus-visible:ring-[#D4AF37]/30" />
            </div>
          </div>

          {/* Row 2: Story */}
          <div className="space-y-1.5">
            <Label className="text-[0.7rem] tracking-[0.15em] uppercase text-stone-400 font-medium">Votre récit</Label>
            <Textarea
              placeholder="Racontez ce moment précis..."
              className="min-h-[140px] bg-white border-stone-200/80 rounded-xl text-[0.95rem] leading-[1.6] text-stone-700 placeholder:text-stone-300 resize-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]/30 p-4" />
            
          </div>

          {/* Row 3: Optional media */}
          <div className="space-y-2">
            <p className="text-[0.7rem] tracking-[0.15em] uppercase text-stone-400 font-medium">Illustrer ce moment (optionnel)</p>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm text-stone-500 bg-white border border-stone-200/80 rounded-xl hover:bg-stone-50 transition-colors">
                <ImagePlus size={16} className="text-stone-400" />
                Ajouter une photo
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm text-stone-500 bg-white border border-stone-200/80 rounded-xl hover:bg-stone-50 transition-colors">
                <Mic size={16} className="text-stone-400" />
                Ajouter un vocal
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-stone-200/50">
          <button
            onClick={() => {onOpenChange(false);toast("Chapitre épinglé à son histoire.", { style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" } });}}
            className="w-full py-3.5 bg-[#D4AF37] text-white text-sm font-semibold rounded-full hover:bg-[#c9a432] transition-colors shadow-sm">
            
            Épingler à son histoire
          </button>
        </div>
      </DialogContent>
    </Dialog>);

};

/* ─── Empty State: Son Histoire (Biography + Golden Thread) ─── */
const EmptyHistoireState = ({ onOpenBiography, onOpenChapter }: {onOpenBiography: () => void;onOpenChapter: () => void;}) =>
<div className="max-w-2xl mx-auto px-6 py-16">
    {/* ── Biography empty block ── */}
    <div className="bg-[#F9F9F9] rounded-3xl px-8 py-12 text-center space-y-4 mb-14">
      <h3 className="font-serif text-lg text-stone-700">L'essence de sa vie</h3>
      <p className="text-sm text-stone-400 leading-relaxed max-w-sm mx-auto">
        Rédigez les quelques lignes qui accueilleront les visiteurs et résumeront son parcours.
      </p>
      <button
      onClick={onOpenBiography}
      className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4AF37] text-[#D4AF37] text-sm font-medium rounded-full hover:bg-[#D4AF37]/5 transition-colors">
      
        🖋 Rédiger la biographie
      </button>
    </div>

    {/* ── Golden Thread empty state ── */}
    <div className="relative flex flex-col items-center" style={{ minHeight: '420px' }}>
      <span className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-medium mb-4">1948</span>
      <div className="w-px bg-[#D4AF37]/30 flex-1 min-h-[80px]" />
      <div className="bg-[#FAF9F6] px-8 py-10 text-center space-y-5 max-w-sm -my-1 z-10">
        <h3 className="font-serif text-xl md:text-2xl text-stone-800">Le livre de sa vie</h3>
        <p className="text-sm text-stone-400 leading-relaxed">
          Épinglez ici les années marquantes, les rencontres et les passions pour construire sa biographie intemporelle.
        </p>
        <button
        onClick={onOpenChapter}
        className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4AF37] text-[#D4AF37] text-sm font-medium rounded-full hover:bg-[#D4AF37]/5 transition-colors">
        
          <BookOpen size={16} />
          Ajouter un premier chapitre
        </button>
      </div>
      <div className="w-px bg-[#D4AF37]/30 flex-1 min-h-[80px]" />
      <span className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-medium mt-4">2024</span>
    </div>
  </div>;


/* ═══════════════════ MAIN ADMIN PAGE ═══════════════════ */
const MemorialAdmin = () => {
  const [activeTab, setActiveTab] = useState("souvenirs");
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [memoryDetailOpen, setMemoryDetailOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [biographyModalOpen, setBiographyModalOpen] = useState(false);
  const [chapterModalOpen, setChapterModalOpen] = useState(false);
  const [publicMemories, setPublicMemories] = useState<Memory[]>(memories);
  const [intimateMemories, setIntimateMemories] = useState<Memory[]>([]);
  const [heroEditOpen, setHeroEditOpen] = useState(false);
  const [heroName, setHeroName] = useState("Jean-Claude Dubois");
  const [heroBirthDate, setHeroBirthDate] = useState<Date | undefined>(new Date(1948, 2, 15));
  const [heroDeathDate, setHeroDeathDate] = useState<Date | undefined>(new Date(2024, 0, 10));
  const heroDates = `${heroBirthDate ? format(heroBirthDate, "dd/MM/yyyy") : "?"} — ${heroDeathDate ? format(heroDeathDate, "dd/MM/yyyy") : "?"}`;
  const heroDatesShort = `${heroBirthDate ? heroBirthDate.getFullYear() : "?"} — ${heroDeathDate ? heroDeathDate.getFullYear() : "?"}`;
  const [heroCitation, setHeroCitation] = useState("« Il cultivait son jardin comme il cultivait ses amitiés\u00a0: avec patience, lumière et amour. »");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const shareUrl = "stela.family/hommage/jean-claude-dubois";
  const shareMessage = `Un espace privé et éternel pour honorer la mémoire de ${heroName} sur Stela.family.\n\nIci, nous rassemblons nos pensées, photos et témoignages pour créer son plus bel héritage. Vous pouvez aussi y allumer une bougie.\n\n👉 ${shareUrl}\n\nN'hésitez pas à transmettre ce geste de recueillement à ceux qui l'aimaient.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${shareUrl}`);
    setCopied(true);
    toast("Lien copié !", { style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" } });
  };
  const handleShareWhatsApp = () => { window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, "_blank"); };
  const handleShareSMS = () => { window.open(`sms:?body=${encodeURIComponent(shareMessage)}`, "_self"); };
  const handleShareEmail = () => { window.open(`mailto:?subject=${encodeURIComponent(`Mémorial de ${heroName}`)}&body=${encodeURIComponent(shareMessage)}`, "_self"); };
  const handleShareNative = () => { navigator.share?.({ title: `Mémorial de ${heroName}`, text: shareMessage, url: `https://${shareUrl}` }).catch(() => {}); };

  const handleMakeIntimate = (memory: Memory, idx: number) => {
    setPublicMemories((prev) => prev.filter((_, i) => i !== idx));
    setIntimateMemories((prev) => [...prev, memory]);
    toast(`Le souvenir de ${memory.author} a été déplacé dans l'Espace Intime.`, {
      style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }
    });
  };

  const openMemoryDetail = (memory: Memory) => {
    setSelectedMemory(memory);
    setMemoryDetailOpen(true);
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

      {/* ─── Dark Hero Section (Brun Noyer) ─── */}
      <div
        className="w-full relative"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #2a3d33 0%, #1d2a24 55%, #161f1b 100%)"
        }}
      >
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px"
          }}
        />
        {/* ─── Guardian Banner ─── */}
        <GuardianBanner />

        {/* ─── Top bar ─── */}
        <header className="relative z-10 py-4 px-6 flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-[#FBF9F6]/20 hover:border-[#FBF9F6]/40 transition-colors bg-[#FBF9F6]/10">
                <Menu size={18} className="text-[#FBF9F6]/70" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#FAFAFA] border-l border-stone-200/60 w-72 p-0">
              <SheetTitle className="sr-only">Menu administrateur</SheetTitle>
              <nav className="flex flex-col justify-center h-full px-10 gap-8">
                <Link to="/kit-ceremonie" className="font-serif text-2xl text-[#2C2C2C] hover:text-[#D4AF37] transition-colors flex items-center gap-3">
                  <BookOpenCheck size={20} strokeWidth={1.5} />
                  Kit de Cérémonie
                </Link>
                <Link to="/profil" className="font-serif text-2xl text-[#2C2C2C] hover:text-[#D4AF37] transition-colors flex items-center gap-3">
                  <Settings size={20} strokeWidth={1.5} />
                  Mon Profil
                </Link>
                <Link to="/acces" className="font-serif text-2xl text-[#2C2C2C] hover:text-[#D4AF37] transition-colors flex items-center gap-3">
                  <Settings size={20} strokeWidth={1.5} />
                  Gestion des Accès
                </Link>
                <Link to="/confidentialite" className="font-serif text-2xl text-[#2C2C2C] hover:text-[#D4AF37] transition-colors flex items-center gap-3">
                  <Settings size={20} strokeWidth={1.5} />
                  Confidentialité
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHeroEditOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[#FBF9F6]/20 hover:border-[#FBF9F6]/40 transition-colors bg-[#FBF9F6]/10"
              aria-label="Modifier le profil"
            >
              <Pencil size={16} className="text-[#FBF9F6]/70" />
            </button>
            <button
              onClick={() => setShareModalOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[#FBF9F6]/20 hover:border-[#FBF9F6]/40 transition-colors bg-[#FBF9F6]/10"
              aria-label="Partager"
            >
              <Share2 size={16} className="text-[#FBF9F6]/70" />
            </button>
          </div>
        </header>

        {/* ─── Sacred Header with Editable Fields ─── */}
        <section className="relative pt-8 pb-16 px-6 flex flex-col items-center text-center">

          {/* Portrait */}
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-[#FBF9F6]/80 shadow-[0_0_60px_-10px_rgba(212,175,55,0.15)] mb-8">
            <img src={portraitImg} alt={heroName} className="w-full h-full object-cover" />
          </div>

          {/* Name */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#FBF9F6] mb-3">
            {heroName}
          </h1>

          {/* Dates */}
          <p className="text-sm tracking-[0.3em] uppercase text-[#FBF9F6]/50 mb-8">{heroDatesShort}</p>

          {/* Citation */}
          {isEmpty ? (
            <button onClick={() => setHeroEditOpen(true)} className="inline-flex items-center gap-2 mt-2 mb-8 cursor-pointer group/citation max-w-xl mx-auto">
              <p className="font-serif italic text-lg md:text-xl text-[#FBF9F6]/30 leading-relaxed group-hover/citation:text-[#FBF9F6]/50 transition-colors">
                « Ajoutez les mots ou la citation qui racontent le mieux son essence... »
              </p>
            </button>
          ) : (
            <p className="font-serif italic text-lg md:text-xl text-[#FBF9F6]/70 max-w-xl mx-auto leading-relaxed mb-2">
              {heroCitation}
            </p>
          )}

          <FlameRitual />
        </section>

        {/* ─── Hero Edit Modal ─── */}
        <Dialog open={heroEditOpen} onOpenChange={setHeroEditOpen}>
          <DialogContent className="max-w-md max-sm:h-screen max-sm:max-h-screen max-sm:w-screen max-sm:max-w-none max-sm:rounded-none max-sm:border-none bg-[#FAF9F6] border-stone-200 rounded-2xl">
            <DialogTitle className="font-serif text-xl text-stone-800">Modifier le profil</DialogTitle>
            <div className="space-y-5 pt-2">
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-stone-200">
                  <img src={portraitImg} alt={heroName} className="w-full h-full object-cover" />
                </div>
                <button className="text-xs text-[#D4AF37] hover:text-[#B8960C] transition-colors font-medium flex items-center gap-1.5">
                  <Camera size={13} />
                  Changer la photo
                </button>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-stone-500 uppercase tracking-wider">Nom</Label>
                <Input value={heroName} onChange={(e) => setHeroName(e.target.value)} className="bg-white border-stone-200 font-serif text-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-stone-500 uppercase tracking-wider">Date de naissance</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md border border-stone-200 bg-white text-sm text-left hover:border-stone-300 transition-colors">
                        <CalendarIcon size={14} className="text-stone-400 shrink-0" />
                        <span className={heroBirthDate ? "text-stone-800" : "text-stone-400"}>
                          {heroBirthDate ? format(heroBirthDate, "dd/MM/yyyy") : "JJ/MM/AAAA"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={heroBirthDate}
                        onSelect={setHeroBirthDate}
                        locale={fr}
                        captionLayout="dropdown-buttons"
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-stone-500 uppercase tracking-wider">Date du décès</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md border border-stone-200 bg-white text-sm text-left hover:border-stone-300 transition-colors">
                        <CalendarIcon size={14} className="text-stone-400 shrink-0" />
                        <span className={heroDeathDate ? "text-stone-800" : "text-stone-400"}>
                          {heroDeathDate ? format(heroDeathDate, "dd/MM/yyyy") : "JJ/MM/AAAA"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={heroDeathDate}
                        onSelect={setHeroDeathDate}
                        locale={fr}
                        captionLayout="dropdown-buttons"
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-stone-500 uppercase tracking-wider">Citation / Épitaphe</Label>
                <Textarea value={heroCitation} onChange={(e) => setHeroCitation(e.target.value)} className="bg-white border-stone-200 font-serif italic min-h-[100px]" />
                <button
                  type="button"
                  onClick={() => {
                    toast("✨ L'IA vous suggérera bientôt une citation personnalisée.", { style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" } });
                  }}
                  className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#B8960C] transition-colors font-medium mt-1"
                >
                  <Sparkles size={13} />
                  Aide IA — Générer une citation
                </button>
              </div>
              <button
                onClick={() => {
                  setHeroEditOpen(false);
                  toast("Profil mis à jour.", { style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" } });
                }}
                className="w-full py-3 rounded-full bg-[#2C221B] text-[#FBF9F6] text-sm font-medium hover:bg-[#3a2e24] transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* ─── Sticky Tabs ─── */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-[52px] z-40 bg-[#FAF9F6]/80 backdrop-blur-xl py-3">
          <div className="flex justify-center">
            <TabsList className="inline-flex w-auto bg-[#F5F5F0] rounded-full p-1 gap-1 h-auto">
              <TabsTrigger value="souvenirs" className="rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 text-stone-400 hover:text-stone-600 data-[state=active]:bg-white data-[state=active]:text-stone-800 data-[state=active]:shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                Souvenirs
              </TabsTrigger>
              <TabsTrigger value="histoire" className="rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 text-stone-400 hover:text-stone-600 data-[state=active]:bg-white data-[state=active]:text-stone-800 data-[state=active]:shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                Son Histoire
              </TabsTrigger>
              <TabsTrigger value="intime" className="rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 text-stone-400 hover:text-stone-600 data-[state=active]:bg-white data-[state=active]:text-stone-800 data-[state=active]:shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex items-center gap-1.5">
                <Lock size={13} />
                Intime
                {intimateMemories.length > 0 &&
                <span className="ml-1 w-5 h-5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-semibold flex items-center justify-center">{intimateMemories.length}</span>
                }
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* ─── TAB 1: Memory Wall ─── */}
        <TabsContent value="souvenirs" className="mt-0">
          {isEmpty ?
          <EmptySouvenirsState onDeposit={() => setMemoryModalOpen(true)} /> :

          <>
              <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  {publicMemories.map((memory, idx) =>
                <MemoryCard
                  key={idx}
                  memory={memory}
                  onClick={() => openMemoryDetail(memory)}
                  isAdmin
                  onHide={() => handleMakeIntimate(memory, idx)}
                  onDelete={() => {
                    setPublicMemories((prev) => prev.filter((_, i) => i !== idx));
                    toast(`Le souvenir de ${memory.author} a été supprimé.`, { style: { background: "#FAF9F6", border: "1px solid rgba(140,69,19,0.15)", color: "#8B4513", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" } });
                  }} />

                )}
                </div>
              </div>
            </>
          }
        </TabsContent>

        {/* ─── TAB 2: Son Histoire ─── */}
        <TabsContent value="histoire" className="mt-0">
          {isEmpty ? <EmptyHistoireState onOpenBiography={() => setBiographyModalOpen(true)} onOpenChapter={() => setChapterModalOpen(true)} /> : <SonHistoireTab onOpenBiography={() => setBiographyModalOpen(true)} />}
        </TabsContent>

        {/* ─── TAB 3: Espace Intime ─── */}
        <TabsContent value="intime" className="mt-0">
          {intimateMemories.length === 0 ?
          <div className="max-w-5xl mx-auto px-6 py-20 flex items-center justify-center">
              <div className="border-2 border-dashed border-stone-200 rounded-2xl p-12 md:p-16 max-w-md w-full text-center space-y-6">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto">
                  <Lock size={24} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-stone-800">L'espace intime est vide</h3>
                <p className="text-sm text-stone-400 leading-relaxed max-w-xs mx-auto">
                  Les souvenirs rendus intimes par le garant apparaîtront ici, visibles uniquement par la famille.
                </p>
              </div>
            </div> :

          <div className="max-w-5xl mx-auto px-6 py-12">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {intimateMemories.map((memory, idx) =>
              <MemoryCard
                key={`intimate-${idx}`}
                memory={memory}
                onClick={() => openMemoryDetail(memory)} />

              )}
              </div>
            </div>
          }
        </TabsContent>
      </Tabs>

      {/* FAB hidden on admin — moderation is the priority */}

      <MemoryDetailModal memory={selectedMemory} open={memoryDetailOpen} onOpenChange={setMemoryDetailOpen} />
      <AddMemoryModal open={memoryModalOpen} onOpenChange={setMemoryModalOpen} />
      <BiographyModal open={biographyModalOpen} onOpenChange={setBiographyModalOpen} />
      <ChapterModal open={chapterModalOpen} onOpenChange={setChapterModalOpen} />

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-xs text-stone-300">Cet espace est privé et sécurisé par la famille.</p>
      </div>

      {/* Demo toggle: Empty / Filled state */}
      <button
        onClick={() => setIsEmpty(!isEmpty)}
        className="fixed bottom-6 left-6 z-50 px-4 py-2 text-xs font-medium rounded-full bg-stone-800 text-white/80 hover:text-white shadow-lg transition-colors">
        
        {isEmpty ? "👁 Voir état rempli" : "👁 Voir état vide"}
      </button>

      {/* ─── Share Modal ─── */}
      <Dialog open={shareModalOpen} onOpenChange={(v) => { setShareModalOpen(v); if (!v) { setCopied(false); setPreviewOpen(false); } }}>
        <DialogContent className="sm:max-w-md max-sm:h-screen max-sm:max-h-screen max-sm:w-screen max-sm:max-w-none max-sm:rounded-none max-sm:border-none bg-background border-border rounded-2xl p-0 gap-0 overflow-hidden [&>button]:z-10">
          <DialogTitle className="sr-only">Partager ce mémorial</DialogTitle>
          
          <div className="relative w-full overflow-hidden">
            <div className="absolute inset-0">
              <img src={portraitImg} alt="" className="w-full h-full object-cover scale-110 blur-2xl opacity-30" />
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
            </div>
            <div className="relative flex flex-col items-center pt-7 pb-6 px-6">
              <div className="w-[68px] h-[68px] rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-md">
                <img src={portraitImg} alt={heroName} className="w-full h-full object-cover" />
              </div>
              <p className="font-serif text-foreground text-lg mt-3">{heroName}</p>
              <p className="text-muted-foreground text-xs tracking-widest mt-0.5">{heroDatesShort}</p>
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-7 space-y-5">
            <p className="text-center text-sm text-muted-foreground leading-relaxed">
              Partagez ce mémorial avec vos proches, où qu'ils soient.
            </p>

            <div className="flex items-center justify-center gap-5">
              {[
                { label: "WhatsApp", icon: <MessageCircle size={22} />, onClick: handleShareWhatsApp },
                { label: "SMS", icon: <Smartphone size={22} />, onClick: handleShareSMS },
                { label: "Email", icon: <Mail size={22} />, onClick: handleShareEmail },
                ...(typeof navigator !== "undefined" && navigator.share
                  ? [{ label: "Partager", icon: <Share2 size={22} />, onClick: handleShareNative }]
                  : []),
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="flex flex-col items-center gap-1.5 group transition-all duration-200"
                >
                  <span className="w-14 h-14 rounded-2xl bg-card border border-border/80 flex items-center justify-center text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-all duration-300 shadow-sm">
                    {item.icon}
                  </span>
                  <span className="text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-0 rounded-xl bg-card border border-border/80 overflow-hidden">
              <div className="flex items-center gap-2 px-3.5 py-2.5 flex-1 min-w-0">
                <LinkIcon size={14} className="text-muted-foreground/50 shrink-0" />
                <span className="text-sm text-muted-foreground truncate">{shareUrl}</span>
              </div>
              <button
                onClick={handleCopyLink}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-all duration-300 border-l border-border/50 ${
                  copied ? "text-emerald-600 bg-emerald-50" : "text-primary hover:bg-primary/5"
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copié !" : "Copier"}
              </button>
            </div>

            <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
              <button
                onClick={() => setPreviewOpen(!previewOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Eye size={14} />
                  Aperçu du message envoyé
                </span>
                <ChevronRight size={14} className={`transition-transform duration-200 ${previewOpen ? "rotate-90" : ""}`} />
              </button>
              {previewOpen && (
                <div className="px-4 pb-4 pt-0 border-t border-border/30">
                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line mt-3">{shareMessage}</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="h-24" />
    </div>);

};

export default MemorialAdmin;