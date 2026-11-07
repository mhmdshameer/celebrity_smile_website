import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { trackBookAppointment } from "@/utils/analytics";

const WHATSAPP_NUMBER = "966556005567";

const menuItems = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "doctors", path: "/doctors" },
  { key: "services", path: "/services" },
  { key: "departments", path: "/departments" },
  { key: "offers", path: "/offers" },
  { key: "priceList", path: "/price-list" },
  { key: "privilegeCard", path: "/privilege-card" },
  { key: "blog", path: "/blog" },
  { key: "contact", path: "/contact" },
];

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep the page from scrolling behind the open mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleBook = () => {
    trackBookAppointment("navigation");
    const message =
      language === "ar" ? "مرحباً! أود حجز موعد." : "Hello! I would like to book an appointment.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en");
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
    >
      <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );

  const languageButton = (
    <button
      type="button"
      onClick={toggleLanguage}
      className="px-2 py-1 text-sm font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
    >
      {language === "en" ? "العربية" : "English"}
    </button>
  );

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-background/95 transition-all duration-500",
        isScrolled && "border-b border-border/70 backdrop-blur supports-[backdrop-filter]:bg-background/80",
      )}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex items-center justify-between gap-6 transition-all duration-500",
            isScrolled ? "h-16" : "h-20",
          )}
        >
          <Link to="/" className="shrink-0" aria-label="Celebrity Smile Dental Clinic">
            <img
              src="/CSDC-LOGO.png"
              alt="CSDC Logo"
              className={cn("w-auto transition-all duration-500 dark:rounded-sm dark:bg-ivory dark:px-2 dark:py-1", isScrolled ? "h-10" : "h-12")}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-5 xl:flex">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
                    isActive ? "text-primary" : "text-foreground/70 hover:text-foreground",
                  )}
                >
                  {t(item.key)}
                  {isActive && (
                    <motion.span
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-gold"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-1 sm:flex">
              {themeButton}
              {languageButton}
            </div>
            <button
              type="button"
              onClick={handleBook}
              className="ms-2 hidden rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold tracking-wide text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 lg:inline-flex"
            >
              {t("bookAppointment")}
            </button>
            <button
              type="button"
              className="ms-1 grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-foreground/5 xl:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu: full-screen ivory sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col bg-background xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
              <img src="/CSDC-LOGO.png" alt="CSDC Logo" className="h-12 w-auto dark:rounded-sm dark:bg-ivory dark:px-2 dark:py-1" />
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-foreground/5"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="container mx-auto flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-4">
              <ul className="flex flex-col">
                {menuItems.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.li
                      key={item.key}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                      className="border-b border-border/60"
                    >
                      <Link
                        to={item.path}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block py-3 font-display text-3xl transition-colors",
                          isActive ? "italic text-primary" : "text-foreground hover:text-primary",
                        )}
                      >
                        {t(item.key)}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {themeButton}
                  {languageButton}
                </div>
                <button
                  type="button"
                  onClick={handleBook}
                  className="rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  {t("bookAppointment")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
