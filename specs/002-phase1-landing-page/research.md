# Research: Phase 1 Landing Page

**Feature**: `002-phase1-landing-page` | **Date**: 2026-09-28 | **Plan**: [plan.md](./plan.md)

These three choices are fixed by the user: React initialised with Vite (no Next.js or Astro),
Tailwind CSS, and a lightweight serverless form provider. Each section below records the
decision, the reason for it, and the alternatives that were considered.

---

## R1. Delivering static-first pages with React + Vite

**Decision**: The site is built with React 19 and Vite 6+ and is **pre-rendered at build time**.
Vite produces a server-side-rendering (SSR) build of `src/entry-server.tsx`. A Node script,
`scripts/prerender.mjs`, uses it to render complete HTML for each page:

- `/en/` and `/ar/` (the two landing pages);
- `/en/thanks/` and `/ar/thanks/` (lead-form confirmation pages for visitors without
  scripts);
- `/` (the root address, which redirects).

In the browser, `src/entry-client.tsx` loads as a deferred module and uses `hydrateRoot` to
attach React to the existing HTML.

**Rationale**: A plain Vite single-page app sends an empty `<div id="root">`. That would break
several requirements:

- spec FR-031 and SC-009: the page must work with scripts disabled;
- FR-045 and constitution Principle IV: the page must be readable before scripts load;
- FR-041 and the Bilingual Engineering Standards: search engines need real `lang`, `dir`,
  `hreflang` and canonical tags in the HTML.

Pre-rendering meets all of these while staying on plain React + Vite. The approach is
documented in Vite's own SSR guide. It needs no router library, because only a handful of
fixed pages exist.

**Alternatives considered**:

- **Client-only SPA**: rejected because it fails the no-script, SEO and time-to-content
  requirements.
- **`vite-react-ssg` / `vite-plugin-ssr` (Vike)**: these would work, but add a framework-like
  dependency for a problem that about 60 lines of prerender script solve.
- **Next.js / Astro**: excluded by the user.

---

## R2. JavaScript budget vs. the React runtime

**Decision**: Ship React 19. The browser bundle loads as a `type="module"` script, which is
deferred and never blocks rendering. The page is fully readable and usable from the
pre-rendered HTML alone (R1).

The build step `scripts/check-budgets.mjs` records the compressed size of all initial
JavaScript. CI enforces Total Blocking Time ≤ 200 ms through Lighthouse CI.

**Risk (see plan, Complexity Tracking)**: React 19 plus react-dom is roughly 58–62 KB
compressed. Constitution Principle IV says: "Total blocking JavaScript (main thread) MUST
stay under 50 KB compressed."

Because the bundle is deferred, none of it is render-blocking, so the plan reads the rule as
applying to render-blocking script: that is 0 KB, plus a head script of under 1 KB.

If the project owner reads the rule as "all initial JavaScript", there is a fallback:
alias `react` and `react-dom` to `preact/compat` in the production build only. The React
source code stays unchanged, and the bundle drops to about 15 KB. That fallback needs the
owner's approval.

**Alternatives considered**:

- **Preact from the start**: rejected, because the user chose React.
- **Hydrating only interactive islands**: it still ships the react-dom runtime, so it saves
  little, and it adds complexity.

---

## R3. Form service for LeadForm

**Decision**: **Web3Forms** (`POST https://api.web3forms.com/submit`).

**Rationale**:

- It works from a plain HTML `<form method="POST">` with no scripts. The hidden `redirect`
  field sends visitors to `/{lang}/thanks/` (spec FR-031).
- With scripts, the same endpoint accepts `fetch` with a JSON response. That enables the
  inline success message and the preserved-input error state (FR-030).
- It emails every submission to the address the access key is tied to (constitution
  Principle III).
- It has a free honeypot spam filter (the `botcheck` field) and no visible challenge (spec
  Edge Case "Spam").
- The free tier allows 250 submissions a month, which is enough for launch.
- The access key is designed to be public, so no secret is exposed.

**Alternatives considered**:

- **Formspree**: the free tier allows only 50 submissions a month, and custom redirect after
  submit (`_next`) is a paid feature. That weakens the no-script path.
- **Netlify Forms**: it ties the site to Netlify hosting, which is not decided.

**To verify during implementation** (quickstart step V6): the free plan honours the `redirect`
field for a no-script submission.

---

## R4. Tailwind version and how tokens are wired

**Decision**: **Tailwind CSS 3.4**, configured in `tailwind.config.js` and written as an ES
module because `package.json` sets `"type": "module"`. PostCSS runs Tailwind plus
Autoprefixer.

- Colour tokens are declared **once** as CSS custom properties in `src/styles/tokens.css`,
  using RGB channel values (for example `--color-ink: 17 17 15`).
- The config maps each token to `rgb(var(--color-x) / <alpha-value>)`.
- This satisfies the constitution rule "declared exactly once … CSS custom properties … which
  the Tailwind theme then consumes". It also lets the photo fade use
  `from-ink/0 to-ink`.

