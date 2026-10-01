# Data Model: Phase 1 Landing Page

**Feature**: `002-phase1-landing-page` | **Date**: 2026-09-28

All content lives in version-controlled files under `src/data/`. There is no database.
`scripts/validate-content.mjs` checks every file against its JSON Schema in
`src/data/schemas/`, then applies the cross-cutting rules below. Any failure stops the build
and names the file and entry id (spec FR-019).

## Shared types

| Type | Shape | Rule |
|---|---|---|
| `Lang` | `"en" \| "ar"` | — |
| `Localized` | `{ en: string, ar: string }` | Both keys required and non-empty after trimming |
| `LocalizedPartial` | `{ en?: string, ar?: string }` | Keys must match the item's `languages` |
| `Id` | `string` | `^[a-z0-9]+(-[a-z0-9]+)*$`, unique within its file |

**Cross-cutting rules**, applied to every string in every content file:

1. It must contain no Eastern Arabic digits U+0660–0669 and no Persian digits U+06F0–06F9
   (spec clarification: Western digits everywhere).
2. It must contain no HTML markup. Text is rendered as text only.
3. Every `order` value must be a positive integer, unique within its collection.

---

## 1. Journey Step: `src/data/journey.json`

`{ "$schema", "_meta", "steps": JourneyStep[] }`, with **exactly 4** steps.

| Field | Type | Rules |
|---|---|---|
| `id` | Id | One of `free-assessment`, `choose-next-step`, `build-plan`, `come-back-when-needed` |
| `stepNumber` | string | `^0[1-4]$`, and matches `order` |
| `title` | Localized | EN values fixed by the constitution: "Free assessment", "Choose next step", "Build plan", "Come back when needed" |
| `description` | Localized | ≤ 240 characters per language |
| `order` | int | 1 to 4 |

Rendered in 05 How Coaching Works, sorted by `order`. The dual CTAs follow directly after.

**The existing file already matches this model. No change is needed.**

---

## 2. Pricing Offer: `src/data/pricing.json`

`{ "$schema", "_meta", "tiers": PricingOption[], "terms", "guarantee", "cta" }`

**PricingOption** (**exactly 2**):

| Field | Type | Rules |
|---|---|---|
| `id` | Id | `single-session`, `four-session-bundle` |
| `name` | Localized | EN: "1-to-1 Fitness Consultation", "4 Sessions" |
| `duration.minutes` | int | 45 |
| `duration.count` | int? | 4 for the bundle, absent for the single session |
| `duration.label` | Localized | Western digits only |
| `price` | int | 700 and 2000 |
| `currency` | `"EGP"` | — |
| `priceLabel` | Localized \| null | Price suffix, e.g. "/ session" |
| `note` | Localized \| null | Bundle: "Save 800 EGP". Validator check: `note` digits = single price × count − bundle price (700 × 4 − 2000 = 800) |
| `highlighted` | boolean | At most one `true` |
| `order` | int | 1 to 2 |

**Offer-level fields**:

| Field | Type | Rules |
|---|---|---|
| `terms` | Localized | EN exactly "No subscription. No long-term commitment." |
| `guarantee.title` | Localized | EN exactly "100% Money-Back Guarantee" |
| `guarantee.description` | Localized | EN exactly "If you don't feel the session was valuable, you get your money back. No questions asked." |
| `cta.label` | Localized | EN exactly "BOOK A SESSION" |
| `cta.destination` | `"booking"` | Resolved to the site-wide booking URL. It is never a literal URL in this file. |
| `cta.style` | `"primary"` | Uses the prominent SecondaryCTA variant |

The price shown is `Intl.NumberFormat` applied to `price`. For example, 2000 renders as
"2,000" in English and "2,000" with Arabic grouping on the Arabic page, followed by the
currency word from copy.

**Required data migration** (task): the existing file uses Eastern digits in five Arabic
strings. Convert them as listed in [research.md](./research.md) R7. Also change
`cta.destination` from `"calendly"` to `"booking"`.

---

