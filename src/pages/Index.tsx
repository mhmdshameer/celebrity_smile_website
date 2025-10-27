import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone,} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutSection from "@/components/index/AboutSection";
import TechnologySection from "@/components/index/TechnologySection";
import FeaturedDoctors from "@/components/index/FeaturedDoctors";
import ServicesPreview from "@/components/index/ServicesPreview";
import SpecialOffers from "@/components/index/SpecialOffers";
import StatisticsSection from "@/components/index/StatisticsSection";
import TestimonialsSection from "@/components/index/TestimonialsSection";
import WhyChooseUs from "@/components/index/WhyChooseUs";
import DepartmentsPreview from "@/components/index/DepartmentsPreview";
import BlogPreview from "@/components/index/BlogPreview";
import { Link } from "react-router-dom";
import { getDoctorsApi, type DoctorResponse } from "@/api/doctor";
import { getServicesApi, type ServiceResponse } from "@/api/service";
import { motion } from "framer-motion";
import AppointmentForm from "@/components/AppointmentForm";
import { getOffersApi, type OfferResponse } from "@/api/offer";
import { getAllBlogs, type BlogPost } from "@/api/blog";

// Real doctors will be fetched from API

const Index = () => {
  const { t, language } = useLanguage();
  const [doctors, setDoctors] = useState<DoctorResponse[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState<boolean>(false);
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(false);
  const [offers, setOffers] = useState<OfferResponse[]>([]);
  const [loadingOffers, setLoadingOffers] = useState<boolean>(false);
  const [appointmentFormOpen, setAppointmentFormOpen] = useState(false);
  // Blog posts state kept for future use
  const [, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoadingDoctors(true);
        const list = await getDoctorsApi();
        if (!mounted) return;
        setDoctors(list);
      } catch (e) {
        // silently ignore on home; could add toast if desired
      } finally {
        if (mounted) setLoadingDoctors(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadServices = async () => {
      try {
        setLoadingServices(true);
        const list = await getServicesApi();
        if (!mounted) return;
        setServices(list);
      } finally {
        if (mounted) setLoadingServices(false);
      }
    };
    loadServices();
    return () => {
      mounted = false;
    };
  }, []);

  const handleWhatsAppBooking = () => {
    setAppointmentFormOpen(true);
  };

  useEffect(() => {
    let mounted = true;
    
    const loadOffers = async () => {
      try {
        setLoadingOffers(true);
        const list = await getOffersApi();
        if (!mounted) return;
        setOffers(list);
      } catch (e) {
        console.error('Failed to load offers:', e);
      } finally {
        if (mounted) setLoadingOffers(false);
      }
    };

    const loadBlogs = async () => {
      try {
        const posts = await getAllBlogs();
        if (!mounted) return;
        // Store blog posts for potential future use
        const publishedPosts = posts
          .filter(post => post.published)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setBlogPosts(publishedPosts);
      } catch (e) {
        console.error('Failed to load blog posts:', e);
      }
    };

    loadOffers();
    loadBlogs();
    
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box'
      }}
    >
      <Navigation />
      
      {/* Hero Section with Video Background */}
      <section
        className="relative h-screen w-full flex items-center justify-center"
        style={{
          height: '100vh',
          width: '100vw',
          minHeight: '100vh'
        }}
      >
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            minHeight: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/promo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Brand Color Overlay */}
        <div className="absolute inset-0 bg-[#FD3DB5] opacity-20" />
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-left text-white">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                <span className="block">
                  {language === "ar" ? "مرحباً بك في" : "Welcome to"}
                </span>
                <span className="block text-primary">
                  {language === "ar" ? "مجمع ابتسامة المشاهير الطبي" : "Celebrity Smile Dental Clinic"}
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 drop-shadow-lg text-primary">
                {language === "ar"
                  ? "أفضل عيادة أسنان"
                  : "Your Best Choice Dental Clinic"
                }
              </h2>
              <p className="text-lg md:text-xl mb-8 drop-shadow-lg leading-relaxed">
                {language === "ar"
                  ? "استمتع برعاية أسنان عالمية المستوى مع أحدث التقنيات والمهنيين الرحيمين. نقدم خدمات أسنان شاملة مصممة خصيصاً لاحتياجاتك الفريدة، مما يضمن ابتسامات صحية وجميلة لجميع مرضانا."
                  : "Experience world-class dental care with cutting-edge technology and compassionate professionals. We provide comprehensive dental services tailored to your unique needs, ensuring healthy and beautiful smiles for all our patients."
                }
              </p>
              {!appointmentFormOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Button size="lg" onClick={handleWhatsAppBooking} className="text-lg px-8 py-3">
                    <Phone className="mr-2 h-5 w-5" />
                    {t("bookAppointment")}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
        
        {/* Form overlapping hero and about section */}
        {appointmentFormOpen && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full px-4">
            <AppointmentForm 
              onClose={() => setAppointmentFormOpen(false)}
              phoneNumber="1234567890"
            />
          </div>
        )}
      </section>

      {/* About Section */}
      <AboutSection
        t={t}
        className={appointmentFormOpen ? 'mt-60' : ''}
      />

      {/* Featured Doctors */}
      <FeaturedDoctors
        doctors={doctors}
        loadingDoctors={loadingDoctors}
        t={t}
      />

      {/* Services Preview */}
      <ServicesPreview
        services={services}
        loadingServices={loadingServices}
      />

      {/* Special Offers Carousel */}
      <SpecialOffers
        offers={offers}
        loadingOffers={loadingOffers}
        language={language}
      />

      {/* Departments Preview */}
      <DepartmentsPreview />

      {/* Blog Preview */}
      <BlogPreview />

      {/* Statistics Section */}
      <StatisticsSection t={t} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <TestimonialsSection t={t} />

      {/* Technology Section */}
      <TechnologySection t={t} />

      {/* Final CTA */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-primary/10 to-primary/5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">{t("readyToSmile")}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t("ctaDescription")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleWhatsAppBooking}>
                <Phone className="mr-2 h-5 w-5" />
                {t("bookAppointment")}
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  {t("contactUs")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

<Footer />
    </div>
  );
};

export default Index;
