import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <motion.section
      className="py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🦷</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Care</h3>
              <p className="text-muted-foreground">
                Highly qualified dentists with years of experience in all aspects of dental care.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Modern Technology</h3>
              <p className="text-muted-foreground">
                State-of-the-art equipment and advanced techniques for optimal results.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Patient Comfort</h3>
              <p className="text-muted-foreground">
                A welcoming environment where your comfort and satisfaction are our top priorities.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
