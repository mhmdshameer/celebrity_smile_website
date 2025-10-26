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
      
      <div className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            {t("ourDoctors")}
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Meet our team of experienced dental professionals dedicated to your oral health.
          </p>

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
