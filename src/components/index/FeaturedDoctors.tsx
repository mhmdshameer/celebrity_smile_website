import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { type DoctorResponse } from "@/api/doctor";

interface FeaturedDoctorsProps {
  doctors: DoctorResponse[];
  loadingDoctors: boolean;
  t: (key: string) => string;
}

const FeaturedDoctors = ({ doctors, loadingDoctors, t }: FeaturedDoctorsProps) => {
  const { language } = useLanguage();

  return (
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
            <h2 className={`text-4xl font-bold text-primary ${language === "ar" ? "pr-5" : "pl-5"}`}>
              Meet Our Doctors
            </h2>
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
  );
};

export default FeaturedDoctors;
