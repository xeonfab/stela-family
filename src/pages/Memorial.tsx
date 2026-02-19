import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Feather, Heart, Quote, Music, Camera, BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import portraitImg from "@/assets/jean-claude-portrait.jpg";

/* ─── Memory Card Data ─── */
const memories = [
  {
    type: "photo" as const,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop",
    text: "Chaque rose plantée ici porte ton souvenir. Tu me manques au quotidien.",
    author: "Marie",
    hearts: 34,
  },
  {
    type: "audio" as const,
    title: "Souvenir vocal de Léo",
    duration: "1:24",
    author: "Léo",
    hearts: 18,
  },
  {
    type: "quote" as const,
    text: "« Allez, on ouvre une bonne bouteille ! » — Ta phrase fétiche qui résonnera toujours.",
    author: "Michel",
    hearts: 52,
  },
  {
    type: "video" as const,
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
    title: "Noël 2018 — Son solo de saxo",
    author: "Famille Dubois",
    hearts: 41,
  },
];

/* ─── Timeline Data ─── */
const timeline = [
  {
    year: "1948",
    title: "Naissance en Auvergne",
    desc: "Un matin de printemps, au cœur des volcans endormis, une vie commence.",
  },
  {
    year: "1972",
    title: "La rencontre avec Marie",
    desc: "Un regard croisé dans une librairie de Clermont-Ferrand. Le coup de foudre fut immédiat.",
  },
  {
    year: "1985",
    title: "Premier poste de professeur",
    desc: "Il entre dans sa classe d'histoire pour la première fois. Des centaines d'élèves suivront.",
  },
  {
    year: "2010",
    title: "La retraite et le jardin parfait",
    desc: "Enfin le temps de cultiver ses roses, ses amitiés et le bonheur simple d'être grand-père.",
  },
];

/* ─── Audio Waveform SVG ─── */
const AudioWaveform = () => (
  <div className="flex items-end gap-[2px] h-8">
    {[3, 5, 8, 4, 7, 10, 6, 3, 8, 5, 9, 4, 7, 3, 6, 8, 5, 3, 7, 4, 9, 6, 3, 5, 8].map((h, i) => (
      <div key={i} className="w-[3px] rounded-full bg-amber-600/40" style={{ height: `${h * 3}px` }} />
    ))}
  </div>
);

