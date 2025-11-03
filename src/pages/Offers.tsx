import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { getOffersApi, type OfferResponse } from "@/api/offer";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Offers = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [offers, setOffers] = useState<OfferResponse[]>([]);
  const [loading, setLoading] = useState(true);

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
              return (
                <div
                  key={offer._id}
                  className={`group relative overflow-hidden rounded-lg border bg-card shadow-lg transition-all hover:shadow-xl ${
                    expired ? "opacity-60" : ""
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
                  {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {language === "ar" ? "صالح حتى" : "Valid until"}
                        </span>
                      </div>
                      {expired && (
                        <Badge variant="destructive" className="text-xs">
                          {language === "ar" ? "منتهي" : "Expired"}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-white">
                      {formatDate(offer.offerEndDate)}
                    </p>
                  </div> */}
                  {!expired && (
                    <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/5" />
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
