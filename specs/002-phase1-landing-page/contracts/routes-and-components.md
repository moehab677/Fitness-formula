# Contract: Public Routes and Reusable Components

## 1. Routes (static output in `dist/`)

| URL | File | `<html>` | Purpose |
|---|---|---|---|
| `/` | `dist/index.html` | `lang="en"` | Redirects (see below). `noindex`. |
| `/en/` | `dist/en/index.html` | `lang="en" dir="ltr"` | English landing page |
| `/ar/` | `dist/ar/index.html` | `lang="ar" dir="rtl"` | Arabic landing page |
| `/en/thanks/` | `dist/en/thanks/index.html` | `lang="en" dir="ltr"` | No-script form confirmation. `noindex` |
| `/ar/thanks/` | `dist/ar/thanks/index.html` | `lang="ar" dir="rtl"` | No-script form confirmation. `noindex` |
| `/sitemap.xml`, `/robots.txt` | static | — | Lists `/en/` and `/ar/` with `xhtml:link` alternates |

**How `/` redirects**:

1. The head script reads `localStorage['tff-lang']`. If the value is `en` or `ar`, it calls
   `location.replace('/{lang}/' + location.hash)`.
2. Otherwise it calls `location.replace('/en/' + location.hash)`.
3. Without scripts, `<meta http-equiv="refresh" content="0;url=/en/">` does the redirect, and
   the body shows two plain links.

The browser's language is **never** used.

**The `<head>` of each landing page**:

- `<title>` and `<meta name="description">` from `copy.meta`;
- `<link rel="canonical" href="{siteUrl}/{lang}/">`;
- `<link rel="alternate" hreflang="en|ar|x-default">`, where x-default points to `/en/`;
- Open Graph and Twitter meta tags, localised;
- a preload for the critical font and the hero image (`fetchpriority="high"`);
- the head script from research R8.

**Section anchors**: `#hero`, `#problem`, `#story`, `#approach`, `#process`, `#achieve`,
`#results`, `#offer`, `#not-for`, `#faq`, `#final-cta`, `#footer`, and `#lead-form` (the form
inside `#final-cta`). These are identical in both languages, so `/{other}/#{id}` always
resolves.

## 2. Component contracts

All text arrives through props or `useCopy()`. None is hard-coded. Every interactive
component implements these states identically in both languages: default, hover,
focus-visible, active, disabled, loading, error and success.

### PrimaryCTA

```ts
type PrimaryCTAProps = { source: SectionId; className?: string }
```

- Renders `<a href="#lead-form" data-source={source}>` with the label `copy.cta.primary`.
- The style is filled Ink on light grounds and filled Accent with Ink text on dark grounds.
  The target is at least 44 px tall.
- With scripts: on click, it saves `source` for LeadForm's hidden field, scrolls (smoothly,
  or instantly if reduced motion is preferred), and focuses `#lead-name`.
- Without scripts: it behaves as a plain anchor jump.

### SecondaryCTA

```ts
type SecondaryCTAProps = { variant?: 'subordinate' | 'prominent'; label?: string; source: SectionId }
```

- Renders `<a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">`.
- The label defaults to `copy.cta.secondary`, and the pricing section passes
  `pricing.cta.label`.
- `subordinate` has an outline or text style, and must appear after PrimaryCTA in DOM order.
- `prominent` is filled, like the primary style (used for "BOOK A SESSION").
- The accessible name includes "(opens in a new tab)" or "(يفتح في نافذة جديدة)" as visually
  hidden text.

### DualCTA (composition)

```ts
type DualCTAProps = { source: SectionId }
```

Renders `PrimaryCTA` and then `SecondaryCTA variant="subordinate"`. On mobile they stack; from
`md` they sit inline, aligned to the start edge. It is used in `hero`, `process`, `offer` and
`final-cta`.

### LeadForm

```ts
type LeadFormProps = { id: 'lead-form' }
```

- The fields, states and transport are defined in
  [lead-form-submission.md](./lead-form-submission.md).
- Field ids are `lead-name`, `lead-whatsapp`, `lead-goal`, `lead-struggle` and
  `lead-contact-time`, each with a visible `<label for>`.
- There is exactly one instance on each page, inside `#final-cta`.

### SectionLabel

```ts
type SectionLabelProps = { index: number; label: string }  // renders "01 — Hero"
```

- Rendered as a `<p>`, not a heading, placed before the section's `<h2>`, or before the
  `<h1>` in `hero`.
- The number is zero-padded with Western digits. The separator is "—" in both languages.
- It uses the `label-md` role, with the accent colour on dark grounds and accent-dark on
  light ones.
- It is not used in `footer`.

### LanguageSwitcher

```ts
type LanguageSwitcherProps = { placement: 'header' | 'footer' }
```

- Renders `<a href="/{other}/#{activeSectionId}" hreflang={other} lang={other}>`. The text is
  `copy.nav.languageName` in the target language: "العربية" or "English".
- On click it writes `localStorage['tff-lang'] = other`, inside a try/catch.
- Without scripts, the `href` is `/{other}/`.
- It is keyboard-operable and has a 44 px target.

### PhotoSection (layout primitive)

```ts
type PhotoSectionProps = { id: SectionId; ground: 'ink' | 'charcoal'; photo: AssetKey; order: 'text-first' | 'photo-first'; children: ReactNode }
```

- **Below `lg`**: the photo is full-bleed at the top of the section (it escapes the container
  margins). The `bg-photo-fade` overlay covers its bottom half and fades into `--ground`.
  Text follows below.
- **At `lg` and wider**: a 12-column grid with text in columns 1–6 and the photo in 7–12
  (`text-first`), or the reverse (`photo-first`). This uses logical grid placement, so it
  mirrors automatically in RTL. The text always comes first in the DOM.
- It uses `ResponsiveImage` with `<picture>` (AVIF, WebP, JPEG), separate mobile and desktop
  crops through `media`, explicit `width` and `height`, and `fetchpriority="high"` for `hero`
  (lazy loading otherwise).
