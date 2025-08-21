import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
          language === 'ar' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        ع
      </Button>
      <span className="text-muted-foreground text-xs">|</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
          language === 'en' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </Button>
    </div>
  );
};

export default LanguageToggle;