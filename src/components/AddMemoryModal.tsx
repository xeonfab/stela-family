import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, Mic, Video, CalendarDays, X, Sparkles, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AddMemoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type MediaType = "photo" | "audio" | "video" | null;

const AddMemoryModal = ({ open, onOpenChange }: AddMemoryModalProps) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaType>(null);

  const handleClose = (val: boolean) => {
    if (!val) {
      setText("");
      setTitle("");
      setDate("");
      setSelectedMedia(null);
    }
    onOpenChange(val);
  };

  const mediaOptions: { type: MediaType; icon: typeof Camera; label: string }[] = [
    { type: "photo", icon: Camera, label: "Photos" },
    { type: "audio", icon: Mic, label: "Vocal" },
    { type: "video", icon: Video, label: "Vidéo" },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="sm:max-w-xl w-[calc(100%-2rem)] rounded-2xl border-0 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] p-0 gap-0 bg-white overflow-hidden">
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
            {/* AI Assistant trigger */}
            <div className="flex justify-end">
              <button className="flex items-center gap-1.5 text-[11px] text-stone-400 hover:text-amber-600 transition-colors font-medium tracking-wide group">
                <Sparkles size={13} strokeWidth={1.5} className="group-hover:text-amber-500 transition-colors" />
                Trouver les mots...
              </button>
            </div>

            {/* Auto-expanding textarea */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Une anecdote, un éclat de rire, ce qui vous manque le plus..."
              rows={4}
              className="w-full resize-none bg-stone-50/60 rounded-2xl px-5 py-4 text-[0.94rem] text-stone-700 leading-relaxed placeholder:text-stone-300 focus:outline-none focus:bg-stone-50 transition-colors border-0 ring-0 focus:ring-0 min-h-[120px]"
              style={{ fieldSizing: "content" } as React.CSSProperties}
            />

            {/* Media type selector — mutually exclusive pills */}
            <div className="flex items-center gap-2">
              {mediaOptions.map(({ type, icon: Icon, label }) => {
                const active = selectedMedia === type;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedMedia(active ? null : type)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                      active
                        ? "border-amber-400/60 bg-amber-50 text-amber-700"
                        : "border-stone-150 bg-white text-stone-400 hover:border-stone-200 hover:text-stone-500"
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
              <div className="border border-dashed border-stone-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-stone-300 bg-stone-50/30">
                <Upload size={20} strokeWidth={1.5} />
                <span className="text-xs font-medium">Ajouter jusqu'à 4 photos</span>
              </div>
            )}
            {selectedMedia === "audio" && (
              <div className="flex flex-col items-center gap-3 py-4">
                <button className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 hover:scale-105 transition-transform">
                  <Mic size={22} strokeWidth={1.5} className="text-white" />
                </button>
                <span className="text-xs text-stone-400 font-medium">Appuyez pour parler</span>
              </div>
            )}
            {selectedMedia === "video" && (
              <div className="border border-dashed border-stone-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-stone-300 bg-stone-50/30">
                <Video size={20} strokeWidth={1.5} />
                <span className="text-xs font-medium">Ajouter une vidéo</span>
              </div>
            )}

            {/* Separator */}
            <div className="h-px bg-stone-100" />

            {/* Timeline metadata fields */}
            <div className="space-y-3">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre (ex: L'été 1998...)"
                className="border-0 border-b border-stone-100 rounded-none bg-transparent text-sm text-stone-600 placeholder:text-stone-300 focus-visible:ring-0 focus-visible:border-stone-300 h-11 px-1"
              />
              <div className="relative">
                <CalendarDays size={15} className="absolute left-1 top-1/2 -translate-y-1/2 text-stone-300" />
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Date de ce souvenir"
                  className="border-0 border-b border-stone-100 rounded-none bg-transparent text-sm text-stone-600 placeholder:text-stone-300 focus-visible:ring-0 focus-visible:border-stone-300 h-11 pl-7 pr-1"
                />
              </div>
            </div>

            {/* Submit */}
            <button className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-white font-medium text-sm hover:bg-[#C4A030] transition-colors shadow-md shadow-[#D4AF37]/20 tracking-wide">
              Déposer dans le sanctuaire
            </button>

            <p className="text-[11px] text-stone-300 text-center leading-relaxed">
              Votre souvenir sera soumis à l'approbation de la famille.
            </p>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AddMemoryModal;
