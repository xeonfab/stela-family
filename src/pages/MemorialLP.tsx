import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Play, ShieldCheck, Users, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import jeanClaudePortrait from "@/assets/jean-claude-portrait-new.jpg";

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
    {subtitle && (
      <p className={`mt-6 text-lg ${dark ? "text-white/70" : "text-muted-foreground"}`}>{subtitle}</p>
    )}
  </div>
);

const Step = ({
  n,
  title,
  text,
}: {
  n: string;
  title: string;
  text: string;
}) => (
  <div className="text-center relative">
    <div className="relative mx-auto w-[52px] h-[52px] rounded-full border-[0.5px] border-border bg-card flex items-center justify-center mb-6 z-10">
      <span className="font-serif-display text-xl text-foreground">{n}</span>
    </div>
    <h3 className="font-serif-display text-xl font-medium mb-3">{title}</h3>
    <p className="text-[13px] text-muted-foreground leading-relaxed max-w-xs mx-auto">{text}</p>
  </div>
);

const MessageBox = ({
  eyebrow,
  text,
  subMessage,
}: {
  eyebrow: string;
  text: string;
  subMessage?: string;
}) => (
  <div className="p-3 mb-3">
    <p className="text-[7px] uppercase tracking-wider text-muted-foreground mb-1">{eyebrow}</p>
    <p className="font-serif-display text-[14px] italic text-foreground leading-snug">{text}</p>
    {subMessage && (
      <p className="text-[12px] text-muted-foreground italic mt-2 leading-relaxed">{subMessage}</p>
    )}
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
        <p className={`text-xs tracking-[0.25em] uppercase mb-3 ${isDark ? "text-primary" : "text-primary"}`}>
          {tier}
        </p>
        <p className="font-serif-display text-5xl font-bold mt-2">{price}</p>
        <p className={`text-xs mt-2 mb-6 ${isDark ? "text-white/60" : "text-muted-foreground"}`}>{period}</p>
        <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-white/75" : "text-muted-foreground"}`}>
          {desc}
        </p>
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
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* 1 — HERO */}
      <section className="relative bg-[#2C221B] text-[#FAFAFA] overflow-hidden min-h-screen flex items-center">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 60%)",
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
              Lui faire
              <br />
              une <em className="text-primary not-italic font-serif-display italic">place.</em>
            </h1>
            <div
              className="mt-8 space-y-1 font-serif-display italic text-[18px] lg:text-[22px]"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <p>Pour que sa mémoire ait un endroit.</p>
              <p>Pour que sa voix ne s'efface pas.</p>
            </div>
            <div className="mt-12 flex flex-col items-start gap-3">
              <Button variant="gold" className="px-8 py-6 text-base whitespace-nowrap" asChild>
                <a href="#pricing">Créer son Sanctuaire — gratuitement</a>
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
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow="Un héritage familial"
              title={
                <>
                  Honorer sa mémoire,{" "}
                  <em className="text-primary not-italic font-serif-display italic">ensemble.</em>
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
      <section className="bg-muted">
        <div className="grid lg:grid-cols-2 items-stretch">
          {/* Visual */}
          <div
            className="flex flex-col items-center justify-center py-20 lg:py-32 px-6"
            style={{ background: "linear-gradient(160deg, #8A7258 0%, #3A2A1A 100%)" }}
          >
            {/* Slot for product photo */}
            <div className="relative w-[140px] h-[240px] rounded-2xl bg-gradient-to-b from-[#5a3a22] via-[#3d2614] to-[#2a1a0e] shadow-2xl flex flex-col items-center justify-center text-center p-5">
              <p className="font-serif-display text-sm text-[#FAFAFA] font-bold leading-tight">
                Jean-Claude
                <br />
                Dubois
              </p>
              <div className="my-3 w-8 h-px bg-primary" />
              <p className="text-[9px] tracking-[0.3em] text-primary">1948 — 2024</p>
            </div>
            <p className="mt-8 text-sm italic text-white/60 font-serif-display">Posez votre téléphone</p>
            <p className="mt-12 text-[10px] tracking-[0.3em] uppercase text-white/40 text-center">
              Noyer massif · Gravure laser · NFC intégré
            </p>
          </div>

          {/* Text */}
          <div className="py-20 lg:py-32 px-6 lg:px-14">
            <Reveal>
              <div className="max-w-xl">
                <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6">Le geste & la matière</p>
                <h2 className="font-serif-display text-4xl lg:text-5xl font-bold leading-tight mb-6">
                  Touchez le bois.
                  <br />
                  <em className="text-primary not-italic font-serif-display italic">
                    Retrouvez leur voix.
                  </em>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-10">
                  Fini le granit froid des cimetières. Stela réinvente le recueillement à travers un objet
                  d'artisanat chaleureux, conçu pour vivre au cœur de votre maison.
                </p>
                <div className="space-y-6">
                  <SteleSpec
                    title="La noblesse du Noyer"
                    text="Un bloc massif façonné et gravé sur-mesure. Une présence discrète et élégante."
                  />
                  <SteleSpec
                    title="La magie du sans contact"
                    text="Un simple effleurement avec votre téléphone — le Sanctuaire s'ouvre."
                  />
                  <SteleSpec
                    title="Zéro friction"
                    text="Aucun mot de passe. Aucune application. Toute la famille y accède en toute facilité"
                  />
                </div>
              </div>
            </Reveal>
          </div>
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
              <em className="italic">« Stela est né d'un manque personnel, celui d'un endroit intime où revenir après avoir perdu quelqu'un.</em>{" "}
              Ce que vous déposez ici n'appartient à aucun réseau. Cela appartient à votre famille pour une génération. J'en suis personnellement le garant. »
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
                <span className="font-medium text-[#2C221B]">Fonds de pérennité 25 ans :</span> Le prix de votre Sanctuaire inclut le provisionnement immédiat de son hébergement pour une génération sur un compte tiers dédié.
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
                  « Ma mère avait préparé son Sanctuaire en secret. Après son départ, nous avons découvert des lettres qu'elle nous avait écrites, des photos de son enfance. C'est devenu notre refuge. »
                </p>
                <div className="mt-8 pt-5 border-t border-white/15">
                  <p className="font-medium">Sophie, 38 ans</p>
                  <p className="text-sm text-white/60 mt-1">
                    Sa fille — Sanctuaire ouvert depuis janvier 2025
                  </p>
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="relative p-8 lg:p-10 rounded-3xl bg-[#2C221B] text-[#FAFAFA] border-0 overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
                <p className="font-serif-display text-lg lg:text-xl italic leading-relaxed text-white/90 flex-1">
                  « Mon frère et moi avons créé le Sanctuaire de notre père ensemble. Chaque année, nous y ajoutons un souvenir. C'est notre façon de le garder vivant, ensemble. »
                </p>
                <div className="mt-8 pt-5 border-t border-white/15">
                  <p className="font-medium">Thomas, 52 ans</p>
                  <p className="text-sm text-white/60 mt-1">
                    Son fils — Sanctuaire ouvert depuis septembre 2024
                  </p>
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="relative p-8 lg:p-10 rounded-3xl bg-[#2C221B] text-[#FAFAFA] border-0 overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
                <p className="font-serif-display text-lg lg:text-xl italic leading-relaxed text-white/90 flex-1">
                  « Mon père a utilisé Stela pendant deux ans avant de partir. Ce qu'il y a laissé, c'est plus que tout ce qu'on aurait pu lui demander. On pose le téléphone sur la stèle et sa voix est là. C'est lui. »
                </p>
                <div className="mt-8 pt-5 border-t border-white/15">
                  <p className="font-medium">Marie, 46 ans</p>
                  <p className="text-sm text-white/60 mt-1">
                    Sa fille — le Sanctuaire est ouvert depuis novembre 2024
                  </p>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7 — PRICING */}
      <section id="pricing" className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-[820px]">
          <Reveal>
            <SectionHeader
              eyebrow="Nos offres garanties 25 ans"
              title={
                <>
                  Commencez{" "}
                  <em className="text-primary not-italic font-serif-display italic">premiers souvenirs</em>
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
                <p className="text-xs tracking-[0.25em] uppercase text-primary mb-2">
                  Stèles additionnelles
                </p>
                <h4 className="font-serif-display text-xl font-medium mb-1">
                  Une stèle pour chaque foyer
                </h4>
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
              La garantie 25 ans démarre à la date du décès. Vos données vous appartiennent et sont
              exportables à tout moment.
            </p>
          </Reveal>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="py-10 border-t-[0.5px] border-border">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <span className="font-serif-display text-lg font-bold text-foreground">Stela</span>
          <span className="italic text-muted-foreground">
            Mémorial d'intimité · Garanti 25 ans
          </span>
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