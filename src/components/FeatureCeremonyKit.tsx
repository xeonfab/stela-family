import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Frame, Ticket, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import chevaletImg from "@/assets/ceremony-chevalet.png";
import lettreImg from "@/assets/ceremony-lettre.png";
import whatsappImg from "@/assets/ceremony-whatsapp.png";

const FeatureCeremonyKit = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-32 bg-background lg:py-[72px]">
      <div
        className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

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
            className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="relative flex flex-col items-center">
              <div className="relative mb-8">
                <img
                  src={chevaletImg}
                  alt="Smart Chevalet avec QR code posé dans une église"
                  className="w-48 h-64 object-cover rounded-2xl shadow-golden-glow border-luxury"
                />
              </div>
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
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="relative flex flex-col items-center">
              <div className="relative mb-8">
                <img
                  src={lettreImg}
                  alt="Cartes mémorial empilées avec photo et QR code"
                  className="w-48 h-64 object-cover rounded-2xl shadow-golden-glow border-luxury"
                />
              </div>
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
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="relative flex flex-col items-center">
              <div className="relative mb-8">
                <img
                  src={whatsappImg}
                  alt="Smartphone affichant une annonce mémorial WhatsApp"
                  className="w-48 h-64 object-cover rounded-2xl shadow-golden-glow border-luxury"
                />
              </div>
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
            className="border-primary/30 text-primary px-4 py-1.5 font-medium bg-primary/5 hover:bg-primary/5 transition-none rounded-full">
            ✨ Inclus sans supplément dans l'offre à 49€
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default FeatureCeremonyKit;
