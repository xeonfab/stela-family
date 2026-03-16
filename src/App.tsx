import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Memorial from "./pages/Memorial";
import Officiants from "./pages/Officiants";
import PompesFunebres from "./pages/PompesFunebres";
import Acces from "./pages/Acces";
import MemorialAdmin from "./pages/MemorialAdmin";
import InvitationPrivee from "./pages/InvitationPrivee";
import EmailInvitation from "./pages/EmailInvitation";
import CreatePassword from "./pages/CreatePassword";
import OnboardingPhoto from "./pages/OnboardingPhoto";
import NotFound from "./pages/NotFound";
import PageModeration from "./pages/PageModeration";
import KitCeremonie from "./pages/KitCeremonie";
import ProfilAdmin from "./pages/ProfilAdmin";
import GestionAcces from "./pages/GestionAcces";
import Confidentialite from "./pages/Confidentialite";
import InvitationVIP from "./pages/InvitationVIP";
import Connexion from "./pages/Connexion";
import MesSanctuaires from "./pages/MesSanctuaires";
import CapaciteHeritage from "./pages/CapaciteHeritage";
import EmailPreview from "./pages/EmailPreview";
import ProLayout from "./layouts/ProLayout";
import ProCreer from "./pages/pro/ProCreer";
import ProRegistre from "./pages/pro/ProRegistre";
import ProSanctuaire from "./pages/pro/ProSanctuaire";
import ProAgence from "./pages/pro/ProAgence";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/memorial" element={<Memorial />} />
          <Route path="/officiants" element={<Officiants />} />
          <Route path="/pompe-funebre" element={<PompesFunebres />} />
          <Route path="/code-acces" element={<Acces />} />
          <Route path="/memorial-admin" element={<MemorialAdmin />} />
          <Route path="/invitation-privee" element={<InvitationPrivee />} />
          <Route path="/onboarding/email" element={<EmailInvitation />} />
          <Route path="/onboarding/mot-de-passe" element={<CreatePassword />} />
          <Route path="/onboarding/photo" element={<OnboardingPhoto />} />
          <Route path="/moderation" element={<PageModeration />} />
          <Route path="/kit-ceremonie" element={<KitCeremonie />} />
          <Route path="/profil" element={<ProfilAdmin />} />
          <Route path="/acces" element={<GestionAcces />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/invitation" element={<InvitationVIP />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/mes-sanctuaires" element={<MesSanctuaires />} />
          <Route path="/capacite" element={<CapaciteHeritage />} />
          <Route path="/email-preview" element={<EmailPreview />} />

          {/* Pro / B2B routes with shared sidebar layout */}
          <Route path="/pro" element={<ProLayout />}>
            <Route path="creer" element={<ProCreer />} />
            <Route path="registre" element={<ProRegistre />} />
            <Route path="sanctuaire/:id" element={<ProSanctuaire />} />
            <Route path="agence" element={<ProAgence />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
