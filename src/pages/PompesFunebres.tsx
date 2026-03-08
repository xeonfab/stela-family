import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Award, Hourglass, Handshake, ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import heroImg from "@/assets/stele-noyer-nfc.png";
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
          <Button variant="gold" className="px-6">
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
          <Button variant="gold" className="w-full">
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
          Démarquez votre agence. Prolongez l'hommage en 60&nbsp;secondes.
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
          Offrez aux familles un espace de recueillement en ligne premium, privé et accessible à vie. Une solution clé en main pour moderniser votre image et enrichir votre accompagnement, sans aucune charge administrative.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button variant="gold" className="px-8 py-6 text-base">
            Réserver une démonstration
          </Button>
          <Button
            variant="goldOutline"
            className="px-8 py-6 text-base"
            asChild
          >
            <Link to="/memorial">Voir un espace d'exemple</Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground/60 text-center lg:text-left">
          ✓ Sans engagement&nbsp; •&nbsp; ✓ Déploiement immédiat
        </p>
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
      icon: Award,
      title: "L'élégance en héritage",
      text: "Démarquez votre agence face aux réseaux standardisés. En offrant cet espace exclusif, vous modernisez votre image et prouvez que votre accompagnement dépasse le jour des obsèques.",
    },
    {
      icon: Hourglass,
      title: "Le rituel des 60 secondes",
      text: "Saisissez le nom et l'année, le système génère le lien. Vous remettez le Kit Cérémonie, la famille prend le relais. Aucun SAV ni support technique à gérer pour vos conseillers.",
    },
    {
      icon: Handshake,
      title: "Une valeur ajoutée immédiate",
      text: "Intégrez naturellement ce service premium à vos devis. Un modèle économique conçu pour les indépendants\u00a0: aucune installation, et une rentabilité dès la première famille accompagnée.",
    },
  ];

  return (
    <section ref={ref} className="py-28 bg-background">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground text-center mb-16">
          Pensé pour le quotidien de votre agence.
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

/* ─── Product Showcase ─── */
const ProductShowcase = () => {
  const { ref, isVisible } = useScrollReveal();

  const checks = [
    "Dépôt de souvenirs et photos en 1 clic",
    "Messages vocaux intimes",
    "Modération totale par la famille",
    "Un lieu de mémoire pérenne, accessible à vie et sans abonnement pour les proches",
  ];

  return (
    <section ref={ref} className="py-28 bg-[#F5F4F0]">
      <div className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Phone mockup */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-[280px] lg:w-[300px] aspect-[9/19] rounded-[2.5rem] border border-border/30 bg-background shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] overflow-hidden">
            {/* Status bar */}
            <div className="h-8 bg-[#2C2C2C] flex items-center justify-center">
              <div className="w-20 h-4 bg-[#1a1a1a] rounded-full" />
            </div>
            {/* App content placeholder */}
            <div className="p-4 space-y-4">
              {/* Profile area */}
              <div className="flex flex-col items-center space-y-2 pt-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20" />
                <div className="h-4 w-32 bg-[#2C2C2C]/10 rounded-full" />
                <div className="h-3 w-20 bg-[#2C2C2C]/5 rounded-full" />
              </div>
              {/* Candle row */}
              <div className="flex justify-center gap-3 py-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                ))}
              </div>
              {/* Memory cards */}
              {[...Array(2)].map((_, i) => (
                <div key={i} className="rounded-xl bg-[#F5F4F0] p-3 space-y-2">
                  <div className="w-full h-24 rounded-lg bg-gradient-to-br from-primary/10 to-transparent" />
                  <div className="h-3 w-3/4 bg-[#2C2C2C]/10 rounded-full" />
                  <div className="h-3 w-1/2 bg-[#2C2C2C]/5 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text column */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <p className="text-primary font-sans-body uppercase tracking-[0.2em] text-sm font-semibold">
            L'expérience famille
          </p>
          <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
            Le plus beau des héritages numériques.
          </h2>
          <p className="text-[#2C2C2C] text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Rassemblez photos, vidéos, voix et hommages dans un écrin numérique partagé. Un espace digne et sécurisé pour que le souvenir continue de vivre à travers eux.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
            C'est cette délicatesse et cette richesse émotionnelle qui transformeront votre prestation funéraire en un accompagnement inoubliable et intemporel pour les familles.
          </p>
          <ul className="space-y-3 max-w-lg mx-auto lg:mx-0">
            {checks.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[#2C2C2C]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <path d="M20 6L9 17l-5-5" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-base">{item}</span>
              </li>
            ))}
          </ul>
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

/* ─── Partnership & CTA (Dark) ─── */
const Partnership = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-32 lg:py-44 bg-[hsl(30_6%_12%)] text-[hsl(0_0%_96%)]">
      <div className={`container mx-auto px-6 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Titre principal */}
        <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight max-w-3xl mx-auto">
          Un modèle économique pensé pour votre sérénité.
        </h2>

        {/* Paragraphe descriptif */}
        <p className="mt-8 text-[hsl(30_6%_65%)] text-lg leading-relaxed max-w-[600px] mx-auto">
          Intégrez un relais de croissance naturel à votre agence, sans aucun risque financier. Notre fonctionnement en flux tendu vous garantit une absence totale de stock et une trésorerie préservée. Vous ne commandez que ce que vous avez déjà vendu, avec une marge commerciale forte sur chaque accompagnement.
        </p>

        {/* Espace vertical */}
        <div className="mt-20 lg:mt-28 space-y-6">
          <h3 className="font-serif-display text-xl lg:text-2xl font-semibold text-[hsl(0_0%_96%)]">
            Laissez-nous vous faire tester la magie du sans-contact en agence.
          </h3>
          <Button variant="gold" className="px-10 py-6 text-base mt-4">
            <Calendar size={18} className="mr-2" />
            Planifier une démonstration (15 min)
          </Button>
        </div>
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
      <ProductShowcase />
      <CeremonyKitSection />
      <Partnership />
      
    </main>
  </div>
);

export default PompesFunebres;
