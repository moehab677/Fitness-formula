<!--
SYNC IMPACT REPORT (remove before committing)
Version change: 3.0.0 -> 3.1.0
Bump type: MINOR (approved Arabic typography update; English typography and all
layout and component tokens are unchanged)
Trigger: client approved a fitness-oriented Arabic type pairing while explicitly
preserving the English typography.

Modified sections:
  - Arabic typography: Cairo Black 900 for headings and Tajawal 400/700 for body
    and labels, locally subset from Google Fonts. English typography, layout,
    spacing and component tokens are unchanged.
  - Arabic font-weight exception: approved Cairo 900 plus Tajawal 400/700; the
    existing Arabic font payload budget remains 80 KB.
Unchanged: English typography, WCAG 2.2 AA, reduced motion, RTL/LTR parity,
layout tokens and the ban on medical, fabricated or fake-urgency claims.

Follow-up TODOs:
  - Remove this report before committing.
-->
# The Fitness Formula Constitution

## Core Principles

### I. Code Quality & Automated Analysis

Every source file committed to the repository MUST pass automated quality,
static analysis, and security gates before merge. No exceptions are granted
for deadline pressure.

- **Prettier** MUST enforce consistent formatting across all file types (HTML,
  CSS/SCSS, JS/TS, JSON, Markdown). A shared `.prettierrc` configuration is
  committed to the repository root and MUST NOT be overridden per-developer.
- **ESLint** MUST enforce static analysis with a strict, framework-appropriate
  ruleset (e.g., `eslint-plugin-jsx-a11y` for accessibility linting,
  `eslint-plugin-import` for import hygiene). Rules MUST NOT be disabled inline
  without a code-review-approved justification comment citing the specific
  reason and a TODO to re-enable where applicable.
- **DeepCode** (Snyk Code) MUST run AI-powered semantic code analysis on every
  pull request to detect bugs, security vulnerabilities, and code quality
  issues that escape syntactic linters. Critical and high-severity DeepCode
  findings MUST block merge.
- **Snyk** MUST run dependency vulnerability scanning on every pull request and
  on a scheduled basis against the default branch. Critical and high-severity
  findings MUST block merge. Medium-severity findings MUST be triaged within
  one sprint. Dependency updates MUST be tracked via Snyk's automated fix PRs
  or an equivalent automated tool (e.g., Dependabot, Renovate).
- **Pre-commit hooks** (via Husky + lint-staged or equivalent) MUST run
  Prettier and ESLint on staged files. CI MUST independently verify formatting
  and linting so local hook bypass does not weaken the gate.
- **Zero-warning policy**: the CI build MUST treat ESLint warnings as errors.
  No warning is acceptable in the default branch.

**Rationale:** A premium bilingual site serving two scripts and two directions
has a high surface area for subtle regressions. Separating DeepCode (semantic
code analysis) from Snyk (dependency vulnerability scanning) ensures both code
quality and supply-chain security are addressed by purpose-built tools rather
than a single catch-all.

### II. Testing Standards

Every testable behavior MUST be validated by at least one automated check
covering accessibility and layout parity across both language variants.

- **WCAG 2.2 AA accessibility** is the baseline. Automated tools (axe-core,
  Lighthouse CI) MUST run on every page and language variant in CI. Manual
  keyboard and screen-reader audits (NVDA on Windows, VoiceOver on macOS/iOS)
  MUST be conducted before each release against a documented checklist covering
  navigation, FAQ accordion, language switcher, forms, and CTA flows —
  including the primary-CTA lead form and its success state.
- **Exact RTL/LTR layout parity**: visual regression tests (e.g., Playwright
  screenshot comparisons or Percy/Chromatic) MUST capture every section and
  component state in both `dir="rtl"` (Arabic) and `dir="ltr"` (English) at
  mobile, tablet, and desktop breakpoints. A diff exceeding the approved
  threshold MUST block merge. Parity checks MUST include:
  - The primary-CTA form layout, field order, and validation messages in both
    directions.
  - The post-submission success message rendered identically (content-wise) in
    both languages.
  - The secondary-CTA button alignment relative to the primary CTA in every
    placement section (Hero, Coaching Offer, Final CTA).
- **Test coverage is not a vanity metric**: coverage targets MUST NOT be set
  arbitrarily. Instead, every user-facing behavior listed in the PRD acceptance
  criteria (§23) MUST have a corresponding test. Untested acceptance criteria
  MUST be tracked as blocking issues.

