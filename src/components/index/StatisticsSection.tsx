import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Users, TrendingUp, Star } from "lucide-react";
import { motion } from "framer-motion";

interface StatisticsSectionProps {
  t: (key: string) => string;
}

const StatisticsSection = ({ t }: StatisticsSectionProps) => {
  return (
    <motion.section
      className="py-20 bg-primary/5"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <p className="text-muted-foreground">{t("yearsExperience")}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
            <p className="text-muted-foreground">{t("happyPatients")}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary mb-2">25+</div>
            <p className="text-muted-foreground">{t("expertDoctors")}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary mb-2">99%</div>
            <p className="text-muted-foreground">{t("successRate")}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default StatisticsSection;
