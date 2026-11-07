import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageSquare, Linkedin } from "lucide-react";
import { trackBookAppointment } from "@/utils/analytics";
import { Reveal } from "@/components/brand/Reveal";

const Footer = () => {
  const { t, language } = useLanguage();

  const handleBook = () => {
    trackBookAppointment("footer");
    const message =
      language === "ar" ? "مرحباً! أود حجز موعد." : "Hello! I would like to book an appointment.";
    window.open(`https://wa.me/966556005567?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <footer className="relative mt-24 bg-ink text-ivory">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gold/60" />
      <div className="container mx-auto px-4 pb-10 pt-16 md:pt-20">
        <Reveal className="flex flex-col items-start justify-between gap-8 border-b border-ivory/10 pb-14 md:flex-row md:items-end">
          <h2 className="max-w-xl font-display text-4xl font-medium leading-tight md:text-5xl">
            {t("footerCtaTitle")}
          </h2>
          <button
            type="button"
            onClick={handleBook}
            className="shrink-0 rounded-sm bg-ivory px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            {t("bookOnWhatsApp")}
          </button>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 pt-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* About Section */}
          <div>
            <img
              src="/CSDC-LOGO.png"
              alt="CSDC Logo"
              className="mb-5 h-16 w-auto rounded-sm bg-ivory px-3 py-2"
            />
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-ivory/65">
              {t("aboutDescription")}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.instagram.com/csdsjed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/60 transition-colors hover:text-gold"
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
                className="text-ivory/60 transition-colors hover:text-gold"
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
                className="text-ivory/60 transition-colors hover:text-gold"
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
                className="text-ivory/60 transition-colors hover:text-gold"
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
                className="text-ivory/60 transition-colors hover:text-gold"
                aria-label="Snapchat"
              >
                <div className="h-5 w-5 flex items-center justify-center">
                  <img
                    src="/snapchat.svg"
                    alt="Snapchat"
                    className="h-5 w-5 opacity-60 brightness-0 invert transition-opacity hover:opacity-100"
                  />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/company/celebrity-smile-dental-clinic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/60 transition-colors hover:text-gold"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@csdsjed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/60 transition-colors hover:text-gold"
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
                className="text-ivory/60 transition-colors hover:text-gold"
                aria-label="Google Maps"
              >
                <MapPin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">{t("footerQuickLinks")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/services"
                  className="text-ivory/60 transition-colors hover:text-gold"
                >
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="text-ivory/60 transition-colors hover:text-gold"
                >
                  {t("doctors")}
                </Link>
              </li>
              <li>
                <Link
                  to="/offers"
                  className="text-ivory/60 transition-colors hover:text-gold"
                >
                  {t("offers")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-ivory/60 transition-colors hover:text-gold"
                >
                  {t("blog")}
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">{t("footerContact")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://maps.app.goo.gl/dtoZJDHLwrRfMZVA9?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5 transition-colors" />
                  <span className="text-ivory/70 transition-colors group-hover:text-ivory">
                    {language === 'ar'
                      ? 'شارع الأجواد، حي السامر، جدة 23462، المملكة العربية السعودية'
                      : 'Al Ajwad St, Al Samir District, Jeddah, 23462, Saudi Arabia'
                    }
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:0122720100"
                  className="flex items-center gap-3 group"
                >
                  <Phone className="h-5 w-5 text-gold flex-shrink-0 transition-colors" />
                  <span className="text-ivory/70 transition-colors group-hover:text-ivory" dir={language === 'ar' ? 'ltr' : 'auto'}>
                    {language === 'ar' ? '012 272 0100' : '012 272 0100'}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+966556005567"
                  className="flex items-center gap-3 group"
                >
                  <MessageSquare className="h-5 w-5 text-gold flex-shrink-0 transition-colors" />
                  <span className="text-ivory/70 transition-colors group-hover:text-ivory" dir={language === 'ar' ? 'ltr' : 'auto'}>
                    +966 55 600 5567
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@celebritysmile.sa"
                  className="flex items-center gap-3 group"
                >
                  <Mail className="h-5 w-5 text-gold flex-shrink-0 transition-colors" />
                  <span className="text-ivory/70 transition-colors group-hover:text-ivory">
                    info@celebritysmile.sa
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 border-t border-ivory/10 pt-8">
          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <img src="/payment/mada.png" alt="Mada" className="h-9 w-auto rounded-sm bg-white object-contain px-2 py-1" />
            <img src="/payment/visa.png" alt="Visa" className="h-9 w-auto rounded-sm bg-white object-contain px-2 py-1" />
            <img src="/payment/clipart.png" alt="Mastercard" className="h-9 w-auto rounded-sm bg-white object-contain px-2 py-1" />
            <img src="/payment/applepay.png" alt="Apple Pay" className="h-9 w-auto rounded-sm bg-white object-contain px-2 py-1" />
            <img src="/payment/americanexpress.png" alt="American Express" className="h-9 w-auto rounded-sm bg-white object-contain px-2 py-1" />
            <img src="/payment/tabby.png" alt="Tabby" className="h-9 w-auto rounded-sm bg-white object-contain px-2 py-1" />
            <img src="/payment/thamara.png" alt="Tamara" className="h-9 w-auto rounded-sm bg-white object-contain px-2 py-1" />
          </div>

          <p className="text-center text-xs text-ivory/50">
            © {new Date().getFullYear()} {language === "ar" ? "مجمع ابتسامة المشاهير الطبي" : "Celebrity Smile Dental Clinic"}.{" "}
            {t("footerRights")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
