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

  // Enhanced slider settings with better responsive breakpoints
  const settings = {
    dots: true,
    speed: 600,
    slidesToShow: 1, // Default to 1 slide (mobile first)
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    centerMode: false,
    centerPadding: '20px',
    swipeToSlide: true,
    draggable: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // Desktop
        settings: {
          slidesToShow: Math.min(3, doctors.length),
          slidesToScroll: 1,
          arrows: true,
          centerMode: false,
          infinite: doctors.length > 3,
          dots: true
        }
      },
      {
        breakpoint: 768, // Tablet
        settings: {
          slidesToShow: Math.min(2, doctors.length),
          slidesToScroll: 1,
          arrows: true,
          centerMode: false,
          infinite: doctors.length > 2,
          dots: true
        }
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px',
          arrows: false,
          dots: doctors.length > 1,
          infinite: doctors.length > 1
        }
      }
    ]
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
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-background/80 overflow-hidden px-2 sm:px-4"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div
          className={`max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4 ${
            language === "ar" ? "text-right" : "text-center"
          }`}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-xs xs:text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
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
          <div className="px-0 sm:px-1 md:px-2 mt-6 sm:mt-8">
            <Slider {...settings} className="doctor-slider">
              {doctors.map((d) => {
                const name = language === "ar" ? d.nameAr : d.name;
                const specs = language === "ar" ? d.specialtiesAr : d.specialties;
                const specialization = specs?.[0] ?? "";
                const img = d.image?.url || "https://via.placeholder.com/400x400?text=Doctor";

                return (
                <motion.div
                  key={d._id}
                  className="px-2 sm:px-3 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="h-full flex flex-col items-center group pb-2">
                    {/* Doctor image with background */}
                    <div className="relative w-full max-w-[240px] xs:max-w-[280px] h-[280px] xs:h-[320px] mb-4 sm:mb-6 flex items-center justify-center mx-auto">
                      {/* Background image container */}
                      <div className="absolute inset-0 top-6 sm:top-8 w-full h-full bg-no-repeat bg-center bg-contain" 
                           style={{ backgroundImage: 'url(/doctor_bg.png)' }}>
                      </div>
                      
                      {/* Doctor image */}
                      <div className="relative w-full h-full flex items-end justify-center border-b-4 border-pink-100 dark:border-pink-900/50">
                        <img
                          src={img}
                          alt={name}
                          className="h-[88%] sm:h-[90%] w-auto object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                          style={{ 
                            filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))',
                            maxWidth: '100%',
                            height: 'auto'
                          }}
                          loading="lazy"
                          width="280"
                          height="320"
                        />
                      </div>
                    </div>
                    
                    {/* Doctor info */}
                    <div className="text-center space-y-1 px-2 w-full">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground transition-colors group-hover:text-pink-600 line-clamp-2" style={{ minHeight: '3rem' }}>
                        {name}
                      </h3>
                      {specialization && (
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium line-clamp-2" style={{ minHeight: '1.5rem' }}>
                          {specialization}
                        </p>
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
        <div className={`flex justify-center mt-6 sm:mt-8 ${language === "ar" ? "flex-row-reverse" : ""}`}>
          <Link to="/doctors" className="inline-block">
            <Button size="lg" className="text-lg px-8 py-5">
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
