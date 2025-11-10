"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const features = [
  {
    icon: "/expertcare.png",
    titleEn: "Expert Care",
    titleAr: "رعاية متخصصة",
    descEn: "Highly qualified dentists with years of experience in all aspects of dental care.",
    descAr: "أطباء أسنان مؤهلون بخبرة واسعة في جميع مجالات العناية بالأسنان.",
  },
  {
    icon: "/moderntech.png",
    titleEn: "Modern Technology",
    titleAr: "تقنيات حديثة",
    descEn: "State-of-the-art equipment and advanced techniques for optimal results.",
    descAr: "أحدث المعدات والتقنيات المتقدمة لتحقيق أفضل النتائج.",
  },
  {
    icon: "/patientcomf.png",
    titleEn: "Patient Comfort",
    titleAr: "راحة المريض",
    descEn: "A welcoming environment where your comfort and satisfaction are our top priorities.",
    descAr: "بيئة مريحة وودية حيث راحتك ورضاك هما أولويتنا القصوى.",
  },
];

const WhyChooseUs = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <motion.section
      id="why-choose-us"
      className="py-16 bg-gradient-to-b from-background to-muted/30"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <motion.h2
          className={`text-4xl md:text-5xl py-2 font-bold mb-6 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-transparent ${
            isArabic ? "font-arabic" : ""
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isArabic ? "لماذا تختارنا؟" : "Why Choose Us?"}
        </motion.h2>
        <motion.p
          className={`text-muted-foreground max-w-2xl mx-auto mb-16 ${
            isArabic ? "font-arabic text-lg" : ""
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isArabic
            ? "نحن ندمج الخبرة مع أحدث التقنيات لتوفير أفضل تجربة علاجية لمرضانا."
            : "We combine expertise and innovation to deliver an exceptional dental experience."}
        </motion.p>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border border-muted/40 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl bg-card/60 backdrop-blur-sm">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <motion.div 
                    className="w-20 h-20 mb-5 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center"
                    whileHover={{
                      y: -5,
                      transition: { 
                        type: "spring",
                        stiffness: 300,
                        damping: 10 
                      }
                    }}
                  >
                    
                      <img 
                        src={feature.icon}
                        alt={isArabic ? feature.titleAr : feature.titleEn}
                        className="w-12 h-12 object-contain"
                      />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary">
                    {isArabic ? feature.titleAr : feature.titleEn}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {isArabic ? feature.descAr : feature.descEn}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
