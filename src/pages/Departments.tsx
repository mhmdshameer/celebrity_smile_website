import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Departments = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          {t("departments")}
        </h1>
        <p className="text-center text-muted-foreground">Content coming soon...</p>
      </div>

      <Footer />
    </div>
  );
};

export default Departments;
