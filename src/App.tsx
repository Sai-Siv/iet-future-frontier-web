import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import PATN from "./pages/PATN";
import PATNRegistration from "./pages/PATNRegistration";
import ProtoPlanetLanding from "./pages/ProtoPlanetLanding";
import ProtoPlanet from "./pages/ProtoPlanet";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";

import AppAstralLanding from "./pages/AppAstralLanding";
import AppAstral from "./pages/AppAstral";
import InnothonLanding from "./pages/InnothonLanding";
import Innothon from "./pages/Innothon";
import { SpeedInsights } from "@vercel/speed-insights/react";
import PageTransition from "./components/PageTransition";
import Preloader from "./components/Preloader";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Preloader />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/patn" element={<PageTransition><PATN /></PageTransition>} />
        <Route path="/patn/register" element={<PageTransition><PATNRegistration /></PageTransition>} />
        {/* TEMPORARILY DISABLED EVENT ROUTES - REVERT TO THIS IN THE FUTURE
        <Route path="/protoplanet" element={<PageTransition><ProtoPlanetLanding /></PageTransition>} />
        <Route path="/protoplanet/register" element={<PageTransition><ProtoPlanet /></PageTransition>} />

        <Route path="/appastral" element={<PageTransition><AppAstralLanding /></PageTransition>} />
        <Route path="/appastral/register" element={<PageTransition><AppAstral /></PageTransition>} />
        
        <Route path="/innothon" element={<PageTransition><InnothonLanding /></PageTransition>} />
        <Route path="/innothon/register" element={<PageTransition><Innothon /></PageTransition>} />
        */}

        {/* COMING SOON EVENT ROUTES */}
        <Route path="/protoplanet" element={<PageTransition><ComingSoon pageName="ProtoPlanet" /></PageTransition>} />
        <Route path="/protoplanet/register" element={<PageTransition><ComingSoon pageName="ProtoPlanet Registration" /></PageTransition>} />

        <Route path="/appastral" element={<PageTransition><ComingSoon pageName="AppAstral" /></PageTransition>} />
        <Route path="/appastral/register" element={<PageTransition><ComingSoon pageName="AppAstral Registration" /></PageTransition>} />
        
        <Route path="/innothon" element={<PageTransition><ComingSoon pageName="Innothon" /></PageTransition>} />
        <Route path="/innothon/register" element={<PageTransition><ComingSoon pageName="Innothon Registration" /></PageTransition>} />
        
        <Route path="/agenda" element={<PageTransition><ComingSoon pageName="Agenda" /></PageTransition>} />
        <Route path="/awards" element={<PageTransition><ComingSoon pageName="Awards" /></PageTransition>} />
        <Route path="/committee" element={<PageTransition><ComingSoon pageName="Committee" /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ComingSoon pageName="Contact" /></PageTransition>} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <SpeedInsights />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
