import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Frame, Ticket, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FeatureCeremonyKit = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-32 lg:py-48 bg-background">
      <div className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Visual — Stationery Mockup */}
        <div className={`flex-1 flex justify-center transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
          <div className="relative">
            {/* Easel legs */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-px h-14 bg-muted-foreground/20 rotate-[-12deg] origin-top" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-px h-14 bg-muted-foreground/20 rotate-[12deg] origin-top" />

            {/* Back paper stack */}
            <div className="absolute -left-3 -top-3 w-72 h-96 bg-card/50 rounded-2xl border-luxury rotate-[-3deg]" />
            <div className="absolute -left-1.5 -top-1.5 w-72 h-96 bg-card/70 rounded-2xl border-luxury rotate-[-1.5deg]" />

            {/* Main A4 card */}
            <div className="relative w-72 h-96 bg-card rounded-2xl shadow-golden-glow border-luxury p-8 flex flex-col items-center justify-center text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-serif-display text-primary text-2xl font-bold">S</span>
              </div>
              <p className="font-serif-display text-foreground font-semibold text-lg">En mémoire de</p>
              <div className="w-24 h-px bg-primary/30" />
              <p className="text-muted-foreground text-xs leading-relaxed">
                Scannez le QR code pour<br />partager vos souvenirs
              </p>
              <div className="w-20 h-20 bg-foreground/5 rounded-xl border-luxury flex items-center justify-center">
                <div className="grid grid-cols-3 gap-1 w-12 h-12">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`rounded-sm ${i % 3 === 0 || i === 4 ? "bg-foreground/60" : "bg-foreground/20"}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Small programme card */}
            <div className="absolute -right-20 bottom-8 w-32 h-44 bg-card rounded-xl shadow-soft border-luxury p-4 flex flex-col items-center justify-center text-center rotate-3">
              <p className="font-serif-display text-xs font-semibold text-foreground mb-3">Programme</p>
              <div className="w-full space-y-1.5">
                <div className="h-1 bg-muted rounded-full" />
                <div className="h-1 bg-muted rounded-full w-4/5 mx-auto" />
                <div className="h-1 bg-muted rounded-full w-3/5 mx-auto" />
                <div className="h-px bg-primary/20 my-2" />
                <div className="h-1 bg-muted rounded-full w-4/5 mx-auto" />
                <div className="h-1 bg-muted rounded-full w-2/3 mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className={`flex-1 space-y-8 text-left transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
          <div className="space-y-4">
            <p className="text-primary font-sans-body uppercase tracking-[0.2em] text-sm font-semibold">Prêt à Imprimer</p>
            <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
              L'élégance jusque dans la <em className="not-italic font-serif-display italic text-primary">cérémonie.</em>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
              Un kit complet, prêt à imprimer, pour connecter vos invités sans effort le jour J.
            </p>
          </div>

          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <Frame size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">Le Smart Chevalet (PDF A4)</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Design raffiné avec QR Code. À poser sur le cercueil ou à l'entrée pour l'accueil.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <Ticket size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">L'Insert de Programme</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Format carte discret à glisser dans les livrets de messe ou à distribuer.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <Share2 size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">L'Annonce Digitale</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Visuel digne et pré-rempli pour prévenir les proches (WhatsApp/SMS).</p>
              </div>
            </li>
          </ul>

          <div className="pt-4">
            <Badge variant="outline" className="border-primary/30 text-primary px-4 py-1.5 font-medium bg-primary/5 hover:bg-primary/5 transition-none rounded-full">
              ✨ Inclus sans supplément dans l'offre à 49€
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCeremonyKit;
