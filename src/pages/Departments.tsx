import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface Department {
  name: string;
  nameAr: string;
  image: string;
  description: string;
  descriptionAr: string;
  color: string;
  services: { en: string; ar: string; }[];
  link?: string;
}

const departments: Department[] = [
  {
    name: "Department of General Dentistry",
    nameAr: "قسم طب الأسنان العام",
    image: "general.png",
    description: "Our General Dentistry department provides comprehensive oral health care for patients of all ages. From routine check-ups to complex procedures, our experienced dentists use the latest techniques to ensure your smile stays healthy and beautiful.",
    descriptionAr: "يوفر قسم طب الأسنان العام رعاية شاملة لصحة الفم لمرضى جميع الأعمار. من الفحوصات الروتينية إلى الإجراءات المعقدة، يستخدم أطباء الأسنان ذوو الخبرة لدينا أحدث التقنيات لضمان بقاء ابتسامتك صحية وجميلة.",
    color: "bg-green-50 dark:bg-green-900/30",
    services: [
      { en: "Dental examinations & cleanings", ar: "فحوصات وتنظيف الأسنان" },
      { en: "Fillings & restorations", ar: "الحشوات والحشوات التجميلية" },
      { en: "Gum disease treatment", ar: "علاج أمراض اللثة" },
      { en: "Dental sealants", ar: "حشوات السيلانت الوقائية" },
      { en: "Oral cancer screenings", ar: "فحوصات الكشف عن سرطان الفم" }
    ]
  },
  {
    name: "Department of Endodontics",
    nameAr: "قسم معالجة الجذور",
    image: "endodontics.png",
    description: "Our Endodontics Department specializes in preserving your natural teeth through advanced root canal treatments. Our team of endodontists uses state-of-the-art microscopic technology to treat even the most complex cases with precision and care.",
    descriptionAr: "يتخصص قسم معالجة الجذور لدينا في الحفاظ على أسنانك الطبيعية من خلال علاجات قناة الجذر المتقدمة. يستخدم فريق أطباء قناة الجذر لدينا أحدث تقنيات المجهر لعلاج حتى أكثر الحالات تعقيدًا بدقة وعناية فائقة.",
    color: "bg-blue-50 dark:bg-blue-900/30",
    services: [
      { en: "Root canal therapy", ar: "علاج قناة الجذر" },
      { en: "Endodontic retreatment", ar: "إعادة علاج قناة الجذر" },
      { en: "Apicoectomy (root-end surgery)", ar: "استئصال قمة الجذر (جراحة نهاية الجذر)" },
      { en: "Treatment of dental trauma", ar: "علاج إصابات الأسنان" },
      { en: "Internal tooth whitening", ar: "تبييض الأسنان الداخلي" }
    ]
  },
  {
    name: "Department of Pediatric Dentistry",
    nameAr: "قسم طب أسنان الأطفال",
    image: "pediatric.png",
    description: "Our Pediatric Dentistry department provides specialized oral health care for infants, children, and adolescents. We create a fun, friendly environment to help children develop positive attitudes toward dental care that will last a lifetime.",
    descriptionAr: "يوفر قسم طب أسنان الأطفال رعاية صحية فموية متخصصة للرضع والأطفال والمراهقين. نخلق بيئة ممتعة وودية لمساعدة الأطفال على تطوير مواقف إيجابية تجاه العناية بالأسنان تستمر مدى الحياة.",
    color: "bg-pink-50 dark:bg-pink-900/30",
    services: [
      { en: "First dental visits", ar: "الزيارات الأولى لطبيب الأسنان" },
      { en: "Preventive dental care", ar: "الرعاية الوقائية للأسنان" },
      { en: "Dental sealants & fluoride treatments", ar: "حشوات السيلانت وعلاجات الفلورايد" },
      { en: "Habit counseling (thumb sucking, pacifier use)", ar: "استشارات العادات (مص الإصهام، استخدام المصاصة)" },
      { en: "Emergency dental care", ar: "الرعاية الطارئة للأسنان" }
    ],
    link: "/pediatric-dentistry"
  },
  {
    name: "Department of Orthodontics",
    nameAr: "قسم تقويم الأسنان",
    image: "orthodontics.png",
    description: "Our Orthodontics Department is dedicated to creating beautiful, healthy smiles through customized treatment plans. Whether you're considering traditional braces or clear aligners, our orthodontists will help you achieve optimal dental alignment and bite function.",
    descriptionAr: "يهتم قسم تقويم الأسنان لدينا بإنشاء ابتسامات جميلة وصحية من خلال خطط علاجية مخصصة. سواء كنت تفكر في تقويم الأسنان التقليدي أو التقويم الشفاف، سيساعدك أخصائيو تقويم الأسنان لدينا على تحقيق المحاذاة المثلى للأسنان ووظيفة العض.",
    color: "bg-yellow-50 dark:bg-yellow-900/30",
    services: [
      { en: "Traditional metal braces", ar: "تقويم الأسنان المعدني التقليدي" },
      { en: "Ceramic braces", ar: "تقويم الأسنان السيراميك" },
      { en: "Invisalign clear aligners", ar: "تقويم الأسنان الشفاف إنفزلاين" },
      { en: "Lingual braces", ar: "تقويم الأسنان اللساني" },
      { en: "Early interceptive treatment", ar: "العلاج التقويمي المبكر" }
    ]
  },
  {
    name: "Department of Prosthodontics",
    nameAr: "قسم التركيبات السنية",
    image: "prosthodontics.png",
    description: "Our Prosthodontics Department specializes in the aesthetic restoration and replacement of teeth. Using the latest materials and technology, we create natural-looking dental prostheses that restore both function and appearance to your smile.",
    descriptionAr: "يتخصص قسم التركيبات السنية لدينا في الترميم الجمالي واستبدال الأسنان. باستخدام أحدث المواد والتقنيات، نقوم بإنشاء أطقم أسنان تبدو طبيعية لاستعادة كل من الوظيفة والمظهر لابتسامتك.",
    color: "bg-teal-50 dark:bg-teal-900/30",
    services: [
      { en: "Dental crowns & bridges", ar: "التيجان والجسور السنية" },
      { en: "Complete & partial dentures", ar: "أطقم الأسنان الكاملة والجزئية" },
      { en: "Dental implants & implant-supported dentures", ar: "زراعة الأسنان وأطقم الأسنان المدعمة بالزرعات" },
      { en: "Full mouth rehabilitation", ar: "إعادة تأهيل الفم بالكامل" },
      { en: "TMJ and occlusal therapy", ar: "علاج المفصل الفكي الصدغي والإطباق" }
    ]
  },
  {
    name: "Department of Maxillofacial Surgery",
    nameAr: "قسم جراحة الفم والوجه والفكين",
    image: "maxillofacial.png",
    description: "Our Maxillofacial Surgery department specializes in surgical treatments for diseases, injuries, and defects in the head, neck, face, jaws, and hard and soft tissues of the mouth. Our board-certified surgeons are trained in the most advanced surgical techniques.",
    descriptionAr: "يتخصص قسم جراحة الوجه والفكين في العلاجات الجراحية لأمراض وإصابات وتشوهات الرأس والرقبة والوجه والفكين والأنسجة الصلبة واللينة للفم. يتمتع الجراحون المعتمدون لدينا بتدريب على أحدث التقنيات الجراحية.",
    color: "bg-purple-50 dark:bg-purple-900/30",
    services: [
      { en: "Dental implant surgery", ar: "جراحة زراعة الأسنان" },
      { en: "Wisdom teeth removal", ar: "خلع أضراس العقل" },
      { en: "Corrective jaw surgery", ar: "جراحة الفك التصحيحية" },
      { en: "TMJ disorders treatment", ar: "علاج اضطرابات المفصل الفكي الصدغي" },
      { en: "Facial trauma surgery", ar: "جراحة إصابات الوجه" }
    ]
  }
];

