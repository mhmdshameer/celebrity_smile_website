import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getServicesApi, type ServiceResponse } from "@/api/service";

const Services = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const list = await getServicesApi();
        setServices(list);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/services.jpg"
            alt="Dental Services"
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
              {language === "ar" ? "التميز في الرعاية الأسنان" : "Excellence in Dental Care"}
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-primary">
              {language === "ar" ? "تقديم خدمات رعاية أسنان استثنائية" : "Providing Exceptional Dental Care Services"}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {language === "ar"
                ? "استمتع بمجموعة شاملة من خدمات طب الأسنان المصممة لتلبية جميع احتياجاتك. من الفحوصات الروتينية إلى العلاجات المتقدمة، نحن ملتزمون بتقديم أعلى مستويات الرعاية والاهتمام الشخصي."
                : "Discover our comprehensive range of dental services designed to meet all your needs. From routine check-ups to advanced treatments, we're committed to providing the highest level of care and personal attention."
              }
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-16 pb-16">
        <Card className="mt-8">
          <CardHeader className={language === "ar" ? "text-right" : "text-left"}>
            <CardTitle>{language === "ar" ? "خدماتنا" : "Our Services"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={language === "ar" ? "text-right" : "text-left"}>{language === "ar" ? "الخدمة" : "Service"}</TableHead>
                  <TableHead className={language === "ar" ? "text-right" : "text-left"}>{language === "ar" ? "الوصف" : "Description"}</TableHead>
                  <TableHead className={language === "ar" ? "text-right" : "text-left"}>{language === "ar" ? "السعر" : "Price"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">Loading...</TableCell>
                  </TableRow>
                )}
                {!loading && services.map((s) => {
                  const name = language === "ar" ? s.serviceAr : s.service;
                  const desc = language === "ar" ? s.descriptionAr : s.description;
                  return (
                    <TableRow key={s._id}>
                      <TableCell className="font-medium">{name}</TableCell>
                      <TableCell className="max-w-md truncate">{desc}</TableCell>
                      <TableCell>{s.servicePrice.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Services;
