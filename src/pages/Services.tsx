import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: "🦷",
      title: "General Dentistry",
      titleAr: "طب الأسنان العام",
      description: "Routine check-ups, cleanings, and preventive care",
    },
    {
      icon: "✨",
      title: "Cosmetic Dentistry",
      titleAr: "طب الأسنان التجميلي",
      description: "Teeth whitening, veneers, and smile makeovers",
    },
    {
      icon: "🔧",
      title: "Orthodontics",
      titleAr: "تقويم الأسنان",
      description: "Braces, clear aligners, and bite correction",
    },
    {
      icon: "🌟",
      title: "Dental Implants",
      titleAr: "زراعة الأسنان",
      description: "Permanent tooth replacement solutions",
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
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