**Rationale:** The bilingual, accessibility-first nature of this project means
that partial testing leaves entire user populations unverified. Parity testing
catches the subtle breakages (mirrored padding, flipped icons, form field
direction, accordion chevron direction) that manual review misses at scale.

### III. Conversion Architecture

The site MUST implement a strict dual-path CTA system that separates
low-commitment inquiries from ready-to-book visitors. This principle governs
every CTA placement, label, destination, form behavior, confirmation message,
client journey sequence, and pricing presentation across both language
variants.

#### Dual-Path CTA System

- **Primary CTA** — exact English label: **"[ GET STARTED ] Tell me about
  your goals"** / equivalent Egyptian Arabic label — MUST be visually prominent
  (filled button, high-contrast, large hit target) in every placement section
  (Hero, Coaching Offer, Final CTA). Clicking or activating the primary CTA
  MUST route the visitor to a lightweight static lead-capture form (inline
  on-page or in a designated section) collecting exactly five fields:
  1. **Name** (text, required)
  2. **WhatsApp number** (tel, required)
  3. **Goal** (text or select, required — what the visitor wants to achieve)
  4. **Struggle** (text or select, required — what has held them back)
  5. **Preferred time to be contacted** (select or text, required)
- The form subtitle / supporting text MUST convey: "Tell me about your goals"
  in the visitor's active language.
- **Form submission** MUST use a managed serverless form endpoint (e.g.,
  Formspree, Web3Forms, or Netlify Forms). The endpoint MUST deliver submission
  data directly as an email to the site manager. No custom backend, server-side
  runtime, database, or self-hosted API is permitted — strictly adhering to the
  no-backend architecture constraint.
- **Post-submission behavior**: upon successful submission, the form MUST be
  hidden and replaced with the exact confirmation message:
  > "Thanks, [Name]. I'll reach out to understand where you are today and
  > recommend the right next step."
  where `[Name]` is dynamically populated from the visitor's submitted Name
  field. This message MUST be rendered in the visitor's active language. The
  Arabic equivalent MUST convey the identical meaning in natural Egyptian
  Arabic — not a literal word-for-word translation.
- **Form validation**: all five fields MUST validate inline before submission.
  Validation messages MUST appear in the visitor's active language. The form
  MUST NOT submit if any required field is empty or invalid (WhatsApp number
  format validation is required).
- **Form accessibility**: the form MUST meet WCAG 2.2 AA — all fields MUST
  have visible labels, programmatic label association, clear error messages,
  and logical focus order. The form MUST be fully operable via keyboard alone.
- **Secondary CTA** — exact English label: **"Already know what you need?
  Book a session"** / equivalent Egyptian Arabic label — MUST be visually
  subordinate to the primary CTA (e.g., text link, outlined button, or smaller
  type treatment) in every placement. Clicking the secondary CTA MUST navigate
  directly to the Calendly booking URL (external link, opening in a new tab
  with `rel="noopener"`).
- **CTA hierarchy MUST be consistent**: in every placement section, the primary
  CTA MUST appear first (visually and in DOM order) and the secondary CTA MUST
  follow. The visual weight difference MUST be immediately obvious (e.g.,
  filled button vs. text link or outlined button).
- **No friction**: no login, no account creation, no multi-step wizard. The
  primary path is one form; the secondary path is one link.

#### Client Journey Sequence

The site MUST present a 4-step Client Journey sequence that communicates the
coaching process. The steps MUST be rendered in the following exact order with
their exact numbering and labels:

1. **01. Start with a free assessment** — a quick call in which the coach
   learns the visitor's goals, struggles and where they need support.
2. **02. Identify what matters most** — if the coach can help, together they
   identify the areas that need the most attention for the consultation.
3. **03. Build your plan** — the 1-to-1 online consultation turns training,
   nutrition, lifestyle and progress into a clear, practical plan.
4. **04. Come back when you need me** — no forced subscription; the client
   books another consultation whenever they need a review or guidance.

The Client Journey section MUST end immediately with the dual-path CTAs
(Primary CTA followed by Secondary CTA) in their standard hierarchy. Step
labels and descriptions MUST be rendered in the visitor's active language. The
Arabic equivalents MUST convey the identical meaning in natural Egyptian
Arabic.

