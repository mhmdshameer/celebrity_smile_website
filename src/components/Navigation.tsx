import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { key: "home", path: "/" },
    { key: "doctors", path: "/doctors" },
    { key: "services", path: "/services" },
    { key: "departments", path: "/departments" },
    { key: "offers", path: "/offers" },
    { key: "priceList", path: "/price-list" },
    { key: "privilegeCard", path: "/privilege-card" },
    { key: "blog", path: "/blog" },
    { key: "contact", path: "/contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled
        ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/CSDC-LOGO.png"
              alt="CSDC Logo"
              className={cn(
                "h-16 w-auto transition-all duration-300",
                !isScrolled && "drop-shadow-lg"
              )}
            />
            {/* <span className="text-2xl font-bold text-primary">Celebrity Smile</span> */}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.key} to={item.path} className="relative">
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-sm transition-colors relative",
                      isActive && "text-primary font-semibold",
                      !isScrolled && "text-white hover:bg-white/20 hover:text-white"
                    )}
                  >
                    {t(item.key)}
                  </Button>
                  {/* Animated underline */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTab"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="default"
              className={cn(
                "transition-all duration-300 font-semibold px-4 py-2 border-2 text-sm",
                "bg-background/80 backdrop-blur-sm",
                isScrolled
                  ? "border-primary text-primary hover:bg-primary hover:text-white shadow-sm"
                  : "border-white/40 text-black hover:bg-white/20 hover:border-white/60 hover:text-white shadow-lg"
              )}
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            >
              {language === "en" ? "العربية" : "English"}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden transition-colors",
                !isScrolled && "text-white hover:bg-white/20 hover:text-white"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={cn(
            "md:hidden py-4 space-y-2",
            !isScrolled && "bg-black/80 backdrop-blur-sm"
          )}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block relative"
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start transition-colors relative",
                      isActive && "text-primary font-semibold",
                      !isScrolled && "text-white hover:bg-white/20 hover:text-white"
                    )}
                  >
                    {t(item.key)}
                  </Button>
                  {/* Animated underline for mobile */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                      layoutId="activeMobileTab"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
