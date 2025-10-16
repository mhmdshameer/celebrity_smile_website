import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Demo doctors data - will be replaced with backend data later
const demodoctors = [
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
  {
    id: 4,
    name: "Dr. Ahmed Hassan",
    nameAr: "د. أحمد حسن",
    specialty: "Endodontics",
    specialtyAr: "علاج جذور الأسنان",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
  },
];

const Doctors = () => {
  const { t, language } = useLanguage();

  const handleWhatsAppBooking = (doctorName: string) => {
    const message = encodeURIComponent(`Hello! I would like to book an appointment with ${doctorName}.`);
    window.open(`https://wa.me/1234567890?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            {t("ourDoctors")}
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Meet our team of experienced dental professionals dedicated to your oral health.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {demodoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={language === "ar" ? doctor.nameAr : doctor.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    {language === "ar" ? doctor.nameAr : doctor.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === "ar" ? doctor.specialtyAr : doctor.specialty}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleWhatsAppBooking(doctor.name)}
                  >
                    {t("bookAppointment")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Doctors;
