import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

let mediaMatches: Record<string, boolean> = {};

/** Make window.matchMedia report `true` for the given queries (all others false). */
export const mockMatchMedia = (map: Record<string, boolean>) => {
  mediaMatches = map;
};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: mediaMatches[query] ?? false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

// Report every observed element as intersecting straight away
class ImmediateIntersectionObserver {
  constructor(private cb: IntersectionObserverCallback) {}
  observe(el: Element) {
    this.cb(
      [{ isIntersecting: true, intersectionRatio: 1, target: el } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.defineProperty(window, "IntersectionObserver", { writable: true, value: ImmediateIntersectionObserver });

afterEach(() => {
  cleanup();
  mediaMatches = {};
  localStorage.clear();
});