#### Pricing Offer

The site MUST NOT display generic or placeholder pricing. The Pricing /
Coaching Offer section MUST present exactly the following tiers:

| Tier | Duration | Price | Note |
|------|----------|-------|------|
| **1-to-1 Fitness Consultation** | 45 minutes | 700 EGP / session | — |
| **4 Sessions Bundle** | 4 × 45 minutes | 2,000 EGP | Save 800 EGP |

- **Terms** MUST be explicitly displayed directly beneath the pricing tiers:
  > "No subscription. No long-term commitment."
- **Guarantee** MUST be explicitly displayed directly beneath the terms:
  > "100% Money-Back Guarantee. If you don't feel the session was valuable,
  > you get your money back. No questions asked."
- Immediately following the guarantee, a **"BOOK A SESSION"** CTA MUST be
  rendered. This CTA routes directly to the Calendly booking URL (same
  destination as the Secondary CTA). The "BOOK A SESSION" CTA in this
  placement MUST be prominent (filled button), as the visitor has already
  reviewed the offer and pricing — reducing friction to booking is the priority
  here.
- All pricing values, terms, and guarantee text MUST be rendered in the
  visitor's active language. Currency (EGP) and numeric values MUST use
  locale-appropriate formatting per the Bilingual Engineering Standards.

**Rationale:** The dual-path CTA respects two distinct visitor mindsets: those
who need guidance choosing the right coaching path (primary — lower friction,
higher conversion potential) and those who already know what they want
(secondary — direct booking). The 4-step Client Journey demystifies the
coaching process, reducing anxiety for first-time visitors. The exact pricing
with explicit terms and a money-back guarantee eliminates ambiguity and builds
trust — critical for a premium solo-coach brand. The serverless form endpoint
ensures lead capture without violating the static-first architecture. The
exact confirmation message builds personal trust by using the visitor's name
and setting a clear expectation for the next step.

### IV. Performance & Scroll Animation

Mobile Core Web Vitals at p75 MUST meet the following thresholds on both
language variants before every release:

| Metric | Threshold | Enforcement |
|--------|-----------|-------------|
| LCP    | ≤ 2.5 s   | CI gate via Lighthouse CI or WebPageTest API |
| INP    | ≤ 200 ms  | Lab proxy (TBT ≤ 200 ms) in CI; field validation post-launch |

- **Aggressive responsive image pipeline**: every content image MUST be served
  through an automated pipeline that generates multiple widths (at minimum
  640 px, 960 px, 1280 px, 1920 px), modern formats (WebP + AVIF with JPEG
  fallback), and explicit `width`/`height` attributes or CSS `aspect-ratio` to
  prevent layout shift. Hero images MUST be preloaded with
  `<link rel="preload">` and `fetchpriority="high"`. Below-fold images MUST
  use `loading="lazy"`.
- **Arabic font weight budgeting**: Arabic web fonts carry significantly larger
  glyph sets than Latin equivalents. The project MUST:
  - Subset Arabic fonts to the Unicode ranges actually used (Arabic block +
    Arabic Supplement + common punctuation).
  - Limit Arabic font weights to a maximum of two (regular + bold) unless a
    third weight is justified by an approved design-system decision. The
    approved Arabic pairing is Cairo Black 900 for headings and Tajawal 400/700
    for body and label text; these three weights are the approved exception.
  - Set a per-language font payload budget: ≤ 80 KB total transfer size for
    Arabic fonts, ≤ 50 KB for Latin fonts (compressed, all weights combined).
  - Use `font-display: swap` (or `optional` if fallback metrics are tightly
    matched) and preload only the critical weight for above-the-fold text.
- **Scroll-triggered image sequence animation**: the site MAY include a
  scroll-driven image sequence (advancing frames proportionally to scroll
  position) to create a video-like narrative effect. When implemented, the
  following rules are non-negotiable:
  - **`prefers-reduced-motion` MUST be strictly respected**: when
    `prefers-reduced-motion: reduce` is active, the entire image sequence MUST
    be replaced with a single static representative image. No frame-by-frame
    animation, no scroll-linked interpolation, no progressive reveal.
  - Frames MUST be progressively loaded (preloading ahead of scroll position)
    to prevent blank or flickering frames on mid-tier devices.
  - The image sequence MUST NOT increase LCP above the 2.5 s threshold. Frames
    below the fold MUST use `loading="lazy"` or equivalent deferred loading.
  - Directional animations and overlaid text within the sequence MUST mirror
    correctly for RTL layouts.
  - If frames fail to load (network error, corruption), the section MUST
    degrade gracefully to a static fallback image with no visible JavaScript
    errors.
