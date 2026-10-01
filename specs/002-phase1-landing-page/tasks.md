---

description: "Task list for Phase 1 Landing Page (Master Specification)"
---

# Tasks: Phase 1 Landing Page (Master Specification)

**Input**: Design documents from `specs/002-phase1-landing-page/`: [plan.md](./plan.md),
[spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md),
the [contracts/](./contracts/) files and [quickstart.md](./quickstart.md).

**Prerequisites**: constitution v2.3.0 (`.specify/memory/constitution.md`).

**Tests**: included. Constitution Principle II requires automated accessibility,
RTL/LTR visual-parity and acceptance-criteria tests. Within each story, write the test tasks
first and confirm they fail.

**Organization**: tasks are grouped by user story (US1–US7 from spec.md), so each story can be
built and verified on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel (a different file, with no dependency on an unfinished task).
- **[Story]**: the user story the task belongs to (US1…US7). Setup, Foundational and Polish
  tasks carry no story label.
- All paths are relative to the repository root `D:\Programing\Work\C-Mostafa-Kheder`. This is
  a single static frontend project (`src/`, `scripts/`, `tests/`, `public/`).

**Tasks called out during clarification**:

- T023: grayscale logo;
- T095: crop screenshot 5;
- T077: convert Eastern digits in `pricing.json`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: set up the Vite + React + TypeScript project, the quality tooling and the CI
skeleton. See plan §Technical Context and research R1, R10.

- [X] T001 Create `package.json`.
  - Fields: `"name": "the-fitness-formula"`, `"private": true`, `"type": "module"`,
    `"engines": { "node": ">=22" }`.
  - Runtime dependencies: `react@^19`, `react-dom@^19`.
  - Dev dependencies: `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`,
    `@types/react-dom`, `@types/node`, `tailwindcss@^3.4`, `postcss`, `autoprefixer`, `sharp`,
    `ajv`, `ajv-formats`, `vitest`, `jsdom`, `@testing-library/react`,
    `@testing-library/user-event`, `@testing-library/jest-dom`, `@playwright/test`,
    `@axe-core/playwright`, `@lhci/cli`, `eslint`, `@eslint/js`, `typescript-eslint`,
    `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`,
    `eslint-plugin-import`, `globals`, `prettier`, `husky`, `lint-staged`.
  - Scripts:
    - `dev`: `vite`
    - `fonts`: `node scripts/subset-fonts.mjs`
    - `images`: `node scripts/build-images.mjs`
    - `validate:content`: `node scripts/validate-content.mjs`
    - `build:client`: `vite build`
    - `build:ssr`: `vite build --ssr src/entry-server.tsx --outDir dist-ssr`
    - `prerender`: `node scripts/prerender.mjs`
    - `check:budgets`: `node scripts/check-budgets.mjs`
    - `check:props`: `node scripts/check-logical-props.mjs`
    - `build`: `npm run images && npm run validate:content && npm run build:client && npm run build:ssr && npm run prerender && npm run check:budgets`
    - `preview`: `vite preview --port 4173 --strictPort`
    - `lint`: `eslint . --max-warnings 0`
    - `format`: `prettier . --write`
    - `format:check`: `prettier . --check`
    - `typecheck`: `tsc --noEmit`
    - `test`: `vitest run`
    - `test:e2e`: `playwright test`
    - `lhci`: `lhci autorun`
    - `prepare`: `husky`

  Then run `npm install`.
- [X] T002 [P] Create `tsconfig.json`: `strict: true`, `target: ES2022`,
  `module: ESNext`, `moduleResolution: Bundler`, `jsx: react-jsx`,
  `resolveJsonModule: true`, `noUncheckedIndexedAccess: true`,
  `include: ["src", "tests", "vite.config.ts", "vitest.config.ts", "playwright.config.ts"]`.
  Also create `tsconfig.node.json` for `scripts/*.mjs` type-checking with `checkJs`.
- [X] T003 [P] Create `vite.config.ts` with `@vitejs/plugin-react`, `build.outDir: 'dist'`,
  `build.emptyOutDir: true`, `publicDir: 'public'` and `envPrefix: 'VITE_'`. Keep the SSR
  build output in `dist-ssr/`, and the client entry at `src/entry-client.tsx` through
  `index.html`.
- [X] T004 [P] Create the root `index.html` template. It needs:
  - `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">`;
  - the placeholder `<!--head-script-->` followed by `<!--app-head-->`;
  - `<body><div id="root"><!--app-html--></div><script type="module" src="/src/entry-client.tsx"></script></body>`.

  `scripts/prerender.mjs` (T036) fills in the placeholders.
- [X] T005 [P] Create `.gitignore` with `node_modules/`, `dist/`, `dist-ssr/`, `public/img/`,
  `src/generated/`, `.env.local`, `test-results/`, `playwright-report/`, `.lighthouseci/`,
  `assets/fonts-src/*.ttf`.
- [X] T006 [P] Create `.env.example` with `VITE_SITE_URL=http://localhost:4173`,
  `VITE_BOOKING_URL=`, `VITE_WEB3FORMS_KEY=`, `VITE_WHATSAPP_E164=`, `SITE_ENV=development`,
  each with a one-line comment (see data-model §6).
- [X] T007 [P] Create `.prettierrc.json` (`printWidth: 100`, `singleQuote: true`,
  `semi: false`, `trailingComma: "all"`) and `.prettierignore` (`dist`, `dist-ssr`,
  `public/img`, `src/generated`, `design/stitch/code`).
- [X] T008 [P] Create the flat config `eslint.config.js`:
  - `@eslint/js` recommended and `typescript-eslint` strict;
  - `eslint-plugin-react` (`react/react-in-jsx-scope` off) and `react-hooks`;
  - `jsx-a11y` strict;
  - `import` (`import/no-cycle` and `import/order`);
  - browser and node globals;
  - ignore `dist`, `dist-ssr` and `src/generated`.
- [X] T009 [P] Set up Husky and lint-staged:
  - `.husky/pre-commit` runs `npx lint-staged`;
  - `.lintstagedrc.json` maps `*.{ts,tsx,js,mjs}` to `["prettier --write", "eslint --max-warnings 0"]`
    and `*.{json,css,md,html}` to `["prettier --write"]`.
- [X] T010 [P] Create `vitest.config.ts` (`environment: 'jsdom'`,
  `setupFiles: ['tests/setup.ts']`, `include: ['tests/unit/**/*.test.{ts,tsx}']`) and
  `tests/setup.ts`, which imports `@testing-library/jest-dom/vitest`.
- [X] T011 [P] Create `playwright.config.ts`:
  - `testDir: 'tests'`, `testMatch: ['e2e/**/*.spec.ts', 'a11y/**/*.spec.ts', 'visual/**/*.spec.ts']`;
  - `webServer: { command: 'npm run preview', port: 4173, reuseExistingServer: !process.env.CI }`;
  - `use.baseURL: 'http://localhost:4173'`;
  - projects `mobile-390` (390×844, `isMobile`, `hasTouch`), `tablet-768` (768×1024) and
    `desktop-1440` (1440×900), all on Chromium;
  - `expect.toHaveScreenshot.maxDiffPixelRatio: 0.01`.
- [X] T012 [P] Create `.github/workflows/ci.yml`. It runs on `pull_request` and `push` to
  `main`, on Node 22, with these steps in the constitution's order:
  1. `npm ci`
  2. `npm run format:check`
  3. `npm run lint` and `npm run check:props`
  4. `npm run typecheck`
  5. `npm test`
  6. `npx playwright install --with-deps chromium && npm run build && npx playwright test tests/a11y`
  7. `npx playwright test tests/visual`
  8. `npm run lhci`
  9. `snyk/actions/node` with `command: code test` (DeepCode)
  10. `snyk/actions/node` with `command: test --severity-threshold=high`
  11. Upload the `dist/` artifact

  Behavioural e2e (`tests/e2e`) runs inside step 5b. Snyk steps use the `SNYK_TOKEN`
  secret. All steps are required.
- [X] T013 [P] Create `lighthouserc.json`:
  - `collect.staticDistDir: "dist"`;
  - `collect.url: ["http://localhost/en/", "http://localhost/ar/"]`;
  - mobile form factor;
  - `assert.assertions`: `largest-contentful-paint ≤ 2500` (error),
    `total-blocking-time ≤ 200` (error), `cumulative-layout-shift ≤ 0.1` (error),
    `categories:accessibility ≥ 0.95` (error).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: design tokens, fonts, the image pipeline, content validation, site config, i18n,
the prerender pipeline and shared components. Every story depends on this phase.

**⚠️ CRITICAL**: no user story work starts until this phase is complete.

### Design tokens and global CSS ([contracts/design-tokens.md](./contracts/design-tokens.md))

