import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getDoctorsApi, type DoctorResponse } from "@/api/doctor";

// Doctors will be loaded from API

const Doctors = () => {
  const { t, language } = useLanguage();
  const [doctors, setDoctors] = useState<DoctorResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const list = await getDoctorsApi();
        if (!mounted) return;
        setDoctors(list);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleWhatsAppBooking = (doctorName: string) => {
    const message = encodeURIComponent(`Hello! I would like to book an appointment with ${doctorName}.`);
    window.open(`https://wa.me/1234567890?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/doctors.jpg"
            alt="Our Expert Doctors"
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
              {language === "ar" ? "أطباؤنا الخبراء" : "Our Expert Doctors"}
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-primary">
              {language === "ar" ? "فريق من المهنيين المتخصصين" : "Meet Our Team of Specialized Professionals"}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {language === "ar"
                ? "تعرف على فريقنا من أطباء الأسنان ذوي الخبرة العالية الذين يكرسون جهودهم لصحة فمك. كل طبيب متخصص في مجاله وملتزم بتقديم أفضل الرعاية والاهتمام الشخصي لكل مريض."
                : "Meet our team of highly experienced dental professionals dedicated to your oral health. Each doctor specializes in their field and is committed to providing the best care and personal attention to every patient."
              }
            </p>
          </div>
        </div>
      </section>

      <div className="flex-1">
        <div className="container mx-auto px-4 pt-16 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {loading && (
              <p className="col-span-full text-center text-muted-foreground">{t("loading")}</p>
            )}
            {!loading && doctors.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground">No doctors to show yet.</p>
            )}
            {!loading && doctors.map((d) => {
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
                    {displaySpec && <p className="text-muted-foreground mb-4">{displaySpec}</p>}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleWhatsAppBooking(displayName)}
                    >
                      {t("bookAppointment")}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Doctors;
