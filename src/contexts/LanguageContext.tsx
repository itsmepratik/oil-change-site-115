import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations = {
  en: {
    // Navigation
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.reviews": "Reviews",
    "nav.contact": "Contact",
    "nav.bookService": "Book Service",

    // Hero Section
    "hero.badge": "North Al Batinah's #1 oil service center",
    "hero.title1": "Professional oil change",
    "hero.title2": "service in Saham",
    "hero.description":
      "Experience fast, professional oil changes with quality parts, expert service, and competitive prices in Saham, Oman.",
    "hero.bookToday": "Book your service today.",
    "hero.bookNow": "Book Service Now",
    "hero.viewServices": "View Services",

    // Features
    "features.title": "Our Services",
    "features.subtitle": "Professional automotive services you can trust",
    "features.oilChange.title": "Professional Oil Changes",
    "features.oilChange.description":
      "Quick and efficient oil change service using high-quality motor oils and filters for optimal engine performance.",
    "features.spareParts.title": "Quality Spare Parts",
    "features.spareParts.description":
      "Wide selection of genuine and aftermarket auto parts for all major vehicle brands and models.",
    "features.battery.title": "Battery Sales & Service",
    "features.battery.description":
      "Premium automotive batteries with professional installation and testing services for reliable vehicle performance.",
    "features.maintenance.title": "Expert Maintenance",
    "features.maintenance.description":
      "Comprehensive vehicle maintenance services by certified technicians to keep your car running smoothly.",

    // Pricing
    "pricing.title1": "Choose Your",
    "pricing.title2": "Service Plan",
    "pricing.subtitle":
      "Select the perfect service plan for your vehicle maintenance needs",
    "pricing.basic.name": "Basic",
    "pricing.basic.price": "25 OMR",
    "pricing.basic.description":
      "Essential oil change service for regular maintenance",
    "pricing.basic.feature1": "Standard oil change",
    "pricing.basic.feature2": "Oil filter replacement",
    "pricing.basic.feature3": "Tyre Pressure Check",
    "pricing.basic.feature4": "Service reminder",
    "pricing.premium.name": "Premium",
    "pricing.premium.price": "45 OMR",
    "pricing.premium.description":
      "Comprehensive service package for optimal performance",
    "pricing.premium.feature1": "Standard oil change",
    "pricing.premium.feature2": "Oil & Air filter replacement",
    "pricing.premium.feature3": "Tyre Pressure Check",
    "pricing.premium.feature4": "Battery Inspection",
    "pricing.premium.feature5": "Priority booking",
    "pricing.premium.feature6": "Service reminder",
    "pricing.fleet.name": "Fleet",
    "pricing.fleet.price": "Custom",
    "pricing.fleet.description":
      "Specialized service packages for fleet vehicles",
    "pricing.fleet.feature1": "Credit plans",
    "pricing.fleet.feature2": "Standard oil change",
    "pricing.fleet.feature3": "Oil & Air filters replacement",
    "pricing.fleet.feature4": "Tyre Pressure Check",
    "pricing.fleet.feature5": "Battery Inspection",
    "pricing.fleet.feature6": "Priority emergency services",
    "pricing.fleet.feature7": "Service reminder",
    "pricing.fleet.feature8": "Monthly report",
    "pricing.mostPopular": "Most Popular",
    "pricing.bookService": "Get Quote",

    // CTA Section
    "cta.title": "Need an oil change?",
    "cta.description":
      "Join thousands of satisfied customers who trust us with their vehicle maintenance in Saham.",
    "cta.contactUs": "Contact Us",

    // Booking Dialog
    "booking.title": "Book Your Service",
    "booking.subtitle":
      "Schedule your professional oil change service in Saham",
    "booking.fullName": "Full Name",
    "booking.phoneNumber": "Phone Number",
    "booking.vehicleModel": "Vehicle Make & Model",
    "booking.serviceType": "Service Type",
    "booking.preferredDate": "Preferred Date",
    "booking.preferredTime": "Preferred Time",
    "booking.additionalNotes": "Additional Notes",
    "booking.confirmBooking": "Confirm Booking",
    "booking.required": "*",
    "booking.selectService": "Select service type",
    "booking.selectTime": "Select time",
    "booking.notesPlaceholder":
      "Any special requests or additional services needed...",
    "booking.missingInfo": "Missing Information",
    "booking.fillFields": "Please fill in all required fields.",
    "booking.confirmed": "Booking Confirmed!",
    "booking.contactShortly":
      "We'll contact you shortly to confirm your appointment.",

    // Footer
    "footer.company": "HNS Automotive",
    "footer.description":
      "Professional oil change and automotive services in Saham, North Al Batinah, Oman.",
    "footer.services": "Services",
    "footer.oilChange": "Oil Change",
    "footer.spareParts": "Spare Parts",
    "footer.batteryService": "Battery Service",
    "footer.maintenance": "Maintenance",
    "footer.products": "Products",
    "footer.motorOils": "Motor Oils",
    "footer.filters": "Filters",
    "footer.batteries": "Batteries",
    "footer.accessories": "Accessories",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.contact": "Contact",
    "footer.copyright": "© 2025 HNS Automotive. All rights reserved.",

    // Contact Page
    "contact.title": "Get in",
    "contact.titleHighlight": "Touch",
    "contact.subtitle":
      "Have questions or want to book a service? Reach out to us and we'll get back to you as soon as possible.",
    "contact.getInTouch": "Get in Touch",
    "contact.location": "Location",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.hours": "Working Hours",
    "contact.hoursDetail": "Saturday - Thursday: 8:00 AM - 6:00 PM",
    "contact.sendMessage": "Send us a Message",
    "contact.fullName": "Full Name",
    "contact.required": "*",
    "contact.namePlaceholder": "Enter your full name",
    "contact.emailPlaceholder": "your.email@example.com",
    "contact.phonePlaceholder": "+968 XXX XXX XXX",
    "contact.message": "Message",
    "contact.messagePlaceholder": "How can we help you?",
    "contact.sendButton": "Send Message",
  },
  ar: {
    // Navigation
    "nav.services": "الخدمات",
    "nav.pricing": "الأسعار",
    "nav.reviews": "التقييمات",
    "nav.contact": "اتصل بنا",
    "nav.bookService": "احجز الخدمة",

    // Hero Section
    "hero.badge": "مركز تغيير الزيت رقم ١ في شمال الباطنة",
    "hero.title1": "خدمة تغيير زيت",
    "hero.title2": "محترفة في صحم",
    "hero.description":
      "احصل على تغيير زيت سريع ومحترف مع قطع غيار عالية الجودة وخدمة خبيرة وأسعار تنافسية في صحم، عُمان.",
    "hero.bookToday": "احجز خدمتك اليوم.",
    "hero.bookNow": "احجز الآن",
    "hero.viewServices": "عرض الخدمات",

    // Features
    "features.title": "خدماتنا",
    "features.subtitle": "خدمات السيارات المحترفة التي يمكنك الوثوق بها",
    "features.oilChange.title": "تغيير زيت محترف",
    "features.oilChange.description":
      "خدمة تغيير زيت سريعة وفعالة باستخدام زيوت محركات عالية الجودة ومرشحات لأداء مثالي للمحرك.",
    "features.spareParts.title": "قطع غيار عالية الجودة",
    "features.spareParts.description":
      "مجموعة واسعة من قطع غيار السيارات الأصلية وما بعد البيع لجميع العلامات التجارية والموديلات الرئيسية.",
    "features.battery.title": "بيع وخدمة البطاريات",
    "features.battery.description":
      "بطاريات سيارات متميزة مع خدمات التركيب والفحص المحترفة للحصول على أداء موثوق للمركبة.",
    "features.maintenance.title": "صيانة خبيرة",
    "features.maintenance.description":
      "خدمات صيانة شاملة للمركبات من قبل فنيين معتمدين للحفاظ على سيارتك تعمل بسلاسة.",

    // Pricing
    "pricing.title1": "اختر",
    "pricing.title2": "خطة الخدمة",
    "pricing.subtitle": "اختر خطة الخدمة المثالية لاحتياجات صيانة مركبتك",
    "pricing.basic.name": "الأساسية",
    "pricing.basic.price": "٢٥ ريال عُماني",
    "pricing.basic.description": "خدمة تغيير زيت أساسية للصيانة المنتظمة",
    "pricing.basic.feature1": "تغيير زيت عادي",
    "pricing.basic.feature2": "استبدال مرشح الزيت",
    "pricing.basic.feature3": "فحص ضغط الإطارات",
    "pricing.basic.feature4": "تذكير الخدمة",
    "pricing.premium.name": "المتميزة",
    "pricing.premium.price": "٤٥ ريال عُماني",
    "pricing.premium.description": "حزمة خدمة شاملة للأداء الأمثل",
    "pricing.premium.feature1": "تغيير زيت عادي",
    "pricing.premium.feature2": "استبدال مرشح الزيت والهواء",
    "pricing.premium.feature3": "فحص ضغط الإطارات",
    "pricing.premium.feature4": "فحص البطارية",
    "pricing.premium.feature5": "حجز ذو أولوية",
    "pricing.premium.feature6": "تذكير الخدمة",
    "pricing.fleet.name": "الأسطول",
    "pricing.fleet.price": "حسب الطلب",
    "pricing.fleet.description": "حزم خدمة متخصصة لمركبات الأسطول",
    "pricing.fleet.feature1": "خطط ائتمانية",
    "pricing.fleet.feature2": "تغيير زيت عادي",
    "pricing.fleet.feature3": "استبدال مرشح الزيت والهواء",
    "pricing.fleet.feature4": "فحص ضغط الإطارات",
    "pricing.fleet.feature5": "فحص البطارية",
    "pricing.fleet.feature6": "خدمات طوارئ ذات أولوية",
    "pricing.fleet.feature7": "تذكير الخدمة",
    "pricing.fleet.feature8": "تقرير شهري",
    "pricing.mostPopular": "الأكثر شعبية",
    "pricing.bookService": "احجز الخدمة",

    // CTA Section
    "cta.title": "تحتاج تغيير زيت؟",
    "cta.description":
      "انضم إلى آلاف العملاء الراضين الذين يثقون بنا في صيانة مركباتهم في صحم.",
    "cta.contactUs": "اتصل بنا",

    // Booking Dialog
    "booking.title": "احجز خدمتك",
    "booking.subtitle": "جدول خدمة تغيير الزيت المحترفة في صحم",
    "booking.fullName": "الاسم الكامل",
    "booking.phoneNumber": "رقم الهاتف",
    "booking.vehicleModel": "ماركة وموديل المركبة",
    "booking.serviceType": "نوع الخدمة",
    "booking.preferredDate": "التاريخ المفضل",
    "booking.preferredTime": "الوقت المفضل",
    "booking.additionalNotes": "ملاحظات إضافية",
    "booking.confirmBooking": "تأكيد الحجز",
    "booking.required": "*",
    "booking.selectService": "اختر نوع الخدمة",
    "booking.selectTime": "اختر الوقت",
    "booking.notesPlaceholder": "أي طلبات خاصة أو خدمات إضافية مطلوبة...",
    "booking.missingInfo": "معلومات مفقودة",
    "booking.fillFields": "يرجى ملء جميع الحقول المطلوبة.",
    "booking.confirmed": "تم تأكيد الحجز!",
    "booking.contactShortly": "سنتصل بك قريباً لتأكيد موعدك.",

    // Footer
    "footer.company": "هـ ن س للسيارات",
    "footer.description":
      "خدمات تغيير الزيت والسيارات المحترفة في صحم، شمال الباطنة، عُمان.",
    "footer.services": "الخدمات",
    "footer.oilChange": "تغيير الزيت",
    "footer.spareParts": "قطع الغيار",
    "footer.batteryService": "خدمة البطاريات",
    "footer.maintenance": "الصيانة",
    "footer.products": "المنتجات",
    "footer.motorOils": "زيوت المحركات",
    "footer.filters": "المرشحات",
    "footer.batteries": "البطاريات",
    "footer.accessories": "الإكسسوارات",
    "footer.legal": "قانوني",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.contact": "اتصل",
    "footer.copyright": "© ٢٠٢٤ هـ ن س للسيارات. جميع الحقوق محفوظة.",

    // Contact Page
    "contact.title": "تواصل",
    "contact.titleHighlight": "معنا",
    "contact.subtitle":
      "هل لديك أسئلة أو تريد حجز خدمة؟ تواصل معنا وسنعود إليك في أقرب وقت ممكن.",
    "contact.getInTouch": "تواصل معنا",
    "contact.location": "الموقع",
    "contact.phone": "الهاتف",
    "contact.email": "البريد الإلكتروني",
    "contact.hours": "ساعات العمل",
    "contact.hoursDetail": "السبت - الخميس: 8:00 صباحاً - 6:00 مساءً",
    "contact.sendMessage": "أرسل لنا رسالة",
    "contact.fullName": "الاسم الكامل",
    "contact.required": "*",
    "contact.namePlaceholder": "أدخل اسمك الكامل",
    "contact.emailPlaceholder": "your.email@example.com",
    "contact.phonePlaceholder": "+968 XXX XXX XXX",
    "contact.message": "الرسالة",
    "contact.messagePlaceholder": "كيف يمكننا مساعدتك؟",
    "contact.sendButton": "إرسال الرسالة",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize with saved preference or default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    return (savedLanguage === 'ar' || savedLanguage === 'en') ? savedLanguage : 'en';
  });

  useEffect(() => {
    // Apply direction to document
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    dir: language === "ar" ? "rtl" : "ltr",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
