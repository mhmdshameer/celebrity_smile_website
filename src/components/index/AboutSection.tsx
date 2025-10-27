import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface AboutSectionProps {
  t: (key: string) => string;
  className?: string;
}

const AboutSection = ({ t, className }: AboutSectionProps) => {
  return (
    <motion.section
      className={`py-20 transition-all duration-500 ${className || ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            {t("aboutTitle")}
          </h2>
          <Card className="border-primary/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-full min-h-[320px]">
                <img
                  src="/CLINIC PHOTO.jpeg"
                  alt="Celebrity Smile Clinic"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {t("aboutDescription")}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Our state-of-the-art facility is equipped with the latest dental technology, ensuring that every treatment is performed with precision and care. Our team of experienced dentists and specialists are dedicated to providing personalized care tailored to your unique needs.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From routine check-ups to advanced cosmetic procedures, we offer a comprehensive range of dental services designed to keep your smile healthy and beautiful. Trust Celebrity Smile Clinic for all your dental care needs.
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
