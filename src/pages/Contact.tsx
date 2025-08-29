import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: t("contact.location"),
      content: "HNS Automotive, Saham, North Al Batinah, Oman"
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: t("contact.phone"),
      content: "+968 XXX XXX XXX"
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: t("contact.email"),
      content: "info@hnsautomotive.com"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: t("contact.hours"),
      content: t("contact.hoursDetail")
    }
  ];

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 pt-32 pb-20"
      >
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t("contact.title")}
            <span className="text-gradient"> {t("contact.titleHighlight")}</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold mb-6">{t("contact.getInTouch")}</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1">{info.icon}</div>
                    <div>
                      <h3 className="font-medium text-white">{info.title}</h3>
                      <p className="text-gray-400">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="glass rounded-2xl overflow-hidden border border-white/10">
              <div className="h-80 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11906.58149032332!2d54.3725!3d23.8125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3dad80c6f6a6f6f6%3A0x6f6a6f6a6f6a6f6!2sSaham%2C%20North%20Al%20Batinah%2C%20Oman!5e0!3m2!1sen!2som!4v1650000000000!5m2!1sen!2som"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold mb-6">{t("contact.sendMessage")}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  {t("contact.fullName")} {t("contact.required")}
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("contact.namePlaceholder")}
                  className="glass border-white/20 bg-white/5 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t("contact.email")} {t("contact.required")}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("contact.emailPlaceholder")}
                    className="glass border-white/20 bg-white/5 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    {t("contact.phone")}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t("contact.phonePlaceholder")}
                    className="glass border-white/20 bg-white/5 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  {t("contact.message")} {t("contact.required")}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t("contact.messagePlaceholder")}
                  className="glass border-white/20 bg-white/5 text-white placeholder:text-gray-400 min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="button-gradient w-full"
                size="lg"
              >
                {t("contact.sendButton")}
              </Button>
            </form>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Contact;