import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  appointmentFormOpen: boolean;
  handleWhatsAppBooking: () => void;
  t: (key: string) => string;
}

const HeroSection = ({ appointmentFormOpen, handleWhatsAppBooking, t }: HeroSectionProps) => {
  const { language } = useLanguage();

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center"
      style={{
        height: '100vh',
        width: '100vw',
        minHeight: '100vh'
      }}
    >

      {/* Brand Color Overlay */}
      <div className="absolute inset-0 bg-[#FD3DB5] opacity-20" />

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-left text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              <span className="block">
                {language === "ar" ? "مرحباً بك في" : "Welcome to"}
              </span>
              <span className="block text-primary">
                {language === "ar" ? "مجمع ابتسامة المشاهير الطبي" : "Celebrity Smile Dental Clinic"}
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 drop-shadow-lg text-primary">
              {language === "ar"
                ? "أفضل عيادة أسنان"
                : "Your Best Choice Dental Clinic"
              }
            </h2>
            <p className="text-lg md:text-xl mb-8 drop-shadow-lg leading-relaxed">
              {language === "ar"
                ? "استمتع برعاية أسنان عالمية المستوى مع أحدث التقنيات والمهنيين الرحيمين. نقدم خدمات أسنان شاملة مصممة خصيصاً لاحتياجاتك الفريدة، مما يضمن ابتسامات صحية وجميلة لجميع مرضانا."
                : "Experience world-class dental care with cutting-edge technology and compassionate professionals. We provide comprehensive dental services tailored to your unique needs, ensuring healthy and beautiful smiles for all our patients."
              }
            </p>
            {!appointmentFormOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button size="lg" onClick={handleWhatsAppBooking} className="text-lg px-8 py-3">
                  <Phone className="mr-2 h-5 w-5" />
                  {t("bookAppointment")}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
