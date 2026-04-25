import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Sparkles, Shield, Heart, CircleHelp } from "lucide-react";

// ── Design tokens (visual reference only) ──
const colorTokens = [
  { name: "Background", varName: "--background", hex: "#FAFAFA", swatch: "bg-background" },
  { name: "Foreground", varName: "--foreground", hex: "#2C2C2C", swatch: "bg-foreground" },
  { name: "Card", varName: "--card", hex: "#FAF9F6", swatch: "bg-card" },
  { name: "Primary (Or)", varName: "--primary", hex: "#D4AF37", swatch: "bg-primary" },
  { name: "Muted", varName: "--muted", hex: "#F5F5F4", swatch: "bg-muted" },
  { name: "Muted Foreground", varName: "--muted-foreground", hex: "#78716C", swatch: "bg-muted-foreground" },
  { name: "Accent", varName: "--accent", hex: "#D4AF37", swatch: "bg-accent" },
  { name: "Border", varName: "--border", hex: "#E7E5E4", swatch: "bg-border" },
  { name: "Destructive", varName: "--destructive", hex: "#EF4444", swatch: "bg-destructive" },
  { name: "Ceremony", varName: "--ceremony", hex: "#E7E5E4", swatch: "bg-ceremony" },
];

const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 py-16 border-t border-border/60">
    <div className="mb-10">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {id}
      </p>
      <h2 className="font-serif-display text-3xl md:text-4xl font-semibold text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground max-w-2xl font-sans-body">
          {subtitle}
        </p>
      )}
    </div>
    {children}
  </section>
);

