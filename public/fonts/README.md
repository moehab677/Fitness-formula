# /fonts — Self-Hosted Subset Font Files

Run `npm run fonts` to download the OFL source files and create the WOFF2 subsets.
The Arabic subsets include Western digits (`U+0030-0039`) as well as Arabic text.

## Required files

| File                       | Font    | Weight  | Budget             |
| -------------------------- | ------- | ------- | ------------------ |
| `manrope-latin-var.woff2`  | Manrope | 400–700 | ≤ 50 KB compressed |
| `cairo-arabic-900.woff2`   | Cairo   | 900     | Arabic headings    |
| `tajawal-arabic-400.woff2` | Tajawal | 400     | Arabic body        |
| `tajawal-arabic-700.woff2` | Tajawal | 700     | Arabic emphasis    |

**Total budgets** (Constitution §IV):

- Arabic: ≤ 80 KB compressed (all three font files combined)
- Latin: ≤ 50 KB compressed (both weights combined)

## Subsetting

`scripts/subset-fonts.mjs` downloads the licensed sources from Google Fonts,
creates the Cairo 900 instance, and subsets the Arabic glyph ranges used by the
site. It also copies the Cairo and Tajawal OFL license notices. Run it with
`npm run fonts` after changing a source font or its range.
