import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';

interface LanguageSelectionModalProps {
  onLanguageSelected: () => void;
}

const LanguageSelectionModal = ({ onLanguageSelected }: LanguageSelectionModalProps) => {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    // Check if this is the first visit
    const hasSelectedLanguage = localStorage.getItem('language-selected');
    console.log('Language selected from localStorage:', hasSelectedLanguage);
    if (!hasSelectedLanguage) {
      console.log('Opening language selection modal');
      setOpen(true);
    }
  }, []);
  
  // Debug log for open state
  useEffect(() => {
    console.log('Modal open state:', open);
  }, [open]);

  const handleLanguageSelect = (selectedLanguage: 'en' | 'ar') => {
    setLanguage(selectedLanguage);
    localStorage.setItem('language-selected', 'true');
    localStorage.setItem('preferred-language', selectedLanguage);
    setOpen(false);
    onLanguageSelected();
  };

  if (!open) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 z-50 animate-in fade-in-0 duration-300"
        onClick={() => setOpen(false)}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md p-6 sm:p-8 rounded-xl border border-white/10 bg-background shadow-lg animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 8 6 6"/>
              <path d="m4 14 6-6 2-3"/>
              <path d="M2 5h12"/>
              <path d="M7 2h1"/>
              <path d="m22 22-5-10-5 10"/>
              <path d="M14 18h6"/>
            </svg>
          </div>
          
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold">Select Your Language</h3>
            <p className="text-muted-foreground text-base">
              Choose your preferred language for the best experience
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <Button 
              onClick={() => handleLanguageSelect('en')} 
              className="flex-1 bg-white/5 hover:bg-white/10 text-foreground border border-white/10"
              size="lg"
              style={{ padding: '1.25rem 0', fontSize: '1.1rem' }}
            >
              English
            </Button>
            <Button 
              onClick={() => handleLanguageSelect('ar')} 
              className="flex-1 bg-white/5 hover:bg-white/10 text-foreground border border-white/10"
              size="lg"
              style={{ padding: '1.25rem 0', fontSize: '1.1rem' }}
            >
              العربية
            </Button>
          </div>
        </div>
        
        {/* Close button */}
        <button 
          onClick={() => setOpen(false)}
          className="absolute right-5 top-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
};

export default LanguageSelectionModal;