- [X] T014 Create `src/styles/tokens.css`, which **replaces** the token block previously in
  `globals.css`.
  - `:root` declares RGB-channel colour variables exactly as follows:
    - `--color-ink: 17 17 15`
    - `--color-charcoal: 26 26 23`
    - `--color-paper: 245 243 238`
    - `--color-white: 255 255 255`
    - `--color-muted: 119 117 111`
    - `--color-line: 217 214 206`
    - `--color-line-dark: 42 42 38`
    - `--color-accent: 183 201 107`
    - `--color-accent-dark: 92 107 23`
  - Grid variables per breakpoint:
    - base: `--grid-cols: 4; --grid-margin: 20px; --grid-gutter: 16px`
    - ≥768px: 8 / 32px / 24px
    - ≥1200px: 12 / 56px / 32px
  - `--header-h: 64px`.
  - Type variables `--lh-*` and `--fw-*` for every role in contract §5.
    `:root[lang="ar"]` overrides them with the Arabic line-heights (display/headline ×1.15,
    body/label ×1.25), maps weight 500/600 to 400/700 as the contract table shows, and sets
    `--font-body: "IBM Plex Sans Arabic", Tahoma, sans-serif`.
    `:root[lang="en"]` sets `--font-body: Manrope, ui-sans-serif, system-ui, sans-serif`.
- [X] T015 **Replace** `tailwind.config.js` with an ESM `export default`:
  - `content: ['./index.html', './src/**/*.{ts,tsx}']`.
  - `theme.colors` is **replaced** (not extended) with `transparent`, `current` and the 9
    tokens, each as `'rgb(var(--color-X) / <alpha-value>)'`.
  - `theme.screens` is replaced with `{ md: '768px', lg: '1200px', '2xl': '1440px' }`.
  - `theme.spacing` is replaced with the contract §4 keys: `0`, `px`, `xs 4px`, `sm 8px`,
    `md 16px`, `lg 24px`, `xl 40px`, `2xl 80px`, `3xl 120px`, `gutter-sm/gutter/gutter-lg`,
    `margin-sm/margin/margin-lg`, `header 64px`, `target 44px`.
  - `theme.fontFamily: { sans: 'var(--font-body)' }`.
  - `theme.fontSize` holds the 12 roles from contract §5. Each has a mobile size where the
    contract gives one, applied through a `lg:` responsive utility in components, a
    `lineHeight` of `var(--lh-<role>)` and a `fontWeight` of `var(--fw-<role>)`.
  - `theme.borderRadius: { none: '0' }`, `theme.boxShadow: { none: 'none' }`.
  - `theme.backgroundImage: { 'photo-fade': 'linear-gradient(to bottom, rgb(var(--ground) / 0) 50%, rgb(var(--ground) / 1) 100%)' }`.
  - `theme.extend.transitionTimingFunction.reveal: 'cubic-bezier(0.16, 1, 0.3, 1)'` and
    `transitionDuration: { micro: '100ms', reveal: '600ms' }`.
  - `plugins: []`.
- [X] T016 [P] **Replace** `postcss.config.js` with the ESM
  `export default { plugins: { tailwindcss: {}, autoprefixer: {} } }`.
- [X] T017 **Replace** `src/styles/globals.css`.
  - Imports: `@import './tokens.css';` then `@tailwind base; @tailwind components; @tailwind utilities;`.
  - `@font-face` rules:
    - `Manrope`: `src: url(/fonts/manrope-latin-var.woff2) format('woff2')`,
      `font-weight: 400 700`, Latin `unicode-range`.
    - `IBM Plex Sans Arabic` 400 (`/fonts/ibm-plex-sans-arabic-400.woff2`) and 700
      (`/fonts/ibm-plex-sans-arabic-700.woff2`). Their `unicode-range` MUST **include
      `U+0030-0039`** (Western digits) in addition to the current Arabic ranges.
    - All use `font-display: swap`.
  - In `@layer base`:
    - `html { font-family: var(--font-body); }`;
    - `section[id] { scroll-margin-top: var(--header-h) }`;
    - `:focus-visible { outline: 2px solid rgb(var(--focus)); outline-offset: 2px }`;
    - `:root[lang="en"] .label-caps { text-transform: uppercase; letter-spacing: var(--ls) }`,
      with no letter-spacing or uppercase under `[lang="ar"]`;
    - a `prefers-reduced-motion` block that removes transforms and limits transitions to
      opacity ≤ 150ms.
  - In `@layer components`:
    - `.ground-ink`, `.ground-charcoal`, `.ground-paper` per contract §2. Each sets
      `background`, `color`, `--ground`, `--focus` and `--accent-text`.
    - `.container-canvas`: `max-width: 1440px; margin-inline: auto; padding-inline: var(--grid-margin)`.
    - `.grid-site`: `display: grid; grid-template-columns: repeat(var(--grid-cols), minmax(0, 1fr)); column-gap: var(--grid-gutter)`.
    - `.full-bleed`: `margin-inline: calc(var(--grid-margin) * -1)`.
  - The no-flash FAQ rule:
    `.js [data-faq-item]:not([data-open]) [data-faq-panel] { display: none }`.
- [X] T018 [P] Write `tests/unit/tokens.test.ts`. It parses `src/styles/tokens.css` and checks
  every colour value against contract §1. It recomputes WCAG contrast for every allowed
  pairing: ink/paper ≥ 17, accent-dark/paper ≥ 5.3, accent-dark/white ≥ 5.88, accent/ink
  ≥ 10.4, muted/white ≥ 4.6, and so on. It asserts that `tailwind.config.js` has exactly 11
  colour keys, `screens = {md:768, lg:1200, 2xl:1440}` and only `none` radius and shadow.
- [X] T019 [P] Create `scripts/check-logical-props.mjs`. It scans `src/**/*.{ts,tsx}` and
  exits 1 on:
  - the class patterns `\b-?(ml|mr|pl|pr|left|right|rounded(?!-none))-` and
    `text-(left|right)`;
  - a hex colour `#[0-9a-fA-F]{3,8}` outside `src/styles/`;
  - arbitrary values `\[[0-9.]+px\]`.

  It prints each file:line.

### Fonts (research R5)

- [X] T020 Create `scripts/subset-fonts.mjs`.
  - It downloads the OFL sources from the `google/fonts` GitHub repository into
    `assets/fonts-src/`:
    - `ofl/manrope/Manrope[wght].ttf`
    - `ofl/ibmplexsansarabic/IBMPlexSansArabic-Regular.ttf`
    - `ofl/ibmplexsansarabic/IBMPlexSansArabic-Bold.ttf`
  - It then runs `pyftsubset` with `--flavor=woff2 --layout-features='*'`:
    - Manrope, Latin range `U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2212`,
      output `public/fonts/manrope-latin-var.woff2`;
    - Plex Arabic 400 and 700, range `U+0600-06FF,U+0750-077F,U+FB50-FDFF,U+FE70-FEFF,U+0020-0040,U+005B-0060,U+007B-007E,U+00AB,U+00BB,U+200C-200F,U+2013-2014,U+2018-201E,U+2026`.
      This range **includes digits U+0030–0039**.
  - It fails if Arabic output exceeds 80 KB combined or Latin exceeds 50 KB.
  - Update `public/fonts/README.md` to describe the new files and the command.

### Image pipeline (research R6)

- [X] T021 Create `assets.config.json` with these sections:
  - `photos[]`: keys `hero`, `story`, `process`, each with `mobile` (portrait) and `desktop`
    (wide) source and crop. Sources are the placeholder renders in `design/stitch/assets/`
    and `design/stitch/assets/embedded/`, marked `placeholder: true`, with widths
    `[640, 960, 1280, 1920]` and formats `["avif", "webp", "jpeg"]`.
  - `testimonials[]`: keys `testimonial-1`…`testimonial-8` from
    `design/stitch/testimonials/{1..8}.jpg`, with widths `[480, 960]`, formats
    `["avif", "webp", "jpeg"]`, and `removeRows` only on item 5 (T095).
  - `logo`: source `public/logo.png`, `grayscale: true`, sizes `[96, 192]`, formats
    `["webp", "png"]`.
- [X] T022 Create `scripts/build-images.mjs` using sharp. For each job in
  `assets.config.json`, it writes `public/img/{key}[-{variant}]-{width}.{format}`. It then
  writes `src/generated/image-manifest.json` with
  `{ [key]: { variants: { mobile?, desktop? }, width, height, sources: { avif: [...], webp: [...], jpeg: [...] }, placeholder } }`,
  including the intrinsic dimensions used for `width`/`height` attributes. When
  `SITE_ENV=production` it exits 1 if any job has `placeholder: true`.
- [X] T023 **[Build-stage task: grayscale logo]** In `scripts/build-images.mjs`, implement the
  `logo` job.
  - Pipeline: `sharp('public/logo.png').grayscale().resize(size, size, { fit: 'cover' })`,
    writing `public/img/logo-gray-96.webp`, `logo-gray-192.webp`, `logo-gray-96.png` and
    `logo-gray-192.png`.
  - After writing, it samples the output's raw pixels and fails if any pixel has
    |R−G| or |G−B| greater than 2 (proof there is no neon green).
  - It MUST NOT modify `public/logo.png`.
  - Add the manifest key `logo`.

### Content validation infrastructure (data-model.md)

