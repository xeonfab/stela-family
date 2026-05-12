import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  ArrowUpRight,
  Play,
  Pause,
  Heart,
  Quote,
  Sparkles,
  Plus,
  Minus,
  Feather,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import jeanClaudePortrait from "@/assets/jean-claude-portrait-new.jpg";
import jcGardening from "@/assets/jc-gardening.jpg";
import jcTrumpet from "@/assets/jc-trumpet.jpg";
import jcHiking from "@/assets/jc-hiking.jpg";
import jcCouple from "@/assets/jc-couple-70s.jpg";
import holdingOldPhoto from "@/assets/holding-old-photo.jpg";
import womanWriting from "@/assets/woman-writing.jpg";

/* ─────────────────────────────────────────────────────────────
   Custom cursor — a soft golden halo following the pointer
   ───────────────────────────────────────────────────────────── */
const CursorHalo = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 250, damping: 25, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 25, mass: 0.4 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a,button,[data-cursor]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block mix-blend-multiply"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.9 : 0.55 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="-translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#D4AF37]/30 ring-1 ring-[#D4AF37]/50 backdrop-blur-[2px]"
      />
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Magnetic wrapper — pulls children toward the cursor
   ───────────────────────────────────────────────────────────── */
const Magnetic = ({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   SplitText — character-by-character reveal
   ───────────────────────────────────────────────────────────── */
const SplitText = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
          {w.split("").map((c, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + (wi * 4 + ci) * stagger,
              }}
            >
              {c}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

/* ─────────────────────────────────────────────────────────────
   Floating navbar
   ───────────────────────────────────────────────────────────── */
const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const items = [
    { label: "Mémoires", href: "#memoires" },
    { label: "Histoire", href: "#histoire" },
    { label: "Plume", href: "#plume" },
    { label: "Stèles", href: "#steles" },
  ];
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96%,980px)]"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "hsla(40,33%,97%,0.85)"
            : "hsla(40,33%,97%,0.35)",
          borderColor: scrolled ? "hsla(43,40%,52%,0.25)" : "hsla(43,40%,52%,0.12)",
        }}
        className="backdrop-blur-xl border rounded-full px-5 md:px-7 py-3 flex items-center justify-between shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]"
      >
        <Link to="/" className="font-serif-display text-lg md:text-xl tracking-wider text-foreground">
          Stela
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              className="text-sm text-foreground/70 hover:text-foreground relative group"
            >
              {it.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <Magnetic strength={0.25}>
          <Button variant="gold" className="px-5 py-2 text-xs h-auto">
            Créer
          </Button>
        </Magnetic>
      </motion.div>
    </motion.header>
  );
};

