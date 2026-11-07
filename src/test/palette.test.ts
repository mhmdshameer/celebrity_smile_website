import { readFileSync } from "fs";
import path from "path";

// Reads the light-theme tokens straight from index.css so palette changes are checked too
const css = readFileSync(path.resolve(__dirname, "../index.css"), "utf-8");
const rootBlock = css.slice(css.indexOf(":root {"), css.indexOf(".dark {"));

const token = (name: string): [number, number, number] => {
  const match = rootBlock.match(new RegExp(`--${name}:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%`));
  if (!match) throw new Error(`token --${name} not found as an HSL literal`);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
};

const luminance = ([h, s, l]: [number, number, number]) => {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(0) + 0.7152 * f(8) + 0.0722 * f(4);
};

const contrast = (a: [number, number, number], b: [number, number, number]) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

test("gold text is readable on the ivory background (WCAG AA, 4.5:1)", () => {
  expect(contrast(token("gold-text"), token("ivory"))).toBeGreaterThanOrEqual(4.5);
});

test("plum is readable on white badges (WCAG AA, 4.5:1)", () => {
  expect(contrast(token("plum"), [0, 0, 100])).toBeGreaterThanOrEqual(4.5);
});