const Memorial = () => {
  const [activeTab, setActiveTab] = useState("souvenirs");

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* ─── Subtle grain overlay ─── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50">
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* ─── Top bar ─── */}
      <header className="py-4 px-6 flex items-center justify-between">
        <Link to="/" className="font-serif text-lg tracking-wide text-stone-400 hover:text-stone-600 transition-colors">
          Stela
        </Link>
      </header>

      {/* ─── Sacred Header ─── */}
      <section className="pt-8 pb-12 px-6 text-center">
        {/* Portrait */}
        <div className="mx-auto w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-[3px] border-amber-600/20 shadow-[0_0_60px_-10px_rgba(212,175,55,0.2)] mb-8">
          <img src={portraitImg} alt="Jean-Claude Dubois" className="w-full h-full object-cover" />
        </div>

        {/* Name & Dates */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-3">
          Jean-Claude Dubois
        </h1>
        <p className="text-sm tracking-[0.3em] uppercase text-stone-400 mb-8">1948 — 2024</p>

        {/* Epitaph */}
        <p className="font-serif italic text-lg md:text-xl text-stone-500 max-w-xl mx-auto leading-relaxed">
          « Il cultivait son jardin comme il cultivait ses amitiés&nbsp;: avec patience, lumière et amour. »
        </p>
      </section>

      {/* ─── Sticky Tabs ─── */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-0 z-40 bg-[#FAF9F6]/80 backdrop-blur-xl border-b border-stone-200/50">
          <div className="max-w-3xl mx-auto px-6">
            <TabsList className="w-full bg-transparent h-14 gap-0">
              <TabsTrigger
                value="souvenirs"
                className="flex-1 h-full rounded-none border-b-2 border-transparent text-stone-400 data-[state=active]:text-amber-700 data-[state=active]:border-amber-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium text-sm transition-colors"
              >
                Souvenirs
              </TabsTrigger>
              <TabsTrigger
                value="biographie"
                className="flex-1 h-full rounded-none border-b-2 border-transparent text-stone-400 data-[state=active]:text-amber-700 data-[state=active]:border-amber-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium text-sm transition-colors"
              >
                Biographie
              </TabsTrigger>
              <TabsTrigger
                value="timeline"
                className="flex-1 h-full rounded-none border-b-2 border-transparent text-stone-400 data-[state=active]:text-amber-700 data-[state=active]:border-amber-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium text-sm transition-colors"
              >
                Roman de sa Vie
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* ─── TAB 1: Memory Wall ─── */}
        <TabsContent value="souvenirs" className="mt-0">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {/* Photo + Text Card */}
              <div className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                <img
                  src={memories[0].image}
                  alt="Roses du jardin"
                  className="w-full h-52 object-cover"
                  loading="lazy"
                />
                <div className="p-5 space-y-3">
                  <p className="text-stone-600 text-sm leading-relaxed">{memories[0].text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">— {memories[0].author}</span>
                    <div className="flex items-center gap-1 text-amber-600">
                      <Heart size={14} className="fill-amber-600" />
                      <span className="text-xs">{memories[0].hearts}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audio Card */}
              <div className="break-inside-avoid bg-amber-50/50 rounded-2xl p-5 shadow-sm border border-amber-100/50 space-y-4">
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md hover:bg-amber-700 transition-colors">
                    <Play size={16} className="ml-0.5" />
                  </button>
                  <div>
                    <p className="text-sm font-medium text-stone-800">{memories[1].title}</p>
                    <p className="text-xs text-stone-400">{memories[1].duration}</p>
                  </div>
                </div>
                <AudioWaveform />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400">— {memories[1].author}</span>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Heart size={14} className="fill-amber-600" />
                    <span className="text-xs">{memories[1].hearts}</span>
                  </div>
                </div>
              </div>

              {/* Quote Card */}
              <div className="break-inside-avoid bg-white rounded-2xl p-8 shadow-sm border border-stone-100 text-center">
                <Quote size={24} className="mx-auto text-amber-600/30 mb-4" />
                <p className="font-serif text-lg text-stone-800 leading-relaxed italic mb-4">{memories[2].text}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xs text-stone-400">— {memories[2].author}</span>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Heart size={14} className="fill-amber-600" />
                    <span className="text-xs">{memories[2].hearts}</span>
                  </div>
                </div>
              </div>

              {/* Video Card */}
              <div className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                <div className="relative">
                  <img src={memories[3].image} alt="Noël 2018" className="w-full h-48 object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
                      <Play size={22} className="text-stone-800 ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-stone-400 text-xs">
                    <Music size={12} />
                    <span>Vidéo</span>
                  </div>
                  <p className="text-sm font-medium text-stone-800">{memories[3].title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">— {memories[3].author}</span>
                    <div className="flex items-center gap-1 text-amber-600">
                      <Heart size={14} className="fill-amber-600" />
                      <span className="text-xs">{memories[3].hearts}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ─── TAB 2: Biography ─── */}
        <TabsContent value="biographie" className="mt-0">
          <div className="max-w-2xl mx-auto px-6 py-16">
            <article className="prose prose-stone prose-lg max-w-none">
              <p className="text-stone-600 leading-[1.9] text-lg first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-amber-700 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                Jean-Claude était un homme de terre et d'esprit. Professeur d'histoire passionné, il a éveillé la
                curiosité de centaines d'élèves au fil de ses trente années d'enseignement. Son regard pétillant et sa
                voix grave captivaient son auditoire dès les premières minutes.
              </p>
              <p className="text-stone-600 leading-[1.9] text-lg mt-6">
                Mais c'est dans son jardin, entouré de ses rosiers et de ses petits-enfants, qu'il trouvait sa véritable
                paix. Chaque dimanche, la famille se réunissait autour de sa grande table en bois pour partager un repas
                qui durait des heures — ponctué de rires, de débats passionnés et de bouteilles soigneusement choisies.
              </p>
              <p className="text-stone-600 leading-[1.9] text-lg mt-6">
                Un épicurien au rire tonitruant, un conteur intarissable, un grand-père extraordinaire. Il laisse
                derrière lui un jardin en fleur et des cœurs à jamais marqués par sa lumière.
              </p>
            </article>
          </div>
        </TabsContent>

        {/* ─── TAB 3: Timeline ─── */}
        <TabsContent value="timeline" className="mt-0">
          <div className="max-w-2xl mx-auto px-6 py-16">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-200 md:-translate-x-px" />

              {timeline.map((event, i) => (
                <div
                  key={i}
                  className={`relative flex items-start mb-16 last:mb-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Gold dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-amber-600 border-[3px] border-[#FAF9F6] shadow-sm -translate-x-1.5 mt-1.5 z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                    }`}
                  >
                    <span className="text-xs tracking-[0.2em] uppercase text-amber-600 font-medium">{event.year}</span>
                    <h3 className="font-serif text-xl font-semibold text-stone-900 mt-1 mb-2">{event.title}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* ─── Floating CTA ─── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button className="flex items-center gap-2.5 px-8 py-4 bg-amber-600 text-white rounded-full shadow-[0_8px_30px_-4px_rgba(217,119,6,0.5)] hover:bg-amber-700 hover:shadow-[0_12px_40px_-4px_rgba(217,119,6,0.6)] transition-all duration-300 hover:scale-105 font-medium text-sm">
          <Feather size={16} />
          Déposer un souvenir
        </button>
      </div>

      {/* Bottom spacer for FAB */}
      <div className="h-24" />
    </div>
  );
};

export default Memorial;
