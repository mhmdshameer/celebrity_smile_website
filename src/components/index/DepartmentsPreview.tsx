import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const DepartmentsPreview = () => {
  const { t, language } = useLanguage();
  
  const departments = [
    {
      name: language === 'ar' ? 'قسم الترميم' : 'Restorative Department',
      description: language === 'ar' 
        ? 'علاجات تجميلية وترميمية متقدمة لاستعادة ابتسامتك' 
        : 'Advanced cosmetic and restorative treatments to bring back your smile',
      icon: '/restorative.png',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: language === 'ar' ? 'قسم الجراحة' : 'Surgical Department',
      description: language === 'ar'
        ? 'إجراءات جراحية متقدمة مع فريق من الخبراء'
        : 'Advanced surgical procedures with a team of experts',
      icon: '/surgical.png',
      bgGradient: 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20',
      textColor: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      name: language === 'ar' ? 'قسم تقويم الأسنان' : 'Orthodontic Department',
      description: language === 'ar'
        ? 'حلول تقويم أسنان حديثة للمحاذاة الصحيحة'
        : 'Modern orthodontic solutions for proper alignment',
      icon: '/orthoDprt.png',
      bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ];
  
  const sectionTitle = language === 'ar' ? 'أقسامنا' : 'Our Departments';
  const sectionDescription = language === 'ar'
    ? 'اكتشف أقسامنا المتخصصة لرعاية أسنانك'
    : 'Discover our specialized departments for your dental care';
  const viewAllText = language === 'ar' ? 'عرض جميع الأقسام' : 'View All Departments';

  return (
    <motion.section
      className="py-20 bg-background"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Header */}
        <div className="text-center mb-20 relative z-10">
          <h2 className={`text-4xl py-2 md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-transparent mb-4 ${language === 'ar' ? 'rtl' : ''}`}>
            {sectionTitle}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {departments.map((dept, index) => (
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
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 shadow-sm hover:shadow-pink-200/50 dark:hover:shadow-pink-900/20">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex justify-center mb-3">
                    <div className={`w-24 h-24 rounded-2xl ${dept.bgGradient} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <img 
                        src={dept.icon} 
                        alt={dept.name} 
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold text-center mb-2 ${dept.textColor}`}>
                    {dept.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-center mb-4">
                    {dept.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/departments">
            <Button size="lg" className={`text-lg px-8 py-5 group ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              {viewAllText}
              <ArrowRight className={`${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} h-5 w-5 transition-transform group-hover:translate-x-1`} />
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default DepartmentsPreview;
