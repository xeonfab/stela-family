import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Play, ShieldCheck, Users, Quote, Leaf, Feather, Smartphone, Unlock, Lock, Home } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useRef, useEffect } from "react";
import WaitlistDialog from "@/components/WaitlistDialog";
import { Helmet } from "react-helmet-async";

import jeanClaudePortrait from "@/assets/jean-claude-portrait-new.jpg";
import heroHandBlock from "@/assets/stela-hand-block.jpg";
import steleObjet from "@/assets/stela-objet.png";
import steleNoyer from "@/assets/stele-noyer-nfc.png";
import heroStelaScene from "@/assets/hero-stela-scene.jpg";
import steleMains from "@/assets/stele-mains.jpg";
import steleVersoLaiton from "@/assets/stele-verso-laiton.jpg";
import steleChanfrein from "@/assets/stele-chanfrein.jpg";
import steleFlatlay from "@/assets/stele-flatlay.jpg";
import familleBretagne from "@/assets/famille-bretagne-1987.jpg";

const SteleGallery = () => {
  const photos = [
    { src: steleVersoLaiton, alt: "Verso laiton gravé QR code et dates 1948 — 2024" },
    { src: steleChanfrein, alt: "Macro du chanfrein de 3mm sur l'arête en noyer" },
    { src: steleFlatlay, alt: "Vue à plat de la stèle en noyer avec gravure Jean-Claude Dubois et cotes" },
  ];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (el.clientWidth * 0.85));
      setActive(Math.min(photos.length - 1, Math.max(0, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [photos.length]);

  return (
    <div className="mt-6 lg:mt-8">
      {/* Mobile: swipeable carousel */}
      <div className="sm:hidden">
        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 -mx-6"
        >
          {photos.map((p) => (
            <div
              key={p.src}
              className="shrink-0 w-[85vw] aspect-square overflow-hidden rounded-2xl bg-background snap-center"
            >
              <img src={p.src} alt={p.alt} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-primary" : "w-1.5 bg-foreground/20"}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: 3-column grid (unchanged) */}
      <div className="hidden sm:grid grid-cols-3 gap-0 rounded-2xl overflow-hidden bg-background">
        {photos.map((p) => (
          <div key={p.src} className="aspect-square overflow-hidden">
            <img src={p.src} alt={p.alt} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
};

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  dark?: boolean;
}) => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6">{eyebrow}</p>
    <h2 className="font-serif-display text-4xl lg:text-5xl font-bold leading-tight">{title}</h2>
    {subtitle && <p className={`mt-6 text-lg ${dark ? "text-white/70" : "text-muted-foreground"}`}>{subtitle}</p>}
  </div>
);

const Step = ({ n, title, text }: { n: string; title: string; text: string }) => (
  <div className="text-center relative">
    <div className="relative mx-auto w-[52px] h-[52px] rounded-full border-[0.5px] border-border bg-card flex items-center justify-center mb-6 z-10">
      <span className="font-serif-display text-xl text-foreground">{n}</span>
    </div>
    <h3 className="font-serif-display text-xl font-medium mb-3">{title}</h3>
    <p className="text-[13px] text-muted-foreground leading-relaxed max-w-xs mx-auto">{text}</p>
  </div>
);

const MessageBox = ({ eyebrow, text, subMessage }: { eyebrow: string; text: string; subMessage?: string }) => (
  <div className="p-3 mb-3">
    <p className="text-[7px] uppercase tracking-wider text-muted-foreground mb-1">{eyebrow}</p>
    <p className="font-serif-display text-[14px] italic text-foreground leading-snug">{text}</p>
    {subMessage && <p className="text-[12px] text-muted-foreground italic mt-2 leading-relaxed">{subMessage}</p>}
  </div>
);

const SteleSpec = ({ title, text }: { title: string; text: string }) => (
  <div className="flex gap-4">
    <span className="text-primary text-xl leading-none mt-1">◇</span>
    <div>
      <h4 className="font-serif-display text-lg font-medium mb-2">{title}</h4>
      <p className="text-muted-foreground text-[14px] leading-relaxed">{text}</p>
    </div>
  </div>
);

const PricingCard = ({
  tier,
  price,
  period,
  desc,
  features,
  cta,
  variant,
  ctaVariant,
  onCtaClick,
  ctaId,
  trackValue,
  trackContentName,
  trackContentId,
}: {
  tier: string;
  price: string;
  period: string;
  desc: string;
  features: React.ReactNode[];
  cta: string;
  variant: "free" | "main" | "dark";
  ctaVariant?: "gold" | "goldOutline";
  onCtaClick?: () => void;
  ctaId?: string;
  trackValue?: number;
  trackContentName?: string;
  trackContentId?: string;
}) => {
  const isDark = variant === "dark";
  const isMain = variant === "main";
  const btnVariant = ctaVariant ?? (isMain ? "gold" : "goldOutline");
  const handleClick = () => {
    if (typeof window !== "undefined" && typeof (window as any).fbq === "function" && trackContentName) {
      (window as any).fbq("track", "InitiateCheckout", {
        value: trackValue ?? 0,
        currency: "EUR",
        content_name: trackContentName,
        content_id: trackContentId,
      });
    }
    onCtaClick?.();
  };
  return (
    <div
      className={`relative rounded-3xl flex flex-col overflow-hidden ${
        isDark
          ? "bg-[#2C221B] text-[#FAFAFA] border-[0.5px] border-primary/30"
          : isMain
            ? "bg-amber-50/60 border border-primary/50 shadow-golden-glow"
            : "bg-card border-[0.5px] border-border"
      }`}
    >
      {isDark && (
        <div className="bg-primary text-primary-foreground text-[10px] tracking-[0.3em] uppercase text-center py-2 font-medium">
          Le plus choisi
        </div>
      )}
      <div className="p-8 lg:p-10 flex flex-col flex-1">
        <p className={`text-xs tracking-[0.25em] uppercase mb-3 ${isDark ? "text-primary" : "text-primary"}`}>{tier}</p>
        <p className="font-serif-display text-5xl font-bold mt-2">{price}</p>
        <p className={`text-xs mt-2 mb-6 ${isDark ? "text-white/60" : "text-muted-foreground"}`}>{period}</p>
        <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-white/75" : "text-muted-foreground"}`}>{desc}</p>
        <ul className="space-y-3 mb-8 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className={isDark ? "text-white/85" : "text-foreground/80"}>{f}</span>
            </li>
          ))}
        </ul>
        <Button
          id={ctaId}
          variant={btnVariant}
          onClick={handleClick}
          className={`w-full py-6 ${isDark ? "border-primary text-primary hover:bg-primary/10" : ""}`}
          data-pricing-tier={
            trackContentId === "free_tier"
              ? "free"
              : trackContentId === "sanctuary_tier"
                ? "sanctuary"
                : trackContentId === "complete_tier"
                  ? "complete"
                  : undefined
          }
        >
          {cta}
        </Button>
      </div>
    </div>
  );
};


const MemorialLP = () => {
  return _MemorialLPInner();
};

const PILLARS = [
  {
    id: "mots",
    label: "Les Mots",
    eyebrow: "Une anecdote partagée",
  },
  {
    id: "photos",
    label: "Les Photos & Vidéos",
    eyebrow: "Une galerie curatée",
  },
  {
    id: "voix",
    label: "Les Voix",
    eyebrow: "Sa voix, préservée",
  },
] as const;

type PillarId = (typeof PILLARS)[number]["id"];

const PillarVisual = ({ active }: { active: PillarId }) => {
  if (active === "mots") {
    return (
      <div className="flex flex-col justify-center items-center text-center px-8 py-8 lg:px-16 lg:py-10">
        <p className="font-serif-display italic text-xl lg:text-2xl text-foreground leading-snug max-w-md">
          « Il avait toujours cette phrase, quand on doutait : "On verra demain, mais on n'oublie pas aujourd'hui." »
        </p>
        <span className="mt-7 block h-px w-8 bg-primary" aria-hidden="true" />
        <p className="mt-3 text-[12px] font-medium tracking-[0.1em] uppercase text-foreground">Claire, sa fille</p>
      </div>
    );
  }
  if (active === "photos") {
    return (
      <div className="h-full flex flex-col justify-center px-2 py-2">
        <div className="rounded-2xl overflow-hidden">
          <img
            src={familleBretagne}
            alt="Photo de famille — Été 1987, Bretagne"
            width={1280}
            height={960}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
        <p className="mt-4 text-[12px] text-muted-foreground italic text-center">
          Été 1987 — Bretagne · Partagé par 4 proches
        </p>
      </div>
    );
  }
  return (
      <div className="flex flex-col justify-center px-8 py-8 lg:px-14 lg:py-10">
      <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-5">Message vocal</p>
      <p className="font-serif-display italic text-xl lg:text-2xl text-foreground mb-8 leading-snug">
        Jean-Claude, à sa fille.
      </p>
      <div className="flex items-center gap-4">
        <button className="w-11 h-11 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
          <Play size={14} className="text-primary-foreground ml-0.5" fill="currentColor" />
        </button>
        <div className="flex-1 flex items-end gap-[3px] h-9">
          {Array.from({ length: 38 }).map((_, i) => (
            <span
              key={i}
              className="flex-1 bg-primary/70 rounded-full"
              style={{ height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%` }}
            />
          ))}
        </div>
        <span className="text-[11px] tabular-nums text-muted-foreground">0:42</span>
      </div>
      <span className="mt-6 block h-px w-8 bg-primary" aria-hidden="true" />
      <p className="mt-3 text-[12px] text-muted-foreground">Pierre, son frère — 0:42</p>
    </div>
  );
};

const PILLAR_CONTENT: Record<PillarId, { index: string; eyebrow: string; title: React.ReactNode; body: string; quote?: string }> = {
  mots: {
    index: "01",
    eyebrow: "Les Mots",
    title: (
      <>
        Les phrases qu'il <em className="text-primary not-italic font-serif-display italic">répétait</em>, conservées.
      </>
    ),
    body: "Anecdotes, citations, lettres, messages déposés par celles et ceux qui l'ont aimé. Chaque mot vient enrichir un récit collectif, à l'abri du temps.",
  },
  photos: {
    index: "02",
    eyebrow: "Les Photos & Vidéos",
    title: (
      <>
        Les instants partagés, <em className="text-primary not-italic font-serif-display italic">retrouvés</em>.
      </>
    ),
    body: "Une galerie organisée par moments et par proches. Les souvenirs visuels reprennent leur place, prêts à être revus en famille.",
  },
  voix: {
    index: "03",
    eyebrow: "Les Voix",
    title: (
      <>
        Le timbre de sa voix, <em className="text-primary not-italic font-serif-display italic">préservé</em>.
      </>
    ),
    body: "Messages vocaux, enregistrements, anecdotes racontées par ses proches. Ce que l'écrit ne peut transmettre trouve ici son refuge.",
    quote: "Le rire qu'on commence à oublier. L'intonation exacte. Le souffle avant les mots.",
  },
};

const PillarSection = ({ pillarId, reverse }: { pillarId: PillarId; reverse?: boolean }) => {
  const { index, eyebrow, title, body, quote } = PILLAR_CONTENT[pillarId];
  return (
    <section className="py-14 lg:py-20" style={{ backgroundColor: "#FAF8F5" }}>
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal>
          <div
            className={`grid lg:grid-cols-5 gap-10 lg:gap-16 items-center ${
              reverse ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Texte — 2 colonnes */}
            <div className="lg:col-span-2">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-[11px] tracking-[0.3em] tabular-nums text-primary">{index}</span>
                <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">{eyebrow}</span>
              </div>
              <h3 className="font-serif-display text-3xl lg:text-4xl font-bold leading-[1.15] text-foreground">
                {title}
              </h3>
              {quote && (
                <p className="mt-6 font-serif-display italic text-lg text-muted-foreground leading-snug max-w-md">
                  {quote}
                </p>
              )}
              <p className="mt-6 text-[15px] text-muted-foreground leading-relaxed max-w-md">{body}</p>
            </div>

            {/* Visuel — 3 colonnes */}
            <div className="lg:col-span-3">
              <div
                className="rounded-3xl overflow-hidden relative bg-card border-[0.5px] border-border/60 shadow-soft"
              >
                <div className="relative h-full">
                  <PillarVisual active={pillarId} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const SanctuaireSection = () => {
  return (
    <>
      {/* Intro */}
      <section className="pt-24 pb-8 lg:pt-[64px]" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6">Le Sanctuaire</p>
              <h2 className="font-serif-display text-4xl lg:text-5xl font-bold leading-tight">
                Trois traces.
                <br />
                <em className="text-primary not-italic font-serif-display italic">Une seule mémoire.</em>
              </h2>
              <p className="mt-6 text-[15px] text-muted-foreground max-w-[680px] mx-auto leading-relaxed">
                Ce que la mémoire ne peut pas retenir seule — les mots exacts, le timbre de la voix, les instants photographiés — le Sanctuaire les garde, pour toute la famille, pour une génération.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 sections distinctes en composition asymétrique alternée */}
      <PillarSection pillarId="mots" />
      <PillarSection pillarId="photos" reverse />
      <PillarSection pillarId="voix" />
    </>
  );
};

const _MemorialLPInner = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://stela.family/" />
        <meta property="og:url" content="https://stela.family/" />
      </Helmet>
      <Navbar />

      {/* 1 — HERO */}
      <section className="relative bg-[#FAFAFA] text-[#2C2C2C] overflow-hidden flex items-center">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
          }}
        />
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-0 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* TEXT — left */}
          <div className="w-full lg:w-1/2 text-center lg:text-left lg:pl-0">
            <h1
              className="font-serif-display font-normal leading-[1.05] text-[#2C2C2C]/95"
              style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
            >
              Sa mémoire mérite un endroit.
            </h1>
            <div
              className="mt-8 font-serif-display italic text-[18px] lg:text-[22px] max-w-xl mx-auto lg:mx-0"
              style={{ color: "rgba(44,44,44,0.55)" }}
            >
              <p>Sa voix. Ses mots. Les instants qu'on croyait perdus.<br />Réunis pour toute la famille, pour une génération.</p>
            </div>
            <div className="mt-12 flex flex-col items-center lg:items-start gap-3">
              <Button variant="gold" className="px-8 py-6 text-base whitespace-nowrap" asChild>
                <a href="#pricing">Créer son sanctuaire</a>
              </Button>
            </div>
          </div>

          {/* VISUAL — right */}
          <div className="w-full lg:w-1/2">
            <div className="overflow-hidden border-[0.5px] border-[#2C2C2C]/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] h-[320px] sm:h-[400px] lg:h-[600px] rounded-3xl lg:rounded-none">
              <img
                src={heroHandBlock}
                alt="Stèle Stela en noyer gravée Jean-Claude Dubois, tenue à la main avec le sanctuaire numérique sur smartphone"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#2C2C2C]/40">
          <span className="text-[9px] tracking-[0.3em] uppercase">Découvrir</span>
          <span className="w-px h-10 bg-gradient-to-b from-[#2C2C2C]/40 to-transparent" />
        </div>
      </section>

      {/* 2 — LE SANCTUAIRE : EXPLORATION + COLLABORATION + ONBOARDING */}
      <SanctuaireSection />

      {/* 3 — HONORER SA MÉMOIRE */}
      <section className="py-24 lg:py-[92px]" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow="Un héritage familial"
              title={
                <>
                  Créez-le ensemble. Enrichissez-le <em className="not-italic font-serif-display" style={{ color: "#D4AF37" }}>pour toujours.</em>
                </>
              }
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mt-16">
              {[
                {
                  title: "En quelques minutes",
                  text: "Ouvrez le Sanctuaire à son nom. Ajoutez une première photo, un premier mot. L'espace existe.",
                },
                {
                  title: "Invitez ses proches",
                  text: "Un lien privé suffit. Chacun rejoint le Sanctuaire depuis chez soi — enfants, frères, amis proches. Aucune application à installer.",
                },
                {
                  title: "Ensemble, jour après jour",
                  text: "Une photo retrouvée, une anecdote, un message vocal. Le Sanctuaire s'enrichit à chaque dépôt. Sa mémoire reste vivante, pour une génération.",
                },
              ].map((col) => (
                <div key={col.title} className="text-left">
                  <div className="h-px mb-6" style={{ width: "32px", backgroundColor: "#D4AF37" }} aria-hidden />
                  <h3 className="font-serif-display font-medium text-2xl text-foreground mb-4">{col.title}</h3>
                  <p className="font-sans text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.8 }}>{col.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 — LA STÈLE */}
      <section className="bg-muted py-24 lg:py-32">
        <div className="container mx-auto px-6">
          {/* Header */}
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6">L'objet & le geste</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary/80 mb-6">Ébénisterie française · Noyer massif · Fait à la main</p>
              <h2 className="font-serif-display text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Posez le téléphone.{" "}
                <em className="text-primary not-italic font-serif-display italic">Le Sanctuaire s'ouvre.</em>
              </h2>
              <p className="font-sans italic text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Un bloc de noyer massif gravé à son nom. Un effleurement suffit. Pas d'application, pas de mot de passe. Sa mémoire est là, pour toute la famille.
              </p>
            </div>
          </Reveal>

          {/* Gallery */}
          <Reveal>
            <div className="mt-16 lg:mt-24 overflow-hidden rounded-2xl bg-background h-[260px] sm:h-[420px] md:h-auto">
              <img
                src={steleMains}
                alt="Stèle Stela en noyer tenue à la main avec le Sanctuaire ouvert sur smartphone"
                className="w-full h-full md:h-auto object-cover object-center"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal>
            <SteleGallery />
          </Reveal>

          {/* Specs table + Quote */}
          <Reveal>
            <div className="mt-20 lg:mt-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              <div>
              <dl className="divide-y divide-foreground/5">
                {[
                  ["Noyer massif", "170 × 100 × 40 mm"],
                  ["Gravure laser", "Prénom, nom, ligne signature"],
                  ["Chanfrein 3mm", "Sur les 12 arêtes"],
                  ["Finition", "Huile naturelle"],
                  ["Verso laiton", "QR code + dates naissance — décès"],
                  ["NFC intégré", "Un effleurement ouvre le Sanctuaire"],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    className={`grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-2 sm:gap-8 px-5 py-4 ${i % 2 === 0 ? "bg-foreground/[0.02]" : "bg-transparent"}`}
                  >
                    <dt className="font-sans text-xs uppercase tracking-[0.18em] text-primary">{k}</dt>
                    <dd className="font-sans text-sm text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 italic text-xl lg:text-2xl leading-relaxed text-muted-foreground text-left px-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Chaque stèle est façonnée à la main par un ébéniste français. Le noyer est sélectionné pour ses veines, huilé pour durer. Conçu pour traverser les générations.
              </p>
              </div>

              <blockquote className="font-serif-display italic text-xl lg:text-2xl leading-relaxed text-muted-foreground text-center lg:text-left px-4 lg:px-8">
                « Aucun mot de passe. Aucune application à installer. Un simple effleurement avec votre téléphone — et sa voix, ses photos, ses mots sont là. Des plus jeunes aux grands-parents, l'accès est immédiat. »
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 — FONDATEUR & GARANTIE — caché */}

      {/* 6 — TÉMOIGNAGES */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid md:grid-cols-3 gap-6">
            <Reveal>
              <Card className="relative p-8 lg:p-10 rounded-3xl bg-[#2C221B] text-[#FAFAFA] border-0 overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
                <p className="font-serif-display text-lg lg:text-xl italic leading-relaxed text-white/90 flex-1">
                  « Ma mère avait enregistré sa recette de tarte aux pommes, avec sa voix, ses hésitations, ses "attends je cherche". On ne savait pas qu'elle l'avait fait. On a pleuré et ri en même temps. »
                </p>
                <div className="mt-8 pt-5 border-t border-white/15">
                  <p className="font-medium">Sophie, 38 ans</p>
                  <p className="text-sm text-white/60 mt-1">Sa fille</p>
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="relative p-8 lg:p-10 rounded-3xl bg-[#2C221B] text-[#FAFAFA] border-0 overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
                <p className="font-serif-display text-lg lg:text-xl italic leading-relaxed text-white/90 flex-1">
                  « Mon frère habite à Lyon, moi à Bordeaux. On s'est retrouvés dans le Sanctuaire de papa comme on se retrouvait dans sa cuisine. Chacun a déposé quelque chose. C'est le seul endroit où on est encore tous ensemble. »
                </p>
                <div className="mt-8 pt-5 border-t border-white/15">
                  <p className="font-medium">Thomas, 52 ans</p>
                  <p className="text-sm text-white/60 mt-1">Son fils</p>
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="relative p-8 lg:p-10 rounded-3xl bg-[#2C221B] text-[#FAFAFA] border-0 overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
                <p className="font-serif-display text-lg lg:text-xl italic leading-relaxed text-white/90 flex-1">
                  « Il avait laissé un message pour le mariage de ma fille. Elle a six ans. Il ne la verra pas grandir — mais elle l'entendra lui parler ce jour-là. »
                </p>
                <div className="mt-8 pt-5 border-t border-white/15">
                  <p className="font-medium">Marie, 46 ans</p>
                  <p className="text-sm text-white/60 mt-1">Sa fille</p>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7 — PRICING */}
      <section id="pricing" className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-[960px]">
          <Reveal>
            <SectionHeader
              eyebrow="Nos offres garanties 25 ans"
              title={
                <>
                  Un Sanctuaire. <em className="text-primary not-italic font-serif-display italic">Toute la famille.</em>
                </>
              }
              subtitle="Le Sanctuaire de votre famille, garanti pour une génération."
            />
          </Reveal>
          <Reveal>
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              <PricingCard
                variant="main"
                tier="Le Sanctuaire"
                price="€99"
                period="Paiement unique · Sans stèle"
                desc="Pour commencer, avant de choisir votre stèle."
                features={[
                  "Tout l'accès gratuit, pour toujours",
                  "5GB de stockage · Garanti 25 ans",
                  "Export complet des données",
                  "Stèle commandable à tout moment",
                ]}
                cta="Commencer sans stèle"
                ctaVariant="goldOutline"
                onCtaClick={openWaitlist}
                ctaId="btn-pricing-99"
                trackValue={99}
                trackContentName="pricing_99"
                trackContentId="sanctuary_tier"
              />
              <PricingCard
                variant="dark"
                tier="Le Sanctuaire + La stèle"
                price="€249"
                period="Paiement unique · Stèle incluse"
                desc="Le Sanctuaire avec la stèle en noyer gravée, livrée chez vous. Rien à gérer."
                features={[
                  "Tout l'offre à 99€",
                  <strong key="s" className="text-primary font-medium">
                    Stèle en noyer massif gravée
                  </strong>,
                  "Livrée en 7-10 jours",
                  "Stèles additionnelles commandables",
                ]}
                cta="Choisir l'offre complète"
                onCtaClick={openWaitlist}
                ctaId="btn-pricing-249"
                trackValue={249}
                trackContentName="pricing_249"
                trackContentId="complete_tier"
              />
              <PricingCard
                variant="free"
                tier="Accès gratuit"
                price="€0"
                period="30 jours · Sans carte bancaire"
                desc="Pour déposer les premiers souvenirs et ressentir ce que le Sanctuaire peut faire pour votre famille."
                features={[
                  "Sanctuaire activé immédiatement",
                  "Les trois chambres — Mots, Photos, Voix",
                  "Accès famille complet",
                  "Le Parvis — condoléances 30 jours",
                ]}
                cta="Activer gratuitement"
                onCtaClick={openWaitlist}
                ctaId="btn-pricing-free"
                trackValue={0}
                trackContentName="pricing_free"
                trackContentId="free_tier"
              />

            </div>
          </Reveal>

          {/* Bande de réassurance */}
          <Reveal>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60">
              {[
                { Icon: Lock, title: "Vos données vous appartiennent", subtitle: "Exportables à tout moment" },
                { Icon: ShieldCheck, title: "Garanti 25 ans", subtitle: "Hébergement provisionné sur compte tiers dédié" },
                { Icon: Home, title: "Fabriqué en France", subtitle: "Ébénisterie française, noyer massif" },
              ].map(({ Icon, title, subtitle }) => (
                <div key={title} className="flex flex-col items-center text-center px-6 py-6">
                  <Icon className="w-5 h-5 text-primary mb-3" strokeWidth={1.25} />
                  <p className="text-[12px] uppercase tracking-[0.18em] text-primary font-medium">
                    {title}
                  </p>
                  <p className="text-[11px] italic text-muted-foreground mt-1.5">
                    {subtitle}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Addon stèles */}
          <Reveal>
            <div className="mt-10 rounded-3xl bg-muted border-[0.5px] border-border p-8 flex flex-col md:flex-row md:items-center gap-6 md:justify-between">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-primary mb-2">Stèles additionnelles</p>
                <h4 className="font-serif-display text-xl font-medium mb-1">Une stèle pour chaque foyer</h4>
                <p className="text-sm text-muted-foreground">
                  Noyer massif · Gravure identique · NFC relié au même Sanctuaire
                </p>
              </div>
              <div className="flex items-center gap-6">
                <p className="font-serif-display text-3xl font-bold">€179</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t-[0.5px] border-border">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <span className="font-serif-display text-lg font-bold text-foreground">Stela</span>
          <span className="italic text-muted-foreground">Mémorial d'intimité · Garanti 25 ans</span>
          <div className="flex items-center gap-6 text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              CGU
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
};

export default MemorialLP;
