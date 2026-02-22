import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import UploadMenu from "./pages/UploadMenu";
import ProcessingMenu from "./pages/ProcessingMenu";
import MenuResults from "./pages/MenuResults";
import DishDetails from "./pages/DishDetails";
import ScanHistory from "./pages/ScanHistory";
import Upgrade from "./pages/Upgrade";
import Profile from "./pages/Profile";
import ErrorDemo from "./pages/ErrorDemo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadMenu />} />
          <Route path="/processing" element={<ProcessingMenu />} />
          <Route path="/results" element={<MenuResults />} />
          <Route path="/dish/:id" element={<DishDetails />} />
          <Route path="/history" element={<ScanHistory />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/error-demo" element={<ErrorDemo />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
