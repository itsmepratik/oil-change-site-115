import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Command, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import BookingDialog from "./BookingDialog";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation to sections when arriving from other pages
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const sectionId = location.hash.substring(1); // Remove the '#'
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.offsetTop;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100); // Small delay to ensure page is fully loaded
    }
  }, [location]);

  const handleSectionNavigation = (sectionId: string) => {
    // If we're on the home page, scroll to the section
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else {
      // If we're on a different page, navigate to home with section hash
      navigate(`/#${sectionId}`);
    }
  };

  const navItems = [
    {
      name: t("nav.services"),
      href: "#features",
      onClick: () => handleSectionNavigation("features"),
    },
    {
      name: t("nav.pricing"),
      href: "#pricing",
      onClick: () => handleSectionNavigation("pricing"),
    },
    { name: "Catalogue", href: "/catalogue" },
    {
      name: t("nav.reviews"),
      href: "#testimonials",
      onClick: () => handleSectionNavigation("testimonials"),
    },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${
        isScrolled
          ? "h-14 bg-[#1B1B1B]/40 backdrop-blur-xl border border-white/10 scale-95 w-[90%] max-w-2xl"
          : "h-14 bg-[#1B1B1B] w-[95%] max-w-3xl"
      }`}
    >
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          <a
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Command className="w-5 h-5 text-primary" />
            <span className="font-bold text-base whitespace-nowrap min-w-[4.5rem]">
              {isScrolled ? "HNS" : "HNS Auto"}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith("/")) {
                    // For internal links, let the browser handle it normally
                    return;
                  }
                  e.preventDefault();
                  if (item.onClick) {
                    item.onClick();
                  }
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
            <Button
              onClick={() => {
                console.log("Nav button clicked");
                setIsBookingDialogOpen(true);
              }}
              size="sm"
              className="button-gradient"
            >
              {t("nav.bookService")}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="glass">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#1B1B1B] w-[95.5%] rounded-r-xl p-4">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        if (item.onClick) {
                          item.onClick();
                        } else {
                          window.location.href = item.href;
                        }
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="mt-4 space-y-4">
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsBookingDialogOpen(true);
                      }}
                      className="button-gradient w-full"
                    >
                      {t("nav.bookService")}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>

      <BookingDialog
        open={isBookingDialogOpen}
        onOpenChange={setIsBookingDialogOpen}
        allowServiceTypeSelection={true}
      />
    </header>
  );
};

export default Navigation;