## 3. FAQ Item: `src/data/faqs.json` (new)

`{ "$schema", "_meta", "items": FaqItem[] }`, with 5 to 7 published items at launch.

| Field | Type | Rules |
|---|---|---|
| `id` | Id | — |
| `question` | Localized | ≤ 140 characters, ends with "?" or "؟" |
| `answer` | Localized | ≤ 900 characters; paragraphs separated by `\n\n` |
| `order` | int | — |
| `published` | boolean | Only `true` items render |
| `needsConfirmation` | string? | A PRD decision id such as `"DR-09"`. A production build fails if a published item still carries it. |

The starter topics are PRD §8.10 items 1 to 7. Answers that depend on DR-09 (delivery
platform), DR-10 (support between sessions) or DR-16 (diet plan) carry `needsConfirmation`
until the client confirms them.

---

## 4. Testimonial: `src/data/testimonials.json` (new)

`{ "$schema", "_meta", "items": Testimonial[] }`

| Field | Type | Rules |
|---|---|---|
| `id` | Id | — |
| `type` | `"testimonial" \| "progress-story" \| "result" \| "screenshot"` | — |
| `displayName` | LocalizedPartial \| null | Null means anonymous (screenshots show no names) |
| `consent.granted` | `true` | Must be `true`, or the item never renders |
| `consent.scope` | string | e.g. `"public website, both languages, image and text"` |
| `consent.recordedOn` | ISO date | — |
| `sourceLanguage` | Lang | The language of the original words (`ar` for all 8 launch items) |
| `languages` | Lang[] | The page languages it appears on. An item can appear on a language only if it has a transcription (same language) or a translation (other language) for it. |
| `quote` | LocalizedPartial? | Required when there are no `images` |
| `images` | TestimonialImage[]? | Required when `type = "screenshot"` |
| `resultSummary` | LocalizedPartial? | Factual only; no medical claims |
| `date` | ISO date? | — |
| `featured` | boolean | — |
| `order` | int | — |

**TestimonialImage**:

| Field | Type | Rules |
|---|---|---|
| `source` | string | Path under `design/stitch/testimonials/`; the file must exist |
| `assetKey` | string | Key in `image-manifest.json`, e.g. `testimonial-5` |
| `alt` | LocalizedPartial | One per `languages` entry. A short description, such as "WhatsApp message from a client about their progress" |
| `transcription` | string | Exact text of the (cropped) image, in `sourceLanguage` |
| `translation` | LocalizedPartial | Required for each entry in `languages` that differs from `sourceLanguage`. Written by a person, and marked approved via `_meta.translationsApproved` |
| `complianceEdits` | string[]? | e.g. `["removed-medical-claim"]` for item 5 |

**Rendering by page**:

- On the **Arabic** page (`sourceLanguage = ar`): the image is shown. The `transcription` is
  available to screen readers and can be revealed with an "إظهار النص" toggle.
- On the **English** page: the same unaltered image is shown, with `translation.en` visible
  directly beneath it. The image's `alt.en` says the message is in Arabic, and the
  translation follows it.

**Launch data**: items `t-01` to `t-08` map to `1.jpg` to `8.jpg`, all
`type: "screenshot"`, `sourceLanguage: "ar"`, `languages: ["ar","en"]`. Item `t-05` has
`complianceEdits: ["removed-medical-claim"]`. A production build fails if any `translation.en`
is missing or not approved.

---

## 5. Copy (per language): `src/data/copy/en.json` and `src/data/copy/ar.json` (new)

Both files must have **identical key sets**; the validator compares them. The top-level
groups are:

