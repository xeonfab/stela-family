import { useState } from "react";
import { X, TreePine, Smartphone, Home } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type WoodType = "frene" | "noyer";

interface Props {
  open: boolean;
  onClose: () => void;
}

const woods: Record<WoodType, { label: string; subtitle: string; price: number; bg: string }> = {
  frene: {
    label: "Frêne massif",
    subtitle: "Clair, intemporel.",
    price: 119,
    bg: "from-[#E8E0D4] to-[#D5CCC0]",
  },
  noyer: {
    label: "Noyer massif",
    subtitle: "Profond, premium.",
    price: 149,
    bg: "from-[#8B7355] to-[#6B5B45]",
  },
};

const features = [
  { icon: TreePine, text: "Artisanat d'exception." },
  { icon: Smartphone, text: "Connectée au mémorial." },
  { icon: Home, text: "Discrétion absolue." },
];

const PersonalEditionSheet = ({ open, onClose }: Props) => {
  const [selectedWood, setSelectedWood] = useState<WoodType>("frene");
  const current = woods[selectedWood];

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-lg max-sm:h-screen max-sm:max-h-screen max-sm:w-screen max-sm:max-w-none max-sm:rounded-none max-sm:border-none bg-[#FAFAFA] border-border rounded-2xl p-0 gap-0 overflow-hidden [&>button]:hidden">
        <DialogTitle className="sr-only">L'Édition Personnelle</DialogTitle>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-1.5 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
        >
          <X size={18} className="text-foreground/50" />
        </button>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto max-sm:pb-24 sm:pb-24">
          {/* Hero image placeholder */}
          <div className={`mx-4 mt-4 rounded-2xl aspect-video bg-gradient-to-br ${current.bg} flex items-center justify-center transition-all duration-500`}>
            <p className="text-foreground/25 text-xs tracking-widest uppercase">
              {current.label}
            </p>
          </div>

          {/* Content */}
          <div className="px-6 pt-6 space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif-display text-2xl text-foreground tracking-tight">
                L'Édition Personnelle
              </h2>
              <p className="text-sm text-muted-foreground">
                Un sanctuaire intime, au cœur de votre foyer.
              </p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              La réplique exacte de la stèle d'hommage : une pièce de bois massif
              façonnée à la main, connectée à ce mémorial.
            </p>

            {/* Wood selector */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground/70">
                Essence de bois
              </p>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(woods) as WoodType[]).map((key) => {
                  const wood = woods[key];
                  const isSelected = selectedWood === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedWood(key)}
                      className={`relative rounded-xl p-4 text-left transition-all duration-300 border ${
                        isSelected
                          ? "border-foreground/30 bg-background shadow-sm"
                          : "border-transparent bg-foreground/[0.03] opacity-60 hover:opacity-80"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg mb-3 bg-gradient-to-br ${wood.bg}`}
                      />
                      <p className="text-sm font-medium text-foreground">
                        {wood.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {wood.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Features */}
            <div className="flex justify-between pt-2">
              {features.map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-10 h-10 rounded-full bg-foreground/[0.04] flex items-center justify-center">
                    <Icon size={17} className="text-foreground/40" strokeWidth={1.5} />
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center leading-tight">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="absolute bottom-0 inset-x-0 bg-[#FAFAFA]/95 backdrop-blur-sm border-t border-foreground/5 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-foreground tracking-tight">
              {current.price}&nbsp;€
              <span className="text-xs font-normal text-muted-foreground ml-1">TTC</span>
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Livraison sécurisée incluse
            </p>
          </div>
          <button className="bg-foreground text-background rounded-full px-7 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors">
            Commander
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalEditionSheet;
