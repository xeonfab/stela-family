import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, Mic, Video, X, Sparkles, Upload, ArrowRight, ArrowLeft, MessageSquare } from "lucide-react";
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

type IntentTab = "pensee" | "photos" | "vocal" | "video";
type ModalView = "canvas" | "maieutic" | "loading";
type Step = 1 | 2;

const DUMMY_AI_TEXT =
  "Je revois encore ses lunettes glissant sur le bout de son nez, dans la lumière de 6h du matin, une tasse de café noir à la main. C'est dans ces instants calmes qu'il aimait nous rappeler qu'on 'a le temps de se presser'. Ce temps, aujourd'hui, est devenu notre plus précieux héritage.";

const AddMemoryModal = ({ open, onOpenChange, isAdmin = false }: AddMemoryModalProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [intentTab, setIntentTab] = useState<IntentTab>("pensee");
  const [view, setView] = useState<ModalView>("canvas");
  const [maieutic1, setMaieutic1] = useState("");
  const [maieutic2, setMaieutic2] = useState("");
  const [maieutic3, setMaieutic3] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorRelation, setAuthorRelation] = useState("");
  const [pinToTimeline, setPinToTimeline] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterDate, setChapterDate] = useState<Date | undefined>(undefined);
  const [step, setStep] = useState<Step>(1);

  const handleClose = (val: boolean) => {
    if (!val) {
      setText("");
      setIntentTab("pensee");
      setView("canvas");
      setMaieutic1("");
      setMaieutic2("");
      setMaieutic3("");
      setAuthorName("");
      setAuthorRelation("");
      setPinToTimeline(false);
      setChapterTitle("");
      setChapterDate(undefined);
      setStep(1);
    }
    onOpenChange(val);
  };

  const handleTisser = () => {
    setView("loading");
    setTimeout(() => {
      setText(DUMMY_AI_TEXT);
      setIntentTab("pensee");
      setView("canvas");
    }, 2500);
  };

  const intentTabs: { key: IntentTab; icon: typeof MessageSquare; label: string }[] = [
    { key: "pensee", icon: MessageSquare, label: "Pensée" },
    { key: "photos", icon: Camera, label: "Photos" },
    { key: "vocal", icon: Mic, label: "Vocal" },
    { key: "video", icon: Video, label: "Vidéo" },
  ];

  const inputStyle = "border border-[#EAEAEA] rounded-lg bg-[#F9F9F9] text-sm text-stone-700 placeholder:text-[#757575] focus-visible:ring-1 focus-visible:ring-[#D4AF37]/40 focus-visible:border-[#D4AF37]/50 h-11 px-3";

  const canProceed = text.trim().length > 0 || intentTab !== "pensee";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="max-w-none sm:max-w-xl w-screen h-[100dvh] sm:w-[calc(100%-2rem)] sm:h-auto sm:max-h-[90vh] rounded-none sm:rounded-2xl border-0 shadow-none sm:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] p-0 gap-0 bg-white overflow-hidden inset-0 sm:inset-auto sm:left-[50%] sm:top-[50%] translate-x-0 translate-y-0 sm:translate-x-[-50%] sm:translate-y-[-50%]">
          <div className="h-full overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-8 pt-8 pb-2">
              <button
                onClick={() => handleClose(false)}
                className="absolute right-5 top-5 p-1.5 rounded-full text-stone-300 hover:text-stone-500 hover:bg-stone-50 transition-colors z-10"
              >
                <X size={18} strokeWidth={1.5} />
              </button>

              {/* Step indicators */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  step === 1 ? "bg-[#D4AF37] scale-110" : "bg-stone-200"
                )} />
                <span className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  step === 2 ? "bg-[#D4AF37] scale-110" : "bg-stone-200"
                )} />
              </div>

              <DialogTitle className="font-serif text-2xl md:text-[1.7rem] text-stone-800 text-center tracking-tight">
                {step === 1 ? "Partagez un souvenir avec Jean-Claude" : "Signez votre hommage"}
              </DialogTitle>
            </div>

            {/* Content area */}
            <div className="flex-1 px-8 pt-4 pb-6">

              {/* === STEP 1: L'ÉMOTION === */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-300">

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
                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#D4AF37] bg-[#FAFAFA] text-[#D4AF37] font-medium text-sm hover:bg-[#D4AF37] hover:text-white transition-all duration-500"
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

                      {/* Segmented Control */}
                      <div className="flex items-center rounded-xl bg-[#F5F5F4] p-1 gap-0.5">
                        {intentTabs.map(({ key, icon: Icon, label }) => {
                          const active = intentTab === key;
                          return (
                            <button
                              key={key}
                              onClick={() => setIntentTab(key)}
                              className={cn(
                                "flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200",
                                active
                                  ? "bg-white text-stone-700 shadow-sm"
                                  : "text-[#999] hover:text-stone-500"
                              )}
                            >
                              <Icon size={14} strokeWidth={1.5} />
                              {label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Conditional content per tab */}
                      <div className="animate-in fade-in duration-200">

                        {/* PENSÉE tab */}
                        {intentTab === "pensee" && (
                          <div className="space-y-3">
                            <textarea
                              ref={textareaRef}
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              placeholder="Une anecdote, un éclat de rire, ce qui vous manque le plus..."
                              rows={8}
                              className="w-full resize-none bg-[#F9F9F9] border border-[#EAEAEA] rounded-2xl px-5 py-5 text-[1rem] text-stone-700 placeholder:text-[#757575] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all ring-0 min-h-[260px]"
                              style={{ lineHeight: 1.7, fieldSizing: "content" } as React.CSSProperties}
                            />

                            {/* Inspiration chips — disappear when text is not empty */}
                            <div
                              className={cn(
                                "transition-all duration-500 overflow-hidden",
                                text.length > 0 ? "opacity-0 max-h-0 mt-0" : "opacity-100 max-h-40"
                              )}
                            >
                              <p className="text-[11px] text-stone-400 tracking-wide mb-2">Besoin d'inspiration ?</p>
                              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                                {[
                                  { label: "✨ Raconter une anecdote", prompt: "Je me souviendrai toujours de la fois où " },
                                  { label: "✨ Un trait de caractère", prompt: "Ce que j'aimais le plus chez toi, c'était " },
                                  { label: "✨ Un simple mot", prompt: "Tu vas me manquer profondément " },
                                ].map((chip) => (
                                  <button
                                    key={chip.label}
                                    type="button"
                                    onClick={() => {
                                      setText(chip.prompt);
                                      setTimeout(() => {
                                        if (textareaRef.current) {
                                          textareaRef.current.focus();
                                          textareaRef.current.selectionStart = chip.prompt.length;
                                          textareaRef.current.selectionEnd = chip.prompt.length;
                                        }
                                      }, 50);
                                    }}
                                    className="whitespace-nowrap shrink-0 text-[12px] text-stone-500 border border-[#EAEAEA] rounded-full px-3.5 py-1.5 hover:bg-[#F5F5F4] hover:text-stone-700 transition-colors bg-white"
                                  >
                                    {chip.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* PHOTOS tab */}
                        {intentTab === "photos" && (
                          <div className="space-y-4">
                            <div className="border border-dashed border-stone-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-[#999] bg-[#F9F9F9]">
                              <Camera size={24} strokeWidth={1.2} />
                              <span className="text-sm font-medium text-stone-500">Ajouter jusqu'à 4 photos</span>
                              <span className="text-[11px] text-[#999]">JPG, PNG · 10 Mo max par fichier</span>
                            </div>
                            <textarea
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              placeholder="Ajouter une légende ou une pensée (optionnel)..."
                              rows={2}
                              className="w-full resize-none bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl px-4 py-3 text-sm text-stone-700 leading-relaxed placeholder:text-[#757575] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all ring-0"
                            />
                          </div>
                        )}

                        {/* VOCAL tab */}
                        {intentTab === "vocal" && (
                          <div className="space-y-4">
                            <div className="flex flex-col items-center gap-3 py-6 bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl">
                              <button className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
                                <Mic size={24} strokeWidth={1.5} className="text-white" />
                              </button>
                              <span className="text-xs text-[#999] font-medium">Appuyez pour enregistrer un message vocal</span>
                            </div>
                            <textarea
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              placeholder="Ajouter une légende ou une pensée (optionnel)..."
                              rows={2}
                              className="w-full resize-none bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl px-4 py-3 text-sm text-stone-700 leading-relaxed placeholder:text-[#757575] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all ring-0"
                            />
                          </div>
                        )}

                        {/* VIDEO tab */}
                        {intentTab === "video" && (
                          <div className="space-y-4">
                            <div className="border border-dashed border-stone-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-[#999] bg-[#F9F9F9]">
                              <Video size={24} strokeWidth={1.2} />
                              <span className="text-sm font-medium text-stone-500">Ajouter une vidéo</span>
                              <span className="text-[11px] text-[#999]">MP4, MOV · 50 Mo max</span>
                            </div>
                            <textarea
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              placeholder="Ajouter une légende ou une pensée (optionnel)..."
                              rows={2}
                              className="w-full resize-none bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl px-4 py-3 text-sm text-stone-700 leading-relaxed placeholder:text-[#757575] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all ring-0"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* === STEP 2: L'IDENTITÉ === */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6 flex flex-col justify-center min-h-[280px]">

                  {/* Signature fields */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-medium text-[#999] uppercase tracking-[0.12em]">
                        Votre prénom et nom *
                      </label>
                      <Input
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Jean Dupont"
                        className={inputStyle}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-medium text-[#999] uppercase tracking-[0.12em]">
                        Votre lien (optionnel)
                      </label>
                      <Input
                        value={authorRelation}
                        onChange={(e) => setAuthorRelation(e.target.value)}
                        placeholder="Ex : petit-fils, collègue, ami d'enfance..."
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-px bg-stone-100 mt-2" />

                  {/* Pin to Timeline Toggle */}
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

                  <p className="text-[11px] text-[#757575] text-center leading-relaxed pt-2">
                    {isAdmin
                      ? "Ce souvenir sera publié directement sur le sanctuaire."
                      : "Votre souvenir sera soumis à l'approbation de la famille."}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-stone-100 px-8 py-4">
              {step === 1 ? (
                <div className="flex justify-end">
                  <button
                    disabled={!canProceed}
                    onClick={() => setStep(2)}
                    className={cn(
                      "btn-gold-jewel flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm tracking-[0.05em] transition-all",
                      !canProceed && "opacity-40 cursor-not-allowed"
                    )}
                  >
                    Suivant
                    <ArrowRight size={15} strokeWidth={1.5} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 text-sm text-[#757575] hover:text-stone-600 font-medium transition-colors"
                  >
                    <ArrowLeft size={15} strokeWidth={1.5} />
                    Retour
                  </button>
                  <button className="btn-gold-jewel flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm tracking-[0.05em]">
                    Déposer le souvenir
                  </button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AddMemoryModal;
