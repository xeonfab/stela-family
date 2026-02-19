import { BookOpen, HeartHandshake, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
{
  icon: BookOpen,
  title: "Ouvrez le Sanctuaire",
  text: "En quelques minutes, créez un espace digne et intemporel dédié à son histoire, ses passions et son visage."
},
{
  icon: HeartHandshake,
  title: "Réunissez ceux qui l'aimaient",
  text: "Invitez le cercle familial et amical à se recueillir. Un lien privé ou un QR Code discret suffit pour rassembler les cœurs."
},
{
  icon: Sparkles,
  title: "Ravivez la Flamme",
  text: "Laissez chacun déposer une photo oubliée, une anecdote précieuse ou un message vocal. Regardez son souvenir s'enrichir jour après jour."
}];


const FeatureMemoryWall = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden lg:py-[64px]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`
      }}>

      {/* Subtle warm light leak */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div
        className={`container mx-auto px-6 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* Header */}
        <p className="text-primary font-sans-body uppercase tracking-[0.2em] text-sm font-semibold mb-4">
          Un Geste Simple
        </p>
        <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight max-w-2xl mx-auto">
          Honorer sa mémoire, <em className="not-italic font-serif-display italic">ensemble.</em>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mt-6">
          Transformez le chagrin en partage. Stela n'est pas un outil, c'est le lieu où son histoire continue de s'écrire.
        </p>

        {/* 3 Steps with connecting line */}
        <div className="relative grid md:grid-cols-3 gap-10 lg:gap-14 mt-16 lg:mt-20">
          {/* Connecting dashed line behind icons */}
          <div className="hidden md:block absolute top-7 left-[16.67%] right-[16.67%] border-t border-dashed border-primary/20 pointer-events-none" />

          {steps.map((step, i) =>
          <div
            key={i}
            className={`relative flex flex-col items-center text-center space-y-5 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: `${200 + i * 150}ms` }}>

              {/* Icon box with step number badge */}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center relative z-10">
                  <step.icon size={26} className="text-primary" />
                </div>
                {/* Step number — gold circle overlapping top-left */}
                <span className="absolute -top-2 -left-2 z-20 w-7 h-7 rounded-full bg-primary text-primary-foreground font-serif-display font-bold flex items-center justify-center shadow-soft text-2xl text-center pb-[6px]">
                  {i + 1}
                </span>
              </div>

              <h3 className="font-serif-display text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-[15px] max-w-xs">
                {step.text}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default FeatureMemoryWall;