import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, NotebookPen, QrCode, Infinity, ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import officiantHero from "@/assets/officiant-hero.jpg";
import chevaletImg from "@/assets/ceremony-chevalet.png";

/* ─── Navbar B2B ─── */
const NavbarB2B = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b-[0.5px] border-border/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/officiants" className="font-serif-display text-2xl font-bold tracking-tight text-foreground">
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
const HeroB2B = () => (
  <section className="pt-28 pb-20 lg:pb-32 lg:pt-36 overflow-hidden">
    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
      <div className="flex-1 text-center lg:text-left space-y-8">
        <p className="text-primary font-sans-body uppercase tracking-[0.2em] text-sm font-semibold">
          Pour les Officiants & Maîtres de Cérémonie
        </p>
        <h1 className="font-serif-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground">
          Prolongez l'émotion de vos cérémonies.
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
          L'outil numérique qui sublime votre accompagnement, vous aide à récolter les souvenirs des proches, et inscrit vos hommages dans l'éternité.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button variant="gold" className="px-8 py-6 text-base">
            Découvrir le partenariat
          </Button>
          <Button
            variant="goldOutline"
            className="px-8 py-6 text-base"
            asChild
          >
            <Link to="/memorial">Voir un mémorial d'exemple</Link>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <img
          src={officiantHero}
          alt="Officiante de cérémonie funéraire au pupitre"
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
      icon: NotebookPen,
      title: "Récoltez la matière",
      text: "Invitez la famille à déposer leurs anecdotes sur l'espace privé avant la cérémonie. Une mine d'or pour personnaliser et rédiger votre éloge.",
    },
    {
      icon: QrCode,
      title: "Modernisez le recueillement",
      text: "Disposez notre élégant chevalet connecté à l'entrée. Un geste fort qui permet à l'assemblée de se connecter immédiatement à l'histoire du défunt.",
    },
    {
      icon: Infinity,
      title: "Inscrivez vos mots dans le temps",
      text: "Hébergez le texte de votre discours ou la vidéo de la cérémonie sur le mémorial. Votre travail continue d'apaiser la famille des années plus tard.",
    },
  ];

  return (
    <section ref={ref} className="py-28 bg-background">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground text-center mb-16">
          Comment Stela enrichit votre prestation&nbsp;:
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
              <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Ceremony Kit ─── */
const CeremonyKitB2B = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-28 bg-primary/5">
      <div className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex-1 flex justify-center">
          <img
            src={chevaletImg}
            alt="Kit cérémonie Stela avec chevalet et QR code dans une église"
            className="w-64 lg:w-80 rounded-3xl shadow-golden-glow border-luxury"
            loading="lazy"
          />
        </div>
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
            Le Kit Cérémonie&nbsp;: Votre atout différenciant.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Offrez une expérience physique et numérique fluide. Un design digne et respectueux qui s'intègre parfaitement à vos pupitres et tables de signatures.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── Partnership Model (Dark) ─── */
const Partnership = () => {
  const { ref, isVisible } = useScrollReveal();

  const cards = [
    {
      title: "Modèle Inclusion",
      text: "Proposez le mémorial dans votre 'Pack Premium'. Vous bénéficiez d'un tarif B2B exclusif.",
    },
    {
      title: "Modèle Recommandation",
      text: "Offrez un code privilège à la famille. Nous vous reversons une commission de parrainage pour chaque mémorial créé.",
    },
  ];

  return (
    <section ref={ref} className="py-28 bg-[hsl(30_6%_12%)] text-[hsl(0_0%_96%)]">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
            Un partenariat pensé pour les indépendants.
          </h2>
          <p className="text-[hsl(30_6%_70%)] text-lg leading-relaxed">
            Intégrez Stela à vos devis pour augmenter la valeur de vos prestations, ou recommandez-nous simplement aux familles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-primary/30 bg-[hsl(30_6%_16%)] p-8 space-y-3 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${(i + 1) * 200}ms` }}
            >
              <h3 className="font-serif-display text-xl font-semibold">{card.title}</h3>
              <p className="text-[hsl(30_6%_70%)] leading-relaxed">{card.text}</p>
            </div>
          ))}
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
          Prêt à offrir une nouvelle dimension à vos cérémonies&nbsp;?
        </h2>
        <Button variant="gold" className="px-10 py-6 text-base">
          <Calendar size={18} className="mr-2" />
          Prendre rendez-vous (15 min)
        </Button>
      </div>
    </section>
  );
};

/* ─── Page ─── */
const Officiants = () => (
  <div className="min-h-screen bg-background">
    <NavbarB2B />
    <main>
      <HeroB2B />
      <ValueProposition />
      <CeremonyKitB2B />
      <Partnership />
      <FinalCTA />
    </main>
  </div>
);

export default Officiants;
