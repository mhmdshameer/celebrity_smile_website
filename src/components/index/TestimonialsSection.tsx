import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, ShieldCheck, Quote, X } from "lucide-react";

import { getTestimonials } from "@/data/testimonials";

interface TestimonialsSectionProps {
  t: (key: string) => string;
}

const TestimonialsSection = ({ t }: TestimonialsSectionProps) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const isRTL = isArabic;
  const [selectedReview, setSelectedReview] = useState<any | null>(null);

  const testimonials = getTestimonials(isArabic);

  return (
    <motion.section
      className={`py-12 bg-muted/50 ${language === "ar" ? 'rtl' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      dir={language === "ar" ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-transparent mb-4 leading-[1.2] py-2
            ${language === "ar" ? 'font-cairo text-center' : ''}`}>
            {language === "ar" ? "آراء عملائنا" : "What Our Patients Say"}
          </h2>
          <p className={`text-muted-foreground text-base sm:text-lg leading-normal -mt-2 ${language === "ar" ? 'text-center' : ''
            }`}>
            {language === "ar" ? "استمع إلى تجارب مرضانا" : "Hear from our valued patients"}
          </p>
        </div>

        {/* Custom Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          <Carousel
            className="w-full"
            opts={{
              direction: isRTL ? 'rtl' : 'ltr',
              loop: true,
              align: "start"
            }}
          >
            <CarouselContent className={isRTL ? "-mr-4" : "-ml-4"}>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className={`${isRTL ? "pr-4" : "pl-4"} md:basis-1/2 lg:basis-1/3 h-full`}>
                  <div className="h-full">
                    <Card className="h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-2xl relative overflow-hidden group hover:-translate-y-1">
                      <CardContent className="p-8 flex flex-col h-full text-start relative min-h-[300px]">
                        {/* Quote Icon Background */}
                        <Quote className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} w-12 h-12 text-gray-100 rotate-180`} />

                        {/* Google Icon */}
                        <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} opacity-50 group-hover:opacity-100 transition-opacity z-10`}>
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="G"
                            className="w-5 h-5"
                          />
                        </div>

                        {/* Badge */}
                        <div className={`inline-block mb-4 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit z-10`}>
                          {testimonial.badge}
                        </div>

                        {/* Header: Avatar, Name, Stars */}
                        <div className="flex items-center gap-3 mb-6 z-10">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md ${testimonial.color}`}>
                            {testimonial.initial}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 text-base leading-tight">{testimonial.name}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-[#FBBC04] text-[#FBBC04]" />
                                ))}
                              </div>
                              <span className="text-[10px] text-gray-400 mx-1">•</span>
                              <span className="text-[10px] text-gray-400">{testimonial.date}</span>
                            </div>
                          </div>
                        </div>

                        {/* Review Text */}
                        <div className="relative mb-6 flex-grow z-10">
                          <p className="text-gray-600 leading-relaxed font-normal italic line-clamp-3">
                            "{testimonial.text}"
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedReview(testimonial);
                            }}
                            className="text-xs font-bold text-blue-500 hover:text-blue-700 mt-2 focus:outline-none"
                          >
                            {isArabic ? "قراءة المزيد" : "Read More"}
                          </button>
                        </div>

                        {/* Verified Footer */}
                        <div className="mt-auto border-t border-gray-50 pt-4 flex items-center gap-1.5 opacity-70">
                          <ShieldCheck className="w-3 h-3 text-green-600" />
                          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">
                            {isArabic ? "مراجعة جوجل موثقة" : "Verified Google Review"}
                          </span>
                        </div>

                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={`hidden md:flex ${isRTL ? 'right-0 left-auto translate-x-12 rotate-180' : 'left-0 -translate-x-12'}`} />
            <CarouselNext className={`hidden md:flex ${isRTL ? 'left-0 right-auto -translate-x-12 rotate-180' : 'right-0 translate-x-12'}`} />
          </Carousel>
        </div>
      </div>

      {/* Pop-out Overlay for Reviews */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReview(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedReview(null)}
                className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10`}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="p-8 md:p-10 text-start" dir={isRTL ? 'rtl' : 'ltr'}>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-3xl ${selectedReview.color}`}>
                    {selectedReview.initial}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedReview.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
                        ))}
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-500">
                        {selectedReview.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
                  {selectedReview.badge}
                </div>

                <div className="prose prose-lg text-gray-700 leading-relaxed italic">
                  "{selectedReview.text}"
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>{isArabic ? "مراجعة موثقة من جوجل" : "Verified Google Review"}</span>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                    alt="Google"
                    className="h-4 w-auto ml-auto opacity-50"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default TestimonialsSection;
