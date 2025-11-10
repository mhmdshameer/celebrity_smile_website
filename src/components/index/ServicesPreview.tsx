import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getServicesApi, type ServiceResponse } from "@/api/service";

const ServicesPreview = () => {
  const { language } = useLanguage();
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const list = await getServicesApi();
        if (mounted) setServices(list);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const title =
    language === "ar"
      ? "خدماتنا المتميزة"
      : "Our Specialized Dental Services";

  const subtitle =
    language === "ar"
      ? "نقدم مجموعة متكاملة من خدمات طب الأسنان لضمان ابتسامتك المثالية."
      : "We offer a comprehensive range of dental services designed to give you the perfect smile.";

  return (
    <motion.section
      className={`py-20 md:py-24 bg-background ${language === "ar" ? 'rtl' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      dir={language === "ar" ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-transparent mb-4 leading-[1.2] py-2
            ${language === "ar" ? 'font-cairo text-center' : ''}`}>
            {title}
          </h2>
          <p className={`text-muted-foreground text-base sm:text-lg leading-normal mt-2 ${
            language === "ar" ? 'text-center' : ''
          }`}>
            {subtitle}
          </p>
        </div>

        {/* Services showcase */}
        <div className="relative overflow-hidden">
          {loading ? (
            <div className="text-center text-muted-foreground text-lg py-10">
              {language === "ar" ? "جاري التحميل..." : "Loading..."}
            </div>
          ) : services.length > 0 ? (
            <div
              className="flex gap-6 w-max"
              style={{
                animation: `scroll-${language === 'ar' ? 'rtl' : 'ltr'} 80s linear infinite`,
                direction: language === 'ar' ? 'rtl' : 'ltr'
              }}
            >
              {[...services, ...services].slice(0, 10).map((s) => {
                const title = language === "ar" ? s.serviceAr : s.service;
                const desc =
                  language === "ar" ? s.descriptionAr : s.description;
                const img =
                  s.serviceImage?.url ||
                  "https://via.placeholder.com/600x400?text=Dental+Service";

                return (
                  <motion.div
                    key={`${s._id}-${title}`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="relative flex-none w-[320px] md:w-[400px] h-[300px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                      <img
                        src={img}
                        alt={title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <h3 className={`text-xl font-semibold mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {title}
                        </h3>
                        <p className={`text-sm opacity-90 line-clamp-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {desc}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-10">
              {language === "ar"
                ? "لا توجد خدمات متاحة حاليًا."
                : "No services available yet."}
            </div>
          )}

          {/* scroll animation */}
          <style>{`
            @keyframes scroll-ltr {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes scroll-rtl {
              0% { transform: translateX(0); }
              100% { transform: translateX(50%); }
            }
          `}</style>
        </div>

        {/* View All Button */}
        <div
          className={`flex justify-center mt-16 ${
            language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <Link to="/services">
            <Button size="lg" className="text-lg px-8 py-5">
              {language === "ar" ? "عرض جميع الخدمات" : "View All Services"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesPreview;
