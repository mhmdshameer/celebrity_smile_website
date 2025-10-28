import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllBlogs, type BlogPost } from "@/api/blog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface BlogCardProps {
  limit?: number;
  showViewAll?: boolean;
}

export const BlogCard = ({ limit = 3, showViewAll = true }: BlogCardProps) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs();
        const publishedPosts = data
          .filter((post) => post.published)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit);
        setPosts(publishedPosts);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
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
    fetchPosts();
  }, [language, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden rounded-2xl shadow-sm">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        {isArabic ? "حدث خطأ أثناء تحميل المقالات" : "Error loading blog posts"}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {isArabic ? "لا توجد مقالات متاحة حالياً" : "No blog posts available"}
      </div>
    );
  }

  return (
    <>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="h-full flex flex-col bg-background border border-muted/20 hover:border-primary/30 transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg">
              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-semibold mb-4 line-clamp-2 text-primary group-hover:text-primary/90 transition-colors">
                  {language === "ar" && post.titleAr ? post.titleAr : post.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed min-h-[4.5rem]">
                  {language === "ar" && post.contentAr
                    ? post.contentAr.replace(/<[^>]*>?/gm, "").substring(0, 280) + "..."
                    : post.content.replace(/<[^>]*>?/gm, "").substring(0, 280) + "..."}
                </p>

                {/* Author Info */}
                {typeof post.authorId === "object" && (
                  <div className="mt-auto flex items-center gap-3 pt-4 border-t border-muted/30">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted/50 flex-shrink-0">
                      {post.authorId.image?.url ? (
                        <img
                          src={post.authorId.image.url}
                          alt={isArabic ? post.authorId.nameAr : post.authorId.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                          {post.authorId.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {isArabic ? post.authorId.nameAr || post.authorId.name : post.authorId.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString(
                          isArabic ? "ar-EG" : "en-US",
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {showViewAll && (
        <div className="text-center mt-12">
          <Link to="/blog">
            <Button size="lg" className="font-medium">
              {isArabic ? "عرض جميع المقالات" : "View All Posts"}
              <ArrowRight
                className={`ml-2 h-5 w-5 transition-transform ${
                  isArabic ? "rotate-180 mr-2 ml-0" : ""
                }`}
              />
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default BlogCard;
