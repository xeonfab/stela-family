import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, Mic, Video, X, Sparkles, Upload, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface AddMemoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAdmin?: boolean;
}

type MediaType = "photo" | "audio" | "video" | null;
type ModalView = "canvas" | "maieutic" | "loading";

const DUMMY_AI_TEXT =
  "Je revois encore ses lunettes glissant sur le bout de son nez, dans la lumière de 6h du matin, une tasse de café noir à la main. C'est dans ces instants calmes qu'il aimait nous rappeler qu'on 'a le temps de se presser'. Ce temps, aujourd'hui, est devenu notre plus précieux héritage.";

const AddMemoryModal = ({ open, onOpenChange, isAdmin = false }: AddMemoryModalProps) => {
  const [text, setText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaType>(null);
  const [view, setView] = useState<ModalView>("canvas");
  const [maieutic1, setMaieutic1] = useState("");
  const [maieutic2, setMaieutic2] = useState("");
  const [maieutic3, setMaieutic3] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorRelation, setAuthorRelation] = useState("");
  const [pinToTimeline, setPinToTimeline] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterDate, setChapterDate] = useState<Date | undefined>(undefined);

  const handleClose = (val: boolean) => {
    if (!val) {
      setText("");
      setSelectedMedia(null);
      setView("canvas");
      setMaieutic1("");
      setMaieutic2("");
      setMaieutic3("");
      setAuthorName("");
      setAuthorRelation("");
      setPinToTimeline(false);
      setChapterTitle("");
      setChapterDate(undefined);
    }
    onOpenChange(val);
  };

  const handleTisser = () => {
    setView("loading");
    setTimeout(() => {
      setText(DUMMY_AI_TEXT);
      setView("canvas");
    }, 2500);
  };

  const mediaOptions: { type: MediaType; icon: typeof Camera; label: string }[] = [
    { type: "photo", icon: Camera, label: "Photos" },
    { type: "audio", icon: Mic, label: "Vocal" },
    { type: "video", icon: Video, label: "Vidéo" },
  ];

  const inputStyle = "border border-[#EAEAEA] rounded-lg bg-[#F9F9F9] text-sm text-stone-700 placeholder:text-[#757575] focus-visible:ring-1 focus-visible:ring-[#D4AF37]/40 focus-visible:border-[#D4AF37]/50 h-11 px-3";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="sm:max-w-xl w-[calc(100%-2rem)] rounded-2xl border-0 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] p-0 gap-0 bg-white overflow-hidden max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="relative px-8 pt-8 pb-2">
            <button
              onClick={() => handleClose(false)}
              className="absolute right-5 top-5 p-1.5 rounded-full text-stone-300 hover:text-stone-500 hover:bg-stone-50 transition-colors"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
            <DialogTitle className="font-serif text-2xl md:text-[1.7rem] text-stone-800 text-center tracking-tight">
              Racontez-nous un instant
            </DialogTitle>
          </div>

          {/* Canvas */}
          <div className="px-8 pt-4 pb-6 space-y-5">

            {/* === LOADING VIEW === */}
            {view === "loading" && (
              <div className="flex flex-col items-center justify-center py-16 gap-4 animate-in fade-in duration-300">
                <Sparkles size={28} strokeWidth={1.5} className="text-[#D4AF37] animate-pulse" />
                <p className="text-sm text-[#757575] font-serif italic tracking-wide">
                  La plume rassemble vos souvenirs...
                </p>
              </div>
            )}

            {/* === MAIEUTIC FORM VIEW === */}
            {view === "maieutic" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-5">
                <div className="rounded-xl border border-[#D4AF37]/20 bg-amber-50/30 p-5 space-y-4">
                  {[
                    { n: "1", label: "Le détail inoubliable", placeholder: "Un objet, un vêtement, une manie...", value: maieutic1, set: setMaieutic1 },
                    { n: "2", label: "L'empreinte sensorielle", placeholder: "Un lieu, une odeur, une musique...", value: maieutic2, set: setMaieutic2 },
                    { n: "3", label: "Son plus bel héritage", placeholder: "Une phrase qu'il répétait souvent...", value: maieutic3, set: setMaieutic3 },
                  ].map((f) => (
                    <div key={f.n} className="space-y-1.5">
                      <label className="text-xs font-serif text-[#757575] tracking-wide">
                        {f.n}. {f.label}
                      </label>
                      <Input
                        value={f.value}
                        onChange={(e) => f.set(e.target.value)}
                        placeholder={f.placeholder}
                        className="border-0 border-b border-stone-200 rounded-none bg-transparent text-sm text-stone-700 placeholder:text-[#757575] focus-visible:ring-0 focus-visible:border-[#D4AF37]/50 h-10 px-1"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setView("canvas")}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#757575] hover:text-stone-600 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleTisser}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#D4AF37]/40 text-[#D4AF37] font-medium text-sm hover:bg-amber-50 transition-colors"
                  >
                    <Sparkles size={14} strokeWidth={1.5} />
                    Tisser ce souvenir
                  </button>
                </div>
              </div>
            )}

            {/* === DEFAULT CANVAS VIEW === */}
            {view === "canvas" && (
              <div className="animate-in fade-in duration-300 space-y-5">

                {/* Textarea with embedded AI button */}
                <div className="relative">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Une anecdote, un éclat de rire, ce qui vous manque le plus..."
                    rows={4}
                    className="w-full resize-none bg-[#F9F9F9] border border-[#EAEAEA] rounded-2xl px-5 py-4 pb-10 text-[0.94rem] text-stone-700 leading-relaxed placeholder:text-[#757575] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all ring-0 min-h-[130px]"
                    style={{ fieldSizing: "content" } as React.CSSProperties}
                  />
                  {/* AI button inside textarea */}
                  <button
                    onClick={() => setView("maieutic")}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] text-[#757575] hover:text-[#D4AF37] transition-colors font-medium tracking-wide group bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-1 border border-[#EAEAEA] hover:border-[#D4AF37]/40"
                  >
                    <Sparkles size={12} strokeWidth={1.5} className="group-hover:text-[#D4AF37] transition-colors" />
                    Trouver les mots...
                  </button>
                </div>

                {/* Media toolbar */}
                <div className="flex items-center gap-0 rounded-xl border border-[#EAEAEA] bg-[#F9F9F9] p-1 w-fit">
                  {mediaOptions.map(({ type, icon: Icon, label }) => {
                    const active = selectedMedia === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedMedia(active ? null : type)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                          active
                            ? "bg-white border border-[#D4AF37]/30 text-[#D4AF37] shadow-sm"
                            : "text-[#757575] hover:text-stone-600"
                        }`}
                      >
                        <Icon size={14} strokeWidth={1.5} />
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Contextual media area */}
                {selectedMedia === "photo" && (
                  <div className="border border-dashed border-stone-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-[#757575] bg-[#F9F9F9]">
                    <Upload size={20} strokeWidth={1.5} />
                    <span className="text-xs font-medium">Ajouter jusqu'à 4 photos</span>
                  </div>
                )}
                {selectedMedia === "audio" && (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <button className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 hover:scale-105 transition-transform">
                      <Mic size={22} strokeWidth={1.5} className="text-white" />
                    </button>
                    <span className="text-xs text-[#757575] font-medium">Appuyez pour parler</span>
                  </div>
                )}
                {selectedMedia === "video" && (
                  <div className="border border-dashed border-stone-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-[#757575] bg-[#F9F9F9]">
                    <Video size={20} strokeWidth={1.5} />
                    <span className="text-xs font-medium">Ajouter une vidéo</span>
                  </div>
                )}

                {/* ─── Signature ─── */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-[#757575] tracking-wide">Votre signature</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Votre prénom et nom *"
                      className={inputStyle}
                    />
                    <Input
                      value={authorRelation}
                      onChange={(e) => setAuthorRelation(e.target.value)}
                      placeholder="Votre lien (ex: petit-fils, collègue...)"
                      className={inputStyle}
                    />
                  </div>
                </div>

                {/* Separator */}
                <div className="h-px bg-stone-100" />

                {/* ─── Pin to Timeline Toggle ─── */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">📌</span>
                      <span className="text-sm text-stone-600 font-medium">
                        Épingler ce souvenir dans la frise « Son histoire »
                      </span>
                    </div>
                    <Switch
                      checked={pinToTimeline}
                      onCheckedChange={setPinToTimeline}
                      className="data-[state=checked]:bg-[#D4AF37]"
                    />
                  </div>

                  {pinToTimeline && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 rounded-xl border border-[#D4AF37]/20 bg-amber-50/20 p-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#757575] tracking-wide">
                          Titre de l'événement *
                        </label>
                        <Input
                          value={chapterTitle}
                          onChange={(e) => setChapterTitle(e.target.value)}
                          placeholder="Ex: L'été 1998..."
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#757575] tracking-wide">
                          Date de l'événement *
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              className={cn(
                                inputStyle,
                                "w-full flex items-center text-left",
                                !chapterDate && "text-[#757575]"
                              )}
                            >
                              {chapterDate
                                ? format(chapterDate, "d MMMM yyyy", { locale: fr })
                                : "Sélectionner une date"}
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 z-[100]" align="start">
                            <Calendar
                              mode="single"
                              selected={chapterDate}
                              onSelect={setChapterDate}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-white font-medium text-sm hover:bg-[#C4A030] transition-colors shadow-md shadow-[#D4AF37]/20 tracking-wide">
                  Déposer dans l'espace de recueillement
                </button>

                <p className="text-[11px] text-[#757575] text-center leading-relaxed">
                  {isAdmin
                    ? "Ce souvenir sera publié directement sur le sanctuaire."
                    : "Votre souvenir sera soumis à l'approbation de la famille."}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AddMemoryModal;
