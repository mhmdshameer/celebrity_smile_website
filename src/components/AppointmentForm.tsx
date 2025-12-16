import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppointmentFormProps {
  onClose: () => void;
  phoneNumber?: string;
}

export default function AppointmentForm({
  onClose,
  phoneNumber = "966556005567", // ✅ Clinic WhatsApp number
  source = "", // Source of the appointment request
}: AppointmentFormProps & { source?: string }) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      alert(language === "ar" ? "يرجى ملء الحقول المطلوبة" : "Please fill in required fields");
      return;
    }

    const formattedPhoneNumber = "966556005567"; // no "+" or spaces

    const whatsappMessageEn = `
*Appointment Request*
${source ? `📍 Source: ${source}` : ""}

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
${formData.email ? `📧 Email: ${formData.email}` : ""}
${formData.service ? `🦷 Service: ${formData.service}` : ""}
${date ? `📅 Preferred Date: ${format(date, "PPP")}` : ""}
${formData.message ? `📝 Message: ${formData.message}` : ""}
`.trim();

    const whatsappMessageAr = `
*طلب موعد*
${source ? `📍 المصدر: ${source}` : ""}

👤 الاسم: ${formData.name}
📞 رقم الهاتف: ${formData.phone}
${formData.email ? `📧 البريد الإلكتروني: ${formData.email}` : ""}
${formData.service ? `🦷 نوع الخدمة: ${formData.service}` : ""}
${date ? `📅 التاريخ المفضل: ${format(date, "PPP")}` : ""}
${formData.message ? `📝 رسالة إضافية: ${formData.message}` : ""}
`.trim();

    const finalMessage = language === "ar" ? whatsappMessageAr : whatsappMessageEn;

    // 🧠 Important — encode safely for both platforms
    const encodedMessage = encodeURIComponent(finalMessage).replace(/%0A/g, "%0D%0A");

    // ✅ Multi-platform fallback logic
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    let whatsappURL = "";

    if (isMobile) {
      // 📱 Mobile app link
      whatsappURL = `whatsapp://send?phone=${formattedPhoneNumber}&text=${encodedMessage}`;
    } else {
      // 💻 Desktop browsers — fallback to official API
      whatsappURL = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodedMessage}`;
    }

    // 🔥 Open in same tab (works better on desktop than _blank)
    window.location.href = whatsappURL;

    // Reset
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });
    setDate(undefined);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto bg-background/98 backdrop-blur-md border border-primary/30 rounded-xl shadow-2xl p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary">
          {language === "ar" ? "حجز موعد" : "Book Appointment"}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-primary/10 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={language === "ar" ? "الاسم *" : "Name *"}
          required
          className="h-10"
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder={language === "ar" ? "رقم الهاتف *" : "Phone *"}
            required
            className="h-10"
          />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder={language === "ar" ? "البريد الإلكتروني" : "Email"}
            className="h-10"
          />
        </div>

        <Input
          id="service"
          value={formData.service}
          onChange={(e) =>
            setFormData({ ...formData, service: e.target.value })
          }
          placeholder={language === "ar" ? "نوع الخدمة" : "Service type"}
          className="h-10"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-10",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP")
              ) : (
                <span>
                  {language === "ar" ? "اختر تاريخاً" : "Pick a date"}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>

        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder={
            language === "ar" ? "رسالة إضافية..." : "Additional message..."
          }
          rows={2}
          className="resize-none"
        />

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 h-10"
          >
            {language === "ar" ? "إلغاء" : "Cancel"}
          </Button>
          <Button type="submit" className="flex-1 h-10">
            {language === "ar"
              ? "إرسال عبر واتساب"
              : "Send via WhatsApp"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