| Group | Contents |
|---|---|
| `meta` | `title`, `description`, `ogImageAlt` |
| `nav` | Anchor labels (Approach, How it works, Results, Offer, FAQ), `skipLink`, `languageName` (the target language written in that language) |
| `cta` | `primary` ("[ GET STARTED ] Tell me about your goals"), `secondary` ("Already know what you need? Book a session") |
| `sections.{hero,problem,story,approach,process,achieve,results,offer,notFor,faq,finalCta,footer}` | `label`, `heading`, body fields particular to each section, and photo `alt` text where the section has a photo |
| `approach.steps` | Assess, Design, Execute, Optimize: `{ title, body }` × 4 |
| `achieve.items` | 7 outcomes |
| `notFor.items`, `notFor.closing` | — |
| `form` | Field labels, hints, `contactTimes` (4 options), validation messages, `submit`, `sending`, `errorGeneric`, `errorOffline`, `success` (contains the `{name}` placeholder), `privacyNote` |
| `thanks` | Heading and body for the no-script confirmation page |
| `footer` | `copyright`, legal link labels, `whatsappLabel`, `socialLabels` |
| `currency` | `{ EGP: "EGP" }` in English, `{ EGP: "جنيه" }` in Arabic |

`form.success.en` MUST equal: "Thanks, {name}. I'll reach out to understand where you are
today and recommend the right next step."

---

## 6. Site configuration: `src/config/site.ts`

Values come from build-time environment variables (`VITE_*`). They are validated during the
prerender step.

| Key | Source | Rule |
|---|---|---|
| `siteUrl` | `VITE_SITE_URL` | Absolute https URL. Used for canonical, hreflang and the form `redirect` |
| `bookingUrl` | `VITE_BOOKING_URL` | Absolute https URL (the Calendly event) |
| `web3formsKey` | `VITE_WEB3FORMS_KEY` | UUID. It is public by design |
| `whatsappNumber` | `VITE_WHATSAPP_E164` | E.164, e.g. `+2010…` |
| `socialLinks` | `src/config/social.json` | `{ platform, url }[]` |
| `defaultLang` | constant `"en"` | Fixed by clarification |

---

## 7. Lead Submission (transient, never stored by the site)

The form state is held in the browser only. The submitted payload is defined in
[contracts/lead-form-submission.md](./contracts/lead-form-submission.md).

| Field | Rule |
|---|---|
| `name` | Trimmed; 1 to 80 characters |
| `whatsapp` | Normalised to E.164. Egyptian `01[0125]\d{8}` → `+201…`; otherwise `+` followed by 8 to 15 digits |
| `goal` | Trimmed; 1 to 500 characters |
| `struggle` | Trimmed; 1 to 500 characters |
| `contactTime` | One of `morning`, `afternoon`, `evening`, `anytime` |
| `lang` | Current page language |
| `source` | Section id of the CTA used, e.g. `hero`, `process`, `offer`, `final-cta`, or `direct` |

**Form state transitions**: `idle → editing → (invalid ↺ editing) → submitting → success | error → editing (input kept)`

- In `success`, the form is removed and the confirmation message takes focus. There is no
  way back on that page view.
- In `submitting`, the submit button has `aria-disabled` and a second submission is ignored.

---

## 8. Section registry: `src/sections/registry.ts`

This is an ordered, typed list, and the page renders from it (spec FR-038). Sections can be
reordered or new ones inserted through configuration alone (constitution Principle V).

| # | `id` (anchor, same in both languages) | Ground | Photo | CTAs |
|---|---|---|---|---|
| 01 | `hero` | ink | yes, text first | dual |
| 02 | `problem` | paper | — | — |
| 03 | `story` | charcoal | yes, photo first | — |
| 04 | `approach` | paper | — | — |
| 05 | `process` | ink | yes, text first | dual (after the steps) |
| 06 | `achieve` | paper | — | — |
| 07 | `results` | charcoal | — | — |
| 08 | `offer` | paper | — | BOOK A SESSION + dual |
| 09 | `not-for` | ink | — | — |
| 10 | `faq` | paper | — | — |
| 11 | `final-cta` | charcoal | — | dual + LeadForm (`#lead-form`) |
| 12 | `footer` | ink (with a `line-dark` hairline above) | — | booking link |

The validator checks that no two neighbouring sections share a ground. The only exception is
11 followed by 12, which the hairline separates. It also checks that every section with a
photo has a dark ground.
