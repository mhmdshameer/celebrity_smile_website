import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import GoogleReviewsEmbed from "@/components/GoogleReviewsEmbed";

interface TestimonialsSectionProps {
  t: (key: string) => string;
}

const TestimonialsSection = ({ t }: TestimonialsSectionProps) => {
  const { language } = useLanguage();
  return (
    <motion.section
      className={`py-12 bg-muted/50 ${language === "ar" ? 'rtl' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      dir={language === "ar" ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-transparent mb-4 leading-[1.2] py-2
            ${language === "ar" ? 'font-cairo text-center' : ''}`}>
            {language === "ar" ? "آراء عملائنا" : "What Our Patients Say"}
          </h2>
          <p className={`text-muted-foreground text-base sm:text-lg leading-normal -mt-2 ${
            language === "ar" ? 'text-center' : ''
          }`}>
            {language === "ar" ? "استمع إلى تجارب مرضانا" : "Hear from our valued patients"}
          </p>
        </div>
        
        {/* Google Reviews Widget */}
        <div className="mb-4">
          <GoogleReviewsEmbed />
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
