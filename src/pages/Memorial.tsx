import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Feather, Heart, Quote, Music, Camera, BookOpen, Clock, ArrowLeft, MessageCircle, Flame } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import portraitImg from "@/assets/jean-claude-portrait.jpg";
import couplePhoto from "@/assets/couple-70s.jpg";
import AddMemoryModal from "@/components/AddMemoryModal";

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
  // ─── 10 New Memory Cards ───
  {
    type: "quote" as const,
    text: "« Merci Monsieur Dubois pour vos cours d'histoire passionnants. Vous m'avez donné le goût d'apprendre. »",
    author: "Thomas, ancien élève",
    hearts: 12,
  },
  {
    type: "photo" as const,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&h=400&fit=crop",
    text: "Ton premier concert au caveau. Inoubliable.",
    author: "Marc",
    hearts: 28,
  },
  {
    type: "audio" as const,
    title: "La chanson que tu m'as apprise",
    duration: "2:12",
    author: "Emma (Petite-fille)",
    hearts: 45,
  },
  {
    type: "quote" as const,
    text: "« Ta recette de bœuf bourguignon restera un secret bien gardé, mais nos fous rires en cuisine, je ne les oublierai jamais. »",
    author: "Sophie",
    hearts: 31,
  },
  {
    type: "photo" as const,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=400&fit=crop",
    text: "La première rose de la saison a éclos aujourd'hui. Je sais que tu veilles sur elle.",
    author: "Marie",
    hearts: 89,
  },
  {
    type: "video" as const,
    image: "https://images.unsplash.com/photo-1529543544282-ea69407b3656?w=600&h=400&fit=crop",
    title: "Anniversaire surprise 2022",
    author: "Famille Dubois",
    hearts: 56,
  },
  {
    type: "quote" as const,
    text: "« Un collègue en or, toujours prêt à dépanner avec le sourire. Tu vas nous manquer au lycée. »",
    author: "Claire et Paul",
    hearts: 19,
  },
  {
    type: "photo" as const,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
    text: "Notre dernière randonnée au Puy de Dôme.",
    author: "Michel",
    hearts: 37,
  },
  {
    type: "audio" as const,
    title: "Souvenir de notre voyage en Italie",
    duration: "1:47",
    author: "Antoine",
    hearts: 22,
  },
  {
    type: "quote" as const,
    text: "« Je garde précieusement le livre que tu m'as offert. Tes annotations dans la marge sont de vrais trésors. »",
    author: "Lucie",
    hearts: 14,
  },
];

/* ─── Timeline Data ─── */
type TimelineEntry =
  | { type: "standard"; year: string; title: string; desc: string }
  | { type: "photo"; year: string; title: string; desc: string; photo: string; caption: string }
  | { type: "audio"; year: string; title: string; desc: string; attribution: string; quote: string; duration: string; current: string };

