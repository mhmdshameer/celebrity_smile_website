# Celebrity Smile website redesign: "Quiet Luxury"

Date: 2026-11-01
Status: awaiting owner approval

## Intent and why

celebritysmile.sa is the public website of Celebrity Smile Dental Clinic in Jeddah. It was built earlier with Lovable and Cursor. The owner wants visitors to **feel quality** within the first few seconds, and the current site does not deliver that: it uses a loud bright pink, generic stock photos, plain card grids and little sense of craft.

The redesign gives every public page one calm, premium, consistent look ("Quiet Luxury"), with refined motion. It keeps the same content, the same pages and the same backend.

## Decisions made by the owner

- **Direction: Quiet Luxury.** Chosen from three mockups (Quiet Luxury, Cinematic Night, Bright & Modern).
- **Doctors page layout: Portrait Gallery.** Arch-shaped portraits, filter chips by speciality, a "Book with Dr …" button that slides up on hover, and Consultant/Specialist labels. The reference mockup is in `public/_mockups/doctors-page.html`, layout 1. It is a local file, ignored by Git.
- **Every public page gets redesigned**, so the site stays consistent.
- **Release all at once.** The work happens on the `redesign` branch. It is merged into `main` (which Vercel deploys) only when every page is finished and approved. Urgent fixes may still go to `main` on their own and are then merged into `redesign`.
- **Only today's images are used.** No new photography is coming.
  - The real clinic photos are `clinicOne.jpg`, `clinicTwo.jpg` and `CLINIC PHOTO.jpeg`. Use them where a photo earns its place.
  - The page heroes that use stock photos (`services.jpg`, `departments.jpg`, `pricelist.jpg`, `blog.jpg`, `contact.jpg`, `landingPage.jpg`, `bg.jpg`) become type-led hero sections, or use a real clinic photo.
  - The cartoon banners `privilegeBanner.png` and `offerbanner.png` are replaced with designed sections in markup. They are hot pink and have English text baked in, so they break the palette and the Arabic version.
  - Small feature illustrations (`expertcare.png` and others) may be replaced with line icons if they clash.
- **The Pediatric Dentistry page gets a warmer, softer, child-friendly version of the style.** It keeps the same type, structure, quality and motion as the rest of the site, so it still clearly belongs. The differences:
  - A softer, lighter palette, for example blush, peach or soft sky alongside the plum.
  - Rounder shapes.
  - Gentle, playful touches aimed at parents of young children.
  - It must not slide back into the old loud pink-and-doodle look.
- **The doctor data stays as it is.** Each doctor has only a name (EN/AR), specialties (EN/AR) and a photo. No bios, years of experience or languages will be added.

## Goals

1. One visual system used by every public page: colours, type, spacing, buttons, cards, section headings and motion.
2. The redesigned shared navigation and footer.
3. Each of the 12 public pages redesigned in that system (listed below).
4. Arabic gets the same quality as English, with full right-to-left (RTL) layout on every page.
5. Light and dark mode both look intentional.
6. The site stays fast and works well on phones, which most patients will use.

## Non-goals

- The admin panel (`/admin/*`) and the sign-in page keep their current look. Only clinic staff see them. They must keep working once the shared colours change.
- No backend, API or database changes.
- No new content types (doctor bios, for example) and no new pages.
- No change to booking. Booking stays WhatsApp-based (`wa.me/966556005567`) with the existing analytics tracking (`trackBookAppointment`).

## Anti-goals: what would make this a failure

- It looks "AI-generated" or template-like: generic gradients, emoji icons, busy effects.
- Motion that is showy, slow to get out of the way, or makes the page feel heavy. Motion should feel graceful and finish quickly.
- The Arabic version feels like an afterthought: broken RTL, a mismatched font, or English-only decoration.
- Pages get slower, especially on mobile (large unoptimised images, heavy video).
- Any existing feature is lost: language switch, theme switch, WhatsApp booking, the Google reviews embed, Google Analytics, the map, the offer and service data from the API, or the blog.

## The pages

| Route | File | Notes |
|---|---|---|
| `/` | `src/pages/Index.tsx` plus `src/components/index/*` | Hero, about, statistics, why choose us, featured doctors, services, offers, departments, technology, gallery, blog preview, testimonials, promo video |
| `/about` | `About.tsx` | |
| `/doctors` | `Doctors.tsx` | Portrait Gallery (decided) |
| `/services` | `Services.tsx` | Data from `getServicesApi` |
| `/departments` | `Departments.tsx` | |
| `/pediatric-dentistry` | `PediatricDentistry.tsx` | Longest page (about 800 lines) |
| `/offers` | `Offers.tsx` | Data from `getOffersApi` |
| `/price-list` | `PriceList.tsx` | |
| `/privilege-card` | `PrivilegeCard.tsx` | |
| `/blog` and `/blog/:id` | `Blog.tsx`, `BlogPost.tsx`, `BlogCard.tsx` | Blog posts contain rich text from the admin editor |
| `/contact` | `Contact.tsx` | Map and appointment form |
| `*` | `NotFound.tsx` | Restyle lightly |

