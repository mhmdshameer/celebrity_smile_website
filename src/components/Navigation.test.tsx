import { screen } from "@testing-library/react";
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
