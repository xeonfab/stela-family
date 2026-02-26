import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, QrCode, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─── Hero ─── */
const HeroSection = () => {
  const [form, setForm] = useState({ agency: "", address: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        {/* Photo placeholder */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md aspect-[3/4] rounded-2xl bg-[#F0EEEA] border border-border/30 shadow-soft flex items-center justify-center">
            <span className="text-muted-foreground/40 text-sm font-sans-body tracking-wide">Photo présentoir A4</span>
          </div>
        </div>

        {/* Text + form */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <p className="uppercase tracking-[0.2em] text-sm font-semibold font-sans-body" style={{ color: "#D4AF37" }}>
            Réservé aux agences indépendantes
          </p>
          <h1 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight" style={{ color: "#2C2C2C" }}>
            Recevez votre premier Kit Cérémonie offert.
          </h1>
          <p className="text-lg leading-relaxed max-w-lg mx-auto lg:mx-0" style={{ color: "#2C2C2C" }}>
            Découvrez Stela, l'espace de recueillement numérique premium. Commandez votre présentoir physique gratuit aujourd'hui, testez-le avec votre prochaine famille.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="rounded-xl p-6 space-y-4 max-w-lg mx-auto lg:mx-0" style={{ backgroundColor: "#F5F4F0" }}>
              <Input
                placeholder="Nom de l'agence"
                value={form.agency}
                onChange={(e) => setForm({ ...form, agency: e.target.value })}
                required
                className="border-border/20 bg-background/80 focus-visible:ring-primary"
              />
              <Input
                placeholder="Adresse d'expédition complète"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
                className="border-border/20 bg-background/80 focus-visible:ring-primary"
              />
              <Input
                type="email"
                placeholder="Votre email pro"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="border-border/20 bg-background/80 focus-visible:ring-primary"
              />
              <Button type="submit" className="w-full h-12 text-base font-semibold rounded-lg" style={{ backgroundColor: "#D4AF37", color: "#fff" }}>
                Recevoir mon Kit gratuit par courrier
              </Button>
              <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
                ✓ Sans engagement&nbsp;&nbsp;•&nbsp;&nbsp;Expédition sous 48h
              </p>
            </form>
          ) : (
            <div className="rounded-xl p-8 text-center space-y-3 max-w-lg mx-auto lg:mx-0" style={{ backgroundColor: "#F5F4F0" }}>
              <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: "#D4AF37" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p className="font-serif-display text-xl font-semibold" style={{ color: "#2C2C2C" }}>Demande envoyée !</p>
              <p className="text-sm" style={{ color: "#6B7280" }}>Nous préparons votre Kit. Vous recevrez un email de confirmation très prochainement.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ─── Expérience Famille ─── */
const ExperienceFamilleSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const checks = [
    "Dépôt de souvenirs et photos en 1 clic",
    "Messages vocaux intimes",
    "Modération totale par la famille",
  ];

  return (
    <section ref={ref} className="py-28" style={{ backgroundColor: "#F5F4F0" }}>
      <div className={`container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Phone mockup */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-[280px] lg:w-[300px] aspect-[9/19] rounded-[2.5rem] border border-border/30 bg-background shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] overflow-hidden">
            <div className="h-8 bg-[#2C2C2C] flex items-center justify-center">
              <div className="w-20 h-4 bg-[#1a1a1a] rounded-full" />
            </div>
            <div className="p-4 space-y-4">
              <div className="flex flex-col items-center space-y-2 pt-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20" />
                <div className="h-4 w-32 bg-[#2C2C2C]/10 rounded-full" />
                <div className="h-3 w-20 bg-[#2C2C2C]/5 rounded-full" />
              </div>
              <div className="flex justify-center gap-3 py-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                ))}
              </div>
              {[...Array(2)].map((_, i) => (
                <div key={i} className="rounded-xl p-3 space-y-2" style={{ backgroundColor: "#F5F4F0" }}>
                  <div className="w-full h-24 rounded-lg bg-gradient-to-br from-primary/10 to-transparent" />
                  <div className="h-3 w-3/4 bg-[#2C2C2C]/10 rounded-full" />
                  <div className="h-3 w-1/2 bg-[#2C2C2C]/5 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text column */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <p className="uppercase tracking-[0.2em] text-sm font-semibold font-sans-body" style={{ color: "#D4AF37" }}>
            L'expérience famille
          </p>
          <h2 className="font-serif-display text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight" style={{ color: "#2C2C2C" }}>
            Le plus beau des héritages numériques.
          </h2>
          <p className="text-lg leading-relaxed max-w-lg mx-auto lg:mx-0" style={{ color: "#2C2C2C" }}>
            Rassemblez photos, vidéos, voix et hommages dans un écrin numérique partagé. Un espace digne et sécurisé pour que le souvenir continue de vivre à travers eux.
          </p>
          <p className="text-base leading-relaxed max-w-lg mx-auto lg:mx-0" style={{ color: "#6B7280" }}>
            C'est cette délicatesse et cette richesse émotionnelle qui transformeront votre prestation funéraire en un accompagnement inoubliable pour les familles.
          </p>
          <ul className="space-y-3 max-w-lg mx-auto lg:mx-0">
            {checks.map((item, i) => (
              <li key={i} className="flex items-center gap-3" style={{ color: "#2C2C2C" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <path d="M20 6L9 17l-5-5" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

/* ─── Concept ─── */
const ConceptSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const cards = [
    { icon: Zap, title: "Création en 60s", text: "Saisissez le nom du défunt, générez le lien instantanément. Aucune compétence technique requise." },
    { icon: QrCode, title: "Le Présentoir", text: "Déposez le chevalet physique. Les invités scannent pour accéder au recueillement." },
    { icon: Heart, title: "L'Écrin Numérique", text: "La famille rassemble photos et soutiens vocaux dans un espace privé, digne et modéré." },
  ];

  return (
    <section ref={ref} className="py-24" style={{ backgroundColor: "#FAFAFA" }}>
      <div className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-serif-display text-3xl lg:text-4xl font-bold text-center mb-16" style={{ color: "#2C2C2C" }}>
          Le pont entre la cérémonie et le digital.
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {cards.map((c, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center" style={{ backgroundColor: "#F5F0E6" }}>
                <c.icon size={26} style={{ color: "#D4AF37" }} />
              </div>
              <h3 className="font-serif-display text-xl font-semibold" style={{ color: "#2C2C2C" }}>{c.title}</h3>
              <p className="text-base leading-relaxed" style={{ color: "#555" }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Réassurance ─── */
const ReassuranceSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24" style={{ backgroundColor: "#F0EEEA" }}>
      <div className={`container mx-auto px-6 max-w-2xl text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-serif-display text-3xl lg:text-4xl font-bold mb-8" style={{ color: "#2C2C2C" }}>
          Pourquoi vous offrir ce Kit ?
        </h2>
        <p className="text-lg leading-relaxed" style={{ color: "#444" }}>
          Nous savons que la meilleure preuve est l'essai. Nous vous envoyons ce premier présentoir à nos frais. Intégrez-le à votre prochaine prestation&nbsp;: si la famille est conquise, le partenariat commencera naturellement.
        </p>
      </div>
    </section>
  );
};

/* ─── Page ─── */
const InvitationVIP = () => (
  <main style={{ backgroundColor: "#FAFAFA" }}>
    <HeroSection />
    <ExperienceFamilleSection />
    <ConceptSection />
    <ReassuranceSection />
  </main>
);

export default InvitationVIP;
