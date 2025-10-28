import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getOffersApi, type OfferResponse } from "@/api/offer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SpecialOffers = () => {
  const { language } = useLanguage();
  const [offers, setOffers] = useState<OfferResponse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadOffers = async () => {
      try {
        setLoading(true);
        const list = await getOffersApi();
        if (mounted) setOffers(list);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadOffers();
    return () => {
      mounted = false;
    };
  }, []);

  // Change every 6 seconds instead of 3
  useEffect(() => {
    if (offers.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [offers]);

  const currentOffer = offers[currentIndex];

  // Text translations
  const title =
    language === "ar"
      ? "اكتشف العروض الحصرية التي تجعل ابتسامتك أكثر إشراقًا وصحة"
      : "Discover Exclusive Dental Offers That Make Your Smile Brighter and Healthier";

  const description =
    language === "ar"
      ? "نقدم لمرضانا أفضل الخصومات والعروض على العلاجات السنية. من تبييض الأسنان إلى تجميل الابتسامة، نقدم لك باقات خاصة مصممة خصيصًا لك. لمعرفة المزيد من العروض، تفضل بزيارة صفحة العروض."
      : "We’re offering our patients the best discounts and treatment packages for their dental care. From teeth whitening to cosmetic dentistry, we bring you great deals designed just for you. To see more offers, please visit our offers page.";

  const isArabic = language === "ar";

  return (
    <motion.section
      className="py-24 bg-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-12 ${
          isArabic ? "md:flex-row-reverse text-right" : ""
        }`}
      >
        {/* Text Section */}
        <div className={`${isArabic ? "order-2" : "order-1"}`}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-primary leading-snug"
            initial={{ opacity: 0, x: isArabic ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg mb-8 max-w-xl"
            initial={{ opacity: 0, x: isArabic ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            {description}
          </motion.p>

          <Link to="/offers" className={`${isArabic ? "flex justify-end" : ""}`}>
            <Button size="lg">
              {isArabic ? "عرض جميع العروض" : "View All Offers"}
              <ArrowRight
                className={`ml-2 h-5 w-5 transition-transform ${
                  isArabic ? "rotate-180 mr-2 ml-0" : ""
                }`}
              />
            </Button>
          </Link>
        </div>

        {/* Image Section */}
        <div
          className={`relative w-full h-[380px] md:h-[460px] rounded-2xl overflow-hidden shadow-lg border border-border/30 bg-muted/20 ${
            isArabic ? "order-1" : "order-2"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {isArabic ? "جارٍ تحميل العروض..." : "Loading offers..."}
            </div>
          ) : offers.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={currentOffer?._id}
                src={currentOffer?.offerPoster?.url || "https://via.placeholder.com/800x600"}
                alt={isArabic ? "عرض خاص" : "Special Offer"}
                className="absolute inset-0 w-full h-full object-contain bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              />
            </AnimatePresence>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {isArabic ? "لا توجد عروض متاحة حاليًا" : "No offers available."}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default SpecialOffers;
