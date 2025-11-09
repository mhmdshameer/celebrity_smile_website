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
      className="py-10 bg-muted/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-4">
            {language === "ar" ? "آراء عملائنا" : "What Our Patients Say"}
          </h2>
        
        {/* Google Reviews Widget */}
        <div className="mb-10">
          <GoogleReviewsEmbed />
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
