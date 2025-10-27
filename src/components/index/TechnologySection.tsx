import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface TechnologySectionProps {
  t: (key: string) => string;
}

const TechnologySection = ({ t }: TechnologySectionProps) => {
  const { language } = useLanguage();
  const technologies = [
    {
      icon: "🔬",
      title: "3D Imaging",
      titleAr: "التصوير ثلاثي الأبعاد",
      description: "Advanced diagnostic precision",
      descriptionAr: "دقة تشخيصية متقدمة"
    },
    {
      icon: "💉",
      title: "Laser Dentistry",
      titleAr: "طب الأسنان بالليزر",
      description: "Minimally invasive treatments",
      descriptionAr: "علاجات طفيفة التوغل"
    },
    {
      icon: "🖥️",
      title: "Digital Smile Design",
      titleAr: "تصميم الابتسامة الرقمي",
      description: "Preview your new smile",
      descriptionAr: "معاينة ابتسامتك الجديدة"
    },
    {
      icon: "🦾",
      title: "CAD/CAM Technology",
      titleAr: "تقنية CAD/CAM",
      description: "Same-day restorations",
      descriptionAr: "ترميمات في نفس اليوم"
    }
  ];

  return (
    <motion.section
      className="py-20"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t("ourTechnology")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("techDesc")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <Card key={index} className="text-center p-6">
              <div className="text-4xl mb-4">{tech.icon}</div>
              <h3 className="text-lg font-semibold mb-2">
                {language === "ar" ? tech.titleAr : tech.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? tech.descriptionAr : tech.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TechnologySection;