export const Departments = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/departments.jpg"
            alt="Our Specialized Departments"
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
              {language === "ar" ? "أقسامنا المتخصصة" : "Our Specialized Departments"}
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-primary">
              {language === "ar" ? "مراكز التميز الطبي" : "Centers of Medical Excellence"}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {language === "ar"
                ? "اكتشف أقسامنا المتخصصة المجهزة بأحدث التقنيات ويديرها خبراء في مجالاتهم. كل قسم مصمم لتقديم رعاية متخصصة وشاملة لتلبية جميع احتياجاتك الطبية الأسنان."
                : "Discover our specialized departments equipped with cutting-edge technology and staffed by experts in their fields. Each department is designed to provide specialized and comprehensive care to meet all your dental healthcare needs."
              }
            </p>
          </div>
        </div>
      </section>

      <div className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          {departments.map((dept, index) => {
            const isEven = index % 2 === 0;
            const direction = isEven ? 'right' : 'left';
            const isRTL = isArabic ? !isEven : isEven;

            return (
              <section key={index} className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                  <div className={`flex flex-col ${isRTL ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-8 md:gap-12`}>
                    {/* Image */}
                    <motion.div
                      className={`flex items-center justify-center w-full md:w-auto`}
                      initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, ease: [0.16, 0.77, 0.47, 0.99] }}
                    >
                      <div className={`relative ${dept.color} rounded-2xl shadow-xl overflow-hidden`}>
                        <img
                          src={dept.image}
                          alt={isArabic ? dept.nameAr : dept.name}
                          className="w-full h-auto max-w-[300px] md:max-w-[350px] object-cover"
                        />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className="flex-1"
                      initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 0.77, 0.47, 0.99] }}
                    >
                      <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                          {isArabic ? dept.nameAr : dept.name}
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                          <p className="text-lg">
                            {isArabic ? dept.descriptionAr : dept.description}
                          </p>
                          <ul className={`space-y-2 ${isArabic ? 'pr-4' : 'pl-4'}`}>
                            {dept.services && dept.services.map((service, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span>{isArabic ? service.ar : service.en}</span>
                              </li>
                            ))}
                          </ul>
                          {dept.link && (
                            <div className="mt-8">
                              <a
                                href={dept.link}
                                className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                              >
                                {isArabic ? "زيارة القسم" : "Visit Department"}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Departments;
