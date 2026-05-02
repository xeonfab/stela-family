import { useState } from "react";
import { Plus, Play } from "lucide-react";

type Mode = "heritage" | "memorial";
type TabKey = "fil" | "vie" | "medias" | "lettres";
type SubTab = "etapes" | "ecrits" | "hommages";
type TraceType = "mot" | "voix" | "photo" | "etape";
type LetterStatus = "draft" | "sealed" | "locked" | "opened";

/* ─────────── ModeToggle ─────────── */
const ModeToggle = ({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) => (
  <div className="flex justify-center pt-4 pb-3">
    <div className="bg-muted rounded-full p-1 flex gap-1">
      {([
        ["heritage", "De son vivant"],
        ["memorial", "Après son départ"],
      ] as const).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            mode === key ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

/* ─────────── Header ─────────── */
const SanctuaireHeader = ({ mode }: { mode: Mode }) => {
  if (mode === "heritage") {
    return (
      <header className="px-4 pt-5 pb-3.5 border-b border-border text-center bg-background">
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
    <header className="px-4 pt-5 pb-3.5 border-b border-border text-center bg-background">
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

/* ─────────── Tabs ─────────── */
const TAB_LABELS: Record<TabKey, { heritage: string; memorial: string }> = {
  fil: { heritage: "Fil", memorial: "Fil" },
  vie: { heritage: "Ma vie", memorial: "Sa vie" },
  medias: { heritage: "Médias", memorial: "Médias" },
  lettres: { heritage: "Mes lettres", memorial: "Ses lettres" },
};

const SanctuaireTabs = ({
  mode,
  activeTab,
  onTabChange,
}: {
  mode: Mode;
  activeTab: TabKey;
  onTabChange: (t: TabKey) => void;
}) => (
  <nav className="flex border-b border-border bg-background">
    {(Object.keys(TAB_LABELS) as TabKey[]).map((key) => {
      const isActive = activeTab === key;
      return (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          className={`flex-1 py-3 text-center text-[9px] uppercase tracking-wide font-medium cursor-pointer transition-colors border-b-[1.5px] ${
            isActive ? "text-primary border-primary" : "text-muted-foreground border-transparent"
          }`}
        >
          {TAB_LABELS[key][mode]}
        </button>
      );
    })}
  </nav>
);

/* ─────────── PlayerAudio ─────────── */
const PlayerAudio = ({ duration, caption }: { duration: string; caption?: string }) => {
  const heights = [7, 13, 9, 16, 11, 14, 7, 12, 16, 9];
  return (
    <div>
      <div className="flex items-center gap-1.5 bg-card rounded-md p-2 mb-1">
        <button className="w-[22px] h-[22px] rounded-full border border-primary flex items-center justify-center flex-shrink-0">
          <Play className="w-[6px] h-[6px] fill-primary text-primary ml-px" />
        </button>
        <div className="flex-1 h-3.5 flex items-center gap-[1.5px]">
          {heights.map((h, i) => (
            <span
              key={i}
              className="w-[2.5px] rounded-full bg-primary/60"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
        <span className="text-[9px] text-muted-foreground">{duration}</span>
      </div>
      {caption && (
        <p className="mt-0.5 text-[8px] italic text-muted-foreground/70">{caption}</p>
      )}
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
  author?: {
    role: "self" | "family";
    name?: string;
    initials?: string;
    familyRole?: string;
  };
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
    <article className="py-2.5 border-b border-border last:border-0">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1">
          <span className={`w-1 h-1 rounded-full ${ts.dot}`} />
          <span className={`text-[7px] uppercase tracking-wide font-medium ${ts.text}`}>
            {ts.label}
          </span>
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
        <p className="font-serif text-sm font-normal italic text-foreground leading-snug">
          {content}
        </p>
      )}
      {type === "voix" && <PlayerAudio duration={duration ?? "0:00"} caption={caption} />}
      {type === "photo" && (
        <div
          className="w-full h-14 rounded-md mb-1 flex items-end p-1.5"
          style={{ background: imageBg }}
        >
          <span className="text-[8px] italic text-white/85">{caption}</span>
        </div>
      )}
      {type === "etape" && (
        <div className="flex items-start gap-2">
          <span className="text-[9px] text-primary tracking-wide w-8 flex-shrink-0">{year}</span>
          <div>
            <p className="text-sm font-serif text-foreground">{title}</p>
            {description && (
              <p className="text-[11px] italic text-muted-foreground">{description}</p>
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
  draft: {
    iconBg: "bg-foreground",
    iconColor: "text-primary",
    badge: "bg-primary/10 text-primary",
    badgeLabel: "En cours",
  },
  sealed: {
    iconBg: "bg-primary",
    iconColor: "text-white",
    badge: "bg-card text-muted-foreground border border-border",
    badgeLabel: "Scellée",
  },
  locked: {
    iconBg: "bg-foreground",
    iconColor: "text-primary",
    badge: "bg-foreground text-primary",
    badgeLabel: "Verrouillée",
  },
  opened: {
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
    badge: "bg-green-50 text-green-700",
    badgeLabel: "Ouverte",
  },
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
    <div className="bg-card rounded-xl p-3 flex items-start gap-2.5 mb-2">
      <div
        className={`w-[30px] h-[30px] rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${s.iconBg} ${s.iconColor}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-serif text-sm font-medium text-foreground mb-0.5">Pour {to}</p>
        <p className="text-[10px] italic text-muted-foreground">{occasion}</p>
      </div>
      <span
        className={`text-[8px] uppercase tracking-wide font-medium px-2 py-1 rounded-full flex-shrink-0 ${s.badge}`}
      >
        {s.badgeLabel}
      </span>
    </div>
  );
};

/* ─────────── FAB ─────────── */
const SanctuaireFAB = ({ mode }: { mode: Mode }) => (
  <button
    className={`fixed bottom-4 right-3.5 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-105 ${
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
  <div className="flex items-center gap-1.5 py-2">
    <span className="text-[7px] uppercase tracking-wider text-muted-foreground/60">{label}</span>
    <span className="flex-1 h-px bg-border" />
  </div>
);

const TimeMarker = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 py-2.5">
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
        <div className="bg-card border-l-2 border-primary rounded-xl p-3.5 mb-3 mt-3">
          <p className="text-[7px] uppercase tracking-wider text-primary">
            Invitation de la semaine
          </p>
          <p className="font-serif text-sm italic text-foreground mb-2.5 mt-1">
            Quel objet chez vous a une histoire que personne ne connaît ?
          </p>
          <div className="flex gap-2">
            <button className="bg-primary text-white rounded-full px-3 py-1.5 text-[9px] font-medium">
              Répondre à voix haute
            </button>
            <button className="border-[0.5px] border-primary text-primary rounded-full px-3 py-1.5 text-[9px]">
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
      <div className="bg-foreground rounded-xl p-3.5 mb-1.5 mt-3">
        <p className="text-[7px] uppercase tracking-wider text-primary/70">Sa voix · Épinglé</p>
        <p className="font-serif text-sm italic text-white mb-2.5 mt-1">Message vocal à Marie</p>
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-muted-foreground">Hélène · 2:14</span>
          <button className="w-6 h-6 rounded-full border border-primary flex items-center justify-center">
            <Play className="w-2 h-2 fill-primary text-primary ml-px" />
          </button>
        </div>
      </div>
      <p className="text-[9px] italic text-center text-muted-foreground mt-1 mb-2">
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

/* ─────────── Onglet Vie ─────────── */
const ETAPES = [
  { year: "1948", title: "Naissance à Lyon", desc: "Le 2 mai, dans le quartier de la Croix-Rousse." },
  {
    year: "1971",
    title: "Rencontre avec Pierre",
    desc: "Un dimanche de printemps, au marché de Vieux-Lyon.",
  },
  {
    year: "1974",
    title: "Naissance de Marie",
    desc: "Notre premier enfant. Je n'avais jamais été aussi heureuse.",
  },
  {
    year: "1989",
    title: "La maison du Luberon",
    desc: "On a tout vendu pour acheter ce mas. On ne l'a jamais regretté.",
  },
  {
    year: "2012",
    title: "Pierre nous a quittés",
    desc: "Le jardin n'a plus jamais eu le même silence.",
  },
];

const ECRITS = [
  {
    title: "La recette de tarte de ma mère",
    extract: "Farine, beurre, sucre, pommes du jardin. Elle ne mesurait jamais rien...",
    date: "Déposé le 12 avril",
  },
  {
    title: "Ce que j'aurais voulu dire à Pierre",
    extract:
      "Je ne t'ai jamais dit combien tu m'as manqué même quand tu étais là...",
    date: "Déposé le 3 avril",
  },
];

const HOMMAGES = [
  {
    name: "Marie",
    role: "Sa fille",
    initials: "M",
    date: "20 mars",
    text: "Maman, je retrouve ta voix chaque fois que je pense à toi.",
  },
  {
    name: "Léo",
    role: "Son petit-fils",
    initials: "L",
    date: "21 mars",
    text: "Grand-mère, tu m'avais appris à siffloter.",
  },
  {
    name: "Sophie",
    role: "Sa nièce",
    initials: "S",
    date: "22 mars",
    text: "Tante Hélène, je n'oublierai jamais nos déjeuners du dimanche.",
  },
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
      <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
        {subs.map((s) => {
          const active = sub === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setSub(s.key)}
              className={`text-[9px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                active
                  ? "bg-primary text-white"
                  : "bg-card text-muted-foreground border border-border"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {sub === "etapes" && (
        <div>
          <h2 className="font-serif text-[17px] font-medium text-foreground mb-4">
            {mode === "heritage" ? "Ma vie en étapes" : "Sa vie en étapes"}
          </h2>
          <div className="relative pl-5">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
            {ETAPES.map((e, i) => (
              <div key={i} className="relative pb-5 last:pb-0">
                <span className="absolute left-[-14px] top-[3px] w-[7px] h-[7px] rounded-full bg-background border border-primary" />
                <p className="text-[9px] text-primary tracking-wide mb-0.5">{e.year}</p>
                <p className="font-serif text-sm text-foreground mb-0.5">{e.title}</p>
                <p className="text-[11px] italic text-muted-foreground leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
          {mode === "heritage" && (
            <div className="text-right mt-3">
              <button className="text-[9px] text-primary">+ Marquer une étape</button>
            </div>
          )}
        </div>
      )}

      {sub === "ecrits" && (
        <div>
          {ECRITS.map((e, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-3.5 mb-2 border-l-2 border-primary/30"
            >
              <p className="font-serif text-sm font-medium text-foreground mb-1">{e.title}</p>
              <p className="text-[12px] italic text-muted-foreground leading-relaxed line-clamp-3">
                {e.extract}
              </p>
              <p className="text-[9px] text-muted-foreground/60 mt-2">{e.date}</p>
            </div>
          ))}
        </div>
      )}

      {sub === "hommages" && (
        <div>
          {mode === "heritage" ? (
            <div className="text-center py-10">
              <p className="text-primary/30 text-2xl mb-3">✦</p>
              <p className="font-serif text-sm italic text-muted-foreground/50">
                Les hommages de votre famille apparaîtront ici après votre départ.
              </p>
            </div>
          ) : (
            HOMMAGES.map((h, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-3 mb-2 border-t-[1.5px] border-primary"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground font-serif text-[9px] flex items-center justify-center">
                    {h.initials}
                  </span>
                  <span className="text-[10px] font-medium text-foreground">{h.name}</span>
                  <span className="text-[9px] italic text-muted-foreground">{h.role}</span>
                  <span className="text-[9px] text-muted-foreground ml-auto">{h.date}</span>
                </div>
                <p className="font-serif text-sm italic text-foreground leading-relaxed">
                  {h.text}
                </p>
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
    <span className="text-[7px] uppercase tracking-wider text-muted-foreground/60">{children}</span>
    <span className="flex-1 h-px bg-border" />
  </div>
);

const MediasTab = ({ mode }: { mode: Mode }) => (
  <div>
    <SectionEyebrow>Voix & Vidéos</SectionEyebrow>
    <div className="space-y-2">
      <PlayerAudio duration="2:14" caption="Message à Marie" />
      <PlayerAudio duration="4:08" caption="Recette de tarte" />
      <PlayerAudio duration="1:33" caption="Mon Luberon bien-aimé" />
    </div>

    <SectionEyebrow>Photos</SectionEyebrow>
    <div className="grid grid-cols-3 gap-1 mb-4">
      {PHOTOS.map((p, i) => (
        <div
          key={i}
          className="aspect-square rounded-md overflow-hidden relative cursor-pointer"
          style={{ background: p.gradient }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/30">
            <p className="text-[7px] text-white/80 italic">{p.caption}</p>
          </div>
          {mode === "memorial" && (
            <div className="absolute top-1 left-1 bg-black/40 px-1 text-[7px] text-white rounded-sm">
              {p.attr}
            </div>
          )}
        </div>
      ))}
      {mode === "heritage" && (
        <div className="aspect-square rounded-md bg-card flex items-center justify-center text-[10px] text-muted-foreground">
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
      <div className="pt-3">
        <h2 className="font-serif text-base font-medium text-foreground mb-4">
          Mes lettres scellées
        </h2>
        <LetterCard mode={mode} to="Marie" occasion="Le jour de son mariage" status="sealed" />
        <LetterCard mode={mode} to="Léo" occasion="Ses 18 ans — en 2033" status="draft" />
        <LetterCard
          mode={mode}
          to="Sophie"
          occasion="Un an après mon départ"
          status="sealed"
        />
        <button className="mt-4 w-full py-3 border-dashed border border-primary/40 rounded-xl text-[11px] text-primary/70 italic text-center">
          + Écrire une lettre scellée
        </button>
      </div>
    );
  }
  return (
    <div className="pt-3">
      <h2 className="font-serif text-base font-medium text-foreground mb-4">Ses lettres</h2>
      <LetterCard mode={mode} to="Marie" occasion="Le jour de son mariage" status="locked" />
      <LetterCard mode={mode} to="Léo" occasion="Ses 18 ans — en 2033" status="locked" />
      <div>
        <LetterCard
          mode={mode}
          to="Sophie"
          occasion="Un an après son départ"
          status="opened"
        />
        <p className="text-[9px] italic text-muted-foreground -mt-1 ml-[42px] mb-2">
          Ouverte le 18 mars 2027
        </p>
      </div>
    </div>
  );
};

/* ─────────── Content router ─────────── */
const SanctuaireContent = ({ mode, activeTab }: { mode: Mode; activeTab: TabKey }) => {
  return (
    <div className="px-4 pb-20 overflow-y-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
      {activeTab === "fil" && <FilTab mode={mode} />}
      {activeTab === "vie" && <VieTab mode={mode} />}
      {activeTab === "medias" && <MediasTab mode={mode} />}
      {activeTab === "lettres" && <LettresTab mode={mode} />}
    </div>
  );
};

/* ─────────── Shell ─────────── */
const SanctuaireShell = ({ mode }: { mode: Mode }) => {
  const [activeTab, setActiveTab] = useState<TabKey>("fil");
  return (
    <div className="max-w-sm mx-auto bg-background min-h-screen relative border-x border-border">
      <SanctuaireHeader mode={mode} />
      <SanctuaireTabs mode={mode} activeTab={activeTab} onTabChange={setActiveTab} />
      <SanctuaireContent mode={mode} activeTab={activeTab} />
      <SanctuaireFAB mode={mode} />
    </div>
  );
};

/* ─────────── Page ─────────── */
const SanctuairePage = () => {
  const [mode, setMode] = useState<Mode>("heritage");
  return (
    <div className="min-h-screen bg-muted/30">
      <ModeToggle mode={mode} onChange={setMode} />
      <SanctuaireShell key={mode} mode={mode} />
    </div>
  );
};

export default SanctuairePage;