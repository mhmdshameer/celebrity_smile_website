import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AppointmentForm from "@/components/AppointmentForm";
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
    Star,
    X // For close button
} from "lucide-react";
import { getDoctorApi, type DoctorResponse } from "@/api/doctor";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/components/ui/use-toast";

// Helper Component for Review Card
const ReviewCard = ({ t, i, isArabic, isRTL, onReadMore }: { t: any, i: number, isArabic: boolean, isRTL: boolean, onReadMore: (review: any) => void }) => {
    const MAX_LENGTH = 150;
    const shouldTruncate = t.text.length > MAX_LENGTH;

    return (
        <div className="h-full" dir={isRTL ? "rtl" : "ltr"}>
            <Card className="h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-2xl relative overflow-hidden group">
                <CardContent className="p-8 flex flex-col h-full text-start">
                    {/* Badge */}
                    <div className={`absolute top-0 ${isRTL ? 'right-0 rounded-bl-xl' : 'left-0 rounded-br-xl'} bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-none z-20 uppercase tracking-wider`}>
                        {t.badge}
                    </div>

                    {/* Google Icon */}
                    <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} opacity-50 group-hover:opacity-100 transition-opacity`}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="G"
                            className="w-5 h-5"
                        />
                    </div>

                    {/* Header: Avatar, Name, Date */}
                    <div className="flex items-start gap-3 mb-4 mt-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm
                            ${i % 3 === 0 ? 'bg-purple-500' : i % 3 === 1 ? 'bg-indigo-500' : 'bg-pink-500'}
                        `}>
                            {t.author.charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold text-gray-800 text-sm leading-tight text-start">{t.author}</div>
                            <div className="flex items-center gap-1 mt-1">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-[#FBBC04] text-[#FBBC04]" />
                                    ))}
                                </div>
                                <span className="text-[10px] text-gray-400 mx-1">•</span>
                                <div className="text-[10px] text-gray-400">
                                    {/* @ts-ignore */}
                                    {t.date || (isArabic ? `${i + 1} أشهر مضت` : `${i + 1} months ago`)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review Text */}
                    <div className="relative mb-6 flex-grow">
                        <p className="text-sm text-gray-600 leading-relaxed font-normal italic line-clamp-4 relative z-10">
                            <span className={`absolute -top-2 ${isRTL ? '-right-2' : '-left-2'} text-4xl text-gray-200 font-serif opacity-50`}>"</span>
                            {t.text}
                            <span className={`absolute -bottom-4 ${isRTL ? 'left-0' : 'right-0'} text-4xl text-gray-200 font-serif opacity-50`}>"</span>
                        </p>

                        {shouldTruncate && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onReadMore(t);
                                }}
                                className="text-xs font-bold text-blue-500 hover:text-blue-700 mt-2 focus:outline-none"
                            >
                                {isArabic ? "قراءة المزيد" : "Read More"}
                            </button>
                        )}
                    </div>

                    {/* Verified Badge Bottom */}
                    <div className="mt-auto pt-4 flex items-center gap-1.5 opacity-60">
                        <ShieldCheck className="w-3 h-3 text-green-600" />
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">
                            {isArabic ? "مراجعة موثقة" : "Verified Review"}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const PediatricDentistry = () => {
    const { language } = useLanguage();
    const isArabic = language === "ar";
    const isRTL = isArabic;
    const { toast } = useToast();
    const [doctor, setDoctor] = useState<DoctorResponse | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedReview, setSelectedReview] = useState<any | null>(null);
    const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

    useEffect(() => {
        // Using static data provided by user
        const doctorData: any = {
            "image": {
                "url": "https://res.cloudinary.com/dkxmfqafi/image/upload/v1766085915/celebrity_smile/doctors/kbc9blzdkj0f8q2b3pur.png",
                "public_id": "celebrity_smile/doctors/kbc9blzdkj0f8q2b3pur"
            },
            "_id": "6944551bea6938f6edf62d61",
            "name": "DR DOAA MOHAMMED",
            "nameAr": "الدكتورة / دعاء محمد",
            "specialties": [
                "PEDODONTIST",
                "CHILD SPECIALIST"
            ],
            "specialtiesAr": [
                "أخصائي أسنان الأطفال"
            ],
            "slug": "dr-doaa-mohammed"
        };
        setDoctor(doctorData);
    }, []);

    const handleWhatsApp = () => {
        setIsAppointmentOpen(true);
    };

    const handleCall = () => {
        window.location.href = "tel:+966556005567";
    };

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
            text: isArabic
                ? "واجه ابني مشاكل في قناة الجذر في سن مبكرة وحصلنا على النصيحة والعلاج الصحيح من الدكتورة بافيتا. طبيبة تهتم جداً وخاصة في التعامل مع الأطفال للعلاج. أنصح بشدة بهذا الطبيب والمستشفى أيضاً."
                : "My son faced root canal issues at his early age were we got right advise and treatment from doctor Bhavita. Very well caring doctor especially handling kids for treatment. I HIGHLY RECOMMEND THIS DOCTOR AND HOSPITAL AS WELL",
            author: "Mohamed Saffin",
            rating: 5,
            badge: isArabic ? "عناية الأطفال" : "Pediatric Care"
        },
        {
            text: isArabic
                ? "كانت تجربتنا إيجابية للغاية مع الدكتورة دعاء في عيادة سمايل للمشاهير. كان ابننا البالغ من العمر ثلاث سنوات يتألم وكان متردداً في الجلوس على كرسي الأسنان. كانت الدكتورة دعاء رائعة معه تماماً."
                : "We had an incredibly positive experience with Dr. Dua at Celebrity Smile Dental Clinic. Our three-year-old son was in pain and initially very reluctant (as expected!) to sit in the dental chair. Dr. Dua was absolutely brilliant with him. She has a remarkable way with children—she was patient, gentle, and managed to convince him to sit and cooperate through the entire procedure. She successfully completed the necessary filling without any distress. Alhamdulillah, we are so relieved and grateful for her skill and wonderful bedside manner. If you need a dentist who is fantastic with young children, look no further than Dr. Dua!",
            author: "Nafiya P",
            rating: 5,
            badge: isArabic ? "ذكرت د. دعاء" : "Mentioned Dr. Dua",
            date: isArabic ? "منذ يومين" : "2 days ago"
        },

        {
            text: isArabic
                ? "قمت بعلاج أسنان أطفالي عند الدكتورة دعاء محمد لأكثر من سن وعلى عدة زيارات. ممتازة وتعاملها مع الأطفال راقي."
                : "I had my children's teeth done by Dr. Doaa Mohamed for more than one tooth and over several visits. She is excellent and her interaction with children is outstanding.",
            author: "FAZ FAZ",
            rating: 5,
            badge: isArabic ? "ذكرت د. دعاء" : "Mentioned Dr. Dua"
        },
        {
            text: isArabic
                ? "كان لابنتي الصغيرة موعد مع الدكتورة دعاء. كانت في الموعد المحدد وكانت الخدمة ممتازة. لم تشعر ابنتي بأي ألم حيث عالجت 3 أسنان وخرجت سعيدة. السعر جيد أيضًا."
                : "My little daughter had an appointment with Dr. Duaa. She was on time and the service was excellent. My daughter did not feel any pain as she treated 3 teeth and left happy. The price is also good.",
            author: "Ahmed maily",
            rating: 5,
            badge: isArabic ? "ذكرت د. دعاء" : "Mentioned Dr. Dua"
        },
        {
            text: isArabic
                ? "أود أن أشكر الدكتورة دعاء، طبيبة أسنان الأطفال، على صبرها وطريقة تعاملها مع الطفل وتشجيعها له، وما شاء الله أخلاقها ويدها خفيفة كالحرير."
                : "I would like to thank Dr. Doaa, a pediatric dentist, for her patience, her way of dealing with the child, her encouragement of him, and, God willing, her manners and her hands are as soft as silk.",
            author: "Rawan Al",
            rating: 5,
            badge: isArabic ? "ذكرت د. دعاء" : "Mentioned Dr. Dua"
        },
        {
            text: isArabic
                ? "المركز بشكل عام رائع من حيث المواعيد والاستقبال. تجربتي كانت مع الدكتورة دعاء، التي قامت بعمل ممتاز في أسنان بناتي، وكان تعاملها مع الأطفال أكثر من رائع."
                : "The center is generally great in terms of appointments and reception. My experience was with Dr. Duaa, who did excellent work on my daughters’ teeth, and her treatment of the children was more than wonderful.",
            author: isArabic ? "أميرة الحارثي" : "Amira Al-Harthy",
            rating: 5,
            badge: isArabic ? "ذكرت د. دعاء" : "Mentioned Dr. Dua"
        }
    ];

    return (
        <div className={`min-h-screen flex flex-col`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Navigation />

            <Helmet>
                <title>{isArabic ? "طبيب أسنان أطفال في السعودية | رعاية أسنان لطيفة للأطفال" : "Pediatric Dentist in Saudi Arabia | Child-Friendly Dental Care"}</title>
                <meta name="description" content={isArabic ? "عيادة سمايل للمشاهير تقدم رعاية أسنان لطيفة للأطفال والرضع والمراهقين. العناية الوقائية، الحشوات، علاجات العصب، والمزيد في بيئة آمنة." : "Celebrity Smile provides gentle pediatric dentistry for babies, children, and teens. Preventive care, fillings, pulpectomy, crowns, trauma care & more."} />
                <meta name="keywords" content={isArabic ? "طبيب أسنان أطفال جدة, أسنان أطفال السعودية, عيادة أسنان أطفال" : "pediatric dentist Saudi Arabia, kids dentist Jeddah, child dental care Saudi, pediatric dentistry"} />

                {/* Google tag (gtag.js) */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-WK213FF0FJ"></script>
                <script>
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-WK213FF0FJ');
                  `}
                </script>
            </Helmet>

            {/* 1. Hero Section */}
            <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
                {/* Navbar Background Overlay */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-600/90 to-transparent z-10" />

                <div className="absolute inset-0 bg-[url('/bg-doodles.png')] opacity-5 pointer-events-none"></div>
                <div className="container mx-auto px-4 pt-32 pb-12 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        {/* Left Side (Image - Desktop Right / Mobile Top due to order) */}
                        <motion.div
                            className="order-1 md:order-2 relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative aspect-auto md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                                {/* Placeholder for Hero Image */}
                                <img
                                    src="/landingPage.jpg"
                                    alt="Happy Child at Dentist"
                                    className="w-full h-full object-cover bg-blue-100"
                                    onError={(e) => {
                                        e.currentTarget.src = "/pediatric.png"; // Fallback
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Right Side (Text - Desktop Left / Mobile Bottom) */}
                        <motion.div
                            className="order-2 md:order-1"
                            variants={fadeIn}
                            initial="initial"
                            animate="animate"
                        >
                            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                                {isArabic ? "طب أسنان الأطفال المتخصص" : "Specialized Pediatric Dentistry"}
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#2D3748] mb-6 leading-tight">
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
                                <Button
                                    size="lg"
                                    onClick={handleWhatsApp}
                                    className="bg-[#FD3DB5] hover:bg-[#d63499] text-white rounded-full px-8 text-lg h-14 shadow-lg hover:shadow-xl transition-all"
                                >
                                    <Calendar className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                    {isArabic ? "حجز موعد للأطفال" : "Book Pediatric Appointment"}
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={handleCall}
                                    className="rounded-full px-8 text-lg h-14 border-2 border-blue-400 text-blue-600 hover:bg-blue-50"
                                >
                                    <Phone className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                    {isArabic ? "اتصل الآن" : "Call Now"}
                                </Button>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* 2. Why Choose Celebrity Smile */}
            <section className="py-12 md:py-20 bg-white">
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
            <section className="py-12 md:py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
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
                                        src="https://res.cloudinary.com/dkxmfqafi/image/upload/v1766085915/celebrity_smile/doctors/kbc9blzdkj0f8q2b3pur.png"
                                        alt="Dr. Doaa Mohammed"
                                        className="w-full h-full object-contain pt-4 hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2670&auto=format&fit=crop"; // Fallback
                                        }}
                                    />
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                                    <h3 className="text-2xl font-bold">{doctor ? (isArabic ? doctor.nameAr : doctor.name) : (isArabic ? "الدكتورة / دعاء محمد" : "Dr. Doaa Mohammed")}</h3>
                                    <p className="opacity-90">{isArabic ? "أخصائية طب أسنان أطفال" : "Pediatric Dental Specialist"}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                                {isArabic ? "أخصائي طب أسنان الأطفال" : "Child Specialist Pediatric Dentist"}
                            </h2>
                            <p className={`text-xl text-gray-600 mb-8 italic border-${isRTL ? 'r' : 'l'}-4 border-yellow-300 p${isRTL ? 'r' : 'l'}-4 py-2 bg-yellow-50 rounded-${isRTL ? 'l' : 'r'}-lg`}>
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

            {/* 5. Google Reviews Style Section */}
            <section className="py-12 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    {/* Google Reviews Header */}
                    <div className="flex flex-col items-center justify-center mb-12 space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
                            {isArabic ? "ثقة الآباء، محبة الأطفال" : "Trusted by Parents, Loved by Kids"}
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-800">5.0</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 fill-[#FBBC04] text-[#FBBC04]" />
                                ))}
                            </div>
                        </div>
                        <div className="text-gray-600 text-sm">
                            {isArabic ? "بناءً على مراجعات موثقة لخدمات الأطفال" : "Based on verified reviews for Pediatric Services"}
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            <span className="text-sm font-medium text-gray-500">powered by</span>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                                alt="Google"
                                className="h-6 w-auto"
                            />
                        </div>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <Carousel
                            className="w-full"
                            opts={{
                                direction: isRTL ? 'rtl' : 'ltr',
                                loop: true
                            }}
                        >
                            <CarouselContent className={isRTL ? "-mr-4" : "-ml-4"}>
                                {testimonials.map((t, i) => (
                                    <CarouselItem key={i} className={`${isRTL ? "pr-4" : "pl-4"} md:basis-1/2 lg:basis-1/3`}>
                                        <ReviewCard
                                            t={t}
                                            i={i}
                                            isArabic={isArabic}
                                            isRTL={isRTL}
                                            onReadMore={(review) => setSelectedReview(review)}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className={`hidden md:flex ${isRTL ? 'right-0 left-auto translate-x-12 rotate-180' : 'left-0 -translate-x-12'}`} />
                            <CarouselNext className={`hidden md:flex ${isRTL ? 'left-0 right-auto -translate-x-12 rotate-180' : 'right-0 translate-x-12'}`} />
                        </Carousel>

                    </div>
                </div>
            </section>

            {/* 6. FAQ Section */}
            <section className="py-12 md:py-20 bg-white">
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

            {/* 7. Final CTA */}
            <section className="pt-16 md:py-24 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        {isArabic ? "امنح طفلك ابتسامة صحية وواثقة" : "Give Your Child a Healthy, Confident Smile"}
                    </h2>
                    <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                        {isArabic
                            ? "احجز موعداً اليوم في عيادة سمايل للمشاهير، جدة."
                            : "Book your appointment today at Celebrity Smile Clinic, Jeddah."}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            size="lg"
                            onClick={handleWhatsApp}
                            className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-10 text-lg h-14 font-bold"
                        >
                            {isArabic ? "احجز موعد" : "Book Appointment"}
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={handleCall}
                            className="border-2 border-white text-white hover:bg-white/10 rounded-full px-10 text-lg h-14 font-bold bg-transparent"
                        >
                            {isArabic ? "اتصل بنا" : "Call Now"}
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />

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
                                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>

                            <div className="p-8 md:p-10">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-3xl">
                                        {selectedReview.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{selectedReview.author}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
                                                ))}
                                            </div>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-sm text-gray-500">
                                                {/* @ts-ignore */}
                                                {selectedReview.date || "Recent Review"}
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

            {/* Appointment Dialog */}
            <Dialog open={isAppointmentOpen} onOpenChange={setIsAppointmentOpen}>
                <DialogContent className="sm:max-w-xl p-0 bg-transparent border-none shadow-none [&>button]:hidden">
                    <AppointmentForm
                        onClose={() => setIsAppointmentOpen(false)}
                        source="Pediatric Dentistry Page"
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PediatricDentistry;
