import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { type ServiceResponse } from "@/api/service";
import favicon from "/favicon.png";

interface ServicesPreviewProps {
  services: ServiceResponse[];
  loadingServices: boolean;
}

const ServicesPreview = ({ services, loadingServices }: ServicesPreviewProps) => {
  const { language } = useLanguage();

  return (
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
            <h2 className={`text-4xl font-bold text-primary ${language === "ar" ? "pr-5" : "pl-5"}`}>
              Our Services
            </h2>
            <Link to="/services">
              <Button variant="default">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative overflow-hidden">
            {loadingServices && (
              <Card className="p-6 text-center">
                <div className="text-muted-foreground">Loading...</div>
              </Card>
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
                  return (
                    <Card key={`${s._id}-${title}`}
                          className="p-5 flex-none w-[280px] sm:w-[320px] border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-200 group bg-background/50 backdrop-blur-sm">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                          <img
                            src={favicon}
                            alt="Service Icon"
                            className="h-6 w-6 object-contain"
                          />
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
  );
};

export default ServicesPreview;
