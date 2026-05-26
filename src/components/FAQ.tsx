import { CircleHelp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    trigger: "Comment garantissez-vous l'hébergement 25 ans avec un seul paiement ?",
    content:
      "C'est une question de technologie et de gestion saine. Le coût du stockage (Cloud) baisse drastiquement chaque année. Sur les 49€, nous provisionnons immédiatement la somme nécessaire pour sécuriser vos données sur des serveurs pérennes ('Cold Storage'). Pas d'abonnement caché, tout est inclus dès le départ.",
  },
  {
    trigger: "Les invités âgés ou non-tech peuvent-ils l'utiliser ?",
    content:
      "Absolument. Nous visons une simplicité absolue. Aucune application à télécharger, aucun compte à créer pour les invités. Un simple scan du QR Code suffit pour déposer une photo ou une voix. Si ils savent prendre une photo, ils savent utiliser Stela.",
  },
  {
    trigger: "Le mémorial est-il visible sur Google ?",
    content:
      "Non. Vos souvenirs sont privés. Stela n'est pas indexé par les moteurs de recherche. Vous avez le contrôle total : vous pouvez protéger l'accès par un mot de passe ou une question secrète, et modérer chaque publication avant qu'elle n'apparaisse.",
  },
  {
    trigger: "Puis-je récupérer mes données si je change d'avis ?",
    content:
      "Oui, à tout moment. Vos souvenirs vous appartiennent. Une fonction 'Export' vous permet de télécharger une archive complète (ZIP) de toutes les photos, vidéos et textes en Haute Définition.",
  },
];

const FAQ = () => (
  <section className="py-24 bg-[#FAF9F6]">
    <div className="container mx-auto px-6 max-w-2xl text-center">
      <CircleHelp className="mx-auto mb-4 text-[#D4AF37]" size={32} strokeWidth={1.5} />
      <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-foreground mb-12">
        Vos questions, nos réponses.
      </h2>

      <Accordion type="single" collapsible className="text-left">
        {faqItems.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-[#d6d3d1]">
            <AccordionTrigger className="font-serif-display font-medium text-[#1c1917] text-base hover:no-underline">
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent className="font-sans-body text-[#57534e] leading-relaxed text-sm">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
