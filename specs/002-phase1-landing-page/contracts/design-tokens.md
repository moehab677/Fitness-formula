# Contract: Design Tokens → `tokens.css` and `tailwind.config.js`

**Source of truth**: constitution v2.3.0, section "Design System Tokens". Any value that
differs from the constitution is a defect. Tokens are declared once, as CSS custom
properties in `src/styles/tokens.css`. `tailwind.config.js` only references those custom
properties. Components use Tailwind classes and never raw values.

## 1. Colours (`tokens.css`, RGB channels)

| CSS variable          | Hex       | Tailwind key  | Allowed use                                                               |
| --------------------- | --------- | ------------- | ------------------------------------------------------------------------- |
| `--color-ink`         | `#11110F` | `ink`         | Dark ground; text on Paper, White or Accent                               |
| `--color-charcoal`    | `#1A1A17` | `charcoal`    | Dark ground                                                               |
| `--color-paper`       | `#F5F3EE` | `paper`       | Light ground; text on Ink or Charcoal                                     |
| `--color-white`       | `#FFFFFF` | `white`       | Raised cards and form fields                                              |
| `--color-muted`       | `#77756F` | `muted`       | On White at any size. On Paper only at ≥ 24 px regular or ≥ 18.66 px bold |
| `--color-line`        | `#D9D6CE` | `line`        | Decorative hairlines on light grounds only                                |
| `--color-line-dark`   | `#2A2A26` | `line-dark`   | Hairlines on dark grounds                                                 |
| `--color-accent`      | `#B7C96B` | `accent`      | Highlights on dark grounds; a fill behind Ink text                        |
| `--color-accent-dark` | `#5C6B17` | `accent-dark` | Accent-coloured text or indicators on Paper or White                      |

Tailwind's default palette is **replaced** (`theme.colors`, not `extend`), so no other colour
can be used. `transparent` and `current` are kept.

**Contrast-verified text pairings**: these are the only ones allowed, and an automated test
checks them.

| Text on ground                   | Ratio |
| -------------------------------- | ----- |
| ink on paper                     | 17.05 |
| ink on white                     | 18.9  |
| paper on charcoal                | 15.73 |
| paper on ink                     | ~17   |
| accent on ink                    | 10.42 |
| accent on charcoal               | 9.62  |
| ink on accent                    | 10.42 |
| accent-dark on paper             | 5.3   |
| accent-dark on white             | 5.88  |
| muted on white                   | 4.61  |
| muted on paper (large text only) | 4.15  |

## 2. Section grounds (utility classes in `globals.css`)

| Class              | Background | Text  | Accent text | Hairline                             |
| ------------------ | ---------- | ----- | ----------- | ------------------------------------ |
| `.ground-ink`      | ink        | paper | accent      | line-dark                            |
| `.ground-charcoal` | charcoal   | paper | accent      | line-dark                            |
| `.ground-paper`    | paper      | ink   | accent-dark | line (decorative) / ink (functional) |

Each ground also sets `--ground` (its own colour), which the mobile photo fade uses.

## 3. Breakpoints (`theme.screens`, replaced)

| Key    | min-width | Grid                                             |
| ------ | --------- | ------------------------------------------------ |
| (base) | 0         | 4 columns, 20 px margin, 16 px gutter            |
| `md`   | 768px     | 8 columns, 32 px margin, 24 px gutter            |
| `lg`   | 1200px    | 12 columns, 56 px margin, 32 px gutter           |
| `2xl`  | 1440px    | 12 columns; canvas capped at 1440 px and centred |

Grid helpers: `.container-canvas` sets `max-width: 1440px`, centres the content, and sets the
inline padding to the current margin. `.grid-site` applies the current number of columns and
gutter. Reference viewports for design parity: **390** and **1440**. Tablet checks use
**768**.

## 4. Spacing (`theme.spacing`, replaced)

| Key                                  | Value                                  |
| ------------------------------------ | -------------------------------------- |
| `0`                                  | 0                                      |
| `px`                                 | 1px (hairlines only)                   |
| `xs`                                 | 4px                                    |
| `sm`                                 | 8px                                    |
| `md`                                 | 16px                                   |
| `lg`                                 | 24px                                   |
| `xl`                                 | 40px                                   |
| `2xl`                                | 80px (section rhythm, 2 × xl)          |
| `3xl`                                | 120px (section rhythm, 3 × xl)         |
| `gutter-sm` / `gutter` / `gutter-lg` | 16 / 24 / 32px                         |
| `margin-sm` / `margin` / `margin-lg` | 20 / 32 / 56px                         |
| `header`                             | 64px (header height and scroll offset) |
| `target`                             | 44px (minimum touch target)            |

