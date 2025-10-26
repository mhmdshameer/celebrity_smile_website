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
      <div className="container mx-auto px-4 py-16">
        <h1
          className={`text-4xl md:text-5xl font-bold mb-4 text-primary ${language === "ar" ? "text-right" : "text-left"}`}
        >
          {language === "ar" ? "خدماتنا" : "Our Services"}
        </h1>
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
