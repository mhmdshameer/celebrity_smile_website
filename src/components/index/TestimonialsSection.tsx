import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface TestimonialsSectionProps {
  t: (key: string) => string;
}

const TestimonialsSection = ({ t }: TestimonialsSectionProps) => {
  const { language } = useLanguage();

  const testimonials = [
    {
      name: "Sarah Mitchell",
      nameAr: "سارة ميتشل",
      role: "Verified Patient",
      roleAr: "مريضة موثقة",
      text: "Exceptional service! The team at Celebrity Smile Clinic made me feel comfortable throughout my treatment. My smile has never looked better!",
      textAr: "خدمة استثنائية! جعلني فريق عيادة ابتسامة المشاهير أشعر بالراحة طوال علاجي. ابتسامتي لم تبدو أفضل من ذلك!",
      initials: "SM"
    },
    {
      name: "James Anderson",
      nameAr: "جيمس أندرسون",
      role: "Verified Patient",
      roleAr: "مريض موثق",
      text: "Professional, caring, and skilled. I had dental implants done and the results exceeded my expectations. Highly recommend!",
      textAr: "محترفون، رحيمون، وماهرون. قمت بزراعة الأسنان والنتائج تجاوزت توقعاتي. أنصح بشدة!",
      initials: "JA"
    },
    {
      name: "Lisa Wang",
      nameAr: "ليزا وانغ",
      role: "Verified Patient",
      roleAr: "مريضة موثقة",
      text: "Best dental experience I've ever had. The modern facilities and friendly staff make every visit pleasant. Thank you!",
      textAr: "أفضل تجربة أسنان مررت بها على الإطلاق. المرافق الحديثة والموظفون الودودون يجعلون كل زيارة ممتعة. شكراً لكم!",
      initials: "LW"
    }
  ];

  return (
    <motion.section
      className="py-20 bg-muted/50"
      initial={{ opacity: 0, rotateY: 90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{t("testimonials")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  {language === "ar" ? testimonial.textAr : testimonial.text}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-lg font-semibold text-primary">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {language === "ar" ? testimonial.nameAr : testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? testimonial.roleAr : testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