- **Third-party script discipline**: analytics (GA4), tracking (Meta Pixel),
  booking links (Calendly), and the serverless form endpoint MUST NOT block
  the critical rendering path. Every third-party dependency MUST have a
  documented justification. No new dependency is added without performance
  impact measurement.
- **JavaScript budget**: the page MUST be fully readable and all CTAs
  (including the lead form) MUST be functional before non-critical JavaScript
  finishes loading. Total blocking JavaScript (main thread) MUST stay under
  50 KB compressed.

**Rationale:** The target audience browses primarily on mobile, often on
mid-tier devices and variable connections. A premium brand perception is
destroyed by slow loads. Arabic font files are the single largest risk to LCP;
explicit budgeting prevents creep. The image sequence animation is a powerful
storytelling tool but MUST NOT compromise performance or accessibility —
hence the strict reduced-motion and degradation rules.

### V. Maintainability & Extensibility

The codebase and content architecture MUST enable the client to add, edit, and
reorder content without requiring code changes, redesigns, or a custom backend
database.

- **Structured data for testimonials**: testimonial/result items MUST be stored
  as local JSON files or Markdown files with frontmatter, conforming to the
  schema in PRD §9.1 (`id`, `type`, `displayName`, `consent`, `language`,
  `quote`/`story`, `resultSummary`, `images`, `date`, `order`/`featured`).
  Adding a new testimonial MUST require only creating a new data entry and
  rebuilding/deploying — no template or component changes.
- **Structured data for FAQs**: FAQ items MUST be stored as local JSON files or
  Markdown files with frontmatter, conforming to PRD §9.2 (`id`, `question`
  per language, `answer` per language, `order`, `published`). The FAQ accordion
  component MUST render dynamically from this data. Adding, reordering, or
  hiding a question MUST require only a data change.
- **Structured data for pricing**: pricing tiers MUST be stored as a local JSON
  file or Markdown file with frontmatter, containing all tier details (`id`,
  `name` per language, `duration`, `price`, `currency`, `note` per language,
  `order`). The pricing component MUST render dynamically from this data.
  Updating a price, adding a tier, or changing terms MUST require only a data
  change — no component modifications.
- **Structured data for journey steps**: the Client Journey steps MUST be
  stored as a local JSON file or Markdown file with frontmatter, containing
  step details (`id`, `stepNumber`, `title` per language, `description` per
  language, `order`). The journey component MUST render dynamically from this
  data. Reordering, relabeling, or adding a step MUST require only a data
  change.
- **No custom backend databases**: content storage MUST use flat files in the
  repository (JSON or Markdown with frontmatter). The architecture MAY later
  migrate to a git-based CMS (e.g., Decap CMS, Tina) or a headless CMS API,
  but MUST NOT use a self-hosted relational or document database. Components
  MUST consume a normalized data interface so the storage backend can change
  without rewriting presentation code.
- **Separation of content and presentation**: bilingual content strings,
  testimonials, FAQs, pricing tiers, journey steps, CTA labels, and form
  field labels/messages MUST be externalized from component markup. Components
  MUST receive localized content via props, context, or a content layer —
  never via hard-coded strings.
- **Extensibility without redesign**: the section-based page architecture MUST
  support inserting, reordering, or removing sections (e.g., a future Blog
  section or Packages block) through configuration, not by refactoring the
  page component tree.

**Rationale:** The client is a solo coach, not a developer. The site's
long-term value depends on his ability to add proof (testimonials, results),
update FAQs, adjust pricing, and modify the coaching journey as his practice
grows. Locking content into code or requiring a database creates a maintenance
dependency that contradicts the project's static-first, no-backend philosophy.

## Bilingual Engineering Standards

These standards govern every engineering decision that intersects with the
bilingual (Egyptian Arabic RTL / English LTR) requirement. They are
cross-cutting and apply in addition to the Core Principles above.

