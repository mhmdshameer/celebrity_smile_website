import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { getOffersApi, type OfferResponse } from "@/api/offer";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trackBookAppointment, trackCallNow } from "@/utils/analytics";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width="24"
    height="24"
  >
    <path d="M20.52 3.48A11.87 11.87 0 0 0 12 0C5.37 0 0 5.37 0 12a11.86 11.86 0 0 0 1.62 5.96L0 24l6.24-1.63A11.87 11.87 0 0 0 12 24c6.63 0 12-5.37 12-12a11.87 11.87 0 0 0-3.48-8.52ZM12 22a9.87 9.87 0 0 1-5.08-1.39l-.36-.21-3.7.97.99-3.61-.23-.37A9.88 9.88 0 0 1 2 12C2 6.49 6.49 2 12 2a9.9 9.9 0 0 1 7.06 2.94A9.9 9.9 0 0 1 22 12c0 5.51-4.49 10-10 10Zm5.05-7.36c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.33-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.05-.22-.53-.44-.46-.62-.47h-.53c-.18 0-.48.07-.73.34s-.96.94-.96 2.28.99 2.64 1.13 2.82c.14.18 1.94 2.96 4.7 4.05 2.77 1.09 2.77.73 3.27.69.5-.04 1.61-.65 1.84-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32Z" />
  </svg>
);

const Offers = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [offers, setOffers] = useState<OfferResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffersApi();
        setOffers(data);
      } catch (error) {
        toast({ title: "Failed to load offers", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, [toast]);

  const isOfferExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBookAppointment = () => {
    trackBookAppointment('offers');
    // WhatsApp number and message
    const phoneNumber = "966556005567";
    const message = encodeURIComponent(
      language === "ar"
        ? "مرحباً، أود حجز موعد للاستفادة من العروض"
        : "Hello, I would like to book an appointment for the offers"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleCall = () => {
    trackCallNow('offers', '0122720100');
    window.location.href = "tel:0122720100";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Banner Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/offerbanner.png"
            alt={language === "ar" ? "عروض حصرية" : "Exclusive Offers"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/30" />
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
          {language === "ar" ? "عروض حصرية" : "Exclusive Offers"}
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {language === "ar"
            ? "اكتشف عروضنا الخاصة وخصوماتنا الحصرية على خدمات الأسنان"
            : "Discover our special offers and exclusive discounts on dental services"}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg aspect-[3/4] mb-4" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              {language === "ar"
                ? "لا توجد عروض متاحة حاليًا"
                : "No offers available at the moment"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {offers.map((offer) => {
              const expired = isOfferExpired(offer.offerEndDate);
              const isActive = activeCardId === offer._id;

              return (
                <div
                  key={offer._id}
                  onClick={() => setActiveCardId(isActive ? null : offer._id)}
                  className={`group relative overflow-hidden rounded-lg border bg-card shadow-lg transition-all hover:shadow-xl cursor-pointer ${expired ? "opacity-60" : ""
                    }`}
                >
                  {offer.offerPoster?.url && (
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={offer.offerPoster.url}
                        alt="Special Offer"
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Hover Overlay with Buttons */}
                  {!expired && (
                    <div
                      className={`absolute inset-0 bg-black/40 transition-all duration-300 flex items-end justify-center gap-4 p-4
                        ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                      `}
                    >
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookAppointment();
                        }}
                        className={`flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white gap-2 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shadow-lg
                          ${isActive ? "translate-y-0 opacity-100" : "translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 delay-75"}
                        `}
                        size="sm"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        {language === "ar" ? "احجز" : "Book"}
                      </Button>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCall();
                        }}
                        className={`flex-1 bg-primary hover:bg-primary/90 gap-2 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shadow-lg
                          ${isActive ? "translate-y-0 opacity-100 delay-100" : "translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 delay-100"}
                        `}
                        size="sm"
                        variant="secondary"
                      >
                        <Phone className="h-4 w-4" />
                        {language === "ar" ? "اتصل" : "Call"}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

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
