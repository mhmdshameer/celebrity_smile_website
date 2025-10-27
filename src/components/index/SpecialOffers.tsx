import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getOffersApi, type OfferResponse } from "@/api/offer";

interface SpecialOffersProps {
  language?: string;
}

const SpecialOffers = ({ language: _language }: SpecialOffersProps) => {
  const { language } = useLanguage();
  const [offers, setOffers] = useState<OfferResponse[]>([]);
  const [loadingOffers, setLoadingOffers] = useState<boolean>(false);

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

    loadOffers();

    return () => {
      mounted = false;
    };
  }, []);
  return (
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
            <div className="text-center py-12 text-muted-foreground">
              No special offers available at the moment.
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default SpecialOffers;
