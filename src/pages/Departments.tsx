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

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/departments.jpg"
            alt="Our Specialized Departments"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FD3DB5] opacity-20" />
        </div>
      </section>

      {/* Content Section */}
      <section className="relative bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
              {language === "ar" ? "أقسامنا المتخصصة" : "Our Specialized Departments"}
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-primary">
              {language === "ar" ? "مراكز التميز الطبي" : "Centers of Medical Excellence"}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {language === "ar"
                ? "اكتشف أقسامنا المتخصصة المجهزة بأحدث التقنيات ويديرها خبراء في مجالاتهم. كل قسم مصمم لتقديم رعاية متخصصة وشاملة لتلبية جميع احتياجاتك الطبية الأسنان."
                : "Discover our specialized departments equipped with cutting-edge technology and staffed by experts in their fields. Each department is designed to provide specialized and comprehensive care to meet all your dental healthcare needs."
              }
            </p>
          </div>
        </div>
      </section>

      <div className="flex-1 container mx-auto px-4 pt-16 pb-16">
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