- [ ] T024 [P] Create the JSON Schemas (draft 2020-12) in `src/data/schemas/`:
  - `common.schema.json`:
    - `$defs.Localized`: `{en, ar}`, both required, `minLength 1`;
    - `$defs.LocalizedPartial`;
    - `$defs.Id`: `pattern "^[a-z0-9]+(-[a-z0-9]+)*$"`.
  - `journey.schema.json`: `steps` has exactly 4 items. `stepNumber` matches `"^0[1-4]$"`,
    `description` is "≤ 240 characters per language", and `order` is 1–4.
  - `pricing.schema.json`: `tiers` has exactly 2. `duration.minutes = 45`,
    `currency: "EGP"`, `cta.destination` is const `"booking"`, `cta.style` is const
    `"primary"`.
  - `faqs.schema.json`: `question` is "≤ 140 characters, ends with ? or ؟", `answer` is
    "≤ 900 characters", `published` is boolean, and `needsConfirmation` is an optional
    string matching `^DR-\d{2}$`.
  - `testimonials.schema.json`:
    - `type` is an enum of `testimonial|progress-story|result|screenshot`;
    - `consent.granted` is const `true`;
    - `sourceLanguage` is an enum `en|ar`;
    - `images[]` has `source`, `assetKey`, `alt`, `transcription`, `translation` and
      `complianceEdits`;
    - `if type = screenshot then images minItems 1`.
  - `copy.schema.json`: the key groups from data-model §5.
- [ ] T025 Create `scripts/validate-content.mjs` (ajv + ajv-formats). It validates each
  `src/data/*.json` and `src/data/copy/*.json` against its schema, then applies these rules.
  Each failure prints `file › id › rule` and exits 1.
  - (a) No string contains U+0660–0669 or U+06F0–06F9.
  - (b) No string contains `<` followed by a letter.
  - (c) `order` values are unique positive integers within each collection.
  - (d) `copy/en.json` and `copy/ar.json` have identical key sets.
  - (e) The pricing bundle `note` digits equal `single.price × bundle.duration.count − bundle.price` (800).
  - (f) At most one tier has `highlighted: true`.
  - (g) Every testimonial `languages` entry other than `sourceLanguage` has a non-empty
    `translation[lang]`, or the item is dropped from that language with a warning.
  - (h) Every testimonial `images[].source` file exists.
  - (i) The registry grounds rule: no two neighbouring sections share a ground, except
    `final-cta`→`footer`, and every photo section is `ink` or `charcoal`. The rule reads
    `src/sections/registry.ts` through a JSON export at `src/sections/registry.json`.
  - (j) When `SITE_ENV=production`, it fails on any `_meta.reviewStatus` other than
    `"APPROVED"`, any published FAQ with `needsConfirmation`, or any missing testimonial
    translation.
- [ ] T026 [P] Write `tests/unit/validate-content.test.ts`. It runs the validator's exported
  rule functions against fixture data in `tests/fixtures/content/`, with one failing fixture
  per rule (a)–(j) and one fixture that passes.

### Site config, i18n and copy skeleton

- [ ] T027 [P] Create `src/config/site.ts`. It exports `site = { siteUrl, bookingUrl,
  web3formsKey, whatsappNumber, defaultLang: 'en' as const }` read from `import.meta.env`,
  plus `assertSiteConfig()`. That function throws at prerender when `siteUrl` or
  `bookingUrl` is not an absolute `https:` URL (localhost `http:` is allowed outside
  production), when `web3formsKey` is not a UUID, or when `whatsappNumber` does not match
  `^\+[1-9]\d{7,14}$`. Also create `src/config/social.json` as `[]`, with the shape
  `{ platform, url }[]`.
- [X] T028 [P] Create `src/i18n/LocaleContext.tsx` (`LocaleProvider` with `lang: 'en' | 'ar'`
  and `dir`) and `src/i18n/useCopy.ts` (returns `copy[lang]`, typed from
  `src/data/copy/en.json` so that missing keys are type errors).
- [X] T029 [P] Create `src/i18n/format.ts`. It exports `formatNumber(n, lang)` using
  `new Intl.NumberFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-EG')` and
  `formatPrice(n, currency, lang, copy)`, which returns `"700 EGP"` or `"700 جنيه"`. Also
  write `tests/unit/format.test.ts`: it asserts `formatNumber(2000,'ar') === '2,000'` or the
  locale's Latin-digit grouping, and that no output contains U+0660–0669.
- [X] T030 Create `src/data/copy/en.json` and `src/data/copy/ar.json` with **every** key
  group from data-model §5: `meta`, `nav`, `cta`, `sections.{hero…footer}`,
  `approach.steps` (4), `achieve.items` (7), `notFor`, `form`, `thanks`, `footer`,
  `currency`.
  - Fixed strings:
    - `cta.primary` in English: "[ GET STARTED ] Tell me about your goals";
    - `cta.secondary` in English: "Already know what you need? Book a session";
    - `form.success` in English: "Thanks, {name}. I'll reach out to understand where you are
      today and recommend the right next step.";
    - `currency`: `{ EGP: "EGP" }` in English and `{ EGP: "جنيه" }` in Arabic.
  - All other copy is drafted from PRD §8 without claims the PRD bans.
  - Set `_meta.reviewStatus: "DRAFT_PENDING_CLIENT"` in both files. Arabic copy is a
    placeholder for the human copywriter (no machine translation), and a production build
    fails until it is approved.

### Rendering foundation (research R1, R8; [contracts/routes-and-components.md](./contracts/routes-and-components.md))

- [ ] T031 Create `src/sections/registry.ts` and `src/sections/registry.json` with the 12
  entries from data-model §8. Each entry is
  `{ index, id, ground, photo?: { key, order: 'text-first' | 'photo-first' }, component }`.
  Also create `src/sections/SectionShell.tsx`: a
  `<section id aria-labelledby className="ground-{ground}">` with `SectionLabel` and an
  `<h2>` from `copy.sections[id].heading`. Every registry entry initially uses
  `SectionShell`, and each story's task swaps in the real component.
- [X] T032 [P] Create `src/components/SectionLabel.tsx` (contract §SectionLabel).
  - It renders `<p className="text-label-md label-caps">` with the text
    `String(index).padStart(2,'0') + ' — ' + label` in Western digits.
  - Colour is `accent` on dark grounds and `accent-dark` on Paper, through `--accent-text`.
  - It is not a heading.
- [X] T033 Create `src/App.tsx`. It takes `{ lang, route: 'home' | 'thanks' }` and renders
  `LocaleProvider`, then `SkipLink`, then `SiteHeader` (T048; use a minimal `<header>`
  placeholder until then), then `<main id="main">` mapping the registry (or `ThanksPage` when
  `route === 'thanks'`), then the footer registry entry.
