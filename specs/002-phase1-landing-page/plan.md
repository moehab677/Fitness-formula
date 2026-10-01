# Implementation Plan: Phase 1 Landing Page (Master Specification)

**Branch**: `002-phase1-landing-page` | **Date**: 2026-09-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-phase1-landing-page/spec.md`, governed by
constitution v2.3.0.

## Summary

Phase 1 builds a 12-section landing page for The Fitness Formula in two languages: Egyptian
Arabic (right-to-left) and English (left-to-right).

- **Stack**: React 19 and Vite, **pre-rendered at build time** into static HTML for `/en/`
  and `/ar/`, then made interactive in the browser (research R1). There is no server, no
  Next.js and no Astro.
- **Styling**: Tailwind CSS 3.4. `tailwind.config.js` reads the constitution's tokens, which
  are declared once as CSS custom properties. This includes `accent-dark #5C6B17`, the
  alternating dark and light section grounds, and the single permitted mobile photo fade.
- **Content**: all structured content comes from validated JSON files: `journey.json`,
  `pricing.json`, `faqs.json`, `testimonials.json`, plus the per-language copy files.
- **Conversion**: the dual-path CTA system routes to one LeadForm per page, which posts to
  **Web3Forms**. It works with scripts (inline success message) and without them (redirect to
  a thanks page).
- **Asset preparation**: a repeatable build step using sharp produces:
  - the responsive photo sets;
  - the **grayscale logo**;
  - the **compliance-cropped screenshot 5**.

  The **Eastern-to-Western digit migration of `pricing.json`** is a one-off data task, and a
  validator rule then prevents regressions.

## Technical Context

| Item | Value |
|---|---|
| **Language/Version** | TypeScript 5.x (strict), running on Node.js 22 LTS or newer (the local machine has 26.1) |
| **Primary Dependencies** | React 19, react-dom 19, Vite 6+, @vitejs/plugin-react, Tailwind CSS 3.4, PostCSS, Autoprefixer. Build-only: sharp, ajv, fonttools (Python) |
| **Storage** | Version-controlled JSON files in `src/data/`. No database |
| **Testing** | Vitest with Testing Library (unit and component); Playwright with @axe-core/playwright (end-to-end, no-script, accessibility, visual regression); Lighthouse CI |
| **Target Platform** | Static files on a CDN (recommended: Cloudflare Pages, research R11). Browsers: current and previous major versions of Chrome, Safari, Firefox and Edge, plus iOS Safari and Android Chrome |
| **Project Type** | Static web application with a single frontend and no backend |
| **Performance Goals** | Mobile, 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms (TBT ≤ 200 ms in the lab), CLS ≤ 0.1, on both languages |
| **Constraints** | Fonts: Arabic ≤ 80 KB, Latin ≤ 50 KB. Initial JavaScript ≤ 75 KB brotli (see Complexity Tracking). The page must work without scripts. WCAG 2.2 AA. Only logical CSS properties. No gradient except the photo fade. Western digits only |
| **Scale/Scope** | 1 page × 2 languages, plus 2 thanks pages and 1 redirect page. 12 sections, about 20 components, 4 structured content files, 2 copy files, 8 testimonials, and fewer than 250 leads a month |

No open technical unknowns remain. Every choice is resolved in [research.md](./research.md)
(R1–R11).

## Constitution Check

*Gate: must pass before Phase 0 research, and again after Phase 1 design.*