- **`lang` and `dir` attributes** MUST be set correctly on the `<html>`
  element per language route (`lang="ar" dir="rtl"` / `lang="en" dir="ltr"`).
  Mixed-language inline content (e.g., a Latin brand name within Arabic text)
  MUST use `<span lang="en" dir="ltr">` to ensure correct bidirectional
  rendering and screen-reader pronunciation.
- **`hreflang` alternates and canonical URLs** MUST be present and correct on
  every page, linking the Arabic and English variants bidirectionally.
- **CSS logical properties** (`margin-inline-start`, `padding-inline-end`,
  `border-inline`, `inset-inline`, etc.) MUST be used instead of physical
  properties (`margin-left`, `padding-right`) for all directional spacing and
  positioning. Physical properties are permitted only for truly
  direction-independent layout (e.g., vertical spacing).
- **Matched Arabic/Latin typography scales**: the design system MUST define
  paired typefaces for Arabic and Latin scripts with matched visual weight,
  x-height alignment, and color density. Arabic text typically requires larger
  `font-size` and increased `line-height` relative to Latin at the same
  optical weight; these adjustments MUST be encoded in the type scale tokens,
  not applied ad-hoc. No `letter-spacing` or `text-transform: uppercase` MUST
  be applied to Arabic text.
- **Exact component state parity**: every interactive component (buttons, nav,
  language switcher, FAQ accordion, lead form, CTAs) MUST implement identical
  states in both language variants: default, hover, focus-visible, active,
  disabled, loading, error, and success.
- **No cosmetic divergence**: icon direction (arrows, chevrons, progress
  indicators), carousel navigation, and horizontal scroll behavior MUST mirror
  correctly per `dir` attribute. Photography with strong directional
  composition MUST be reviewed for suitability in both layouts.
- **Scroll-triggered animations** (including the image sequence) MUST honor
  `prefers-reduced-motion` identically in both RTL and LTR layouts.
  Directional animations (e.g., slide-in-from-left) MUST mirror correctly for
  RTL (slide-in-from-right). When `prefers-reduced-motion: reduce` is active,
  all scroll-triggered reveals, parallax effects, and transition animations
  MUST be replaced with instant rendering or a single subtle opacity fade
  (duration ≤ 150 ms).
- **Numeral, date, and currency formatting** MUST use the `Intl` API or an
  equivalent locale-aware formatter. The numeral style (Western Arabic vs
  Eastern Arabic-Indic) is governed by DR-17 and MUST be configurable without
  code changes.
- **No machine translation**: all Arabic content MUST be written natively in
  Egyptian Arabic by a human copywriter and reviewed by the client. Automated
  translation tools MUST NOT be used for user-facing text.

## Design System Tokens

These standards bind the implementation to the approved landing-page design
("The Fitness Formula – Landing page", adopted 2026-09-30), which supersedes the
Stitch "Kinetic Editorial" system. They are cross-cutting and apply in addition to
the Core Principles and Bilingual Engineering Standards.

- **Single source of truth**: the canonical token values are the ones recorded
  in this section. Tokens MUST be declared exactly once in the frontend, as CSS
  custom properties in the global stylesheet that the Tailwind theme consumes.
  Components MUST NOT contain raw hex values, pixel font sizes or one-off
  spacing values; every visual value MUST resolve to a token or a named
  component style built only from tokens.
- **Color tokens** (the only permitted palette):

  | Token | Value | Role |
  |-------|-------|------|
  | `bg` | `#0B0B09` | Page ground (the whole page is dark) |
  | `bg-2` | `#10100E` | Secondary ground (bands, footer) |
  | `card` | `#161613` | Raised surfaces (gradient end) |
  | `card-2` | `#1D1D19` | Raised surfaces (gradient start), inputs |
  | `line` | white at 8% | Decorative hairlines |
  | `line-2` | white at 14% | Decorative outlines (ghost buttons, chips) |
  | `accent` | `#C3D86C` | Interactive highlight, accent text, primary fills |
  | `accent-2` | `#DDEE8E` | Light end of accent gradients and hover states |
  | `ink` | `#F5F4EF` | Headings and strong text |
  | `text` | `#DDDBD4` | Body text |
  | `muted` | `#A9A89F` | Secondary text |
  | `dim` | `#8E8D83` | Tertiary text, labels, functional input borders |
  | `on-accent` | `#11110F` | Text and icons on accent fills |
  | `warn` | `#FF8A7A` | "Challenge" / "not for" icon accents and form error messages only |