- [X] T034 Create `src/entry-server.tsx`. It exports `render(lang, route)`, which returns
  `{ html, head }`. `html` comes from `renderToString(<App/>)`. `head` contains:
  - `<title>` and `<meta name="description">` from `copy.meta`;
  - `<link rel="canonical" href="{siteUrl}/{lang}/">`;
  - `<link rel="alternate" hreflang="en" href=…/en/>`, the same for `ar`, and `x-default`
    pointing to `/en/`;
  - `og:title`, `og:description`, `og:locale` (`en_US` / `ar_EG`) and `og:image`;
  - `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the critical font of
    the language;
  - `<link rel="preload" as="image" imagesrcset fetchpriority="high">` for the hero's mobile
    AVIF;
  - `<meta name="robots" content="noindex">` for `thanks`.

  `assertSiteConfig()` is called once.
- [X] T035 [P] Create `src/head-script.ts`. It exports the **minified inline string** (under
  1 KB) that sets `document.documentElement.classList.add('js')`. When
  `location.pathname === '/'`, it reads `localStorage['tff-lang']` inside try/catch and calls
  `location.replace('/' + (v === 'ar' ? 'ar' : 'en') + '/' + location.hash)`. It never
  checks `navigator.language`.
- [X] T036 Create `scripts/prerender.mjs`.
  - It imports `dist-ssr/entry-server.js` and reads `dist/index.html` as the template.
  - For `(en, home)`, `(ar, home)`, `(en, thanks)` and `(ar, thanks)` it:
    - replaces `<html>` with `<html lang dir>`;
    - replaces `<!--head-script-->` with `<script>{headScript}</script>`,
      `<!--app-head-->` with `head`, and `<!--app-html-->` with `html`;
    - writes `dist/{lang}/index.html` and `dist/{lang}/thanks/index.html`.
  - It then overwrites `dist/index.html` with the root redirect page: the head script,
    `<meta http-equiv="refresh" content="0;url=/en/">`, `<meta name="robots" content="noindex">`,
    and a body with plain links "English" (`/en/`) and "العربية" (`/ar/`). It includes no app
    bundle.
  - It writes `dist/sitemap.xml` (both languages with `xhtml:link` alternates) and
    `dist/robots.txt`.
  - It deletes `dist-ssr/`.
- [X] T037 [P] Create `src/entry-client.tsx`. It calls
  `hydrateRoot(document.getElementById('root')!, <App lang={document.documentElement.lang} route={document.body.dataset.route} />)`.
  `prerender.mjs` sets `data-route` on `<body>`.
- [X] T038 [P] Create `scripts/check-budgets.mjs`.
  - It sums the brotli-compressed sizes of `public/fonts/ibm-plex-sans-arabic-*.woff2`
    (≤ 80 KB) and `public/fonts/manrope-*.woff2` (≤ 50 KB), and fails if either is over.
  - It measures the inline head script (≤ 1 KB, and fails if over).
  - It reports the total brotli size of the initial JS chunks referenced by
    `dist/en/index.html` and fails above the approved 75 KB limit (T107).

### Shared components (used by several stories)

- [X] T039 [P] Create `src/hooks/useReducedMotion.ts`, which returns `matchMedia('(prefers-reduced-motion: reduce)').matches` and subscribes to changes. It is SSR-safe and defaults to `false`.
- [X] T040 [P] Create `src/components/ResponsiveImage.tsx`.
  - Props: `{ assetKey, alt, sizes, priority?: boolean, variant?: 'mobile' | 'desktop' }`.
  - It reads `src/generated/image-manifest.json` and renders `<picture>` with `<source type="image/avif">` and `<source type="image/webp">` srcsets, plus a JPEG `<img>` with explicit `width` and `height`, `loading={priority ? 'eager' : 'lazy'}`, `fetchPriority={priority ? 'high' : 'auto'}`, `decoding="async"`. `alt=""` (decorative) is allowed.
- [X] T041 [P] Create `src/components/Logo.tsx`.
  - It renders `<picture>` using the manifest key `logo` (the **grayscale** `logo-gray-{96,192}` files from T023) at 40×40 CSS px, with `alt` from `copy.nav.logoAlt`.
  - It never references `/logo.png` directly.
- [X] T042 [P] Create `src/components/SkipLink.tsx`. It renders `<a href="#main">` with `copy.nav.skipLink`. It is visually hidden until focused, and it is the first focusable element.
- [X] T043 Create `src/components/PrimaryCTA.tsx`, `src/components/SecondaryCTA.tsx` and `src/components/DualCTA.tsx`, following [contracts/routes-and-components.md](./contracts/routes-and-components.md).
  - PrimaryCTA:
    - It is `<a href="#lead-form" data-source={source}>` with the label `copy.cta.primary`.
    - It is filled: Ink with Paper text on paper grounds, and Accent with Ink text on dark grounds.
    - It has `min-h-target`.
  - SecondaryCTA:
    - It is `<a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">`.
    - The `subordinate` variant is outlined with a 1px border (Ink on paper, Paper on dark).
    - The `prominent` variant uses the filled primary style.
    - It includes the visually hidden "(opens in a new tab)" / "(يفتح في نافذة جديدة)" from copy.
  - DualCTA:
    - It renders Primary then Secondary in DOM order.
    - The two stack on mobile and sit inline from `md`, using `gap-md`.
    - It uses logical alignment only.

**Checkpoint**: `npm run build && npm run preview` serves `/en/` and `/ar/` with 12 shell
sections in the right order, grounds, `lang` and `dir`. `npm run lint`, `npm run typecheck`,
`npm test` and `npm run check:props` all pass.

---

## Phase 3: User Story 1: Understand the Offer in My Language (Priority: P1) 🎯 MVP

**Goal**: The whole 12-section story renders correctly in English and in Arabic, with
mobile-first layout, alternating grounds, the photography rule and the header.

**Independent test**: open `/en/` and `/ar/` at 390, 768 and 1440 px. All 12 sections appear
in order, with the correct language, direction, fonts and grounds. The photo sections are
full-bleed with the fade on mobile, and two columns in alternating order on desktop. There is
no horizontal scroll, and no placeholder or wrong-language text (quickstart V1, V2, V14, V15).

### Tests for User Story 1 (write first; they must fail)

- [X] T044 [P] [US1] Write `tests/e2e/sections.spec.ts`. For `/en/` and `/ar/` it asserts:
  - `html[lang][dir]` is `en`/`ltr` and `ar`/`rtl`;
  - the section ids appear in the exact order `hero, problem, story, approach, process, achieve, results, offer, not-for, faq, final-cta, footer`;
  - there is exactly one `h1`, and it is inside `#hero`;
  - there is no horizontal scroll (`scrollWidth <= clientWidth`) at 320, 390, 768, 1200 and 1440 px wide;
  - the computed `font-family` starts with Manrope on the English page and IBM Plex Sans Arabic on the Arabic page;
  - no text node on `/ar/` matches `[\u0660-\u0669]`.
- [ ] T045 [P] [US1] Write `tests/e2e/layout.spec.ts`.
  - It asserts each section's computed `background-color` matches the registry ground, and that neighbouring grounds differ.
  - At 390 px, the `#hero`, `#story` and `#process` images span the full viewport width and have a `bg-photo-fade` overlay.
  - At 1440 px, for `#hero` and `#process` the photo's bounding box is to the right of the text on `/en/` and to the left on `/ar/`; `#story` is the reverse.
  - The text column precedes the photo in DOM order in all three sections.
- [X] T046 [P] [US1] Write `tests/e2e/header.spec.ts` at 390 px.
  - The header is visible at `scrollY=0`.
  - After scrolling down 400 px it is translated out of view.
  - After scrolling up 10 px it is visible.
  - Tabbing to a header link makes it visible.
  - Its height is ≤ 64px.
  - After clicking the `#faq` anchor, the `#faq h2` top is ≥ 64px from the viewport top.
  - With reduced motion emulated, the transition duration is 0.
  - With `javaScriptEnabled: false`, the header is `position: static`.
  - At 1440 px, the header scrolls with the page.
- [X] T047 [P] [US1] Write `tests/a11y/axe.spec.ts`. For `/en/` and `/ar/` across the 3 Playwright projects, it runs `new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa'])` and expects zero `critical` and zero `serious` violations. It also asserts the skip link is the first tabbable element.

### Implementation for User Story 1

- [X] T048 [US1] Create `src/hooks/useHideOnScroll.ts` (research R9).
  - Below 1200 px (`matchMedia('(min-width:1200px)')` false) it uses a passive `scroll` listener with `requestAnimationFrame`.
  - It returns `hidden=true` after more than 8 px of cumulative downward scrolling when `scrollY > 64`, and `false` on any upward scroll, on `focusin` inside the header, or at `scrollY ≤ 64`.
  - It always returns `false` at 1200 px and wider.
- [X] T049 [US1] Create `src/components/SiteHeader.tsx`.
  - It renders `<header>` with `Logo`, then a `<nav aria-label>` of anchor links built from `copy.nav` (Approach→`#approach`, How it works→`#process`, Results→`#results`, Offer→`#offer`, FAQ→`#faq`), then an empty slot for `LanguageSwitcher` (filled in T085), then `PrimaryCTA source="header"`.
  - Classes:
    - it is `h-header` (64px) with a charcoal ground;
    - under `.js` below `lg` it is `position: sticky; top: 0` with `translateY(-100%)` when hidden, `transition-transform duration-micro`, and no transition when reduced motion is preferred;
    - from `lg` it is static.
  - On mobile, the anchor nav collapses behind a `<button aria-expanded aria-controls>` menu. The PrimaryCTA stays visible.
  - Replace the placeholder header in `src/App.tsx`.
- [X] T050 [US1] Create `src/components/PhotoSection.tsx` (contract §PhotoSection).
  - Below `lg`: `<figure className="full-bleed relative">` with a `ResponsiveImage variant="mobile"` and an absolutely positioned `bg-photo-fade` overlay over the bottom 50%, marked `aria-hidden`. The text block follows inside `.container-canvas`.
  - At `lg` and wider: a `.grid-site` with text in `lg:col-span-6` and the photo in `lg:col-span-6`. `order: 'photo-first'` places the photo with `lg:col-start-1 lg:row-start-1` and the text with `lg:col-start-7`, using logical placement so RTL mirrors automatically.
  - The text always comes first in DOM order.
  - `priority` is true only for `hero`.
- [ ] T051 [P] [US1] Create `src/sections/Hero.tsx`. It renders `PhotoSection` (id `hero`, ground `ink`, photo `hero`, `text-first`) containing `SectionLabel` (01), then `<h1 className="text-display-hero-mobile lg:text-display-hero">` from `copy.sections.hero.heading`, then the value proposition (`body-lg`), then `DualCTA source="hero"`. Register it in `src/sections/registry.ts`.
- [ ] T052 [P] [US1] Create `src/sections/Problem.tsx` (paper ground). It renders `SectionLabel` (02), `<h2>`, the list of recognisable situations from `copy.sections.problem.items`, and the reframe paragraph. It uses no fear or shaming language. Register it.
- [ ] T053 [P] [US1] Create `src/sections/Story.tsx`. It renders `PhotoSection` (id `story`, ground `charcoal`, photo `story`, `photo-first`) with `SectionLabel` (03), `<h2>` and the story paragraphs from `copy.sections.story`. Credentials render only if `copy.sections.story.credentials` is non-empty. Register it.
- [ ] T054 [P] [US1] Create `src/sections/Approach.tsx` (paper ground). It renders `SectionLabel` (04), `<h2>`, and an `<ol>` of the 4 steps from `copy.approach.steps` (Assess, Design, Execute, Optimize), each numbered with a `label-md` index, a `headline-md` title and a `body-md` explanation, separated by 1px `line` hairlines. It is not a card grid. Register it.
- [ ] T055 [P] [US1] Create `src/components/JourneySteps.tsx`.
  - It renders `src/data/journey.json` `steps` sorted by `order` as an `<ol>`. Each item shows `stepNumber` ("01"…"04"), `title[lang]` and `description[lang]`.
  - Step connectors are hairlines that mirror in RTL. Any directional icon uses `rtl:-scale-x-100`.
