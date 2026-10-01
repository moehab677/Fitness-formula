# Quickstart & Validation: Phase 1 Landing Page

**Feature**: `002-phase1-landing-page`

This guide shows how to run the site and prove it meets the spec. It is a run guide: the
implementation belongs in `tasks.md`.

## Prerequisites

- Node.js 22 LTS or newer (tested on 26.1) and npm 11.
- Python 3 with `fonttools` and `brotli` (`pip install fonttools brotli`), used only by
  `npm run fonts` for subsetting.
- A `.env.local` file at the repository root:

  ```text
  VITE_SITE_URL=http://localhost:4173
  VITE_BOOKING_URL=https://calendly.com/<account>/<event>
  VITE_WEB3FORMS_KEY=<access key from web3forms.com, tied to the site manager's email>
  VITE_WHATSAPP_E164=+20XXXXXXXXXX
  ```

## Commands

| Command                                       | Does                                                                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `npm install`                                 | Installs dependencies                                                                                                    |
| `npm run fonts`                               | Subsets Manrope for English and Cairo/Tajawal for Arabic into `public/fonts/`, including U+0030–0039 in the Arabic range |
| `npm run images`                              | Builds the responsive images, the grayscale logo and the cropped screenshot 5 into `public/img/`, plus the manifest      |
| `npm run validate:content`                    | Checks the schema and rules for every file in `src/data/`                                                                |
| `npm run dev`                                 | Starts the Vite dev server with client rendering, for layout work                                                        |
| `npm run build`                               | Runs `images`, then `validate:content`, then `vite build` (client + SSR), then `prerender`, then `check:budgets`         |
| `npm run preview`                             | Serves `dist/` at http://localhost:4173                                                                                  |
| `npm run lint` / `format:check` / `typecheck` | Constitution Principle I gates                                                                                           |
| `npm test`                                    | Vitest unit and component tests                                                                                          |
| `npm run test:e2e`                            | Playwright: behaviour, no-script, accessibility (axe) and visual regression                                              |
| `npm run lhci`                                | Lighthouse CI against `npm run preview`                                                                                  |

## Validation scenarios

Run these against `npm run build && npm run preview` unless a scenario says otherwise.

| #   | Scenario                                              | How                                                                                                                     | Expected                                                                                                                                                                                                         |
| --- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| V1  | 12 sections in order, both languages (US1, SC-001)    | `npm run test:e2e -- sections`                                                                                          | The ids from `hero` to `footer` are in registry order on `/en/` and `/ar/`. There is no horizontal scroll at 320, 390, 768, 1200 or 1440 px                                                                      |
| V2  | Alternating grounds and photo layout (FR-002, FR-011) | Visual snapshots at 390 and 1440 wide, in `en` and `ar`                                                                 | At 390, the photos are full-bleed with the fade. At 1440, Hero and Process have text first and Story has photo first, mirrored on `/ar/`. Neighbouring grounds differ                                            |
| V3  | Tokens and contrast (FR-001, FR-004, SC-006)          | `npm test -- tokens`, plus axe `color-contrast` in e2e                                                                  | The token values match [design-tokens.md](./contracts/design-tokens.md), and there are zero contrast violations                                                                                                  |
| V4  | Primary CTA to lead form (US2)                        | e2e, with Web3Forms mocked                                                                                              | Each of the 4 primary CTAs focuses `#lead-name`. Invalid submits send no request. A valid submit shows the exact confirmation with the name                                                                      |
| V5  | Form failure paths (US2 scenario 4)                   | e2e, mocking a `success:false` response and aborting the route                                                          | Input is kept, and the error shows the booking and WhatsApp links                                                                                                                                                |
| V6  | **Real delivery** (SC-003)                            | Manually submit once on `/en/` and once on `/ar/` with the real key. Repeat on `/en/` with scripts disabled in DevTools | Two emails arrive within 2 minutes with all 5 fields plus `lang` and `source`. The no-script submission lands on `/en/thanks/`                                                                                   |
| V7  | Secondary CTA and BOOK A SESSION (US3)                | e2e                                                                                                                     | Every one has `href = VITE_BOOKING_URL`, `target=_blank`, `rel` containing `noopener`, and comes after the primary CTA in DOM order                                                                              |
| V8  | Pricing and digits (US4)                              | e2e, plus `npm run validate:content`                                                                                    | Both options, the terms, the guarantee and the button render in order. `/ar/` text has no characters U+0660–0669. The price reads "2,000"                                                                        |
| V9  | **Screenshot 5 compliance crop**                      | Open `public/img/testimonial-5-960.webp`                                                                                | The painkiller sentences ("أقل حاجة كنت باخد ٦ أقراص مسكن …") are gone. The first line and the second bubble are intact, with no visible seam. The transcription and translation of t-05 match the cropped image |
| V10 | **Grayscale logo**                                    | Open `/en/` and `/ar/`                                                                                                  | The header and footer logo has no green. The source `public/logo.png` is unchanged                                                                                                                               |
| V11 | **Pricing digits migrated**                           | `npm run validate:content`                                                                                              | Passes. `git diff src/data/pricing.json` shows the 5 Arabic strings converted to Western digits                                                                                                                  |
| V12 | Testimonials on both pages (US7)                      | e2e                                                                                                                     | 8 items on `/ar/`. The same 8 unaltered images on `/en/`, each with its English translation beneath it                                                                                                           |
| V13 | Language switch keeps position (US5, SC-008)          | e2e: scroll to `#faq` on `/en/`, activate the switcher                                                                  | Lands on `/ar/#faq`. Opening `/` afterwards goes to `/ar/`                                                                                                                                                       |
| V14 | Default language                                      | Fresh browser profile, open `/`                                                                                         | Redirects to `/en/`, even with the browser set to Arabic                                                                                                                                                         |
| V15 | Mobile header (FR-039)                                | e2e at 390 wide                                                                                                         | Hidden after scrolling down, shown on scroll up and on Tab focus. An anchor jump never hides the section heading                                                                                                 |
| V16 | FAQ (US6)                                             | e2e with keyboard, reduced motion and no scripts                                                                        | Enter and Space toggle it, and `aria-expanded` updates. Reduced motion makes it instant. Without scripts, all answers are visible                                                                                |
| V17 | No-script page (SC-009)                               | e2e with `javaScriptEnabled: false`                                                                                     | The content reads correctly, CTAs are anchors or links, and the form posts                                                                                                                                       |
| V18 | Performance (SC-004)                                  | `npm run lhci` (mobile)                                                                                                 | LCP ≤ 2.5 s, TBT ≤ 200 ms and CLS ≤ 0.1 on `/en/` and `/ar/`                                                                                                                                                     |
| V19 | Budgets                                               | `npm run check:budgets` (part of the build)                                                                             | Arabic fonts ≤ 80 KB, Latin fonts ≤ 50 KB. Render-blocking JS ≤ 1 KB. Initial JS ≤ 75 KB brotli (see the approved Complexity Tracking entry in [plan.md](./plan.md))                                             |
| V20 | Accessibility (SC-005)                                | e2e axe at 390, 768 and 1440, for `en` and `ar`                                                                         | Zero critical or serious issues                                                                                                                                                                                  |
| V21 | Content editing (SC-007)                              | Add an FAQ item to `faqs.json`, then `npm run build`                                                                    | The new item appears with no code change. A malformed item fails the build with a clear message                                                                                                                  |
