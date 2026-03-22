import { Lock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { LockedVideo } from "./LockedVideoCard";

interface LockedVideoModalProps {
  video: LockedVideo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isGarant: boolean;
}

const LockedVideoModal = ({
  video,
  open,
  onOpenChange,
  isGarant,
}: LockedVideoModalProps) => {
  if (!video) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => onOpenChange(false)}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/50 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Blurred media area */}
            <div className="relative aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover blur-md scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2.5">
                <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center">
                  <Lock size={24} className="text-white/90" />
                </div>
                <span className="text-white/70 text-xs tracking-wide">
                  Souvenir en attente
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-serif text-lg text-stone-900">
                  {video.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  — {video.author}
                </p>
              </div>

              {isGarant ? (
                <>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    Ce témoignage est en sécurité. La capacité initiale de ce
                    sanctuaire étant atteinte, l'Extension Héritage est requise
                    pour le visionner.
                  </p>
                  <button className="w-full bg-black text-white text-sm font-medium py-3.5 rounded-full hover:bg-stone-800 transition-colors">
                    Débloquer l'Extension (49&nbsp;€)
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-stone-400 leading-relaxed text-center">
                    Ce souvenir est précieusement conservé. La famille a été
                    invitée à débloquer l'espace nécessaire pour son visionnage.
                  </p>
                  <button
                    onClick={() => onOpenChange(false)}
                    className="w-full border border-stone-300 text-stone-600 text-sm font-medium py-3 rounded-full hover:bg-stone-50 transition-colors"
                  >
                    Fermer
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LockedVideoModal;
