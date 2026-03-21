import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Feather, Quote, Music, Camera, BookOpen, Clock, Share2, MessageCircle, X, Pencil, Plus, Upload, CalendarDays, Copy, Check, ChevronLeft, ChevronRight, MapPin, Flower, Scroll, Eye, Mail, Smartphone, Link as LinkIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AudioPlayer from "@/components/AudioPlayer";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import CompanionSteleCard from "@/components/CompanionSteleCard";
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
{ type: "quote", text: "« Je garde précieusement le livre que tu m'as offert. Tes annotations dans la marge sont de vrais trésors. »", author: "Lucie", hearts: 14 }];



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

/* ─── Logistics Info Modal (Tabbed) ─── */
const LogisticsModal = ({ open, onOpenChange }: {open: boolean;onOpenChange: (v: boolean) => void;}) =>
<Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md bg-[#FCFBF9] border-stone-200 rounded-2xl p-0 overflow-hidden shadow-lg">
      <DialogTitle className="sr-only">Informations et faire-part</DialogTitle>
      <div className="p-6 pt-8">
        <Tabs defaultValue="obseques" className="w-full">
          <TabsList className="w-full bg-[#F5F5F0] rounded-full p-1 h-auto">
            <TabsTrigger value="obseques" className="flex-1 rounded-full text-sm font-medium py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-stone-800 text-stone-500">
              Déroulé des obsèques
            </TabsTrigger>
            <TabsTrigger value="fairepart" className="flex-1 rounded-full text-sm font-medium py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-stone-800 text-stone-500">
              Faire-part
            </TabsTrigger>
          </TabsList>

          <TabsContent value="obseques" className="mt-6 space-y-0">
            {/* Bloc A — Cérémonie */}
            <div className="space-y-3 pb-5">
              <div className="flex items-center gap-2 text-stone-700">
                <MapPin size={16} className="text-stone-400" />
                <span className="text-sm font-semibold tracking-wide">Cérémonie</span>
              </div>
              <div className="pl-6 space-y-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-stone-400 font-medium">Date & Heure</p>
                  <p className="text-sm text-stone-700 mt-0.5">Samedi 15 juin 2024 à 10h30</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-stone-400 font-medium">Lieu</p>
                  <p className="text-sm text-stone-700 mt-0.5">Église Saint-Pierre, Clermont-Ferrand</p>
                </div>
                <a
                href="https://maps.google.com/?q=Église+Saint-Pierre+Clermont-Ferrand"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#D4AF37] hover:text-[#c9a432] underline underline-offset-2 transition-colors">
                
                  🗺️ Ouvrir le plan
                </a>
              </div>
            </div>

            <Separator className="bg-stone-200/60" />

            {/* Bloc B — Lieu de repos */}
            <div className="space-y-3 pt-5">
              <div className="flex items-center gap-2 text-stone-700">
                <Flower size={16} className="text-stone-400" />
                <span className="text-sm font-semibold tracking-wide">Lieu de repos</span>
              </div>
              <div className="pl-6 space-y-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-stone-400 font-medium">Cimetière</p>
                  <p className="text-sm text-stone-700 mt-0.5">Cimetière des Carmes, Clermont-Ferrand</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-stone-400 font-medium">Emplacement</p>
                  <p className="text-sm text-stone-700 mt-0.5">Allée 4, Division 12, Rang B</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fairepart" className="mt-6">
            <div className="max-h-[50vh] overflow-y-auto pr-1">
              <div className="font-serif text-stone-700 text-base leading-[1.9] space-y-4">
                <p>
                  Marie Dubois, son épouse, Hélène et Philippe, ses enfants, Léo, Emma et Clara, ses petits-enfants, ainsi que toute la famille, ont la douleur de vous faire part du décès de
                </p>
                <p className="text-center font-semibold text-stone-800 text-xl py-2">Jean-Claude Dubois</p>
                <p>
                  survenu le 12 juin 2024 à l'âge de 76 ans, dans la paix de son foyer, entouré de l'amour des siens.
                </p>
                <p>
                  La cérémonie religieuse sera célébrée le samedi 15 juin à 10h30 en l'église Saint-Pierre de Clermont-Ferrand. L'inhumation aura lieu dans l'intimité familiale au cimetière des Carmes.
                </p>
                <p>
                  La famille remercie du fond du cœur tous ceux qui l'ont accompagné durant ces derniers mois. Vos témoignages d'affection et de soutien ont été d'un réconfort immense.
                </p>
                <p>
                  Ceux qui le souhaitent pourront déposer un souvenir, un mot ou une photo sur cet espace mémoriel, afin que la mémoire de Jean-Claude continue de vivre à travers chacun d'entre nous.
                </p>
                <p className="italic text-stone-500">
                  « Il cultivait son jardin comme il cultivait ses amitiés : avec patience, lumière et amour. »
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DialogContent>
  </Dialog>;


const LogisticsLink = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-[#FBF9F6]/50 font-medium hover:text-[#FBF9F6]/80 cursor-pointer transition-colors">
        
        Consulter le déroulé des obsèques
      </button>
      <LogisticsModal open={open} onOpenChange={setOpen} />
    </>);

};

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
      <button
        onClick={handleLight}
        className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full transition-all duration-700 ease-in-out focus:outline-none ${
        isLit ?
        "bg-[#FBF9F6] border border-[#D4AF37]/40 shadow-[0_0_20px_-5px_rgba(212,175,55,0.15)]" :
        "bg-[#FBF9F6] border border-[#FBF9F6]/20 shadow-sm hover:shadow-md"}`
        }
        aria-label="Allumer une bougie">
        
        <span className={isLit ? "is-active" : ""}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="flame-path" d="M12 1C12 1 4 8.5 4 14a8 8 0 0 0 16 0c0-2.5-1.2-4.8-2.5-6.5-.5.8-1.2 1.5-2 2C15 7 13.5 4 12 1Z" strokeLinejoin="round" />
            <path className="flame-path" d="M12 22a4.5 4.5 0 0 0 4.5-4.5c0-2-1.5-3.5-2.5-4.5-.5.7-1 1.2-1.5 1.5C12 13 11 11.5 10 10c-1.5 2-2.5 4-2.5 5.5A4.5 4.5 0 0 0 12 22Z" strokeLinejoin="round" />
          </svg>
        </span>
        <span className={`text-sm font-medium transition-all duration-700 ${isLit ? "text-[#D4AF37]" : "text-[#2C221B]"}`}>
          {isLit ? "Votre lumière brille" : "Allumer une bougie"}
        </span>
      </button>
      <p className={`text-xs transition-all duration-700 text-center max-w-[280px] ${isLit ? "italic text-[#FBF9F6]/50" : "text-[#FBF9F6]/40"}`}>
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
      <DialogContent className="max-w-2xl bg-[#FAF9F6] border-stone-200 rounded-2xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">{memory.title || memory.author}</DialogTitle>
        {(memory.type === "photo" || memory.type === "video") && memory.image &&
        <div className="relative">
            <img src={memory.image} alt={memory.title || memory.text || ""} className="w-full max-h-[28rem] object-cover" />
            {memory.type === "video" &&
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
                  <Play size={26} className="text-stone-800 ml-0.5" />
                </div>
              </div>
          }
            {memory.type === "photo" && <>
              <button className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-colors shadow-sm" aria-label="Photo précédente">
                <ChevronLeft size={16} className="text-stone-700" />
              </button>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-colors shadow-sm" aria-label="Photo suivante">
                <ChevronRight size={16} className="text-stone-700" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
            </>}
          </div>
        }
        <div className="p-8 space-y-4">
          {memory.type === "quote" && <Quote size={28} className="mx-auto text-amber-600/30" />}
          {memory.title && <h3 className="font-serif text-xl font-semibold text-stone-900">{memory.title}</h3>}
          {memory.text &&
          <p className={`text-stone-600 leading-relaxed ${memory.type === "quote" ? "font-serif text-lg italic text-center" : ""}`}>{memory.text}</p>
          }
          {memory.type === "audio" &&
          <div className="space-y-3">
              <AudioPlayer duration={memory.duration} className="bg-white rounded-xl px-4 py-3 shadow-sm border border-stone-100" />
            </div>
          }
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <span className="text-sm text-stone-400">— {memory.author}</span>
            <div className="flex items-center gap-3">
              <LivingHeart count={Math.floor(memory.hearts * 0.6)} size={16} />
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

/* ─── Timeline Edit Modal ─── */
const TimelineEditModal = ({ open, onOpenChange, initialData }: {open: boolean;onOpenChange: (v: boolean) => void;initialData?: {year?: string;title?: string;desc?: string;};}) => {
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
            className="btn-gold-jewel w-full py-3 rounded-xl text-white font-medium text-sm tracking-[0.05em]">
            
            Enregistrer
          </button>
        </div>
      </DialogContent>
    </Dialog>);

};

/* ─── Timeline Tab ─── */
/* ─── Biography intro text ─── */
const biographyText = [
"Jean-Claude était un homme de terre et d'esprit. Professeur d'histoire passionné, il a éveillé la curiosité de centaines d'élèves au fil de ses trente années d'enseignement. Son regard pétillant et sa voix grave captivaient son auditoire dès les premières minutes.",
"Mais c'est dans son jardin, entouré de ses rosiers et de ses petits-enfants, qu'il trouvait sa véritable paix. Chaque dimanche, la famille se réunissait autour de sa grande table en bois pour partager un repas qui durait des heures — ponctué de rires, de débats passionnés et de bouteilles soigneusement choisies.",
"Un épicurien au rire tonitruant, un conteur intarissable, un grand-père extraordinaire. Il laisse derrière lui un jardin en fleur et des cœurs à jamais marqués par sa lumière."];


/* ─── Son Histoire Tab (Biography + Timeline) ─── */
const SonHistoireTab = ({ isAdmin }: {isAdmin: boolean;}) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEntry | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editInitialData, setEditInitialData] = useState<{year?: string;title?: string;desc?: string;} | undefined>();
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
      {isAdmin &&
      <div className="flex items-center justify-end gap-3 mb-8">
          <label className="text-xs text-stone-400 font-medium">Mode Édition</label>
          <Switch checked={editMode} onCheckedChange={setEditMode}
        className="data-[state=checked]:bg-[#D4AF37]" />
        </div>
      }

      {/* ─── Biography Introduction ─── */}
      <div className="relative mb-16">
        {editMode &&
        <button
          onClick={() => setBioEditOpen(true)}
          className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white border border-[#D4AF37]/30 flex items-center justify-center hover:bg-amber-50 hover:border-[#D4AF37] transition-all shadow-sm z-20">
          
            <Pencil size={12} className="text-[#D4AF37]" />
          </button>
        }
        <article className="prose prose-stone prose-lg max-w-none">
          {biographyText.map((paragraph, idx) =>
          <p
            key={idx}
            className={`text-stone-600 leading-[1.9] text-lg ${idx === 0 ? "first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-amber-700 first-letter:float-left first-letter:mr-3 first-letter:mt-1" : "mt-6"}`}>
            
              {paragraph}
            </p>
          )}
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

        {timeline.map((event, i) =>
        <div key={i}>
            {/* Insert "+" button between events (edit mode) */}
            {editMode && i > 0 &&
          <div className="relative flex justify-center mb-2 mt-1">
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <button
                onClick={() => openEditModal()}
                className="w-6 h-6 rounded-full bg-white border border-[#D4AF37]/40 flex items-center justify-center hover:bg-amber-50 hover:border-[#D4AF37] transition-all shadow-sm group">
                
                    <Plus size={12} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <div className="h-6" />
              </div>
          }

            <div
            className={`relative flex items-start mb-4 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
            
              {/* Dot / Icon */}
              {event.type === "audio" ?
            <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center -translate-x-3 mt-0.5 z-10">
                  <MessageCircle size={13} className="text-amber-600" />
                </div> :

            <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-amber-600 border-[3px] border-[#FAF9F6] shadow-sm -translate-x-1.5 mt-1.5 z-10" />
            }

              {/* Content */}
              <div
              onClick={() => openDetail(event)}
              className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${editMode ? "" : "cursor-pointer"} group ${
              i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"} ${
              event.type === "audio" ? "bg-amber-50/50 rounded-2xl p-4" : ""}`}>
              
                <div className="relative">
                  {/* Edit pencil icon */}
                  {editMode &&
                <button
                  onClick={(e) => {e.stopPropagation();openEditModal(event);}}
                  className={`absolute -top-1 ${i % 2 === 0 ? "md:-left-2 -right-1 md:right-auto" : "-right-1"} w-7 h-7 rounded-full bg-white border border-[#D4AF37]/30 flex items-center justify-center hover:bg-amber-50 hover:border-[#D4AF37] transition-all shadow-sm z-20`}>
                  
                      <Pencil size={12} className="text-[#D4AF37]" />
                    </button>
                }

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
            </div>
          </div>
        )}
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
              className="w-full resize-none bg-stone-50/60 rounded-xl px-4 py-3 text-sm text-stone-700 leading-relaxed placeholder:text-stone-300 focus:outline-none focus:bg-stone-50 transition-colors border border-stone-100 focus:border-[#D4AF37]/40 min-h-[200px]" />
            
            <button
              onClick={() => {
                toast("Biographie enregistrée.", { style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" } });
                setBioEditOpen(false);
              }}
              className="btn-gold-jewel w-full py-3 rounded-xl text-white font-medium text-sm tracking-[0.05em]">
              
              Enregistrer
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>);

};