- [ ] T056 [US1] Create `src/sections/Process.tsx`. It renders `PhotoSection` (id `process`, ground `ink`, photo `process`, `text-first`) with `SectionLabel` (05), `<h2>`, `JourneySteps`, then `DualCTA source="process"` **immediately after** the steps. It must not describe services the offer does not include (PRD DR-10). Register it.
- [ ] T057 [P] [US1] Create `src/sections/Achieve.tsx` (paper ground). It renders `SectionLabel` (06), `<h2>`, the 7 outcomes from `copy.achieve.items` (each worded as "coaching supports…", with no guarantees and no medical or numeric claims), and the key message line. Register it.
- [ ] T058 [US1] Create `src/sections/FinalCta.tsx` (charcoal ground). It renders `SectionLabel` (11), `<h2>`, the reassurance line, `DualCTA source="final-cta"`, and a `<div id="lead-form">` container. LeadForm is mounted there in T067; until then the container holds `copy.form.fallbackText` with the booking link. Register it.
- [ ] T059 [US1] Create `src/sections/SiteFooter.tsx`. It renders `<footer id="footer">` on the ink ground with a `border-t border-line-dark` hairline, containing:
  - `Logo`;
  - the WhatsApp link `https://wa.me/{digits of site.whatsappNumber}`;
  - social links from `src/config/social.json`;
  - the booking link (`SecondaryCTA variant="subordinate" source="footer"`);
  - Privacy Policy, Terms & Conditions and health-disclaimer links from `copy.footer.legal` (with `href` values from copy);
  - an empty slot for `LanguageSwitcher` (filled in T086);
  - the copyright line with the current year in Western digits.

  Register it.
- [ ] T060 [US1] Fill in the English and Arabic draft copy used by sections 01–06, 11 and 12 in `src/data/copy/en.json` and `src/data/copy/ar.json`, plus the `alt` text for the photos. Keep `_meta.reviewStatus: "DRAFT_PENDING_CLIENT"`. Then run `npm run validate:content`.
- [ ] T061 [US1] Write `tests/visual/sections.spec.ts`. For each registry section, `en` and `ar`, and the 3 projects, it calls `expect(page.locator('#<id>')).toHaveScreenshot('<id>-<lang>.png')` with animations disabled. Generate the baselines with `npx playwright test tests/visual --update-snapshots` and commit them.

**Checkpoint**: T044–T047 pass. US1 is demonstrable as the MVP, with the lead-form container
showing the booking fallback.

---

## Phase 4: User Story 2: Tell the Coach About My Goals (Primary CTA) (Priority: P1)

**Goal**: Every primary CTA leads to one LeadForm per page. The form validates inline, posts
to Web3Forms with and without scripts, and shows the exact personalised confirmation.

**Independent test**: from Hero, Process, Offer and Final CTA in both languages, activate the
primary CTA. The first field gets focus. Invalid submits send nothing. A valid submit shows
"Thanks, {name}. I'll reach out…". Failure keeps the input. The no-script post lands on
`/{lang}/thanks/`. One real submission per language arrives by email (quickstart V4, V5, V6,
V17).

### Tests for User Story 2 (write first; they must fail)

- [X] T062 [P] [US2] Write `tests/unit/whatsapp.test.ts`:
  - `normalizeWhatsapp('01012345678') === '+201012345678'`
  - `'1012345678'` → `'+201012345678'`
  - `'+20 101 234 5678'` → `'+201012345678'`
  - `'+44 7700 900123'` → `'+447700900123'`
  - `'123'` is rejected
  - `'+1234567'` is rejected (fewer than 8 digits)
  - a 16-digit number is rejected

  Rule from data-model §7: "Egyptian `01[0125]\d{8}` → `+201…`; otherwise `+` followed by 8 to 15 digits".
- [X] T063 [P] [US2] Write `tests/unit/LeadForm.test.tsx` with Testing Library and `fetch` mocked.
  - Submitting with all fields empty shows 5 errors, each linked with `aria-describedby`, and focuses `#lead-name`.
  - Name longer than 80 characters and goal/struggle longer than 500 characters are rejected.
  - `contact_time` must be one of `morning|afternoon|evening|anytime`.
  - A valid submit sends exactly the keys `access_key, subject, from_name, botcheck, name, whatsapp, goal, struggle, contact_time, lang, source`, and **no** `redirect`.
  - The success state replaces the form with the text "Thanks, Ahmed. I'll reach out to understand where you are today and recommend the right next step.", focused, with `role="status"`.
  - The name `<b>x</b>` renders as literal text.
  - `{success:false}` shows the error and keeps the values.
  - A rejected fetch or a 10 s timeout shows the offline message.
  - A second click while submitting sends no second request.
- [ ] T064 [P] [US2] Write `tests/e2e/lead-form.spec.ts`.
  - Route: `page.route('https://api.web3forms.com/submit', …)`.
  - For each of `#hero`, `#process`, `#offer` and `#final-cta`, clicking the primary CTA puts focus on `#lead-name`, and the hidden `source` field equals that section id. (`#offer` is covered once US4 lands; until then mark it `test.fixme`.)
  - It covers success, failure, offline and double-submit in both languages, and checks the localised validation messages on `/ar/`.
- [X] T065 [P] [US2] Write `tests/e2e/no-js.spec.ts` with `javaScriptEnabled: false`.
  - On `/en/`, the form has `action="https://api.web3forms.com/submit"` and `method="post"`, and hidden `redirect` equals `{VITE_SITE_URL}/en/thanks/`.
  - Submitting with the route fulfilled as `302 Location: /en/thanks/` renders the English thanks copy.
  - The same holds for `/ar/`.
  - All CTAs are `<a>` elements with a real `href`.

### Implementation for User Story 2

- [X] T066 [P] [US2] Create `src/lib/whatsapp.ts`. It exports `normalizeWhatsapp(raw): string | null`: strip spaces and dashes; `^0?1[0125]\d{8}$` → `+20` plus the 10 digits without the leading 0; `^\+?[1-9]\d{7,14}$` → `+` plus the digits; anything else → `null`. It also exports `WHATSAPP_HTML_PATTERN = '^\\+?[0-9 \\-]{8,20}$'`.
- [X] T067 [US2] Create `src/lib/leadSubmit.ts`. It exports `submitLead(fields): Promise<'success' | 'error' | 'offline'>`, which `fetch`es `https://api.web3forms.com/submit` with `POST`, a JSON body and the headers `Content-Type: application/json` and `Accept: application/json`, using an `AbortController` with a 10 000 ms timeout. It maps `{success:true}` → `'success'`, any other JSON → `'error'` (with `console.warn` of the provider message), and a network error or abort → `'offline'`.
- [X] T068 [US2] Create `src/components/LeadForm.tsx` (contracts/lead-form-submission.md; data-model §7).
  - Markup:
    - `<form id="lead-form-el" action="https://api.web3forms.com/submit" method="post" noValidate={hydrated}>`;
    - hidden inputs `access_key`, `subject` ("New lead ({lang}) — The Fitness Formula"), `from_name`, `redirect` (`{siteUrl}/{lang}/thanks/`, removed from the payload in Mode B), `lang` and `source` (default `direct`, updated by PrimaryCTA);
    - a honeypot `botcheck` checkbox in a visually hidden wrapper with `aria-hidden="true"` and `tabIndex={-1}`.
  - The 5 labelled fields:
    - `lead-name` (`maxLength 80`, required);
    - `lead-whatsapp` (`type="tel"`, `inputMode="tel"`, `autoComplete="tel"`, `pattern={WHATSAPP_HTML_PATTERN}`, required, `dir="ltr"`);
    - `lead-goal` (textarea, `maxLength 500`, required);
    - `lead-struggle` (textarea, `maxLength 500`, required);
    - `lead-contact-time` (a select of the 4 options from `copy.form.contactTimes`, required).
  - The privacy note links next to the submit button.
  - States `idle → editing → invalid → submitting → success | error`:
    - validate on submit, and on blur after a field is touched;
    - errors come from `copy.form.errors.*`;
    - `aria-invalid` is set and focus moves to the first invalid field;
    - in `submitting`, the button has `aria-disabled` and shows `copy.form.sending`;
    - `success` replaces the form with `<p role="status" tabIndex={-1}>` showing `copy.form.success` with `{name}` substituted as text, and focuses it;
    - `error` and `offline` show the message plus the booking and `wa.me` links, keeping the values.
  - Fields use a White background, a 1px Ink border (functional contrast) and 0 radius.
