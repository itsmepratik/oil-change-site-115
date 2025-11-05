import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';

const FloatingLanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden md:block">
      <div className="bg-black/80 backdrop-blur-xl rounded-full p-1 border border-white/10 shadow-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLanguage('ar')}
          className={`px-3 py-2 text-xs font-medium rounded-full transition-all ${
            language === 'ar'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
          }`}
        >
          ع
        </Button>
        <span className="text-muted-foreground text-xs">|</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLanguage('en')}
          className={`px-3 py-2 text-xs font-medium rounded-full transition-all ${
            language === 'en'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
          }`}
        >
          EN
        </Button>
      </div>
    </div>
  );
};

export default FloatingLanguageToggle;