/* ─── Memory Card Component (reusable) ─── */
const MemoryCard = ({ memory, onClick }: {memory: Memory;onClick: () => void;}) => {
  if (memory.type === "photo") {
    return (
      <div onClick={onClick} className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 cursor-pointer group hover:shadow-md transition-shadow">
        <div className="relative">
          <img src={memory.image} alt={memory.text} className="w-full h-52 object-cover" loading="lazy" />
          {/* Image slider navigation arrows - always visible */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-colors shadow-sm"
            aria-label="Photo précédente">
            <ChevronLeft size={15} className="text-stone-700" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-colors shadow-sm"
            aria-label="Photo suivante">
            <ChevronRight size={15} className="text-stone-700" />
          </button>
          {/* Dots indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`} />
            ))}
          </div>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">{memory.text}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400">— {memory.author}</span>
            <div className="flex items-center gap-3">
              <LivingHeart count={Math.floor(memory.hearts * 0.6)} />
            </div>
          </div>
        </div>
      </div>);

  }
  if (memory.type === "audio") {
    return (
      <div onClick={onClick} className="break-inside-avoid bg-amber-50/50 rounded-2xl p-5 shadow-sm border border-amber-100/50 space-y-4 cursor-pointer group hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div>
            <p className="text-sm font-medium text-stone-800">{memory.title}</p>
            <p className="text-xs text-stone-400">{memory.duration}</p>
          </div>
        </div>
        <AudioPlayer duration={memory.duration} size="sm" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-stone-400">— {memory.author}</span>
          <div className="flex items-center gap-3">
            <LivingHeart count={Math.floor(memory.hearts * 0.6)} />
          </div>
        </div>
      </div>);

  }
  if (memory.type === "quote") {
    return (
      <div onClick={onClick} className="break-inside-avoid bg-white rounded-2xl p-8 shadow-sm border border-stone-100 text-center cursor-pointer group hover:shadow-md transition-shadow">
        <Quote size={24} className="mx-auto text-amber-600/30 mb-4" />
        <p className="font-serif text-lg text-stone-800 leading-relaxed italic mb-4 line-clamp-3">{memory.text}</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs text-stone-400">— {memory.author}</span>
          <div className="flex items-center gap-3">
            <LivingHeart count={Math.floor(memory.hearts * 0.6)} />
          </div>
        </div>
      </div>);

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
              <LivingHeart count={Math.floor(memory.hearts * 0.6)} />
            </div>
          </div>
        </div>
      </div>);

  }
  return null;
};

const Memorial = () => {
  const [activeTab, setActiveTab] = useState("souvenirs");
  const [personalEditionOpen, setPersonalEditionOpen] = useState(false);
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [memoryDetailOpen, setMemoryDetailOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const shareUrl = "stela.family/hommage/jean-claude-dubois";
  const shareMessage = `Un espace privé et éternel pour honorer la mémoire de Jean-Claude Dubois sur Stela.family.\n\nIci, nous rassemblons nos pensées, photos et témoignages pour créer son plus bel héritage. Vous pouvez aussi y allumer une bougie.\n\n👉 stela.family/hommage/jean-claude-dubois\n\nN'hésitez pas à transmettre ce geste de recueillement à ceux qui l'aimaient.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${shareUrl}`);
    setCopied(true);
    toast("Lien copié !", {
      style: { background: "#FAF9F6", border: "1px solid rgba(212,175,55,0.2)", color: "#57534e", fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, "_blank");
  };
  const handleShareSMS = () => {
    window.open(`sms:?body=${encodeURIComponent(shareMessage)}`, "_self");
  };
  const handleShareEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent("Mémorial de Jean-Claude Dubois")}&body=${encodeURIComponent(shareMessage)}`, "_self");
  };
  const handleShareNative = () => {
    navigator.share?.({ title: "Mémorial de Jean-Claude Dubois", text: shareMessage, url: `https://${shareUrl}` }).catch(() => {});
  };

  const openMemoryDetail = (memory: Memory) => {
    setSelectedMemory(memory);
    setMemoryDetailOpen(true);
  };

  const segmentedTriggerClass = "rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 text-stone-400 hover:text-stone-600 data-[state=active]:bg-white data-[state=active]:text-stone-800 data-[state=active]:shadow-[0_1px_3px_rgba(0,0,0,0.05)]";

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* ─── Subtle grain overlay ─── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1]">
        <svg width="100%" height="100%">
          <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
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

        {/* ─── Top bar ─── */}
        <header className="relative z-10 py-4 px-6 flex items-center justify-between">
          <button
            onClick={() => setShareModalOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm text-white/90 hover:bg-black/40 transition-colors">
            <Share2 size={20} />
          </button>
          <button
            onClick={() => setPersonalEditionOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm text-white/90 hover:bg-black/40 transition-colors">
            <Home size={20} />
          </button>
        </header>

        {/* ─── Sacred Header ─── */}
        <section className="relative z-10 pt-8 pb-16 px-6 text-center">
          <div className="mx-auto w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-[#FBF9F6]/80 shadow-[0_0_60px_-10px_rgba(212,175,55,0.15)] mb-8">
            <img src={portraitImg} alt="Jean-Claude Dubois" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#FBF9F6] mb-3">Jean-Claude Dubois</h1>
          <p className="text-sm tracking-[0.3em] uppercase text-[#FBF9F6]/50 mb-4">1948 — 2026</p>
          <LogisticsLink />
          <p className="font-serif italic text-lg md:text-xl text-[#FBF9F6]/70 max-w-xl mx-auto leading-relaxed mt-5">
            « Il cultivait son jardin comme il cultivait ses amitiés&nbsp;: avec patience, lumière et amour. »
          </p>
          <FlameRitual />
        </section>
      </div>

      {/* ─── Sticky Tabs ─── */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-0 z-40 bg-[#FAF9F6]/80 backdrop-blur-xl py-3">
          <div className="flex justify-center">
            <TabsList className="inline-flex w-auto bg-[#F5F5F0] rounded-full p-1 gap-1 h-auto">
              <TabsTrigger value="souvenirs" className={segmentedTriggerClass}>Souvenirs</TabsTrigger>
              <TabsTrigger value="histoire" className={segmentedTriggerClass}>Son Histoire</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* ─── TAB 1: Memory Wall ─── */}
        <TabsContent value="souvenirs" className="mt-0">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {memories.map((memory, idx) => (
                <React.Fragment key={idx}>
                  <MemoryCard memory={memory} onClick={() => openMemoryDetail(memory)} />
                  {idx === 2 && <CompanionSteleCard />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ─── TAB 2: Son Histoire (Biography + Timeline) ─── */}
        <TabsContent value="histoire" className="mt-0">
          <SonHistoireTab isAdmin={false} />
        </TabsContent>

      </Tabs>

      {/* ─── Floating CTA ─── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setMemoryModalOpen(true)}
          className="btn-gold-jewel flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 text-white rounded-full transition-all duration-300 font-medium text-sm tracking-[0.05em] whitespace-nowrap">
          
          <Feather size={16} />
          Déposer un souvenir
        </button>
      </div>

      <MemoryDetailModal memory={selectedMemory} open={memoryDetailOpen} onOpenChange={setMemoryDetailOpen} />
      <AddMemoryModal open={memoryModalOpen} onOpenChange={setMemoryModalOpen} />

      {/* ─── Share Modal ─── */}
      <Dialog open={shareModalOpen} onOpenChange={(v) => { setShareModalOpen(v); if (!v) { setCopied(false); setPreviewOpen(false); } }}>
        <DialogContent className="sm:max-w-lg max-sm:h-screen max-sm:max-h-screen max-sm:w-screen max-sm:max-w-none max-sm:rounded-none max-sm:border-none max-sm:flex max-sm:flex-col max-sm:justify-center bg-background border-border rounded-2xl p-0 gap-0 overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">Partager ce mémorial</DialogTitle>
          
          {/* Modern header — blurred photo bg + glass overlay */}
          <div className="relative w-full overflow-hidden">
            {/* Blurred background image */}
            <div className="absolute inset-0">
              <img src={portraitImg} alt="" className="w-full h-full object-cover scale-110 blur-2xl opacity-30" />
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
            </div>
            {/* Custom close button */}
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-3 right-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground shadow-md hover:bg-background hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Fermer</span>
            </button>
            
            <div className="relative flex flex-col items-center pt-7 pb-6 px-6">
              <div className="w-[68px] h-[68px] rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-md">
                <img src={portraitImg} alt="Jean-Claude Dubois" className="w-full h-full object-cover" />
              </div>
              <p className="font-serif text-foreground text-lg mt-3">Jean-Claude Dubois</p>
              <p className="text-muted-foreground text-xs tracking-widest mt-0.5">1948 — 2024</p>
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-7 space-y-5">
            <p className="text-center text-sm text-muted-foreground leading-relaxed">
              Partagez ce mémorial avec vos proches, où qu'ils soient.
            </p>

            {/* Section 1: Quick Share Actions */}
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

            {/* Section 2: Copy Link */}
            <div className="flex items-center gap-0 rounded-xl bg-card border border-border/80 overflow-hidden">
              <div className="flex items-center gap-2 px-3.5 py-2.5 flex-1 min-w-0">
                <LinkIcon size={14} className="text-muted-foreground/50 shrink-0" />
                <span className="text-sm text-muted-foreground truncate">{shareUrl}</span>
              </div>
              <button
                onClick={handleCopyLink}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-all duration-300 border-l border-border/50 ${
                  copied
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-primary hover:bg-primary/5"
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copié !" : "Copier"}
              </button>
            </div>

            {/* Section 3: Message Preview Accordion */}
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

      {/* Bottom spacer for FAB */}
      <div className="h-24" />

    </div>);

};

export default Memorial;