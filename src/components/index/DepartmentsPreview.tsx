import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DepartmentsPreview = () => {
  const departments = [
    {
      name: "Emergency Care",
      description: "24/7 emergency dental services for urgent care needs.",
    },
    {
      name: "Surgical Department",
      description: "Advanced surgical procedures with expert care.",
    },
    {
      name: "Preventive Care",
      description: "Regular check-ups and preventive treatments.",
    },
  ];

  return (
    <motion.section
      className="py-20 bg-muted/50"
      initial={{ opacity: 0, y: 50, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className={`text-4xl font-bold text-primary`}>Our Departments</h2>
            <Link to="/departments">
              <Button variant="default">
                View All Departments <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-3">{dept.name}</h3>
                <p className="text-muted-foreground">{dept.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DepartmentsPreview;
