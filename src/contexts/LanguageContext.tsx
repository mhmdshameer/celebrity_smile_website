import React, { createContext, useContext, useState } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    doctors: "Doctors",
    services: "Services",
    departments: "Departments",
    offers: "Offers",
    priceList: "Price List",
    privilegeCard: "Privilege Card",
    blog: "Blog",
    contact: "Contact Us",
    
    // Home Page
    aboutTitle: "About Celebrity Smile Clinic",
    aboutDescription: "Celebrity Smile Clinic is a leading dental care provider committed to delivering exceptional dental services with a focus on patient comfort and satisfaction.",
    bookAppointment: "Book Appointment",
    learnMore: "Learn More",
    
    // Footer
    footerAbout: "About Us",
    footerServices: "Our Services",
    footerContact: "Contact Information",
    footerRights: "All rights reserved",
    
    // Doctors
    ourDoctors: "Our Doctors",
    viewProfile: "View Profile",
    
    // Contact
    getInTouch: "Get In Touch",
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    send: "Send Message",
    
    // Common
    loading: "Loading...",
    submit: "Submit",
    cancel: "Cancel",
    
    // Statistics
    yearsExperience: "Years of Experience",
    happyPatients: "Happy Patients",
    expertDoctors: "Expert Doctors",
    successRate: "Success Rate",

    // New Statistics Section
    doctorsExperienceTitle: "Our Commitment to Excellence",
    doctorsExperienceDesc: "At Celebrity Smile Clinic, we set a new standard for dental care. Our commitment is simple, to provide exceptional results using the most advanced technology available. Our professional team delivers personalized treatments, ensuring every patient receives innovative, high quality care that not only meets but exceeds expectations, solidifying our reputation as the leading choice in the region.",

    // Service Statistics
    smileMakeoverCases: "Smile makeover case",
    dentalImplants: "Dental implant",
    clearAlignerCases: "Clear aligner case",

    // Experience Statistics
    yearsExcellence: "years of excellence",
    certifiedDoctors: "Internationally certified doctors",
    multilingualTeam: "Multilingual team",
    
    // Testimonials
    testimonials: "What Our Patients Say",
    
    // Technology
    ourTechnology: "State-of-the-Art Technology",
    techDesc: "We invest in the latest dental technology to provide you with the best possible care",
    
    // CTA
    readyToSmile: "Ready to Transform Your Smile?",
    ctaDescription: "Schedule your appointment today and experience world-class dental care",
    contactUs: "Contact Us Now",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    doctors: "الأطباء",
    services: "الخدمات",
    departments: "الأقسام",
    offers: "العروض",
    priceList: "قائمة الأسعار",
    privilegeCard: "بطاقة الامتياز",
    blog: "المدونة",
    contact: "اتصل بنا",
    
    // Home Page
    aboutTitle: "عن عيادة سيليبريتي سمايل",
    aboutDescription: "مجمع ابتسامة المشاهير الطبي هو مزود رائد لخدمات طب الأسنان، ملتزم بتقديم رعاية استثنائية مع التركيز على راحة المريض ورضاه.",
    bookAppointment: "حجز موعد",
    learnMore: "اعرف المزيد",
    
    // Footer
    footerAbout: "عنا",
    footerServices: "خدماتنا",
    footerContact: "معلومات الاتصال",
    footerRights: "جميع الحقوق محفوظة",
    
    // Doctors
    ourDoctors: "أطباؤنا",
    viewProfile: "عرض الملف الشخصي",
    
    // Contact
    getInTouch: "تواصل معنا",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    message: "الرسالة",
    send: "إرسال الرسالة",
    
    // Common
    loading: "جاري التحميل...",
    submit: "إرسال",
    cancel: "إلغاء",
    
    // Statistics
    yearsExperience: "سنوات من الخبرة",
    happyPatients: "مريض سعيد",
    expertDoctors: "طبيب خبير",
    successRate: "معدل النجاح",

    // New Statistics Section
    doctorsExperienceTitle: "خبرة أطبائنا",
    doctorsExperienceDesc: "في مجمع ابتسامة المشاهير الطبي، نعيد تعريف تجربة رعاية الأسنان بحلول متجذرة في الجودة والابتكار. يقدم فريقنا المهني رعاية استثنائية ترفع من معايير طب الأسنان. نحن ملتزمون باستخدام أحدث التقنيات والتطورات لتقديم حلول طبية متميزة، مما يجعلنا الخيار الأول في المنطقة.",

    // Service Statistics
    smileMakeoverCases: "حالات تجميل الابتسامة",
    dentalImplants: "زراعة الأسنان",
    clearAlignerCases: "حالات التقويم الشفاف",

    // Experience Statistics
    yearsExcellence: "سنوات من التميز",
    certifiedDoctors: "أطباء معتمدون دولياً",
    multilingualTeam: "فريق متعدد اللغات",
    
    // Testimonials
    testimonials: "ماذا يقول مرضانا",
    
    // Technology
    ourTechnology: "أحدث التقنيات",
    techDesc: "نستثمر في أحدث تقنيات طب الأسنان لنقدم لك أفضل رعاية ممكنة",
    
    // CTA
    readyToSmile: "هل أنت مستعد لتحويل ابتسامتك؟",
    ctaDescription: "احجز موعدك اليوم واختبر رعاية أسنان عالمية المستوى",
    contactUs: "اتصل بنا الآن",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === "ar" ? "rtl" : "ltr"} className={language === "ar" ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
