import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useInView, MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, Users, Lock, Check, Play, Pause, ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ---------- Hooks & primitives ---------- */

const useMouse = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const h = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [x, y]);
  return { x, y };
};

const Cursor = () => {
  const { x, y } = useMouse();
  const sx = useSpring(x, { stiffness: 250, damping: 25, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 25, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block mix-blend-difference"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-primary/60 backdrop-blur-sm" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary" />
    </motion.div>
  );
};

const Magnetic = ({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

const SplitWords = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const Reveal = ({ children, y = 40, delay = 0 }: { children: React.ReactNode; y?: number; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ---------- Top progress bar ---------- */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return (
    <motion.div
      style={{ scaleX: sx, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-[90]"
    />
  );
};

/* ---------- HERO ---------- */
const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const o = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const { x: mx, y: my } = useMouse();
  const lx = useTransform(mx, (v) => (v - window.innerWidth / 2) / 60);
  const ly = useTransform(my, (v) => (v - window.innerHeight / 2) / 60);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#0A0A0A] text-[#FAFAFA] overflow-hidden flex items-center">
      {/* Ambient orbs */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          style={{ x: lx, y: ly }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          animate={{
            background: [
              "radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 60%)",
              "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 60%)",
              "radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          style={{ x: useTransform(lx, (v) => -v), y: useTransform(ly, (v) => -v) }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,#3a2a18_0%,transparent_60%)] opacity-40 blur-3xl"
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            initial={{ x: Math.random() * 100 + "%", y: "110%" }}
            animate={{ y: "-10%" }}
            transition={{
              duration: 12 + Math.random() * 10,
              delay: Math.random() * 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ left: Math.random() * 100 + "%" }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity: o }} className="relative container mx-auto px-6 text-center max-w-5xl py-32">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.4 }}
          className="text-[10px] uppercase text-primary mb-12 font-light"
        >
          Stela — Après un départ
        </motion.p>

        <h1 className="font-serif-display text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.95] tracking-tight">
          <SplitWords text="Lui faire" />
          <br />
          <SplitWords text="une" delay={0.3} />{" "}
          <span className="inline-block overflow-hidden align-bottom">
            <motion.em
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-primary not-italic font-serif-display italic relative"
            >
              place.
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-2 left-0 right-0 h-px bg-primary origin-left"
              />
            </motion.em>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
          className="mt-12 space-y-2 font-serif-display italic text-xl lg:text-2xl text-white/70"
        >
          <p>Pour que sa mémoire ait un endroit.</p>
          <p>Pour que sa voix ne s'efface pas.</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1 }}
          className="mt-10 text-white/50 max-w-xl mx-auto text-sm"
        >
          Un Sanctuaire privé en son nom. Une stèle en noyer gravée, livrée chez vous.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: 1 }}
          className="mt-14 flex flex-col items-center gap-5"
        >
          <Magnetic strength={0.4}>
            <a href="#commande" className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground font-medium overflow-hidden">
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }} whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
              <span className="relative">Commencer</span>
              <motion.span
                className="relative" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
              >
                <ArrowRight size={18} />
              </motion.span>
            </a>
          </Magnetic>
          <p className="text-[11px] text-white/40 tracking-wide">
            30 jours gratuits · Sans carte bancaire · Puis à partir de 89€
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40"
      >
        <p className="text-[9px] tracking-[0.5em] uppercase">Découvrir</p>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ---------- Chambers (sticky reveal) ---------- */
const chambers = [
  { symbol: "✦", n: "Première chambre", title: "Les Mots", text: "Ses écrits retrouvés, les vôtres aussi. Des hommages. Des lettres. Les souvenirs que chacun veut déposer.", footer: "Toute la famille peut contribuer." },
  { symbol: "◻", n: "Deuxième chambre", title: "Les Photos", text: "Les photos retrouvées dans les albums, sur les téléphones — réunies en un seul endroit, accessibles à tous.", footer: "Photos partagées par toute la famille." },
  { symbol: "◈", n: "Troisième chambre", title: "Les Voix & Vidéos", text: "Des messages vocaux retrouvés sur un téléphone. Une vidéo de famille. Une voix enregistrée.", footer: "La trace la plus précieuse." },
];

const Chambers = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActive(Math.min(chambers.length - 1, Math.floor(v * chambers.length)));
    });
  }, [scrollYProgress]);

  return (
    <section ref={ref} className="relative bg-background" style={{ height: `${chambers.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-6">Le Sanctuaire</p>
              <h2 className="font-serif-display text-4xl lg:text-6xl font-bold leading-tight">
                Un espace pour <em className="text-primary not-italic font-serif-display italic">tout ce qui mérite de rester.</em>
              </h2>
              <p className="mt-6 text-muted-foreground max-w-md">
                Trois chambres pour déposer et retrouver. Faites défiler pour les visiter.
              </p>
            </Reveal>
            <div className="mt-10 flex gap-2">
              {chambers.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ width: active === i ? 48 : 16, backgroundColor: active === i ? "hsl(var(--primary))" : "hsl(var(--border))" }}
                  className="h-[2px] rounded-full"
                />
              ))}
            </div>
          </div>

          <div className="relative h-[500px]">
            <AnimatePresence mode="wait">
              {chambers.map((c, i) => active === i && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -60, rotateX: 15 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 rounded-3xl border border-border/40 bg-card/60 backdrop-blur-xl p-10 lg:p-14 shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.2)]"
                  style={{ transformPerspective: 1000 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-primary text-6xl mb-8"
                  >
                    {c.symbol}
                  </motion.div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{c.n}</p>
                  <h3 className="font-serif-display text-4xl lg:text-5xl font-bold mb-6">{c.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">{c.text}</p>
                  <p className="text-sm italic text-foreground/70 border-t border-border/40 pt-6">{c.footer}</p>
                  <div className="absolute bottom-6 right-6 text-xs text-muted-foreground/40 font-serif-display">
                    0{i + 1} / 0{chambers.length}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Steps (horizontal scroll) ---------- */
const steps = [
  { n: "01", icon: "📖", title: "Ouvrez le Sanctuaire", text: "En quelques minutes, créez un espace privé et intemporel dédié à son histoire, ses passions et son visage." },
  { n: "02", icon: "🤝", title: "Réunissez ceux qui l'aimaient", text: "Invitez le cercle familial et amical. Un lien privé suffit pour rassembler les cœurs autour de sa mémoire." },
  { n: "03", icon: "✦", title: "Enrichissez sa mémoire", text: "Laissez chacun déposer une photo oubliée, une anecdote précieuse, un message vocal. Son souvenir s'enrichit jour après jour." },
];

const Steps = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section ref={ref} className="relative bg-[#FAFAF7]" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">Un geste simple</p>
            <h2 className="font-serif-display text-4xl lg:text-6xl font-bold leading-tight max-w-3xl">
              Honorer sa mémoire, <em className="text-primary not-italic font-serif-display italic">ensemble.</em>
            </h2>
          </Reveal>
        </div>
        <motion.div style={{ x }} className="flex gap-8 pl-6 lg:pl-24">
          {steps.map((s, i) => (
            <div key={i} className="w-[85vw] lg:w-[60vw] flex-shrink-0 grid lg:grid-cols-[auto_1fr] gap-10 items-center">
              <div className="font-serif-display text-[10rem] lg:text-[16rem] leading-none text-primary/15 select-none">
                {s.n}
              </div>
              <div className="max-w-lg">
                <div className="text-5xl mb-6">{s.icon}</div>
                <h3 className="font-serif-display text-3xl lg:text-5xl font-bold mb-6">{s.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ---------- Audio waveform mockup ---------- */
const Waveform = ({ playing }: { playing: boolean }) => {
  const bars = useMemo(() => Array.from({ length: 48 }, () => 0.2 + Math.random() * 0.8), []);
  return (
    <div className="flex items-center gap-[3px] h-10">
      {bars.map((b, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-primary"
          initial={{ height: `${b * 100}%` }}
          animate={playing ? { height: [`${b * 100}%`, `${(0.2 + Math.random() * 0.8) * 100}%`, `${b * 100}%`] } : { height: `${b * 100}%` }}
          transition={{ duration: 0.6 + Math.random() * 0.4, repeat: playing ? Infinity : 0, delay: i * 0.02 }}
        />
      ))}
    </div>
  );
};

/* ---------- En pratique ---------- */
const Pratique = () => {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const features = [
    { Icon: Mic, title: "Sa voix, épinglée en haut", text: "Le premier enregistrement vocal retrouvé est épinglé. La famille l'écoute quand elle est prête. Une présence douce, non imposée." },
    { Icon: Users, title: "Chaque membre contribue", text: "Marie ajoute une photo retrouvée. Léo écrit un souvenir. Les contributions s'ajoutent aux traces qu'il a laissées de son vivant." },
    { Icon: Lock, title: "Privé et sans publicité", text: "Aucun réseau social, aucune notification, aucune publicité. Le Sanctuaire est un espace d'intimité — uniquement pour les personnes invitées." },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-6">Ce que votre famille vivra</p>
            <h2 className="font-serif-display text-4xl lg:text-6xl font-bold">
              Le Sanctuaire <em className="text-primary not-italic font-serif-display italic">en pratique.</em>
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y }}>
            <div className="rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl p-8 shadow-[0_40px_120px_-30px_hsl(var(--primary)/0.3)]">
              <div className="flex items-center gap-4 pb-6 border-b border-border/40">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center font-serif-display text-primary font-bold"
                >
                  JC
                </motion.div>
                <div>
                  <p className="font-serif-display text-lg font-bold">Jean-Claude Moreau</p>
                  <p className="text-xs text-muted-foreground">12 mars 1952 — 8 novembre 2026</p>
                  <p className="text-[10px] tracking-wider uppercase text-primary mt-1">Marie et 3 autres</p>
                </div>
              </div>
              <div className="flex gap-6 mt-6 text-xs tracking-wider uppercase border-b border-border/40 pb-3">
                {["Fil", "Sa vie", "Médias", "Ses lettres"].map((t, i) => (
                  <span key={i} className={i === 0 ? "text-primary border-b-2 border-primary pb-2" : "text-muted-foreground"}>{t}</span>
                ))}
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5"
              >
                <p className="text-[10px] tracking-widest uppercase text-primary mb-3">Sa voix · Épinglé</p>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setPlaying(!playing)}
                    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
                  >
                    {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                  </motion.button>
                  <div className="flex-1">
                    <Waveform playing={playing} />
                  </div>
                </div>
                <p className="text-xs italic text-muted-foreground mt-4">« Quand vous êtes prêt. Pas avant. »</p>
              </motion.div>
              <div className="mt-6 space-y-3">
                {[
                  { tag: "Photo · Marie", text: "Retrouvée dans l'atelier" },
                  { tag: "Mot · JC · Déposé de son vivant", text: "« Mon jardin du Luberon. Ces matins-là m'appartenaient. »", italic: true },
                ].map((it, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4, borderColor: "hsl(var(--primary))" }}
                    className="rounded-2xl border border-border/50 p-4"
                  >
                    <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">{it.tag}</p>
                    <p className={`text-sm ${it.italic ? "font-serif-display italic" : ""}`}>{it.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-12">
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group relative pl-6 border-l border-border/50 hover:border-primary transition-colors">
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} className="inline-block">
                    <f.Icon className="text-primary mb-4" />
                  </motion.div>
                  <h3 className="font-serif-display text-2xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- The Stèle: 3D parallax with mouse tilt ---------- */
const Stele = () => {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 15 });
  const sry = useSpring(ry, { stiffness: 120, damping: 15 });

  const features = [
    { title: "La noblesse du Noyer", text: "Un bloc massif façonné et gravé sur-mesure. Une présence discrète et élégante dans votre salon — ni urne, ni tombe, ni gadget." },
    { title: "La magie du sans contact", text: "Une puce NFC est dissimulée sous le bois. Un simple effleurement avec votre téléphone suffit — le Sanctuaire s'ouvre instantanément." },
    { title: "L'accès immédiat", text: "Zéro mot de passe à retenir. Zéro application à télécharger. Toute la famille y accède — même les moins à l'aise avec la technologie." },
    { title: "Plusieurs stèles, un seul Sanctuaire", text: "Chaque foyer peut avoir sa propre stèle. Toutes ouvrent le même Sanctuaire. Une présence dans chaque maison de la famille." },
  ];

  return (
    <section ref={ref} className="relative py-32 lg:py-44 bg-[#0A0A0A] text-[#FAFAFA] overflow-hidden">
      <div className="absolute inset-0 opacity-50"
        style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.12) 0%, transparent 60%)" }} />

      <div className="relative container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-6">Le geste & la matière</p>
            <h2 className="font-serif-display text-4xl lg:text-6xl font-bold leading-tight">
              Touchez le bois.<br />
              <em className="text-primary not-italic font-serif-display italic">Retrouvez leur voix.</em>
            </h2>
            <p className="mt-6 text-white/60 text-lg">
              Fini le granit froid. Stela réinvente le recueillement à travers un objet d'artisanat conçu pour vivre au cœur de votre maison.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="flex justify-center" style={{ perspective: 1500 }}>
            <motion.div
              ref={cardRef}
              onMouseMove={(e) => {
                const r = cardRef.current!.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                ry.set(px * 25); rx.set(-py * 25);
              }}
              onMouseLeave={() => { rx.set(0); ry.set(0); }}
              style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
              className="relative w-72 h-[500px] rounded-3xl bg-gradient-to-b from-[#6b4628] via-[#3d2614] to-[#1f1208] shadow-[0_60px_140px_-30px_rgba(212,175,55,0.4)] flex flex-col items-center justify-center text-center p-10"
            >
              {/* wood grain overlay */}
              <div className="absolute inset-0 rounded-3xl opacity-20 mix-blend-overlay"
                style={{ background: "repeating-linear-gradient(180deg, transparent 0px, rgba(255,255,255,0.1) 1px, transparent 3px, transparent 12px)" }} />
              {/* gold sheen */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-30"
                animate={{ background: ["linear-gradient(120deg, transparent 30%, rgba(212,175,55,0.4) 50%, transparent 70%)", "linear-gradient(120deg, transparent 70%, rgba(212,175,55,0.4) 90%, transparent 110%)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              />
              <div style={{ transform: "translateZ(40px)" }} className="relative">
                <p className="font-serif-display text-3xl text-[#FAFAFA] font-bold">Jean-Claude</p>
                <p className="font-serif-display text-3xl text-[#FAFAFA] font-bold">Dubois</p>
                <div className="my-6 w-12 h-px bg-primary mx-auto" />
                <p className="text-xs tracking-[0.3em] text-primary">1948 — 2024</p>
              </div>
              <motion.div
                style={{ transform: "translateZ(60px)" }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-0 right-0 text-center"
              >
                <Sparkles size={20} className="text-primary mx-auto mb-2" />
                <p className="text-[9px] tracking-[0.3em] uppercase text-white/60">Posez votre téléphone</p>
              </motion.div>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="border-t border-white/15 pt-6 group">
                  <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.6 }} className="text-primary text-xl mb-4">◇</motion.div>
                  <h3 className="font-serif-display text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-white/65 leading-relaxed text-sm">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-white/40 mt-20">
          Noyer massif · Gravure laser · NFC intégré
        </p>
      </div>
    </section>
  );
};

/* ---------- Parvis ---------- */
const Parvis = () => (
  <section className="py-32 bg-background">
    <div className="container mx-auto px-6 max-w-3xl text-center">
      <Reveal>
        <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-6">Le Parvis</p>
        <h2 className="font-serif-display text-4xl lg:text-6xl font-bold mb-6">
          Un espace pour <em className="text-primary not-italic font-serif-display italic">les condoléances.</em>
        </h2>
        <p className="text-muted-foreground mb-12">
          Pendant les 30 premiers jours, un espace ouvert est disponible pour les proches — sans compte requis. Après 30 jours, le Parvis se ferme. Le Sanctuaire privé prend toute la place.
        </p>
      </Reveal>
      <div className="rounded-3xl border border-border/40 bg-card/70 backdrop-blur p-10 text-left">
        <ul className="space-y-4">
          {[
            "Accessible par QR code — aucun compte requis",
            "Messages de condoléances pendant 30 jours",
            "Distinct du Sanctuaire privé — les deux espaces ne se mélangent pas",
          ].map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80">{t}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

/* ---------- Founder ---------- */
const Founder = () => (
  <section className="py-32 lg:py-44 bg-[#0A0A0A] text-[#FAFAFA]">
    <div className="container mx-auto px-6 max-w-3xl text-center">
      <Reveal>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-16 h-16 mx-auto rounded-full border border-primary flex items-center justify-center font-serif-display text-primary text-xl mb-6"
        >
          F
        </motion.div>
        <p className="font-medium">Fabien</p>
        <p className="text-xs text-white/50 tracking-wider mb-12">Fondateur de Stela</p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="font-serif-display italic text-2xl lg:text-4xl leading-relaxed text-white/95">
          « Stela est né d'un manque personnel — celui d'un endroit où revenir après avoir perdu quelqu'un. »
        </p>
      </Reveal>
      <Reveal delay={0.4}>
        <p className="mt-12 text-white/65 leading-relaxed">
          Quand mon grand-père est parti, j'aurais voulu retrouver sa voix. Pas une simulation, pas un algorithme — juste lui, tel qu'il était. J'aurais voulu que mes enfants puissent l'entendre un jour, même sans l'avoir connu. Stela est cet endroit.
        </p>
      </Reveal>
      <Reveal delay={0.5}>
        <p className="mt-10 font-serif-display italic text-lg text-primary/90">
          « La voix est la première chose que le cerveau oublie. »
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------- Pricing tilt cards ---------- */
const TiltCard = ({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative p-8 lg:p-10 rounded-3xl flex flex-col ${highlight ? "border border-primary/60 bg-card shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.4)]" : "border border-border/50 bg-card/70"}`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-[10px] tracking-widest uppercase">
          Recommandé
        </div>
      )}
      {children}
    </motion.div>
  );
};

