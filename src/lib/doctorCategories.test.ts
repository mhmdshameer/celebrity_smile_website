import { getAvailableCategories, getDoctorBadge, getDoctorCategories } from "./doctorCategories";
import type { DoctorResponse } from "@/api/doctor";

const doc = (s: string[], sAr: string[] = [], name = "Dr X", nameAr = "د. س") =>
  ({ name, nameAr, specialties: s, specialtiesAr: sAr });

test("maps the clinic's real specialty strings", () => {
  expect(getDoctorCategories(doc(["ENDODONTIC CONSULTANT ROOT CANAL TREATMENTS"]))).toEqual(["root"]);
  expect(getDoctorCategories(doc(["PROSTHODONTIC SPECIALIST"]))).toEqual(["crown"]);
  expect(getDoctorCategories(doc(["ORTHODONTICS"]))).toEqual(["braces"]);
  expect(getDoctorCategories(doc(["PEDODONTIST"]))).toEqual(["kids"]);
  expect(getDoctorCategories(doc(["GENERAL DENTIST"]))).toEqual(["general"]);
});

test("uses Arabic specialties when English has no match", () => {
  expect(getDoctorCategories(doc([], ["تقويم الأسنان"]))).toEqual(["braces"]);
  expect(getDoctorCategories(doc([""], ["طب أسنان الأطفال"]))).toEqual(["kids"]);
});

test("unmatched or empty specialties give no category", () => {
  expect(getDoctorCategories(doc([]))).toEqual([]);
  expect(
    getDoctorCategories({ specialties: undefined as unknown as string[], specialtiesAr: undefined }),
  ).toEqual([]);
});

test("available categories follow CATEGORY_ORDER and skip empty ones", () => {
  const docs = [doc(["ORTHODONTICS"]), doc(["GENERAL DENTIST"])] as unknown as DoctorResponse[];
  expect(getAvailableCategories(docs)).toEqual(["general", "braces"]);
});

test("badges", () => {
  expect(getDoctorBadge(doc(["ENDODONTIC CONSULTANT"], [], "PROF. DR NIFIN TAYMUR"))).toBe("consultant");
  expect(getDoctorBadge(doc(["GENERAL DENTIST"], [], "Prof. Dr A"))).toBe("consultant");
  expect(getDoctorBadge(doc(["PROSTHODONTIC SPECIALIST"]))).toBe("specialist");
  expect(getDoctorBadge(doc([], ["أخصائي تقويم"]))).toBe("specialist");
  expect(getDoctorBadge(doc(["GENERAL DENTIST"]))).toBeNull();
});
