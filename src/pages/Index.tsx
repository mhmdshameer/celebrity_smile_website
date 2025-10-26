import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, ArrowRight, Award, Users, TrendingUp, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import clinicHero from "@/assets/clinic-hero.jpg";
import { getDoctorsApi, type DoctorResponse } from "@/api/doctor";
import { getServicesApi, type ServiceResponse } from "@/api/service";
import { motion } from "framer-motion";
import AppointmentForm from "@/components/AppointmentForm";
import { getOffersApi, type OfferResponse } from "@/api/offer";
import { getAllBlogs, type BlogPost } from "@/api/blog";
import BlogCard from "@/components/BlogCard";

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
    <div className="min-h-screen flex flex-col overflow-x-hidden pt-16">
      <Navigation />
      
      {/* Hero Section with Image Background */}
      <section className="relative h-[600px] flex items-center justify-center overflow-visible">
        {/* Image Background */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${clinicHero})` }}
        />
        
        {/* Brand Color Overlay */}
        <div className="absolute inset-0 bg-[#FD3DB5] opacity-20" />
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Celebrity Smile Clinic
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
              Your smile is our priority. Experience world-class dental care with cutting-edge technology and compassionate professionals.
            </p>
            {!appointmentFormOpen && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Button size="lg" onClick={handleWhatsAppBooking} className="text-lg">
                  <Phone className="mr-2 h-5 w-5" />
                  {t("bookAppointment")}
                </Button>
              </motion.div>
            )}
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
      <motion.section 
        className={`py-20 transition-all duration-500 ${appointmentFormOpen ? 'mt-60' : ''}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">
              {t("aboutTitle")}
            </h2>
            <Card className="border-primary/20 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-full min-h-[320px]">
                  <img
                    src="/CLINIC PHOTO.jpeg"
                    alt="Celebrity Smile Clinic"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {t("aboutDescription")}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Our state-of-the-art facility is equipped with the latest dental technology, ensuring that every treatment is performed with precision and care. Our team of experienced dentists and specialists are dedicated to providing personalized care tailored to your unique needs.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    From routine check-ups to advanced cosmetic procedures, we offer a comprehensive range of dental services designed to keep your smile healthy and beautiful. Trust Celebrity Smile Clinic for all your dental care needs.
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Featured Doctors */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className={`text-4xl font-bold text-primary ${language === "ar" ? "pr-5" : "pl-5"}`}>Meet Our Doctors</h2>
              <Link to="/doctors">
                <Button variant="default">
                  View All Doctors <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loadingDoctors && (
                <p className="col-span-full text-center text-muted-foreground">{t("loading")}</p>
              )}
              {!loadingDoctors && doctors.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground">No doctors to show yet.</p>
              )}
              {!loadingDoctors && doctors.slice(0, 6).map((d) => {
                const displayName = language === "ar" ? d.nameAr : d.name;
                const displaySpecsArr = language === "ar" ? (d.specialtiesAr ?? []) : (d.specialties ?? []);
                const displaySpec = displaySpecsArr[0] ?? "";
                const imgSrc = d.image?.url || "https://via.placeholder.com/400x400?text=Doctor";
                return (
                  <Card key={d._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={imgSrc}
                        alt={displayName}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-semibold mb-2">{displayName}</h3>
                      {displaySpec && <p className="text-muted-foreground">{displaySpec}</p>}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Preview */}
      <motion.section 
        className="py-20 bg-muted/50"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className={`text-4xl font-bold text-primary ${language === "ar" ? "pr-5" : "pl-5"}`}>Our Services</h2>
              <Link to="/services">
                <Button variant="default">
                  View All Services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative overflow-hidden">
            {loadingServices && (
              <Card className="p-6 text-center"><CardContent className="p-0">{t("loading")}</CardContent></Card>
            )}
            {!loadingServices && services.length > 0 && (
              <div className="flex gap-4 w-max"
                   style={{
                     animation: `scroll 30s linear infinite`,
                     animationDirection: (language === "ar" ? "reverse" : "normal") as "normal" | "reverse",
                   }}>
                {[...services, ...services].slice(0, Math.max(services.length * 2, 8)).map((s) => {
                  const title = language === "ar" ? s.serviceAr : s.service;
                  const desc = language === "ar" ? s.descriptionAr : s.description;
                  const initial = title?.trim()?.charAt(0) || "";
                  return (
                    <Card key={`${s._id}-${title}`}
                          className="p-5 flex-none w-[280px] sm:w-[320px] border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-200 group bg-background/50 backdrop-blur-sm">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                          {initial}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold mb-1">{title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">{desc}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
            <style>{`
              @keyframes scroll {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
            `}</style>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Special Offers Carousel */}
      <motion.section 
        className="py-20 bg-muted/20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className={`text-4xl font-bold text-primary ${language === "ar" ? "pr-5" : "pl-5"}`}>
                Special Offers
              </h2>
              <Link to="/offers">
                <Button variant="default">
                  View All Offers <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            {loadingOffers ? (
              <div className="text-center py-12">Loading offers...</div>
            ) : offers.length > 0 ? (
              <Carousel 
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {offers.map((offer) => (
                    <CarouselItem key={offer._id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2">
                        <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                          <div className="h-80 bg-muted/50 flex items-center justify-center overflow-hidden p-2">
                            {offer.offerPoster?.url ? (
                              <img 
                                src={offer.offerPoster.url} 
                                alt="Special Offer"
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <div className="text-muted-foreground">No image available</div>
                            )}
                          </div>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:left-4" />
                <CarouselNext className="right-2 md:right-4" />
              </Carousel>
            ) : (
              <div className="text-center py-12 text-muted-foreground">No special offers available at the moment.</div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Departments Preview */}
      <motion.section 
        className="py-20 bg-muted/50"
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className={`text-4xl font-bold text-primary ${language === "ar" ? "pr-5" : "pl-5"}`}>Our Departments</h2>
              <Link to="/departments">
                <Button variant="default">
                  View All Departments <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Emergency Care</h3>
                <p className="text-muted-foreground">24/7 emergency dental services for urgent care needs.</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Surgical Department</h3>
                <p className="text-muted-foreground">Advanced surgical procedures with expert care.</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Preventive Care</h3>
                <p className="text-muted-foreground">Regular check-ups and preventive treatments.</p>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Blog Preview */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className={`text-4xl font-bold text-primary ${language === "ar" ? "pr-5" : "pl-5"}`}>Latest From Our Blog</h2>
              <Link to="/blog">
                <Button variant="default">
                  View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <BlogCard limit={3} showViewAll={false} />
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section 
        className="py-20 bg-primary/5"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground">{t("yearsExperience")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <p className="text-muted-foreground">{t("happyPatients")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <p className="text-muted-foreground">{t("expertDoctors")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">99%</div>
              <p className="text-muted-foreground">{t("successRate")}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🦷</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Care</h3>
                <p className="text-muted-foreground">
                  Highly qualified dentists with years of experience in all aspects of dental care.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Modern Technology</h3>
                <p className="text-muted-foreground">
                  State-of-the-art equipment and advanced techniques for optimal results.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">❤️</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Patient Comfort</h3>
                <p className="text-muted-foreground">
                  A welcoming environment where your comfort and satisfaction are our top priorities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="py-20 bg-muted/50"
        initial={{ opacity: 0, rotateY: 90 }}
        whileInView={{ opacity: 1, rotateY: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t("testimonials")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Exceptional service! The team at Celebrity Smile Clinic made me feel comfortable throughout my treatment. My smile has never looked better!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-lg font-semibold text-primary">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-sm text-muted-foreground">Verified Patient</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Professional, caring, and skilled. I had dental implants done and the results exceeded my expectations. Highly recommend!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-lg font-semibold text-primary">JA</span>
                  </div>
                  <div>
                    <p className="font-semibold">James Anderson</p>
                    <p className="text-sm text-muted-foreground">Verified Patient</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Best dental experience I've ever had. The modern facilities and friendly staff make every visit pleasant. Thank you!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-lg font-semibold text-primary">LW</span>
                  </div>
                  <div>
                    <p className="font-semibold">Lisa Wang</p>
                    <p className="text-sm text-muted-foreground">Verified Patient</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Technology Section */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t("ourTechnology")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("techDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center p-6">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-lg font-semibold mb-2">3D Imaging</h3>
              <p className="text-sm text-muted-foreground">Advanced diagnostic precision</p>
            </Card>
            <Card className="text-center p-6">
              <div className="text-4xl mb-4">💉</div>
              <h3 className="text-lg font-semibold mb-2">Laser Dentistry</h3>
              <p className="text-sm text-muted-foreground">Minimally invasive treatments</p>
            </Card>
            <Card className="text-center p-6">
              <div className="text-4xl mb-4">🖥️</div>
              <h3 className="text-lg font-semibold mb-2">Digital Smile Design</h3>
              <p className="text-sm text-muted-foreground">Preview your new smile</p>
            </Card>
            <Card className="text-center p-6">
              <div className="text-4xl mb-4">🦾</div>
              <h3 className="text-lg font-semibold mb-2">CAD/CAM Technology</h3>
              <p className="text-sm text-muted-foreground">Same-day restorations</p>
            </Card>
          </div>
        </div>
      </motion.section>

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
