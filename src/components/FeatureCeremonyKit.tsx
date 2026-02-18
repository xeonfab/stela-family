import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Frame, Ticket, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FeatureCeremonyKit = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-32 lg:py-48 bg-background">
      <div
        className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <p className="text-primary font-sans-body uppercase tracking-[0.2em] text-sm font-semibold">
            Prêt à Imprimer
          </p>
          <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
            Une présence lumineuse et partagée lors de{" "}
            <em className="not-italic font-serif-display italic text-primary">l'adieu.</em>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Le Kit Cérémonie complet, prêt à imprimer, pour inviter chaque proche à se connecter et prolonger l'hommage.
          </p>
        </div>

        {/* 3 Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Smart Chevalet */}
          <div
            className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="relative flex flex-col items-center">
              {/* Visual mockup */}
              <div className="relative mb-8">
                <div className="absolute -left-2 -top-2 w-48 h-64 bg-card/50 rounded-2xl border-luxury rotate-[-3deg]" />
                <div className="absolute -left-1 -top-1 w-48 h-64 bg-card/70 rounded-2xl border-luxury rotate-[-1.5deg]" />
                <div className="relative w-48 h-64 bg-card rounded-2xl shadow-golden-glow border-luxury p-5 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-serif-display text-primary text-xl font-bold">S</span>
                  </div>
                  <p className="font-serif-display text-foreground font-semibold text-sm">En mémoire de</p>
                  <div className="w-16 h-px bg-primary/30" />
                  <p className="text-muted-foreground text-[10px] leading-relaxed">Scannez le QR code</p>
                  <div className="w-14 h-14 bg-foreground/5 rounded-lg border-luxury flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-0.5 w-8 h-8">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-sm ${i % 3 === 0 || i === 4 ? "bg-foreground/60" : "bg-foreground/20"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Text */}
              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Frame size={20} className="text-primary" />
                </div>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">
                  Pour accueillir et guider les proches.
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  Posé à l'entrée de l'église ou du funérarium, ce chevalet élégant (format A4) présente son visage et
                  le QR code, invitant chacun à flasher pour découvrir son mémorial.
                </p>
              </div>
            </div>
          </div>

          {/* Insert de Programme */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="relative flex flex-col items-center">
              {/* Visual mockup */}
              <div className="relative mb-8">
                <div className="relative w-40 h-56 bg-card rounded-xl shadow-golden-glow border-luxury p-4 flex flex-col items-center justify-center text-center">
                  <p className="font-serif-display text-xs font-semibold text-foreground mb-4">Programme</p>
                  <div className="w-full space-y-2">
                    <div className="h-1 bg-muted rounded-full" />
                    <div className="h-1 bg-muted rounded-full w-4/5 mx-auto" />
                    <div className="h-1 bg-muted rounded-full w-3/5 mx-auto" />
                    <div className="h-px bg-primary/20 my-3" />
                    <div className="h-1 bg-muted rounded-full w-4/5 mx-auto" />
                    <div className="h-1 bg-muted rounded-full w-2/3 mx-auto" />
                    <div className="h-px bg-primary/20 my-3" />
                    <div className="h-1 bg-muted rounded-full" />
                    <div className="h-1 bg-muted rounded-full w-3/4 mx-auto" />
                  </div>
                  <div className="mt-4 w-8 h-8 bg-foreground/5 rounded border-luxury flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-sm ${i % 2 === 0 ? "bg-foreground/50" : "bg-foreground/20"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Text */}
              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Ticket size={20} className="text-primary" />
                </div>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">
                  À glisser dans le livret ou la poche.
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  Des cartes au format discret et raffiné, à distribuer avec les livrets de messe. Un lien tangible que
                  les invités peuvent emporter chez eux pour déposer leurs souvenirs plus tard, au calme.
                </p>
              </div>
            </div>
          </div>

          {/* Annonce Digitale */}
          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="relative flex flex-col items-center">
              {/* Visual mockup */}
              <div className="relative mb-8">
                <div className="relative w-48 h-64 bg-card rounded-2xl shadow-golden-glow border-luxury p-5 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-full h-20 bg-primary/5 rounded-lg flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-serif-display text-primary text-lg font-bold">S</span>
                    </div>
                  </div>
                  <p className="font-serif-display text-foreground font-semibold text-xs">En mémoire de Marie</p>
                  <p className="text-muted-foreground text-[10px] leading-relaxed">
                    Partagez vos souvenirs sur son mémorial digital
                  </p>
                  <div className="w-full h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-[10px] font-semibold">stela.app/marie</span>
                  </div>
                  <div className="flex gap-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <Share2 size={10} className="text-muted-foreground" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-[8px] text-muted-foreground">💬</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Text */}
              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Share2 size={20} className="text-primary" />
                </div>
                <h3 className="font-serif-display text-lg font-semibold text-foreground">
                  Pour ceux qui sont loin (WhatsApp & SMS).
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  Un visuel digne et prêt-à-partager pour prévenir la famille et les amis par message. L'image contient
                  toutes les informations et le lien direct, sans que vous ayez à chercher vos mots.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="text-center">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary px-4 py-1.5 font-medium bg-primary/5 hover:bg-primary/5 transition-none rounded-full"
          >
            ✨ Inclus sans supplément dans l'offre à 49€
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default FeatureCeremonyKit;
