import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DepartmentsPreview = () => {
  const departments = [
    {
      name: "Restorative Department",
      description: "Advanced cosmetic and restorative treatments to bring back your smile"
    },
    {
      name: "Surgical Department",
      description: "Advanced surgical procedures with a team of experts"
    },
    {
      name: "Orthodontic Department",
      description: "Modern orthodontic solutions for proper alignment"
    }
  ];

  return (
    <motion.section
      className="py-20 bg-background"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-transparent mb-4">
            Our Departments
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our specialized departments for your dental care
          </p>
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: index * 0.1,
                  duration: 0.5
                }
              }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-900/30 flex-shrink-0 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                      <img 
                        src="/favicon.png" 
                        alt={dept.name} 
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {dept.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    {dept.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/departments">
            <Button size="lg" className="text-lg px-8 py-5 group">
              View All Departments
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default DepartmentsPreview;
