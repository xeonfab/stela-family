import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pen, Camera, Mic, Video, ImageIcon, CalendarDays, ArrowLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const memoryTypes = [
  { id: "text", icon: Pen, label: "Un mot" },
  { id: "photo", icon: Camera, label: "Une photo" },
  { id: "audio", icon: Mic, label: "Un vocal" },
  { id: "video", icon: Video, label: "Une vidéo" },
] as const;

interface AddMemoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddMemoryModal = ({ open, onOpenChange }: AddMemoryModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);

  const handleClose = (val: boolean) => {
    if (!val) setStep(1);
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/40 backdrop-blur-sm" />
        <DialogContent className="sm:max-w-lg w-[calc(100%-2rem)] rounded-3xl border-0 shadow-2xl p-0 gap-0 bg-white">
          {step === 1 ? (
            /* ─── Step 1: Choice Grid ─── */
            <div className="p-8 md:p-10">
              <DialogTitle className="font-serif text-2xl md:text-3xl text-stone-900 text-center mb-8">
                Que souhaitez-vous partager&nbsp;?
              </DialogTitle>

              <div className="grid grid-cols-2 gap-4">
                {memoryTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => type.id === "photo" ? setStep(2) : undefined}
                      className="group flex flex-col items-center justify-center gap-3 aspect-square rounded-2xl border border-stone-200 bg-stone-50/50 transition-all duration-200 hover:border-amber-600 hover:bg-amber-50/30 hover:shadow-sm"
                    >
                      <Icon
                        size={28}
                        className="text-amber-600/70 group-hover:text-amber-600 transition-colors"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm font-medium text-stone-600 group-hover:text-stone-800 transition-colors">
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ─── Step 2: Photo Context Form ─── */
            <div className="p-8 md:p-10">
              {/* Back button */}
              <button
                onClick={() => setStep(1)}
                className="absolute left-5 top-5 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors z-10"
              >
                <ArrowLeft size={18} />
              </button>

              <DialogTitle className="font-serif text-xl text-stone-900 text-center mb-6">
                Partager une photo
              </DialogTitle>

              {/* Photo placeholder */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-stone-100 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center gap-3 mb-6">
                <ImageIcon size={36} className="text-stone-300" strokeWidth={1.5} />
                <span className="text-xs text-stone-400">Photo sélectionnée</span>
              </div>

              {/* Message */}
              <Textarea
                placeholder="Ajouter un petit mot avec cette photo..."
                className="resize-none rounded-xl border-stone-200 bg-stone-50/50 focus:border-amber-600 focus:ring-amber-600/20 text-sm min-h-[90px] mb-4"
              />

              {/* Year input */}
              <div className="relative mb-6">
                <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <Input
                  placeholder="Année du souvenir (Optionnel)"
                  className="pl-10 rounded-xl border-stone-200 bg-stone-50/50 focus:border-amber-600 focus:ring-amber-600/20 text-sm"
                />
              </div>

              {/* Submit */}
              <button className="w-full py-3.5 rounded-xl bg-amber-600 text-white font-medium text-sm hover:bg-amber-700 transition-colors shadow-md shadow-amber-600/20">
                Confirmer et partager
              </button>

              <p className="text-xs text-stone-400 text-center mt-3 leading-relaxed">
                Votre souvenir sera soumis à l'approbation de la famille.
              </p>
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AddMemoryModal;
