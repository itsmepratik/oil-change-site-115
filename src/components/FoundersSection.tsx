import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const FoundersSection = () => {
  const { t } = useLanguage();

  const founders = [
    {
      name: "Abul Hossain",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "27+ years in automotive industry",
    },
    {
      name: "Mohammed Rifat",
      role: "CTO & Co-Founder",
      image: "/lovable-uploads/rifat.jpg",
      description: "Expert in business management",
    },
    {
      name: "Mohammed Ashiq",
      role: "COO & Co-Founder",
      image: "/lovable-uploads/ashiq.jpg",
      description: "Operations and service excellence",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-normal mb-6 tracking-tight text-center">
            Meet Our <span className="text-gradient font-medium">Founders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate automotive experts dedicated to revolutionizing car care
            services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                <div className="relative mb-6 mx-auto w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-full p-1">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover rounded-full bg-background"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">{founder.name}</h3>
                <p className="text-primary font-medium mb-3">{founder.role}</p>
                <p className="text-muted-foreground text-sm">
                  {founder.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
