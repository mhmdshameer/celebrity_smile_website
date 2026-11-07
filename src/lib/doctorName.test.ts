import { formatDoctorName } from "./doctorName";

test("title-cases names typed in all caps, keeping title abbreviations", () => {
  expect(formatDoctorName("PROF. DR NIFIN TAYMUR")).toBe("Prof. Dr Nifin Taymur");
  expect(formatDoctorName("DR MUHAMMED ASIM FAROOQUI")).toBe("Dr Muhammed Asim Farooqui");
});

test("leaves mixed-case and Arabic names untouched", () => {
  expect(formatDoctorName("Dr Rama Abdul Qadir")).toBe("Dr Rama Abdul Qadir");
  expect(formatDoctorName("أ.د نفين تيمور")).toBe("أ.د نفين تيمور");
  expect(formatDoctorName("")).toBe("");
});
