import { DollarSign, Droplets, Users, Clock } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Fair Price, Guaranteed.",
      description: "Your car needs care, not a huge bill. We offer the most reasonable oil change in town. What you see is what you pay.",
      colSpan: "lg:col-span-2",
    },
    {
      icon: Droplets,
      title: "Top-Tier Oils Only.",
      description: "We use only high-quality oils. Your engine stays cleaner. It runs smoother. It lasts longer. Simple.",
      colSpan: "",
    },
    {
      icon: Users,
      title: "Experts Who Care.",
      description: "Our team knows engines. We work with pride. We treat your car like it's our own.",
      colSpan: "",
    },
    {
      icon: Clock,
      title: "In and Out.",
      description: "Your time matters. We work quickly without cutting corners. Enjoy a coffee and we'll handle the grime.",
      colSpan: "lg:col-span-2",
    },
  ];

  return (
    <div className="w-full py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-regular mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed tracking-tight text-muted-foreground">
              We know you have options. Here is why Saham trusts us.
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
                    <h3 className="text-xl tracking-tight font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
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