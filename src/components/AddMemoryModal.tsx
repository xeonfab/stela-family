import { useState, useRef, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, Mic, Video, X, Sparkles, Upload, ArrowRight, ArrowLeft, MessageSquare, Lock, Square, Play, Pause, RotateCcw, Trash2 } from "lucide-react";
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

const MAX_PHOTOS = 4;
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const AddMemoryModal = ({ open, onOpenChange, isAdmin = false }: AddMemoryModalProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  const [isIntimate, setIsIntimate] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const [aiApplied, setAiApplied] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState<"harmoniser" | "corriger" | null>(null);
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [recordState, setRecordState] = useState<"idle" | "recording" | "recorded">("idle");
  const [recordSeconds, setRecordSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "uploaded">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTimer = useCallback((sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, []);

  // Fake timer for recording state
  useEffect(() => {
    if (recordState === "recording") {
      setRecordSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recordState]);

  // Simulated upload progress
  useEffect(() => {
    if (uploadState === "uploading") {
      setUploadProgress(0);
      const duration = 2000;
      const interval = 50;
      const step = 100 / (duration / interval);
      uploadTimerRef.current = setInterval(() => {
        setUploadProgress(prev => {
          const next = prev + step;
          if (next >= 100) {
            clearInterval(uploadTimerRef.current!);
            uploadTimerRef.current = null;
            setUploadState("uploaded");
            return 100;
          }
          return next;
        });
      }, interval);
    } else {
      if (uploadTimerRef.current) {
        clearInterval(uploadTimerRef.current);
        uploadTimerRef.current = null;
      }
    }
    return () => {
      if (uploadTimerRef.current) clearInterval(uploadTimerRef.current);
    };
  }, [uploadState]);

  const processFiles = (files: File[]) => {
    setPhotoError(null);
    if (!files.length) return;

    const oversized = files.find(f => f.size > MAX_FILE_SIZE_BYTES);
    if (oversized) {
      setPhotoError(`Le fichier « ${oversized.name} » dépasse la limite de ${MAX_FILE_SIZE_MB} Mo.`);
      return;
    }

    const totalAfter = photos.length + files.length;
    if (totalAfter > MAX_PHOTOS) {
      setPhotoError(`Vous ne pouvez ajouter que ${MAX_PHOTOS} photos maximum. Il vous reste ${MAX_PHOTOS - photos.length} emplacement(s).`);
      return;
    }

    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(Array.from(e.target.files || []));
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f =>
      f.type === "image/jpeg" || f.type === "image/png"
    );
    if (files.length === 0) {
      setPhotoError("Seuls les fichiers JPG et PNG sont acceptés.");
      return;
    }
    processFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
    setPhotoError(null);
  };

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
      setIsIntimate(false);
      setOriginalText("");
      setAiApplied(false);
      setIsAiLoading(null);
      photos.forEach(p => URL.revokeObjectURL(p.preview));
      setPhotos([]);
      setPhotoError(null);
      setIsDragging(false);
      setRecordState("idle");
      setRecordSeconds(0);
      setUploadState("idle");
      setUploadProgress(0);
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

  const canProceed = (text.trim().length > 0 || (intentTab === "photos" && photos.length > 0) || (intentTab === "vocal" && recordState === "recorded") || (intentTab === "video" && uploadState === "uploaded")) && !isAiLoading;

  const handleAiAction = (action: "harmoniser" | "corriger") => {
    if (isAiLoading) return;
    setOriginalText(text);
    setIsAiLoading(action);
    setTimeout(() => {
      if (action === "harmoniser") {
        setText(
          "Je revois encore ses yeux pétillants, ce sourire discret qui illuminait la pièce. " +
          text.trim() +
          " — un souvenir qui, aujourd'hui encore, réchauffe le cœur."
        );
      } else {
        // Simulate correction
        setText(text.charAt(0).toUpperCase() + text.slice(1).replace(/  +/g, " ").trim());
      }
      setAiApplied(true);
      setIsAiLoading(null);
    }, 1800);
  };

  const handleAiReset = () => {
    setText(originalText);
    setAiApplied(false);
    setOriginalText("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="max-w-none sm:max-w-xl w-screen h-[100dvh] sm:w-[calc(100%-2rem)] sm:h-auto sm:max-h-[90vh] rounded-none sm:rounded-2xl border-0 shadow-none sm:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] p-0 gap-0 bg-white overflow-y-auto overflow-x-hidden inset-0 sm:inset-auto sm:left-[50%] sm:top-[50%] translate-x-0 translate-y-0 sm:translate-x-[-50%] sm:translate-y-[-50%]">
          <div className="flex flex-col min-h-full">
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
                                      setAiApplied(false);
                                      setOriginalText("");
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

                            {/* AI Toolbar — appears when text is not empty */}
                            <div
                              className={cn(
                                "transition-all duration-500 overflow-hidden",
                                text.length > 0 ? "opacity-100 max-h-20 mt-1" : "opacity-0 max-h-0 mt-0"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  disabled={!!isAiLoading}
                                  onClick={() => handleAiAction("harmoniser")}
                                  className={cn(
                                    "text-[13px] border rounded-full px-3.5 py-1.5 transition-all duration-200",
                                    isAiLoading === "harmoniser"
                                      ? "border-[#D4AF37]/40 bg-amber-50/50 text-[#D4AF37]"
                                      : "border-[#EAEAEA] bg-transparent text-stone-500 hover:bg-[#F5F5F4] hover:text-stone-700"
                                  )}
                                >
                                  {isAiLoading === "harmoniser" ? (
                                    <span className="animate-pulse">✨ Harmonisation...</span>
                                  ) : (
                                    "✨ Harmoniser"
                                  )}
                                </button>
                                <button
                                  type="button"
                                  disabled={!!isAiLoading}
                                  onClick={() => handleAiAction("corriger")}
                                  className={cn(
                                    "text-[13px] border rounded-full px-3.5 py-1.5 transition-all duration-200",
                                    isAiLoading === "corriger"
                                      ? "border-[#D4AF37]/40 bg-amber-50/50 text-[#D4AF37]"
                                      : "border-[#EAEAEA] bg-transparent text-stone-500 hover:bg-[#F5F5F4] hover:text-stone-700"
                                  )}
                                >
                                  {isAiLoading === "corriger" ? (
                                    <span className="animate-pulse">✨ Correction...</span>
                                  ) : (
                                    "✨ Corriger"
                                  )}
                                </button>
                                {aiApplied && !isAiLoading && (
                                  <button
                                    type="button"
                                    onClick={handleAiReset}
                                    className="text-[13px] border border-[#EAEAEA] rounded-full px-3.5 py-1.5 text-stone-400 hover:bg-[#F5F5F4] hover:text-stone-500 transition-all duration-200"
                                  >
                                    ↺ Réinitialiser
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* PHOTOS tab */}
                        {intentTab === "photos" && (
                          <div
                            className="space-y-4"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                          >
                            {/* Photo previews grid */}
                            {photos.length > 0 && (
                              <div className="grid grid-cols-2 gap-3">
                                {photos.map((photo, idx) => (
                                  <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-stone-100">
                                    <img
                                      src={photo.preview}
                                      alt={`Photo ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removePhoto(idx)}
                                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                    >
                                      <X size={14} strokeWidth={2} />
                                    </button>
                                    <span className="absolute bottom-2 left-2 text-[10px] font-medium text-white bg-black/40 px-2 py-0.5 rounded-full">
                                      {idx + 1}/{MAX_PHOTOS}
                                    </span>
                                  </div>
                                ))}
                                {/* Add more slot */}
                                {photos.length < MAX_PHOTOS && (
                                  <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className={cn(
                                      "aspect-square rounded-xl border-2 border-dashed bg-[#F9F9F9] flex flex-col items-center justify-center gap-1.5 text-stone-400 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors",
                                      isDragging ? "border-[#D4AF37] bg-[#FDFBF5] text-[#D4AF37]" : "border-stone-200"
                                    )}
                                  >
                                    <Camera size={20} strokeWidth={1.2} />
                                    <span className="text-[11px] font-medium">{isDragging ? "Déposer ici" : "Ajouter"}</span>
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Empty state / drop zone */}
                            {photos.length === 0 && (
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className={cn(
                                  "w-full border border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer",
                                  isDragging
                                    ? "border-[#D4AF37] bg-[#FDFBF5] text-[#D4AF37]"
                                    : "border-stone-200 text-[#999] bg-[#F9F9F9] hover:border-[#D4AF37]/40 hover:bg-[#FDFBF5]"
                                )}
                              >
                                <Upload size={24} strokeWidth={1.2} />
                                <span className="text-sm font-medium text-stone-500">
                                  {isDragging ? "Déposez vos photos ici" : `Ajouter jusqu'à ${MAX_PHOTOS} photos`}
                                </span>
                                <span className="text-[11px] text-[#999]">Glissez-déposez ou cliquez · JPG, PNG · {MAX_FILE_SIZE_MB} Mo max</span>
                              </button>
                            )}

                            {/* Hidden file input */}
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/jpeg,image/png"
                              multiple
                              onChange={handlePhotoSelect}
                              className="hidden"
                            />

                            {/* Error message */}
                            {photoError && (
                              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                                <span className="text-red-500 mt-0.5 shrink-0">⚠</span>
                                <p className="text-[13px] text-red-600 leading-snug">{photoError}</p>
                              </div>
                            )}

                            <Input
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              placeholder="Donnez un titre à ce souvenir (optionnel)..."
                              className={inputStyle}
                            />
                          </div>
                        )}

                        {/* VOCAL tab */}
                        {intentTab === "vocal" && (
                          <div className="space-y-4">
                            <div className="flex flex-col items-center gap-4 py-8 bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl">

                              {/* STATE: idle */}
                              {recordState === "idle" && (
                                <div className="flex flex-col items-center gap-3 animate-in fade-in duration-300">
                                  <button
                                    onClick={() => setRecordState("recording")}
                                    className="w-20 h-20 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-sm hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_-4px_rgba(212,175,55,0.4)]"
                                  >
                                    <Mic size={28} strokeWidth={1.5} className="text-white" />
                                  </button>
                                  <span className="text-xs text-[#999] font-medium">
                                    Appuyez pour commencer l'enregistrement
                                  </span>
                                </div>
                              )}

                              {/* STATE: recording */}
                              {recordState === "recording" && (
                                <div className="flex flex-col items-center gap-3 animate-in fade-in duration-300">
                                  <button
                                    onClick={() => setRecordState("recorded")}
                                    className="w-20 h-20 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-sm hover:scale-105 transition-all duration-300 animate-[audioGlow_2s_ease-in-out_infinite]"
                                  >
                                    <Square size={22} strokeWidth={1.5} className="text-white" fill="currentColor" />
                                  </button>
                                  <span className="text-lg font-mono text-foreground tracking-wider font-medium">
                                    {formatTimer(recordSeconds)}
                                  </span>
                                  <span className="text-[11px] text-[#999]">Enregistrement en cours…</span>
                                </div>
                              )}

                              {/* STATE: recorded */}
                              {recordState === "recorded" && (
                                <div className="flex flex-col items-center gap-4 w-full px-6 animate-in fade-in duration-300">
                                  {/* Mini player */}
                                  <div className="w-full flex items-center gap-3">
                                    <button className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform">
                                      <Play size={16} strokeWidth={1.5} className="text-white ml-0.5" fill="currentColor" />
                                    </button>
                                    <div className="flex-1 relative h-5 flex items-center">
                                      <div className="w-full h-[2px] bg-[#EAEAEA] rounded-full relative">
                                        <div className="absolute left-0 top-0 h-full bg-[#D4AF37] rounded-full w-0" />
                                        <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-sm left-0" />
                                      </div>
                                    </div>
                                    <span className="text-xs font-mono shrink-0 text-muted-foreground">
                                      {formatTimer(recordSeconds)}
                                    </span>
                                  </div>

                                  {/* Restart */}
                                  <button
                                    onClick={() => {
                                      setRecordState("idle");
                                      setRecordSeconds(0);
                                    }}
                                    className="flex items-center gap-1.5 text-xs text-[#999] hover:text-foreground transition-colors"
                                  >
                                    <RotateCcw size={13} strokeWidth={1.5} />
                                    Recommencer
                                  </button>
                                </div>
                              )}
                            </div>

                            <Input
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              placeholder="Donnez un titre à ce souvenir (optionnel)..."
                              className={inputStyle}
                            />
                          </div>
                        )}

                        {/* VIDEO tab */}
                        {intentTab === "video" && (
                          <div className="space-y-4">

                            {/* STATE: idle */}
                            {uploadState === "idle" && (
                              <button
                                type="button"
                                onClick={() => setUploadState("uploading")}
                                className="w-full border border-dashed border-stone-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-[#999] bg-[#F9F9F9] hover:border-[#D4AF37]/40 hover:bg-[#FDFBF5] transition-all duration-300 cursor-pointer animate-in fade-in duration-300"
                              >
                                <Video size={24} strokeWidth={1.2} />
                                <span className="text-sm font-medium text-stone-500">Ajouter une vidéo</span>
                                <span className="text-[11px] text-[#999]">MP4, MOV · 50 Mo max</span>
                              </button>
                            )}

                            {/* STATE: uploading */}
                            {uploadState === "uploading" && (
                              <div className="w-full border border-solid border-[#D4AF37]/30 rounded-xl p-8 flex flex-col items-center justify-center gap-4 bg-[#FDFBF5] animate-in fade-in duration-300">
                                <div className="w-full max-w-[240px] space-y-3">
                                  <div className="w-full h-[3px] bg-[#EAEAEA] rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-[#D4AF37] rounded-full transition-all duration-100 ease-linear"
                                      style={{ width: `${uploadProgress}%` }}
                                    />
                                  </div>
                                  <p className="text-xs text-muted-foreground text-center">
                                    Chargement de la vidéo en cours… ({Math.round(uploadProgress)}%)
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* STATE: uploaded */}
                            {uploadState === "uploaded" && (
                              <div className="w-full rounded-xl overflow-hidden relative animate-in fade-in duration-300">
                                {/* Video thumbnail placeholder */}
                                <div className="w-full aspect-video bg-stone-700 rounded-xl flex items-center justify-center relative">
                                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Play size={20} strokeWidth={1.5} className="text-white ml-0.5" fill="currentColor" />
                                  </div>
                                  <span className="absolute bottom-2 right-3 text-[10px] text-white/70 font-mono">00:15</span>
                                  {/* Delete / replace button */}
                                  <button
                                    onClick={() => {
                                      setUploadState("idle");
                                      setUploadProgress(0);
                                    }}
                                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-colors"
                                  >
                                    <Trash2 size={13} strokeWidth={1.5} />
                                  </button>
                                </div>
                              </div>
                            )}

                            <Input
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              placeholder="Donnez un titre à ce souvenir (optionnel)..."
                              className={inputStyle}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-medium text-[#999] uppercase tracking-[0.12em]">
                        Email (optionnel)
                      </label>
                      <Input
                        type="email"
                        placeholder="jean.dupont@email.com"
                        className={inputStyle}
                      />
                      <p className="text-[10px] text-stone-400 mt-1">Restez informé des hommages déposés</p>
                    </div>
                  </div>

                   {/* Intimate toggle */}
                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2.5">
                      <Lock size={15} strokeWidth={1.5} className="text-stone-400" />
                      <span className="text-sm text-stone-500">
                        Rendre ce souvenir intime
                        <span className="block text-[11px] text-stone-300 mt-0.5">Visible uniquement par la famille</span>
                      </span>
                    </div>
                    <Switch
                      checked={isIntimate}
                      onCheckedChange={setIsIntimate}
                      className="data-[state=checked]:bg-[#D4AF37]"
                    />
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

                  {isAdmin && (
                    <p className="text-[11px] text-[#757575] text-center leading-relaxed pt-2">
                      Ce souvenir sera publié directement sur le sanctuaire.
                    </p>
                  )}
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