| Constitution rule | How the plan meets it | Before research | After design |
|---|---|---|---|
| **I. Code quality**: Prettier, strict ESLint, DeepCode, Snyk, pre-commit hooks, zero warnings | R10 tooling. The CI in `.github/workflows/ci.yml` runs all 11 constitution steps in order | PASS | PASS |
| **II. Testing**: WCAG 2.2 AA automated on every page and language; RTL/LTR visual parity at mobile, tablet and desktop, including form and CTA states; every acceptance criterion tested | Playwright with axe on `en` and `ar` at 390, 768 and 1440. Screenshot tests per section and state. Quickstart V1–V21 map to the spec's user stories and success criteria | PASS | PASS |
| **III. Conversion**: exact CTA labels; 5-field form; managed serverless endpoint that emails the manager; exact confirmation message; inline validation; Client Journey + dual CTAs; exact pricing, terms, guarantee and BOOK A SESSION | Copy and data rules in [data-model.md](./data-model.md). Web3Forms contract in [contracts/lead-form-submission.md](./contracts/lead-form-submission.md). CTA placement in the section registry | PASS | PASS |
| **IV. Performance**: LCP and INP limits; image pipeline with 4 widths and AVIF/WebP/JPEG; font subsetting, budgets and weight limits; third-party discipline; **initial JS ≤ 75 KB brotli** | R5 fonts, R6 images, Lighthouse CI gate. The only third party is Web3Forms, called only when the form is submitted | PASS | **PASS**: the user explicitly selected React and approved a 75 KB initial JavaScript budget for this phase. Current measured bundle is 68.2 KB brotli; Lighthouse CI continues to enforce LCP, TBT and CLS |
| **V. Maintainability**: structured JSON for testimonials, FAQs, pricing and journey; no database; content kept separate from presentation; sections reorderable by configuration | Four data files plus copy files, validated with JSON Schema. `src/sections/registry.ts` drives the page | PASS | PASS |
| **Bilingual Engineering Standards**: `lang`/`dir`, hreflang and canonical tags; logical properties; matched type scales; no Arabic letter-spacing or uppercase; mirroring; reduced motion; `Intl` formatting; no machine translation | Routes contract. Lint script for physical-direction classes. Arabic line-height and weight variables. `ar-EG-u-nu-latn` number formatting. Human translations marked approved, and a production build fails without them | PASS | PASS |
| **Design System Tokens (v2.3.0)**: only palette tokens; approved contrast pairings; `accent-dark` on light grounds; Manrope and Plex Arabic only; breakpoints 768/1200/1440 with a 1440 cap; spacing scale; 0 radius; no shadows; gradient only for the mobile photo fade; alternating grounds; focus visibility | [contracts/design-tokens.md](./contracts/design-tokens.md) replaces Tailwind's colours, spacing, radius, shadow and background-image scales outright, so values outside the tokens cannot be expressed. A token test recomputes the contrast ratios | PASS | PASS |
| **Development Workflow**: the 11-step CI order; merge policy; release checklist | The CI file mirrors that order. The release checklist is added to `docs/release-checklist.md` | PASS | PASS |

**Gate result: PASS.** The user approved an initial JavaScript budget of 75 KB brotli while retaining React. The measured 68.2 KB initial bundle is within budget.

## Project Structure

### Documentation (this feature)

```text
specs/002-phase1-landing-page/
├── plan.md               # This file
├── research.md           # Phase 0: decisions R1–R11
├── data-model.md         # Phase 1: content entities, validation rules, section registry
├── quickstart.md         # Phase 1: run and validation guide (V1–V21)
├── contracts/
│   ├── design-tokens.md          # tokens.css and tailwind.config.js map
│   ├── lead-form-submission.md   # LeadForm → Web3Forms
│   └── routes-and-components.md  # public URLs and the component props contract
├── checklists/requirements.md
└── tasks.md              # Phase 2 (/speckit-tasks; not created here)
```

### Source code (repository root)