const Block = ({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-2xl border border-border/60 bg-card p-6 ${className}`}>
    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
      {label}
    </p>
    {children}
  </div>
);

const navItems = [
  { id: "principes", label: "Principes" },
  { id: "couleurs", label: "Couleurs" },
  { id: "typographie", label: "Typographie" },
  { id: "boutons", label: "Boutons" },
  { id: "formulaires", label: "Formulaires" },
  { id: "cartes", label: "Cartes & Surfaces" },
  { id: "feedback", label: "Feedback" },
  { id: "navigation", label: "Navigation" },
  { id: "ombres", label: "Ombres & Effets" },
];

const DesignSystem = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans-body">
      {/* Hero */}
      <header className="border-b border-border/60">
        <div className="container mx-auto px-6 py-20 max-w-6xl">
          <Link
            to="/"
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Retour à Stela
          </Link>
          <h1 className="font-serif-display text-5xl md:text-6xl font-semibold mt-6 text-foreground">
            Design System
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Le langage visuel de Stela — « Quiet Luxury » au service du recueillement.
            Couleurs, typographies, composants et rituels qui structurent l'ensemble
            de la plateforme.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 max-w-6xl">
        {/* Principes */}
        <Section
          id="principes"
          title="Principes fondateurs"
          subtitle="Quatre règles qui guident chaque décision design sur la plateforme."
        >
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                t: "Less is more",
                d: "Suppression du superflu. Chaque élément doit servir le rituel.",
              },
              {
                t: "Quiet Luxury",
                d: "Bordures 0.5px, ombres diffuses, or mat. Jamais de brillance criarde.",
              },
              {
                t: "Émotion avant fonction",
                d: "Le rituel prime sur la performance. Les animations sont lentes (0.6s+).",
              },
              {
                t: "Sanctuaire privé",
                d: "Pas de publicité, pas de tracking, pas d'indexation SEO.",
              },
            ].map((p) => (
              <Block key={p.t} label="Principe">
                <h3 className="font-serif-display text-xl text-foreground mb-2">
                  {p.t}
                </h3>
                <p className="text-sm text-muted-foreground">{p.d}</p>
              </Block>
            ))}
          </div>
        </Section>

        {/* Couleurs */}
        <Section
          id="couleurs"
          title="Palette chromatique"
          subtitle="Tokens HSL définis dans index.css. À utiliser exclusivement via les classes Tailwind sémantiques (bg-primary, text-foreground, etc.)."
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {colorTokens.map((c) => (
              <div
                key={c.varName}
                className="rounded-2xl border border-border/60 overflow-hidden bg-card"
              >
                <div className={`h-24 ${c.swatch}`} />
                <div className="p-4">
                  <p className="font-medium text-sm text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">
                    {c.varName}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typographie */}
        <Section
          id="typographie"
          title="Typographie"
          subtitle="Playfair Display pour les titres et mots-clés italisés. Inter pour le corps de texte."
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Block label="Playfair Display — Serif">
              <h1 className="font-serif-display text-5xl text-foreground">Aa</h1>
              <p className="text-xs text-muted-foreground mt-3 font-mono">font-serif-display</p>
              <div className="mt-6 space-y-2">
                <p className="font-serif-display text-3xl">Titre H1 / 48px</p>
                <p className="font-serif-display text-2xl">Titre H2 / 32px</p>
                <p className="font-serif-display text-xl italic">Mot-clé italique</p>
              </div>
            </Block>
            <Block label="Inter — Sans">
              <p className="font-sans-body text-5xl text-foreground">Aa</p>
              <p className="text-xs text-muted-foreground mt-3 font-mono">font-sans-body</p>
              <div className="mt-6 space-y-2">
                <p className="text-base">Corps de texte / 16px — Lisibilité optimale.</p>
                <p className="text-sm text-muted-foreground">Texte secondaire / 14px</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Eyebrow / 12px
                </p>
              </div>
            </Block>
          </div>
        </Section>

        {/* Boutons */}
        <Section
          id="boutons"
          title="Boutons"
          subtitle="Le bouton « Bijou » or mat est l'action primaire. Les variantes outline et ghost servent les actions secondaires."
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Block label="Variantes principales">
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="gold" size="lg">Bouton Or (Bijou)</Button>
                <Button variant="goldOutline" size="lg">Or Outline</Button>
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
              </div>
            </Block>
            <Block label="Variantes utilitaires">
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </Block>
            <Block label="Tailles" className="md:col-span-2">
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="gold" size="sm">Small</Button>
                <Button variant="gold">Default</Button>
                <Button variant="gold" size="lg">
                  Large <ArrowRight />
                </Button>
                <Button variant="gold" size="icon">
                  <Sparkles />
                </Button>
              </div>
            </Block>
          </div>
        </Section>

        {/* Formulaires */}
        <Section
          id="formulaires"
          title="Formulaires"
          subtitle="Inputs sobres avec bordures 0.5px et focus or. Toujours associés à un Label."
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Block label="Champs texte">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ds-name">Nom du défunt</Label>
                  <Input id="ds-name" placeholder="Jean-Claude Dubois" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ds-msg">Message</Label>
                  <Textarea id="ds-msg" placeholder="Un mot, un souvenir…" rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Relation</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="famille">Famille</SelectItem>
                      <SelectItem value="ami">Ami(e)</SelectItem>
                      <SelectItem value="collegue">Collègue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Block>
            <Block label="Sélecteurs">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ds-switch">Modération a posteriori</Label>
                  <Switch id="ds-switch" defaultChecked />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="ds-cb" defaultChecked />
                  <Label htmlFor="ds-cb">J'accepte les conditions</Label>
                </div>
                <RadioGroup defaultValue="frene" className="space-y-2">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="frene" id="ds-r1" />
                    <Label htmlFor="ds-r1">Frêne — 199 €</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="noyer" id="ds-r2" />
                    <Label htmlFor="ds-r2">Noyer — 249 €</Label>
                  </div>
                </RadioGroup>
                <div>
                  <Label className="mb-3 block">Volume du souvenir vocal</Label>
                  <Slider defaultValue={[60]} max={100} step={1} />
                </div>
              </div>
            </Block>
          </div>
        </Section>

        {/* Cartes */}
        <Section
          id="cartes"
          title="Cartes & Surfaces"
          subtitle="Coins arrondis 2xl/3xl, bordures luxueuses, ombres diffuses."
        >
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="rounded-2xl border-luxury">
              <CardHeader>
                <CardTitle className="font-serif-display">Carte standard</CardTitle>
                <CardDescription>Surface neutre pour contenu général.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bordure 0.5px, fond card, padding généreux.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-luxury shadow-soft">
              <CardHeader>
                <CardTitle className="font-serif-display">Carte Soft</CardTitle>
                <CardDescription>Avec ombre diffuse.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  shadow-soft pour la mise en avant subtile.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-primary/40 shadow-gold bg-card">
              <CardHeader>
                <Badge className="w-fit bg-primary text-primary-foreground border-0">
                  Premium
                </Badge>
                <CardTitle className="font-serif-display mt-2">Carte Or</CardTitle>
                <CardDescription>Mise en avant prestige.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bordure or et shadow-gold pour les offres signature.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <Block label="Badges">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge className="bg-primary text-primary-foreground">Or</Badge>
              </div>
            </Block>
            <Block label="Avatars">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    ST
                  </AvatarFallback>
                </Avatar>
              </div>
            </Block>
            <Block label="Séparateur">
              <p className="text-sm text-muted-foreground">Avant</p>
              <Separator className="my-3" />
              <p className="text-sm text-muted-foreground">Après</p>
            </Block>
          </div>
        </Section>

        {/* Feedback */}
        <Section
          id="feedback"
          title="Feedback & États"
          subtitle="Communication discrète des états système."
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Block label="Alert">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertTitle>Sanctuaire privé</AlertTitle>
                <AlertDescription>
                  Vos souvenirs ne sont pas indexés sur Google.
                </AlertDescription>
              </Alert>
            </Block>
            <Block label="Progress">
              <p className="text-sm text-muted-foreground mb-3">
                Capacité utilisée : 320 / 1000 photos
              </p>
              <Progress value={32} />
            </Block>
            <Block label="Skeleton">
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-24 w-full rounded-xl" />
              </div>
            </Block>
            <Block label="Dialog">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="goldOutline">Ouvrir une modale</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-serif-display">
                      Confirmer l'action
                    </DialogTitle>
                    <DialogDescription>
                      Les modales reprennent le langage visuel : titre serif, description discrète.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </Block>
          </div>
        </Section>

        {/* Navigation */}
        <Section
          id="navigation"
          title="Navigation"
          subtitle="Onglets en pilule, accordéons sobres pour les FAQ."
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Block label="Tabs">
              <Tabs defaultValue="souvenirs">
                <TabsList>
                  <TabsTrigger value="souvenirs">Souvenirs</TabsTrigger>
                  <TabsTrigger value="histoire">Son histoire</TabsTrigger>
                  <TabsTrigger value="intime">Intime</TabsTrigger>
                </TabsList>
                <TabsContent value="souvenirs" className="text-sm text-muted-foreground mt-4">
                  Mur de souvenirs partagés par les proches.
                </TabsContent>
                <TabsContent value="histoire" className="text-sm text-muted-foreground mt-4">
                  Biographie et chronologie.
                </TabsContent>
                <TabsContent value="intime" className="text-sm text-muted-foreground mt-4">
                  Souvenirs réservés à la famille.
                </TabsContent>
              </Tabs>
            </Block>
            <Block label="Accordion">
              <Accordion type="single" collapsible>
                <AccordionItem value="a">
                  <AccordionTrigger className="font-serif-display">
                    <span className="flex items-center gap-2">
                      <CircleHelp className="h-4 w-4 text-primary" />
                      Combien de temps le mémorial est-il accessible ?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    25 ans d'hébergement inclus dans le paiement unique.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="b">
                  <AccordionTrigger className="font-serif-display">
                    Les invités doivent-ils créer un compte ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Non. Un simple QR Code suffit.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Block>
          </div>
        </Section>

        {/* Rituels signature */}
        <Section
          id="rituels"
          title="Rituels signature"
          subtitle="Composants emblématiques de Stela : interactions lentes, animations apaisantes."
        >
          <div className="grid md:grid-cols-3 gap-4">
            <Block label="Living Candle">
              <div className="flex flex-col items-center py-6">
                <LivingCandle size={48} count={12} />
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Allumer une bougie<br />
                  <span className="font-mono">animation gentleFlicker 4s</span>
                </p>
              </div>
            </Block>
            <Block label="Living Heart">
              <div className="flex flex-col items-center py-6">
                <LivingHeart size={48} count={8} />
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Soutenir un souvenir<br />
                  <span className="font-mono">animation gentleHeartbeat 4s</span>
                </p>
              </div>
            </Block>
            <Block label="Jewel Candle">
              <div className="flex flex-col items-center py-6">
                <JewelCandle size={64} lit />
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Variante figurative<br />
                  <span className="font-mono">candleFlicker 3s</span>
                </p>
              </div>
            </Block>
          </div>
        </Section>

        {/* Ombres & effets */}
        <Section
          id="ombres"
          title="Ombres & Effets"
          subtitle="Quatre niveaux de profondeur, plus le glassmorphism pour la navbar."
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-2xl bg-card shadow-soft flex items-end p-4">
              <p className="text-xs font-mono text-muted-foreground">shadow-soft</p>
            </div>
            <div className="aspect-square rounded-2xl bg-card shadow-gold flex items-end p-4">
              <p className="text-xs font-mono text-muted-foreground">shadow-gold</p>
            </div>
            <div className="aspect-square rounded-2xl bg-card shadow-golden-glow flex items-end p-4">
              <p className="text-xs font-mono text-muted-foreground">
                shadow-golden-glow
              </p>
            </div>
            <div className="aspect-square rounded-2xl border-luxury bg-card flex items-end p-4">
              <p className="text-xs font-mono text-muted-foreground">border-luxury</p>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Block label="Glassmorphism (navbar)">
              <div className="relative h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-card to-muted">
                <div className="absolute inset-x-0 top-0 glass h-12 flex items-center px-4">
                  <p className="font-serif-display text-foreground">Stela</p>
                </div>
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-3">
                .glass — backdrop-blur-xl + bg-background/70
              </p>
            </Block>
            <Block label="Texte gradient or">
              <p className="font-serif-display text-4xl text-gradient-gold">
                Mémoire éternelle
              </p>
              <p className="text-xs font-mono text-muted-foreground mt-3">
                .text-gradient-gold
              </p>
            </Block>
          </div>
        </Section>

        {/* Footer */}
        <footer className="py-16 border-t border-border/60 mt-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Stela — Design System
          </p>
          <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-2">
            <Heart className="h-3 w-3 text-primary" />
            Conçu avec soin pour le recueillement.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default DesignSystem;