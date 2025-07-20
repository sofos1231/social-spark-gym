import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTransition from "./components/PageTransition";
import PracticeHub from "./pages/PracticeHub";
import PracticeRoad from "./pages/PracticeRoad";
import QuickDrill from "./pages/QuickDrill";
import ShadowPractice from "./pages/ShadowPractice";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import Upgrade from "./pages/Upgrade";
import Shop from "./pages/Shop";
import Badges from "./pages/Badges";
import LevelMilestones from "./pages/LevelMilestones";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative overflow-hidden">
          <Routes>
            <Route path="/" element={<PageTransition><PracticeHub /></PageTransition>} />
            <Route path="/practice-road/:categoryId" element={<PageTransition><PracticeRoad /></PageTransition>} />
            <Route path="/quick-drill" element={<PageTransition><QuickDrill /></PageTransition>} />
            <Route path="/shadow-practice" element={<PageTransition><ShadowPractice /></PageTransition>} />
            <Route path="/stats" element={<PageTransition><Stats /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
            <Route path="/upgrade" element={<PageTransition><Upgrade /></PageTransition>} />
            <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
            <Route path="/badges" element={<PageTransition><Badges /></PageTransition>} />
            <Route path="/level-milestones" element={<PageTransition><LevelMilestones /></PageTransition>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
          <Navigation />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
