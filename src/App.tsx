import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import SparkSwipe from "./pages/SparkSwipe";
import Navigation from "./components/Navigation";
import TopStatusBar from "./components/TopStatusBar";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import EmailLogin from "./pages/auth/EmailLogin";
import Signup from "./pages/auth/Signup";
import DevBypass from "./pages/dev/DevBypass";
import Onboarding from "./pages/onboarding/Onboarding";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PublicOnlyRoute from "./components/routing/PublicOnlyRoute";
import AuthProvider from "./contexts/AuthContext";

const queryClient = new QueryClient();

const AppShell = () => {
  const location = useLocation();
  const hideChrome = /^\/(auth|onboarding)(\/|$)/.test(location.pathname);
  return (
    <div className="relative overflow-hidden">
      {!hideChrome && <TopStatusBar />}
      <Routes>
        <Route path="/auth/login" element={<PageTransition currentPath="/auth/login"><PublicOnlyRoute><Login /></PublicOnlyRoute></PageTransition>} />
        <Route path="/auth/email" element={<PageTransition currentPath="/auth/email"><PublicOnlyRoute><EmailLogin /></PublicOnlyRoute></PageTransition>} />
        <Route path="/auth/signup" element={<PageTransition currentPath="/auth/signup"><PublicOnlyRoute><Signup /></PublicOnlyRoute></PageTransition>} />
        <Route path="/dev-bypass" element={<DevBypass />} />
        <Route path="/onboarding" element={<PageTransition currentPath="/onboarding"><Onboarding /></PageTransition>} />

        <Route path="/" element={<PageTransition currentPath="/"><ProtectedRoute><PracticeHub /></ProtectedRoute></PageTransition>} />
        <Route path="/practice-road/:category" element={<PageTransition currentPath="/practice-road"><ProtectedRoute><PracticeRoad /></ProtectedRoute></PageTransition>} />
        <Route path="/practice" element={<PageTransition currentPath="/practice"><ProtectedRoute><PracticeHub /></ProtectedRoute></PageTransition>} />
        <Route path="/quick-drill" element={<PageTransition currentPath="/quick-drill"><ProtectedRoute><QuickDrill /></ProtectedRoute></PageTransition>} />
        <Route path="/shadow-practice" element={<PageTransition currentPath="/shadow-practice"><ProtectedRoute><ShadowPractice /></ProtectedRoute></PageTransition>} />
        <Route path="/stats" element={<PageTransition currentPath="/stats"><ProtectedRoute><Stats /></ProtectedRoute></PageTransition>} />
        <Route path="/profile" element={<PageTransition currentPath="/profile"><ProtectedRoute><Profile /></ProtectedRoute></PageTransition>} />
        <Route path="/upgrade" element={<PageTransition currentPath="/upgrade"><ProtectedRoute><Upgrade /></ProtectedRoute></PageTransition>} />
        <Route path="/shop" element={<PageTransition currentPath="/shop"><ProtectedRoute><Shop /></ProtectedRoute></PageTransition>} />
        <Route path="/badges" element={<PageTransition currentPath="/badges"><ProtectedRoute><Badges /></ProtectedRoute></PageTransition>} />
        <Route path="/level-milestones" element={<PageTransition currentPath="/level-milestones"><ProtectedRoute><LevelMilestones /></ProtectedRoute></PageTransition>} />
        <Route path="/spark-swipe" element={<PageTransition currentPath="/spark-swipe"><ProtectedRoute><SparkSwipe /></ProtectedRoute></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition currentPath="*"><NotFound /></PageTransition>} />
      </Routes>
      {!hideChrome && <Navigation />}
    </div>
  );
};
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
