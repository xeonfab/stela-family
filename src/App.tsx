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
          <Route path="/acces" element={<Acces />} />
          <Route path="/memorial-admin" element={<MemorialAdmin />} />
          <Route path="/invitation-privee" element={<InvitationPrivee />} />
          <Route path="/onboarding/email" element={<EmailInvitation />} />
          <Route path="/onboarding/mot-de-passe" element={<CreatePassword />} />
          <Route path="/onboarding/photo" element={<OnboardingPhoto />} />
          <Route path="/moderation" element={<PageModeration />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
