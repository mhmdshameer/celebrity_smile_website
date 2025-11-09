import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GoogleReviewsEmbed() {
  const { language } = useLanguage();
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, [language]); // Re-run effect when language changes

  // Map our language to Elfsight's language codes
  const getElfsightLanguage = () => {
    return language === 'ar' ? 'ar' : 'en';
  };

  return (
    <div className="my-10 w-full">
      <div
        className="elfsight-app-b704ca3c-2af9-48c7-b15c-b84b3ea4b94e"
        data-elfsight-app-lazy
        data-elfsight-app-locale={getElfsightLanguage()}
      />
    </div>
  );
}
