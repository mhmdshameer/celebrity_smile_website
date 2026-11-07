import type { DoctorResponse } from "@/api/doctor";

// Doctors only have free-text specialties, so categories and badges are derived from that text.

export type DoctorCategory = "general" | "root" | "crown" | "braces" | "kids";
export type DoctorBadge = "consultant" | "specialist" | null;

export const CATEGORY_ORDER: DoctorCategory[] = ["general", "root", "crown", "braces", "kids"];

const CATEGORY_KEYWORDS: Record<DoctorCategory, string[]> = {
  general: ["general", "عام"],
  root: ["endodont", "root canal", "عصب", "جذور"],
  crown: ["prosthodont", "crown", "denture", "implant", "تركيب", "تيجان", "زراع"],
  braces: ["orthodont", "braces", "aligner", "تقويم"],
  kids: ["pedodont", "pediatric", "paediatric", "child", "kids", "أطفال"],
};

const specialtyText = (doc: Pick<DoctorResponse, "specialties" | "specialtiesAr">) =>
  [...(doc.specialties ?? []), ...(doc.specialtiesAr ?? [])].join(" ").toLowerCase();

export const getDoctorCategories = (
  doc: Pick<DoctorResponse, "specialties" | "specialtiesAr">,
): DoctorCategory[] => {
  const text = specialtyText(doc);
  return CATEGORY_ORDER.filter((category) =>
    CATEGORY_KEYWORDS[category].some((keyword) => text.includes(keyword)),
  );
};

export const getAvailableCategories = (docs: DoctorResponse[]): DoctorCategory[] => {
  const present = new Set(docs.flatMap(getDoctorCategories));
  return CATEGORY_ORDER.filter((category) => present.has(category));
};

export const getDoctorBadge = (
  doc: Pick<DoctorResponse, "name" | "nameAr" | "specialties" | "specialtiesAr">,
): DoctorBadge => {
  const names = `${doc.name ?? ""} ${doc.nameAr ?? ""}`;
  const text = specialtyText(doc);
  if (/\bprof/i.test(names) || names.includes("أ.د") || names.includes("بروفيسور")) return "consultant";
  if (text.includes("consultant") || text.includes("استشاري")) return "consultant";
  if (text.includes("specialist") || text.includes("أخصائي") || text.includes("اخصائي")) return "specialist";
  return null;
};
