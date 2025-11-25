import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { getAllBlogs, type BlogPost } from "@/api/blog";
import { Calendar, Clock, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Author } from "@/api/blog";

const Blog = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to get author information
  const getAuthorInfo = (authorId: string | Author) => {
    if (!authorId) {
      return { name: 'Unknown Author', nameAr: 'مؤلف غير معروف' };
    }
    if (typeof authorId === 'string') {
      return { name: 'Loading...', nameAr: '...' };
    }
    return {
      name: authorId.name || 'Unknown Author',
      nameAr: authorId.nameAr || 'مؤلف غير معروف'
    };
  };

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
      <section className="container mx-auto px-4 max-w-6xl py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-1/2 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-muted-foreground">
              {isArabic ? "لا توجد مقالات متاحة حالياً" : "No blog posts available yet"}
            </h3>
            <p className="mt-2 text-muted-foreground">
              {isArabic 
                ? "يرجى التحقق مرة أخرى لاحقًا للحصول على محتوى جديد"
                : "Please check back later for new content"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post, index) => (
              <Link to={`/blog/${post._id}`} key={post._id} className="block h-full">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group bg-card border border-muted/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full hover:border-primary/30 p-6"
                >
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <p className="text-xs text-muted-foreground">
                        {isArabic ? getAuthorInfo(post.authorId).nameAr : getAuthorInfo(post.authorId).name}
                      </p>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(
                          isArabic ? "ar-EG" : "en-US",
                          { year: 'numeric', month: 'short', day: 'numeric' }
                        )}
                      </time>
                      {post.readingTime && (
                        <span className="flex items-center ml-4">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readingTime} {isArabic ? 'دقيقة' : 'min read'}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold mb-3 text-primary line-clamp-2">
                      {isArabic && post.titleAr ? post.titleAr : post.title}
                    </h2>

                    <div 
                      className="prose prose-sm dark:prose-invert text-muted-foreground mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: isArabic && post.excerptAr 
                          ? post.excerptAr 
                          : post.excerpt || (isArabic && post.contentAr 
                              ? post.contentAr.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' 
                              : post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...')
                      }}
                    />

                    <div className="mt-auto pt-4 border-t border-muted/20">
                      <span className="inline-flex items-center text-primary font-medium group-hover:underline">
                        {isArabic ? "اقرأ المزيد" : "Read more"}
                        <ArrowRight className={`ml-2 h-4 w-4 ${isArabic ? 'ml-0 mr-2 rotate-180' : ''}`} />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
