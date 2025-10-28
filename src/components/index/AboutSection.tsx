import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";


const AboutSection = () => {
  const { language } = useLanguage();

  // Texts in English and Arabic
  const title =
    language === "ar"
      ? "نقدم رعاية أسنان استثنائية بأحدث التقنيات"
      : "Offering Exceptional Dental Care with the Latest Technology";

  const description =
    language === "ar"
      ? "نحن ملتزمون بتوفير تجربة علاجية متميزة تجمع بين التكنولوجيا الحديثة والخبرة الواسعة، لتقديم رعاية فموية شاملة ومخصصة لكل مريض. فريقنا من الأطباء المتخصصين يسعى دائمًا لتحقيق ابتسامة صحية وجميلة تدوم طويلاً."
      : "We are committed to providing a premium dental experience that combines modern technology and expert care. Our team of specialists delivers personalized treatments designed to ensure a healthy, confident smile for every patient.";

  return (
    <section
      className={`py-24 bg-background transition-all duration-500`}
    >
      <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
        {/* 🖼️ Image */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src="/CLINIC PHOTO.jpeg"
            alt={language === "ar" ? "عيادة سيليبريتي سمايل" : "Celebrity Smile Clinic"}
            loading="lazy"
            className="w-[500px] h-[500px] object-cover rounded-2xl shadow-xl border"
          />
        </motion.div>

        {/* ✨ Text */}
        <motion.div
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className={`w-full md:w-1/2 flex flex-col ${
            language === "ar"
              ? "items-end text-right"
              : "items-start text-left"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-transparent leading-tight">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
