import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Departments = () => {
  const { t, language } = useLanguage();

  const departments = [
    {
      name: "General Dentistry Department",
      nameAr: "قسم طب الأسنان العام",
      description: "Comprehensive oral health care including check-ups, cleanings, fillings, and preventive treatments",
      descriptionAr: "رعاية صحة الفم الشاملة بما في ذلك الفحوصات والتنظيف والحشوات والعلاجات الوقائية",
      icon: "🏥",
    },
    {
      name: "Cosmetic Dentistry Department",
      nameAr: "قسم طب الأسنان التجميلي",
      description: "Advanced aesthetic procedures for a perfect smile including whitening, veneers, and bonding",
      descriptionAr: "إجراءات تجميلية متقدمة للحصول على ابتسامة مثالية بما في ذلك التبييض والقشور والترابط",
      icon: "✨",
    },
    {
      name: "Orthodontics Department",
      nameAr: "قسم تقويم الأسنان",
      description: "Specialized care for teeth alignment using braces, clear aligners, and other orthodontic treatments",
      descriptionAr: "رعاية متخصصة لتصحيح محاذاة الأسنان باستخدام التقويم والأجهزة الشفافة",
      icon: "🦷",
    },
    {
      name: "Implantology Department",
      nameAr: "قسم زراعة الأسنان",
      description: "State-of-the-art dental implant solutions for permanent tooth replacement",
      descriptionAr: "حلول زراعة الأسنان بأحدث التقنيات للاستبدال الدائم للأسنان",
      icon: "🔧",
    },
    {
      name: "Pediatric Dentistry Department",
      nameAr: "قسم طب أسنان الأطفال",
      description: "Specialized dental care for infants, children, and adolescents in a child-friendly environment",
      descriptionAr: "رعاية أسنان متخصصة للرضع والأطفال والمراهقين في بيئة صديقة للأطفال",
      icon: "👶",
    },
    {
      name: "Oral Surgery Department",
      nameAr: "قسم جراحة الفم والوجه والفكين",
      description: "Expert surgical procedures including wisdom teeth extraction and jaw surgery",
      descriptionAr: "إجراءات جراحية متخصصة بما في ذلك خلع ضرس العقل وجراحة الفك",
      icon: "🏥",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
          {t("departments")}
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {language === "ar" 
            ? "أقسامنا المتخصصة مجهزة بأحدث التقنيات ويديرها خبراء في مجالاتهم"
            : "Our specialized departments are equipped with cutting-edge technology and staffed by experts in their fields"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {departments.map((dept, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">{dept.icon}</div>
                <CardTitle className="text-xl">
                  {language === "ar" ? dept.nameAr : dept.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {language === "ar" ? dept.descriptionAr : dept.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Departments;
