import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeatureTab } from "./FeatureTab";
import { FeatureContent } from "./FeatureContent";
import { getFeatures } from "@/config/features";
import { useLanguage } from "@/contexts/LanguageContext";

export const FeaturesSection = () => {
  const { t, language, dir } = useLanguage();
  const features = getFeatures(t);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const toggleMobileExpansion = (title: string) => {
    setExpandedMobile(expandedMobile === title ? null : title);
  };

  return (
    <section className="container px-4 py-24">
      {/* Header Section */}
      <div className="max-w-2xl mx-auto mb-20">
        <h2
          className="text-5xl md:text-6xl font-normal mb-6 tracking-tight text-center"
        >
          {t("features.title").split(" ")[0]}{" "}
          {t("features.title").split(" ")[1]}
          <br />
          <span className="text-gradient font-medium">
            {t("features.title").split(" ").slice(2).join(" ")}
          </span>
        </h2>
        <p
          className="text-lg md:text-xl text-gray-400 text-center"
        >
          {t("features.subtitle")}
        </p>
      </div>

      {/* Desktop View - Tabs */}
      <div className="hidden md:block">
        <Tabs defaultValue={features[0].title} className="w-full">
          <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 ${language === "ar" ? "md:grid-flow-col-dense" : ""}`}>
            {/* Tab triggers - Position changes based on language */}
            <div className={`space-y-3 ${language === "ar" ? "md:col-span-5 md:col-start-8" : "md:col-span-5"}`}>
              <TabsList className="flex flex-col w-full bg-transparent h-auto p-0 space-y-3">
                {features.map((feature) => (
                  <TabsTrigger
                    key={feature.title}
                    value={feature.title}
                    className="w-full data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                  >
                    <FeatureTab
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      isActive={false}
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab content with images - Position changes based on language */}
            <div className={` ${language === "ar" ? "md:col-span-7 md:col-start-1" : "md:col-span-7"}`}>
              {features.map((feature) => (
                <TabsContent
                  key={feature.title}
                  value={feature.title}
                  className="mt-0 h-full"
                >
                  <FeatureContent
                    image={feature.image}
                    images={feature.images}
                    title={feature.title}
                  />
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>

      {/* Mobile View - Accordion */}
      <div className="md:hidden space-y-4">
        {features.map((feature) => (
          <div key={feature.title} className="glass rounded-xl overflow-hidden">
            {/* Service Card */}
            <div
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleMobileExpansion(feature.title)}
            >
              <div className={`flex items-center ${dir === "rtl" ? "space-x-reverse space-x-4" : "space-x-3"}`}>
                <div className="text-primary flex-shrink-0">{feature.icon}</div>
                <div className={`${dir === "rtl" ? "text-right" : "text-left"}`}>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            </div>

            {/* Expandable Image */}
            <AnimatePresence>
              {expandedMobile === feature.title && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0">
                    <div className="rounded-xl overflow-hidden">
                      <FeatureContent
                        image={feature.image}
                        images={feature.images}
                        title={feature.title}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};