- **Contrast-verified pairings** (WCAG 2.2 AA, measured on the darkest and
  lightest grounds, `bg` / `card-2`): ink 17.89 / 15.35; text 14.22 / 12.2;
  muted 8.24 / 7.08; dim 5.9 / 5.06; accent 12.53 / 10.76; accent-2 15.66 /
  13.44; warn 8.6 / 7.38; on-accent on accent 12.03, on accent-2 15.03. Rules:
  - `line` and `line-2` (1.19–1.43:1) are decorative only. Form-field borders
    MUST use `dim` or `accent`; focus indicators MUST use `accent`
    (≥ 3:1 non-text contrast).
  - Text on any gradient or translucent surface MUST meet its ratio at every
    point of the surface.
  - Any new token or pairing MUST be added to this list with its measured
    ratio before use.
- **Typography**: English typography remains unchanged. On `lang="ar"`, Cairo
  Black 900 is used for headings and Tajawal 400/700 for body and label text,
  including inline Arabic. Arabic font faces MUST be selected only on Arabic
  routes. Latin type roles (size / line-height, mobile
  <768 px and tablet <1200 px values where they differ):

  | Role | Desktop | Tablet | Mobile | Weight | Tracking (Latin) |
  |------|---------|--------|--------|--------|------------------|
  | `display` (h1) | 112 / 0.92 | 84 | 56 | 800 | -0.02em |
  | `headline-xl` (h2) | 72 / 0.98 | 56 | 42 | 700 | -0.015em |
  | `headline-lg` (h3) | 32 / 1.05 | 32 | 26 | 700 | 0.005em |
  | `headline-md` | 30 / 1.05 | 30 | 26 | 700 | 0 |
  | `headline-sm` | 26 / 1.15 | 26 | 22 | 700 | 0 |
  | `metric` (prices) | 104 / 0.9 | 104 | 76 | 800 | -0.02em |
  | `metric-sm` (results) | 28 / 1 | 28 | 28 | 700 | 0 |
  | `body-lg` (lead) | 22 / 1.6 | 22 | 19 | 400 | 0 |
  | `body-md` | 18 / 1.65 | 18 | 18 | 400 | 0 |
  | `body-card` | 17 / 1.55 | 17 | 17 | 400 | 0 |
  | `body-sm` | 15 / 1.45 | 15 | 15 | 400 | 0 |
  | `label-lg` (buttons) | 15 / 1.2 | 15 | 15 | 600 | 0.08em |
  | `label-md` (nav, links) | 13 / 1.3 | 13 | 13 | 500–600 | 0.1em |
  | `label-sm` (chips, kickers) | 12 / 1.3 | 12 | 12 | 600 | 0.14em |

  Headings and labels are uppercase in Latin only. The Arabic variant of every
  role MUST be defined in the same token set: line-height ≥ 1.25× the Latin
  value for body and label roles and ≥ 1.15× for display and headline roles,
  letter-spacing `0`, no uppercase. No rendered text is smaller than 12 px.
  Weights: Latin 400–800 from the Manrope variable font within the 50 KB Latin
  budget; Arabic headings use Cairo 900 and body/labels use Tajawal 400/700
  within the approved three-weight exception (Principle IV).
- **Breakpoints and reference frames**: reference frames are **Mobile 390 px**
  and **Desktop 1440 px** (tablet check at 768 px). Mobile-first min-width
  breakpoints: `md` 768 px, `lg` 1200 px, `2xl` 1440 px. Content sits in a
  centred canvas of at most 1320 px plus inline padding of 64 px (≥ 1200 px),
  32 px (768–1199 px) and 16 px (< 768 px). The layout MUST work from 320 px
  with no horizontal scroll, and all placement MUST use logical properties so
  it mirrors in RTL.
- **Spacing scale**: a 4 px grid. Margin, padding and gap values MUST be
  multiples of 4 px taken from the Tailwind spacing scale; the named tokens
  (`xs` 4, `sm` 8, `md` 16, `lg` 24, `xl` 40, `2xl` 80, `3xl` 120) remain
  valid aliases. Sections are separated by 128 px (88 px below 768 px).
- **Page ground**: the whole page is dark (`bg`) with two soft accent radial
  washes behind the content. The previous alternating dark/light rule is
  retired.
