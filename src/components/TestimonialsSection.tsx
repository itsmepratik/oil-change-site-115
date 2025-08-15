"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "Ahmad Al-Rashid",
    role: "Fleet Manager",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4",
    content: "The quick oil change service and quality parts have kept our company vehicles running smoothly. Their professional service and competitive prices make them our go-to choice in Saham."
  },
  {
    name: "Fatima Al-Zahra",
    role: "Local Resident",
    image: "https://avatars.githubusercontent.com/u/2345678?v=4",
    content: "I've been bringing my car here for over 2 years. The staff is knowledgeable, the service is fast, and they always use quality oil and filters. Highly recommended!"
  },
  {
    name: "Mohammed Al-Busaidi",
    role: "Taxi Driver",
    image: "https://avatars.githubusercontent.com/u/3456789?v=4",
    content: "As a taxi driver, regular maintenance is crucial. Their oil change service is efficient and affordable. The team understands the needs of commercial vehicles."
  },
  {
    name: "Aisha Al-Hinai",
    role: "Working Professional",
    image: "https://avatars.githubusercontent.com/u/4567890?v=4",
    content: "I appreciate their quick service and fair pricing. They also helped me find the right battery for my car. Professional and trustworthy service center."
  },
  {
    name: "Salem Al-Kindi",
    role: "Car Enthusiast",
    image: "https://avatars.githubusercontent.com/u/5678901?v=4",
    content: "They stock quality spare parts and their oil change service is top-notch. The technicians are experienced and always provide honest advice about my vehicle's needs."
  },
  {
    name: "Mariam Al-Lawati",
    role: "Family Driver",
    image: "https://avatars.githubusercontent.com/u/6789012?v=4",
    content: "Reliable service with a personal touch. They remember my car's service history and always remind me when it's time for maintenance. Great customer care!"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 overflow-hidden bg-black">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-normal mb-4">Trusted by Customers</h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of satisfied customers in Saham and North Al Batinah
          </p>
        </motion.div>

        <div className="relative flex flex-col antialiased">
          <div className="relative flex overflow-hidden py-4">
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-1`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-2`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;