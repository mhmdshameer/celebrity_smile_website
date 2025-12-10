import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogPost, type BlogPost } from "@/api/blog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { Author } from "@/api/blog";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to get author information
  const getAuthorInfo = (authorId: string | Author) => {
    if (!authorId) {
      return {
        name: 'Unknown Author',
        nameAr: 'مؤلف غير معروف',
        image: null
      };
    }
    if (typeof authorId === 'string') {
      return {
        name: 'Loading...',
        nameAr: '...',
        image: null
      };
    }
    return {
      name: authorId.name || 'Unknown Author',
      nameAr: authorId.nameAr || 'مؤلف غير معروف',
      image: authorId.image
    };
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getBlogPost(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast({
          variant: "destructive",
          title: isArabic ? "خطأ" : "Error",
          description: isArabic
            ? "حدث خطأ أثناء تحميل المقال"
            : "Failed to load blog post",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, isArabic]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
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

        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <div className="flex items-center space-x-4 mb-8">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-64 w-full mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center w-full overflow-x-hidden">
        <Navigation />
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">
            {isArabic ? "المقال غير موجود" : "Post not found"}
          </h1>
          <p className="text-muted-foreground">
            {isArabic
              ? "عذراً، لم يتم العثور على المقال المطلوب."
              : "Sorry, the requested blog post could not be found."}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src={post.featuredImage?.url || "/blog.jpg"}
          alt={isArabic && post.titleAr ? post.titleAr : post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#FD3DB5] opacity-20" />
      </section>

      <main className="flex-1 py-12">
        <article className="container mx-auto px-4 max-w-4xl">
          <header className="mb-10 border-b pb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              {isArabic && post.titleAr ? post.titleAr : post.title}
            </h1>

            <div className="flex items-center gap-4">
              {post.authorId && (
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-primary/10 overflow-hidden shadow-sm">
                    {getAuthorInfo(post.authorId).image?.url ? (
                      <img
                        src={getAuthorInfo(post.authorId).image?.url}
                        alt={isArabic ? getAuthorInfo(post.authorId).nameAr : getAuthorInfo(post.authorId).name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                        {getAuthorInfo(post.authorId).name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col">
                {post.authorId && (
                  <span className="font-bold text-lg text-foreground">
                    {isArabic ? getAuthorInfo(post.authorId).nameAr : getAuthorInfo(post.authorId).name}
                  </span>
                )}

                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  <span>
                    {new Date(post.date).toLocaleDateString(
                      isArabic ? "ar-EG" : "en-US",
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div
            className="prose max-w-none [&_img]:max-w-full [&_img]:h-auto [&_iframe]:w-full [&_iframe]:aspect-video [&_video]:w-full"
            dangerouslySetInnerHTML={{
              __html: isArabic && post.contentAr ? post.contentAr : post.content
            }}
          />
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