const timeline: TimelineEntry[] = [
  {
    type: "standard",
    year: "1948",
    title: "Naissance en Auvergne",
    desc: "Un matin de printemps, au cœur des volcans endormis, une vie commence.",
  },
  {
    type: "photo",
    year: "1972",
    title: "La rencontre avec Marie",
    desc: "Un regard croisé dans une librairie de Clermont-Ferrand. Le coup de foudre fut immédiat.",
    photo: couplePhoto,
    caption: "Photo d'époque, été 1972.",
  },
  {
    type: "standard",
    year: "1985",
    title: "Premier poste de professeur",
    desc: "Il entre dans sa classe d'histoire pour la première fois. Des centaines d'élèves suivront.",
  },
  {
    type: "audio",
    year: "1998",
    title: "Une anecdote de Michel",
    desc: "",
    attribution: "Souvenir partagé par Michel R., ami et collègue.",
    quote: "\"Je n'oublierai jamais son discours pour mon départ en retraite. Il avait fait rire et pleurer toute la salle. Sacré Jean-Claude.\"",
    duration: "1:30",
    current: "0:45",
  },
  {
    type: "standard",
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

const FlameRitual = () => {
  const [isLit, setIsLit] = useState(false);
  const [litCount, setLitCount] = useState(12);

  const handleLight = () => {
    if (isLit) return;
    setIsLit(true);
    setLitCount((c) => c + 1);
    toast("Votre lumière a été déposée avec douceur.", {
      style: {
        background: "#FAF9F6",
        border: "1px solid rgba(212,175,55,0.2)",
        color: "#57534e",
        fontFamily: "Inter, sans-serif",
        fontSize: "0.875rem",
      },
    });
  };

  return (
    <div className="flex flex-row items-center justify-center gap-3 mt-6 mb-8">
      <button
        onClick={handleLight}
        className="focus:outline-none"
        aria-label="Allumer une flamme"
      >
        <Flame
          size={28}
          fill={isLit ? "currentColor" : "transparent"}
          strokeWidth={isLit ? 1.5 : 1.5}
          className={`transition-all duration-700 ${
            isLit
              ? "text-amber-500 fill-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-flame-pulse"
              : "text-amber-300 fill-transparent hover:text-amber-400"
          }`}
        />
      </button>
      <span className="text-sm text-stone-500">
        {litCount} proches veillent sur cette flamme.
      </span>
    </div>
  );
};

const Memorial = () => {
  const [activeTab, setActiveTab] = useState("souvenirs");
  const [memoryModalOpen, setMemoryModalOpen] = useState(false);

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
        <Link to="/" className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors">
          <ArrowLeft size={18} />
          <span>Retour</span>
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

        {/* ─── Memorial Flame Ritual ─── */}
        <FlameRitual />
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
              {memories.map((memory, idx) => {
                if (memory.type === "photo") {
                  return (
                    <div key={idx} className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                      <img
                        src={memory.image}
                        alt={memory.text}
                        className="w-full h-52 object-cover"
                        loading="lazy"
                      />
                      <div className="p-5 space-y-3">
                        <p className="text-stone-600 text-sm leading-relaxed">{memory.text}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-stone-400">— {memory.author}</span>
                          <div className="flex items-center gap-1 text-amber-600">
                            <Heart size={14} className="fill-amber-600" />
                            <span className="text-xs">{memory.hearts}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (memory.type === "audio") {
                  return (
                    <div key={idx} className="break-inside-avoid bg-amber-50/50 rounded-2xl p-5 shadow-sm border border-amber-100/50 space-y-4">
                      <div className="flex items-center gap-3">
                        <button className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md hover:bg-amber-700 transition-colors">
                          <Play size={16} className="ml-0.5" />
                        </button>
                        <div>
                          <p className="text-sm font-medium text-stone-800">{memory.title}</p>
                          <p className="text-xs text-stone-400">{memory.duration}</p>
                        </div>
                      </div>
                      <AudioWaveform />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-400">— {memory.author}</span>
                        <div className="flex items-center gap-1 text-amber-600">
                          <Heart size={14} className="fill-amber-600" />
                          <span className="text-xs">{memory.hearts}</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (memory.type === "quote") {
                  return (
                    <div key={idx} className="break-inside-avoid bg-white rounded-2xl p-8 shadow-sm border border-stone-100 text-center">
                      <Quote size={24} className="mx-auto text-amber-600/30 mb-4" />
                      <p className="font-serif text-lg text-stone-800 leading-relaxed italic mb-4">{memory.text}</p>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xs text-stone-400">— {memory.author}</span>
                        <div className="flex items-center gap-1 text-amber-600">
                          <Heart size={14} className="fill-amber-600" />
                          <span className="text-xs">{memory.hearts}</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (memory.type === "video") {
                  return (
                    <div key={idx} className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                      <div className="relative">
                        <img src={memory.image} alt={memory.title} className="w-full h-48 object-cover" loading="lazy" />
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
                        <p className="text-sm font-medium text-stone-800">{memory.title}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-stone-400">— {memory.author}</span>
                          <div className="flex items-center gap-1 text-amber-600">
                            <Heart size={14} className="fill-amber-600" />
                            <span className="text-xs">{memory.hearts}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              })}
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
                  className={`relative flex items-start mb-8 last:mb-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot / Icon */}
                  {event.type === "audio" ? (
                    <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center -translate-x-3 mt-0.5 z-10">
                      <MessageCircle size={13} className="text-amber-600" />
                    </div>
                  ) : (
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-amber-600 border-[3px] border-[#FAF9F6] shadow-sm -translate-x-1.5 mt-1.5 z-10" />
                  )}

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                    } ${event.type === "audio" ? "bg-amber-50/50 rounded-2xl p-5" : ""}`}
                  >
                    <span className="text-xs tracking-[0.2em] uppercase text-amber-600 font-medium">{event.year}</span>
                    <h3 className="font-serif text-xl font-semibold text-stone-900 mt-1 mb-2">{event.title}</h3>
                    {event.desc && <p className="text-sm text-stone-500 leading-relaxed">{event.desc}</p>}

                    {/* Photo attachment */}
                    {event.type === "photo" && (
                      <div className="mt-4">
                        <img
                          src={event.photo}
                          alt={event.caption}
                          className="rounded-xl shadow-md w-full object-cover max-h-56"
                          loading="lazy"
                        />
                        <p className="text-xs text-stone-400 italic mt-2">{event.caption}</p>
                      </div>
                    )}

                    {/* Audio anecdote */}
                    {event.type === "audio" && (
                      <div className="mt-3 space-y-3">
                        <p className="text-xs text-stone-400">{event.attribution}</p>
                        <div className={`flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-stone-100 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                          <button className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center shrink-0 hover:bg-amber-700 transition-colors">
                            <Play size={14} className="text-white ml-0.5" fill="currentColor" />
                          </button>
                          <AudioWaveform />
                          <span className="text-xs text-stone-400 font-mono shrink-0">
                            {event.current} / {event.duration}
                          </span>
                        </div>
                        <p className="text-sm text-stone-600 italic leading-relaxed">{event.quote}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* ─── Floating CTA ─── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setMemoryModalOpen(true)}
          className="flex items-center gap-2.5 px-8 py-4 bg-amber-600 text-white rounded-full shadow-[0_8px_30px_-4px_rgba(217,119,6,0.5)] hover:bg-amber-700 hover:shadow-[0_12px_40px_-4px_rgba(217,119,6,0.6)] transition-all duration-300 hover:scale-105 font-medium text-sm"
        >
          <Feather size={16} />
          Déposer un souvenir
        </button>
      </div>

      <AddMemoryModal open={memoryModalOpen} onOpenChange={setMemoryModalOpen} />

      {/* Bottom spacer for FAB */}
      <div className="h-24" />
    </div>
  );
};

export default Memorial;
