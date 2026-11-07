import { screen, waitFor } from "@testing-library/react";
import { Reveal } from "./Reveal";
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
