import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Play, MessageCircle } from "lucide-react";
import couplePhoto from "@/assets/couple-70s.jpg";

type BaseEvent = {
  year: string;
  title: string;
  desc: string;
};

type PhotoEvent = BaseEvent & {
  type: "photo";
  photo: string;
  caption: string;
};

type AudioEvent = BaseEvent & {
  type: "audio";
  attribution: string;
  quote: string;
  duration: string;
  current: string;
};

type StandardEvent = BaseEvent & { type: "standard" };

type TimelineEvent = StandardEvent | PhotoEvent | AudioEvent;

const events: TimelineEvent[] = [
  { type: "standard", year: "1954", title: "Naissance à Marseille", desc: "Un jour d'été, une étoile s'est levée." },
  {
    type: "photo",
    year: "1972",
    title: "La rencontre avec Marie",
    desc: "Un regard échangé au marché du Vieux-Port. Le début de tout.",
    photo: couplePhoto,
    caption: "Photo d'époque, juillet 1972.",
  },
  { type: "standard", year: "1992", title: "Naissance de Thomas", desc: "Le plus beau cadeau qu'ils aient reçu." },
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
  { type: "standard", year: "2023", title: "L'hommage", desc: "Sa lumière continue de briller à travers nous." },
];

/* Static waveform bars */
const Waveform = () => {
  const bars = [3, 6, 10, 7, 12, 8, 5, 11, 6, 9, 4, 8, 13, 7, 5, 10, 6, 3, 8, 11, 5, 7, 9, 4, 6];
  return (
    <div className="flex items-center gap-[2px] h-6 flex-1">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-primary/30"
          style={{ height: `${h * 1.8}px` }}
        />
      ))}
    </div>
  );
};

const FeatureTimeline = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 lg:py-[64px]">
      <div
        className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* Text */}
        <div
          className={`flex-1 space-y-6 text-center lg:text-left transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>

          <p className="text-primary font-sans-body uppercase tracking-[0.2em] text-sm font-semibold">Fil d'Ariane</p>
          <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
            De sa naissance à aujourd'hui :{" "}
            <em className="not-italic font-serif-display italic text-primary">le roman de sa vie.</em>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Mettez de l'ordre dans le chaos des souvenirs. Notre interface organise automatiquement les moments clés
            chronologiquement. De sa naissance à ses plus grands accomplissements.
          </p>
        </div>

        {/* Visual — Timeline mockup */}
        <div
          className={`flex-1 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>

          <div className="rounded-3xl shadow-golden-glow border-luxury bg-card p-8 lg:p-10 max-w-md mx-auto">
            <p className="font-serif-display text-lg font-semibold text-foreground mb-8">Biographie</p>
            <div className="relative pl-8">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-primary/30" />

              {events.map((ev, i) => (
                <div
                  key={i}
                  className={`relative mb-10 last:mb-0 ${ev.type === "audio" ? "bg-amber-50/50 rounded-2xl p-4 -ml-2" : ""}`}
                >
                  {/* Timeline dot / icon */}
                  {ev.type === "audio" ? (
                    <div className="absolute -left-5 top-1.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center"
                      style={{ left: ev.type === "audio" ? "-28px" : undefined }}>
                      <MessageCircle size={12} className="text-primary" />
                    </div>
                  ) : (
                    <div className="absolute -left-5 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-card" />
                  )}

                  {/* Year + title */}
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif-display text-primary font-bold text-lg shrink-0">{ev.year}</span>
                  </div>
                  <p className="font-semibold text-foreground mt-1">{ev.title}</p>
                  {ev.desc && <p className="text-muted-foreground text-sm mt-0.5 italic">{ev.desc}</p>}

                  {/* Photo attachment */}
                  {ev.type === "photo" && (
                    <div className="mt-3">
                      <img
                        src={ev.photo}
                        alt={ev.caption}
                        className="rounded-xl shadow-md w-full object-cover max-h-48"
                        loading="lazy"
                      />
                      <p className="text-xs text-muted-foreground italic mt-2">{ev.caption}</p>
                    </div>
                  )}

                  {/* Audio anecdote */}
                  {ev.type === "audio" && (
                    <div className="mt-3 space-y-3">
                      <p className="text-xs text-muted-foreground">{ev.attribution}</p>

                      {/* Mini audio player */}
                      <div className="flex items-center gap-3 bg-card rounded-xl px-4 py-3 shadow-sm border border-border/50">
                        <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors">
                          <Play size={14} className="text-primary-foreground ml-0.5" fill="currentColor" />
                        </button>
                        <Waveform />
                        <span className="text-xs text-muted-foreground font-mono shrink-0">
                          {ev.current} / {ev.duration}
                        </span>
                      </div>

                      <p className="text-sm text-foreground/80 italic leading-relaxed">{ev.quote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureTimeline;
