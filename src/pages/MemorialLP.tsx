import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Play, ShieldCheck, Users, Quote, Ruler, Hand, Leaf, Feather } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import jeanClaudePortrait from "@/assets/jean-claude-portrait-new.jpg";
import steleObjet from "@/assets/stela-objet.png";
import steleNoyer from "@/assets/stele-noyer-nfc.png";

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
}: {
  tier: string;
  price: string;
  period: string;
  desc: string;
  features: React.ReactNode[];
  cta: string;
  variant: "free" | "main" | "dark";
}) => {
  const isDark = variant === "dark";
  const isMain = variant === "main";
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
          Tout compris
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
          variant={isMain ? "gold" : "goldOutline"}
          className={`w-full py-6 ${isDark ? "border-primary text-primary hover:bg-primary/10" : ""}`}
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
      <div className="h-full flex flex-col justify-center px-10 py-14 lg:px-14">
        <Quote size={32} className="text-primary/70 mb-8" />
        <p className="font-serif-display italic text-2xl lg:text-3xl text-[#FAFAFA] leading-snug">
          « Il avait toujours cette phrase, quand on doutait :{" "}
          <span className="text-primary">"On verra demain, mais on n'oublie pas aujourd'hui."</span> »
        </p>
        <div className="mt-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40" />
          <div>
            <p className="text-[13px] text-[#FAFAFA] font-medium">Claire, sa fille</p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/40">Déposé un mardi</p>
          </div>
        </div>
      </div>
    );
  }
  if (active === "photos") {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-12 lg:px-12">
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-6">Été 1987 — Bretagne</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="aspect-square rounded-xl bg-gradient-to-br from-[#8A7258]/60 to-[#3A2A1A]/80 col-span-2 row-span-2" />
          <div className="aspect-square rounded-xl bg-gradient-to-br from-[#5a3a22]/70 to-[#2a1a0e]/90" />
          <div className="aspect-square rounded-xl bg-gradient-to-br from-[#6b4a32]/60 to-[#1a1208]/80" />
          <div className="aspect-[2/1] rounded-xl bg-gradient-to-br from-[#3A2D22]/80 to-[#1a1208]/90 col-span-3 flex items-center justify-center">
            <Play size={18} className="text-primary/80 ml-0.5" />
          </div>
        </div>
        <p className="mt-6 text-[12px] text-white/50 italic">12 souvenirs · partagés par 4 proches</p>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col justify-center px-10 py-14 lg:px-14">
      <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-6">Message vocal</p>
      <p className="font-serif-display italic text-xl text-[#FAFAFA] mb-8">« Joyeux anniversaire ma chérie… »</p>
      <div className="flex items-center gap-4">
        <button className="w-12 h-12 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center flex-shrink-0">
          <Play size={16} className="text-primary ml-0.5" />
        </button>
        <div className="flex-1 flex items-end gap-[3px] h-10">
          {Array.from({ length: 38 }).map((_, i) => (
            <span
              key={i}
              className="flex-1 bg-primary/60 rounded-full"
              style={{ height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%` }}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between text-[11px] text-white/50">
        <span>0:00</span>
        <span>Déposé par Pierre, son frère</span>
        <span>0:42</span>
      </div>
    </div>
  );
};

const SanctuaireSection = () => {
  const [active, setActive] = useState<PillarId>("mots");
  return (
    <>
      {/* NIVEAU 1 — EXPLORATION */}
      <section className="py-24 bg-background lg:py-[64px]">
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6">Le Sanctuaire</p>
              <h2 className="font-serif-display text-4xl lg:text-5xl font-bold leading-tight">
                Trois traces.
                <br />
                <em className="text-primary not-italic font-serif-display italic">Une seule mémoire.</em>
              </h2>
              <p className="mt-6 text-[15px] text-muted-foreground max-w-[520px] mx-auto">
                Explorez ce qu'un Sanctuaire conserve, pour toujours, à l'abri du temps.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-stretch">
              {/* Navigation */}
              <nav className="flex flex-col">
                {PILLARS.map((p, i) => {
                  const isActive = p.id === active;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActive(p.id)}
                      className={`text-left py-6 border-t-[0.5px] border-border/60 transition-colors group ${
                        i === PILLARS.length - 1 ? "border-b-[0.5px]" : ""
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`text-[10px] tracking-[0.3em] tabular-nums transition-colors ${
                            isActive ? "text-primary" : "text-muted-foreground/60"
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={`font-serif-display text-2xl lg:text-3xl transition-colors ${
                            isActive ? "text-foreground" : "text-muted-foreground/50 group-hover:text-foreground/70"
                          }`}
                        >
                          {p.label}
                        </span>
                      </div>
                      {isActive && <p className="mt-2 ml-8 text-[12px] text-muted-foreground italic">{p.eyebrow}</p>}
                    </button>
                  );
                })}
              </nav>

              {/* Visualisation */}
              <div
                className="rounded-3xl overflow-hidden min-h-[420px] lg:min-h-[480px] relative shadow-2xl"
                style={{ background: "linear-gradient(135deg, #2C221B 0%, #1a1208 100%)" }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: "radial-gradient(ellipse at top right, hsl(var(--primary) / 0.15) 0%, transparent 60%)",
                  }}
                />
                <div key={active} className="relative h-full animate-in fade-in duration-500">
                  <PillarVisual active={active} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NIVEAU 2 — COLLABORATION */}
      <section className="py-20 lg:py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-3xl">
          <Reveal>
            <div className="text-center">
              <Users size={24} className="text-primary mx-auto mb-6" strokeWidth={1.25} />
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6">Un Hommage Partagé</p>
              <h2 className="font-serif-display text-3xl lg:text-4xl font-bold leading-tight">
                Construisez son sanctuaire <em className="text-primary not-italic italic">ensemble.</em>
              </h2>
               <p className="mt-6 text-[15px] text-muted-foreground leading-relaxed max-w-[560px] mx-auto">
                 Un espace intime et privé pour réunir ceux qui l'ont connu. Invitez ses proches en un clic : Stela les guide pas à pas avec des questions douces pour les aider à trouver les mots, raviver les souvenirs et partager leurs photos depuis leur téléphone.
               </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

const _MemorialLPInner = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* 1 — HERO */}
      <section className="relative bg-[#2C221B] text-[#FAFAFA] overflow-hidden min-h-screen flex items-center">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 60%)",
          }}
        />
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT — text */}
          <div className="lg:col-span-7">
            <p className="text-[10px] tracking-[0.25em] uppercase text-primary mb-8 font-sans">Après un départ</p>
            <h1
              className="font-serif-display font-normal leading-[1.05] text-white/95"
              style={{ fontSize: "clamp(44px, 6vw, 72px)" }}
            >
              Gardez sa mémoire
              <br />
              <em className="text-primary not-italic font-serif-display italic">vivante</em>
            </h1>
            <div
              className="mt-8 font-serif-display italic text-[18px] lg:text-[22px] max-w-lg"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <p>Ne laissez aucun souvenir s'effacer. Créez un espace intime pour rassembler sa vie, ses mots et sa voix, avec ceux qui l'ont connu, pour les générations à venir.</p>
            </div>
            <div className="mt-12 flex flex-col items-start gap-3">
              <Button variant="gold" className="px-8 py-6 text-base whitespace-nowrap" asChild>
                <a href="#pricing">Créer son Sanctuaire</a>
              </Button>
              <p className="text-[11px] tracking-wide" style={{ color: "rgba(255,255,255,0.35)" }}>
                30 jours d'essai libre · Puis 89€, garanti pour une génération (25 ans)
              </p>
            </div>
          </div>

          {/* RIGHT — visual collage */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px]">
              {/* Main portrait */}
              <div className="rounded-3xl overflow-hidden border-[0.5px] border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                <img
                  src={jeanClaudePortrait}
                  alt="Portrait — Jean-Claude Dubois"
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
              </div>

              {/* Name & quote card */}
              <div className="mt-5 rounded-2xl border-[0.5px] border-white/10 bg-white/5 backdrop-blur-md px-5 py-4 text-center">
                <p className="font-serif-display text-lg text-white/90">Jean-Claude Dubois</p>
                <p className="text-[10px] tracking-[0.25em] text-primary/80 mt-1">1948 — 2024</p>
                <p
                  className="mt-3 font-serif-display italic text-[13px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  « Il cultivait son jardin comme ses amitiés. »
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[9px] tracking-[0.3em] uppercase">Découvrir</span>
          <span className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* 2 — HONORER SA MÉMOIRE */}
      <section className="py-24 bg-background lg:py-[64px]">
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow="Un héritage familial"
              title={
                <>
                  Honorer sa mémoire, <em className="text-primary not-italic font-serif-display italic">ensemble.</em>
                </>
              }
            />
          </Reveal>
          <Reveal>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {/* connector line */}
              <div
                className="hidden md:block absolute left-[16%] right-[16%] top-[26px] border-t-[0.5px] border-border"
                aria-hidden
              />
              <Step
                n="1"
                title="Ouvrez le Sanctuaire"
                text="En quelques minutes, créez un espace privé dédié à son histoire, ses passions et son visage."
              />
              <Step
                n="2"
                title="Réunissez ceux qui l'aimaient"
                text="Invitez le cercle familial. Un lien privé suffit pour rassembler les cœurs autour de sa mémoire."
              />
              <Step
                n="3"
                title="Enrichissez sa mémoire"
                text="Chacun dépose une photo oubliée, une anecdote, un message vocal. Son souvenir s'enrichit jour après jour."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 — LE SANCTUAIRE : EXPLORATION + COLLABORATION + ONBOARDING */}
      <SanctuaireSection />

      {/* 4 — LA STÈLE */}
      <section className="bg-muted py-24 lg:py-32">
        <div className="container mx-auto px-6">
          {/* Header */}
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6">Le geste & la matière</p>
              <h2 className="font-serif-display text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Touchez le bois.{" "}
                <em className="text-primary not-italic font-serif-display italic">Retrouvez sa voix.</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Le recueillement s'invite chez vous. Stela donne une présence physique aux souvenirs à travers un objet d'artisanat chaleureux, conçu pour vivre au cœur de votre foyer.
              </p>
            </div>
          </Reveal>

          {/* Gallery */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mt-16 lg:mt-24">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-background">
                <img
                  src={steleObjet}
                  alt="Stèle en noyer massif gravée avec téléphone NFC en approche"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-background">
                <img
                  src={steleNoyer}
                  alt="Verso minimaliste de la Stela montrant la texture du bois"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          {/* Specs grid */}
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mt-20 lg:mt-28">
              {[
                {
                  Icon: Ruler,
                  title: "Une présence rassurante",
                  text: "Avec ses 15 cm de hauteur et sa belle épaisseur (4,5 cm), la Stela possède un ancrage parfait. Conçue pour tenir debout avec une stabilité absolue.",
                },
                {
                  Icon: Hand,
                  title: "Conçu pour être touché",
                  text: "La mémoire passe aussi par les mains. Chaque arête est méticuleusement adoucie par un délicat biseau pour offrir une prise en main douce et réconfortante.",
                },
                {
                  Icon: Leaf,
                  title: "Matières nobles et vivantes",
                  text: "Façonnée dans un bois massif de Noyer ou de Frêne, sans vernis froid. Une simple huile naturelle mate nourrit la matière et préserve sa chaleur authentique.",
                },
                {
                  Icon: Feather,
                  title: "Une empreinte inaltérable",
                  text: "Le nom de votre proche est finement creusé dans la matière. Une typographie intemporelle et élégante, pour une trace qui traverse le temps.",
                },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="flex flex-col">
                  <Icon className="w-6 h-6 text-primary mb-5" strokeWidth={1.25} />
                  <h4 className="font-serif-display text-lg font-semibold mb-3 text-foreground">{title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 — FONDATEUR & GARANTIE */}
      <section className="py-24 lg:py-32 bg-[hsl(0,0%,98%)]">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <Reveal>
            <div className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-muted to-border shadow-soft mb-8 overflow-hidden flex items-center justify-center font-serif-display text-2xl text-muted-foreground">
              F
            </div>
            <p className="font-serif-display text-2xl md:text-4xl text-[#2C221B] leading-relaxed">
              <em className="italic">
                « Stela est né d'un manque personnel, celui d'un endroit intime où revenir après avoir perdu quelqu'un.
              </em>{" "}
              Cet endroit appartient à votre famille pour une génération. J'en suis personnellement le garant. »
            </p>
            <div className="mt-8">
              <p className="font-sans text-lg font-semibold text-[#2C221B]">Fabien</p>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
                Fondateur de Stela
              </p>
            </div>
            <div className="mt-16 max-w-xl mx-auto bg-[hsl(40,33%,97%)] border border-[hsl(30,10%,88%)] rounded-2xl p-5 flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 shrink-0 text-[#D4AF37] mt-0.5" />
              <p className="font-sans text-sm text-left text-muted-foreground leading-relaxed">
                <span className="font-medium text-[#2C221B]">Fonds de pérennité 25 ans :</span> Le prix de votre
                Sanctuaire inclut le provisionnement immédiat de son hébergement pour une génération sur un compte tiers
                dédié.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6 — TÉMOIGNAGES */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid md:grid-cols-3 gap-6">
            <Reveal>
              <Card className="relative p-8 lg:p-10 rounded-3xl bg-[#2C221B] text-[#FAFAFA] border-0 overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
                <p className="font-serif-display text-lg lg:text-xl italic leading-relaxed text-white/90 flex-1">
                  « Ma mère avait préparé son Sanctuaire en secret. Après son départ, nous avons découvert des lettres
                  qu'elle nous avait écrites, des photos de son enfance. C'est devenu notre refuge. »
                </p>
                <div className="mt-8 pt-5 border-t border-white/15">
                  <p className="font-medium">Sophie, 38 ans</p>
                  <p className="text-sm text-white/60 mt-1">Sa fille — Sanctuaire ouvert depuis janvier 2025</p>
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="relative p-8 lg:p-10 rounded-3xl bg-[#2C221B] text-[#FAFAFA] border-0 overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
                <p className="font-serif-display text-lg lg:text-xl italic leading-relaxed text-white/90 flex-1">
                  « Mon frère et moi avons créé le Sanctuaire de notre père ensemble. Chaque année, nous y ajoutons un
                  souvenir. C'est notre façon de le garder vivant, ensemble. »
                </p>
                <div className="mt-8 pt-5 border-t border-white/15">
                  <p className="font-medium">Thomas, 52 ans</p>
                  <p className="text-sm text-white/60 mt-1">Son fils — Sanctuaire ouvert depuis septembre 2024</p>
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="relative p-8 lg:p-10 rounded-3xl bg-[#2C221B] text-[#FAFAFA] border-0 overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
                <p className="font-serif-display text-lg lg:text-xl italic leading-relaxed text-white/90 flex-1">
                  « Mon père a utilisé Stela pendant deux ans avant de partir. Ce qu'il y a laissé, c'est plus que tout
                  ce qu'on aurait pu lui demander. On pose le téléphone sur la stèle et sa voix est là. C'est lui. »
                </p>
                <div className="mt-8 pt-5 border-t border-white/15">
                  <p className="font-medium">Marie, 46 ans</p>
                  <p className="text-sm text-white/60 mt-1">Sa fille — le Sanctuaire est ouvert depuis novembre 2024</p>
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
                  Ajoutez vos <em className="text-primary not-italic font-serif-display italic">premiers souvenirs</em>
                </>
              }
              subtitle="Activez le Sanctuaire maintenant, sans carte bancaire. Prenez le temps de ressentir."
            />
          </Reveal>
          <Reveal>
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
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
              />
              <PricingCard
                variant="main"
                tier="Le Sanctuaire"
                price="€89"
                period="Paiement unique · Garanti 25 ans"
                desc="Le Sanctuaire permanent pour toute la famille. Ajoutez une stèle quand vous le souhaitez."
                features={[
                  "Tout l'accès gratuit, pour toujours",
                  "5GB de stockage · Garanti 25 ans",
                  "Export complet des données",
                  "Stèle commandable à tout moment",
                ]}
                cta="Activer le Sanctuaire"
              />
              <PricingCard
                variant="dark"
                tier="Le Sanctuaire + La stèle"
                price="€249"
                period="Paiement unique · Stèle incluse"
                desc="Le Sanctuaire avec la stèle en noyer gravée, livrée chez vous. Rien à gérer."
                features={[
                  "Tout l'offre à 89€",
                  <strong key="s" className="text-primary font-medium">
                    Stèle en noyer massif gravée
                  </strong>,
                  "Livrée en 7-10 jours",
                  "Stèles additionnelles commandables",
                ]}
                cta="Commander la stèle"
              />
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
                <p className="font-serif-display text-3xl font-bold">€159</p>
                <Button variant="goldOutline" className="px-6 py-5">
                  Commander
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-8 max-w-2xl mx-auto">
              La garantie 25 ans démarre à la date du décès. Vos données vous appartiennent et sont exportables à tout
              moment.
            </p>
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
    </div>
  );
};

export default MemorialLP;