- [X] T069 [US2] Update `src/components/PrimaryCTA.tsx` so that, after hydration, `onClick` sets the LeadForm `source` (a small module-level store in `src/lib/leadSource.ts`), scrolls `#lead-form` into view (`behavior: reducedMotion ? 'auto' : 'smooth'`), and focuses `#lead-name` with `preventScroll`. Without scripts it stays a plain `#lead-form` anchor.
- [X] T070 [US2] Mount `<LeadForm />` inside `#lead-form` in `src/sections/FinalCta.tsx`, replacing the T058 fallback text.
- [X] T071 [P] [US2] Create `src/pages/ThanksPage.tsx`. It renders `copy.thanks.heading` and `copy.thanks.body`, and appends `?name=` as plain text through `textContent` if present, with links back to `/{lang}/` and to the booking URL. Wire `route === 'thanks'` in `src/App.tsx`.
- [X] T072 [US2] Add the English and Arabic `form.*` and `thanks.*` copy to `src/data/copy/{en,ar}.json`:
  - labels and hints;
  - `contactTimes`: Morning (9–12), Afternoon (12–5), Evening (5–9), Anytime, all in Cairo time;
  - `errors.required`, `errors.nameTooLong`, `errors.whatsappInvalid`, `errors.tooLong`;
  - `sending`, `errorGeneric`, `errorOffline`, `privacyNote`, and the exact `success` string.

  Run `npm run validate:content`.
- [ ] T073 [US2] Manual check (quickstart V6). With the real `VITE_WEB3FORMS_KEY` in `.env.local`, submit once on `/en/` and once on `/ar/`, and once on `/en/` with scripts disabled. Confirm 3 emails arrive within 2 minutes with the 5 fields plus `lang` and `source`, and that the no-script redirect works on the free plan. Record the result in `specs/002-phase1-landing-page/checklists/validation-log.md`.

**Checkpoint**: T062–T065 pass. The lead path works end to end in both languages, with and
without scripts.

---

## Phase 5: User Story 3: Book a Session Directly (Secondary CTA) (Priority: P1)

**Goal**: Every secondary CTA and "BOOK A SESSION" opens the configured booking URL in a new
tab, and each is clearly less prominent than, and placed after, the primary CTA.

**Independent test**: every secondary CTA in both languages has the correct `href`,
`target="_blank"`, a safe `rel`, an accessible "opens in a new tab" hint, and comes after its
primary in DOM order (quickstart V7).

### Tests for User Story 3 (write first; they must fail)

- [ ] T074 [P] [US3] Write `tests/e2e/booking-cta.spec.ts`. On `/en/` and `/ar/`, every `a[href="{VITE_BOOKING_URL}"]` has `target="_blank"` and a `rel` containing `noopener`, and its accessible name contains the localised new-tab hint. In each of `#hero`, `#process` and `#final-cta` (plus `#offer` once US4 lands, `test.fixme` until then), the primary CTA precedes the secondary one in DOM order and in visual order (by bounding box: inline-start or above). The secondary's computed background is transparent while the primary's is not. Clicking a secondary opens a popup whose URL equals the booking URL, and the original page's `scrollY` is unchanged.

### Implementation for User Story 3

- [ ] T075 [US3] Harden `src/components/SecondaryCTA.tsx`. Resolve `href` only from `site.bookingUrl`, never from props. Add `data-source` for later analytics. Verify the `subordinate` styles on all three grounds meet the contrast pairings (a 1px Ink border on paper, a 1px Paper border on ink or charcoal; text colour per ground). Add the hover state as a hard fill swap (transparent → Ink on paper, → Paper on dark).
- [X] T076 [US3] Add the `cta.newTab` copy to `src/data/copy/{en,ar}.json` ("(opens in a new tab)" / "(يفتح في نافذة جديدة)") and render it as `sr-only` in `SecondaryCTA`.

**Checkpoint**: T074 passes. The direct-booking path works everywhere it appears.

---

## Phase 6: User Story 4: See the Price and Terms Clearly (Priority: P1)

**Goal**: 08 Coaching Offer shows both options, the terms, the guarantee, the prominent
"BOOK A SESSION" button and the dual CTAs, all from `pricing.json`, with Western digits on
both pages.

**Independent test**: on `/en/` and `/ar/`, `#offer` shows "1-to-1 Fitness Consultation",
45 minutes, 700 EGP per session; then "4 Sessions", 4 × 45 minutes, 2,000 EGP, "Save 800 EGP";
then the terms, then the guarantee, then BOOK A SESSION, in that order. There are no Eastern
digits (quickstart V8, V11).

### Implementation and tests for User Story 4

- [X] T077 [US4] **[Build-stage task: Eastern to Western digits]** In `src/data/pricing.json`, replace exactly these Arabic strings:
  - `"٤٥ دقيقة"` → `"45 دقيقة"` (`tiers[0].duration.label.ar`)
  - `"٤ جلسات"` → `"4 جلسات"` (`tiers[1].name.ar`)
  - `"٤ × ٤٥ دقيقة"` → `"4 × 45 دقيقة"` (`tiers[1].duration.label.ar`)
  - `"وفّر ٨٠٠ جنيه"` → `"وفّر 800 جنيه"` (`tiers[1].note.ar`)
  - `"ضمان استرداد الأموال ١٠٠٪"` → `"ضمان استرداد الأموال 100%"` (`guarantee.title.ar`)

  Also change `cta.destination` from `"calendly"` to `"booking"`, and set `$schema` to `./schemas/pricing.schema.json`. Then run `npm run validate:content`: it MUST pass, and rule (a) MUST now report zero Eastern digits anywhere in `src/data/`. Leave `_meta.arabicReviewStatus` as is.
- [ ] T078 [P] [US4] Write `tests/e2e/offer.spec.ts`. For both languages, `#offer` contains, in DOM order: two options; the terms text (EN "No subscription. No long-term commitment."); the guarantee title (EN "100% Money-Back Guarantee") and description; the `BOOK A SESSION` link (prominent SecondaryCTA, booking href); then DualCTA. Prices render as "700" and "2,000". No text in `#offer` on `/ar/` matches `[\u0660-\u0669]`. The highlighted option (the bundle) has a visible distinction that is not colour alone (a text badge from `note`).
- [ ] T079 [P] [US4] Create `src/components/PricingOption.tsx`. Its props are one `tiers[]` item. It renders `name[lang]` (`headline-md`); `duration.label[lang]`; the price through `formatPrice(price, currency, lang)` (`metric-display`) plus `priceLabel[lang]`; and `note[lang]` as a text badge when present. `highlighted` gets an Accent fill behind Ink text on paper, never accent text on paper. It sits on a White card with a 1px `line` hairline and 0 radius.
- [ ] T080 [US4] Create `src/sections/Offer.tsx` (paper ground). It renders, in order:
  1. `SectionLabel` (08) and `<h2>`;
  2. the "what the session is / what you leave with" copy from `copy.sections.offer`;
  3. `PricingOption` × 2, sorted by `order`, in a `.grid-site` (stacked on mobile, 6+6 columns at `lg`);
  4. `terms[lang]`;
  5. `guarantee.title` and `guarantee.description`;
  6. `<SecondaryCTA variant="prominent" label={pricing.cta.label[lang]} source="offer" />`;
  7. `DualCTA source="offer"`.

  Accent-coloured text on this paper ground uses `accent-dark`. Register it, and remove the `test.fixme` markers for `#offer` in T064 and T074.
- [ ] T081 [US4] Add the `sections.offer` copy (heading, session description, leave-with items) to `src/data/copy/{en,ar}.json`. It must match PRD §8.8 and imply no services beyond the 45-minute session.

**Checkpoint**: T078 passes, and the `#offer` cases in T064 and T074 pass. **All P1 stories
are complete.**

---

## Phase 7: User Story 5: Switch Language Without Losing My Place (Priority: P2)

**Goal**: The header and footer language switchers open the other language at the current
section and remember the choice. `/` defaults to English (or the saved choice) and never
uses the browser's language.

**Independent test**: scroll to `#faq` on `/en/` and activate the switcher. It lands on
`/ar/#faq`. Opening `/` then goes to `/ar/`. A fresh profile with an Arabic browser locale
goes to `/en/` (quickstart V13, V14).

### Tests for User Story 5 (write first; they must fail)

- [ ] T082 [P] [US5] Write `tests/e2e/language.spec.ts`.
  - (1) On `/en/`, scroll `#faq` into view, click the header switcher, and expect the URL `/ar/#faq` with `#faq` in the viewport.
  - (2) Then `page.goto('/')` → `/ar/`.
  - (3) In a new context with `locale: 'ar-EG'` and empty storage, `goto('/')` → `/en/`.
  - (4) With keyboard only: Tab to the switcher, press Enter, and the navigation happens.
  - (5) The switcher's accessible name is "العربية" on `/en/` and "English" on `/ar/`, with `lang` set on the element.
  - (6) With `javaScriptEnabled: false`, the switcher `href` is `/ar/` and `/` redirects to `/en/` through the meta refresh.
  - (7) The footer switcher behaves the same.

