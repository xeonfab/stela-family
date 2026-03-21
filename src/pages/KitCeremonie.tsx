import { Download, Share2, RefreshCw } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import chevaletImg from "@/assets/ceremony-chevalet.png";
import lettreImg from "@/assets/ceremony-lettre.png";
import whatsappImg from "@/assets/ceremony-whatsapp.png";

const pdfCards = [
  {
    title: "Présentoir A4",
    description:
      "Un chevalet élégant à imprimer et disposer lors de la cérémonie pour inviter les proches à rejoindre l'espace.",
    image: chevaletImg,
  },
  {
    title: "Cartes de Livret",
    description:
      "De petites cartes à glisser dans le livret de cérémonie avec le QR code d'accès au sanctuaire.",
    image: lettreImg,
  },
];

const KitCeremonie = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="py-4 px-6">
        <AdminSidebar />
      </header>

      <div className="max-w-3xl mx-auto px-6 pb-20">
        {/* Page Header */}
        <div className="text-center mb-14">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#2C2C2C] mb-3">
            Kit de Cérémonie
          </h1>
          <p className="text-[#2C2C2C]/40 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Les supports pour inviter vos proches au recueillement.
          </p>
        </div>

        {/* Premium PDF Cards */}
        <div className="space-y-8 mb-10">
          {pdfCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-3xl border border-[#2C2C2C]/[0.06] shadow-sm overflow-hidden"
            >
              {/* Full-width image */}
              <div className="aspect-[4/3] w-full bg-stone-50">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Text content */}
              <div className="p-7">
                <h2 className="font-serif text-xl font-semibold text-[#2C2C2C] mb-2">
                  {card.title}
                </h2>
                <p className="text-sm text-[#2C2C2C]/50 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Action zone */}
              <div className="border-t border-[#2C2C2C]/[0.06] bg-[#2C2C2C]/[0.015] p-7">
                <div className="flex flex-col gap-3">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-white text-sm font-medium rounded-full hover:bg-[#c9a432] transition-colors btn-gold-jewel">
                    <Download size={15} />
                    Télécharger le PDF
                  </button>
                  <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-[#2C2C2C]/[0.12] text-[#2C2C2C]/60 text-sm font-medium rounded-full hover:border-[#2C2C2C]/[0.2] hover:text-[#2C2C2C]/80 transition-colors">
                    <RefreshCw size={14} />
                    Régénérer le PDF
                  </button>
                </div>
                <p className="text-center text-[11px] text-[#2C2C2C]/30 mt-4">
                  Régénérez le fichier si vous avez modifié la photo ou le nom
                  du mémorial.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp share card — simpler style */}
        <div className="bg-white rounded-3xl border border-[#2C2C2C]/[0.06] shadow-sm overflow-hidden">
          <div className="aspect-[4/3] w-full bg-stone-50">
            <img
              src={whatsappImg}
              alt="Faire-part Numérique"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-7">
            <h2 className="font-serif text-xl font-semibold text-[#2C2C2C] mb-2">
              Faire-part Numérique
            </h2>
            <p className="text-sm text-[#2C2C2C]/50 leading-relaxed">
              Pour les proches éloignés, partagez un message personnalisé avec
              un lien direct vers l'espace de recueillement.
            </p>
          </div>
          <div className="border-t border-[#2C2C2C]/[0.06] bg-[#2C2C2C]/[0.015] p-7">
            <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-white text-sm font-medium rounded-full hover:bg-[#c9a432] transition-colors btn-gold-jewel">
              <Share2 size={15} />
              Partager via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitCeremonie;
