import { Separator } from "@/components/ui/separator";
import steleImage from "@/assets/stele-noyer-nfc.png";

const EmailMagicLink = () => (
  <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] max-w-[560px] w-full overflow-hidden">
    {/* Header */}
    <div className="pt-12 pb-8 text-center">
      <span className="font-serif-display text-2xl tracking-wide" style={{ color: '#8B7D6B' }}>
        Stela
      </span>
    </div>

    <Separator className="mx-auto w-16 bg-stone-200/60" style={{ height: '0.5px' }} />

    {/* Body */}
    <div className="px-12 py-14 text-center space-y-8">
      <h1 className="font-serif-display text-[26px] leading-snug tracking-tight text-stone-800">
        Votre accès au sanctuaire
      </h1>

      <p className="text-sm leading-relaxed text-stone-500 max-w-[380px] mx-auto">
        Bonjour, voici votre lien de connexion sécurisé, sans mot de passe.
        Il est valable pendant 24 heures.
      </p>

      <div className="pt-2 pb-4">
        <a
          href="#"
          className="inline-block px-10 py-3.5 rounded-full text-sm font-semibold tracking-[0.05em] text-primary-foreground btn-gold-jewel transition-all"
        >
          Me connecter à mon espace
        </a>
      </div>
    </div>

    {/* Footer */}
    <div className="px-12 pb-12 pt-4">
      <Separator className="mb-8 bg-stone-100" style={{ height: '0.5px' }} />
      <p className="text-xs leading-relaxed text-stone-400 text-center max-w-[340px] mx-auto">
        Si vous n'avez pas demandé cet e-mail, vous pouvez l'ignorer en toute sécurité.
      </p>
      <p className="text-xs text-stone-300 text-center mt-4 italic">
        Avec tout notre respect, l'équipe Stela.
      </p>
    </div>
  </div>
);

const EmailUpsellStele = () => (
  <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] max-w-[560px] w-full overflow-hidden">
    {/* Header */}
    <div className="pt-12 pb-8 text-center">
      <span className="font-serif-display text-2xl tracking-wide" style={{ color: '#8B7D6B' }}>
        Stela
      </span>
    </div>

    <Separator className="mx-auto w-16 bg-stone-200/60" style={{ height: '0.5px' }} />

    {/* Hero Image */}
    <div className="px-10 pt-10">
      <div className="rounded-xl overflow-hidden bg-stone-50 aspect-[16/9] flex items-center justify-center">
        <img
          src={steleImage}
          alt="Stèle Compagne"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Body */}
    <div className="px-12 py-12 text-center space-y-7">
      <h1 className="font-serif-display text-[26px] leading-snug tracking-tight text-stone-800">
        Prolongez le recueillement<br />chez vous.
      </h1>

      <p className="text-sm leading-[1.8] text-stone-500 max-w-[400px] mx-auto">
        Bonjour <span className="text-stone-600 font-medium">Marie</span>.
        Cela fait quelques semaines que le sanctuaire numérique de{' '}
        <span className="text-stone-600 font-medium">Jean-Claude</span> a été créé.
        Pour continuer à faire vivre sa mémoire au quotidien, nous vous proposons
        de découvrir la <em className="not-italic text-stone-600 font-medium">Stèle Compagne</em>,
        un objet physique d'une grande douceur à placer chez vous.
      </p>

      <div className="pt-2 pb-2">
        <a
          href="#"
          className="inline-block px-9 py-3.5 rounded-full text-sm font-semibold tracking-[0.05em] text-primary-foreground btn-gold-jewel transition-all"
        >
          Découvrir la Stèle Compagne
        </a>
      </div>
    </div>

    {/* Footer */}
    <div className="px-12 pb-12 pt-2">
      <Separator className="mb-8 bg-stone-100" style={{ height: '0.5px' }} />
      <p className="text-xs text-stone-300 text-center italic">
        Avec tout notre respect, l'équipe Stela.
      </p>
      <p className="text-center mt-5">
        <a href="#" className="text-[10px] text-stone-300 underline underline-offset-2 hover:text-stone-400 transition-colors">
          Se désinscrire de ces communications
        </a>
      </p>
    </div>
  </div>
);

const EmailPreview = () => (
  <div className="min-h-screen bg-stone-200/60 py-16 px-4">
    <div className="text-center mb-14">
      <h1 className="font-serif-display text-2xl text-stone-700 mb-2">Prévisualisation des emails</h1>
      <p className="text-xs text-stone-400 tracking-wide uppercase">Maquettes statiques — 2 templates</p>
    </div>

    <div className="flex flex-col items-center gap-16">
      {/* Template label */}
      <div className="w-full max-w-[560px]">
        <p className="text-[10px] uppercase tracking-[0.15em] text-stone-400 mb-4 font-medium">
          Template 1 — Magic Link
        </p>
        <EmailMagicLink />
      </div>

      <div className="w-full max-w-[560px]">
        <p className="text-[10px] uppercase tracking-[0.15em] text-stone-400 mb-4 font-medium">
          Template 2 — Upsell J+21 · Stèle Compagne
        </p>
        <EmailUpsellStele />
      </div>
    </div>
  </div>
);

export default EmailPreview;
