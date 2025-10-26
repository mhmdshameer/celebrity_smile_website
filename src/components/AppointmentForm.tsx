import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppointmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phoneNumber?: string;
}

export default function AppointmentForm({ open, onOpenChange, phoneNumber = "1234567890" }: AppointmentFormProps) {
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
    
    // Validate required fields
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert(language === "ar" ? "يرجى ملء الحقول المطلوبة" : "Please fill in required fields");
      return;
    }

    // Format the message for WhatsApp
    const whatsappMessage = `
*Appointment Request*

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
${formData.email ? `📧 Email: ${formData.email}` : ""}
${formData.service ? `🦷 Service: ${formData.service}` : ""}
${date ? `📅 Preferred Date: ${format(date, "PPP")}` : ""}
${formData.message ? `📝 Message: ${formData.message}` : ""}
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

    // Reset form and close
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });
    setDate(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {language === "ar" ? "حجز موعد" : "Book an Appointment"}
                </DialogTitle>
                <DialogDescription>
                  {language === "ar" 
                    ? "املأ النموذج أدناه وسنتواصل معك عبر واتساب" 
                    : "Fill in the form below and we'll contact you via WhatsApp"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {language === "ar" ? "الاسم" : "Name"} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === "ar" ? "أدخل اسمك" : "Enter your name"}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {language === "ar" ? "رقم الهاتف" : "Phone Number"} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={language === "ar" ? "أدخل رقم هاتفك" : "Enter your phone number"}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{language === "ar" ? "البريد الإلكتروني" : "Email"}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">{language === "ar" ? "الخدمة" : "Service"}</Label>
                  <Input
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    placeholder={language === "ar" ? "نوع الخدمة المطلوبة" : "Type of service needed"}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === "ar" ? "التاريخ المفضل" : "Preferred Date"}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>{language === "ar" ? "اختر تاريخاً" : "Pick a date"}</span>}
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{language === "ar" ? "رسالة إضافية" : "Additional Message"}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === "ar" ? "أي تفاصيل إضافية..." : "Any additional details..."}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                    {language === "ar" ? "إلغاء" : "Cancel"}
                  </Button>
                  <Button type="submit" className="flex-1">
                    {language === "ar" ? "إرسال عبر واتساب" : "Send via WhatsApp"}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