```text
index.html                      # Vite HTML template (head script slot and root)
package.json                    # "type": "module"; scripts listed in quickstart
vite.config.ts
tailwind.config.js              # REPLACED: ESM, reads the tokens.css variables
postcss.config.js               # REPLACED: ESM
tsconfig.json
eslint.config.js, .prettierrc, .lintstagedrc, .husky/pre-commit
assets.config.json              # image jobs: photo crops, testimonial list, logo grayscale,
                                #   screenshot-5 crop rows
lighthouserc.json
public/
├── logo.png                    # SOURCE, kept unchanged
├── fonts/                      # generated WOFF2 subsets (npm run fonts)
├── img/                        # GENERATED by npm run images (git-ignored)
├── robots.txt
└── _headers                    # caching and security headers for the host
design/stitch/testimonials/1–8.jpg   # SOURCE testimonial screenshots (unchanged)
scripts/
├── prerender.mjs               # SSR bundle → dist/{,en/,ar/,en/thanks/,ar/thanks/}index.html, sitemap
├── build-images.mjs            # sharp: responsive sets, grayscale logo, screenshot-5 crop, manifest
├── subset-fonts.mjs            # pyftsubset wrapper (Arabic range includes U+0030–0039)
├── validate-content.mjs        # ajv schemas plus cross-rules (no Eastern digits, key parity,
                                #   grounds, consent, translations)
├── check-budgets.mjs           # font and JS size report and gates
└── check-logical-props.mjs     # bans physical-direction classes, raw hex, arbitrary px
src/
├── entry-client.tsx            # hydrateRoot
├── entry-server.tsx            # render(lang, route) → { html, head }
├── App.tsx                     # LocaleProvider → Header → <main> sections → Footer
├── config/site.ts, social.json
├── i18n/LocaleContext.tsx, useCopy.ts, format.ts   # Intl (ar-EG-u-nu-latn)
├── data/
│   ├── journey.json            # existing, unchanged
│   ├── pricing.json            # existing: digit migration and destination fix
│   ├── faqs.json               # new
│   ├── testimonials.json       # new: t-01…t-08
│   ├── copy/en.json, copy/ar.json   # new
│   └── schemas/*.schema.json   # new
├── generated/image-manifest.json    # generated
├── sections/
│   ├── registry.ts
│   └── Hero.tsx, Problem.tsx, Story.tsx, Approach.tsx, Process.tsx, Achieve.tsx,
│       Results.tsx, Offer.tsx, NotFor.tsx, Faq.tsx, FinalCta.tsx, SiteFooter.tsx
├── components/
│   ├── PrimaryCTA.tsx, SecondaryCTA.tsx, DualCTA.tsx, LeadForm.tsx,
│   ├── SectionLabel.tsx, LanguageSwitcher.tsx, SiteHeader.tsx, SkipLink.tsx,
│   ├── PhotoSection.tsx, ResponsiveImage.tsx, FaqAccordion.tsx,
│   ├── PricingOption.tsx, TestimonialCard.tsx, JourneySteps.tsx, Logo.tsx
├── hooks/useHideOnScroll.ts, useActiveSection.ts, useReducedMotion.ts
├── lib/whatsapp.ts (normalise and validate), leadSubmit.ts (fetch + timeout)
└── styles/tokens.css (REPLACES the token block), globals.css (REPLACED: fonts, grounds,
    focus, reduced motion)
tests/
├── unit/          # tokens, contrast, whatsapp, format, content rules, LeadForm states
├── e2e/           # sections, cta, lead-form, no-js, language, header, faq, testimonials
├── a11y/          # axe: en/ar × 390/768/1440
└── visual/        # toHaveScreenshot per section × lang × width
.github/workflows/ci.yml   # the 11-step constitution pipeline
docs/release-checklist.md, docs/content-editing.md
```

**Structure decision**: a single static frontend project at the repository root. The existing
`src/data/` and `src/styles/` stay in place. `tailwind.config.js`, `postcss.config.js` and
`src/styles/globals.css` are **replaced**, because they encode the superseded v2.1 values:

- breakpoints `sm:390` and `lg:1440`;
- `accent-dark #7D8C3E`, which fails AA contrast;
- an Arabic font range that excludes digits.

## Implementation phases (the input for `/speckit-tasks`)

1. **Scaffold and quality gates**:
   - Vite + React + TypeScript setup; the `package.json` scripts;
   - ESLint, Prettier, Husky and lint-staged;
   - the CI workflow skeleton with all 11 steps.
2. **Design tokens and global CSS**:
   - `tokens.css`;
   - the new `tailwind.config.js` and `postcss.config.js`, following
     [contracts/design-tokens.md](./contracts/design-tokens.md) (including
     `accent-dark #5C6B17`, the section grounds, the photo-fade background and the focus
     ring);
   - `globals.css`: font faces, `lang`-scoped type variables, reduced motion;
   - the token and contrast unit tests;
   - `check-logical-props`.
