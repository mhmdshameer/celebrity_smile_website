import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PriceList = () => {
  const { t, language } = useLanguage();

  const priceCategories = [
    {
      category: "General Dentistry",
      categoryAr: "طب الأسنان العام",
      services: [
        { name: "Dental Consultation", nameAr: "استشارة الأسنان", price: "200 SAR" },
        { name: "Teeth Cleaning", nameAr: "تنظيف الأسنان", price: "300 SAR" },
        { name: "Dental Filling", nameAr: "حشو الأسنان", price: "250-500 SAR" },
        { name: "Tooth Extraction", nameAr: "خلع الأسنان", price: "300-600 SAR" },
      ],
    },
    {
      category: "Cosmetic Dentistry",
      categoryAr: "طب الأسنان التجميلي",
      services: [
        { name: "Teeth Whitening", nameAr: "تبييض الأسنان", price: "1,500 SAR" },
        { name: "Dental Veneers (per tooth)", nameAr: "القشور التجميلية (للسن الواحد)", price: "2,000 SAR" },
        { name: "Smile Makeover", nameAr: "تجميل الابتسامة", price: "Starting from 15,000 SAR" },
      ],
    },
    {
      category: "Orthodontics",
      categoryAr: "تقويم الأسنان",
      services: [
        { name: "Metal Braces", nameAr: "التقويم المعدني", price: "8,000-12,000 SAR" },
        { name: "Ceramic Braces", nameAr: "التقويم الخزفي", price: "10,000-15,000 SAR" },
        { name: "Clear Aligners", nameAr: "التقويم الشفاف", price: "12,000-20,000 SAR" },
      ],
    },
    {
      category: "Dental Implants",
      categoryAr: "زراعة الأسنان",
      services: [
        { name: "Single Dental Implant", nameAr: "زراعة سن واحد", price: "6,000-8,000 SAR" },
        { name: "Multiple Implants", nameAr: "زراعة عدة أسنان", price: "Contact for Quote" },
        { name: "All-on-4 Implants", nameAr: "زراعة الأسنان الكاملة", price: "Starting from 35,000 SAR" },
      ],
    },
    {
      category: "Root Canal Treatment",
      categoryAr: "علاج الجذور",
      services: [
        { name: "Root Canal (Single Root)", nameAr: "علاج جذور (جذر واحد)", price: "800-1,200 SAR" },
        { name: "Root Canal (Multiple Roots)", nameAr: "علاج جذور (عدة جذور)", price: "1,200-2,000 SAR" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 pt-20 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
          {t("priceList")}
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {language === "ar"
            ? "أسعارنا الشفافة لجميع خدمات الأسنان. الأسعار قابلة للتغيير وقد تختلف حسب الحالة"
            : "Our transparent pricing for all dental services. Prices are subject to change and may vary based on individual cases"}
        </p>

        <div className="space-y-8 max-w-5xl mx-auto">
          {priceCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {language === "ar" ? category.categoryAr : category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-2/3">
                        {language === "ar" ? "الخدمة" : "Service"}
                      </TableHead>
                      <TableHead className="text-right">
                        {language === "ar" ? "السعر" : "Price"}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.services.map((service, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">
                          {language === "ar" ? service.nameAr : service.name}
                        </TableCell>
                        <TableCell className="text-right">{service.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {language === "ar"
              ? "* الأسعار تقريبية وقد تختلف حسب الحالة الفردية. يرجى الاتصال بنا للحصول على عرض أسعار دقيق"
              : "* Prices are approximate and may vary based on individual cases. Please contact us for an accurate quote"}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PriceList;