**Rationale**: The user asked for a `tailwind.config.js`. Tailwind 4 prefers CSS-first
`@theme` configuration and treats a JS config as legacy. Version 3.4 also has the logical
utilities needed for RTL (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`) and the
`rtl:` and `ltr:` variants.

**Alternatives considered**: Tailwind 4 with `@config`. It works, but mixes two
configuration styles, which confuses maintainers.

**Existing files**: The current `tailwind.config.js` and `src/styles/globals.css` are out of
date:

- `screens` are `sm:390 / lg:1440`;
- `accent.dark` is `#7D8C3E`, which fails AA contrast;
- there are no muted, line or line-dark tokens;
- there are no spacing, type roles or radius tokens.

Both files are **replaced**, not patched. See [contracts/design-tokens.md](./contracts/design-tokens.md)
for the exact token map.

---

## R5. Fonts

**Decision**: Self-host WOFF2 subsets in `public/fonts/`:

- **Manrope**: a variable font (weights 400–700, which covers 400, 600 and 700), Latin
  subset. Target ≤ 40 KB.
- **IBM Plex Sans Arabic**: static 400 and 700, Arabic subset. Target ≤ 80 KB combined.

The sources are the Google Fonts originals, subset with `pyftsubset` (fonttools) via
`scripts/subset-fonts.mjs`. Only the critical weight for the current page is preloaded:
Manrope on `/en/` and Plex Arabic 400 on `/ar/`. Fonts use `font-display: swap`.

**Critical fix found**: the Arabic `unicode-range` in the current `globals.css` **excludes
ASCII digits U+0030–0039**. The spec requires Western digits on the Arabic page, so prices
would fall back to Tahoma. The Arabic subset and `unicode-range` MUST include U+0030–0039.

**Rationale**: This meets the constitution's font budgets (Principle IV) and its weight
limits (Arabic 400/700; Latin 400/600/700).

**Alternatives considered**:

- **Loading from Google Fonts**: adds a third-party connection and does not allow custom
  subsets.
- **@fontsource packages**: acceptable, but their subsets do not include the exact
  digit-inclusive Arabic range above.

---

## R6. Responsive images and asset preparation

**Decision**: `scripts/build-images.mjs` uses **sharp** and runs before `vite build`. It reads
`assets.config.json` and writes to `public/img/` (git-ignored), plus
`src/generated/image-manifest.json`, which records widths, formats, intrinsic sizes and the
low-quality placeholder colour.

- **Photos** (hero, story, process): generated at widths 640, 960, 1280 and 1920, in AVIF,
  WebP and JPEG, with separate portrait crops for mobile and wide crops for desktop.
- **Testimonials** (`design/stitch/testimonials/1–8.jpg`): generated at 480 and 960 wide
  (they are shown at card width, not full screen), with no other alteration except the
  compliance crop on screenshot 5.
- **Screenshot 5 compliance crop**:
  - Source is 1199 × 965 px. The painkiller sentences run from "أقل حاجة كنت باخد ٦ أقراص
    مسكن" to "كنت اتمرنت", at roughly y ≈ 180–600 inside the first bubble.
  - The script cuts out that horizontal band. It joins the rows above it (y ≈ 0–180, "المهم
    إن أنا حاسة بتحسن أكتر من تاريخي كله في الجيم") to the rows below it (the bubble's
    timestamp row and the second bubble, y ≈ 600–965). The bubble background is flat, so
    the join is seamless.
  - The exact pixel rows are recorded in `assets.config.json` and confirmed by eye
    (quickstart V9).
  - The transcription and translation for item 5 exclude the removed sentences.
- **Logo**: `public/logo.png` (1254 × 1254) becomes `public/img/logo-gray-{96,192}.{webp,png}`,
  using sharp's `grayscale()` and a resize for the header (about 40 px, served at 2×) and
  footer. The original stays untouched as the source file.

**Rationale**: This meets constitution Principle IV (multiple widths, modern formats, explicit
dimensions). It keeps the sources in git and the generated files out of it. The compliance
edits can be repeated and reviewed as config values.

**Alternatives considered**:

- **vite-imagetools**: works for imports, but can't do the testimonial splice or produce the
  manifest the SSR build needs.
- **Manual editing in an image editor**: can't be repeated, and has no review trail.

**Content note**: the only coach photos available are Stitch-generated renders in
`design/stitch/assets/`, which are AI-generated, and the logo portrait. The PRD requires real
professional photography. Generated renders MAY be used only in non-production builds, and a
build flag `SITE_ENV=production` fails if any asset is marked `placeholder: true`.

---

## R7. Bilingual content and number formatting

**Decision**: There is no i18n library.

- Each language has a copy file: `src/data/copy/en.json` and `src/data/copy/ar.json`.
- A typed `useCopy()` hook reads from `LocaleContext`, and structured files use `{ en, ar }`
  fields.
- Numbers are formatted with `Intl.NumberFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-EG')`.
  This gives Western digits on both pages while keeping Arabic grouping and currency wording.
- The content validator **rejects any string containing Eastern Arabic digits U+0660–0669**
  (or the Persian digits U+06F0–06F9). This keeps them out permanently.

**One-off data fix**: `src/data/pricing.json` currently holds `"٤٥ دقيقة"`,
`"٤ × ٤٥ دقيقة"`, `"٤ جلسات"`, `"وفّر ٨٠٠ جنيه"` and `"ضمان استرداد الأموال ١٠٠٪"`. These
become `"45 دقيقة"`, `"4 × 45 دقيقة"`, `"4 جلسات"`, `"وفّر 800 جنيه"` and
`"ضمان استرداد الأموال 100%"`. The validator then prevents any regression.

**Rationale**: The page has two languages and a fixed set of strings, so a library adds weight
without benefit. Using `Intl` follows the constitution's rule on numeral, date and currency
formatting.

---

## R8. Things that must work without scripts, without layout shift

**Decision**: A head script of under 1 KB runs before first paint. It:

- sets `document.documentElement.classList.add('js')`;
- redirects the root address to the saved language (`/`) or to `/en/`.

CSS then puts each enhancement behind the `.js` class:

- **FAQ**: answers are pre-rendered **expanded**. `.js [data-faq-item]:not([data-open])
  [data-faq-panel] { display: none }` collapses them before paint, so there is no layout
  shift. Without scripts, all answers are visible (User Story 6, scenario 4).
- **Mobile header**: `position: sticky` together with the hide-on-scroll transform applies
  only under `.js`. Without scripts, the header scrolls away with the page.
- **LeadForm**: a real `<form action="https://api.web3forms.com/submit" method="POST">` with
  hidden `access_key`, `redirect`, `subject`, `botcheck`, `lang` and `source` fields. React
  takes over `onSubmit` for `fetch` when scripts run.
- **Root redirect**: `/index.html` holds the head script plus
  `<meta http-equiv="refresh" content="0;url=/en/">` for visitors without scripts. The body
  holds two plain links, "English" and "العربية", as a fallback.

**Rationale**: This meets FR-031, FR-039, FR-044, SC-009 and the Edge Case "no flash of the
wrong language", with no measurable layout shift.

---

## R9. Header behaviour, section tracking and the language switcher

**Decision**:

- `useHideOnScroll` listens to `scroll` in a passive listener with `requestAnimationFrame`.
  Below 1200 px it hides the header after 8 px of downward scrolling and shows it on any
  upward scroll or on `focusin`. It respects `prefers-reduced-motion`, applying the change
  with no transition.
- `scroll-margin-top: 64px` on every section keeps linked sections from being hidden behind
  the header.
- `useActiveSection` uses an IntersectionObserver to track the section in view.
  LanguageSwitcher sets its `href` to `/{other}/#{activeId}`. Without scripts it falls back
  to `/{other}/`.
- The saved language is stored in `localStorage` under `tff-lang`, with every access wrapped
  in try/catch. It is set when the visitor clicks the switcher. It is non-tracking and never
  sent anywhere.

---

## R10. Testing and quality tooling (constitution Principles I and II)

| Concern | Tool |
|---|---|
| Formatting | Prettier, with a shared `.prettierrc` |
| Static analysis | ESLint (flat config): `typescript-eslint`, `eslint-plugin-react`, `react-hooks`, `jsx-a11y`, `import`; `--max-warnings 0` |
| Physical-direction classes | `scripts/check-logical-props.mjs` fails on `ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`, `text-left`, `text-right` and `rounded-*` in `src/` |
| Raw hex in components | the same script fails on `#[0-9a-f]{3,8}` or `[…px]` values outside `tokens.css` |
| Type checking | `tsc --noEmit` (strict) |
| Unit / component | Vitest + @testing-library/react + jsdom |
| End-to-end, no-script, accessibility | Playwright + `@axe-core/playwright`; Web3Forms is mocked with `page.route` |
| Visual regression | Playwright `toHaveScreenshot` for `en`/`ar` at 390, 768 and 1440 wide, per section |
| Performance | Lighthouse CI on mobile, for `/en/` and `/ar/`: LCP ≤ 2.5 s, TBT ≤ 200 ms, CLS ≤ 0.1 |
| Security | Snyk Code (DeepCode) and Snyk Open Source, both in CI |
| Pre-commit | Husky + lint-staged (Prettier and ESLint on staged files) |
| Content | `scripts/validate-content.mjs` checks against JSON Schema (ajv) and custom rules |

Content validation runs in Node only (at build time and in CI), so ajv never ships to the
browser.

---

## R11. Hosting

**Decision (recommendation, not blocking)**: any static host that serves `dist/` as-is. The
recommended host is **Cloudflare Pages**: free, HTTPS, a global CDN including a Cairo point
of presence, and header rules. The plan relies only on static files plus a `_headers` file
for caching and security headers. Moving to another host (Netlify, Vercel static, GitHub
Pages) needs no code changes. The final choice waits on PRD DR-08 (domain).
