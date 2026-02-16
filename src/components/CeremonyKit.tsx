import { FileText, Ticket, Smartphone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const items = [
  { icon: FileText, text: "Le Smart Chevalet (PDF A4) à poser sur le cercueil" },
  { icon: Ticket, text: "L'Insert de Programme pour le livret de messe" },
  { icon: Smartphone, text: "L'Annonce digne pour les réseaux sociaux" },
];

const CeremonyKit = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-ceremony">
      <div className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Text */}
        <div className="flex-1 space-y-8">
          <h2 className="font-serif-display text-3xl lg:text-4xl font-bold text-foreground">
            Tout ce qu'il faut pour la cérémonie, prêt à imprimer.
          </h2>
          <ul className="space-y-5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center mt-0.5">
                  <item.icon size={20} className="text-primary" />
                </div>
                <span className="text-foreground text-lg">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual — Chevalet CSS */}
        <div className="flex-1 flex justify-center">
          <div className="relative">
            {/* Easel legs */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-12 bg-muted-foreground/30 rotate-[-15deg] origin-top" />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-12 bg-muted-foreground/30 rotate-[15deg] origin-top" />

            {/* Main card */}
            <div className="w-64 h-80 bg-card rounded-2xl shadow-soft border border-border p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-serif-display text-primary text-3xl font-bold">S</span>
              </div>
              <p className="font-serif-display text-foreground font-semibold text-lg">En mémoire de</p>
              <div className="w-32 h-px bg-primary/30" />
              <p className="text-muted-foreground text-sm">Scannez le QR code<br />pour partager vos souvenirs</p>
              <div className="w-16 h-16 bg-foreground/5 rounded-lg border border-border flex items-center justify-center">
                <span className="text-[8px] text-muted-foreground">QR</span>
              </div>
            </div>

            {/* Small card beside */}
            <div className="absolute -right-16 bottom-4 w-28 h-40 bg-card rounded-xl shadow-soft border border-border p-3 flex flex-col items-center justify-center text-center rotate-3">
              <p className="font-serif-display text-xs font-semibold text-foreground mb-1">Programme</p>
              <div className="w-full space-y-1">
                <div className="h-1 bg-muted rounded-full" />
                <div className="h-1 bg-muted rounded-full w-3/4" />
                <div className="h-1 bg-muted rounded-full w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeremonyKit;
