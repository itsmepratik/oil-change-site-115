import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSelectionModal from "@/components/LanguageSelectionModal";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Contact from "./pages/Contact";
import Catalogue from "./pages/Catalogue";

const queryClient = new QueryClient();

const App = () => {
  const [languageSelected, setLanguageSelected] = useState(false);

  useEffect(() => {
    // For testing: uncomment to reset language selection
    // localStorage.removeItem('language-selected');
    // localStorage.removeItem('preferred-language');

    // Check if user has previously selected a language
    const hasSelectedLanguage = localStorage.getItem("language-selected");
    if (hasSelectedLanguage) {
      setLanguageSelected(true);
    }

    // Enhanced smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.hash.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    // Add smooth scrolling to all anchor links
    document.addEventListener("click", handleAnchorClick);

    // Enhanced scroll behavior for better smoothness
    const handleScroll = () => {
      // Add any scroll-based enhancements here if needed
      document.documentElement.style.scrollBehavior = "smooth";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Sonner />
            <LanguageSelectionModal
              onLanguageSelected={() => setLanguageSelected(true)}
            />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <FloatingWhatsAppButton />
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
