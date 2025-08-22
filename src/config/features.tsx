import { Droplets, Settings, Battery, Wrench } from "lucide-react";

export const getFeatures = (t: (key: string) => string) => [
  {
    title: t("features.oilChange.title"),
    description: t("features.oilChange.description"),
    icon: <Droplets className="w-6 h-6" />,
    images: [
      "/lovable-uploads/p-oilchange2.jpg",
      "/lovable-uploads/p-oilchange3.jpg",
    ],
  },
  {
    title: t("features.spareParts.title"),
    description: t("features.spareParts.description"),
    icon: <Settings className="w-6 h-6" />,
    image: "/lovable-uploads/7335619d-58a9-41ad-a233-f7826f56f3e9.png",
  },
  {
    title: t("features.battery.title"),
    description: t("features.battery.description"),
    icon: <Battery className="w-6 h-6" />,
    image: "/lovable-uploads/b6436838-5c1a-419a-9cdc-1f9867df073d.png",
  },
  {
    title: t("features.maintenance.title"),
    description: t("features.maintenance.description"),
    icon: <Wrench className="w-6 h-6" />,
    image: "/lovable-uploads/79f2b901-8a4e-42a5-939f-fae0828e0aef.png",
  },
];
