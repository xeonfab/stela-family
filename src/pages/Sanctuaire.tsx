import { useState } from "react";
import { Plus, Play, List, BookOpen, Image as ImageIcon, Mail } from "lucide-react";

type Mode = "heritage" | "memorial";
type TabKey = "fil" | "vie" | "medias" | "lettres";
type SubTab = "etapes" | "ecrits" | "hommages";
type TraceType = "mot" | "voix" | "photo" | "etape";
type LetterStatus = "draft" | "sealed" | "locked" | "opened";

/* ─────────── ModeToggle (démo) ─────────── */
const ModeToggle = ({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) => (
  <div className="fixed top-2 right-2 md:top-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 bg-background/90 backdrop-blur-sm border border-border rounded-full p-1 flex gap-1 shadow-md">
    {([
      ["heritage", "De son vivant"],
      ["memorial", "Après son départ"],
    ] as const).map(([key, label]) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
          mode === key ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

/* ─────────── Mobile Header ─────────── */
const SanctuaireHeader = ({ mode }: { mode: Mode }) => {
  if (mode === "heritage") {
    return (
      <header className="px-4 pt-5 pb-3.5 border-b border-border text-center bg-background flex-shrink-0 md:hidden">
        <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center font-serif text-sm text-muted-foreground mx-auto mb-2">
          HM
        </div>
        <h1 className="font-serif text-lg font-medium text-foreground">Hélène</h1>
        <p className="text-[8px] uppercase tracking-widest text-primary/80 font-medium mt-0.5">
          Mes traces · En construction
        </p>
        <div className="mx-4 mt-2.5 h-[2px] bg-border rounded-full overflow-hidden">
          <div className="w-[18%] h-full bg-primary rounded-full" />
        </div>
        <p className="text-[8px] text-muted-foreground text-right mt-1">360MB / 2GB utilisés</p>
      </header>
    );
  }
  return (
    <header className="px-4 pt-5 pb-3.5 border-b border-border text-center bg-background flex-shrink-0 md:hidden">
      <div
        className="w-10 h-10 rounded-full mx-auto mb-2 text-white font-serif text-sm flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #D4C4A0, #B8A888)" }}
      >
        HM
      </div>
      <h1 className="font-serif text-base font-medium text-foreground">Hélène Moreau</h1>
      <p className="text-[10px] text-muted-foreground tracking-wide mt-0.5">
        2 mai 1948 — 18 mars 2026
      </p>
      <div className="flex items-center justify-center gap-1.5 mt-1.5">
        <span className="w-1 h-1 rounded-full bg-primary opacity-60" />
        <span className="text-[9px] italic text-primary/80">
          Marie et 3 autres ont visité récemment
        </span>
      </div>
    </header>
  );
};

/* ─────────── Tab definitions ─────────── */
const TAB_DEFS: { key: TabKey; heritage: string; memorial: string; icon: typeof List }[] = [
  { key: "fil", heritage: "Fil", memorial: "Fil", icon: List },
  { key: "vie", heritage: "Ma vie", memorial: "Sa vie", icon: BookOpen },
  { key: "medias", heritage: "Médias", memorial: "Médias", icon: ImageIcon },
  { key: "lettres", heritage: "Mes lettres", memorial: "Ses lettres", icon: Mail },
];

/* ─────────── Mobile Tabs ─────────── */
const SanctuaireTabs = ({
  mode,
  activeTab,
  onTabChange,
}: {
  mode: Mode;
  activeTab: TabKey;
  onTabChange: (t: TabKey) => void;
}) => (
  <nav className="flex border-b border-border bg-background flex-shrink-0 md:hidden">
    {TAB_DEFS.map((t) => {
      const isActive = activeTab === t.key;
      return (
        <button
          key={t.key}
          onClick={() => onTabChange(t.key)}
          className={`flex-1 py-3 text-center text-[9px] uppercase tracking-wide font-medium cursor-pointer transition-colors border-b-[1.5px] ${
            isActive ? "text-primary border-primary" : "text-muted-foreground border-transparent"
          }`}
        >
          {t[mode]}
        </button>
      );
    })}
  </nav>
);

/* ─────────── PlayerAudio (responsive) ─────────── */
const PlayerAudio = ({
  duration,
  caption,
  size = "sm",
}: {
  duration: string;
  caption?: string;
  size?: "sm" | "md";
}) => {
  const heightsSm = [7, 13, 9, 16, 11, 14, 7, 12, 16, 9];
  const heightsMd = [9, 16, 11, 20, 14, 18, 9, 15, 20, 12, 17, 10, 18, 13];
  if (size === "md") {
    return (
      <div>
        <div className="flex items-center gap-3 bg-card rounded-xl p-3 mb-1">
          <button className="w-8 h-8 rounded-full border border-primary flex items-center justify-center flex-shrink-0">
            <Play className="w-2.5 h-2.5 fill-primary text-primary ml-px" />
          </button>
          <div className="flex-1 h-5 flex items-center gap-[2px]">
            {heightsMd.map((h, i) => (
              <span key={i} className="w-[3px] rounded-full bg-primary/60" style={{ height: `${h}px` }} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{duration}</span>
        </div>
        {caption && <p className="mt-0.5 text-[10px] italic text-muted-foreground/70">{caption}</p>}
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center gap-1.5 bg-card rounded-md p-2 mb-1">
        <button className="w-[22px] h-[22px] rounded-full border border-primary flex items-center justify-center flex-shrink-0">
          <Play className="w-[6px] h-[6px] fill-primary text-primary ml-px" />
        </button>
        <div className="flex-1 h-3.5 flex items-center gap-[1.5px]">
          {heightsSm.map((h, i) => (
            <span key={i} className="w-[2.5px] rounded-full bg-primary/60" style={{ height: `${h}px` }} />
          ))}
        </div>
        <span className="text-[9px] text-muted-foreground">{duration}</span>
      </div>
      {caption && <p className="mt-0.5 text-[8px] italic text-muted-foreground/70">{caption}</p>}
    </div>
  );
};

/* ─────────── TraceCard ─────────── */
interface TraceCardProps {
  mode: Mode;
  type: TraceType;
  content?: string;
  caption?: string;
  duration?: string;
  imageBg?: string;
  author?: { role: "self" | "family"; name?: string; initials?: string; familyRole?: string };
  year?: string;
  title?: string;
  description?: string;
  hint?: string;
}

const TYPE_STYLE: Record<TraceType, { dot: string; text: string; label: string }> = {
  mot: { dot: "bg-primary", text: "text-primary", label: "Mot" },
  voix: { dot: "bg-[#7A8FA8]", text: "text-[#7A8FA8]", label: "Voix" },
  photo: { dot: "bg-[#8A9A78]", text: "text-[#8A9A78]", label: "Photo" },
  etape: { dot: "bg-primary", text: "text-primary", label: "Étape" },
};

const TraceCard = ({
  mode,
  type,
  content,
  caption,
  duration,
  imageBg,
  author,
  year,
  title,
  description,
  hint,
}: TraceCardProps) => {
  const ts = TYPE_STYLE[type];
  return (
    <article className="py-2.5 md:py-4 border-b border-border last:border-0">
      <div className="flex items-center justify-between mb-1.5 md:mb-2">
        <div className="flex items-center gap-1">
          <span className={`w-1 h-1 rounded-full ${ts.dot}`} />
          <span className={`text-[7px] uppercase tracking-wide font-medium ${ts.text}`}>{ts.label}</span>
        </div>
        {mode === "memorial" && author && (
          <div className="flex items-center gap-1">
            {author.role === "self" ? (
              <>
                <span className="w-4 h-4 rounded-full bg-primary/15 text-primary font-serif text-[8px] flex items-center justify-center">
                  {author.initials}
                </span>
                <span className="text-[9px] text-muted-foreground">Déposé de son vivant</span>
              </>
            ) : (
              <>
                <span className="w-4 h-4 rounded-full bg-card text-muted-foreground font-serif text-[8px] flex items-center justify-center">
                  {author.initials}
                </span>
                <span className="text-[9px] text-muted-foreground">
                  {author.name} · {author.familyRole}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {type === "mot" && (
        <p className="font-serif text-sm md:text-base font-normal italic text-foreground leading-snug md:leading-relaxed">
          {content}
        </p>
      )}
      {type === "voix" && (
        <>
          <div className="md:hidden">
            <PlayerAudio duration={duration ?? "0:00"} caption={caption} size="sm" />
          </div>
          <div className="hidden md:block">
            <PlayerAudio duration={duration ?? "0:00"} caption={caption} size="md" />
          </div>
        </>
      )}
      {type === "photo" && (
        <div
          className="w-full h-14 md:h-24 rounded-md md:rounded-lg mb-1 flex items-end p-1.5"
          style={{ background: imageBg }}
        >
          <span className="text-[8px] md:text-[10px] italic text-white/85">{caption}</span>
        </div>
      )}
      {type === "etape" && (
        <div className="flex items-start gap-2">
          <span className="text-[9px] text-primary tracking-wide w-8 flex-shrink-0">{year}</span>
          <div>
            <p className="text-sm md:text-base font-serif text-foreground">{title}</p>
            {description && (
              <p className="text-[11px] md:text-xs italic text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      )}

      {mode === "heritage" && hint && (
        <p className="mt-1 text-[8px] italic text-muted-foreground/70">{hint}</p>
      )}
    </article>
  );
};

/* ─────────── LetterCard ─────────── */
const STATUS_MAP: Record<
  LetterStatus,
  { iconBg: string; iconColor: string; badge: string; badgeLabel: string }
> = {
  draft: { iconBg: "bg-foreground", iconColor: "text-primary", badge: "bg-primary/10 text-primary", badgeLabel: "En cours" },
  sealed: { iconBg: "bg-primary", iconColor: "text-white", badge: "bg-card text-muted-foreground border border-border", badgeLabel: "Scellée" },
  locked: { iconBg: "bg-foreground", iconColor: "text-primary", badge: "bg-foreground text-primary", badgeLabel: "Verrouillée" },
  opened: { iconBg: "bg-muted", iconColor: "text-muted-foreground", badge: "bg-green-50 text-green-700", badgeLabel: "Ouverte" },
};

const LetterCard = ({
  to,
  occasion,
  status,
}: {
  to: string;
  occasion: string;
  status: LetterStatus;
  mode: Mode;
}) => {
  const s = STATUS_MAP[status];
  const icon = status === "locked" ? "🔒" : "✉";
  return (
    <div className="bg-card rounded-xl p-3 md:p-4 flex items-start md:items-center gap-2.5 md:gap-3 mb-2 md:mb-3 md:border md:border-border md:hover:border-primary/30 transition-colors">
      <div
        className={`w-[30px] h-[30px] md:w-[36px] md:h-[36px] rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${s.iconBg} ${s.iconColor}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-serif text-sm md:text-base font-medium text-foreground mb-0.5">Pour {to}</p>
        <p className="text-[10px] md:text-xs italic text-muted-foreground">{occasion}</p>
      </div>
      <span
        className={`text-[8px] md:text-[9px] uppercase tracking-wide font-medium px-2 py-1 rounded-full flex-shrink-0 ${s.badge}`}
      >
        {s.badgeLabel}
      </span>
    </div>
  );
};

/* ─────────── Mobile FAB ─────────── */
const SanctuaireFAB = ({ mode }: { mode: Mode }) => (
  <button
    className={`fixed bottom-4 right-4 z-10 md:hidden w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-105 ${
      mode === "heritage" ? "bg-foreground" : "bg-primary"
    }`}
    style={{
      boxShadow:
        mode === "heritage"
          ? "0 0 20px -5px rgba(212,175,55,.3)"
          : "0 20px 40px -10px rgba(212,175,55,.25)",
    }}
    aria-label="Ajouter"
  >
    <Plus
      className={`w-3.5 h-3.5 ${mode === "heritage" ? "text-primary" : "text-white"}`}
      strokeWidth={1.5}
    />
  </button>
);

/* ─────────── Helpers ─────────── */
const MonthDivider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-1.5 py-2 md:py-3">
    <span className="text-[7px] uppercase tracking-wider text-muted-foreground/60">{label}</span>
    <span className="flex-1 h-px bg-border" />
  </div>
);

const TimeMarker = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 py-2.5 md:py-4">
    <span className="flex-1 h-px bg-border" />
    <span className="text-[7px] uppercase tracking-wider text-muted-foreground/60 whitespace-nowrap">
      {label}
    </span>
    <span className="flex-1 h-px bg-border" />
  </div>
);

/* ─────────── Onglet Fil ─────────── */
const FilTab = ({ mode }: { mode: Mode }) => {
  if (mode === "heritage") {
    return (
      <div>
        <div className="bg-card border-l-2 border-primary rounded-xl p-3.5 md:p-5 mb-3 md:mb-4 mt-3">
          <p className="text-[7px] md:text-[8px] uppercase tracking-wider text-primary">
            Invitation de la semaine
          </p>
          <p className="font-serif text-sm md:text-base italic text-foreground mb-2.5 md:mb-3.5 mt-1">
            Quel objet chez vous a une histoire que personne ne connaît ?
          </p>
          <div className="flex gap-2">
            <button className="bg-primary text-white rounded-full px-3 md:px-4 py-1.5 md:py-2 text-[9px] md:text-xs font-medium">
              Répondre à voix haute
            </button>
            <button className="border-[0.5px] border-primary text-primary rounded-full px-3 md:px-4 py-1.5 md:py-2 text-[9px] md:text-xs">
              Plus tard
            </button>
          </div>
        </div>

        <MonthDivider label="Avril 2026" />
        <TraceCard
          mode="heritage"
          type="mot"
          content="Mon jardin du Luberon. Ces matins-là m'appartenaient."
          hint="Appuyer pour modifier"
        />
        <TraceCard mode="heritage" type="voix" duration="2:14" caption="Message à Marie" />

        <MonthDivider label="Mars 2026" />
        <TraceCard
          mode="heritage"
          type="photo"
          imageBg="linear-gradient(135deg,#D4C4A0,#B8A888)"
          caption="Lavande, été 1972"
        />
        <TraceCard
          mode="heritage"
          type="mot"
          content="La recette de tarte de ma mère, reconstituée de mémoire."
        />
      </div>
    );
  }
  return (
    <div>
      <div className="bg-foreground rounded-xl p-3.5 md:p-5 mb-1.5 md:mb-3 mt-3">
        <p className="text-[7px] md:text-[8px] uppercase tracking-wider text-primary/70">Sa voix · Épinglé</p>
        <p className="font-serif text-sm md:text-lg italic text-white mb-2.5 mt-1">Message vocal à Marie</p>
        <div className="flex justify-between items-center">
          <span className="text-[9px] md:text-xs text-muted-foreground">Hélène · 2:14</span>
          <button className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-primary flex items-center justify-center">
            <Play className="w-2 h-2 md:w-2.5 md:h-2.5 fill-primary text-primary ml-px" />
          </button>
        </div>
      </div>
      <p className="text-[9px] md:text-[10px] italic text-center text-muted-foreground mt-1 mb-2">
        Quand vous êtes prêt. Pas avant.
      </p>

      <TimeMarker label="3 semaines après son départ" />
      <TraceCard
        mode="memorial"
        type="photo"
        author={{ role: "family", name: "Marie", initials: "M", familyRole: "Sa fille" }}
        imageBg="linear-gradient(135deg,#C8BEA8,#A89880)"
        caption="Retrouvée dans son atelier"
      />
      <TraceCard
        mode="memorial"
        type="mot"
        author={{ role: "self", initials: "H" }}
        content="Mon jardin du Luberon. Ces matins-là m'appartenaient."
      />

      <TimeMarker label="Le lendemain" />
      <TraceCard
        mode="memorial"
        type="mot"
        author={{ role: "family", name: "Léo", initials: "L", familyRole: "Son petit-fils" }}
        content="Elle m'avait appris à siffloter."
      />
      <TraceCard
        mode="memorial"
        type="voix"
        author={{ role: "self", initials: "H" }}
        duration="3:42"
        caption="Recette de tarte aux pommes"
      />
    </div>
  );
};

/* ─────────── Data ─────────── */
const ETAPES = [
  { year: "1948", title: "Naissance à Lyon", desc: "Le 2 mai, dans le quartier de la Croix-Rousse." },
  { year: "1971", title: "Rencontre avec Pierre", desc: "Un dimanche de printemps, au marché de Vieux-Lyon." },
  { year: "1974", title: "Naissance de Marie", desc: "Notre premier enfant. Je n'avais jamais été aussi heureuse." },
  { year: "1989", title: "La maison du Luberon", desc: "On a tout vendu pour acheter ce mas. On ne l'a jamais regretté." },
  { year: "2012", title: "Pierre nous a quittés", desc: "Le jardin n'a plus jamais eu le même silence." },
];

const ECRITS = [
  { title: "La recette de tarte de ma mère", extract: "Farine, beurre, sucre, pommes du jardin. Elle ne mesurait jamais rien...", date: "Déposé le 12 avril" },
  { title: "Ce que j'aurais voulu dire à Pierre", extract: "Je ne t'ai jamais dit combien tu m'as manqué même quand tu étais là...", date: "Déposé le 3 avril" },
];

const HOMMAGES = [
  { name: "Marie", role: "Sa fille", initials: "M", date: "20 mars", text: "Maman, je retrouve ta voix chaque fois que je pense à toi." },
  { name: "Léo", role: "Son petit-fils", initials: "L", date: "21 mars", text: "Grand-mère, tu m'avais appris à siffloter." },
  { name: "Sophie", role: "Sa nièce", initials: "S", date: "22 mars", text: "Tante Hélène, je n'oublierai jamais nos déjeuners du dimanche." },
];

const VieTab = ({ mode }: { mode: Mode }) => {
  const [sub, setSub] = useState<SubTab>("etapes");
  const subs: { key: SubTab; label: string }[] = [
    { key: "etapes", label: "Étapes" },
    { key: "ecrits", label: "Écrits" },
    { key: "hommages", label: "Hommages" },
  ];

  return (
    <div>
      <div className="flex gap-2 py-3 overflow-x-auto md:overflow-visible scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {subs.map((s) => {
          const active = sub === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setSub(s.key)}
              className={`text-[9px] md:text-xs font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full whitespace-nowrap transition-colors ${
                active ? "bg-primary text-white" : "bg-card text-muted-foreground border border-border"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {sub === "etapes" && (
        <div>
          <h2 className="font-serif text-[17px] md:text-xl font-medium text-foreground mb-4">
            {mode === "heritage" ? "Ma vie en étapes" : "Sa vie en étapes"}
          </h2>
          <div className="relative pl-5 md:pl-8">
            <div className="absolute left-[7px] md:left-[10px] top-2 bottom-2 w-px bg-border" />
            {ETAPES.map((e, i) => (
              <div key={i} className="relative pb-5 md:pb-7 last:pb-0">
                <span className="absolute left-[-14px] md:left-[-22px] top-[3px] w-[7px] h-[7px] md:w-2.5 md:h-2.5 rounded-full bg-background border border-primary" />
                <p className="text-[9px] md:text-[10px] text-primary tracking-wide mb-0.5">{e.year}</p>
                <p className="font-serif text-sm md:text-base text-foreground mb-0.5">{e.title}</p>
                <p className="text-[11px] md:text-xs italic text-muted-foreground leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
          {mode === "heritage" && (
            <div className="text-right mt-3">
              <button className="text-[9px] md:text-xs text-primary">+ Marquer une étape</button>
            </div>
          )}
        </div>
      )}

      {sub === "ecrits" && (
        <div className="md:grid md:grid-cols-2 md:gap-4">
          {ECRITS.map((e, i) => (
            <div key={i} className="bg-card rounded-xl p-3.5 md:p-4 mb-2 md:mb-0 border-l-2 border-primary/30">
              <p className="font-serif text-sm md:text-base font-medium text-foreground mb-1">{e.title}</p>
              <p className="text-[12px] md:text-sm italic text-muted-foreground leading-relaxed line-clamp-3">
                {e.extract}
              </p>
              <p className="text-[9px] md:text-[10px] text-muted-foreground/60 mt-2">{e.date}</p>
            </div>
          ))}
        </div>
      )}

      {sub === "hommages" && (
        <div className="md:grid md:grid-cols-2 md:gap-3">
          {mode === "heritage" ? (
            <div className="text-center py-10 md:col-span-2">
              <p className="text-primary/30 text-2xl mb-3">✦</p>
              <p className="font-serif text-sm md:text-base italic text-muted-foreground/50">
                Les hommages de votre famille apparaîtront ici après votre départ.
              </p>
            </div>
          ) : (
            HOMMAGES.map((h, i) => (
              <div key={i} className="bg-card rounded-xl p-3 md:p-4 mb-2 md:mb-0 border-t-[1.5px] border-primary">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground font-serif text-[9px] flex items-center justify-center">
                    {h.initials}
                  </span>
                  <span className="text-[10px] md:text-xs font-medium text-foreground">{h.name}</span>
                  <span className="text-[9px] md:text-[10px] italic text-muted-foreground">{h.role}</span>
                  <span className="text-[9px] md:text-[10px] text-muted-foreground ml-auto">{h.date}</span>
                </div>
                <p className="font-serif text-sm md:text-base italic text-foreground leading-relaxed">{h.text}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

/* ─────────── Onglet Médias ─────────── */
const PHOTOS = [
  { gradient: "linear-gradient(135deg,#D4C4A0,#B8A888)", caption: "Luberon", attr: "Hélène" },
  { gradient: "linear-gradient(135deg,#C8BEA8,#A89880)", caption: "Jardin", attr: "Hélène" },
  { gradient: "linear-gradient(135deg,#A89880,#8A7A60)", caption: "Pierre", attr: "Hélène" },
  { gradient: "linear-gradient(135deg,#3A4A3E,#2A3A2C)", caption: "Recette", attr: "Marie" },
  { gradient: "linear-gradient(135deg,#7A6850,#5A4838)", caption: "Noël 1985", attr: "Hélène" },
];

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1.5 py-2 mt-2">
    <span className="text-[7px] md:text-[9px] uppercase tracking-wider text-muted-foreground/60">{children}</span>
    <span className="flex-1 h-px bg-border" />
  </div>
);

const MediasTab = ({ mode }: { mode: Mode }) => (
  <div>
    <SectionEyebrow>Voix & Vidéos</SectionEyebrow>
    <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
      <div className="md:hidden space-y-2">
        <PlayerAudio duration="2:14" caption="Message à Marie" size="sm" />
        <PlayerAudio duration="4:08" caption="Recette de tarte" size="sm" />
        <PlayerAudio duration="1:33" caption="Mon Luberon bien-aimé" size="sm" />
      </div>
      <div className="hidden md:contents">
        <PlayerAudio duration="2:14" caption="Message à Marie" size="md" />
        <PlayerAudio duration="4:08" caption="Recette de tarte" size="md" />
        <PlayerAudio duration="1:33" caption="Mon Luberon bien-aimé" size="md" />
      </div>
    </div>

    <SectionEyebrow>Photos</SectionEyebrow>
    <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-2 mb-4">
      {PHOTOS.map((p, i) => (
        <div
          key={i}
          className="aspect-square rounded-md md:rounded-lg overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity"
          style={{ background: p.gradient }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-1 md:p-2 bg-gradient-to-t from-black/30">
            <p className="text-[7px] md:text-[9px] text-white/80 italic">{p.caption}</p>
          </div>
          {mode === "memorial" && (
            <div className="absolute top-1 left-1 bg-black/40 px-1 text-[7px] md:text-[8px] text-white rounded-sm">
              {p.attr}
            </div>
          )}
        </div>
      ))}
      {mode === "heritage" && (
        <div className="aspect-square rounded-md md:rounded-lg bg-card flex items-center justify-center text-[10px] md:text-xs text-muted-foreground">
          + Ajouter
        </div>
      )}
    </div>
  </div>
);

/* ─────────── Onglet Lettres ─────────── */
const LettresTab = ({ mode }: { mode: Mode }) => {
  if (mode === "heritage") {
    return (
      <div className="pt-3 md:max-w-xl">
        <h2 className="font-serif text-base md:text-2xl font-medium text-foreground mb-4 md:mb-6">
          Mes lettres scellées
        </h2>
        <LetterCard mode={mode} to="Marie" occasion="Le jour de son mariage" status="sealed" />
        <LetterCard mode={mode} to="Léo" occasion="Ses 18 ans — en 2033" status="draft" />
        <LetterCard mode={mode} to="Sophie" occasion="Un an après mon départ" status="sealed" />
        <button className="mt-4 w-full md:w-auto md:px-8 py-3 border-dashed border border-primary/40 rounded-xl text-[11px] md:text-sm text-primary/70 italic text-center">
          + Écrire une lettre scellée
        </button>
      </div>
    );
  }
  return (
    <div className="pt-3 md:max-w-xl">
      <h2 className="font-serif text-base md:text-2xl font-medium text-foreground mb-4 md:mb-6">Ses lettres</h2>
      <LetterCard mode={mode} to="Marie" occasion="Le jour de son mariage" status="locked" />
      <LetterCard mode={mode} to="Léo" occasion="Ses 18 ans — en 2033" status="locked" />
      <div>
        <LetterCard mode={mode} to="Sophie" occasion="Un an après son départ" status="opened" />
        <p className="text-[9px] md:text-[10px] italic text-muted-foreground -mt-1 ml-[42px] md:ml-[48px] mb-2">
          Ouverte le 18 mars 2027
        </p>
      </div>
    </div>
  );
};

/* ─────────── Mobile Content router ─────────── */
const SanctuaireContent = ({ mode, activeTab }: { mode: Mode; activeTab: TabKey }) => (
  <div className="flex-1 overflow-y-auto px-4 pb-20 md:hidden">
    {activeTab === "fil" && <FilTab mode={mode} />}
    {activeTab === "vie" && <VieTab mode={mode} />}
    {activeTab === "medias" && <MediasTab mode={mode} />}
    {activeTab === "lettres" && <LettresTab mode={mode} />}
  </div>
);

/* ─────────── Desktop Sidebar ─────────── */
const DesktopSidebar = ({
  mode,
  activeTab,
  onTabChange,
}: {
  mode: Mode;
  activeTab: TabKey;
  onTabChange: (t: TabKey) => void;
}) => (
  <aside className="hidden md:flex md:flex-col fixed left-0 top-0 h-screen w-[280px] lg:w-[300px] bg-background border-r border-border overflow-y-auto z-20">
    {/* Logo */}
    <div className="px-6 pt-6 pb-4 border-b border-border">
      <p className="font-serif text-xl font-medium text-foreground">Stela</p>
      <p className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">
        Mémorial d'intimité
      </p>
    </div>

    {/* Profil */}
    {mode === "heritage" ? (
      <div className="px-6 py-5 border-b border-border text-center">
        <div className="w-14 h-14 rounded-full bg-card flex items-center justify-center font-serif text-base text-muted-foreground mx-auto mb-3">
          HM
        </div>
        <h2 className="font-serif text-xl font-medium text-foreground">Hélène</h2>
        <p className="text-[9px] uppercase tracking-widest text-primary/80 mt-1">
          En construction
        </p>
        <div className="mt-3 h-[2px] bg-border rounded overflow-hidden">
          <div className="w-[18%] h-full bg-primary" />
        </div>
        <p className="text-[9px] text-muted-foreground text-right mt-1">360MB / 2GB</p>
      </div>
    ) : (
      <div className="px-6 py-5 border-b border-border text-center">
        <div
          className="w-14 h-14 rounded-full mx-auto mb-3 text-white font-serif text-base flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#D4C4A0,#B8A888)" }}
        >
          HM
        </div>
        <h2 className="font-serif text-xl font-medium text-foreground">Hélène Moreau</h2>
        <p className="text-[11px] text-muted-foreground tracking-wide mt-1">
          2 mai 1948 — 18 mars 2026
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <span className="w-1 h-1 rounded-full bg-primary opacity-60" />
          <span className="text-[9px] italic text-primary/80">
            Marie et 3 autres récemment
          </span>
        </div>
      </div>
    )}

    {/* Nav verticale */}
    <nav className="px-4 py-4 flex flex-col gap-1 flex-1">
      {TAB_DEFS.map((t) => {
        const isActive = activeTab === t.key;
        const Icon = t.icon;
        return (
          <button
            key={t.key}
            onClick={() => onTabChange(t.key)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all text-sm font-medium ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{t[mode]}</span>
          </button>
        );
      })}
    </nav>

    {/* Bouton action */}
    <div className="px-4 pb-6 mt-auto">
      {mode === "heritage" ? (
        <button className="w-full flex items-center justify-center gap-2 bg-foreground text-primary rounded-xl py-3 text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          Ajouter une trace
        </button>
      ) : (
        <button
          className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ boxShadow: "0 0 20px -5px rgba(212,175,55,.4)" }}
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          Ajouter un souvenir
        </button>
      )}
    </div>
  </aside>
);

/* ─────────── Desktop Main ─────────── */
const DesktopMain = ({ mode, activeTab }: { mode: Mode; activeTab: TabKey }) => {
  const def = TAB_DEFS.find((t) => t.key === activeTab)!;
  const subtitle =
    mode === "heritage"
      ? "En construction"
      : "42 traces · depuis mars 2026";
  const isMedias = activeTab === "medias";
  return (
    <main className="hidden md:block md:ml-[280px] lg:ml-[300px] lg:mr-[320px] h-screen overflow-y-auto bg-background lg:border-r lg:border-border">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm px-8 py-5 border-b border-border flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-medium text-foreground">{def[mode]}</h1>
          <p className="text-sm italic text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className={`px-8 py-6 pb-8 ${isMedias ? "max-w-none" : "max-w-2xl"}`}>
        {activeTab === "fil" && <FilTab mode={mode} />}
        {activeTab === "vie" && <VieTab mode={mode} />}
        {activeTab === "medias" && <MediasTab mode={mode} />}
        {activeTab === "lettres" && <LettresTab mode={mode} />}
      </div>
    </main>
  );
};

/* ─────────── Desktop Right Panel ─────────── */
const DesktopPanel = ({ mode, activeTab }: { mode: Mode; activeTab: TabKey }) => {
  return (
    <aside className="hidden lg:flex lg:flex-col fixed right-0 top-0 h-screen w-[320px] bg-card border-l border-border overflow-y-auto z-20">
      {activeTab === "fil" && (
        <>
          <div className="px-6 pt-6 pb-4 border-b border-border">
            <h3 className="font-serif text-base font-medium text-foreground">
              Aperçu du Sanctuaire
            </h3>
          </div>
          <div className="px-6 py-4 grid grid-cols-3 gap-4 border-b border-border">
            {[
              { n: "14", l: "Mots" },
              { n: "6", l: "Voix" },
              { n: "37", l: "Photos" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-2xl font-medium text-foreground">{s.n}</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="px-6 py-4">
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground mb-3">
              Activité récente
            </p>
            <ul className="space-y-2">
              {[
                { c: "bg-[#8A9A78]", t: "Photo ajoutée · Marie · Il y a 2h" },
                { c: "bg-primary", t: "Mot déposé · Hélène · 12 avril" },
                { c: "bg-[#7A8FA8]", t: "Voix enregistrée · 4:08 · Mars" },
              ].map((a, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${a.c}`} />
                  <span className="text-[11px] text-muted-foreground">{a.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {activeTab === "vie" && (
        <>
          <div className="px-6 pt-6 pb-4 border-b border-border">
            <h3 className="font-serif text-base font-medium text-foreground">Chronologie</h3>
          </div>
          <ul className="px-6 py-4 space-y-2 border-b border-border">
            {[
              ["1948", "Naissance"],
              ["1971", "Rencontre"],
              ["1974", "Marie"],
              ["1989", "Luberon"],
              ["2012", "Pierre"],
            ].map(([y, t]) => (
              <li key={y} className="flex items-center gap-3 text-xs">
                <span className="text-primary tracking-wide w-10">{y}</span>
                <span className="text-foreground font-serif">{t}</span>
              </li>
            ))}
          </ul>
          {mode === "memorial" && (
            <div className="px-6 py-4">
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground mb-3">
                Garants du Sanctuaire
              </p>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-muted text-muted-foreground font-serif text-[10px] flex items-center justify-center">
                  M
                </span>
                <div>
                  <p className="text-xs text-foreground">Marie Moreau</p>
                  <p className="text-[10px] italic text-muted-foreground">Garant principal</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "medias" && (
        <>
          <div className="px-6 pt-6 pb-4 border-b border-border">
            <h3 className="font-serif text-base font-medium text-foreground">Stockage</h3>
          </div>
          <div className="px-6 py-4 border-b border-border">
            <div className="bg-border h-2 rounded overflow-hidden">
              <div className="bg-primary h-full" style={{ width: "42%" }} />
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">2.1GB utilisés sur 5GB</p>
          </div>
          <ul className="px-6 py-4 space-y-2">
            {[
              { c: "bg-primary", t: "Photos · 1.4GB" },
              { c: "bg-[#7A8FA8]", t: "Voix · 0.5GB" },
              { c: "bg-[#8A9A78]", t: "Vidéos · 0.2GB" },
            ].map((a) => (
              <li key={a.t} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${a.c}`} />
                <span className="text-[11px] text-muted-foreground">{a.t}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {activeTab === "lettres" && (
        <>
          <div className="px-6 pt-6 pb-4 border-b border-border">
            <h3 className="font-serif text-base font-medium text-foreground">
              Prochaine ouverture
            </h3>
          </div>
          <div className="px-6 py-4">
            {mode === "heritage" ? (
              <>
                <p className="text-[10px] uppercase tracking-wider text-primary mb-2">
                  Pour Marie · Mariage
                </p>
                <p className="font-serif text-base text-foreground">Dans ~3 ans</p>
              </>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-wider text-primary mb-2">
                  Pour Léo · 18 ans
                </p>
                <p className="font-serif text-base text-foreground">En 2033</p>
                <div className="mt-4 h-[2px] bg-border rounded overflow-hidden">
                  <div className="w-[35%] h-full bg-primary" />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5">~7 ans restants</p>
              </>
            )}
          </div>
        </>
      )}
    </aside>
  );
};

/* ─────────── Shell ─────────── */
const SanctuaireShell = ({ mode }: { mode: Mode }) => {
  const [activeTab, setActiveTab] = useState<TabKey>("fil");
  return (
    <>
      {/* Mobile layout */}
      <div className="md:hidden max-w-[390px] mx-auto bg-background min-h-screen relative flex flex-col">
        <SanctuaireHeader mode={mode} />
        <SanctuaireTabs mode={mode} activeTab={activeTab} onTabChange={setActiveTab} />
        <SanctuaireContent mode={mode} activeTab={activeTab} />
        <SanctuaireFAB mode={mode} />
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block">
        <DesktopSidebar mode={mode} activeTab={activeTab} onTabChange={setActiveTab} />
        <DesktopMain mode={mode} activeTab={activeTab} />
        <DesktopPanel mode={mode} activeTab={activeTab} />
      </div>
    </>
  );
};

/* ─────────── Page ─────────── */
const SanctuairePage = () => {
  const [mode, setMode] = useState<Mode>("heritage");
  return (
    <div className="min-h-screen bg-muted/30 md:bg-background">
      <ModeToggle mode={mode} onChange={setMode} />
      <SanctuaireShell key={mode} mode={mode} />
    </div>
  );
};

export default SanctuairePage;
