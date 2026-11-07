import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import type { DoctorCategory } from "@/lib/doctorCategories";

type Filter = DoctorCategory | "all";

const LABEL_KEYS: Record<Filter, string> = {
  all: "filterAll",
  general: "filterGeneral",
  root: "filterRoot",
  crown: "filterCrown",
  braces: "filterBraces",
  kids: "filterKids",
};

interface DoctorFiltersProps {
  categories: DoctorCategory[];
  active: Filter;
  onChange: (category: Filter) => void;
}

export const DoctorFilters = ({ categories, active, onChange }: DoctorFiltersProps) => {
  const { t } = useLanguage();
  const filters: Filter[] = ["all", ...categories];

  return (
    <div role="group" aria-label={t("doctors")} className="flex flex-wrap justify-center gap-2">
      {filters.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(filter)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300",
              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/15 text-foreground/80 hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {t(LABEL_KEYS[filter])}
          </button>
        );
      })}
    </div>
  );
};