Shared parts: `Navigation.tsx`, `Footer.tsx`, `FloatingWhatsApp.tsx`, `ScrollToTop.tsx`, and the shadcn UI primitives in `src/components/ui/`.

## Visual system

**Colour.** The brand colour comes from the logo, a deep plum (around `#97195a`). It replaces the current bright pink (`--primary: 322 98% 62%`, plus hard-coded values such as `#FD3DB5`). Supporting colours:
- Warm ivory background, around `#faf6f1`.
- Deep plum-black text, around `#2a1520`.
- A muted gold accent, around `#b08d57`, used sparingly for hairlines and small labels.
- A pale blush, around `#ead6df`, for portrait backgrounds.

Dark mode uses a deep plum-black background with ivory text and the same accents.

**Type.**
- English headings: Cormorant Garamond, a serif, used large, with italics for the emphasised words in plum.
- English body and interface text: Manrope.
- Arabic: a paired Arabic typeface with a similar refined feel, applied through the existing `font-arabic` hook. That class is used in `LanguageContext.tsx` but is not defined anywhere yet.

**Shapes and layout.** Generous whitespace, thin gold hairlines, and arch-topped image frames as a recurring signature. Buttons are restrained: solid plum with a small radius, plus underlined text links. Cards are soft rather than heavy-shadowed.

**Photography.** Use the clinic's own photos (for example `public/clinicOne.jpg`, the reception) instead of stock imagery. The current Doctors page hero (`/doctors.jpg`, a stock office photo with a pink tint) is removed. The owner was told why and did not object. Doctor photos are PNGs on white backgrounds. On light surfaces they blend in with `mix-blend-mode: multiply`. On dark surfaces they sit inside a light frame.

**Motion.** framer-motion is already installed.
- On load and on scroll: elements fade in, rise slightly and lose a light blur, staggered.
- Images reveal with a clip wipe and a slow, subtle zoom.
- Hover: cards lift gently and images scale slightly.
- Filters cross-fade.
- Everything respects `prefers-reduced-motion`.

## Constraints

- Stack: Vite, React 18, TypeScript, Tailwind, shadcn/ui, react-router. Deployed on Vercel (see `vercel.json`).
- The site is bilingual through `LanguageContext`, with `document.documentElement.dir` set per language. Every layout must mirror correctly in RTL.
- The theme comes from `ThemeProvider` (default light, class-based dark mode).
- The page content (texts, offers, services, doctors, blogs) stays the same. Copy may be tightened where a layout needs it (for example a shorter hero line), in both languages.
- Leave alone: the seasonal decorations component (`EidDecorations.tsx`), which is currently unused; Google Analytics; and the Google reviews embed.

## Calls made by the designer (owner to check)

- **Where the Doctors filters and labels get their data.** Doctors have only free-text specialties, so both are derived on the front end, with no backend change:
  - A small keyword table maps the specialty text, in English and Arabic, to a category: General, Root canal, Crowns & dentures, Braces, or Children. For example, "endodont" or "root canal" maps to Root canal.
  - A chip is shown only when at least one doctor is in that category.
  - A doctor that matches nothing still appears under "All".
  - The labels come from words already in the data: "Prof."/"Professor" in the name, or "Consultant"/"Specialist" in the specialty.
  - The result: a doctor added later in the admin panel works without a developer, as long as their specialty uses ordinary wording.
- **Phones get a visible Book button.** The hover-only "Book with Dr …" button becomes a visible button on touch devices.
- **The review order:**
  1. The visual system, navigation, footer and the Doctors page are built first and shown to the owner together, as the approval gate for the whole system.
  2. The remaining pages follow, each shown for approval.
  3. Pages are reviewed in the local preview, and also through Vercel's preview deploy of the `redesign` branch if the project has previews turned on. Checking that is part of the work.

## What is left to the builder

- Exact shades, type scale, spacing scale and motion timings, within the direction above.
- The specific Arabic font.
- The layout of each page other than Doctors, following the system. Pages are shown to the owner one at a time for approval.
- How the shared tokens are structured (CSS variables in `src/index.css` plus Tailwind theme), and how to stop the admin panel from looking broken when the shared colours change.
- Whether the homepage promo video stays, moves or becomes a lighter element.
