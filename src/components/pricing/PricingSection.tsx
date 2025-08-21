import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CardSpotlight } from "./CardSpotlight";
const PricingTier = ({
  name,
  price,
  description,
  features,
  isPopular,
  t
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  t: (key: string) => string;
}) => <CardSpotlight className={`h-full ${isPopular ? "border-primary" : "border-white/10"} border-2`}>
    <div className="relative h-full p-6 flex flex-col">
      {isPopular && <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
          {t('pricing.mostPopular')}
        </span>}
      <h3 className="text-xl font-medium mb-2">{name}</h3>
      
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>)}
      </ul>
      <Button className="button-gradient w-full">
        {t('pricing.bookService')}
      </Button>
    </div>
  </CardSpotlight>;
export const PricingSection = () => {
  const { t } = useLanguage();
  
  return <section className="container px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2 initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="text-5xl md:text-6xl font-normal mb-6">
          {t('pricing.title1')}{" "}
          <span className="text-gradient font-medium">{t('pricing.title2')}</span>
        </motion.h2>
        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1,
        duration: 0.5
      }} className="text-lg text-gray-400">
          {t('pricing.subtitle')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingTier 
          name={t('pricing.basic.name')} 
          price={t('pricing.basic.price')} 
          description={t('pricing.basic.description')} 
          features={[t('pricing.basic.feature1'), t('pricing.basic.feature2'), t('pricing.basic.feature3'), t('pricing.basic.feature4')]} 
          t={t}
        />
        <PricingTier 
          name={t('pricing.premium.name')} 
          price={t('pricing.premium.price')} 
          description={t('pricing.premium.description')} 
          features={[t('pricing.premium.feature1'), t('pricing.premium.feature2'), t('pricing.premium.feature3'), t('pricing.premium.feature4'), t('pricing.premium.feature5'), t('pricing.premium.feature6')]} 
          isPopular 
          t={t}
        />
        <PricingTier 
          name={t('pricing.fleet.name')} 
          price={t('pricing.fleet.price')} 
          description={t('pricing.fleet.description')} 
          features={[t('pricing.fleet.feature1'), t('pricing.fleet.feature2'), t('pricing.fleet.feature3'), t('pricing.fleet.feature4'), t('pricing.fleet.feature5'), t('pricing.fleet.feature6')]} 
          t={t}
        />
      </div>
    </section>;
};