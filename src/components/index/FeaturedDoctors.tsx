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

  // Slider settings with improved responsive breakpoints
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px',
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px',
          arrows: false,
        },
      },
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
      className="py-16 md:py-24 bg-background overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div
          className={`max-w-3xl mx-auto mb-10 md:mb-16 px-4 ${
            language === "ar" ? "text-right" : "text-center"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent mb-3 md:mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">{subtitle}</p>
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
          <div className="px-0 md:px-2 mt-8">
            <Slider {...settings} className="doctor-slider">
              {doctors.map((d) => {
                const name = language === "ar" ? d.nameAr : d.name;
                const specs = language === "ar" ? d.specialtiesAr : d.specialties;
                const specialization = specs?.[0] ?? "";
                const img = d.image?.url || "https://via.placeholder.com/400x400?text=Doctor";

                return (
                <motion.div
                  key={d._id}
                  className="px-3 sm:px-4 py-4 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="h-full flex flex-col items-center group">
                    {/* Doctor image */}
                    <div className="relative w-full max-w-[280px] h-[320px] mb-6 overflow-hidden">
                      <img
                        src={img}
                        alt={name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Doctor info */}
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                        {name}
                      </h3>
                      {specialization && (
                        <p className="text-base text-muted-foreground font-medium">{specialization}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </Slider>
        </div>
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
