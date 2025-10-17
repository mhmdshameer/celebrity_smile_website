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

const Contact = () => {
  const { t, language } = useLanguage();

  const handleWhatsAppContact = () => {
    const phoneNumber = "966XXXXXXXXX"; // Replace with actual WhatsApp number
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
      
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            {t("contact")}
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {language === "ar" 
              ? "تواصل معنا للحصول على استشارة أو حجز موعد"
              : "Get in touch with us for a consultation or to book an appointment"}
          </p>

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
                    <Label htmlFor="name">
                      {language === "ar" ? "الاسم" : "Name"}
                    </Label>
                    <Input id="name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      {language === "ar" ? "رقم الهاتف" : "Phone"}
                    </Label>
                    <Input id="phone" type="tel" required />
                  </div>
                  <div>
                    <Label htmlFor="message">
                      {language === "ar" ? "الرسالة" : "Message"}
                    </Label>
                    <Textarea id="message" rows={4} required />
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
                          ? "الرياض، المملكة العربية السعودية"
                          : "Riyadh, Saudi Arabia"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">
                        {language === "ar" ? "الهاتف" : "Phone"}
                      </p>
                      <p className="text-muted-foreground" dir="ltr">+966 XX XXX XXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">
                        {language === "ar" ? "البريد الإلكتروني" : "Email"}
                      </p>
                      <p className="text-muted-foreground">info@celebritysmile.com</p>
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
