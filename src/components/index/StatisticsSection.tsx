import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Clock, Shield, Globe, StarIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatisticsSectionProps {
  t: (key: string) => string;
}

const StatisticsSection = ({ t }: StatisticsSectionProps) => {
  const { language } = useLanguage();

  return (
    <motion.section
      className="py-20"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <span className="text-2xl">
              <StarIcon/>
            </span>
            <span className="text-2xl">
              <StarIcon/>
            </span>
            <h2 className="text-5xl font-bold text-primary mx-4">
              {t("doctorsExperienceTitle")}
            </h2>
            <span className="text-2xl">
              <StarIcon/>
            </span>
            <span className="text-2xl">
              <StarIcon/>
            </span>
          </div>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t("doctorsExperienceDesc")}
          </p>
        </div>

        {/* Service Statistics - Gray Background */}
        <div className="bg-gray-100 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">800+</div>
              <p className="text-muted-foreground text-lg">{t("smileMakeoverCases")}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">1800+</div>
              <p className="text-muted-foreground text-lg">{t("dentalImplants")}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">1000+</div>
              <p className="text-muted-foreground text-lg">{t("clearAlignerCases")}</p>
            </div>
          </div>
        </div>

        {/* Experience Statistics with Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">15+</div>
            <p className="text-muted-foreground">{t("yearsExcellence")}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">25+</div>
            <p className="text-muted-foreground">{t("certifiedDoctors")}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">5000+</div>
            <p className="text-muted-foreground">{t("happyPatients")}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">5+</div>
            <p className="text-muted-foreground">{t("multilingualTeam")}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default StatisticsSection;
