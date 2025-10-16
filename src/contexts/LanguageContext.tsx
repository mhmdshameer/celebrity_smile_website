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
    aboutDescription: "عيادة سيليبريتي سمايل هي مزود رائد لخدمات طب الأسنان ملتزمة بتقديم خدمات أسنان استثنائية مع التركيز على راحة المريض ورضاه.",
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
