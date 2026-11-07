# Redesign Phase 1: Visual System, Navigation, Footer and Doctors Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Quiet Luxury visual system, the redesigned navigation and footer, and the Portrait Gallery Doctors page. Together these form the owner's approval gate for the whole redesign.

**Architecture:**
- The shared tokens (colours, fonts, motion) live in `src/index.css` and `tailwind.config.ts`. The serif display face is applied only through an opt-in `font-display` class, so the admin panel keeps its current typography.
- Doctor categories and badges are pure functions, derived on the front end from the free-text specialties.
- The Doctors page is composed from small presentational components.
- This plan covers Phase 1 only. The other 11 pages each get their own plan after the owner approves this phase, as the spec's review order requires.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind 3, shadcn/ui, framer-motion 12 (already installed), react-router 6, next-themes. Tests use Vitest, @testing-library/react and jsdom, which Task 1 adds.

**Spec:** `docs/superpowers/specs/2026-11-01-quiet-luxury-redesign-design.md`

## Global Constraints

- All work happens on branch `redesign`. Never merge to `main` or push `main` in this plan. Pushing `redesign` is allowed.
- No backend, API or database changes. Doctor data is only `name`, `nameAr`, `specialties[]`, `specialtiesAr[]` and `image {url, public_id}`.
- Booking stays WhatsApp-based at `https://wa.me/966556005567?text=…`, and calls `trackBookAppointment(page, doctorName)` from `src/utils/analytics.ts`.
- Every user-facing string goes through `t()` in `src/contexts/LanguageContext.tsx`, with both `en` and `ar` values. Every layout must mirror correctly when `dir="rtl"`. Use logical properties (`ms-`/`me-`/`ps-`/`pe-`, `start`/`end`) instead of `left`/`right`.
- Colours are HSL CSS variables in `src/index.css`. No new hard-coded hex colours in components.
- Palette (light):
  - plum `329 72% 35%` (≈ #97195a)
  - ivory `34 47% 96%` (≈ #faf6f1)
  - ink `328 33% 12%` (≈ #2a1520)
  - gold `36 36% 52%` (≈ #b08d57)
  - blush `333 32% 88%` (≈ #ead6df)
- Fonts:
  - English display: Cormorant Garamond (500, 600, italic 500).
  - English body: Manrope (400–800).
  - Arabic display: Amiri (400, 700).
  - Arabic body: IBM Plex Sans Arabic (400–700).
  - All load from Google Fonts with `display=swap`.
- Motion uses framer-motion and respects `prefers-reduced-motion`. Content must never stay invisible if an animation does not run.
- Admin pages (`/admin/*`) and `/signin` are not redesigned, but must still render and work with the new tokens.
- Use only the existing images in `public/`. The stock hero `/doctors.jpg` is no longer used on the Doctors page.
- Do not commit `package-lock.json` changes unrelated to the dependencies this plan adds, or anything in `public/_mockups/` or `.superpowers/`.

## Review Focus

1. **Old or partial doctor records.** A doctor with empty specialties or a missing `image.url` still renders under "All", shows a branded fallback portrait, and does not break the filters. Today the code falls back to the dead `via.placeholder.com` service. Pinned in Task 5.
2. **API failure or a slow API.** The page shows a loading state, then an error message with a retry button and the WhatsApp option. It must not show "no doctors" when the request failed, and it must not leave an unhandled rejection. Today there is no `catch`. Pinned in Task 5.
3. **Arabic data.** A doctor whose category words are only in `specialtiesAr` is still categorised. The chips, badges and "Book with" text are in Arabic, and the Arabic name is used in the WhatsApp message. Pinned in Tasks 1 and 5.
4. **Touch devices.** The "Book with Dr …" control is always visible and tappable without hover. Pinned in Task 5.
5. **Animations that never run** (reduced motion, background tabs, or no IntersectionObserver). Content is visible anyway. Pinned in Task 2.

---

## File Structure

| File | Responsibility |
|---|---|
| `vitest.config.ts`, `src/test/setup.ts`, `src/test/renderWithProviders.tsx` | Test runner and shared test harness |
| `src/lib/doctorCategories.ts` (+ `.test.ts`) | Pure category and badge derivation |
| `index.html` | Google Fonts links |
| `src/index.css`, `tailwind.config.ts` | Tokens, font families, `font-arabic`, `font-display` |
| `src/components/brand/Reveal.tsx` (+ test) | Shared scroll-reveal wrapper, reused by every later page |
| `src/components/brand/SectionHeading.tsx` | Eyebrow, display title with italic emphasis, subtitle |
| `src/components/Navigation.tsx` (+ test) | Redesigned header |
| `src/components/Footer.tsx` | Redesigned footer |
| `src/components/doctors/DoctorFilters.tsx` | Category chips |
| `src/components/doctors/DoctorPortraitCard.tsx` | Arch portrait card |
| `src/pages/Doctors.tsx` (+ test) | Page composition: data loading, states and filtering |
| `src/contexts/LanguageContext.tsx` | New translation keys |

---

### Task 1: Test harness and doctor category logic

**Files:**
- Create: `vitest.config.ts`, `src/test/setup.ts`, `src/test/renderWithProviders.tsx`, `src/lib/doctorCategories.ts`, `src/lib/doctorCategories.test.ts`
- Modify: `package.json` (devDependencies and a `"test": "vitest run"` script)

**Interfaces:**
- Produces:
  - `type DoctorCategory = "general" | "root" | "crown" | "braces" | "kids"`
  - `const CATEGORY_ORDER: DoctorCategory[]`, equal to `["general","root","crown","braces","kids"]`
  - `getDoctorCategories(doc: Pick<DoctorResponse,"specialties"|"specialtiesAr">): DoctorCategory[]`
  - `getAvailableCategories(docs: DoctorResponse[]): DoctorCategory[]`, which returns the categories in `CATEGORY_ORDER` order and only those with at least one doctor
  - `type DoctorBadge = "consultant" | "specialist" | null`
  - `getDoctorBadge(doc: Pick<DoctorResponse,"name"|"nameAr"|"specialties"|"specialtiesAr">): DoctorBadge`
  - `renderWithProviders(ui: ReactElement, opts?: { language?: "en"|"ar"; route?: string }): RenderResult`. It wraps the UI in `MemoryRouter`, `ThemeProvider` and `LanguageProvider`, and sets `localStorage["selected_language"]` before rendering.

- [ ] **Step 1: Install the test tooling.** Run `npm i -D vitest@^2 @testing-library/react@^16 @testing-library/jest-dom@^6 @testing-library/user-event@^14 jsdom@^25`. Add the `"test": "vitest run"` script.

- [ ] **Step 2: Create `vitest.config.ts` and `src/test/setup.ts`.**
  - `vitest.config.ts`: `environment: "jsdom"`, `setupFiles: ["src/test/setup.ts"]`, `globals: true`, and the same `@` alias as `vite.config.ts`.
  - `src/test/setup.ts`: import `@testing-library/jest-dom/vitest`, then add stubs:
    - `window.matchMedia` with `matches: false` by default, overridable per test.
    - `IntersectionObserver` that immediately reports each observed element as intersecting.

- [ ] **Step 3: Write the failing tests in `src/lib/doctorCategories.test.ts`.**

```ts
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
  expect(getDoctorCategories({ specialties: undefined as any, specialtiesAr: undefined })).toEqual([]);
});
test("available categories follow CATEGORY_ORDER and skip empty ones", () => {
  const docs = [doc(["ORTHODONTICS"]), doc(["GENERAL DENTIST"])] as any;
  expect(getAvailableCategories(docs)).toEqual(["general", "braces"]);
});
test("badges", () => {
  expect(getDoctorBadge(doc(["ENDODONTIC CONSULTANT"], [], "PROF. DR NIFIN TAYMUR"))).toBe("consultant");
  expect(getDoctorBadge(doc(["GENERAL DENTIST"], [], "Prof. Dr A"))).toBe("consultant");
  expect(getDoctorBadge(doc(["PROSTHODONTIC SPECIALIST"]))).toBe("specialist");
  expect(getDoctorBadge(doc([], ["أخصائي تقويم"]))).toBe("specialist");
  expect(getDoctorBadge(doc(["GENERAL DENTIST"]))).toBeNull();
});
```

- [ ] **Step 4: Run the tests to verify they fail.** Run `npx vitest run src/lib/doctorCategories.test.ts`. Expected: FAIL, because the module is not found.

- [ ] **Step 5: Implement `src/lib/doctorCategories.ts`.**
  - Matching is case-insensitive substring matching over the joined `specialties` and `specialtiesAr` strings.
  - A doctor can match several categories. Return them in `CATEGORY_ORDER`.
  - Keyword table:

| Category | Keywords |
|---|---|
| root | `endodont`, `root canal`, `عصب`, `جذور` |
| crown | `prosthodont`, `crown`, `denture`, `implant`, `تركيب`, `تيجان`, `زراع` |
| braces | `orthodont`, `braces`, `aligner`, `تقويم` |
| kids | `pedodont`, `pediatric`, `paediatric`, `child`, `kids`, `أطفال` |
| general | `general`, `عام` |

  - Badge rules:
    - `"consultant"` if the name matches `/\bprof/i`, `أ\.د` or `بروفيسور`, or the specialties match `consultant` or `استشاري`.
    - Otherwise `"specialist"` if the specialties match `specialist`, `أخصائي` or `اخصائي`.
    - Otherwise `null`.

- [ ] **Step 6: Run the tests to verify they pass.** Run `npx vitest run src/lib/doctorCategories.test.ts`. Expected: 5 passed.

- [ ] **Step 7: Create `src/test/renderWithProviders.tsx`** per the Interfaces block. It is used by Tasks 2, 3 and 5.

- [ ] **Step 8: Commit.**

```bash
git add package.json package-lock.json vitest.config.ts src/test src/lib/doctorCategories.ts src/lib/doctorCategories.test.ts
git commit -m "test: add vitest harness and doctor category logic"
```

### Task 2: Visual system tokens, fonts and shared brand components

**Files:**
- Modify: `index.html` (fonts in `<head>`), `src/index.css:9-106`, `tailwind.config.ts` (`theme.extend`)
- Create: `src/components/brand/Reveal.tsx`, `src/components/brand/Reveal.test.tsx`, `src/components/brand/SectionHeading.tsx`

**Interfaces:**
- Consumes: `renderWithProviders` (Task 1).
- Produces:
  - Tailwind colours `gold`, `blush` and `ivory` (from `--gold`, `--blush`, `--ivory`), on top of the existing shadcn tokens, which are re-pointed to the new palette.
  - Font families `font-display` (Cormorant Garamond, or Amiri under `.font-arabic`), `font-sans` (Manrope, or IBM Plex Sans Arabic under `.font-arabic`).
  - `Reveal(props: { children: ReactNode; delay?: number; className?: string; as?: "div"|"section"|"li"|"article" })`
  - `SectionHeading(props: { eyebrow?: string; title: string; emphasis?: string; subtitle?: string; align?: "center"|"start"; as?: "h1"|"h2" })`. It renders `title` followed by `emphasis` as an italic plum `<em>` on its own line.

- [ ] **Step 1: Write the failing test `src/components/brand/Reveal.test.tsx`.**

```tsx
test("content is visible when reduced motion is preferred", () => {
  mockMatchMedia({ "(prefers-reduced-motion: reduce)": true });
  renderWithProviders(<Reveal><p>Hello</p></Reveal>);
  const p = screen.getByText("Hello");
  expect(p).toBeVisible();
  expect(p.closest("[style*='opacity: 0']")).toBeNull();
});
test("content becomes visible once in view", async () => {
  renderWithProviders(<Reveal><p>Hi</p></Reveal>);
  await waitFor(() => expect(screen.getByText("Hi").closest("[style*='opacity: 0']")).toBeNull());
});
```

Add `mockMatchMedia(map: Record<string, boolean>)` to `src/test/setup.ts`.

- [ ] **Step 2: Run the test to verify it fails.** Run `npx vitest run src/components/brand`. Expected: FAIL, because the module is not found.

- [ ] **Step 3: Implement `Reveal`.**
  - Use framer-motion: `initial={{opacity:0,y:24,filter:"blur(6px)"}}`, `whileInView={{opacity:1,y:0,filter:"blur(0px)"}}`, `viewport={{once:true,margin:"-10% 0px"}}`, `transition={{duration:0.8,ease:[0.2,0.7,0.2,1],delay}}`.
  - When `useReducedMotion()` is true, render the plain element with no motion props.

- [ ] **Step 4: Implement `SectionHeading`.**
  - Eyebrow: gold hairlines on either side, uppercase, `tracking-[0.3em]`, plum text.
  - Title: `font-display`, with sizes `text-4xl md:text-6xl`.
  - Subtitle: muted foreground, max width about 32rem.

- [ ] **Step 5: Add the fonts to `index.html`.** Add `preconnect` links to `fonts.googleapis.com` and `fonts.gstatic.com`, and one stylesheet link for all four families with `display=swap`.

- [ ] **Step 6: Re-point the tokens in `src/index.css`.**
  - Light (`:root`):

| Variable | Value |
|---|---|
| `--background` | ivory |
| `--foreground` | ink |
| `--card` | `0 0% 100%` |
| `--primary` | plum |
| `--primary-foreground` | `0 0% 100%` |
| `--secondary` | blush |
| `--secondary-foreground` | ink |
| `--accent` | blush |
| `--accent-foreground` | plum |
| `--muted` | `34 30% 92%` |
| `--muted-foreground` | `328 12% 40%` |
| `--border` and `--input` | `34 20% 86%` |
| `--ring` | plum |
| `--radius` | `0.25rem` |

  - Add `--gold`, `--blush` and `--ivory`.
  - Dark (`.dark`):
    - Background `330 30% 7%`.
    - Foreground ivory.
    - Card `330 25% 11%`.
    - Primary `330 60% 66%`, with primary-foreground ink.
    - Muted `330 20% 15%`.
    - Border `330 15% 20%`.
    - Gold unchanged.
    - Remove the "Eid" gold-primary and royal-blue comments and values.
  - Fonts and motion:
    - `body` uses `font-sans`.
    - Define `.font-arabic` so `font-sans` resolves to IBM Plex Sans Arabic and `.font-display` resolves to Amiri.
    - Add `@media (prefers-reduced-motion: reduce)` to disable CSS transitions and animations site-wide.

- [ ] **Step 7: Update `tailwind.config.ts`.** Add `fontFamily.display`, `fontFamily.sans` and `fontFamily.arabic`, plus the `gold`, `blush` and `ivory` colours.

- [ ] **Step 8: Run the tests, lint and build.** Run `npx vitest run && npx eslint src/components/brand && npm run build`. Expected: all tests pass, no lint errors, and the build ends with `✓ built`.

- [ ] **Step 9: Check the admin panel visually.** Run `npm run dev`, open `/signin`, and confirm the form renders with plum buttons and the body font, not serif headings. If you can sign in, also check `/admin/doctors`.

- [ ] **Step 10: Commit.**

```bash
git add index.html src/index.css tailwind.config.ts src/components/brand src/test/setup.ts
git commit -m "feat: Quiet Luxury tokens, fonts, Reveal and SectionHeading"
```

### Task 3: Navigation

**Files:**
- Modify: `src/components/Navigation.tsx`
- Create: `src/components/Navigation.test.tsx`

**Interfaces:**
- Consumes: the tokens and `font-display` (Task 2), `renderWithProviders` (Task 1).
- Produces: the same default export `Navigation` with no props. Every page already renders it.

The design:
- The header always has an ivory background with ink text. The logo is `/CSDC-LOGO.png` at `h-12`.
- Links are uppercase Manrope at `text-[11px]` with `tracking-[0.14em]`. The active link gets a gold hairline underline, using the existing `layoutId` motion.
- Once the page scrolls past 10px, the header shrinks to `h-16`, gains `backdrop-blur` and shows a bottom hairline.
- The theme toggle stays. The language toggle becomes a quiet text button showing "العربية" or "English".
- A solid plum "Book" button links to WhatsApp and calls `trackBookAppointment("navigation")`. It is visible from the `lg` breakpoint up.
- On mobile, a full-screen ivory sheet opens with large `font-display` links that stagger in, plus the language toggle, theme toggle and Book button.
- The white-text-over-hero mode is removed. Pages that are not yet redesigned will show dark text over their photo heroes on this branch. That is accepted until those pages are redone.

- [ ] **Step 1: Write the failing tests.**

```tsx
test("shows all ten menu links in English", async () => {
  renderWithProviders(<Navigation />, { route: "/doctors" });
  for (const label of ["Home","About Us","Doctors","Services","Departments","Offers","Price List","Privilege Card","Blog","Contact Us"])
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
```

Copy the English labels from the existing `t()` values in `LanguageContext.tsx`. If a label differs, use the existing value.

- [ ] **Step 2: Run the tests to verify they fail.** Run `npx vitest run src/components/Navigation.test.tsx`. Expected: FAIL on `aria-current`.

- [ ] **Step 3: Implement the redesign described above.** Use `NavLink` or set `aria-current="page"` on the active link. Keep the `menuItems` list.

- [ ] **Step 4: Run the tests, lint and build.** Run `npx vitest run && npm run build`. Expected: everything passes.

- [ ] **Step 5: Check it visually** at desktop width and at 375px, in English and Arabic (the mirror order must be correct) and in light and dark mode.

- [ ] **Step 6: Commit.**

```bash
git add src/components/Navigation.tsx src/components/Navigation.test.tsx
git commit -m "feat: Quiet Luxury navigation"
```

### Task 4: Footer and floating WhatsApp button

**Files:**
- Modify: `src/components/Footer.tsx`, `src/components/FloatingWhatsApp.tsx`

**Interfaces:**
- Consumes: the tokens (Task 2).
- Produces: unchanged default exports.

The design:
- The footer is deep ink (`bg-foreground text-background` in light mode, `bg-card` in dark mode) with ivory text and a thin gold rule at the top.
- At the top sits a large `font-display` line: "Your celebrity smile starts here.", with a Book on WhatsApp button.
- Below that are three columns: the brand and description, quick links, and contact.
- Keep every existing link, phone number, email and social URL exactly as they are.
- Social icons become monochrome ivory with a gold hover. Drop the per-brand hover colours and the `hover:text-pink-600` classes.
- The floating WhatsApp button stays green, because people recognise it. Move it to `end-6` so it mirrors in RTL, and give it a soft shadow and a gentle entrance.
- Add translation keys `footerCtaTitle`. English: "Your celebrity smile starts here." Arabic: "ابتسامتك المميزة تبدأ من هنا."

- [ ] **Step 1: Make the change.**

- [ ] **Step 2: Lint and build.** Run `npx eslint src/components/Footer.tsx src/components/FloatingWhatsApp.tsx && npm run build`. Expected: no errors.

- [ ] **Step 3: Check every link.** Run `grep -c "href=" src/components/Footer.tsx`. The count must match the count on `main`, or be higher.

- [ ] **Step 4: Check it visually** in both languages, both themes and at 375px.

- [ ] **Step 5: Commit.**

```bash
git add src/components/Footer.tsx src/components/FloatingWhatsApp.tsx src/contexts/LanguageContext.tsx
git commit -m "feat: Quiet Luxury footer and WhatsApp button"
```

### Task 5: Doctors page, Portrait Gallery

**Files:**
- Create: `src/components/doctors/DoctorFilters.tsx`, `src/components/doctors/DoctorPortraitCard.tsx`, `src/pages/Doctors.test.tsx`
- Modify: `src/pages/Doctors.tsx` (full rewrite), `src/contexts/LanguageContext.tsx` (keys below)

**Interfaces:**
- Consumes:
  - `getDoctorsApi(): Promise<DoctorResponse[]>` from `src/api/doctor.ts`
  - `getDoctorCategories`, `getAvailableCategories`, `getDoctorBadge` and `CATEGORY_ORDER` (Task 1)
  - `Reveal` and `SectionHeading` (Task 2)
  - `trackBookAppointment` from `src/utils/analytics.ts`
- Produces:
  - `DoctorFilters(props: { categories: DoctorCategory[]; active: DoctorCategory | "all"; onChange: (c: DoctorCategory | "all") => void })`. It renders a `role="group"` of `aria-pressed` buttons, and "All" always comes first.
  - `DoctorPortraitCard(props: { doctor: DoctorResponse; dimmed: boolean; onBook: (displayName: string) => void })`.

**Translation keys (exact copy):**

| Key | en | ar |
|---|---|---|
| `doctorsEyebrow` | Our Specialists | أطباؤنا المتخصصون |
| `doctorsTitle` | The hands behind | أيادٍ ماهرة |
| `doctorsTitleEmphasis` | every celebrity smile. | خلف كل ابتسامة مشاهير. |
| `doctorsSubtitle` | Internationally certified dentists and consultants, each dedicated to one area of care. | أطباء واستشاريون معتمدون دولياً، كلٌّ منهم متخصص في مجال رعايته. |
| `filterAll` | All | الكل |
| `filterGeneral` | General | عام |
| `filterRoot` | Root canal | علاج العصب |
| `filterCrown` | Crowns & dentures | التركيبات والتيجان |
| `filterBraces` | Braces | التقويم |
| `filterKids` | Children | الأطفال |
| `badgeConsultant` | Consultant | استشاري |
| `badgeSpecialist` | Specialist | أخصائي |
| `bookWith` | Book with | احجز مع |
| `doctorsLoadError` | We couldn't load our doctors right now. Please try again, or message us on WhatsApp. | تعذّر تحميل قائمة الأطباء حالياً. يرجى المحاولة مرة أخرى أو مراسلتنا عبر واتساب. |
| `tryAgain` | Try again | إعادة المحاولة |
| `doctorsEmpty` | Our doctors will be listed here soon. | ستظهر قائمة أطبائنا هنا قريباً. |

**Layout:**
- No photo hero. `Navigation` comes first, then `SectionHeading` (h1, centred) and the filters.
- The grid is 4 columns on `lg`, 3 on `md` and 2 on small screens. The gap stays generous.
- Card:
  - The portrait sits in an arch frame (`rounded-t-[999px] rounded-b-md`, `aspect-[3/4]`, a blush radial background).
  - The image is anchored at the bottom with `mix-blend-mode: multiply`, `loading="lazy"`, and alt text equal to the display name.
  - The badge is a white pill at the top centre.
  - The name is in `font-display` at `text-xl`. Show all specialties, joined with " · ", in small uppercase gold.
  - Book button: on hover-capable devices (`@media (hover:hover)`), a plum button slides up inside the frame on hover. On touch devices, the same button is always visible below the specialty. It is a real `<button>`. There is exactly one Book button per card; only CSS changes where it sits.
- Filtering: a non-matching card gets `dimmed` (opacity 0.15, scale 0.96, `aria-hidden`), so the grid does not reflow. Cards stagger in with `Reveal`.
- The WhatsApp message is `Hello! I would like to book an appointment with ${displayName}.` in English. In Arabic it is `مرحباً! أود حجز موعد مع ${displayName}.`
- Fallback portrait: when `image.url` is missing, render the logo heart mark on blush, not `via.placeholder.com`.
- States:
  - Loading shows 4 arch-shaped skeleton cards.
  - An error shows `doctorsLoadError`, a `tryAgain` button that re-fetches, and the floating WhatsApp button.
  - An empty list shows `doctorsEmpty`.

- [ ] **Step 1: Write the failing tests in `src/pages/Doctors.test.tsx`.** Mock `@/api/doctor` and `@/utils/analytics`. Use these fixture doctors:
  - Nifin: `["ENDODONTIC CONSULTANT ROOT CANAL TREATMENTS"]`, name `"PROF. DR NIFIN TAYMUR"`
  - Rama: `["ORTHODONTICS"]`
  - Arwa: `["GENERAL DENTIST"]`
  - Legacy: `specialties: []`, `image: {url:"",public_id:""}`

```tsx
test("shows only chips for categories that have doctors", async () => {
  renderWithProviders(<Doctors />);
  const group = await screen.findByRole("group");
  expect(within(group).getAllByRole("button").map(b => b.textContent))
    .toEqual(["All", "General", "Root canal", "Braces"]);
});
test("filtering dims non-matching doctors but keeps them in place", async () => {
  renderWithProviders(<Doctors />);
  await userEvent.click(await screen.findByRole("button", { name: "Braces" }));
  expect(screen.getByRole("button", { name: "Braces" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText("Rama Abdul Qadir").closest("[aria-hidden]")).toBeNull();
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
});
test("Arabic: chips and names in Arabic", async () => {
  renderWithProviders(<Doctors />, { language: "ar" });
  expect(await screen.findByRole("button", { name: "الكل" })).toBeInTheDocument();
  expect(screen.getByText("راما عبد القادر")).toBeInTheDocument(); // fixture nameAr for Rama
});
test("API failure shows error with retry, not the empty message", async () => {
  getDoctorsApi.mockRejectedValueOnce(new Error("down")).mockResolvedValueOnce(fixtures);
  renderWithProviders(<Doctors />);
  expect(await screen.findByText(/couldn't load our doctors/)).toBeInTheDocument();
  expect(screen.queryByText(/listed here soon/)).toBeNull();
  await userEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(await screen.findByText("Rama Abdul Qadir")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the tests to verify they fail.** Run `npx vitest run src/pages/Doctors.test.tsx`. Expected: FAIL. Most likely the old page renders no `role="group"`.

- [ ] **Step 3: Add the translation keys** from the table to both `en` and `ar` in `LanguageContext.tsx`.

- [ ] **Step 4: Implement `DoctorFilters`, `DoctorPortraitCard`, and the rewritten `Doctors.tsx`** as specified above.

- [ ] **Step 5: Run the tests to verify they pass.** Run `npx vitest run`. Expected: all suites pass.

- [ ] **Step 6: Lint and build.** Run `npx eslint src/pages/Doctors.tsx src/components/doctors && npm run build`. Expected: no errors, and `✓ built`.

- [ ] **Step 7: Check it visually against the approved mockup** (`public/_mockups/doctors-page.html`, layout 1). Check desktop width and 375px, English and Arabic (RTL mirrored, Arabic fonts showing), and light and dark mode. Confirm that hovering a card shows the Book button and that it is always visible in mobile emulation.

- [ ] **Step 8: Commit.**

```bash
git add src/pages/Doctors.tsx src/pages/Doctors.test.tsx src/components/doctors src/contexts/LanguageContext.tsx
git commit -m "feat: Portrait Gallery doctors page"
```

### Task 6: Phase 1 review gate

**Files:** none changed, unless the checks find defects.

- [ ] **Step 1: Run the full check.** Run `npx vitest run && npm run lint && npm run build`. Expected: tests pass, no new lint errors compared with `main`, and `✓ built`.

- [ ] **Step 2: Do a cross-page smoke check.** On the dev server, open every route in `src/App.tsx`, including `/signin`. Confirm each page renders without console errors and the navigation and footer appear. Old page bodies may still look off-style; that is expected.

- [ ] **Step 3: Push the branch.** Run `git push -u origin redesign`. Check whether Vercel lists a preview deployment for the branch. Record the preview URL, or note that previews are off.

- [ ] **Step 4: Show the owner** the navigation, footer and Doctors page in both languages and both themes, with the preview URL if there is one. Their approval here unlocks the per-page plans for the remaining pages. Start with Home.
