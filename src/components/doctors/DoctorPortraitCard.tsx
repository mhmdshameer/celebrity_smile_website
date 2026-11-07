import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import type { DoctorResponse } from "@/api/doctor";
import { getDoctorBadge } from "@/lib/doctorCategories";
import { formatDoctorName } from "@/lib/doctorName";

interface DoctorPortraitCardProps {
  doctor: DoctorResponse;
  dimmed: boolean;
  onBook: (displayName: string) => void;
}

const BADGE_KEYS = { consultant: "badgeConsultant", specialist: "badgeSpecialist" } as const;

export const DoctorPortraitCard = ({ doctor, dimmed, onBook }: DoctorPortraitCardProps) => {
  const { t, language } = useLanguage();
  const displayName = formatDoctorName((language === "ar" ? doctor.nameAr : doctor.name) || doctor.name);
  const specialties = (language === "ar" ? doctor.specialtiesAr : doctor.specialties) ?? [];
  const badge = getDoctorBadge(doctor);
  const imageUrl = doctor.image?.url;

  return (
    <article
      aria-hidden={dimmed || undefined}
      className={cn(
        "group flex flex-col transition-all duration-500 ease-out",
        dimmed && "pointer-events-none scale-[0.96] opacity-15",
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-b-md rounded-t-[999px] bg-[radial-gradient(120%_80%_at_50%_100%,hsl(333_32%_88%)_0%,hsl(34_47%_97%)_75%)] transition-all duration-500 [@media(hover:hover)]:group-hover:-translate-y-1.5 [@media(hover:hover)]:group-hover:shadow-[0_24px_40px_-12px_hsl(var(--primary)/0.25)]">
        {badge && (
          <span className="absolute left-1/2 top-[8%] z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[hsl(var(--plum))] shadow-sm">
            {t(BADGE_KEYS[badge])}
          </span>
        )}

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={displayName}
            loading="lazy"
            className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain mix-blend-multiply transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center" role="img" aria-label={displayName}>
            <img src="/favicon.png" alt="" className="h-1/3 w-auto opacity-40" />
          </div>
        )}

        {/* Touch devices always show the Book button; hover devices slide it up on hover or focus */}
        <button
          type="button"
          onClick={() => onBook(displayName)}
          tabIndex={dimmed ? -1 : undefined}
          aria-label={`${t("bookWith")} ${displayName}`}
          className="absolute inset-x-3 bottom-3 z-10 truncate rounded-sm bg-primary/95 px-3 py-2.5 text-xs font-semibold text-primary-foreground backdrop-blur transition-transform duration-500 ease-out [@media(hover:hover)]:translate-y-[160%] [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:focus-visible:translate-y-0"
        >
          <span className="[@media(hover:hover)]:hidden">{t("bookAppointment")}</span>
          <span className="hidden [@media(hover:hover)]:inline">
            {t("bookWith")} {displayName}
          </span>
        </button>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-foreground">{displayName}</h3>
      {specialties.length > 0 && (
        <p className="mt-1 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-gold-text">
          {specialties.join(" · ")}
        </p>
      )}
    </article>
  );
};
