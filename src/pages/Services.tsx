import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { getServicesApi, type ServiceResponse } from "@/api/service";
import { motion } from "framer-motion";

const Services = () => {
  const { language } = useLanguage();
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

      {/* 🦷 Hero Section */}
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

      {/* 💎 Intro Section */}
      <section className="relative bg-background py-16 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
            {language === "ar"
              ? "التميز في الرعاية الأسنان"
              : "Excellence in Dental Care"}
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-primary">
            {language === "ar"
              ? "تقديم خدمات رعاية أسنان استثنائية"
              : "Providing Exceptional Dental Care Services"}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            {language === "ar"
              ? "استمتع بمجموعة شاملة من خدمات طب الأسنان المصممة لتلبية جميع احتياجاتك. من الفحوصات الروتينية إلى العلاجات المتقدمة، نحن ملتزمون بتقديم أعلى مستويات الرعاية والاهتمام الشخصي."
              : "Discover our comprehensive range of dental services designed to meet all your needs. From routine check-ups to advanced treatments, we're committed to providing the highest level of care and personal attention."}
          </p>
        </div>
      </section>

      {/* 🪥 Services List */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 space-y-24">
          {loading && (
            <p className="text-center text-muted-foreground text-lg">
              Loading services...
            </p>
          )}

          {!loading &&
            services.map((s, index) => {
              const name = language === "ar" ? s.serviceAr : s.service;
              const desc = language === "ar" ? s.descriptionAr : s.description;

              // Flip pattern based on language (RTL/LTR)
              const isReversed =
                language === "ar" ? index % 2 === 0 : index % 2 !== 0;

              return (
                <motion.div
                  key={s._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col md:flex-row justify-between items-center gap-10 ${
                    isReversed ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`w-full md:w-1/2 flex ${
                      isReversed ? "justify-end" : "justify-start"
                    }`}
                  >
                    <img
                      src={s.serviceImage?.url}
                      alt={name}
                      className="w-[400px] h-[400px] object-cover rounded-2xl shadow-lg border"
                    />
                  </div>

                  {/* Text */}
                  <div
                    className={`w-full md:w-1/2 flex flex-col ${
                      language === "ar"
                        ? "items-end text-right"
                        : "items-start text-left"
                    }`}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                      {name}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-[500px]">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Services;
