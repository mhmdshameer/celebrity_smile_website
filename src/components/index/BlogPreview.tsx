import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import { useLanguage } from "@/contexts/LanguageContext";

const BlogPreview = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const title = isArabic
    ? "اكتشف أحدث مدوناتنا عن العناية بالأسنان"
    : "Discover Our Latest Blogs About Dental Care";

  const subtitle = isArabic
    ? "ابقَ على اطلاع من خلال مقالاتنا المفيدة حول صحة الفم والعناية بالأسنان."
    : "Stay updated with our informative articles on oral health and dental care.";

  const viewAll = isArabic ? "عرض جميع المقالات" : "View All Posts";

  return (
    <motion.section
      className="py-24 bg-muted/10"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-14">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Blog Cards */}
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <BlogCard limit={3} showViewAll={false} />
        </motion.div>

      </div>
    </motion.section>
  );
};

export default BlogPreview;
