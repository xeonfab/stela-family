import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, Mic, Video, CalendarDays, X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AddMemoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddMemoryModal = ({ open, onOpenChange }: AddMemoryModalProps) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [attachedMedia, setAttachedMedia] = useState<string[]>([]);

  const handleClose = (val: boolean) => {
    if (!val) {
      setText("");
      setTitle("");
      setDate("");
      setAttachedMedia([]);
    }
    onOpenChange(val);
  };

  const simulateAttach = (type: string) => {
    setAttachedMedia((prev) => [...prev, type]);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="sm:max-w-xl w-[calc(100%-2rem)] rounded-3xl border-0 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] p-0 gap-0 bg-white/95 backdrop-blur-xl overflow-hidden">
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
            {/* Auto-expanding textarea */}
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Une anecdote, un souvenir marquant, ce qui vous manque le plus..."
                rows={4}
                className="w-full resize-none bg-stone-50/60 rounded-2xl px-5 py-4 text-[0.94rem] text-stone-700 leading-relaxed placeholder:text-stone-300 focus:outline-none focus:bg-stone-50 transition-colors border-0 ring-0 focus:ring-0 min-h-[120px]"
                style={{ fieldSizing: "content" } as React.CSSProperties}
              />
            </div>

            {/* Attached media thumbnails */}
            {attachedMedia.length > 0 && (
              <div className="flex gap-2.5 flex-wrap">
                {attachedMedia.map((type, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-xl bg-stone-100 border border-stone-150 flex items-center justify-center text-stone-400"
                  >
                    {type === "photo" && <Camera size={18} strokeWidth={1.5} />}
                    {type === "audio" && <Mic size={18} strokeWidth={1.5} />}
                    {type === "video" && <Video size={18} strokeWidth={1.5} />}
                  </div>
                ))}
              </div>
            )}

            {/* Media attachment bar */}
            <div className="flex items-center gap-1 py-1">
              <button
                onClick={() => simulateAttach("photo")}
                className="group flex items-center gap-1.5 px-3 py-2 rounded-xl text-stone-400 hover:text-amber-600 hover:bg-amber-50/50 transition-all text-xs font-medium"
              >
                <Camera size={16} strokeWidth={1.5} />
                <span className="hidden sm:inline">Photos</span>
                <Plus size={12} strokeWidth={2} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => simulateAttach("audio")}
                className="group flex items-center gap-1.5 px-3 py-2 rounded-xl text-stone-400 hover:text-amber-600 hover:bg-amber-50/50 transition-all text-xs font-medium"
              >
                <Mic size={16} strokeWidth={1.5} />
                <span className="hidden sm:inline">Vocal</span>
              </button>
              <button
                onClick={() => simulateAttach("video")}
                className="group flex items-center gap-1.5 px-3 py-2 rounded-xl text-stone-400 hover:text-amber-600 hover:bg-amber-50/50 transition-all text-xs font-medium"
              >
                <Video size={16} strokeWidth={1.5} />
                <span className="hidden sm:inline">Vidéo</span>
              </button>
            </div>

            {/* Separator */}
            <div className="h-px bg-stone-100" />

            {/* Timeline metadata fields */}
            <div className="space-y-3">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre du souvenir (optionnel) — ex: L'été à Dinard..."
                className="border-0 bg-stone-50/50 rounded-xl text-sm text-stone-600 placeholder:text-stone-300 focus-visible:ring-0 focus-visible:bg-stone-50 h-11 px-4"
              />
              <div className="relative">
                <CalendarDays size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" />
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Date ou année du souvenir (optionnel)"
                  className="border-0 bg-stone-50/50 rounded-xl text-sm text-stone-600 placeholder:text-stone-300 focus-visible:ring-0 focus-visible:bg-stone-50 h-11 pl-10 pr-4"
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
