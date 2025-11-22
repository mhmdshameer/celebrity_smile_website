import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { getAllBlogs, type BlogPost } from "@/api/blog";
import { Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

const Blog = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs();
        const published = data
          .filter((post) => post.published)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setBlogs(published);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast({
          variant: "destructive",
          title: isArabic ? "خطأ" : "Error",
          description: isArabic
            ? "حدث خطأ أثناء تحميل المقالات"
            : "Failed to load blog posts",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [language]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src="/blog.jpg"
          alt="Dental Health Blog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#FD3DB5] opacity-20" />
      </section>

      {/* Header Section */}
      <section className="bg-background py-16 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {isArabic ? "مدونة صحة الأسنان" : "Dental Health Blog"}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-primary">
            {isArabic ? "نصائح ومعلومات قيمة" : "Valuable Tips & Information"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {isArabic
              ? "استكشف أحدث المقالات حول صحة الفم والعناية بالأسنان. نقدم لك محتوى موثوقًا يساعدك على الحفاظ على ابتسامة صحية ومشرقة."
              : "Explore our latest articles on oral health and dental care. We provide trusted content to help you maintain a bright, healthy smile."}
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="container mx-auto px-4 max-w-5xl py-20 space-y-16">
        {loading ? (
          <div className="space-y-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-muted-foreground text-lg">
            {isArabic ? "لا توجد مقالات متاحة حالياً" : "No blog posts available yet"}
          </div>
        ) : (
          blogs.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              dir={isArabic ? "rtl" : "ltr"}
              className="bg-card border border-muted/20 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
            

              {/* Content */}
              <div className="p-8">
                

                <h2 className="text-3xl font-bold mb-4 text-primary leading-snug">
                  {isArabic && post.titleAr ? post.titleAr : post.title}
                </h2>

                {/* Blog Content */}
                <div
                  className="prose max-w-none text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html:
                      isArabic && post.contentAr
                        ? post.contentAr
                        : post.content,
                  }}
                />

                {/* Author Info */}
                {typeof post.authorId === "object" && (
                  <div className="mt-8 flex items-center justify-between border-t pt-4 border-muted/30">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted/50 flex-shrink-0">
                        {post.authorId.image?.url ? (
                          <img
                            src={post.authorId.image.url}
                            alt={isArabic ? post.authorId.nameAr : post.authorId.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-lg font-bold">
                            {post.authorId.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-base">
                          {isArabic
                            ? post.authorId.nameAr || post.authorId.name
                            : post.authorId.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isArabic ? "كاتب المقال" : "Author"}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 text-muted-foreground text-sm ${isArabic ? 'mr-auto' : 'ml-auto'}`}>
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.date).toLocaleDateString(
                          isArabic ? "ar-EG" : "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          ))
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
