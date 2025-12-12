import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageSquare, Linkedin } from "lucide-react";

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-muted/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <img
              src="/CSDC-LOGO.png"
              alt="CSDC Logo"
              className="h-14 w-auto mb-2"
            />
            <p className="text-sm text-muted-foreground mb-4">
              {t("aboutDescription")}
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/csdsjed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100067089760378"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://wa.me/message/5GVMII7DXT37H1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.52 3.48A11.87 11.87 0 0 0 12 0C5.37 0 0 5.37 0 12a11.86 11.86 0 0 0 1.62 5.96L0 24l6.24-1.63A11.87 11.87 0 0 0 12 24c6.63 0 12-5.37 12-12a11.87 11.87 0 0 0-3.48-8.52ZM12 22a9.87 9.87 0 0 1-5.08-1.39l-.36-.21-3.7.97.99-3.61-.23-.37A9.88 9.88 0 0 1 2 12C2 6.49 6.49 2 12 2a9.9 9.9 0 0 1 7.06 2.94A9.9 9.9 0 0 1 22 12c0 5.51-4.49 10-10 10Zm5.05-7.36c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.33-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.05-.22-.53-.44-.46-.62-.47h-.53c-.18 0-.48.07-.73.34s-.96.94-.96 2.28.99 2.64 1.13 2.82c.14.18 1.94 2.96 4.7 4.05 2.77 1.09 2.77.73 3.27.69.5-.04 1.61-.65 1.84-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32Z" />
                </svg>
              </a>
              <a
                href="https://x.com/csdsjed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-black dark:hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="https://t.snapchat.com/zVfBMUhQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-yellow-400 transition-colors"
                aria-label="Snapchat"
              >
                <div className="h-5 w-5 flex items-center justify-center">
                  <img
                    src="/snapchat.svg"
                    alt="Snapchat"
                    className="h-5 w-5 dark:invert dark:brightness-0 dark:opacity-80 opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/company/celebrity-smile-dental-clinic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@csdsjed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-black dark:hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-music-2"
                >
                  <circle cx="8" cy="18" r="4" />
                  <path d="M12 18V2l7.5 4" />
                </svg>
              </a>
              <a
                href="https://maps.app.goo.gl/dtoZJDHLwrRfMZVA9?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-500 transition-colors"
                aria-label="Google Maps"
              >
                <MapPin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("doctors")}
                </Link>
              </li>
              <li>
                <Link
                  to="/offers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("offers")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("blog")}
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footerContact")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://maps.app.goo.gl/dtoZJDHLwrRfMZVA9?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 group"
                >
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 group-hover:text-pink-600 transition-colors" />
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    {language === 'ar'
                      ? '3247 شارع الأجواد، حي الربوة، مكة المكرمة 23462، المملكة العربية السعودية'
                      : '3247 Al Ajawad St, Al Rabi\'a, Makkah 23462, Saudi Arabia'
                    }
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+966556005567"
                  className="flex items-center space-x-3 group"
                >
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 group-hover:text-pink-600 transition-colors" />
                  <span className="text-muted-foreground group-hover:text-primary transition-colors" dir={language === 'ar' ? 'ltr' : 'auto'}>
                    {language === 'ar' ? '+966 55 600 5567' : '+966 55 600 5567'}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ce.sm.dental@gmail.com"
                  className="flex items-center space-x-3 group"
                >
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 group-hover:text-pink-600 transition-colors" />
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    ce.sm.dental@gmail.com
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col items-center gap-6">
          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center items-center gap-4 opacity-80 hover:opacity-100 transition-all duration-300">
            <img src="/payment/americanexpress.png" alt="American Express" className="h-8 w-auto object-contain" />
            <img src="/payment/thamara.png" alt="Tamara" className="h-8 w-auto object-contain" />
            <img src="/payment/tabby.png" alt="Tabby" className="h-8 w-auto object-contain" />
            <img src="/payment/clipart.png" alt="Payment" className="h-8 w-auto object-contain" />
            <img src="/payment/applepay.png" alt="Apple Pay" className="h-8 w-auto object-contain" />
            <img src="/payment/visa.png" alt="Visa" className="h-8 w-auto object-contain" />
            <img src="/payment/mada.png" alt="Mada" className="h-8 w-auto object-contain" />
          </div>

          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} {language === "ar" ? "مجمع ابتسامة المشاهير الطبي" : "Celebrity Smile Dental Clinic"}.{" "}
            {t("footerRights")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
