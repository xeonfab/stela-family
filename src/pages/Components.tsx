import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Custom components catalog (from src/components, excluding ui/)
import AddMemoryModal from "@/components/AddMemoryModal";
import AdminSidebar from "@/components/AdminSidebar";
import AudioPlayer from "@/components/AudioPlayer";
import CeremonyKit from "@/components/CeremonyKit";
import CompanionSteleCard from "@/components/CompanionSteleCard";
import FAQ from "@/components/FAQ";
import FeatureAIBiography from "@/components/FeatureAIBiography";
import FeatureCeremonyKit from "@/components/FeatureCeremonyKit";
import FeatureMemoryWall from "@/components/FeatureMemoryWall";
import FeatureTimeline from "@/components/FeatureTimeline";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import JewelCandle from "@/components/JewelCandle";
import LivingCandle from "@/components/LivingCandle";
import LivingHeart from "@/components/LivingHeart";
import LockedVideoCard from "@/components/LockedVideoCard";
import LockedVideoModal from "@/components/LockedVideoModal";
import { NavLink } from "@/components/NavLink";
import Navbar from "@/components/Navbar";
import PersonalEditionSheet from "@/components/PersonalEditionSheet";
import PremiumUpsell from "@/components/PremiumUpsell";
import Pricing from "@/components/Pricing";
import Privacy from "@/components/Privacy";
import ReportContentDialog from "@/components/ReportContentDialog";

type Entry = {
  name: string;
  description: string;
  render: () => JSX.Element;
  fullBleed?: boolean;
};

const ModalLauncher = ({
  label,
  children,
}: {
  label: string;
  children: (open: boolean, setOpen: (v: boolean) => void) => JSX.Element;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        {label}
      </Button>
      {children(open, setOpen)}
    </div>
  );
};

const sampleVideo = {
  thumbnail:
    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=60",
  title: "Anniversaire des 70 ans",
  duration: "2:14",
  author: "Marie Dubois",
};

