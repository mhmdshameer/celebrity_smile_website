import { useLanguage } from "@/contexts/LanguageContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getDoctorsApi, type DoctorResponse } from "@/api/doctor";
import { trackBookAppointment } from "@/utils/analytics";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { Reveal } from "@/components/brand/Reveal";
import { DoctorFilters } from "@/components/doctors/DoctorFilters";
import { DoctorPortraitCard } from "@/components/doctors/DoctorPortraitCard";
import { getAvailableCategories, getDoctorCategories, type DoctorCategory } from "@/lib/doctorCategories";

type Status = "loading" | "ready" | "error";

const Doctors = () => {
  const { t, language } = useLanguage();
  const [doctors, setDoctors] = useState<DoctorResponse[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [active, setActive] = useState<DoctorCategory | "all">("all");

  const load = useCallback(async (isMounted: () => boolean = () => true) => {
    setStatus("loading");
    try {
      const list = await getDoctorsApi();
      if (!isMounted()) return;
      setDoctors(list);
      setStatus("ready");
    } catch (error) {
      console.error("Failed to load doctors:", error);
      if (isMounted()) setStatus("error");
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    load(() => mounted);
    return () => {
      mounted = false;
    };
  }, [load]);

  const categories = useMemo(() => getAvailableCategories(doctors), [doctors]);

  const handleWhatsAppBooking = (doctorName: string) => {
    trackBookAppointment("doctors", doctorName);
    const message =
      language === "ar"
        ? `مرحباً! أود حجز موعد مع ${doctorName}.`
        : `Hello! I would like to book an appointment with ${doctorName}.`;
    window.open(`https://wa.me/966556005567?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1 pt-32 md:pt-40">
        <section className="container mx-auto px-4">
          <SectionHeading
            as="h1"
            eyebrow={t("doctorsEyebrow")}
            title={t("doctorsTitle")}
            emphasis={t("doctorsTitleEmphasis")}
            subtitle={t("doctorsSubtitle")}
          />

          {status === "ready" && doctors.length > 0 && (
            <Reveal delay={0.3} className="mt-10">
              <DoctorFilters categories={categories} active={active} onChange={setActive} />
            </Reveal>
          )}
        </section>

        <section className="container mx-auto max-w-6xl px-4 pb-8 pt-12">
          {status === "loading" && (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4" aria-busy="true">
              <span className="sr-only">{t("loading")}</span>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] rounded-b-md rounded-t-[999px] bg-muted" />
                  <div className="mt-4 h-5 w-3/4 rounded-sm bg-muted" />
                  <div className="mt-2 h-3 w-1/2 rounded-sm bg-muted" />
                </div>
              ))}
            </div>
          )}

          {status === "error" && (
            <div className="mx-auto flex max-w-md flex-col items-center gap-5 py-12 text-center">
              <p className="text-muted-foreground">{t("doctorsLoadError")}</p>
              <button
                type="button"
                onClick={() => load()}
                className="rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                {t("tryAgain")}
              </button>
            </div>
          )}

          {status === "ready" && doctors.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">{t("doctorsEmpty")}</p>
          )}

          {status === "ready" && doctors.length > 0 && (
            <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {doctors.map((doctor, i) => (
                <Reveal as="li" key={doctor._id} blur={false} delay={0.35 + (i % 4) * 0.08}>
                  <DoctorPortraitCard
                    doctor={doctor}
                    dimmed={active !== "all" && !getDoctorCategories(doctor).includes(active)}
                    onBook={handleWhatsAppBooking}
                  />
                </Reveal>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Doctors;