const Pricing = () => {
  const offers = [
    { eyebrow: "Accès gratuit", name: "Découverte", price: "0€", meta: "30 jours · Sans carte bancaire", desc: "Pour déposer les premiers souvenirs et ressentir ce que le Sanctuaire peut faire pour votre famille.", features: ["Sanctuaire activé immédiatement", "Les trois chambres — Mots, Photos, Voix", "Accès famille complet", "Le Parvis — condoléances 30 jours", "Aucune carte bancaire requise"], cta: "Activer gratuitement" },
    { eyebrow: "Le Sanctuaire", name: "Sanctuaire permanent", price: "89€", meta: "Paiement unique · Garanti 25 ans", desc: "Le Sanctuaire permanent pour toute la famille. Ajoutez une stèle quand vous le souhaitez.", features: ["Sanctuaire privé — les trois chambres", "Accès famille complet · partout dans le monde", "Le Parvis — condoléances 30 jours", "5GB de stockage · Garanti 25 ans", "Export complet des données"], cta: "Activer le Sanctuaire" },
    { eyebrow: "Tout compris", name: "Sanctuaire + Stèle", price: "249€", meta: "Paiement unique · Stèle incluse", desc: "Le Sanctuaire avec la stèle en noyer massif gravée et livrée chez vous.", features: ["Tout ce qui est dans l'offre à 89€", "<strong>Stèle en noyer massif gravée</strong>", "Livrée à domicile en 7-10 jours", "NFC intégré — ouvre le Sanctuaire au toucher", "Stèles additionnelles commandables"], cta: "Commander la stèle", highlight: true },
  ];

  return (
    <section id="commande" className="py-32 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-6">Nos offres</p>
            <h2 className="font-serif-display text-4xl lg:text-6xl font-bold">
              Commencez <em className="text-primary not-italic font-serif-display italic">gratuitement.</em>
            </h2>
            <p className="mt-6 text-muted-foreground">
              Activez le Sanctuaire maintenant, sans carte bancaire. Prenez le temps de ressentir ce que Stela peut faire pour votre famille.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {offers.map((o, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <TiltCard highlight={o.highlight}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-3">{o.eyebrow}</p>
                <h3 className="font-serif-display text-2xl font-bold mb-2">{o.name}</h3>
                <div className="flex items-baseline gap-2 mt-4">
                  <p className="font-serif-display text-5xl font-bold">{o.price}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2 mb-6">{o.meta}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{o.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {o.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80" dangerouslySetInnerHTML={{ __html: f }} />
                    </li>
                  ))}
                </ul>
                <Magnetic strength={0.2}>
                  <Button variant={o.highlight ? "gold" : "goldOutline"} className="w-full py-6">{o.cta}</Button>
                </Magnetic>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 p-8 lg:p-10 rounded-3xl border border-border/40 bg-card/70 flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Stèles additionnelles</p>
              <h3 className="font-serif-display text-2xl font-bold mb-2">
                Une stèle pour chaque foyer qui veut qu'il soit présent
              </h3>
              <p className="text-muted-foreground text-sm">
                Noyer massif · Gravure identique · NFC relié au même Sanctuaire · Adresse au choix
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <p className="font-serif-display text-4xl font-bold">159€</p>
              <Magnetic><Button variant="goldOutline" className="px-8 py-6">Commander</Button></Magnetic>
            </div>
          </div>
        </Reveal>
        <p className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto">
          La garantie 25 ans démarre à la date du décès. Vos données sont exportables à tout moment et vous appartiennent.
        </p>
      </div>
    </section>
  );
};

