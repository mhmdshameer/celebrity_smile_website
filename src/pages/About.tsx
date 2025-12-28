import { motion } from "framer-motion";
import { Check, Heart, Shield, Star, Users, Award, Target, Eye } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
    const { language } = useLanguage();
    const isRtl = language === "ar";

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <Helmet>
                <title>{language === "ar" ? "من نحن | مجمع ابتسامة المشاهير الطبي" : "About Us | Celebrity Smile Dental Clinic"}</title>
                <meta
                    name="description"
                    content={language === "ar" ? "تعرف على رؤية ورسالة وقيم مجمع ابتسامة المشاهير الطبي." : "Learn about Celebrity Smile Dental Clinic's vision, mission, and values."}
                />
            </Helmet>

            <Navigation />

            {/* Hero Section - Height reduced for tighter feel */}
            <section className="relative h-[400px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/CLINIC PHOTO.jpeg"
                        alt="Celebrity Smile Dental Clinic"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#FD3DB5] opacity-20" />
                </div>
            </section>

            {/* Content Section - Reduced padding and refined typography */}
            <section className="relative bg-background py-10">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Lighter font weights for elegance */}
                            <h1 className="text-3xl md:text-5xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                                {language === "ar" ? "مجمع ابتسامة المشاهير الطبي" : "Celebrity Smile Dental Clinic"}
                            </h1>
                            <h2 className="text-lg md:text-2xl font-medium mb-4 text-primary/90">
                                {language === "ar" ? "من نحن" : "About Us"}
                            </h2>
                            <p className="text-base md:text-lg leading-relaxed text-muted-foreground font-light max-w-2xl mx-auto">
                                {language === "ar"
                                    ? "نحن ملتزمون بتقديم أفضل رعاية لأسنانك باستخدام أحدث التقنيات وفريق طبي متميز."
                                    : "We are committed to providing the best dental care using the latest technology and an outstanding medical team."}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission - Reduced gaps and padding */}
            <section className="py-8 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-card/50 hover:bg-card transition-colors p-8 rounded-xl border border-border/40 text-center"
                        >
                            <div className="mx-auto h-12 w-12 bg-primary/5 rounded-full flex items-center justify-center mb-4 text-primary">
                                <Eye size={24} />
                            </div>
                            <h2 className="text-2xl font-semibold mb-3 text-foreground">
                                {language === "ar" ? "الرؤية" : "Vision"}
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed font-light">
                                {language === "ar"
                                    ? "تقديم رعاية أسنان آمنة وعالية الجودة وفق معايير سباهي."
                                    : "Providing safe and high-quality dental care in accordance with CBAHI standards."}
                            </p>
                        </motion.div>

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-card/50 hover:bg-card transition-colors p-8 rounded-xl border border-border/40 text-center"
                        >
                            <div className="mx-auto h-12 w-12 bg-primary/5 rounded-full flex items-center justify-center mb-4 text-primary">
                                <Target size={24} />
                            </div>
                            <h2 className="text-2xl font-semibold mb-3 text-foreground">
                                {language === "ar" ? "الرسالة" : "Mission"}
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed font-light">
                                {language === "ar"
                                    ? "تقديم خدمات طب أسنان متكاملة تتمحور حول المريض، مع الالتزام بسلامة المرضى وجودة الرعاية الصحية."
                                    : "Providing comprehensive dental services centered around the patient, with a strong commitment to patient safety and quality of healthcare."}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Goals - Integrated look, less whitespace */}
            <section className="py-12 bg-muted/20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center justify-center p-3 bg-background rounded-full shadow-sm mb-6 text-primary">
                            <Award size={28} />
                        </div>
                        <h2 className="text-3xl font-semibold mb-4 text-foreground">{language === "ar" ? "الأهداف" : "Goals"}</h2>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                            {language === "ar"
                                ? "رفع جودة الرعاية الصحية وتحقيق رضا المرضى وفق أفضل الممارسات الصحية المعتمدة."
                                : "Improving the quality of healthcare and achieving patient satisfaction in accordance with best approved healthcare practices."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Values - Tighter grid */}
            <section className="py-16 px-4 mb-auto">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-semibold mb-2">{language === "ar" ? "القيم" : "Values"}</h2>
                        <div className="w-12 h-1 bg-primary/20 mx-auto rounded-full" />
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                    >
                        {(language === "ar" ? [
                            { text: "سلامة المريض", icon: Shield },
                            { text: "الجودة", icon: Star },
                            { text: "الاحترام", icon: Heart },
                            { text: "المهنية", icon: Award },
                            { text: "العمل الجماعي", icon: Users },
                            { text: "المسؤولية", icon: Check }
                        ] : [
                            { text: "Patient Safety", icon: Shield },
                            { text: "Quality", icon: Star },
                            { text: "Respect", icon: Heart },
                            { text: "Professionalism", icon: Award },
                            { text: "Teamwork", icon: Users },
                            { text: "Responsibility", icon: Check }
                        ]).map((value, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className="bg-card hover:bg-primary hover:text-primary-foreground p-5 rounded-lg shadow-sm border border-border/40 flex flex-col items-center justify-center text-center gap-3 transition-all duration-300"
                            >
                                <div className="p-2 bg-secondary/50 rounded-full group-hover:bg-primary-foreground/10 transition-colors">
                                    <value.icon size={20} className="text-primary group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-medium text-sm md:text-base">{value.text}</h3>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