/* ─────────────────────────────────────────────────────────────
   HERO — cinematic portrait reveal with parallax words
   ───────────────────────────────────────────────────────────── */
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-32 pb-24"
    >
      {/* Ambient orbs */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-[#D4AF37]/10 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-[#D4AF37]/5 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ opacity }} className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Text */}
          <motion.div style={{ y: y2 }} className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-xs tracking-[0.2em] uppercase text-foreground/70">
                Mémorial Numérique
              </span>
            </motion.div>

            <h1 className="font-serif-display text-[12vw] sm:text-[10vw] lg:text-[6.5vw] leading-[0.95] font-bold text-foreground">
              <SplitText text="Ne laissez pas" />
              <br />
              <span className="italic text-[#D4AF37]">
                <SplitText text="leur lumière" delay={0.3} />
              </span>
              <br />
              <SplitText text="s'éteindre." delay={0.6} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="max-w-xl text-base md:text-lg text-foreground/65 leading-relaxed"
            >
              Un écrin numérique pour rassembler photos, voix, vidéos et hommages.
              Un sanctuaire digne, sécurisé, qui vit à travers vous.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-start gap-4 pt-2"
            >
              <Magnetic>
                <Button variant="gold" className="px-8 py-6 text-base group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Créer le Mémorial
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    >
                      <ArrowUpRight size={16} />
                    </motion.span>
                  </span>
                </Button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Button variant="goldOutline" asChild className="px-8 py-6 text-base">
                  <Link to="/memorial">Découvrir un exemple</Link>
                </Button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            style={{ y: y1, scale }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative" data-cursor>
              <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                className="relative w-[260px] sm:w-[320px] lg:w-[380px] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.3)]"
              >
                <motion.img
                  src={jeanClaudePortrait}
                  alt="Jean-Claude Dubois"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.8 }}
                  className="absolute bottom-6 left-6 right-6 text-white"
                >
                  <p className="font-serif-display text-2xl">Jean-Claude</p>
                  <p className="text-[10px] tracking-[0.3em] opacity-80 mt-1">
                    1948 — 2024
                  </p>
                </motion.div>
              </motion.div>

              {/* Floating accents */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 top-12 w-32 bg-card/90 backdrop-blur-md rounded-2xl border border-border/50 p-3 shadow-xl"
              >
                <Quote size={12} className="text-[#D4AF37]/60 mb-1" />
                <p className="text-[10px] italic font-serif-display leading-snug text-foreground/80">
                  « Allez, on ouvre une bonne bouteille ! »
                </p>
                <p className="text-[8px] text-muted-foreground mt-1">— Michel</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-8 bottom-20 w-32 bg-card/90 backdrop-blur-md rounded-2xl border border-[#D4AF37]/30 p-3 shadow-xl"
              >
                <p className="text-2xl font-serif-display font-bold text-[#D4AF37]">127</p>
                <p className="text-[9px] text-muted-foreground">souvenirs partagés</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/50">
          Faire défiler
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-[#D4AF37] to-transparent"
        />
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   MARQUEE — emotional words flowing across screen
   ───────────────────────────────────────────────────────────── */
const Marquee = () => {
  const words = [
    "Souvenirs",
    "Voix",
    "Lumière",
    "Hommages",
    "Famille",
    "Éternité",
    "Photos",
    "Présence",
  ];
  return (
    <section className="py-16 overflow-hidden border-y border-border/40">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 whitespace-nowrap"
      >
        {[...words, ...words, ...words].map((w, i) => (
          <span
            key={i}
            className="font-serif-display text-5xl md:text-7xl italic text-foreground/15"
          >
            {w} <span className="text-[#D4AF37]/40">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   MEMORY WALL — horizontal scroll-driven gallery
   ───────────────────────────────────────────────────────────── */
const memories = [
  {
    img: jcGardening,
    name: "Marie",
    date: "12 mars",
    text: "Chaque rose plantée ici porte ton souvenir. Le jardin t'attend.",
  },
  {
    img: jcTrumpet,
    name: "Léo",
    date: "8 mars",
    text: "Tu m'as appris ma première note. Je joue encore pour toi.",
  },
  {
    img: jcCouple,
    name: "Hélène",
    date: "1 mars",
    text: "Cinquante-deux ans. Le plus beau des chapitres.",
  },
  {
    img: jcHiking,
    name: "Paul",
    date: "26 février",
    text: "Le Vercors n'a plus tout à fait la même odeur sans toi.",
  },
  {
    img: holdingOldPhoto,
    name: "Sophie",
    date: "20 février",
    text: "J'ai retrouvé cette photo dans ton tiroir. Tu souris encore.",
  },
];

const MemoryWall = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section ref={ref} id="memoires" className="relative h-[300vh] bg-card">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="container mx-auto px-6 mb-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]"
              >
                01 — Le mur des souvenirs
              </motion.span>
              <h2 className="font-serif-display text-4xl md:text-6xl mt-3 max-w-2xl">
                Chaque souvenir devient un{" "}
                <span className="italic text-[#D4AF37]">éclat</span>.
              </h2>
            </div>
            <p className="hidden md:block text-sm text-muted-foreground max-w-xs">
              Faites défiler pour découvrir les hommages partagés par la famille.
            </p>
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-6 md:gap-10 pl-6 md:pl-12">
          {memories.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="shrink-0 w-[78vw] sm:w-[55vw] md:w-[36vw] lg:w-[28vw] group cursor-pointer"
              data-cursor
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                <motion.img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart size={14} className="text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase opacity-80 mb-3">
                    <span>{m.name}</span>
                    <span>{m.date}</span>
                  </div>
                  <p className="font-serif-display text-lg md:text-xl leading-snug italic">
                    « {m.text} »
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* End card */}
          <div className="shrink-0 w-[78vw] sm:w-[55vw] md:w-[36vw] lg:w-[28vw] flex items-center justify-center">
            <Magnetic>
              <button
                data-cursor
                className="aspect-square w-48 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 transition-colors flex flex-col items-center justify-center gap-2 group"
              >
                <Plus
                  size={28}
                  className="text-[#D4AF37] group-hover:rotate-90 transition-transform duration-500"
                />
                <span className="text-xs tracking-[0.2em] uppercase text-foreground/70">
                  Ajouter
                </span>
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   TIMELINE — scroll-progress story
   ───────────────────────────────────────────────────────────── */
const milestones = [
  { year: "1948", title: "Naissance", text: "Un matin de mai, à Lyon." },
  { year: "1969", title: "Rencontre avec Hélène", text: "Sur les quais du Rhône." },
  { year: "1974", title: "Le premier enfant", text: "L'arrivée de Sophie." },
  { year: "1992", title: "Le jardin", text: "Cinquante rosiers, cinquante histoires." },
  { year: "2024", title: "Le grand silence", text: "Et puis, la mémoire prend le relais." },
];

const Timeline = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineH = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} id="histoire" className="relative py-32 md:py-48">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]">
            02 — Une vie en chapitres
          </span>
          <h2 className="font-serif-display text-4xl md:text-6xl mt-4">
            Le fil d'une <span className="italic text-[#D4AF37]">existence</span>.
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Track */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />
          {/* Progress */}
          <motion.div
            style={{ height: lineH }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/30 origin-top"
          />

          <div className="space-y-24">
            {milestones.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex ${left ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`w-[46%] ${left ? "text-right pr-10" : "text-left pl-10"}`}
                  >
                    <p className="font-serif-display text-4xl md:text-5xl text-[#D4AF37]">
                      {m.year}
                    </p>
                    <p className="font-serif-display text-xl mt-2">{m.title}</p>
                    <p className="text-sm text-muted-foreground mt-2">{m.text}</p>
                  </div>
                  <motion.span
                    whileInView={{ scale: [0, 1.4, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-3 w-3 h-3 rounded-full bg-[#D4AF37] ring-4 ring-background"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   AUDIO ECHO — the voice memory
   ───────────────────────────────────────────────────────────── */
const AudioEcho = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false);
          return 0;
        }
        return p + 0.6;
      });
    }, 50);
    return () => clearInterval(id);
  }, [playing]);

  const bars = 48;
  return (
    <section className="py-32 bg-foreground/[0.97] text-background relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, hsla(43,56%,52%,0.4), transparent 50%), radial-gradient(circle at 80% 70%, hsla(43,56%,52%,0.25), transparent 50%)",
        }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]">
              03 — La voix qui demeure
            </span>
            <h2 className="font-serif-display text-4xl md:text-6xl mt-4 leading-tight">
              Réécoutez la voix qui vous a{" "}
              <span className="italic text-[#D4AF37]">élevés</span>.
            </h2>
            <p className="mt-6 text-background/60 max-w-md">
              Préservez les messages vocaux, les chants, les rires. Chaque
              fréquence devient un héritage.
            </p>
          </div>

          <div className="relative">
            <motion.div
              animate={
                playing
                  ? { boxShadow: "0 0 80px 10px hsla(43,56%,52%,0.4)" }
                  : { boxShadow: "0 0 0px 0px hsla(43,56%,52%,0)" }
              }
              transition={{ duration: 0.6 }}
              className="bg-background/5 backdrop-blur-xl border border-[#D4AF37]/20 rounded-3xl p-8"
            >
              <div className="flex items-center gap-5 mb-8">
                <Magnetic>
                  <button
                    data-cursor
                    onClick={() => setPlaying((p) => !p)}
                    className="w-16 h-16 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(212,175,55,0.6)] hover:scale-105 transition-transform"
                  >
                    <AnimatePresence mode="wait">
                      {playing ? (
                        <motion.div
                          key="p"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                        >
                          <Pause size={20} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="pl"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                        >
                          <Play size={20} className="ml-0.5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </Magnetic>
                <div>
                  <p className="font-serif-display text-xl">Souvenir vocal</p>
                  <p className="text-xs text-background/50 tracking-wider">
                    Léo · 1:24
                  </p>
                </div>
              </div>

              {/* Waveform */}
              <div className="flex items-end gap-[3px] h-20 mb-3">
                {Array.from({ length: bars }).map((_, i) => {
                  const active = (i / bars) * 100 < progress;
                  const baseH = 20 + Math.sin(i * 0.7) * 25 + Math.random() * 10;
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        height: playing && active ? baseH + Math.random() * 30 : baseH,
                        backgroundColor: active
                          ? "hsl(43,56%,52%)"
                          : "hsla(40,33%,97%,0.2)",
                      }}
                      transition={{ duration: 0.15 }}
                      className="flex-1 rounded-full"
                      style={{ minHeight: 4 }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-background/40 tracking-[0.2em]">
                <span>{Math.floor((progress / 100) * 84)}s</span>
                <span>1:24</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   AI WRITER — typewriter biography
   ───────────────────────────────────────────────────────────── */
const AIWriter = () => {
  const lines = [
    "Jean-Claude est né au printemps 1948,",
    "dans une maison qui sentait le pain chaud.",
    "Il aimait les roses, les silences,",
    "et le rire de ses petits-enfants…",
  ];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [text, setText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (lineIdx >= lines.length) return;
    const target = lines[lineIdx];
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        setTimeout(() => {
          setText("");
          setLineIdx((v) => (v + 1) % lines.length);
        }, 1800);
      }
    }, 45);
    return () => clearInterval(id);
  }, [inView, lineIdx]);

  return (
    <section ref={ref} id="plume" className="py-32 md:py-48">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src={womanWriting}
                alt="Écriture d'une biographie"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-2xl"
            >
              <Feather size={26} />
            </motion.div>
          </motion.div>

          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]">
              04 — La plume assistée
            </span>
            <h2 className="font-serif-display text-4xl md:text-6xl mt-4">
              Écrire ce qu'on{" "}
              <span className="italic text-[#D4AF37]">n'arrive plus à dire</span>.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md">
              Notre intelligence vous accompagne, mot à mot, pour transformer vos
              souvenirs épars en une biographie sensible.
            </p>

            <div className="mt-10 bg-card border border-border rounded-2xl p-8 min-h-[180px] relative shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)]">
              <Sparkles
                size={16}
                className="text-[#D4AF37] absolute top-5 right-5 animate-pulse"
              />
              <p className="font-serif-display text-2xl md:text-3xl leading-snug text-foreground italic">
                {text}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-[2px] h-[1em] align-middle bg-[#D4AF37] ml-1"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   PRICING — 3D tilt cards
   ───────────────────────────────────────────────────────────── */
const TiltCard = ({
  featured,
  children,
}: {
  featured?: boolean;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      className={`relative rounded-3xl p-8 border ${
        featured
          ? "bg-foreground text-background border-[#D4AF37]/40"
          : "bg-card border-border"
      }`}
    >
      {children}
    </motion.div>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "L'Essentiel",
      price: "79",
      sub: "Sanctuaire numérique à vie.",
      features: ["Photos & vidéos illimitées", "Affiches de cérémonie", "Accès partagé à vie"],
      cta: "Ouvrir le sanctuaire",
      featured: false,
    },
    {
      name: "Édition Frêne",
      price: "199",
      sub: "Stèle bois clair, lien invisible.",
      features: [
        "Stèle Frêne 17 × 10 cm",
        "Gravure sur-mesure",
        "Coffret de remise premium",
        "Sanctuaire numérique inclus",
      ],
      cta: "Personnaliser",
      featured: true,
    },
    {
      name: "Édition Signature",
      price: "249",
      sub: "Noyer massif, finition huilée.",
      features: [
        "Stèle Noyer 17 × 10 cm",
        "Gravure sur-mesure",
        "Finition huilée premium",
        "Sanctuaire numérique inclus",
      ],
      cta: "Personnaliser",
      featured: false,
    },
  ];

  return (
    <section id="steles" className="py-32 bg-card/40">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]">
            05 — Trois écrins
          </span>
          <h2 className="font-serif-display text-4xl md:text-6xl mt-4">
            Choisissez la <span className="italic text-[#D4AF37]">forme</span> du souvenir.
          </h2>
        </div>

        <div
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          style={{ perspective: "1200px" }}
        >
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <TiltCard featured={p.featured}>
                <p className="font-serif-display text-xl">{p.name}</p>
                <p
                  className={`text-xs mt-1 ${
                    p.featured ? "text-background/60" : "text-muted-foreground"
                  }`}
                >
                  {p.sub}
                </p>
                <div className="mt-8 flex items-baseline gap-1">
                  <span className="font-serif-display text-6xl">{p.price}</span>
                  <span className="text-sm">€</span>
                </div>
                <ul
                  className={`mt-8 space-y-3 text-sm ${
                    p.featured ? "text-background/80" : "text-foreground/80"
                  }`}
                >
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#D4AF37]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Magnetic strength={0.2}>
                  <Button
                    variant={p.featured ? "gold" : "goldOutline"}
                    className="mt-10 w-full"
                  >
                    {p.cta}
                  </Button>
                </Magnetic>
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#D4AF37] text-black text-[10px] tracking-[0.2em] uppercase">
                    Recommandé
                  </div>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   FAQ — animated accordion
   ───────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "Le sanctuaire est-il vraiment perpétuel ?",
    a: "Oui. Un paiement unique vous garantit un accès à vie pour vous et vos proches, sans abonnement caché.",
  },
  {
    q: "Mes proches doivent-ils créer un compte ?",
    a: "Non. L'accès se fait via un lien privé ou un code PIN à 4 chiffres. Aucune inscription requise.",
  },
  {
    q: "Mes données sont-elles privées ?",
    a: "Strictement. Aucun référencement, aucune publicité, aucun tracking. Le sanctuaire est invisible au public.",
  },
  {
    q: "Puis-je commander la stèle plus tard ?",
    a: "Bien sûr. Vous pouvez démarrer avec L'Essentiel et ajouter une stèle physique à tout moment.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-32">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]">
            06 — Questions
          </span>
          <h2 className="font-serif-display text-4xl md:text-6xl mt-4">
            Ce qu'on nous demande{" "}
            <span className="italic text-[#D4AF37]">souvent</span>.
          </h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  data-cursor
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full py-6 flex items-center justify-between text-left gap-6"
                >
                  <span className="font-serif-display text-xl md:text-2xl">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-muted-foreground leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   FINAL CTA — flame
   ───────────────────────────────────────────────────────────── */
const FinalCTA = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <section
      ref={ref}
      className="relative py-40 bg-foreground text-background overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, hsla(43,56%,52%,0.5), transparent 60%)",
            "radial-gradient(circle at 70% 60%, hsla(43,56%,52%,0.5), transparent 60%)",
            "radial-gradient(circle at 30% 30%, hsla(43,56%,52%,0.5), transparent 60%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <div className="container mx-auto px-6 relative text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mb-10"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [-2, 2, -2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame size={28} className="text-[#D4AF37]" />
          </motion.div>
        </motion.div>
        <h2 className="font-serif-display text-5xl md:text-7xl lg:text-8xl leading-[1] max-w-4xl mx-auto">
          <SplitText text="Allumez la flamme" />
          <br />
          <span className="italic text-[#D4AF37]">
            <SplitText text="qui ne s'éteint jamais." delay={0.3} />
          </span>
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Magnetic>
            <Button variant="gold" className="px-10 py-7 text-base">
              Créer mon Sanctuaire
            </Button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Button
              variant="goldOutline"
              asChild
              className="px-10 py-7 text-base bg-transparent text-background border-background/30 hover:bg-background hover:text-foreground"
            >
              <Link to="/memorial">Voir un exemple</Link>
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   Scroll progress bar
   ───────────────────────────────────────────────────────────── */
const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <motion.div
      style={{ scaleX: sx, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#D4AF37] z-[60]"
    />
  );
};

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */
const CopyHome = () => {
  // Smooth body color hint
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollBar />
      <CursorHalo />
      <FloatingNav />
      <main>
        <Hero />
        <Marquee />
        <MemoryWall />
        <Timeline />
        <AudioEcho />
        <AIWriter />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <footer className="py-10 text-center text-xs tracking-[0.3em] uppercase text-muted-foreground">
        Stela — Lumière éternelle
      </footer>
    </div>
  );
};

export default CopyHome;