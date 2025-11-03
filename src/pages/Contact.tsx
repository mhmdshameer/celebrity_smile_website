import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Map from "@/components/Map";

const Contact = () => {
  const { t, language } = useLanguage();

  const handleWhatsAppContact = () => {
    const phoneNumber = "966556005567"; // Correct WhatsApp number from Footer
    const message = encodeURIComponent(
      language === "ar"
        ? "مرحباً، أود الاستفسار عن خدماتكم"
        : "Hello, I would like to inquire about your services"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: language === "ar" ? "تم إرسال الرسالة" : "Message Sent",
      description: language === "ar" 
        ? "شكراً لتواصلك معنا. سنرد عليك قريباً"
        : "Thank you for contacting us. We'll get back to you soon.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/contact.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#FD3DB5] opacity-20" />
        </div>
      </section>

      {/* Content Section */}
      <section className="relative bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
              {language === "ar" ? "تواصل معنا" : "Contact Us"}
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-primary">
              {language === "ar" ? "نحن هنا لمساعدتك" : "We're Here to Help"}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {language === "ar"
                ? "تواصل معنا للحصول على استشارة أو حجز موعد. فريقنا المتخصص جاهز للإجابة على جميع أسئلتك وتقديم أفضل الخدمات الطبية الأسنان."
                : "Get in touch with us for a consultation or to book an appointment. Our specialized team is ready to answer all your questions and provide the best dental healthcare services."
              }
            </p>
          </div>
        </div>
      </section>

      <div className="flex-1 pt-16 pb-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "ar" ? "أرسل لنا رسالة" : "Send us a message"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input 
                      id="name" 
                      placeholder={language === "ar" ? "الاسم" : "Name"} 
                      required 
                    />
                  </div>
                  <div>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={language === "ar" ? "البريد الإلكتروني" : "Email"} 
                      required 
                    />
                  </div>
                  <div>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder={language === "ar" ? "رقم الهاتف" : "Phone"} 
                      required 
                    />
                  </div>
                  <div>
                    <Textarea 
                      id="message" 
                      placeholder={language === "ar" ? "الرسالة" : "Message"} 
                      rows={4} 
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {language === "ar" ? "إرسال" : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "ar" ? "معلومات التواصل" : "Contact Information"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">
                        {language === "ar" ? "العنوان" : "Address"}
                      </p>
                      <p className="text-muted-foreground">
                        {language === "ar"
                          ? "3247 شارع العجواد، الرابية، جدة 23462، المملكة العربية السعودية"
                          : "3247 Al Ajawad St, Al Rabi', Jeddah 23462, Saudi Arabia"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">
                        {language === "ar" ? "الهاتف" : "Phone"}
                      </p>
                      <p className="text-muted-foreground" dir="ltr">+966 55 600 5567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">
                        {language === "ar" ? "البريد الإلكتروني" : "Email"}
                      </p>
                      <p className="text-muted-foreground">ce.sm.dental.1@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">
                        {language === "ar" ? "ساعات العمل" : "Working Hours"}
                      </p>
                      <p className="text-muted-foreground">
                        {language === "ar" 
                          ? "السبت - الخميس: 9 صباحاً - 9 مساءً"
                          : "Sat - Thu: 9 AM - 9 PM"}
                      </p>
                      <p className="text-muted-foreground">
                        {language === "ar" 
                          ? "الجمعة: مغلق"
                          : "Friday: Closed"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleWhatsAppContact} className="w-full" size="lg">
                <Phone className="h-5 w-5 mr-2" />
                {language === "ar" ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
              </Button>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">
              {language === "ar" ? "موقعنا" : "Our Location"}
            </h2>
            <Map />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
