import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import BookingDialog from "@/components/BookingDialog";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import LogoCarousel from "@/components/LogoCarousel";
import FoundersSection from "@/components/FoundersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Index = () => {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const { t, dir } = useLanguage();

  const scrollToServices = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div className="min-h-screen text-foreground">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/hero.png"
            alt="Professional Oil Change Service"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
            className="absolute top-0 left-0 hero-image-position"
          />
          {/* Gradient overlays positioned at the very bottom to show most of the image */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          {/* Additional bottom gradient to ensure consistent end effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="container px-4 relative z-10">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full glass"
          >
            <span className="text-sm font-medium">
              <Command className="w-4 h-4 inline-block mr-2" />
              {t("hero.badge")}
            </span>
          </motion.div>

          <div className="max-w-4xl relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
                delay: 0.3,
              }}
              className={`text-5xl font-normal mb-4 tracking-tight md:text-7xl ${
                dir === "rtl" ? "text-right" : "text-left"
              }`}
            >
              <motion.span
                className="text-gray-200 inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1],
                  delay: 0.5,
                }}
              >
                <TextGenerateEffect words={t("hero.title1")} />
              </motion.span>
              <motion.br
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              />
              <motion.span
                className="text-white font-medium inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1],
                  delay: 0.8,
                }}
              >
                <TextGenerateEffect words={t("hero.title2")} />
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
              className={`text-lg md:text-xl text-gray-200 mb-8 max-w-2xl ${
                dir === "rtl" ? "text-right" : "text-left"
              }`}
            >
              {t("hero.description")}{" "}
              <span className="text-white">{t("hero.bookToday")}</span>
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
              }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <Button
                size="lg"
                className="button-gradient"
                onClick={() => {
                  console.log("Hero button clicked");
                  setIsBookingDialogOpen(true);
                }}
              >
                {t("hero.bookNow")}
              </Button>
              <Button
                size="lg"
                variant="link"
                className="text-white"
                onClick={scrollToServices}
              >
                {t("hero.viewServices")} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Features Section */}
      <div id="features" className="bg-black">
        <FeaturesSection />
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-black">
        <PricingSection />
      </div>

      {/* Testimonials Section */}
      <div className="bg-black">
        <TestimonialsSection />
      </div>

      {/* Founders Section */}
      <FoundersSection />

      {/* CTA Section */}
      <section className="container px-4 py-20 relative bg-black">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'url("/lovable-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <Button
            size="lg"
            className="button-gradient"
            onClick={() => {
              window.location.href = "/contact";
            }}
          >
            {t("cta.contactUs")}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="bg-black">
        <Footer />
      </div>

      <BookingDialog
        open={isBookingDialogOpen}
        onOpenChange={setIsBookingDialogOpen}
        allowServiceTypeSelection={true}
      />
    </div>
  );
};
export default Index;
