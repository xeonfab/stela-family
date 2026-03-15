import { Lock, Play, ArrowLeft, DownloadCloud, CheckCircle } from "lucide-react";
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
  ];

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
              <span className="text-xs text-stone-400">{Math.round(percent)}%</span>
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

        {/* ─── 2. Encart 90% ─── */}
        <section className="rounded-md bg-stone-50 px-6 py-5 space-y-3">
          <h2 className="font-serif text-lg text-stone-700 tracking-tight">
            Un héritage qui grandit
          </h2>
          <p className="text-sm text-stone-500 leading-relaxed">
            Les témoignages vidéo atteignent doucement la capacité initiale de cet écrin.
            Pour continuer à accueillir les souvenirs de vos proches sans limite de temps,
            vous ou un membre de votre famille pouvez débloquer l'Extension Héritage.
          </p>
          <Button
            variant="outline"
            className="rounded-full border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-stone-700 text-sm px-5 h-9 mt-1"
          >
            Découvrir l'Extension
          </Button>
        </section>

        {/* ─── 3. Vidéos récentes ─── */}
        <section className="space-y-4">
          <h2 className="font-serif text-lg text-stone-700 tracking-tight">
            Vidéos récentes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {videos.map((video, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-stone-200/50 bg-white shadow-sm">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.image}
                    alt={video.title}
                    className={`w-full h-full object-cover ${video.locked ? "blur-[6px] scale-105" : ""} transition-all duration-500`}
                  />

                  {video.locked ? (
                    <>
                      {/* Protective veil */}
                      <div className="absolute inset-0 bg-stone-100/30" />
                      {/* Lock icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center">
                          <Lock size={16} strokeWidth={1.5} className="text-stone-500" />
                        </div>
                      </div>
                      {/* Bottom banner */}
                      <div className="absolute bottom-0 inset-x-0 bg-stone-800/50 backdrop-blur-sm px-3 py-1.5">
                        <p className="text-[10px] text-white/80 tracking-wide text-center">
                          Vidéo préservée. Accès Héritage requis.
                        </p>
                      </div>
                    </>
                  ) : (
                    /* Play button for unlocked */
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
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4. Extension Héritage ─── */}
        <section className="rounded-xl border border-stone-200/50 bg-white px-6 py-8 text-center space-y-4 shadow-sm">
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400">Extension</p>
          <h2 className="font-serif text-xl text-stone-800 tracking-tight">
            L'Extension Héritage
          </h2>
          <div>
            <span className="text-2xl font-light text-stone-700">39 €</span>
            <span className="text-sm text-stone-400 ml-1">/ an</span>
          </div>
          <p className="text-xs text-stone-400">Sans engagement</p>
          <Button className="rounded-full bg-stone-800 hover:bg-stone-700 text-white text-sm px-6 h-10 mt-2">
            Soutenir la famille
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
