import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllBlogs, type BlogPost, type Author } from "@/api/blog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

interface BlogCardProps {
  limit?: number;
  showViewAll?: boolean;
}

export const BlogCard = ({ limit = 3, showViewAll = true }: BlogCardProps) => {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllBlogs();
        // Filter only published posts and get the latest ones
        const publishedPosts = data
          .filter((post) => post.published)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit);
        setPosts(publishedPosts);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        toast({
          variant: "destructive",
          title: language === 'ar' ? 'خطأ' : 'Error',
          description: language === 'ar'
            ? 'حدث خطأ أثناء تحميل المقالات'
            : 'Failed to load blog posts',
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
          <Card key={i} className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />
              <Skeleton className="h-4 w-1/3 mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        {language === 'ar' ? 'حدث خطأ أثناء تحميل المقالات' : 'Error loading blog posts'}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {language === 'ar' ? 'لا توجد مقالات متاحة حالياً' : 'No blog posts available'}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post._id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                {typeof post.authorId === 'object' && post.authorId.image?.url && (
                  <img
                    src={post.authorId.image.url}
                    alt={language === 'ar' ? post.authorId.nameAr : post.authorId.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div className="text-sm">
                  <div className="font-medium">
                    {typeof post.authorId === 'object'
                      ? language === 'ar'
                        ? post.authorId.nameAr
                        : post.authorId.name
                      : 'Unknown Author'}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {new Date(post.date).toLocaleDateString(
                      language === 'ar' ? 'ar-EG' : 'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }
                    )}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {language === 'ar' && post.titleAr ? post.titleAr : post.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {language === 'ar' && post.contentAr
                  ? post.contentAr.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'
                  : post.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'}
              </p>
              <div className="mt-auto pt-4 border-t">
                <Button asChild variant="link" className="p-0">
                  <Link to={`/blog/${post._id}`} className="flex items-center">
                    {language === 'ar' ? (
                      <>
                        <span>اقرأ المزيد</span>
                        <ArrowRight className="mr-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>Read More</span>
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {showViewAll && (
        <div className="text-center mt-8">
          <Link to="/blog">
            <Button variant="default">
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default BlogCard;
