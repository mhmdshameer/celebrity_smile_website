import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const { t } = useLanguage();

  const handleWhatsAppBooking = () => {
    const message = encodeURIComponent("Hello! I would like to book an appointment at Celebrity Smile Clinic.");
    window.open(`https://wa.me/1234567890?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Celebrity Smile Clinic
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your smile is our priority. Experience world-class dental care with cutting-edge technology and compassionate professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleWhatsAppBooking} className="text-lg">
                <Phone className="mr-2 h-5 w-5" />
                {t("bookAppointment")}
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                {t("learnMore")}
              </Button>
            </div>
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

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/50">
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

      <Footer />
    </div>
  );
};

export default Index;