/* ---------- Testimonials marquee ---------- */
const Testimonials = () => {
  const items = [
    { quote: "Mon père a utilisé Stela pendant deux ans avant de partir. On pose le téléphone sur la stèle et sa voix est là. C'est lui.", name: "Marie, 46 ans", meta: "Sanctuaire ouvert depuis novembre 2024" },
    { quote: "On a retrouvé un message vocal de lui sur le vieux téléphone de ma mère. Maintenant tous ses petits-enfants peuvent l'écouter.", name: "Sophie, 52 ans", meta: "Commandée 3 semaines après le départ de son père" },
    { quote: "Ma mère pose le téléphone sur la stèle chaque dimanche matin pour écouter la voix de mon père. C'est devenu son rituel.", name: "Thomas, 44 ans", meta: "Stèle commandée il y a 6 mois · 3 foyers connectés" },
  ];
  return (
    <section className="py-32 bg-[#FAFAF7]">
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-6">Ils l'ont fait</p>
            <h2 className="font-serif-display text-4xl lg:text-6xl font-bold">
              Ce qu'ils ont <em className="text-primary not-italic font-serif-display italic">retrouvé.</em>
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className="h-full p-8 lg:p-10 rounded-3xl border border-border/40 bg-card/80 backdrop-blur"
              >
                <div className="text-primary text-3xl mb-4 font-serif-display">"</div>
                <p className="font-serif-display text-lg italic leading-relaxed text-foreground/90">{t.quote}</p>
                <div className="mt-8 pt-6 border-t border-border/40">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.meta}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="text-center font-serif-display italic text-xl text-foreground/80 mt-20 max-w-2xl mx-auto">
            « Ce que vous déposez ici appartient à votre famille pour une génération. Nous en sommes les gardiens. »
          </p>
          <p className="text-center text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-6">
            Stela · Mémorial d'intimité · Depuis 2026
          </p>
        </Reveal>
      </div>
    </section>
  );
};

/* ---------- Page ---------- */
const MemorialLP2 = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Chambers />
      <Steps />
      <Pratique />
      <Stele />
      <Parvis />
      <Founder />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default MemorialLP2;