### Implementation for User Story 5

- [X] T083 [P] [US5] Create `src/hooks/useActiveSection.ts`. It uses an `IntersectionObserver` on all `main section[id]` and `#footer`, with `rootMargin: '-64px 0px -50% 0px'`, and returns the id of the top-most intersecting section (default `hero`). It is SSR-safe.
- [X] T084 [US5] Create `src/components/LanguageSwitcher.tsx` (contract §LanguageSwitcher).
  - It renders `<a href={hydrated ? `/${other}/#${activeId}` : `/${other}/`} hreflang={other} lang={other}>{copy[other].nav.languageName}</a>` with `min-h-target`.
  - `onClick` sets `localStorage.setItem('tff-lang', other)` inside try/catch.
  - It works identically from the keyboard.
- [X] T085 [US5] Mount `<LanguageSwitcher placement="header" />` in the `src/components/SiteHeader.tsx` slot (T049). It stays visible on mobile outside the collapsed menu.
- [X] T086 [US5] Mount `<LanguageSwitcher placement="footer" />` in the footer slot (`src/App.tsx`).
- [X] T087 [US5] Add `nav.languageName` to `src/data/copy/en.json` ("English") and `src/data/copy/ar.json` ("العربية"). The switcher reads the **other** language's value.

**Checkpoint**: T082 passes.

---

## Phase 8: User Story 6: Get Answers and Check Fit (Priority: P2)

**Goal**: 09 Who This Is NOT For and 10 FAQ render from data. The FAQ is an accessible
accordion that works with the keyboard, respects reduced motion, and shows all answers
without scripts.

**Independent test**: toggle every FAQ item with the keyboard and the mouse in both
languages, with reduced motion on and off, and with scripts off (quickstart V16).

### Tests for User Story 6 (write first; they must fail)

- [ ] T088 [P] [US6] Write `tests/e2e/faq.spec.ts`. On both languages:
  - only `published: true` items render, in `order`;
  - each question is a `<button aria-expanded aria-controls>` inside a heading (`h3`);
  - Enter and Space toggle it, and focus stays on the button;
  - the panel has `role="region"` and `aria-labelledby`;
  - with reduced motion emulated, the panel opens with a transition of 150 ms or less (opacity only);
  - with `javaScriptEnabled: false`, every answer is visible;
  - on first paint with scripts on, no answer is visible and there is no layout shift (`CLS` from the `PerformanceObserver` is 0 within `#faq`);
  - `#not-for` renders the list plus the closing line.

### Implementation for User Story 6

- [X] T089 [P] [US6] Create `src/data/faqs.json` with 7 items, `$schema: "./schemas/faqs.schema.json"`, and `_meta.reviewStatus: "DRAFT_PENDING_CLIENT"`.
  - The topics are PRD §8.10 items 1–7: Do I need a gym? Is it suitable for beginners? Is the coaching online? Will I get a diet plan? How often do I need a session? How do we track progress? If my circumstances or goals change, how is the plan adjusted?
  - Each item has `id`, `question` {en, ar} (≤ 140 characters, ending in "?" or "؟"), `answer` {en, ar} (≤ 900 characters, no unconfirmed service claims), `order` 1–7 and `published: true`.
  - Set `needsConfirmation` as follows: `"DR-09"` on "Is the coaching online?", `"DR-16"` on "Will I get a diet plan?", and `"DR-10"` on "How do we track progress?".
- [X] T090 [US6] Create `src/components/FaqAccordion.tsx`.
  - It renders `<div data-faq-item data-open={open || undefined}>` containing `<h3><button id="faq-q-{id}" aria-expanded={open} aria-controls="faq-a-{id}">`, followed by `<div id="faq-a-{id}" role="region" aria-labelledby="faq-q-{id}" data-faq-panel>` with the answer paragraphs split on `\n\n`.
  - On the server, all items render with `data-open` absent. The `.js` CSS rule (T017) hides the panels before paint, and without scripts they show.
  - The client state starts all-closed.
  - The toggle uses an opacity transition (`duration-micro`; instant when reduced motion is preferred).
  - The chevron uses `rtl:-scale-x-100` where it is directional.
- [X] T091 [US6] Create `src/sections/Faq.tsx` (paper ground). It renders `SectionLabel` (10), `<h2>` and `FaqAccordion` for the published items sorted by `order`. Register it.
- [X] T092 [P] [US6] Create `src/sections/NotFor.tsx` (ink ground). It renders `SectionLabel` (09), `<h2>`, a `<ul>` of `copy.notFor.items` (unwilling to commit or change; looking for a quick fix; results without effort; only a harsh diet or rapid transformation), then `copy.notFor.closing` (who it suits). The tone is direct and respectful. Register it and add the English and Arabic copy to `src/data/copy/{en,ar}.json`.

**Checkpoint**: T088 passes.

---

## Phase 9: User Story 7: Trust Real Proof (Priority: P3)

**Goal**: 07 Results & Testimonials shows the 8 real Arabic WhatsApp screenshots, unaltered
apart from the compliance crop on #5. The Arabic page shows them with a revealable
transcription; the English page shows the same images with a human English translation
beneath each one.

**Independent test**: 8 items on `/ar/` and 8 on `/en/` (once the translations exist). Image 5
contains no painkiller sentences. The build fails if consent, a source file or (in
production) a translation is missing (quickstart V9, V12).

### Tests for User Story 7 (write first; they must fail)

- [ ] T093 [P] [US7] Write `tests/e2e/testimonials.spec.ts`.
  - On `/ar/`, `#results` has 8 `[data-testimonial]` items in `order`. Each has an `<img>` with non-empty Arabic `alt` and a "إظهار النص" toggle that reveals the transcription, and each transcription is in the accessibility tree.
  - On `/en/`, each item that has `translation.en` shows the same image `src` basename as `/ar/`, with the English translation text visible directly after the image in DOM order and `alt` stating it is an Arabic message.
  - Items without `translation.en` are absent on `/en/`.
  - `#results` renders the heading plus DualCTA when zero items are eligible (use a fixture build).
- [ ] T094 [P] [US7] Extend `tests/unit/validate-content.test.ts` with fixtures showing that a testimonial with `consent.granted: false` fails the schema, a missing `images[].source` file fails rule (h), and a missing `translation.en` warns in development and fails with `SITE_ENV=production`.

### Implementation for User Story 7

- [X] T095 [US7] **[Build-stage task: crop screenshot 5]**
  - Open `design/stitch/testimonials/5.jpg` (1199 × 965) and record the exact pixel rows of the band that contains the painkiller sentences: from the top of the line "أقل حاجة كنت باخد ٦ أقراص مسكن في" to the bottom of the line "اتمرنت", keeping the bubble's `12:42 pm` timestamp row. The expected band is roughly `y ≈ 180–600`. Confirm it by viewing the image.
  - Put it in `assets.config.json` as `testimonials[testimonial-5].removeRows: [{ "from": <y1>, "to": <y2> }]`.
  - In `scripts/build-images.mjs`, implement `removeRows`. Take `extract({ top: 0, height: y1 })` and `extract({ top: y2, height: H − y2 })`, `composite` them vertically onto a canvas of height `H − (y2 − y1)`, then run the normal resize and format pipeline to `public/img/testimonial-5-{480,960}.{avif,webp,jpeg}`.
  - The source `design/stitch/testimonials/5.jpg` MUST stay byte-identical.
  - View `public/img/testimonial-5-960.webp` and confirm: the first two lines ("المهم إن أنا حاسة بتحسن أكتر من تاريخي كله / في الجيم") remain; no text from "أقل حاجة" through "اتمرنت" is visible; there is no visible seam; the timestamp and the second bubble are intact.
  - Record the verification in `specs/002-phase1-landing-page/checklists/validation-log.md`.
- [X] T096 [P] [US7] Confirm that the `testimonial-1`…`testimonial-8` jobs in `assets.config.json` (T021) produce `public/img/testimonial-{n}-{480,960}.{avif,webp,jpeg}` with manifest entries, and that `placeholder` is `false` for these real assets.
- [ ] T097 [US7] Create `src/data/testimonials.json` with `$schema: "./schemas/testimonials.schema.json"` and `_meta.translationsApproved: false`, with 8 items `t-01`…`t-08`. Each item has:
  - `type: "screenshot"`, `displayName: null`;
  - `consent: { granted: true, scope: "public website, both languages, image and text", recordedOn: "2026-09-28" }`;
  - `sourceLanguage: "ar"`, `languages: ["ar","en"]`, `featured: false`, `order` 1–8;
  - `images: [{ source: "design/stitch/testimonials/{n}.jpg", assetKey: "testimonial-{n}", alt: { ar, en }, transcription, translation: { en: "" } }]`.

  `alt.ar` is, for example, "رسالة واتساب من عميل عن تقدّمه". `alt.en` is, for example, "WhatsApp message from a client, in Arabic — English translation below". `transcription` is the exact Arabic text read from the image, keeping its original digits. For `t-05` the transcription MUST exclude the removed sentences, and the item carries `complianceEdits: ["removed-medical-claim"]`. `translation.en` stays empty until the client supplies human translations. Rule (g) then hides those items on `/en/` in development, and rule (j) fails production.
