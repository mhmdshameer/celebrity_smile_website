import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, ShieldCheck, Quote } from "lucide-react";

interface TestimonialsSectionProps {
  t: (key: string) => string;
}

const TestimonialsSection = ({ t }: TestimonialsSectionProps) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const isRTL = isArabic;

  const testimonials = [
    {
      id: 1,
      name: isArabic ? "محمد العتيبي" : "Mohammed Al-Otaibi",
      initial: "M",
      rating: 5,
      date: isArabic ? "منذ 3 أسابيع" : "3 weeks ago",
      text: isArabic
        ? "تجربة رائعة في عيادة سمايل للمشاهير. الأطباء محترفون جداً والعيادة نظيفة ومرتبة. أنصح بها بشدة لعلاج الأسنان."
        : "Great experience at Celebrity Smile Clinic. The doctors are very professional and the clinic is clean and tidy. Highly recommend for dental treatment.",
      badge: isArabic ? "مراجعة موثقة" : "Verified Review",
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: isArabic ? "سارة الهاشمي" : "Sarah Al-Hashimi",
      initial: "S",
      rating: 5,
      date: isArabic ? "منذ شهر" : "1 month ago",
      text: isArabic
        ? "دكتورة دعاء كانت ممتازة مع أطفالي. تعامل راقي وخدمة مميزة. شكراً لكم على الاهتمام والرعاية."
        : "Dr. Doaa was excellent with my kids. Classy dealing and distinguished service. Thank you for the care and attention.",
      badge: isArabic ? "عناية الأطفال" : "Pediatric Care",
      color: "bg-pink-500"
    },
    {
      id: 3,
      name: isArabic ? "عبدالله فهد" : "Abdullah Fahad",
      initial: "A",
      rating: 5,
      date: isArabic ? "منذ شهرين" : "2 months ago",
      text: isArabic
        ? "قمت بعمل تقويم لأسناني والنتيجة كانت مذهلة. شكراً للدكتور على المتابعة المستمرة والنتائج الجميلة."
        : "I did orthodontics for my teeth and the result was amazing. Thanks to the doctor for the continuous follow-up and beautiful results.",
      badge: isArabic ? "تقويم الأسنان" : "Orthodontics",
      color: "bg-purple-500"
    },
    {
      id: 4,
      name: isArabic ? "نورة سعد" : "Noura Saad",
      initial: "N",
      rating: 5,
      date: isArabic ? "منذ 3 أشهر" : "3 months ago",
      text: isArabic
        ? "أفضل عيادة أسنان في جدة. الأسعار معقولة والخدمة ممتازة. الاستقبال ودود جداً ومتعاون."
        : "The best dental clinic in Jeddah. Prices are reasonable and service is excellent. The reception is very friendly and cooperative.",
      badge: isArabic ? "خدمة العملاء" : "Customer Service",
      color: "bg-green-500"
    },
    {
      id: 5,
      name: isArabic ? "خالد العمري" : "Khaled Al-Amri",
      initial: "K",
      rating: 5,
      date: isArabic ? "منذ 4 أشهر" : "4 months ago",
      text: isArabic
        ? "زراعة الأسنان كانت ناجحة وبدون ألم يذكر. شكراً للكادر الطبي على احترافيتهم."
        : "Dental implants were successful and with little to no pain. Thanks to the medical staff for their professionalism.",
      badge: isArabic ? "زراعة الأسنان" : "Dental Implants",
      color: "bg-indigo-500"
    }
  ];

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
                    <Card className="h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-2xl relative overflow-hidden group">
                      <CardContent className="p-8 flex flex-col h-full text-start relative">
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
                        <p className="text-gray-600 leading-relaxed font-normal italic relative z-10 flex-grow">
                          "{testimonial.text}"
                        </p>

                        {/* Verified Footer */}
                        <div className="mt-6 border-t border-gray-50 pt-4 flex items-center gap-1.5 opacity-70">
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
    </motion.section>
  );
};

export default TestimonialsSection;
