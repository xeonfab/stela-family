import { Cloud, Mic, Share2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const cards = [
  { icon: Cloud, title: "Pas de compte requis", text: "Les invités scannent et déposent leurs souvenirs instantanément." },
  { icon: Mic, title: "Voix & Vidéos", text: "Recueillez les rires, les anecdotes audio et les vidéos." },
  { icon: Share2, title: "Partage Universel", text: "Un lien unique pour la famille, proche ou éloignée." },
];

const ProblemSolution = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-serif-display text-3xl lg:text-4xl font-bold text-center mb-4 text-foreground">
          Stela rassemble tout en un clic
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-16">via un simple QR Code.</p>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {cards.map((c, i) => (
            <div key={i} className="text-center p-8 rounded-3xl shadow-soft bg-card space-y-4 transition-transform duration-200 hover:scale-[1.02]">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <c.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-serif-display text-xl font-semibold text-foreground">{c.title}</h3>
              <p className="text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