- **Shape**: corner radius tokens `xs` 10, `sm` 14, `md` 20, `lg` 28, `xl` 36,
  `2xl` 44 px and `full` (pills). Cards use `lg`, compact cards `md`, icon
  tiles and inputs `sm`, buttons, chips and the nav `full`.
- **Elevation and effects** (all built from tokens):
  - Shadows: `card` (inset top highlight plus a soft drop shadow), `card-hover`
    (deeper drop shadow plus an accent glow), `glow` (accent glow for primary
    buttons and accent tiles), `pop` (floating badges).
  - Gradients are permitted for: accent fills (`accent-2` → `accent`), card
    surfaces (`card-2` → `card`), accent text, the two ambient page washes,
    decorative highlight and shine sweeps, and the mobile photo fade below.
  - Backdrop blur is permitted for the glass navigation bar and for chips that
    sit on photography, and MUST have a translucent solid fallback.
- **Photography**: below 1200 px a section photo is full-bleed at the top of
  its section and its bottom half fades into the page ground; text may overlap
  the faded area only where its contrast ratio is met. From 1200 px photos sit
  in the rounded, gradient-bordered frame of the design, side by side with the
  text on the grid.
- **Motion**: entrance reveals (rise 36 px, ≤ 900 ms, `cubic-bezier(.2,.7,.2,1)`)
  and hover lifts (≤ 500 ms) are permitted. Continuous motion (the keyword
  ticker, button shine, ambient washes) MUST be decorative and hidden from
  assistive technology, and a ticker that runs longer than 5 s MUST offer a
  visible pause control. Carousels MUST NOT auto-advance. When
  `prefers-reduced-motion: reduce` is set, all animation and transitions MUST
  stop (content shown in its final state).
- **Focus visibility**: every focusable element MUST show a `focus-visible`
  indicator of at least 2 px solid `accent` with an offset, including elements
  with rounded corners.

## Development Workflow

These process standards ensure that all five Core Principles are enforced
continuously, not just at launch.

- **Pre-commit**: Husky + lint-staged runs Prettier and ESLint on staged files.
- **Pull request CI pipeline** (in order):
  1. Install dependencies (lockfile-only).
  2. Prettier check (format verification, not auto-fix).
  3. ESLint (zero-warning, zero-error).
  4. TypeScript type check (if applicable).
  5. Unit and integration tests (including lead-form submission and
     confirmation-message rendering tests).
  6. Accessibility audit (axe-core on all pages × both languages).
  7. Visual regression tests (RTL + LTR × mobile + tablet + desktop).
  8. Lighthouse CI performance audit (mobile, both languages).
  9. DeepCode (Snyk Code) semantic analysis.
  10. Snyk dependency vulnerability scan.
  11. Build (static export).
- **Merge policy**: all 11 CI steps MUST pass. At least one code review
  approval is required. Self-merging without review is prohibited.
- **Release checklist**: before every production deployment, the manual
  accessibility audit (keyboard + screen reader) and cross-browser spot check
  (latest Chrome, Safari, Firefox, Edge; iOS Safari; Android Chrome) MUST be
  completed and logged.

## Governance

This constitution is the highest-authority technical and quality reference for
The Fitness Formula project. In case of conflict between this document and any
other project artifact (spec, plan, task list, or code comment), this
constitution prevails.

- **Amendment procedure**: any change to this constitution MUST be proposed as
  a pull request modifying `.specify/memory/constitution.md`, reviewed by at
  least one project contributor, and approved by the project owner before
  merge. The Sync Impact Report (HTML comment at the top of this file) MUST
  accompany every amendment PR and MUST be removed before the amendment is
  committed to the default branch.
- **Versioning policy**: the constitution follows semantic versioning:
  - **MAJOR**: removal or backward-incompatible redefinition of a principle.
  - **MINOR**: addition of a new principle or material expansion of guidance.
  - **PATCH**: clarifications, wording, typo fixes, non-semantic refinements.
- **Compliance review**: every pull request review MUST include a check that
  the changes do not violate any principle in this constitution. Violations
  MUST be flagged as blocking review comments. Intentional deviations require
  a constitution amendment first — not a code-level exception.
- **Periodic review**: this constitution SHOULD be reviewed quarterly or after
  any major architectural decision to ensure it remains current and
  actionable.

**Version**: 3.0.0 | **Ratified**: 2026-09-23 | **Last Amended**: 2026-09-30