- [ ] T098 [US7] Create `src/components/TestimonialCard.tsx`.
  - It renders `<figure data-testimonial>` with `ResponsiveImage` (`sizes="(min-width:1200px) 33vw, (min-width:768px) 50vw, 100vw"`, `alt=alt[lang]`).
  - When `lang === sourceLanguage`, it adds a `<details>` with `<summary>` from `copy.sections.results.showText` ("إظهار النص" / "Show text") containing the transcription in `lang="ar" dir="rtl"`.
  - When `lang !== sourceLanguage`, it adds `<figcaption lang={lang}>{translation[lang]}</figcaption>` directly after the image, plus a `<details>` with the original transcription marked `lang="ar" dir="rtl"`.
  - It renders the optional `resultSummary[lang]`.
  - The card has a White background, a 1px `line` hairline and 0 radius.
- [ ] T099 [US7] Create `src/sections/Results.tsx` (charcoal ground). It renders `SectionLabel` (07) and `<h2>`, then filters `testimonials.items` to `consent.granted && languages.includes(lang) && (lang === sourceLanguage || translation[lang])`, sorts by `order`, and renders `TestimonialCard` in a `.grid-site` (1 column on mobile, 2 at `md`, 3 at `lg`). If nothing is eligible (the safety net), it renders only the heading plus `DualCTA source="results"` and logs a build warning in `entry-server`. Register it and add the `sections.results` copy (`heading`, `showText`) to `src/data/copy/{en,ar}.json`.

**Checkpoint**: T093 and T094 pass. All 7 stories are complete.

---

## Phase 10: Polish and Cross-Cutting Concerns

**Purpose**: performance, hardening, documentation, the full validation sweep, and the
owner's JS-budget decision.

- [X] T100 [P] Create `public/_headers`:
  - `/img/*`, `/fonts/*` and `/assets/*`: `Cache-Control: public, max-age=31536000, immutable`;
  - `/*.html` and `/`: `Cache-Control: public, max-age=0, must-revalidate`;
  - on all paths: `Strict-Transport-Security: max-age=31536000; includeSubDomains`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`;
  - `Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self' 'sha256-<head-script hash>'; connect-src https://api.web3forms.com; form-action https://api.web3forms.com; frame-ancestors 'none'`. `prerender.mjs` computes the hash and writes it into `dist/_headers`.
- [ ] T101 [P] Write `tests/e2e/reduced-motion.spec.ts`. With `reducedMotion: 'reduce'`, no element under `main` has a computed `transform` transition or animation longer than 150 ms, scroll behaviour is `auto`, and the header hides and shows without a transition.
- [X] T102 [P] Write `docs/content-editing.md` (SC-007). It gives step-by-step instructions to add an FAQ, add a testimonial (image into `design/stitch/testimonials/`, an `assets.config.json` job, a `testimonials.json` entry with consent, alt, transcription and translation), change a price, and reorder sections. It tells the reader to run `npm run build` and explains the validator's error messages.
- [X] T103 [P] Write `docs/release-checklist.md` (constitution Development Workflow). It covers:
  - the manual keyboard and screen-reader audit (NVDA and VoiceOver) of nav, FAQ, switcher, form and CTAs in both languages;
  - a cross-browser spot check (Chrome, Safari, Firefox, Edge, iOS Safari, Android Chrome);
  - `SITE_ENV=production npm run build` passing (no placeholders, all copy approved, translations present);
  - removing the constitution's Sync Impact Report comment before merge.
- [ ] T104 Replace the placeholder photo sources in `assets.config.json` (`placeholder: true`) with the client's real coach photography once it is supplied: portrait crops for mobile and wide crops for desktop, for `hero`, `story` and `process`. Set `placeholder: false`. This is blocked on the client.
- [ ] T105 Run the full visual baseline refresh (`npx playwright test tests/visual --update-snapshots`) after all sections land. Review every `en` and `ar` screenshot pair at 390, 768 and 1440 for parity and commit the baselines.
- [X] T106 Run `npm run build && npm run lhci` and fix any regressions against LCP ≤ 2500 ms, TBT ≤ 200 ms and CLS ≤ 0.1 on `/en/` and `/ar/`. Check that the hero image preload matches the image actually rendered at 390 px.
- [X] T107 **Owner decision (plan Complexity Tracking)**: the user explicitly retained React and approved a 75 KB brotli initial JavaScript ceiling. `scripts/check-budgets.mjs` enforces the ceiling; the measured 68.2 KB is within budget. The decision is recorded in `specs/002-phase1-landing-page/plan.md` Complexity Tracking.
- [ ] T108 Run every quickstart scenario V1–V21 from [quickstart.md](./quickstart.md) and record pass or fail per scenario in `specs/002-phase1-landing-page/checklists/validation-log.md`.

---

## Dependencies and Execution Order

### Phase dependencies

- **Setup (T001–T013)**: no dependencies. T001 comes first; T002–T013 are [P] after it.
- **Foundational (T014–T043)**: depends on Setup. It blocks every story.
  - Tokens: T014 → T015 → T017, then T018 and T019 [P].
  - T020 fonts [P].
  - Images: T021 → T022 → T023.
  - Content: T024 → T025 → T026.
  - T027–T030.
  - Rendering: T031 → T033 → T034 → T036, with T035 and T037 [P].
  - T038 [P].
  - Shared components: T039–T042 [P], and T043 after T027.
- **US1 (T044–T061)**: after Foundational. This is the MVP.
- **US2 (T062–T073)**: after Foundational. It mounts into `FinalCta` from US1 (T058). If US1
  is not done, mount the form in the `final-cta` SectionShell instead; it is still
  independently testable.
- **US3 (T074–T076)**: after Foundational (it uses the shared SecondaryCTA from T043).
- **US4 (T077–T081)**: after Foundational. T077 (digit migration) MUST come
  before T078 and T080.
- **US5 (T082–T087)**: after Foundational. T085 and T086 need the header and
  footer slots from US1 (T049, T059).
- **US6 (T088–T092)**: after Foundational.
- **US7 (T093–T099)**: after Foundational. T095 (crop) and T096 come before T097
  and T098.
- **Polish (T100–T108)**: after the stories you intend to ship. T104 is blocked on the
  client's photography.

### Story completion order

`US1 (MVP)` → `US2` → `US3` → `US4` complete all the P1 stories. Then `US5` and `US6` (P2) can
run in parallel, then `US7` (P3), then Polish.

### Within each story

Write the tests first (they must fail), then data and copy, then components, then the section
and registry wiring, then the checkpoint.

---

## Parallel Examples

**Setup**: after T001, run T002–T013 together.

**Foundational**: T016, T018, T019, T020, T024, T027, T028, T029, T032, T035, T037, T038 and
T039–T042 touch different files and can run together once their prerequisites are met.

**US1**:

```text
Tests: T044, T045, T046, T047 together.
Sections: T051 Hero, T052 Problem, T053 Story, T054 Approach, T055 JourneySteps, T057 Achieve
together (after T050 PhotoSection for the photo sections).
```

**US2**: T062, T063, T064 and T065 (tests) together, then T066 and T071 together.

**US5 and US6 in parallel**: US5 (T082–T087) alongside US6 (T088–T092).

**US7**: T093, T094 and T096 together. Run T095 (crop) first, because T097 depends on its
result.

---

## Implementation Strategy

### MVP first (User Story 1)

1. Setup, then Foundational: tokens, fonts, the grayscale logo, content validation and
   prerender.
2. US1 renders all 12 sections (07–10 as shells) in both languages with the correct layout.
   Validate with T044–T047 and quickstart V1, V2, V14 and V15.
3. Stop and demo. The page is readable, bilingual and responsive.

### Incremental delivery

1. Add US2: lead capture. The site is now a working lead generator.
2. Add US3 and US4: direct booking and pricing. All P1 stories are live.
3. Add US5 and US6: the language switch and FAQ.
4. Add US7: testimonials, with the English translations arriving from the client.
5. Polish: headers, performance, docs, the owner's JS-budget decision, and the full V1–V21
   sweep.

### Production-release gate

`SITE_ENV=production npm run build` must pass. That requires:

- real photography (T104);
- client-approved English and Arabic copy (`reviewStatus: "APPROVED"`);
- FAQ items confirmed against DR-09, DR-10 and DR-16;
- all 8 English testimonial translations, approved;
- real values for `VITE_BOOKING_URL`, `VITE_WEB3FORMS_KEY` and `VITE_WHATSAPP_E164`.

---

## Notes

- [P] means a different file with no incomplete dependency. [USn] traces the task to its spec
  user story.
- Task IDs are sequential in execution order within each phase. Where a story has an internal
  ordering constraint (T077 before T078/T080; T095 before T097/T098), the Dependencies section
  states it.
- Commit after each task or logical group. Pre-commit hooks run Prettier and ESLint.
- Never hard-code user-facing text, colours or pixel values in components. The validators
  (T019, T025) enforce this.
