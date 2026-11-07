import type { ReactElement } from "react";
import { render, type RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";

interface Options {
  language?: "en" | "ar";
  route?: string;
}

/** Renders `ui` inside the same providers the app uses, in the given language and route. */
export const renderWithProviders = (ui: ReactElement, opts: Options = {}): RenderResult => {
  localStorage.setItem("selected_language", opts.language ?? "en");
  return render(
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme" attribute="class">
      <LanguageProvider>
        <HelmetProvider>
          <TooltipProvider>
            <MemoryRouter initialEntries={[opts.route ?? "/"]}>{ui}</MemoryRouter>
          </TooltipProvider>
        </HelmetProvider>
      </LanguageProvider>
    </ThemeProvider>,
  );
};
