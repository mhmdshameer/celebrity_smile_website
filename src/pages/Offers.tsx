import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import offer1 from "@/assets/offer-1.jpg";
import offer2 from "@/assets/offer-2.jpg";
import offer3 from "@/assets/offer-3.jpg";

const Offers = () => {
  const { t, language } = useLanguage();

  const offers = [
    { id: 1, image: offer1, alt: "Special Offer 1" },
    { id: 2, image: offer2, alt: "Special Offer 2" },
    { id: 3, image: offer3, alt: "Special Offer 3" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
          {t("offers")}
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {language === "ar"
            ? "اكتشف عروضنا الخاصة وخصوماتنا الحصرية على خدمات الأسنان"
            : "Discover our special offers and exclusive discounts on dental services"}
        </p>

        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {offers.map((offer) => (
                <CarouselItem key={offer.id}>
                  <div className="p-4">
                    <img
                      src={offer.image}
                      alt={offer.alt}
                      className="w-full h-auto rounded-lg shadow-lg object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            {language === "ar"
              ? "للحصول على مزيد من المعلومات حول عروضنا، يرجى الاتصال بنا"
              : "For more information about our offers, please contact us"}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Offers;
