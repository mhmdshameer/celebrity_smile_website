import { useLanguage } from "@/contexts/LanguageContext";
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
import offer1 from "@/assets/offer-1.jpg";
import offer2 from "@/assets/offer-2.jpg";
import offer3 from "@/assets/offer-3.jpg";
import clinicHero from "@/assets/clinic-hero.jpg";

// Demo doctors data
const demoDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    nameAr: "د. سارة جونسون",
    specialty: "Cosmetic Dentistry",
    specialtyAr: "طب الأسنان التجميلي",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    nameAr: "د. مايكل تشين",
    specialty: "Orthodontics",
    specialtyAr: "تقويم الأسنان",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Dr. Emily Parker",
    nameAr: "د. إيميلي باركر",
    specialty: "Pediatric Dentistry",
    specialtyAr: "طب أسنان الأطفال",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
  },
];

const Index = () => {
  const { t } = useLanguage();

  const handleWhatsAppBooking = () => {
    const message = encodeURIComponent("Hello! I would like to book an appointment at Celebrity Smile Clinic.");
    window.open(`https://wa.me/1234567890?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section with Image Background */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
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
            <Button size="lg" onClick={handleWhatsAppBooking} className="text-lg">
              <Phone className="mr-2 h-5 w-5" />
              {t("bookAppointment")}
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">
              {t("aboutTitle")}
            </h2>
            <Card className="border-primary/20">
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
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-primary">Meet Our Doctors</h2>
            <Link to="/doctors">
              <Button variant="outline">
                View All Doctors <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {demoDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                  <p className="text-muted-foreground">{doctor.specialty}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-primary">Our Services</h2>
            <Link to="/services">
              <Button variant="outline">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="text-center p-6">
              <div className="text-4xl mb-4">🦷</div>
              <h3 className="text-lg font-semibold">General Dentistry</h3>
            </Card>
            <Card className="text-center p-6">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-lg font-semibold">Cosmetic Dentistry</h3>
            </Card>
            <Card className="text-center p-6">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-lg font-semibold">Orthodontics</h3>
            </Card>
            <Card className="text-center p-6">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-lg font-semibold">Dental Implants</h3>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Offers Carousel */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-primary">Special Offers</h2>
            <Link to="/offers">
              <Button variant="outline">
                View All Offers <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <img src={offer1} alt="Offer 1" className="w-full rounded-lg" />
                </CarouselItem>
                <CarouselItem>
                  <img src={offer2} alt="Offer 2" className="w-full rounded-lg" />
                </CarouselItem>
                <CarouselItem>
                  <img src={offer3} alt="Offer 3" className="w-full rounded-lg" />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-primary">Our Departments</h2>
            <Link to="/departments">
              <Button variant="outline">
                View All Departments <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
      </section>

      {/* Blog Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-primary">Latest From Our Blog</h2>
            <Link to="/blog">
              <Button variant="outline">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">5 Tips for Healthy Teeth</h3>
                <p className="text-muted-foreground mb-4">Learn the best practices for maintaining oral health...</p>
                <Button variant="link" className="p-0">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Benefits of Teeth Whitening</h3>
                <p className="text-muted-foreground mb-4">Discover how professional whitening can transform your smile...</p>
                <Button variant="link" className="p-0">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Understanding Dental Implants</h3>
                <p className="text-muted-foreground mb-4">Everything you need to know about dental implant procedures...</p>
                <Button variant="link" className="p-0">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-primary/5">
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
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
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
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
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
      </section>

      {/* Technology Section */}
      <section className="py-20">
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
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
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
      </section>

      <Footer />
    </div>
  );
};

export default Index;
