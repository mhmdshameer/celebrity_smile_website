"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface TechnologySectionProps {
  t: (key: string) => string;
}

const TechnologySection = ({ t }: TechnologySectionProps) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const technologies = [
    {
      icon: "🔬",
      title: "3D Imaging",
      titleAr: "التصوير ثلاثي الأبعاد",
      description: "Advanced diagnostic precision.",
      descriptionAr: "دقة تشخيصية متقدمة.",
    },
    {
      icon: "💉",
      title: "Laser Dentistry",
      titleAr: "طب الأسنان بالليزر",
      description: "Minimally invasive treatments.",
      descriptionAr: "علاجات طفيفة التوغل.",
    },
    {
      icon: "🖥️",
      title: "Digital Smile Design",
      titleAr: "تصميم الابتسامة الرقمي",
      description: "Preview your new smile virtually.",
      descriptionAr: "معاينة ابتسامتك الجديدة رقميًا.",
    },
    {
      icon: "🦾",
      title: "CAD/CAM Technology",
      titleAr: "تقنية CAD/CAM",
      description: "Same-day precision restorations.",
      descriptionAr: "ترميمات دقيقة في نفس اليوم.",
    },
  ];

  return (
    <motion.section
      className="py-24 bg-gradient-to-b from-background to-muted/20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Title & Description */}
        <div className="text-center mb-16">
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-transparent ${
              isArabic ? "font-arabic" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t("ourTechnology")}
          </motion.h2>
          <motion.p
            className={`text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed ${
              isArabic ? "font-arabic text-lg" : ""
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t("techDesc")}
          </motion.p>
        </div>

        {/* Technology Cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="group relative overflow-hidden border border-muted/40 rounded-2xl bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  {/* Icon */}
                  <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-4xl transition-transform group-hover:scale-110">
                    {tech.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    {isArabic ? tech.titleAr : tech.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {isArabic ? tech.descriptionAr : tech.description}
                  </p>
                </CardContent>

                {/* Gradient Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TechnologySection;
