import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navigation from "./Navigation";
import { renderWithProviders } from "@/test/renderWithProviders";

test("shows all ten menu links in English", async () => {
  renderWithProviders(<Navigation />, { route: "/doctors" });
  for (const label of ["Home", "About Us", "Doctors", "Services", "Departments", "Offers", "Price List", "Privilege Card", "Blog", "Contact Us"])
    expect(await screen.findAllByRole("link", { name: label })).not.toHaveLength(0);
});

test("marks the current page", async () => {
  renderWithProviders(<Navigation />, { route: "/doctors" });
  expect((await screen.findAllByRole("link", { name: "Doctors" }))[0]).toHaveAttribute("aria-current", "page");
});

test("language toggle switches to Arabic", async () => {
  renderWithProviders(<Navigation />);
  await userEvent.click(await screen.findByRole("button", { name: "العربية" }));
  expect(await screen.findByRole("button", { name: "English" })).toBeInTheDocument();
});

test("mobile menu opens as a dialog outside the nav, even after scrolling", async () => {
  renderWithProviders(<Navigation />);
  window.scrollY = 200;
  window.dispatchEvent(new Event("scroll"));
  await userEvent.click(await screen.findByRole("button", { name: "Open menu" }));
  const dialog = await screen.findByRole("dialog");
  expect(dialog.closest("nav")).toBeNull();
  expect(within(dialog).getAllByRole("link")).toHaveLength(10);
});

test("Escape closes the mobile menu", async () => {
  renderWithProviders(<Navigation />);
  await userEvent.click(await screen.findByRole("button", { name: "Open menu" }));
  await screen.findByRole("dialog");
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});

test("menu labels are translated in Arabic", async () => {
  renderWithProviders(<Navigation />, { language: "ar" });
  expect(await screen.findByRole("button", { name: "فتح القائمة" })).toBeInTheDocument();
});
