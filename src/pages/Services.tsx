import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: "🦷",
      title: "General Dentistry",
      titleAr: "طب الأسنان العام",
      description: "Routine check-ups, cleanings, and preventive care for healthy teeth and gums",
      descriptionAr: "الفحوصات الروتينية والتنظيف والرعاية الوقائية للأسنان واللثة الصحية",
    },
    {
      icon: "✨",
      title: "Cosmetic Dentistry",
      titleAr: "طب الأسنان التجميلي",
      description: "Teeth whitening, veneers, and complete smile makeovers",
      descriptionAr: "تبييض الأسنان، القشور التجميلية، وتجميل الابتسامة الكامل",
    },
    {
      icon: "🔧",
      title: "Orthodontics",
      titleAr: "تقويم الأسنان",
      description: "Braces, clear aligners, and bite correction treatments",
      descriptionAr: "التقويم المعدني، التقويم الشفاف، وتصحيح العضة",
    },
    {
      icon: "🌟",
      title: "Dental Implants",
      titleAr: "زراعة الأسنان",
      description: "Permanent tooth replacement with advanced implant technology",
      descriptionAr: "استبدال الأسنان الدائم بتقنية الزراعة المتقدمة",
    },
    {
      icon: "🦴",
      title: "Oral Surgery",
      titleAr: "جراحة الفم",
      description: "Wisdom teeth removal and other surgical procedures",
      descriptionAr: "إزالة ضرس العقل والإجراءات الجراحية الأخرى",
    },
    {
      icon: "👶",
      title: "Pediatric Dentistry",
      titleAr: "طب أسنان الأطفال",
      description: "Specialized dental care for children in a friendly environment",
      descriptionAr: "رعاية أسنان متخصصة للأطفال في بيئة ودية",
    },
    {
      icon: "🌙",
      title: "Emergency Dental Care",
      titleAr: "طوارئ الأسنان",
      description: "24/7 emergency services for urgent dental issues",
      descriptionAr: "خدمات طوارئ على مدار الساعة لحالات الأسنان العاجلة",
    },
    {
      icon: "🔬",
      title: "Root Canal Treatment",
      titleAr: "علاج الجذور",
      description: "Advanced endodontic procedures to save infected teeth",
      descriptionAr: "إجراءات علاج الجذور المتقدمة لإنقاذ الأسنان المصابة",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            {t("services")}
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Comprehensive dental services tailored to your needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">
                    {language === "ar" ? service.titleAr : service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {language === "ar" ? service.descriptionAr : service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
