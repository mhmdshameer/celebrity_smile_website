import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";

const BlogPreview = () => {
  return (
    <motion.section
      className="py-20"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className={`text-4xl font-bold text-primary`}>Latest From Our Blog</h2>
            <Link to="/blog">
              <Button variant="default">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <BlogCard limit={3} showViewAll={false} />
        </div>
      </div>
    </motion.section>
  );
};

export default BlogPreview;