3. **Assets (build-stage tasks from clarification)**:
   - 3a. `npm run fonts`: subsets, with the Arabic range including U+0030–0039.
   - 3b. **Grayscale logo**: `build-images.mjs` job
     `logo → public/img/logo-gray-{96,192}.{webp,png}`. The source is kept unchanged.
   - 3c. **Crop screenshot 5**: a `build-images.mjs` splice job that removes the painkiller
     band (approximately y 180–600 of 1199 × 965). The exact rows go in `assets.config.json`.
     Visual check per quickstart V9.
   - 3d. Testimonial image sets for all 8, plus the photo sets and manifest.
     Placeholder-photo flag in place until the client's photography arrives.
4. **Content and validation**:
   - 4a. **Convert Eastern digits in `pricing.json`** (five Arabic strings) and change
     `cta.destination` to `"booking"`.
   - 4b. JSON Schemas and `validate-content.mjs`, with all the rules in the data model.
   - 4c. `faqs.json` (7 items, `needsConfirmation` where it applies), `testimonials.json`
     (t-01…t-08 with transcriptions; English translations supplied by the client), and
     `copy/en.json` / `copy/ar.json`.
5. **Rendering foundation**:
   - `entry-server` and `entry-client`, `prerender.mjs`;
   - the routes and head tags (canonical, hreflang, Open Graph, preloads);
   - the root redirect and thanks pages;
   - the head script (`.js` class and redirect);
   - LocaleContext, `useCopy` and `format`.
6. **Core components**: PrimaryCTA, SecondaryCTA, DualCTA, SectionLabel, LanguageSwitcher,
   SiteHeader (hide-on-scroll), SkipLink, ResponsiveImage, PhotoSection, and Logo (grayscale
   asset).
7. **LeadForm**: validation, WhatsApp normalisation, fetch with a 10 s timeout, the success,
   error and offline states, and the no-script post and redirect. Covered by unit and e2e
   tests.
8. **Sections 01–12**, in registry order, each with its visual snapshot:
   - Hero, Story and Process use PhotoSection;
   - Process renders `journey.json` followed by the dual CTAs;
   - Offer renders `pricing.json`;
   - Results renders the testimonials;
   - Faq uses the accordion;
   - FinalCta holds the LeadForm.
9. **Hardening**:
   - axe, visual and no-script test suites; Lighthouse CI; budgets;
   - `_headers`, `sitemap.xml` and `robots.txt`;
   - `docs/content-editing.md` (SC-007) and the release checklist.

## Dependencies on the client (these block a production build, not development)

- Real coach photography with mobile and desktop crops (the Stitch renders are placeholders
  only).
- Human-written English translations for testimonials t-01…t-08, with t-05 matching the
  cropped image.
- Final English and Egyptian Arabic copy for all sections, and answers to the FAQ items that
  depend on DR-09, DR-10 or DR-16.
- The Calendly event URL, the Web3Forms key (tied to the manager's inbox), the WhatsApp
  number, social links, and the legal page URLs.

## Complexity Tracking

| Violation / risk | Why needed | Simpler alternative rejected because |
|---|---|---|
| **Initial JavaScript budget of 75 KB brotli** | The user explicitly chose React and approved this phase's initial JavaScript ceiling. The measured initial bundle is 68.2 KB brotli. The page remains pre-rendered and usable before the deferred client bundle runs; Lighthouse CI enforces TBT ≤ 200 ms | A Preact alias is excluded by the user's explicit React requirement. The hard budget check fails above 75 KB brotli |
| **Pre-render step instead of a plain Vite SPA** (about 60 lines of script) | Required for no-script operation, SEO tags and fast first paint (spec FR-031, FR-041, FR-045; constitution Principle IV) | A plain SPA ships an empty root and fails those requirements. Frameworks that do this built-in (Next.js, Astro) are excluded by the user |
