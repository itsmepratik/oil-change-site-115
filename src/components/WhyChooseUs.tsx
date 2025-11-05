import { DollarSign, Droplets, Users, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyChooseUs = () => {
  const { t, dir } = useLanguage();

  const features = [
    {
      icon: DollarSign,
      title: t("whychooseus.fairprice.title"),
      description: t("whychooseus.fairprice.description"),
      colSpan: "lg:col-span-2",
    },
    {
      icon: Droplets,
      title: t("whychooseus.oils.title"),
      description: t("whychooseus.oils.description"),
      colSpan: "",
    },
    {
      icon: Users,
      title: t("whychooseus.experts.title"),
      description: t("whychooseus.experts.description"),
      colSpan: "",
    },
    {
      icon: Clock,
      title: t("whychooseus.speed.title"),
      description: t("whychooseus.speed.description"),
      colSpan: "lg:col-span-2",
    },
  ];

  return (
    <div className="w-full py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-regular mb-4">
              {t("whychooseus.title")}
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed tracking-tight text-muted-foreground">
              {t("whychooseus.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`bg-muted rounded-md h-full ${feature.colSpan} p-8 aspect-square lg:aspect-auto flex flex-col justify-between`}
                >
                  <Icon className="w-8 h-8 stroke-1 mb-6" />
                  <div className="flex flex-col space-y-3">
                    <h3 className={`text-xl tracking-tight font-medium ${dir === "rtl" ? "text-right" : "text-left"}`}>{feature.title}</h3>
                    <p className={`text-muted-foreground text-base leading-relaxed ${dir === "rtl" ? "text-right" : "text-left"}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;