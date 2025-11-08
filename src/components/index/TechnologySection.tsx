"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { StarIcon } from "lucide-react";

interface TechnologySectionProps {
  t: (key: string) => string;
}

const TechnologySection = ({ t }: TechnologySectionProps) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const technologies = [
    {
      icon: "/3dimaging.png",
      title: "3D Imaging",
      titleAr: "التصوير ثلاثي الأبعاد",
      description: "Advanced diagnostic precision.",
      descriptionAr: "دقة تشخيصية متقدمة.",
    },
    {
      icon: "/laserdentist.png",
      title: "Laser Dentistry",
      titleAr: "طب الأسنان بالليزر",
      description: "Minimally invasive treatments.",
      descriptionAr: "علاجات طفيفة التوغل.",
    },
    {
      icon: "/digitalsmile.png",
      title: "Digital Smile Design",
      titleAr: "تصميم الابتسامة الرقمي",
      description: "Preview your new smile virtually.",
      descriptionAr: "معاينة ابتسامتك الجديدة رقميًا.",
    },
    {
      icon: "/cad_cam.png",
      title: "CAD/CAM Technology",
      titleAr: "تقنية CAD/CAM",
      description: "Same-day precision restorations.",
      descriptionAr: "ترميمات دقيقة في نفس اليوم.",
    },
  ];

  return (
    <motion.section
      className="py-16 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.5,
                delay: 0.1
              }
            }}
          >
            <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-transparent mx-4 ${
              isArabic ? "font-arabic" : ""
            }`}>
              {t("ourTechnology")}
            </h2>
          </motion.div>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: index * 0.1,
                  duration: 0.5
                }
              }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-4"
            >
              {/* Bouncy Icon Container */}
              <motion.div 
                className="w-20 h-20 mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <motion.img 
                  src={tech.icon} 
                  alt={isArabic ? tech.titleAr : tech.title}
                  className="w-12 h-12 object-contain"
                  whileHover={{ 
                    scale: 1.2,
                    transition: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 10 
                    }
                  }}
                />
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-1 text-foreground">
                {isArabic ? tech.titleAr : tech.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {isArabic ? tech.descriptionAr : tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TechnologySection;
