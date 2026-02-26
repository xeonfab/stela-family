import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Quote, Play, Music, Sparkles, Lock } from "lucide-react";
import jcHiking from "@/assets/jc-hiking.jpg";

type PendingMemory = {
  id: number;
  type: "photo" | "quote" | "audio";
  image?: string;
  text?: string;
  title?: string;
  duration?: string;
  author: string;
};

const initialPending: PendingMemory[] = [
  {
    id: 1,
    type: "photo",
    image: jcHiking,
    text: "Cette photo date de notre dernière escapade ensemble dans les Alpes. Tu étais si heureux ce jour-là, le vent dans les cheveux et le sourire aux lèvres.",
    author: "Nathalie",
  },
  {
    id: 2,
    type: "quote",
    text: "« Tu m'as appris que la vraie richesse, c'est le temps qu'on offre aux autres. Merci pour toutes ces heures passées à m'écouter et me conseiller. »",
    author: "Julien (Neveu)",
  },
  {
    id: 3,
    type: "quote",
    text: "« Chaque dimanche matin, il nous emmenait au marché. Il connaissait tous les commerçants par leur prénom. C'était sa manière d'aimer le monde. »",
    author: "Sophie",
  },
];

const PageModeration = () => {
  const [items, setItems] = useState(initialPending);
  const [fadingIds, setFadingIds] = useState<Set<number>>(new Set());

  const handleAction = (id: number) => {
    setFadingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setItems((prev) => prev.filter((m) => m.id !== id));
      setFadingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1]">
        <svg width="100%" height="100%">
          <filter id="grain-mod">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-mod)" />
        </svg>
      </div>

      {/* Back link */}
      <header className="py-6 px-6 max-w-3xl mx-auto">
        <Link
          to="/memorial-admin"
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Retour au sanctuaire</span>
        </Link>
      </header>

      {/* Title */}
      <div className="text-center px-6 pb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4">
          Hommages en attente
        </h1>
        <p className="text-stone-500 max-w-md mx-auto leading-relaxed text-sm">
          Choisissez de partager ces souvenirs avec tous les invités, ou de les conserver dans votre espace intime.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-2xl mx-auto px-6 pb-24 space-y-6">
        {items.length === 0 && (
          <div className="text-center py-16">
            <p className="font-serif text-lg text-stone-400 italic">Tous les hommages ont été traités.</p>
          </div>
        )}

        {items.map((memory) => (
          <div
            key={memory.id}
            className={`bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden transition-all duration-500 ${
              fadingIds.has(memory.id) ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {/* Card content */}
            <div className="p-6 space-y-4">
              {memory.type === "photo" && memory.image && (
                <img
                  src={memory.image}
                  alt={memory.text || ""}
                  className="w-full h-52 object-cover rounded-xl"
                  loading="lazy"
                />
              )}

              {memory.type === "quote" && (
                <Quote size={24} className="mx-auto text-[#D4AF37]/30" />
              )}

              {memory.text && (
                <p
                  className={`text-[#2C2C2C] leading-relaxed ${
                    memory.type === "quote"
                      ? "font-serif text-lg italic text-center"
                      : "text-sm"
                  }`}
                >
                  {memory.text}
                </p>
              )}

              <p className="text-xs text-stone-400">— {memory.author}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => handleAction(memory.id)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#D4AF37] text-white text-sm font-medium rounded-xl hover:bg-[#c9a432] transition-colors"
              >
                <Sparkles size={14} />
                Publier sur le mur
              </button>
              <button
                onClick={() => handleAction(memory.id)}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm text-[#2C2C2C] font-medium rounded-xl border border-stone-200 hover:border-stone-300 transition-colors bg-transparent"
              >
                <Lock size={14} />
                Garder intime
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageModeration;
