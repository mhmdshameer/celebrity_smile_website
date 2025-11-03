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
    name: "Khalid Alzahrani",
    nameAr: "خالد الزهراني",
    role: "Verified Patient",
    roleAr: "مريض موثَّق",
    text: "Dr. BHAVITHA is one of the best doctors I’ve visited. She has an angel’s hands. She did teeth cleaning for me and gives me a clean and beautiful smile. She did deal professionally with my teeth sensitivity, also she’s a very nice person. I highly recommend her.",
    textAr: "الدكتورة بهافيثا من أفضل الأطباء الذين زرتهم، يديها خفيفة جدًا وتعاملها راقٍ ومهني. قامت بتنظيف أسناني ومنحتني ابتسامة نظيفة وجميلة. تعاملت باحترافية مع حساسية أسناني، وهي أيضًا شخص لطيف جدًا. أنصح بها بشدة.",
    initials: "KA",
  },
  {
    name: "Muhammad Afzal",
    nameAr: "محمد أفضل",
    role: "Verified Patient",
    roleAr: "مريض موثَّق",
    text: "MashaAllah the doctor has great ethics and treats well. We are happy to come here. May Allah increase the sustenance of the owner and staff of this clinic.",
    textAr: "ما شاء الله، الطبيبة تمتاز بالأخلاق العالية والتعامل الرائع. نحن سعداء جدًا بزيارتنا لهذه العيادة. نسأل الله أن يبارك في رزق مالك العيادة وطاقمها.",
    initials: "MA",
  },
  {
    name: "Najwa Yousuf",
    nameAr: "نجوى يوسف",
    role: "Verified Patient",
    roleAr: "مريضة موثَّقة",
    text: "I went to Dr. Bhavitha Arun Kumar for root canal treatment. She was so careful and very kind. She answered all my questions and gave me a lot of information regarding my dental treatment. She was the best choice, I even took my brother to her for cleaning and filling. She helped us plan my brother’s dental treatments regarding braces and surgery if required. Very satisfied by her service!",
    textAr: "ذهبت إلى الدكتورة بهافيثا أرون كومار لعلاج العصب، وكانت دقيقة جدًا ولطيفة في تعاملها. أجابت على جميع أسئلتي وقدّمت لي معلومات مفيدة عن حالتي. كانت أفضل خيار، حتى أنني أخذت أخي إليها للتنظيف والحشوات. ساعدتنا في وضع خطة لعلاج أسنانه بالتقويم والجراحة عند الحاجة. راضية جدًا عن خدمتها!",
    initials: "NY",
  },
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
