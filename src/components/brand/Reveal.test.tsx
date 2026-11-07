import { screen, waitFor } from "@testing-library/react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { renderWithProviders } from "@/test/renderWithProviders";
import { mockMatchMedia } from "@/test/setup";

test("content is visible when reduced motion is preferred", async () => {
  // framer-motion queries "(prefers-reduced-motion)"; CSS uses the ": reduce" form
  mockMatchMedia({ "(prefers-reduced-motion)": true, "(prefers-reduced-motion: reduce)": true });
  renderWithProviders(<Reveal><p>Hello</p></Reveal>);
  const p = await screen.findByText("Hello");
  expect(p).toBeVisible();
  expect(p.closest("[style*='opacity: 0']")).toBeNull();
});

test("content becomes visible once in view", async () => {
  renderWithProviders(<Reveal><p>Hi</p></Reveal>);
  await waitFor(() => expect(screen.getByText("Hi").closest("[style*='opacity: 0']")).toBeNull());
});

test("renders plainly when IntersectionObserver is missing", async () => {
  const io = window.IntersectionObserver;
  // simulate an old browser without IntersectionObserver
  (window as { IntersectionObserver?: unknown }).IntersectionObserver = undefined;
  try {
    renderWithProviders(<Reveal><p>Old browser</p></Reveal>);
    const p = await screen.findByText("Old browser");
    expect(p.closest("[style*='opacity: 0']")).toBeNull();
  } finally {
    window.IntersectionObserver = io;
  }
});

test("skips the entrance when the page is hidden at mount", async () => {
  const spy = vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
  renderWithProviders(<Reveal><p>Background tab</p></Reveal>);
  const p = await screen.findByText("Background tab");
  expect(p.closest("[style*='opacity: 0']")).toBeNull();
  spy.mockRestore();
});

test("a page's main heading is never hidden while it animates", async () => {
  renderWithProviders(<SectionHeading as="h1" title="Main title" />);
  const h1 = await screen.findByRole("heading", { level: 1 });
  expect(h1.closest("[style*='opacity: 0']")).toBeNull();
});
