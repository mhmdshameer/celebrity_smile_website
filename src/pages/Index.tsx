import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { motion } from "framer-motion";
import AppointmentForm from "@/components/AppointmentForm";
import ClinicGallery from "@/components/index/ClinicGallery";

// Real doctors will be fetched from API

const Index = () => {
  const { t, language } = useLanguage();
  const [appointmentFormOpen, setAppointmentFormOpen] = useState(false);
  const [appointmentFormBtmOpen, setAppointmentFormBtmOpen] = useState(false);

  const handleWhatsAppBooking = () => {
    
    // Open the appointment form after a short delay to ensure smooth scrolling
    setTimeout(() => {
      setAppointmentFormOpen(true);
    }, 300);
  };

  const handleWhatsAppBookingBtm = () => {
    setAppointmentFormBtmOpen(true);
  };

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
                  ? "استمتع برعاية أسنان عالمية المستوى مع أحدث التقنيات والمهنيين. نقدم خدمات أسنان شاملة مصممة خصيصاً لاحتياجاتك الفريدة، مما يضمن ابتسامات صحية وجميلة لجميع مرضانا."
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
                     <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.52 3.48A11.87 11.87 0 0 0 12 0C5.37 0 0 5.37 0 12a11.86 11.86 0 0 0 1.62 5.96L0 24l6.24-1.63A11.87 11.87 0 0 0 12 24c6.63 0 12-5.37 12-12a11.87 11.87 0 0 0-3.48-8.52ZM12 22a9.87 9.87 0 0 1-5.08-1.39l-.36-.21-3.7.97.99-3.61-.23-.37A9.88 9.88 0 0 1 2 12C2 6.49 6.49 2 12 2a9.9 9.9 0 0 1 7.06 2.94A9.9 9.9 0 0 1 22 12c0 5.51-4.49 10-10 10Zm5.05-7.36c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.33-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.05-.22-.53-.44-.46-.62-.47h-.53c-.18 0-.48.07-.73.34s-.96.94-.96 2.28.99 2.64 1.13 2.82c.14.18 1.94 2.96 4.7 4.05 2.77 1.09 2.77.73 3.27.69.5-.04 1.61-.65 1.84-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32Z" />
                </svg>
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
              phoneNumber="966556005567"
            />
          </div>
        )}
      </section>

         {/* Statistics Section */}
      <StatisticsSection 
      t={t}
       className={appointmentFormOpen ? 'mt-60' : ''}
      />

      {/* About Section */}
      <AboutSection
      />

        {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Featured Doctors */}
      <FeaturedDoctors />

      {/* Services Preview */}
      <ServicesPreview />

      {/* Special Offers Carousel */}
      <SpecialOffers />

      {/* Departments Preview */}
      <DepartmentsPreview />

      {/* Blog Preview */}
      <BlogPreview />

      {/* Testimonials */}
      <TestimonialsSection t={t} />

      {/* Clinic Gallery */}
      <ClinicGallery />

      {/* Technology Section */}
      <TechnologySection t={t} />

      {/* Bottom CTA Section */}
      <div className="relative -mb-20">
        <motion.section 
          className="relative py-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 -z-10">
            <img 
              src="/bg.jpg" 
              alt="" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-primary mb-4">{t("readyToSmile")}</h2>
              <p className="text-lg text-primary mb-8">{t("ctaDescription")}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleWhatsAppBookingBtm}>
                   <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.52 3.48A11.87 11.87 0 0 0 12 0C5.37 0 0 5.37 0 12a11.86 11.86 0 0 0 1.62 5.96L0 24l6.24-1.63A11.87 11.87 0 0 0 12 24c6.63 0 12-5.37 12-12a11.87 11.87 0 0 0-3.48-8.52ZM12 22a9.87 9.87 0 0 1-5.08-1.39l-.36-.21-3.7.97.99-3.61-.23-.37A9.88 9.88 0 0 1 2 12C2 6.49 6.49 2 12 2a9.9 9.9 0 0 1 7.06 2.94A9.9 9.9 0 0 1 22 12c0 5.51-4.49 10-10 10Zm5.05-7.36c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.33-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.05-.22-.53-.44-.46-.62-.47h-.53c-.18 0-.48.07-.73.34s-.96.94-.96 2.28.99 2.64 1.13 2.82c.14.18 1.94 2.96 4.7 4.05 2.77 1.09 2.77.73 3.27.69.5-.04 1.61-.65 1.84-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32Z" />
                </svg>
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

        {/* Bottom Appointment Form - Overlapping */}
        {appointmentFormBtmOpen && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full px-4">
            <AppointmentForm 
              onClose={() => setAppointmentFormBtmOpen(false)}
              phoneNumber="966556005567"
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
