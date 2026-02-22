import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Star, CheckCircle, TrendingUp, ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import heroImg from "@/assets/pompes-funebres-hero.jpg";
import chevaletImg from "@/assets/ceremony-chevalet.png";

/* ─── Navbar B2B ─── */
const NavbarB2B = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b-[0.5px] border-border/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/pompe-funebre" className="font-serif-display text-2xl font-bold tracking-tight text-foreground">
          Stela
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Espace Familles
          </Link>
          <Button className="rounded-full bg-gradient-to-b from-primary to-[hsl(43_56%_42%)] text-primary-foreground hover:opacity-90 transition-all duration-200 hover:scale-105 px-6">
            Devenir Partenaire
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <Link to="/" className="block text-sm text-muted-foreground">Espace Familles</Link>
          <Button className="w-full rounded-full bg-primary text-primary-foreground">
            Devenir Partenaire
          </Button>
        </div>
      )}
    </nav>
  );
};

/* ─── Hero ─── */
const HeroSection = () => (
  <section className="pt-28 pb-20 lg:pb-32 lg:pt-36 overflow-hidden">
    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
      <div className="flex-1 text-center lg:text-left space-y-8">
        <p className="text-primary font-sans-body uppercase tracking-[0.2em] text-sm font-semibold">
          Pour les Agences Indépendantes
        </p>
        <h1 className="font-serif-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground">
          Démarquez votre agence avec un hommage sans fin.
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
          Offrez aux familles un sanctuaire numérique premium. Une solution clé en main pour moderniser votre image et enrichir votre accompagnement, sans aucune charge administrative.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button className="rounded-full bg-gradient-to-b from-primary to-[hsl(43_56%_42%)] text-primary-foreground hover:opacity-90 transition-all duration-200 hover:scale-105 px-8 py-6 text-base shadow-gold">
            Découvrir nos offres B2B
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-muted-foreground/30 text-foreground px-8 py-6 text-base hover:bg-secondary transition-transform duration-200 hover:scale-105"
            asChild
          >
            <Link to="/memorial">Voir un mémorial d'exemple</Link>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <img
          src={heroImg}
          alt="Directeur de pompes funèbres remettant un document à une famille"
          className="w-full max-w-md rounded-3xl shadow-golden-glow border-luxury object-cover aspect-[3/4]"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);

/* ─── Value Proposition ─── */
const ValueProposition = () => {
  const { ref, isVisible } = useScrollReveal();

  const items = [
    {
      icon: Star,
      title: "Une image modernisée",
      text: "Montrez aux familles que vous comprenez leurs nouveaux besoins. Prolongez votre présence bien au-delà des obsèques avec un service innovant et digne.",
    },
    {
      icon: CheckCircle,
      title: "Zéro charge mentale",
      text: "Aucune compétence technique requise. Vous remettez le Kit Cérémonie à la famille, la plateforme intelligente s'occupe du reste. Zéro SAV pour vous.",
    },
    {
      icon: TrendingUp,
      title: "Valorisez vos prestations",
      text: "Justifiez plus facilement vos tarifs premium en incluant un service à forte valeur émotionnelle perçue que les grands groupes standardisés n'ont pas.",
    },
  ];

  return (
    <section ref={ref} className="py-28 bg-background">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground text-center mb-16">
          Pourquoi intégrer Stela à votre agence&nbsp;?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <div
              key={i}
              className={`text-center space-y-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${(i + 1) * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <item.icon size={26} className="text-primary" />
              </div>
              <h3 className="font-serif-display text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="text-[#2C2C2C] leading-relaxed max-w-sm mx-auto">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Ceremony Kit ─── */
const CeremonyKitSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-28 bg-primary/5">
      <div className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex-1 flex justify-center">
          <img
            src={chevaletImg}
            alt="Kit Cérémonie Stela avec chevalet et QR code dans une chambre funéraire"
            className="w-64 lg:w-80 rounded-3xl shadow-golden-glow border-luxury"
            loading="lazy"
          />
        </div>
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
            Le Kit Cérémonie&nbsp;: Le pont entre le salon et le digital.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Posé dans la chambre funéraire ou à l'entrée de la cérémonie, notre chevalet invite les proches à flasher le QR code. Ils accèdent instantanément au mémorial pour y déposer leurs condoléances, photos et souvenirs vocaux.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── Partnership Model (Dark) ─── */
const Partnership = () => {
  const { ref, isVisible } = useScrollReveal();

  const card = {
    title: "L'Inclusion Premium",
    badge: "Recommandé",
    text: "Vous achetez nos mémoriaux à un tarif de gros exclusif (ex: 40€). Vous l'incluez d'office dans vos devis 'Prestige' pour augmenter votre marge et la satisfaction famille.",
  };

  return (
    <section ref={ref} className="py-28 bg-[hsl(30_6%_12%)] text-[hsl(0_0%_96%)]">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
            La marge silencieuse&nbsp;: un modèle pensé pour votre sérénité.
          </h2>
          <p className="text-[hsl(30_6%_70%)] text-lg leading-relaxed">
            Augmentez la valeur de vos devis et modernisez votre image, sans modifier votre métier.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div
            className={`rounded-2xl border border-primary/30 bg-[hsl(30_6%_16%)] p-8 space-y-3 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-center gap-3">
              <h3 className="font-serif-display text-xl font-semibold">{card.title}</h3>
              <span className="text-xs font-sans-body font-medium bg-primary/20 text-primary px-2.5 py-0.5 rounded-full">
                {card.badge}
              </span>
            </div>
            <p className="text-[hsl(30_6%_70%)] leading-relaxed">{card.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Final CTA ─── */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-28 bg-background">
      <div className={`container mx-auto px-6 text-center space-y-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
          Rencontrons-nous. Laissez-nous vous montrer un exemple sur tablette.
        </h2>
        <Button className="rounded-full bg-gradient-to-b from-primary to-[hsl(43_56%_42%)] text-primary-foreground hover:opacity-90 transition-all duration-200 hover:scale-105 px-10 py-6 text-base shadow-gold">
          <Calendar size={18} className="mr-2" />
          Planifier une démonstration (15 min)
        </Button>
      </div>
    </section>
  );
};

/* ─── Page ─── */
const PompesFunebres = () => (
  <div className="min-h-screen bg-background">
    <NavbarB2B />
    <main>
      <HeroSection />
      <ValueProposition />
      <CeremonyKitSection />
      <Partnership />
      <FinalCTA />
    </main>
  </div>
);

export default PompesFunebres;
