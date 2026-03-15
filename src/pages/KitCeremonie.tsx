import { Download, Share2 } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import chevaletImg from "@/assets/ceremony-chevalet.png";
import lettreImg from "@/assets/ceremony-lettre.png";
import whatsappImg from "@/assets/ceremony-whatsapp.png";

const cards = [
  {
    title: "Présentoir A4",
    description: "Un chevalet élégant à imprimer et disposer lors de la cérémonie pour inviter les proches à rejoindre l'espace.",
    image: chevaletImg,
    action: "Télécharger le PDF",
    icon: Download,
  },
  {
    title: "Cartes de Livret",
    description: "De petites cartes à glisser dans le livret de cérémonie avec le QR code d'accès au sanctuaire.",
    image: lettreImg,
    action: "Télécharger le PDF",
    icon: Download,
  },
  {
    title: "Faire-part Numérique",
    description: "Pour les proches éloignés, partagez un message personnalisé avec un lien direct vers l'espace de recueillement.",
    image: whatsappImg,
    action: "Partager via WhatsApp",
    icon: Share2,
  },
];

const KitCeremonie = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="py-4 px-6">
        <AdminSidebar />
      </header>

      <div className="max-w-3xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#2C2C2C] mb-3">
            Kit de Cérémonie
          </h1>
          <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Les supports pour inviter vos proches au recueillement.
          </p>
        </div>

        <div className="space-y-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden shadow-sm md:flex md:flex-row"
            >
              <div className="aspect-[16/9] md:aspect-auto md:w-64 md:shrink-0 bg-stone-50 flex items-center justify-center p-6">
                <img
                  src={card.image}
                  alt={card.title}
                  className="max-h-40 md:max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-6 space-y-4 flex flex-col justify-center">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#2C2C2C] mb-1">
                    {card.title}
                  </h2>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D4AF37] text-white text-sm font-medium rounded-full hover:bg-[#c9a432] transition-colors">
                  <card.icon size={15} />
                  {card.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitCeremonie;
