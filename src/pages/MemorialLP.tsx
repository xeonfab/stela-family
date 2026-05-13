import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Users, Lock, Check } from "lucide-react";

const Section = ({
  id,
  eyebrow,
  title,
  intro,
  dark = false,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: string;
  dark?: boolean;
  children?: React.ReactNode;
}) => (
  <section
    id={id}
    className={`py-24 lg:py-32 ${dark ? "bg-[#0E0E0E] text-[#FAFAFA]" : "bg-background text-foreground"}`}
  >
    <div className="container mx-auto px-6 max-w-6xl">
      {(eyebrow || title || intro) && (
        <div className="text-center max-w-3xl mx-auto mb-16">
          {eyebrow && (
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6">{eyebrow}</p>
          )}
          {title && (
            <h2 className="font-serif-display text-4xl lg:text-5xl font-bold leading-tight">
              {title}
            </h2>
          )}
          {intro && (
            <p className={`mt-6 text-lg ${dark ? "text-white/70" : "text-muted-foreground"}`}>
              {intro}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  </section>
);

const ChamberCard = ({
  symbol,
  order,
  title,
  text,
  footer,
}: {
  symbol: string;
  order: string;
  title: string;
  text: string;
  footer: string;
}) => (
  <Card className="p-10 rounded-3xl border-border/40 bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-golden-glow transition-shadow">
    <div className="text-primary text-2xl mb-6">{symbol}</div>
    <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">{order}</p>
    <h3 className="font-serif-display text-2xl font-bold mb-4">{title}</h3>
    <p className="text-muted-foreground leading-relaxed mb-6">{text}</p>
    <p className="text-sm italic text-foreground/70 border-t border-border/40 pt-4">{footer}</p>
  </Card>
);

const Step = ({ n, icon, title, text }: { n: string; icon: string; title: string; text: string }) => (
  <div className="text-center">
    <div className="mx-auto w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center mb-6">
      <span className="text-primary font-serif-display text-xl">{n}</span>
    </div>
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="font-serif-display text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">{text}</p>
  </div>
);

const SteleFeature = ({ title, text }: { title: string; text: string }) => (
  <div className="border-t border-white/15 pt-8">
    <div className="text-primary text-xl mb-4">◇</div>
    <h3 className="font-serif-display text-xl font-bold mb-3">{title}</h3>
    <p className="text-white/70 leading-relaxed">{text}</p>
  </div>
);

const PricingCard = ({
  eyebrow,
  name,
  price,
  meta,
  desc,
  features,
  cta,
  highlight = false,
}: {
  eyebrow: string;
  name: string;
  price: string;
  meta: string;
  desc: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}) => (
  <Card
    className={`p-8 lg:p-10 rounded-3xl flex flex-col ${
      highlight
        ? "border-primary/60 bg-card shadow-golden-glow"
        : "border-border/50 bg-card/70"
    }`}
  >
    <p className="text-xs tracking-[0.25em] uppercase text-primary mb-3">{eyebrow}</p>
    <h3 className="font-serif-display text-2xl font-bold mb-2">{name}</h3>
    <p className="font-serif-display text-5xl font-bold text-foreground mt-4">{price}</p>
    <p className="text-xs text-muted-foreground mt-2 mb-6">{meta}</p>
    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{desc}</p>
    <ul className="space-y-3 mb-8 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <span className="text-foreground/80" dangerouslySetInnerHTML={{ __html: f }} />
        </li>
      ))}
    </ul>
    <Button variant={highlight ? "gold" : "goldOutline"} className="w-full py-6">
      {cta}
    </Button>
  </Card>
);

const Testimonial = ({ quote, name, meta }: { quote: string; name: string; meta: string }) => (
  <Card className="p-8 lg:p-10 rounded-3xl border-border/40 bg-card/70">
    <p className="font-serif-display text-lg lg:text-xl italic leading-relaxed text-foreground/90">
      {quote}
    </p>
    <div className="mt-8 pt-6 border-t border-border/40">
      <p className="font-medium text-foreground">{name}</p>
      <p className="text-sm text-muted-foreground mt-1">{meta}</p>
    </div>
  </Card>
);

const MemorialLP = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-[#0E0E0E] text-[#FAFAFA] overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 60%)",
          }}
        />
        <div className="relative container mx-auto px-6 py-32 lg:py-44 text-center max-w-4xl">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-10">
            Stela — Après un départ
          </p>
          <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Lui faire
            <br />
            une <em className="text-primary not-italic font-serif-display italic">place.</em>
          </h1>
          <div className="mt-10 space-y-2 font-serif-display italic text-xl lg:text-2xl text-white/75">
            <p>Pour que sa mémoire ait un endroit.</p>
            <p>Pour que sa voix ne s'efface pas.</p>
          </div>
          <p className="mt-10 text-white/60 max-w-xl mx-auto">
            Un Sanctuaire privé en son nom. Une stèle en noyer gravée, livrée chez vous.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4">
            <Button variant="gold" className="px-10 py-7 text-base" asChild>
              <a href="#commande">Créer son Sanctuaire — gratuitement</a>
            </Button>
            <p className="text-xs text-white/50 tracking-wide">
              30 jours gratuits · Sans carte bancaire · Puis à partir de 89€
            </p>
          </div>
          <p className="mt-24 text-[10px] tracking-[0.4em] uppercase text-white/40">Découvrir</p>
        </div>
      </section>

      {/* LE SANCTUAIRE — 3 chambres */}
      <Section
        eyebrow="Le Sanctuaire"
        title={
          <>
            Un espace pour <em className="text-primary not-italic font-serif-display italic">tout ce qui mérite de rester.</em>
          </>
        }
        intro="Le Sanctuaire est l'espace numérique privé de Stela — accessible à toute votre famille, sans publicité, sans réseau social. Trois chambres pour déposer et retrouver."
      >
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <ChamberCard
            symbol="✦"
            order="Première chambre"
            title="Les Mots"
            text="Ses écrits retrouvés, les vôtres aussi. Des hommages. Des lettres. Les souvenirs que chacun veut déposer."
            footer="Toute la famille peut contribuer."
          />
          <ChamberCard
            symbol="◻"
            order="Deuxième chambre"
            title="Les Photos"
            text="Les photos retrouvées dans les albums, sur les téléphones — réunies en un seul endroit, accessibles à tous."
            footer="Photos partagées par toute la famille."
          />
          <ChamberCard
            symbol="◈"
            order="Troisième chambre"
            title="Les Voix & Vidéos"
            text="Des messages vocaux retrouvés sur un téléphone. Une vidéo de famille. Une voix enregistrée."
            footer="La trace la plus précieuse."
          />
        </div>
      </Section>

      {/* GESTE SIMPLE — 3 étapes */}
      <Section
        eyebrow="Un geste simple"
        title={
          <>
            Honorer sa mémoire, <em className="text-primary not-italic font-serif-display italic">ensemble.</em>
          </>
        }
        intro="Transformez le chagrin en partage. Stela n'est pas un outil, c'est le lieu où son histoire continue de s'écrire."
      >
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          <Step
            n="1"
            icon="📖"
            title="Ouvrez le Sanctuaire"
            text="En quelques minutes, créez un espace privé et intemporel dédié à son histoire, ses passions et son visage."
          />
          <Step
            n="2"
            icon="🤝"
            title="Réunissez ceux qui l'aimaient"
            text="Invitez le cercle familial et amical. Un lien privé suffit pour rassembler les cœurs autour de sa mémoire."
          />
          <Step
            n="3"
            icon="✦"
            title="Enrichissez sa mémoire"
            text="Laissez chacun déposer une photo oubliée, une anecdote précieuse, un message vocal. Son souvenir s'enrichit jour après jour."
          />
        </div>
      </Section>

      {/* EN PRATIQUE */}
      <Section
        eyebrow="Ce que votre famille vivra"
        title={
          <>
            Le Sanctuaire <em className="text-primary not-italic font-serif-display italic">en pratique.</em>
          </>
        }
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mockup */}
          <Card className="p-8 rounded-3xl border-border/50 bg-card shadow-sm">
            <div className="flex items-center gap-4 pb-6 border-b border-border/40">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center font-serif-display text-primary font-bold">
                JC
              </div>
              <div>
                <p className="font-serif-display text-lg font-bold">Jean-Claude Moreau</p>
                <p className="text-xs text-muted-foreground">12 mars 1952 — 8 novembre 2026</p>
                <p className="text-[10px] tracking-wider uppercase text-primary mt-1">
                  Marie et 3 autres
                </p>
              </div>
            </div>
            <div className="flex gap-6 mt-6 text-xs tracking-wider uppercase border-b border-border/40 pb-3">
              <span className="text-primary border-b-2 border-primary pb-2">Fil</span>
              <span className="text-muted-foreground">Sa vie</span>
              <span className="text-muted-foreground">Médias</span>
              <span className="text-muted-foreground">Ses lettres</span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
                <p className="text-[10px] tracking-widest uppercase text-primary mb-2">
                  Sa voix · Épinglé
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Mic size={16} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Message vocal à Marie</p>
                    <p className="text-xs text-muted-foreground">Jean-Claude · 2:14</p>
                  </div>
                </div>
                <p className="text-xs italic text-muted-foreground mt-3">
                  « Quand vous êtes prêt. Pas avant. »
                </p>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground">
                3 semaines après son départ
              </p>
              <div className="rounded-2xl border border-border/50 p-4">
                <p className="text-xs text-muted-foreground mb-1">Photo · Marie</p>
                <p className="text-sm">Retrouvée dans l'atelier</p>
              </div>
              <div className="rounded-2xl border border-border/50 p-4">
                <p className="text-xs text-muted-foreground mb-2">Mot · JC · Déposé de son vivant</p>
                <p className="text-sm font-serif-display italic">
                  « Mon jardin du Luberon. Ces matins-là m'appartenaient. »
                </p>
              </div>
              <div className="rounded-2xl border border-border/50 p-4">
                <p className="text-xs text-muted-foreground mb-1">
                  Voix · JC · Déposé de son vivant
                </p>
                <p className="text-sm">3:42</p>
              </div>
            </div>
          </Card>

          {/* Bullets */}
          <div className="space-y-10">
            <div>
              <Mic className="text-primary mb-4" />
              <h3 className="font-serif-display text-xl font-bold mb-3">Sa voix, épinglée en haut</h3>
              <p className="text-muted-foreground leading-relaxed">
                Le premier enregistrement vocal retrouvé est épinglé. La famille l'écoute quand elle est prête. Une présence douce, non imposée.
              </p>
            </div>
            <div>
              <Users className="text-primary mb-4" />
              <h3 className="font-serif-display text-xl font-bold mb-3">Chaque membre contribue</h3>
              <p className="text-muted-foreground leading-relaxed">
                Marie ajoute une photo retrouvée. Léo écrit un souvenir. Les contributions s'ajoutent aux traces qu'il a laissées de son vivant.
              </p>
            </div>
            <div>
              <Lock className="text-primary mb-4" />
              <h3 className="font-serif-display text-xl font-bold mb-3">Privé et sans publicité</h3>
              <p className="text-muted-foreground leading-relaxed">
                Aucun réseau social, aucune notification, aucune publicité. Le Sanctuaire est un espace d'intimité — uniquement pour les personnes invitées.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* LA STÈLE */}
      <Section
        dark
        eyebrow="Le geste & la matière"
        title={
          <>
            Touchez le bois. <br />
            <em className="text-primary not-italic font-serif-display italic">Retrouvez leur voix.</em>
          </>
        }
        intro="Fini le granit froid des cimetières. Stela réinvente le recueillement à travers un objet d'artisanat chaleureux, conçu pour vivre au cœur de votre maison."
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Stele visual */}
          <div className="flex justify-center">
            <div className="relative w-72 h-96 rounded-3xl bg-gradient-to-b from-[#5a3a22] via-[#3d2614] to-[#2a1a0e] shadow-[0_30px_80px_-20px_rgba(212,175,55,0.25)] flex flex-col items-center justify-center text-center p-10">
              <p className="font-serif-display text-2xl text-[#FAFAFA] font-bold">Jean-Claude</p>
              <p className="font-serif-display text-2xl text-[#FAFAFA] font-bold">Dubois</p>
              <div className="my-6 w-12 h-px bg-primary" />
              <p className="text-xs tracking-[0.3em] text-primary">1948 — 2024</p>
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-2xl mb-2">📱</p>
                <p className="text-[10px] tracking-widest uppercase text-white/50">
                  Posez votre téléphone
                </p>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
            <SteleFeature
              title="La noblesse du Noyer"
              text="Un bloc massif façonné et gravé sur-mesure. Une présence discrète et élégante dans votre salon — ni urne, ni tombe, ni gadget."
            />
            <SteleFeature
              title="La magie du sans contact"
              text="Une puce NFC est dissimulée sous le bois. Un simple effleurement avec votre téléphone suffit — le Sanctuaire s'ouvre instantanément."
            />
            <SteleFeature
              title="L'accès immédiat"
              text="Zéro mot de passe à retenir. Zéro application à télécharger. Toute la famille y accède — même les moins à l'aise avec la technologie."
            />
            <SteleFeature
              title="Plusieurs stèles, un seul Sanctuaire"
              text="Chaque foyer peut avoir sa propre stèle. Toutes ouvrent le même Sanctuaire. Une présence dans chaque maison de la famille."
            />
          </div>
        </div>
        <p className="text-center text-xs tracking-[0.3em] uppercase text-white/40 mt-16">
          Noyer massif · Gravure laser · NFC intégré
        </p>
      </Section>

      {/* PARVIS */}
      <Section
        eyebrow="Le Parvis"
        title={
          <>
            Un espace pour <em className="text-primary not-italic font-serif-display italic">les condoléances.</em>
          </>
        }
        intro="Pendant les 30 premiers jours, un espace ouvert est disponible pour les proches — sans compte requis. Après 30 jours, le Parvis se ferme. Le Sanctuaire privé prend toute la place."
      >
        <Card className="max-w-2xl mx-auto p-10 rounded-3xl border-border/40 bg-card/70">
          <ul className="space-y-4">
            {[
              "Accessible par QR code — aucun compte requis",
              "Messages de condoléances pendant 30 jours",
              "Distinct du Sanctuaire privé — les deux espaces ne se mélangent pas",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80">{t}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* MOT DU FONDATEUR */}
      <Section dark>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto rounded-full border border-primary flex items-center justify-center font-serif-display text-primary text-xl mb-6">
            F
          </div>
          <p className="font-medium">Fabien</p>
          <p className="text-xs text-white/50 tracking-wider mb-10">Fondateur de Stela</p>
          <p className="font-serif-display italic text-2xl lg:text-3xl leading-relaxed text-white/90">
            « Stela est né d'un manque personnel — celui d'un endroit où revenir après avoir perdu quelqu'un. »
          </p>
          <p className="mt-10 text-white/70 leading-relaxed">
            Quand mon grand-père est parti, j'aurais voulu retrouver sa voix. Pas une simulation, pas un algorithme — juste lui, tel qu'il était. J'aurais voulu que mes enfants puissent l'entendre un jour, même sans l'avoir connu. Stela est cet endroit. Pas une application. Pas un réseau social. Un espace intime, conçu pour durer.
          </p>
          <p className="mt-10 font-serif-display italic text-lg text-primary/90">
            « La voix est la première chose que le cerveau oublie. Quelques semaines après un départ, on commence à perdre le son exact des mots. »
          </p>
          <p className="mt-12 text-[10px] tracking-[0.3em] uppercase text-white/40">
            Stela — zéro simulation · zéro réseau social · zéro publicité
          </p>
        </div>
      </Section>

      {/* OFFRES */}
      <Section
        id="commande"
        eyebrow="Nos offres"
        title={
          <>
            Commencez <em className="text-primary not-italic font-serif-display italic">gratuitement.</em>
          </>
        }
        intro="Activez le Sanctuaire maintenant, sans carte bancaire. Prenez le temps de ressentir ce que Stela peut faire pour votre famille."
      >
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <PricingCard
            eyebrow="Accès gratuit"
            name="Découverte"
            price="0€"
            meta="30 jours · Sans carte bancaire"
            desc="Pour déposer les premiers souvenirs et ressentir ce que le Sanctuaire peut faire pour votre famille."
            features={[
              "Sanctuaire activé immédiatement",
              "Les trois chambres — Mots, Photos, Voix",
              "Accès famille complet",
              "Le Parvis — condoléances 30 jours",
              "Aucune carte bancaire requise",
            ]}
            cta="Activer gratuitement"
          />
          <PricingCard
            eyebrow="Le Sanctuaire"
            name="Sanctuaire permanent"
            price="89€"
            meta="Paiement unique · Garanti 25 ans"
            desc="Le Sanctuaire permanent pour toute la famille. Ajoutez une stèle quand vous le souhaitez."
            features={[
              "Sanctuaire privé — les trois chambres",
              "Accès famille complet · partout dans le monde",
              "Le Parvis — condoléances 30 jours",
              "5GB de stockage · Garanti 25 ans",
              "Export complet des données",
            ]}
            cta="Activer le Sanctuaire"
          />
          <PricingCard
            eyebrow="Tout compris"
            name="Le Sanctuaire + La stèle"
            price="249€"
            meta="Paiement unique · Stèle incluse"
            desc="Le Sanctuaire avec la stèle en noyer massif gravée et livrée chez vous. Rien à gérer."
            features={[
              "Tout ce qui est dans l'offre à 89€",
              "<strong>Stèle en noyer massif gravée</strong>",
              "Livrée à domicile en 7-10 jours",
              "NFC intégré — ouvre le Sanctuaire au toucher",
              "Stèles additionnelles commandables",
            ]}
            cta="Commander la stèle"
            highlight
          />
        </div>

        {/* Stèles additionnelles */}
        <Card className="mt-10 p-8 lg:p-10 rounded-3xl border-border/40 bg-card/70 flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-3">
              Stèles additionnelles
            </p>
            <h3 className="font-serif-display text-2xl font-bold mb-2">
              Une stèle pour chaque foyer qui veut qu'il soit présent
            </h3>
            <p className="text-muted-foreground">
              Noyer massif · Gravure identique · NFC relié au même Sanctuaire · Adresse au choix
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="font-serif-display text-4xl font-bold">159€</p>
            <Button variant="goldOutline" className="px-8 py-6">Commander</Button>
          </div>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto">
          La garantie 25 ans démarre à la date du décès. Vos données sont exportables à tout moment et vous appartiennent.
        </p>
      </Section>

      {/* TÉMOIGNAGES */}
      <Section
        eyebrow="Ils l'ont fait"
        title={
          <>
            Ce qu'ils ont <em className="text-primary not-italic font-serif-display italic">retrouvé.</em>
          </>
        }
      >
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <Testimonial
            quote="« Mon père a utilisé Stela pendant deux ans avant de partir. Ce qu'il y a laissé, c'est plus que tout ce qu'on aurait pu lui demander. On pose le téléphone sur la stèle et sa voix est là. C'est lui. »"
            name="Marie, 46 ans"
            meta="Sa fille — le Sanctuaire est ouvert depuis novembre 2024"
          />
          <Testimonial
            quote="« On a retrouvé un message vocal de lui sur le vieux téléphone de ma mère. On l'a déposé dans le Sanctuaire. Maintenant tous ses petits-enfants peuvent l'écouter. »"
            name="Sophie, 52 ans"
            meta="A commandé 3 semaines après le départ de son père"
          />
          <Testimonial
            quote="« Ma mère pose le téléphone sur la stèle chaque dimanche matin pour écouter la voix de mon père. C'est devenu son rituel. »"
            name="Thomas, 44 ans"
            meta="Stèle commandée il y a 6 mois · 3 foyers connectés"
          />
        </div>

        <p className="text-center font-serif-display italic text-xl text-foreground/80 mt-20 max-w-2xl mx-auto">
          « Ce que vous déposez ici appartient à votre famille pour une génération. Nous en sommes les gardiens. »
        </p>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-6">
          Stela · Mémorial d'intimité · Depuis 2026
        </p>
      </Section>

      <Footer />
    </div>
  );
};

export default MemorialLP;