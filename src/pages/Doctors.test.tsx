import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Doctors from "./Doctors";
import { renderWithProviders } from "@/test/renderWithProviders";
import { getDoctorsApi, type DoctorResponse } from "@/api/doctor";

vi.mock("@/api/doctor", () => ({ getDoctorsApi: vi.fn() }));
vi.mock("@/utils/analytics", () => ({ trackBookAppointment: vi.fn(), trackWhatsAppClick: vi.fn() }));

const img = (id: string) => ({ url: `https://res.cloudinary.com/x/${id}.png`, public_id: id });

const fixtures: DoctorResponse[] = [
  {
    _id: "1",
    name: "PROF. DR NIFIN TAYMUR",
    nameAr: "أ.د نفين تيمور",
    specialties: ["ENDODONTIC CONSULTANT ROOT CANAL TREATMENTS"],
    specialtiesAr: ["استشاري علاج العصب"],
    image: img("nifin"),
  },
  {
    _id: "2",
    name: "Rama Abdul Qadir",
    nameAr: "راما عبد القادر",
    specialties: ["ORTHODONTICS"],
    specialtiesAr: ["تقويم الأسنان"],
    image: img("rama"),
  },
  {
    _id: "3",
    name: "Arwa Yahya Shareef",
    nameAr: "أروى يحيى شريف",
    specialties: ["GENERAL DENTIST"],
    specialtiesAr: ["طبيب أسنان عام"],
    image: img("arwa"),
  },
  {
    _id: "4",
    name: "Legacy Doctor",
    nameAr: "طبيب قديم",
    specialties: [],
    image: { url: "", public_id: "" },
  },
];

const mockedGetDoctors = vi.mocked(getDoctorsApi);

beforeEach(() => {
  mockedGetDoctors.mockReset();
  mockedGetDoctors.mockResolvedValue(fixtures);
});

test("shows only chips for categories that have doctors", async () => {
  renderWithProviders(<Doctors />);
  const group = await screen.findByRole("group");
  expect(within(group).getAllByRole("button").map((b) => b.textContent)).toEqual([
    "All",
    "General",
    "Root canal",
    "Braces",
  ]);
});

test("filtering dims non-matching doctors but keeps them in place", async () => {
  renderWithProviders(<Doctors />);
  await userEvent.click(await screen.findByRole("button", { name: "Braces" }));
  expect(screen.getByRole("button", { name: "Braces" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText("Rama Abdul Qadir").closest("[aria-hidden='true']")).toBeNull();
  expect(screen.getByText("Arwa Yahya Shareef").closest("[aria-hidden='true']")).not.toBeNull();
});

test("consultant badge and legacy doctor fallback", async () => {
  renderWithProviders(<Doctors />);
  expect(await screen.findByText("Consultant")).toBeInTheDocument();
  expect(screen.getByText("Legacy Doctor")).toBeInTheDocument();
  expect(document.querySelector("img[src*='via.placeholder']")).toBeNull();
});

test("book button is a real button and opens WhatsApp with the name", async () => {
  const open = vi.spyOn(window, "open").mockReturnValue(null);
  renderWithProviders(<Doctors />);
  await userEvent.click(await screen.findByRole("button", { name: /Book with .*Rama/ }));
  expect(open.mock.calls[0][0]).toContain("wa.me/966556005567");
  expect(decodeURIComponent(open.mock.calls[0][0] as string)).toContain("Rama Abdul Qadir");
  open.mockRestore();
});

test("Arabic: chips and names in Arabic", async () => {
  renderWithProviders(<Doctors />, { language: "ar" });
  expect(await screen.findByRole("button", { name: "الكل" })).toBeInTheDocument();
  expect(screen.getByText("راما عبد القادر")).toBeInTheDocument();
});

test("API failure shows error with retry, not the empty message", async () => {
  mockedGetDoctors.mockReset();
  mockedGetDoctors.mockRejectedValueOnce(new Error("down")).mockResolvedValueOnce(fixtures);
  renderWithProviders(<Doctors />);
  expect(await screen.findByText(/couldn't load our doctors/)).toBeInTheDocument();
  expect(screen.queryByText(/listed here soon/)).toBeNull();
  await userEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(await screen.findByText("Rama Abdul Qadir")).toBeInTheDocument();
});
