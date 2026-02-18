import { Cloud, Mic, Share2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const cards = [
{ icon: Cloud, title: "Pas de compte requis", text: "Les invités scannent et déposent leurs souvenirs instantanément." },
{ icon: Mic, title: "Voix & Vidéos", text: "Recueillez les rires, les anecdotes audio et les vidéos." },
{ icon: Share2, title: "Partage Universel", text: "Un lien unique pour la famille, proche ou éloignée." }];


const ProblemSolution = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {cards.map((c, i) => (
            <div key={i} className="text-center space-y-4 p-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <c.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-serif-display text-xl font-semibold text-foreground">{c.title}</h3>
              <p className="text-muted-foreground text-sm">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

};

export default ProblemSolution;