const entries: Entry[] = [
  {
    name: "Navbar",
    description: "Barre de navigation principale du site.",
    render: () => <Navbar />,
    fullBleed: true,
  },
  {
    name: "HeroSection",
    description: "Section héro de la page d'accueil.",
    render: () => <HeroSection />,
    fullBleed: true,
  },
  {
    name: "Features",
    description: "Présentation des fonctionnalités principales.",
    render: () => <Features />,
    fullBleed: true,
  },
  {
    name: "FeatureAIBiography",
    description: "Bloc dédié à la rédaction biographique assistée.",
    render: () => <FeatureAIBiography />,
    fullBleed: true,
  },
  {
    name: "FeatureTimeline",
    description: "Bloc présentant la frise temporelle des souvenirs.",
    render: () => <FeatureTimeline />,
    fullBleed: true,
  },
  {
    name: "FeatureMemoryWall",
    description: "Bloc présentant le mur de souvenirs collaboratif.",
    render: () => <FeatureMemoryWall />,
    fullBleed: true,
  },
  {
    name: "FeatureCeremonyKit",
    description: "Mise en avant du Kit Cérémonie.",
    render: () => <FeatureCeremonyKit />,
    fullBleed: true,
  },
  {
    name: "CeremonyKit",
    description: "Section illustrée du contenu du Kit Cérémonie.",
    render: () => <CeremonyKit />,
    fullBleed: true,
  },
  {
    name: "Pricing",
    description: "Grille tarifaire (Essentiel, Frêne, Signature).",
    render: () => <Pricing />,
    fullBleed: true,
  },
  {
    name: "PremiumUpsell",
    description: "Encart d'upsell vers une formule supérieure.",
    render: () => <PremiumUpsell />,
    fullBleed: true,
  },
  {
    name: "Privacy",
    description: "Section dédiée à la confidentialité du sanctuaire.",
    render: () => <Privacy />,
    fullBleed: true,
  },
  {
    name: "FAQ",
    description: "Foire aux questions en accordéon.",
    render: () => <FAQ />,
    fullBleed: true,
  },
  {
    name: "Footer",
    description: "Pied de page du site.",
    render: () => <Footer />,
    fullBleed: true,
  },
  {
    name: "AudioPlayer",
    description: "Lecteur audio « Fil d'Or », minimaliste et doré.",
    render: () => (
      <div className="max-w-md">
        <AudioPlayer duration="1:24" current="0:32" />
      </div>
    ),
  },
  {
    name: "JewelCandle",
    description: "Icône bougie « bijou » en or brossé.",
    render: () => (
      <div className="flex items-center gap-6">
        <JewelCandle size={32} />
        <JewelCandle size={48} lit />
        <JewelCandle size={64} lit />
      </div>
    ),
  },
  {
    name: "LivingCandle",
    description: "Compteur de bougies allumées, animé.",
    render: () => <LivingCandle count={42} />,
  },
  {
    name: "LivingHeart",
    description: "Cœur vivant pour soutenir un souvenir.",
    render: () => <LivingHeart count={128} />,
  },
  {
    name: "CompanionSteleCard",
    description: "Carte d'invitation à découvrir l'Édition Personnelle.",
    render: () => (
      <div className="max-w-sm">
        <CompanionSteleCard />
      </div>
    ),
  },
  {
    name: "LockedVideoCard",
    description: "Vignette d'une vidéo verrouillée (Souvenir en attente).",
    render: () => (
      <div className="max-w-xs">
        <LockedVideoCard video={sampleVideo} onClick={() => {}} />
      </div>
    ),
  },
  {
    name: "NavLink",
    description: "Lien de navigation interne (wrapper react-router).",
    render: () => (
      <NavLink to="/" className="text-primary underline-offset-4 hover:underline">
        Aller à l'accueil
      </NavLink>
    ),
  },
  {
    name: "AdminSidebar",
    description: "Menu latéral administrateur (variante claire et sombre).",
    render: () => (
      <div className="flex items-center gap-4 p-4 rounded-xl bg-stone-100">
        <AdminSidebar variant="light" />
        <div className="p-4 rounded-xl bg-[#1a1a1a]">
          <AdminSidebar variant="dark" />
        </div>
      </div>
    ),
  },
  {
    name: "AddMemoryModal",
    description: "Modale d'ajout d'un souvenir (texte, photo, audio, vidéo).",
    render: () => (
      <ModalLauncher label="Ouvrir AddMemoryModal">
        {(open, setOpen) => (
          <AddMemoryModal open={open} onOpenChange={setOpen} />
        )}
      </ModalLauncher>
    ),
  },
  {
    name: "LockedVideoModal",
    description: "Modale d'aperçu d'une vidéo verrouillée.",
    render: () => (
      <ModalLauncher label="Ouvrir LockedVideoModal">
        {(open, setOpen) => (
          <LockedVideoModal
            open={open}
            onOpenChange={setOpen}
            video={sampleVideo}
            isGarant={false}
          />
        )}
      </ModalLauncher>
    ),
  },
  {
    name: "PersonalEditionSheet",
    description: "Tiroir d'achat de l'Édition Personnelle (Frêne / Noyer).",
    render: () => (
      <ModalLauncher label="Ouvrir PersonalEditionSheet">
        {(open, setOpen) => (
          <PersonalEditionSheet open={open} onClose={() => setOpen(false)} />
        )}
      </ModalLauncher>
    ),
  },
  {
    name: "ReportContentDialog",
    description: "Boîte de dialogue de signalement de contenu (LCEN).",
    render: () => (
      <ModalLauncher label="Ouvrir ReportContentDialog">
        {(open, setOpen) => (
          <ReportContentDialog open={open} onOpenChange={setOpen} />
        )}
      </ModalLauncher>
    ),
  },
];

const Components = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/60 bg-card">
        <div className="container mx-auto px-6 py-12 flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Catalogue
          </p>
          <h1 className="font-serif-display text-4xl md:text-5xl font-semibold">
            Composants
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Inventaire vivant de l'ensemble des composants présents dans le
            dossier <code className="px-1.5 py-0.5 rounded bg-muted text-foreground/80">src/components</code>.
            Chaque entrée présente une description succincte et un aperçu fonctionnel.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/design-system">Voir le design system</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Index */}
      <nav className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {entries.map((e) => (
            <a
              key={e.name}
              href={`#${e.name}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {e.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Catalogue */}
      <div className="container mx-auto px-6 py-12 space-y-16">
        {entries.map((entry) => (
          <section
            key={entry.name}
            id={entry.name}
            className="scroll-mt-24 space-y-4"
          >
            <div className="flex flex-col gap-1">
              <h2 className="font-serif-display text-2xl md:text-3xl font-semibold">
                {entry.name}
              </h2>
              <p className="text-sm text-muted-foreground max-w-3xl">
                {entry.description}
              </p>
            </div>

            <div
              className={
                entry.fullBleed
                  ? "rounded-2xl border border-border/60 overflow-hidden bg-background"
                  : "rounded-2xl border border-border/60 bg-card p-8"
              }
            >
              {entry.fullBleed ? (
                <div className="max-h-[700px] overflow-auto">
                  {entry.render()}
                </div>
              ) : (
                entry.render()
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Components;