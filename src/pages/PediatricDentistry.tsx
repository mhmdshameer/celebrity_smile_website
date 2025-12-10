import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import {
    Phone,
    Calendar,
    ShieldCheck,
    Heart,
    Sparkles,
    Smile,
    Check,
    Baby,
    Stethoscope,
    Star
} from "lucide-react";
import { getDoctorApi, type DoctorResponse } from "@/api/doctor";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/components/ui/use-toast";

const PediatricDentistry = () => {
    const { language } = useLanguage();
    const isArabic = language === "ar";
    const isRTL = isArabic;
    const { toast } = useToast();
    const [doctor, setDoctor] = useState<DoctorResponse | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const data = await getDoctorApi("69088f7d81705df783f3b631");
                setDoctor(data);
            } catch (err) {
                console.error("Failed to fetch pediatric doctor", err);
            }
        };
        fetchDoctor();
    }, []);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const services = [
        {
            category: isArabic ? "العناية الوقائية" : "Preventive Care",
            items: isArabic
                ? ["سد الشقوق", "جل الفلورايد", "فلوريد الفضة ثنائي الأمين", "حشوات زجاج أيونومر للأطفال"]
                : ["Fissure Sealant", "Fluoride Gel", "Silver Diamine Fluoride", "Pediatric Glass Ionomer Filling"],
            icon: <ShieldCheck className="w-8 h-8 text-blue-400" />
        },
        {
            category: isArabic ? "العلاجات الترميمية" : "Restorative Treatments",
            items: isArabic
                ? ["حشوات تجميلية", "تيجان الفولاذ المقاوم للصدأ للأطفال"]
                : ["Composite Filling", "Pediatric Stainless Steel Crown"],
            icon: <Sparkles className="w-8 h-8 text-yellow-400" />
        },
        {
            category: isArabic ? "علاجات العصب" : "Pulp Treatments",
            items: isArabic
                ? ["بتر اللب", "استئصال اللب", "تغطية اللب المباشرة وغير المباشرة", "التجذير"]
                : ["Pulpotomy", "Pulpectomy", "Direct & Indirect Pulp Capping", "Apexification"],
            icon: <Heart className="w-8 h-8 text-red-400" />
        },
        {
            category: isArabic ? "الخلع والحالات الطارئة" : "Extractions & Emergency Care",
            items: isArabic
                ? ["خلع الأسنان اللبنية (مع/بدون تخدير)", "علاج الصدمات الطارئة"]
                : ["Deciduous Tooth Extraction", "Emergency Trauma Care"],
            icon: <Stethoscope className="w-8 h-8 text-green-400" />
        },
        {
            category: isArabic ? "تقويم الأسنان / إدارة المسافات" : "Orthodontics / Space Management",
            items: isArabic
                ? ["حافظات المسافة", "كاسرات العادات", "أطقم الأسنان للأطفال"]
                : ["Space Maintainers", "Habit Breakers", "Pediatric Dentures"],
            icon: <Smile className="w-8 h-8 text-purple-400" />
        },
        {
            category: isArabic ? "علاجات اللثة والتنظيف" : "Gum & Cleaning Treatments",
            items: isArabic
                ? ["استئصال اللثة", "التقليح وكشط الجذور والتلميع"]
                : ["Gingivectomy", "Scaling, Root Planing & Polishing"],
            icon: <Baby className="w-8 h-8 text-pink-400" />
        }
    ];

    const faqs = [
        {
            q: isArabic ? "متى يجب أن يزور الطفل طبيب الأسنان لأول مرة؟" : "When should a child visit the dentist first?",
            a: isArabic
                ? "يوصى بأن تكون الزيارة الأولى لطبيب الأسنان عند ظهور أول سن للطفل أو بحلول عيد ميلاده الأول."
                : "It is recommended that the first dental visit should be when the first tooth appears or by the child's first birthday."
        },
        {
            q: isArabic ? "هل تيجان الفولاذ المقاوم للصدأ آمنة؟" : "Are stainless steel crowns safe?",
            a: isArabic
                ? "نعم، هي آمنة ومتينة للغاية وتستخدم عادة لحماية الأسنان اللبنية التي تعرضت لتسوس كبير."
                : "Yes, they are safe, very durable, and commonly used to protect primary teeth with extensive decay."
        },
        {
            q: isArabic ? "هل استئصال اللب مؤلم؟" : "Does pulpectomy hurt?",
            a: isArabic
                ? "لا، يتم إجراء الإجراء تحت التخدير الموضعي لضمان راحة طفلك وعدم شعوره بالألم."
                : "No, the procedure is performed under local anesthesia to ensure your child is comfortable and feels no pain."
        },
        {
            q: isArabic ? "هل تقبلون تابي / تمارا؟" : "Do you accept Tamara / Tabby?",
            a: isArabic
                ? "نعم، نحن نقبل خيارات الدفع المرنة بما في ذلك تابي وتمارا."
                : "Yes, we accept flexible payment options including Tabby and Tamara."
        }
    ];

    const testimonials = [
        {
            text: isArabic ? "ابنتي تستمتع أخيرًا بزيارات طبيب الأسنان. طبيبة أسنان أطفال لطيفة جدًا." : "My daughter finally enjoys dental visits. Very gentle pediatric dentist.",
            author: isArabic ? "أم سارة" : "Sarah's Mom",
            rating: 5
        },
        {
            text: isArabic ? "علاج غير مؤلم. بيئة نظيفة وصديقة للأطفال." : "Painless treatment. Clean and child-friendly environment.",
            author: isArabic ? "أبو محمد" : "Mohammed's Dad",
            rating: 5
        },
        {
            text: isArabic ? "فريق عمل رائع وتعامل ممتاز مع الأطفال." : "Great team and excellent handling of children.",
            author: isArabic ? "أم ليلى" : "Laila's Mom",
            rating: 5
        },
        {
            text: isArabic ? "تجربة مميزة، شكراً لكم." : "Amazing experience, thank you.",
            author: isArabic ? "أبو فهد" : "Fahad's Dad",
            rating: 5
        }
    ];

    return (
        <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
            <Navigation />

            <Helmet>
                <title>{isArabic ? "طبيب أسنان أطفال في السعودية | رعاية أسنان لطيفة للأطفال" : "Pediatric Dentist in Saudi Arabia | Child-Friendly Dental Care"}</title>
                <meta name="description" content={isArabic ? "عيادة سمايل للمشاهير تقدم رعاية أسنان لطيفة للأطفال والرضع والمراهقين. العناية الوقائية، الحشوات، علاجات العصب، والمزيد في بيئة آمنة." : "Celebrity Smile provides gentle pediatric dentistry for babies, children, and teens. Preventive care, fillings, pulpectomy, crowns, trauma care & more."} />
                <meta name="keywords" content={isArabic ? "طبيب أسنان أطفال مكة, أسنان أطفال السعودية, عيادة أسنان أطفال" : "pediatric dentist Saudi Arabia, kids dentist Makkah, child dental care Saudi, pediatric dentistry"} />
            </Helmet>

            {/* 1. Hero Section */}
            <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/bg-doodles.png')] opacity-5 pointer-events-none"></div>
                <div className="container mx-auto px-4 py-12 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        {/* Left Side (Image - Desktop Right / Mobile Top due to order) */}
                        <motion.div
                            className={`relative ${isRTL ? 'md:order-1' : 'md:order-2'}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                                {/* Placeholder for Hero Image */}
                                <img
                                    src="/pediatric_dentist_hero.png"
                                    alt="Happy Child at Dentist"
                                    className="w-full h-full object-cover bg-blue-100"
                                    onError={(e) => {
                                        e.currentTarget.src = "/pediatric.png"; // Fallback
                                    }}
                                />
                            </div>
                            {/* Floating elements could go here */}
                        </motion.div>

                        {/* Right Side (Text - Desktop Left / Mobile Bottom) */}
                        <motion.div
                            className={`${isRTL ? 'md:order-2' : 'md:order-1'}`}
                            variants={fadeIn}
                            initial="initial"
                            animate="animate"
                        >
                            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                                {isArabic ? "طب أسنان الأطفال المتخصص" : "Specialized Pediatric Dentistry"}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2D3748] mb-6 leading-tight">
                                {isArabic
                                    ? "رعاية أسنان أطفال لطيفة ومتخصصة في المملكة"
                                    : "Gentle & Specialized Pediatric Dental Care in Saudi Arabia"}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                {isArabic
                                    ? "الابتسامات الصحية تبدأ مبكراً. يقدم أخصائي طب أسنان الأطفال لدينا علاجات آمنة وغير مؤلمة ومناسبة للأطفال والرضع والمراهقين."
                                    : "Healthy smiles start early. Our pediatric dental specialist provides safe, painless, and child-friendly treatments for babies, kids, and teens."}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Button size="lg" className="bg-[#FD3DB5] hover:bg-[#d63499] text-white rounded-full px-8 text-lg h-14 shadow-lg hover:shadow-xl transition-all">
                                    <Calendar className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                    {isArabic ? "حجز موعد للأطفال" : "Book Pediatric Appointment"}
                                </Button>
                                <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 border-2 border-blue-400 text-blue-600 hover:bg-blue-50">
                                    <Phone className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                    {isArabic ? "اتصل الآن" : "Call Now"}
                                </Button>
                            </div>

                            {/* Trust Badges */}
                            {/* <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ministry_of_Health_Saudi_Arabia.svg/2560px-Ministry_of_Health_Saudi_Arabia.svg.png" alt="MOH" className="h-8 md:h-10 object-contain" />
                                </div>
                                <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/STC_Pay_Logo.svg/2560px-STC_Pay_Logo.svg.png" alt="STC Pay" className="h-6 md:h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                                <img src="https://seeklogo.com/images/T/tabby-logo-D12404FA58-seeklogo.com.png" alt="Tabby" className="h-6 md:h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                                <img src="https://seeklogo.com/images/T/tamara-logo-B3A5A0A584-seeklogo.com.png" alt="Tamara" className="h-6 md:h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                            </div> */}
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* 2. Why Choose Celebrity Smile */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            {isArabic ? "لماذا تختار عيادة سمايل للمشاهير؟" : "Why Choose Celebrity Smile?"}
                        </h2>
                        <div className="w-24 h-2 bg-yellow-300 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: isArabic ? "بيئة صديقة للأطفال" : "Child-Friendly Environment",
                                desc: isArabic ? "ملونة ومريحة ومصممة للأطفال." : "Colorful, comforting, and designed for kids.",
                                icon: <Smile className="w-10 h-10 text-white" />,
                                color: "bg-blue-400"
                            },
                            {
                                title: isArabic ? "علاج آمن وغير مؤلم" : "Safe & Painless Treatment",
                                desc: isArabic ? "تقنيات حديثة + طبيب أسنان أطفال لطيف." : "Modern techniques + gentle pediatric dentist.",
                                icon: <Heart className="w-10 h-10 text-white" />,
                                color: "bg-pink-400"
                            },
                            {
                                title: isArabic ? "خدمات أطفال شاملة" : "Complete Pediatric Services",
                                desc: isArabic ? "وقائية، ترميمية، علاجات العصب، رعاية الصدمات." : "Preventive, restorative, pulp treatments, trauma care.",
                                icon: <Sparkles className="w-10 h-10 text-white" />,
                                color: "bg-purple-400"
                            },
                            {
                                title: isArabic ? "أخصائي أطفال ذو خبرة" : "Experienced Pediatric Specialist",
                                desc: isArabic ? "مدرب على علاج الأطفال القلقين والرضع." : "Trained to treat anxious children and toddlers.",
                                icon: <Stethoscope className="w-10 h-10 text-white" />,
                                color: "bg-green-400"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all"
                                whileHover={{ y: -5 }}
                            >
                                <div className={`w-20 h-20 mx-auto rounded-full ${feature.color} flex items-center justify-center mb-6 shadow-md`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Main Services Section */}
            <section className="py-12 bg-blue-50/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            {isArabic ? "خدماتنا للأطفال" : "Our Pediatric Services"}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {isArabic
                                ? "نقدم مجموعة شاملة من علاجات الأسنان المخصصة للأطفال في بيئة آمنة ومريحة."
                                : "We provide a comprehensive range of dental treatments specifically designed for children in a safe and comfortable environment."}
                        </p>
                    </div>

                    {/* Expandable Horizontal Cards */}
                    <div className="flex flex-col lg:flex-row gap-4 h-auto lg:items-center px-2 py-4">
                        {services.map((service, index) => {
                            const isHovered = hoveredIndex === index;

                            return (
                                <motion.div
                                    key={index}
                                    layout
                                    transition={{ layout: { duration: 0.5, type: "spring", stiffness: 100, damping: 20 } }}
                                    className={`relative rounded-3xl overflow-hidden cursor-pointer border border-blue-100 p-5 flex flex-col
                                        ${isHovered
                                            ? 'lg:flex-[3] bg-white shadow-2xl scale-105 z-10 lg:h-fit lg:justify-between'
                                            : 'lg:flex-1 bg-white/80 hover:bg-white shadow-lg z-0 lg:h-[250px] lg:justify-start'} 
                                        `}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    initial={{ borderRadius: "1.5rem" }}
                                >
                                    {/* Icon & Title Header - Fixed Top Alignment */}
                                    <motion.div layout="position" className="flex flex-col gap-2 items-center text-center lg:pt-4">
                                        <div className={`p-4 rounded-full transition-colors ${isHovered ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                                            {service.icon}
                                        </div>
                                        <h3 className={`font-bold text-lg md:text-xl transition-colors ${isHovered ? 'text-gray-900' : 'text-gray-700'}`}>
                                            {service.category}
                                        </h3>
                                    </motion.div>

                                    {/* Expandable Content */}
                                    <div className={`mt-4 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'lg:opacity-0'}`}>
                                        <p className="text-sm text-gray-500 mb-4 hidden lg:block">
                                            {isArabic ? "التفاصيل:" : "Details:"}
                                        </p>
                                        <ul className="space-y-2 mb-6">
                                            {service.items.map((item, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * idx }}
                                                    className="flex items-start gap-2 text-gray-600 text-sm md:text-base"
                                                >
                                                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-1" />
                                                    <span>{item}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                        <Button
                                            className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toast({
                                                    title: isArabic ? "مزيد من التفاصيل" : "More Details",
                                                    description: isArabic ? "يرجى الاتصال بنا للحصول على استشارة مفصلة." : "Please contact us for a detailed consultation regarding this service.",
                                                });
                                            }}
                                        >
                                            {isArabic ? "معرفة المزيد" : "Learn More"}
                                        </Button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. About the Pediatric Dentist */}
            <section className="py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        {/* Image */}
                        <motion.div
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-blue-100 to-white">
                                {doctor && doctor.image ? (
                                    <img
                                        src={doctor.image.url}
                                        alt={isArabic ? doctor.nameAr : doctor.name}
                                        className="w-full h-full object-contain pt-4 hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <img
                                        src="/pediatric_dentist_profile.png"
                                        alt="Pediatric Dentist"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2670&auto=format&fit=crop"; // Fallback
                                        }}
                                    />
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                                    <h3 className="text-2xl font-bold">{doctor ? (isArabic ? doctor.nameAr : doctor.name) : "Dr. Sarah Johnson"}</h3>
                                    <p className="opacity-90">{isArabic ? "أخصائية طب أسنان أطفال" : "Pediatric Dental Specialist"}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                                {isArabic ? "أخصائي طب أسنان الأطفال" : "Child Specialist Pediatric Dentist"}
                            </h2>
                            <p className="text-xl text-gray-600 mb-8 italic border-l-4 border-yellow-300 pl-4 py-2 bg-yellow-50 rounded-r-lg">
                                {isArabic
                                    ? "حريصة، لطيفة، وذات خبرة في علاج الرضع والأطفال والمراهقين باستخدام تقنيات طب أسنان الأطفال الحديثة."
                                    : "“Caring, gentle, and experienced in treating infants, toddlers, children, and teens using modern pediatric dental techniques.”"}
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-lg mb-2 text-primary">{isArabic ? "المؤهلات" : "Qualifications"}</h4>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        <li>{isArabic ? "ماجستير في طب أسنان الأطفال" : "Master's Degree in Pediatric Dentistry"}</li>
                                        <li>{isArabic ? "عضو الجمعية السعودية لطب الأسنان" : "Member of Saudi Dental Society"}</li>
                                        <li>{isArabic ? "شهادة البورد في طب أسنان الأطفال" : "Board Certified in Pediatric Dentistry"}</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-2 text-primary">{isArabic ? "الخبرة الخاصة" : "Special Expertise"}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor && (isArabic ? doctor.specialtiesAr : doctor.specialties)?.map((spec, i) => (
                                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                {spec}
                                            </span>
                                        ))}
                                        {!doctor && ["Child Anxiety", "Trauma Care", "Early Childhood Caries", "Minimal Intervention"].map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Parent Testimonials (Carousel) */}
            <section className="py-20 bg-pink-50/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            {isArabic ? "ماذا يقول الآباء" : "Happy Parents, Happy Smiles"}
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <Carousel className="w-full">
                            <CarouselContent>
                                {testimonials.map((t, i) => (
                                    <CarouselItem key={i} className="md:basis-1/2">
                                        <div className="p-2">
                                            <Card className="border-none shadow-md bg-white">
                                                <CardContent className="flex flex-col items-center p-8 text-center">
                                                    <div className="flex gap-1 mb-4">
                                                        {[...Array(t.rating)].map((_, i) => (
                                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                                        ))}
                                                    </div>
                                                    <p className="text-lg text-gray-600 mb-6 font-medium">"{t.text}"</p>
                                                    <div className="mt-auto">
                                                        <span className="font-bold text-primary">{t.author}</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex" />
                            <CarouselNext className="hidden md:flex" />
                        </Carousel>
                    </div>
                </div>
            </section>

            {/* 6. Photo Gallery */}
            {/* <section className="py-20 bg-white" >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                        {isArabic ? "جولة في عيادتنا للأطفال" : "Our Kid-Friendly Clinic"}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f72?q=80&w=2574", alt: "Play Area" },
                            { src: "https://images.unsplash.com/photo-1519494476857-81788c94e41f?q=80&w=2670", alt: "Treatment Room" },
                            { src: "https://images.unsplash.com/photo-1445583934509-4152fbc3121d?q=80&w=2670", alt: "Gentle Care" },
                            { src: "https://images.unsplash.com/photo-1598256989494-06c27685b8c3?q=80&w=2669", alt: "Modern Equipment" },
                            { src: "https://plus.unsplash.com/premium_photo-1661766456242-0193bb9dc730?q=80&w=2670", alt: "Happy Smiles" },
                            { src: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2670", alt: "Toys & Fun" },
                        ].map((img, i) => (
                            <motion.div
                                key={i}
                                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                                whileHover={{ scale: 1.02 }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://placehold.co/400x400?text=Clinic+Photo+${i + 1}`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-medium">{img.alt}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* 7. Pricing (Optional) */}
            <section className="py-20 bg-gray-50" >
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                        {isArabic ? "أسعار العلاجات الشائعة" : "Treatment Pricing"}
                    </h2>
                    <Card className="overflow-hidden border-none shadow-lg">
                        <div className="bg-primary p-4 text-white font-bold grid grid-cols-2">
                            <span>{isArabic ? "العلاج" : "Treatment"}</span>
                            <span className="text-right">{isArabic ? "السعر يبدأ من" : "Starting Price"}</span>
                        </div>
                        <div className="divide-y">
                            {[
                                { name: "Fissure Sealant", price: "SAR 150" },
                                { name: "Composite Filling", price: "SAR 200" },
                                { name: "Stainless Steel Crown", price: "SAR 350" },
                                { name: "Pulpotomy", price: "SAR 300" },
                            ].map((item, i) => (
                                <div key={i} className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-colors">
                                    <span className="font-medium text-gray-700">{item.name}</span>
                                    <span className="text-right font-bold text-primary">{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>

            {/* 8. FAQ Section */}
            <section className="py-20 bg-white" >
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                        {isArabic ? "أسئلة شائعة" : "Frequently Asked Questions"}
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`}>
                                <AccordionTrigger className="text-lg font-medium text-gray-800">{faq.q}</AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* 9. Final CTA */}
            <section className="py-24 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-center" >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        {isArabic ? "امنح طفلك ابتسامة صحية وواثقة" : "Give Your Child a Healthy, Confident Smile"}
                    </h2>
                    <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                        {isArabic
                            ? "احجز موعداً اليوم في عيادة سمايل للمشاهير، مكة المكرمة."
                            : "Book your appointment today at Celebrity Smile Clinic, Makkah."}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-10 text-lg h-14 font-bold">
                            {isArabic ? "احجز موعد" : "Book Appointment"}
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 rounded-full px-10 text-lg h-14 font-bold bg-transparent">
                            {isArabic ? "اتصل بنا" : "Call Now"}
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div >
    );
};

export default PediatricDentistry;
