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

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/pricelist.jpg"
            alt="Transparent Pricing"
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
              {language === "ar" ? "التسعير الشفاف" : "Transparent Pricing"}
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-primary">
              {language === "ar" ? "أسعار واضحة ومنافسة" : "Clear and Competitive Pricing"}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {language === "ar"
                ? "اكتشف أسعارنا الشفافة لجميع خدمات الأسنان. نحن ملتزمون بالتسعير العادل والتنافسي مع ضمان أعلى مستويات الجودة في جميع علاجاتنا."
                : "Discover our transparent pricing for all dental services. We're committed to fair and competitive pricing while ensuring the highest quality in all our treatments."
              }
            </p>
          </div>
        </div>
      </section>

      <div className="flex-1 container mx-auto px-4 pt-16 pb-16">
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
