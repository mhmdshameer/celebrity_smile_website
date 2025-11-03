import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Star } from "lucide-react";

const PrivilegeCard = () => {
  const { t, language } = useLanguage();

  const benefits = [
    {
      title: "20% Discount",
      titleAr: "خصم 20%",
      description: "On all dental services",
      descriptionAr: "على جميع خدمات الأسنان",
    },
    {
      title: "Priority Booking",
      titleAr: "حجز الأولوية",
      description: "Get appointments faster",
      descriptionAr: "احصل على المواعيد بشكل أسرع",
    },
    {
      title: "Free Consultation",
      titleAr: "استشارة مجانية",
      description: "Annual dental checkup included",
      descriptionAr: "فحص أسنان سنوي مجاني",
    },
    {
      title: "Free Teeth Cleaning",
      titleAr: "تنظيف أسنان مجاني",
      description: "Twice a year",
      descriptionAr: "مرتين في السنة",
    },
    {
      title: "Family Coverage",
      titleAr: "تغطية عائلية",
      description: "Extend benefits to family members",
      descriptionAr: "مد المزايا لأفراد العائلة",
    },
    {
      title: "Emergency Care",
      titleAr: "رعاية طوارئ",
      description: "24/7 emergency support",
      descriptionAr: "دعم طوارئ على مدار الساعة",
    },
  ];

  const handleWhatsAppInquiry = () => {
    const phoneNumber = "966XXXXXXXXX";
    const message = encodeURIComponent(
      language === "ar"
        ? "مرحباً، أود الاستفسار عن بطاقة الامتياز"
        : "Hello, I would like to inquire about the Privilege Card"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Banner Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/privilegeBanner.png"
            alt={language === "ar" ? "بطاقة الامتياز" : "Privilege Card"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            {t("privilegeCard")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "ar"
              ? "احصل على امتيازات حصرية وخصومات على جميع خدماتنا مع بطاقة الامتياز الخاصة بنا"
              : "Get exclusive privileges and discounts on all our services with our Privilege Card"}
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center gap-2 mb-2">
                <Star className="w-6 h-6 text-primary fill-primary" />
                <CardTitle className="text-3xl">
                  {language === "ar" ? "عضوية VIP" : "VIP Membership"}
                </CardTitle>
                <Star className="w-6 h-6 text-primary fill-primary" />
              </div>
              <CardDescription className="text-lg">
                {language === "ar"
                  ? "1,500 ريال سعودي / سنوياً"
                  : "1,500 SAR / Annually"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">
                        {language === "ar" ? benefit.titleAr : benefit.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {language === "ar" ? benefit.descriptionAr : benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button onClick={handleWhatsAppInquiry} size="lg">
                  {language === "ar" ? "احصل على بطاقتك الآن" : "Get Your Card Now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "ar" ? "كيفية استخدام البطاقة" : "How to Use Your Card"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {language === "ar" ? "التسجيل" : "Register"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "ar"
                      ? "تواصل معنا للتسجيل والحصول على بطاقة الامتياز الخاصة بك"
                      : "Contact us to register and receive your privilege card"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {language === "ar" ? "احجز موعدك" : "Book Your Appointment"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "ar"
                      ? "احجز موعدك وأبلغنا برقم بطاقة الامتياز الخاصة بك"
                      : "Schedule your appointment and mention your privilege card number"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {language === "ar" ? "استمتع بالمزايا" : "Enjoy the Benefits"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "ar"
                      ? "استمتع بالخصومات والمزايا الحصرية عند كل زيارة"
                      : "Enjoy discounts and exclusive benefits with every visit"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivilegeCard;
