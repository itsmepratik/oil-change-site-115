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
    "nav.catalogue": "Catalogue",
    "nav.reviews": "Reviews",
    "nav.contact": "Contact",
    "nav.bookService": "Book Service",

    // Hero Section
    "hero.badge": "North Al Batinah's #1 oil service center",
    "hero.title1": "Your Car’s Oil Change.",
    "hero.title2": "Done Right. Done Fair.",
    "hero.description":
      "No fancy talk. Just the best oil change in Saham. We get you in, sorted, and back on the road. Fast.",
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

    // Why Choose Us Section
    "whychooseus.title": "Why Choose Us?",
    "whychooseus.subtitle": "We know you have options. Here is why Saham trusts us.",
    "whychooseus.fairprice.title": "Fair Price, Guaranteed.",
    "whychooseus.fairprice.description": "Your car needs care, not a huge bill. We offer the most reasonable oil change in town. What you see is what you pay.",
    "whychooseus.oils.title": "Top-Tier Oils Only.",
    "whychooseus.oils.description": "We use only high-quality oils. Your engine stays cleaner. It runs smoother. It lasts longer. Simple.",
    "whychooseus.experts.title": "Experts Who Care.",
    "whychooseus.experts.description": "Our team knows engines. We work with pride. We treat your car like it's our own.",
    "whychooseus.speed.title": "In and Out.",
    "whychooseus.speed.description": "Your time matters. We work quickly without cutting corners. Enjoy a coffee and we'll handle the grime.",

    // Founders Section
    "founders.title": "Meet Our",
    "founders.titleHighlight": "Founders",
    "founders.subtitle": "Passionate automotive experts dedicated to revolutionizing car care services",

    // Testimonials Section
    "testimonials.title": "Trusted by Customers",
    "testimonials.subtitle": "Join thousands of satisfied customers all across North Al Batinah and Oman",
    "testimonials.ahmad.name": "Ahmad Al-Rashid",
    "testimonials.ahmad.role": "Fleet Manager",
    "testimonials.ahmad.content": "The quick oil change service and quality parts have kept our company vehicles running smoothly. Their professional service and competitive prices make them our go-to choice in Saham.",
    "testimonials.fatima.name": "Fatima Al-Zahra",
    "testimonials.fatima.role": "Local Resident",
    "testimonials.fatima.content": "I've been bringing my car here for over 2 years. The staff is knowledgeable, the service is fast, and they always use quality oil and filters. Highly recommended!",
    "testimonials.mohammed.name": "Mohammed Al-Busaidi",
    "testimonials.mohammed.role": "Taxi Driver",
    "testimonials.mohammed.content": "As a taxi driver, regular maintenance is crucial. Their oil change service is efficient and affordable. The team understands the needs of commercial vehicles.",
    "testimonials.aisha.name": "Aisha Al-Hinai",
    "testimonials.aisha.role": "Working Professional",
    "testimonials.aisha.content": "I appreciate their quick service and fair pricing. They also helped me find the right battery for my car. Professional and trustworthy service center.",
    "testimonials.salem.name": "Salem Al-Kindi",
    "testimonials.salem.role": "Car Enthusiast",
    "testimonials.salem.content": "They stock quality spare parts and their oil change service is top-notch. The technicians are experienced and always provide honest advice about my vehicle's needs.",
    "testimonials.mariam.name": "Mariam Al-Lawati",
    "testimonials.mariam.role": "Family Driver",
    "testimonials.mariam.content": "Reliable service with a personal touch. They remember my car's service history and always remind me when it's time for maintenance. Great customer care!",

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
    "nav.catalogue": "الكتالوج",
    "nav.reviews": "التقييمات",
    "nav.contact": "اتصل بنا",
    "nav.bookService": "احجز الخدمة",

    // Hero Section
    "hero.badge": "مركز تغيير الزيت رقم ١ في شمال الباطنة",
    "hero.title1": "تغيير زيت سيارتك.",
    "hero.title2": "منجز بإتقان. منجز بإنصاف.",
    "hero.description":
      "لا كلام فارغ. فقط أفضل تغيير زيت في صحم. ندخلك، نرتب أمورك، ونعيدك إلى الطريق. بسرعة.",
    "hero.bookToday": "احجز خدمتك اليوم.",
    "hero.bookNow": "احجز الخدمة الآن",
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

    // Why Choose Us Section
    "whychooseus.title": "لماذا تختارنا؟",
    "whychooseus.subtitle": "نحن نعلم أن لديك خيارات. إليك السبب في ثقة صحم بنا.",
    "whychooseus.fairprice.title": "سعر عادل، مضمون.",
    "whychooseus.fairprice.description": "سيارتك تحتاج إلى عناية، وليس فاتورة كبيرة. نحن نقدم أرخص تغيير زيت في المدينة. ما تراه هو ما تدفعه.",
    "whychooseus.oils.title": "زيوت عالية الجودة فقط.",
    "whychooseus.oils.description": "نستخدم زيوت عالية الجودة فقط. يبقى محركك أنظف. يعمل بسلاسة أكبر. يدوم أطول. بسيط.",
    "whychooseus.experts.title": "خبراء يهتمون.",
    "whychooseus.experts.description": "فريقنا يعرف المحركات. نحن نعمل بفخر. نحن نتعامل مع سيارتك كأنها سيارتنا الخاصة.",
    "whychooseus.speed.title": "دخول وخروج سريع.",
    "whychooseus.speed.description": "وقتك مهم. نحن نعمل بسرعة دون التهاون في الجودة. استمتع بقهوة وسنتولى الأمر.",

    // Founders Section
    "founders.title": "تعرف على",
    "founders.titleHighlight": "مؤسسينا",
    "founders.subtitle": "خبراء السيارات المتحمسين المكرسين لإحداث ثورة في خدمات العناية بالسيارات",

    // Testimonials Section
    "testimonials.title": "موثوق من قبل العملاء",
    "testimonials.subtitle": "انضم إلى آلاف العملاء الراضين في جميع أنحاء شمال الباطنة وعُمان",
    "testimonials.ahmad.name": "أحمد الراشد",
    "testimonials.ahmad.role": "مدير الأسطول",
    "testimonials.ahmad.content": "خدمة تغيير الزيت السريعة والقطع عالية الجودة حافظت على سيارات شركتنا تعمل بسلاسة. خدمتهم المهنية وأسعارهم التنافسية تجعلهم خيارنا الأول في صحم.",
    "testimonials.fatima.name": "فاطمة الزهراء",
    "testimonials.fatima.role": "مقيمة محلية",
    "testimonials.fatima.content": "أحضر سيارتي هنا منذ أكثر من سنتين. الموظفون على دراية، الخدمة سريعة، ويستخدمون دائماً زيت ومرشحات عالية الجودة. أوصي بشدة!",
    "testimonials.mohammed.name": "محمد البوسعيدي",
    "testimonials.mohammed.role": "سائق تاكسي",
    "testimonials.mohammed.content": "كسائق تاكسي، الصيانة المنتظمة أمر بالغ الأهمية. خدمة تغيير الزيت لديهم فعالة وبأسعار معقولة. الفريق يفهم احتياجات المركبات التجارية.",
    "testimonials.aisha.name": "عائشة الهنائية",
    "testimonials.aisha.role": "محترفة عاملة",
    "testimonials.aisha.content": "أقدر خدمتهم السريعة والتسعير العادل. كما ساعدوني في إيجاد البطارية المناسبة لسيارتي. مركز خدمة محترف وموثوق.",
    "testimonials.salem.name": "سالم الكندي",
    "testimonials.salem.role": "عاشق السيارات",
    "testimonials.salem.content": "يخزنون قطع غيار عالية الجودة وخدمة تغيير الزيت من الدرجة الأولى. الفنيون ذوو خبرة ويقدمون دائماً نصائح صادقة حول احتياجات مركبتي.",
    "testimonials.mariam.name": "مريم اللواتية",
    "testimonials.mariam.role": "سائقة عائلية",
    "testimonials.mariam.content": "خدمة موثوقة مع لمسة شخصية. يتذكرون تاريخ خدمة سيارتي ويذكرونني دائماً عندما يحين وقت الصيانة. رعاية عملاء رائعة!",

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
