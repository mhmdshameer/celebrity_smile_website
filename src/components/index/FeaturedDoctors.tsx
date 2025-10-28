import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDoctorsApi, type DoctorResponse } from "@/api/doctor";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedDoctors = () => {
  const { language } = useLanguage();
  const [doctors, setDoctors] = useState<DoctorResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const list = await getDoctorsApi();
        if (mounted) setDoctors(list);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const title =
    language === "ar"
      ? "تعرف على فريق أطباء الأسنان المحترفين لدينا"
      : "Meet Our Team of Professional Dentists";

  const subtitle =
    language === "ar"
      ? "يضم فريقنا نخبة من أطباء الأسنان ذوي الخبرة العالية، المكرسين لتقديم أفضل رعاية لابتسامتك."
      : "Our team of highly experienced dentists is dedicated to providing exceptional care and creating your perfect smile.";

  return (
    <motion.section
      className="py-16 bg-background"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 ${
            language === "ar" ? "text-right" : "text-center"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-transparent mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground font-semibold text-lg">{subtitle}</p>
        </div>

        {/* Slider */}
        {loading ? (
          <p className="text-center text-muted-foreground">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        ) : doctors.length === 0 ? (
          <p className="text-center text-muted-foreground">
            {language === "ar" ? "لا يوجد أطباء لعرضهم بعد." : "No doctors to show yet."}
          </p>
        ) : (
          <Slider {...settings}>
            {doctors.map((d) => {
              const name = language === "ar" ? d.nameAr : d.name;
              const specs = language === "ar" ? d.specialtiesAr : d.specialties;
              const specialization = specs?.[0] ?? "";
              const img = d.image?.url || "https://via.placeholder.com/400x400?text=Doctor";

              return (
                <motion.div
                  key={d._id}
                  className="px-4"
                  initial={{ opacity: 0, x: language === "ar" ? 100 : -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 text-center border border-gray-100">
                    <div className="overflow-hidden">
                      <img
                        src={img}
                        alt={name}
                        className="w-full h-[380px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-pink-500">{name}</h3>
                      {specialization && (
                        <p className="text-muted-foreground font-semibold text-pink-500">{specialization}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </Slider>
        )}

        {/* Button */}
        <div
          className={`flex justify-center mt-12 ${
            language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <Link to="/doctors">
            <Button className="text-lg px-6 py-5">
              {language === "ar" ? "عرض جميع الأطباء" : "View All Doctors"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedDoctors;
