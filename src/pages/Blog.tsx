import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  const { t, language } = useLanguage();

  const blogPosts = [
    {
      title: "5 Tips for Maintaining Healthy Teeth",
      titleAr: "5 نصائح للحفاظ على أسنان صحية",
      excerpt: "Learn essential daily habits that will keep your teeth healthy and strong for years to come.",
      excerptAr: "تعرف على العادات اليومية الأساسية التي ستحافظ على صحة وقوة أسنانك لسنوات قادمة.",
      date: "March 15, 2025",
      dateAr: "15 مارس 2025",
      category: "Dental Care",
      categoryAr: "العناية بالأسنان",
    },
    {
      title: "The Benefits of Regular Dental Checkups",
      titleAr: "فوائد الفحوصات الدورية للأسنان",
      excerpt: "Discover why regular visits to your dentist are crucial for maintaining optimal oral health.",
      excerptAr: "اكتشف لماذا الزيارات المنتظمة لطبيب الأسنان ضرورية للحفاظ على صحة الفم المثالية.",
      date: "March 10, 2025",
      dateAr: "10 مارس 2025",
      category: "Prevention",
      categoryAr: "الوقاية",
    },
    {
      title: "Understanding Teeth Whitening Options",
      titleAr: "فهم خيارات تبييض الأسنان",
      excerpt: "A comprehensive guide to different teeth whitening methods and what works best for you.",
      excerptAr: "دليل شامل لطرق تبييض الأسنان المختلفة وما هو الأفضل لك.",
      date: "March 5, 2025",
      dateAr: "5 مارس 2025",
      category: "Cosmetic Dentistry",
      categoryAr: "طب الأسنان التجميلي",
    },
    {
      title: "Dental Implants: Everything You Need to Know",
      titleAr: "زراعة الأسنان: كل ما تحتاج معرفته",
      excerpt: "Complete information about dental implants, the procedure, and what to expect.",
      excerptAr: "معلومات كاملة عن زراعة الأسنان والإجراءات وما يمكن توقعه.",
      date: "February 28, 2025",
      dateAr: "28 فبراير 2025",
      category: "Implants",
      categoryAr: "الزراعة",
    },
    {
      title: "How to Care for Your Child's Teeth",
      titleAr: "كيفية العناية بأسنان طفلك",
      excerpt: "Essential tips for parents to ensure their children develop healthy dental habits.",
      excerptAr: "نصائح أساسية للآباء لضمان تطوير أطفالهم لعادات صحية للأسنان.",
      date: "February 20, 2025",
      dateAr: "20 فبراير 2025",
      category: "Pediatric",
      categoryAr: "طب أسنان الأطفال",
    },
    {
      title: "Common Dental Problems and Solutions",
      titleAr: "مشاكل الأسنان الشائعة والحلول",
      excerpt: "Learn about common dental issues and how modern dentistry can solve them.",
      excerptAr: "تعرف على مشاكل الأسنان الشائعة وكيف يمكن لطب الأسنان الحديث حلها.",
      date: "February 15, 2025",
      dateAr: "15 فبراير 2025",
      category: "General",
      categoryAr: "عام",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/blog.jpg"
            alt="Dental Health Blog"
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
              {language === "ar" ? "مدونة صحة الأسنان" : "Dental Health Blog"}
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-primary">
              {language === "ar" ? "نصائح ومعلومات قيمة" : "Valuable Tips & Information"}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {language === "ar"
                ? "اكتشف أحدث النصائح والمعلومات حول صحة الأسنان والعناية بالفم. مقالاتنا المفيدة تغطي مجموعة واسعة من المواضيع لمساعدتك في الحفاظ على ابتسامة صحية وجميلة."
                : "Discover the latest tips and information about dental health and oral care. Our informative articles cover a wide range of topics to help you maintain a healthy and beautiful smile."
              }
            </p>
          </div>
        </div>
      </section>

      <div className="flex-1 container mx-auto px-4 pt-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{language === "ar" ? post.dateAr : post.date}</span>
                </div>
                <div className="inline-block mb-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {language === "ar" ? post.categoryAr : post.category}
                  </span>
                </div>
                <CardTitle className="text-xl line-clamp-2">
                  {language === "ar" ? post.titleAr : post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="flex-1 line-clamp-3 mb-4">
                  {language === "ar" ? post.excerptAr : post.excerpt}
                </CardDescription>
                <Button variant="ghost" className="w-full justify-between group">
                  {language === "ar" ? "اقرأ المزيد" : "Read More"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
