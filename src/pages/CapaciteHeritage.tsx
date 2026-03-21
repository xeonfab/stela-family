import { Lock, Play, ArrowLeft, DownloadCloud, CheckCircle, Image, Film, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AdminSidebar from "@/components/AdminSidebar";
import hikingImg from "@/assets/jc-hiking.jpg";
import gardeningImg from "@/assets/jc-gardening.jpg";
import trumpetImg from "@/assets/jc-trumpet.jpg";

const CapaciteHeritage = () => {
  const [archiveRequested, setArchiveRequested] = useState(false);
  const used = 54;
  const total = 60;
  const percent = (used / total) * 100;

  const videos = [
    { title: "Randonnée en famille — Été 2019", duration: "12:34", image: hikingImg, locked: false },
    { title: "Au jardin — Printemps 2020", duration: "8:17", image: gardeningImg, locked: true },
    { title: "Concert de trompette — Noël 2018", duration: "15:42", image: trumpetImg, locked: true },
    { title: "Fête de Noël — Décembre 2017", duration: "6:05", image: hikingImg, locked: true },
    { title: "Anniversaire — Mars 2021", duration: "9:48", image: gardeningImg, locked: true },
  ];

  const lockedCount = videos.filter((v) => v.locked).length;

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 bg-[#FAFAF8]/80 backdrop-blur-md border-b border-stone-200/40">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-3">
            <AdminSidebar />
            <Link to="/memorial-admin" className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors">
              <ArrowLeft size={16} strokeWidth={1.5} />
              <span className="text-xs tracking-widest uppercase font-medium">Retour</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12 space-y-10">
        {/* ─── 1. Hero ─── */}
        <section className="space-y-6">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl text-stone-800 tracking-tight">
              Capacité & Héritage
            </h1>
            <p className="mt-2 text-sm text-stone-400 tracking-wide">
              Gérez l'espace alloué aux souvenirs de vos proches.
            </p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-stone-500 tracking-wide">
                <span className="font-medium text-stone-700">{used} minutes</span> sur {total} utilisées
              </span>
              <span className="text-xs text-stone-400">Espace initial : {Math.round(percent)}% atteint</span>
            </div>
            <div className="w-full h-[2px] rounded-full bg-stone-200/60">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${percent}%`,
                  background: "linear-gradient(90deg, hsl(38 35% 72%), hsl(38 40% 62%))",
                }}
              />
            </div>
          </div>
        </section>

        {/* ─── 2. Encart ─── */}
        <section className="rounded-xl border border-stone-200/50 bg-white px-6 py-5 space-y-3 shadow-sm">
          <h2 className="font-serif text-lg text-stone-700 tracking-tight">
            L'hommage s'agrandit.
          </h2>
          <p className="text-sm text-stone-500 leading-relaxed">
            Cet écrin a déjà accueilli de nombreux témoignages. Pour continuer à préserver
            chaque nouveau souvenir, débloquez l'Extension Héritage et offrez un espace
            à la hauteur de sa mémoire.
          </p>
        </section>

        {/* ─── 3. Vidéos récentes — Carrousel horizontal ─── */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <h2 className="font-serif text-lg text-stone-700 tracking-tight">
              Vidéos récentes
            </h2>
            {lockedCount > 0 && (
              <span className="text-xs text-stone-400">
                {lockedCount} souvenir{lockedCount > 1 ? "s" : ""} en attente
              </span>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-6 px-6">
            {videos.map((video, i) => (
              <div
                key={i}
                className="min-w-[250px] max-w-[250px] flex-shrink-0 snap-start rounded-xl overflow-hidden border border-stone-200/50 bg-white shadow-sm"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.image}
                    alt={video.title}
                    className={`w-full h-full object-cover ${video.locked ? "blur-[6px] scale-105" : ""} transition-all duration-500`}
                  />

                  {video.locked ? (
                    <>
                      <div className="absolute inset-0 bg-stone-100/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center">
                          <Lock size={16} strokeWidth={1.5} className="text-stone-500" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-stone-800/50 backdrop-blur-sm px-3 py-1.5">
                        <p className="text-[10px] text-white/80 tracking-wide text-center">
                          Souvenir en attente
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center">
                        <Play size={16} className="text-stone-700 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="px-3 py-2.5">
                  <p className={`text-xs font-medium leading-snug ${video.locked ? "text-stone-400" : "text-stone-700"}`}>
                    {video.title}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">{video.duration}</p>
                  {video.locked && (
                    <p className="text-[10px] text-stone-400/80 mt-1">
                      Débloquez l'extension pour visionner.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4. Extension Héritage ─── */}
        <section className="rounded-2xl border border-stone-200/50 bg-white px-8 py-10 text-center space-y-6 shadow-sm">
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400">Extension</p>
          <h2 className="font-serif text-2xl text-stone-800 tracking-tight">
            L'Extension Héritage
          </h2>
          <div>
            <span className="text-3xl font-light text-stone-700">49 €</span>
          </div>
          <p className="text-xs text-stone-400">
            Paiement unique. Préservation garantie 25 ans.
          </p>

          {/* Bénéfices */}
          <div className="flex flex-col items-start gap-3 max-w-xs mx-auto text-left pt-2">
            <div className="flex items-start gap-3">
              <Image size={18} strokeWidth={1.5} className="text-stone-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-stone-600">Jusqu'à 1 000 photos supplémentaires.</span>
            </div>
            <div className="flex items-start gap-3">
              <Film size={18} strokeWidth={1.5} className="text-stone-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-stone-600">60 minutes de témoignages vidéo en haute qualité.</span>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} strokeWidth={1.5} className="text-stone-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-stone-600">Hébergement sécurisé en France garanti 25 ans.</span>
            </div>
          </div>

          <Button className="rounded-full bg-stone-800 hover:bg-stone-700 text-white text-sm px-8 h-11 mt-2">
            Débloquer l'Extension
          </Button>
        </section>

        {/* ─── 5. Archive Numérique ─── */}
        <Separator className="bg-stone-200/60" />

        <section className="space-y-4 text-center pb-4">
          <h2 className="font-serif text-lg text-stone-700 tracking-tight">
            Votre mémoire vous appartient
          </h2>
          <p className="text-sm text-stone-400 leading-relaxed max-w-md mx-auto">
            Parce que cet héritage est le vôtre, vous avez la possibilité de récupérer à tout moment
            l'intégralité des témoignages, photos et vidéos déposés sur ce sanctuaire.
            Nous préparerons un dossier complet pour vous.
          </p>

          {archiveRequested ? (
            <div className="flex items-center justify-center gap-2 pt-2">
              <CheckCircle size={16} strokeWidth={1.5} className="text-teal-400" />
              <span className="text-sm text-teal-500">
                Archive en préparation. Un lien sécurisé vous sera envoyé par e-mail d'ici quelques minutes.
              </span>
            </div>
          ) : (
            <Button
              variant="ghost"
              onClick={() => setArchiveRequested(true)}
              className="text-stone-500 hover:text-stone-700 hover:bg-stone-100/60 text-sm gap-2 mt-1"
            >
              <DownloadCloud size={16} strokeWidth={1.5} />
              Préparer mon archive (.zip)
            </Button>
          )}
        </section>

        <div className="h-8" />
      </main>
    </div>
  );
};

export default CapaciteHeritage;