## 5. Typography

**Families**: in `theme.fontFamily`, `sans` resolves to `var(--font-body)`.

- `:root[lang="en"]` sets `--font-body` to Manrope with system fallbacks.
- `:root[lang="ar"]` sets Arabic body and label text to Tajawal 400/700, and Arabic
  headings to Cairo Black 900. English font families remain unchanged.
- Arabic font faces are only selected on Arabic pages (`lang="ar"` / `dir="rtl"`).

**Roles**: `theme.fontSize`. Each entry sets font-size, line-height from a variable, weight
and letter-spacing.

| Role             | Size / Latin line-height (px) | Arabic line-height     | Weight           | Tracking (Latin only)                         |
| ---------------- | ----------------------------- | ---------------------- | ---------------- | --------------------------------------------- |
| `display-hero`   | 80/80 (mobile 48/52)          | ×1.15 → 92 (mobile 60) | 700 → Arabic 900 | -0.02em                                       |
| `headline-xl`    | 56/60 (mobile 36/40)          | ×1.15 → 69 (46)        | 600 → Arabic 900 | -0.01em                                       |
| `headline-lg`    | 32/36                         | 42                     | 600 → Arabic 900 | 0                                             |
| `headline-md`    | 24/28                         | 32                     | 600 → Arabic 900 | 0.01em                                        |
| `headline-sm`    | 20/24                         | 28                     | 600 → Arabic 900 | 0.02em                                        |
| `metric-display` | 64/64                         | 74                     | 700 → Arabic 900 | -0.02em                                       |
| `body-lg`        | 18/28                         | ×1.25 → 35             | 400              | 0                                             |
| `body-md`        | 16/24                         | 30                     | 400              | 0                                             |
| `body-sm`        | 14/20                         | 25                     | 400              | 0                                             |
| `label-lg`       | 14/18                         | 23                     | 600 → Arabic 700 | 0.06em, uppercase in EN                       |
| `label-md`       | 12/16                         | 20                     | 500 → Arabic 400 | 0.08em, uppercase in EN                       |
| `label-sm`       | 10/14                         | —                      | —                | Decorative indices only; never essential text |

- Line-heights and weights are variables (`--lh-*`, `--fw-*`) that are redefined under
  `:root[lang="ar"]`. Letter-spacing and uppercase are applied only under `:root[lang="en"]`,
  or `[lang="en"]` inline.
- Arabic headings use Cairo 900; Tajawal body and labels use 400/700. Tajawal's
  available bold weight is used for 500/600 label roles.
- Minimum rendered text size is 12 px.

## 6. Shape, elevation, motion and focus

| Token                             | Value                                                                                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `borderRadius`                    | Replaced with `{ none: '0' }` only                                                                                                                                                   |
| `boxShadow`                       | Replaced with `{ none: 'none' }` only                                                                                                                                                |
| `backgroundImage`                 | Replaced with `{ 'photo-fade': 'linear-gradient(to bottom, rgb(var(--ground) / 0) 50%, rgb(var(--ground) / 1) 100%)' }`. This is the single permitted gradient, used only below `lg` |
| `transitionTimingFunction.reveal` | `cubic-bezier(0.16, 1, 0.3, 1)`                                                                                                                                                      |
| `transitionDuration`              | `micro: 100ms`, `reveal: 600ms`                                                                                                                                                      |
| Reveal offset                     | `translateY(16px)` → 0                                                                                                                                                               |
| Focus ring                        | `outline: 2px solid` ink on paper or white grounds and accent on dark grounds, with `outline-offset: 2px`, via `:focus-visible`                                                      |
| Reduced motion                    | Reveals become an opacity fade of ≤ 150 ms; the header change is instant; `scroll-behavior: auto`                                                                                    |

## 7. Enforcement

- `tests/unit/tokens.test.ts` parses `tokens.css` and checks it against the tables above. It
  also recomputes the contrast ratio of every allowed pairing.
- `scripts/check-logical-props.mjs` fails on physical-direction utilities, raw hex values, and
  arbitrary `[..px]` values in `src/**/*.tsx`.
