# PRD v1.0 — The Fitness Formula — C/ Mostafa Kheder

| | |
|---|---|
| **Document** | Product Requirements Document |
| **Version** | 1.0 (draft for approval) |
| **Date** | 23 September 2026 |
| **Project type** | Premium personal-brand coaching website (marketing + conversion) |
| **Client** | C/ Mostafa Kheder |
| **Status** | Draft — awaiting client decisions marked below |
| **Next stage** | Spec Kit (Product/UX spec → Design System → Wireframes → Visual Design → Implementation → QA → Launch) |
| **Site language** | Bilingual: Egyptian Arabic + English (approved) |
| **PRD language** | English |

**Placeholder tags used in this document**

- `[DECISION REQUIRED]` — a business, legal, pricing, booking, payment, or brand decision that must come from the client.
- `[CONTENT REQUIRED]` — real content the client must supply (credentials, photos, story, etc.).
- `[TESTIMONIAL REQUIRED]` / `[RESULT CONTENT REQUIRED]` — structural placeholders for real client proof. No fabricated proof is ever used.
- `[TBD]` — a detail that is unknown and not yet decided.

**Source-of-truth order:** explicit client requirements → approved project decisions → this PRD once approved → Spec Kit specs → design decisions → developer assumptions.

---

## 1. Product Overview

### 1.1 What this is

The Fitness Formula is a premium personal coaching website built around one person: Mostafa Kheder, his story, his methodology, and the value of personalized coaching. It is a single-purpose marketing and conversion experience, not a gym site, a bodybuilding site, a generic personal-trainer template, or a fitness SaaS platform.

### 1.2 Why it exists

The site must:

1. Introduce Mostafa and his coaching philosophy.
2. Build trust and credibility with potential clients.
3. Explain clearly how the coaching works and what value the client receives.
4. Help visitors decide whether the coaching is right for them.
5. Convert qualified visitors into intro calls, enquiries, or first-session bookings.

### 1.3 Core positioning

**Personalized Fitness & Performance Coaching for Busy Professionals.**

Central insight (client's own framing):

> The problem is usually not that people don't try hard enough. It is that they have no clear fitness strategy that fits their actual life and that they can sustain.

The brand sells **sustainable systems and consistency**, not quick transformations.

### 1.4 Brand experience keywords

Professional · Premium · Personal · Approachable · Structured · Trustworthy · Modern · Human

Premium comes from typography, composition, photography, spacing and storytelling — not from visual effects.

---

## 2. Goals, Success Measures, Non-Goals

### 2.1 Business goals

| ID | Goal |
|---|---|
| G1 | Convert qualified visitors into booked intro calls and first coaching sessions. |
| G2 | Establish Mostafa as a credible, distinctive personal brand rather than a generic trainer. |
| G3 | Pre-qualify visitors (via clarity on offer, price, and "Who this is NOT for") so calls are with better-fit prospects. |
| G4 | Create a content architecture that lets the client add testimonials, results, and FAQ entries later without redesign. |

### 2.2 Success measures

Numeric conversion targets are **not invented** here.

| Measure | Definition | Target |
|---|---|---|
| Intro-call conversion rate | Visitors who complete an intro-call booking ÷ unique visitors | `[DECISION REQUIRED]` — set after baseline traffic is known |
| First-session conversion rate | Visitors who complete a first-session booking ÷ unique visitors | `[DECISION REQUIRED]` |
| CTA click-through | `cta_click` events ÷ sessions, split by placement | Baseline after launch |
| Language split | Share of sessions in Arabic vs English | Informational |
| Core Web Vitals (mobile, p75) | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 | Required (see §14) |
| Accessibility | WCAG 2.2 AA where practical | Required (see §13) |

### 2.3 Non-goals (v1)

- No user accounts, login, client portal, or dashboard.
- No custom backend, database, or admin panel unless a requirement in this PRD explicitly justifies it.
- No workout or nutrition app functionality, no content marketplace, no e-commerce catalog.
- No blog or content hub in v1; blog articles may be added after launch.
- No multi-coach or team pages.
- No long-term subscription checkout unless the client decides packages are in scope (see DR-07).

---

## 3. Audience

### 3.1 Primary audience

Busy professionals, roughly 28–45 years old, who want to improve fitness, physique, body composition, strength, energy, health, and lifestyle.

### 3.2 Their situation and pain points (from the client brief)

- Limited time.
- Difficulty staying consistent; they start and stop.
- Conflicting fitness and nutrition information.
- Difficulty organizing nutrition.
- Lack of accountability.
- Difficulty maintaining results long term.
- A cycle of repeated short-term diets and workout plans.

### 3.3 Audience hypotheses to validate (not facts)

These are working assumptions for design and copy. They must not be presented as data on the site.

- Visitors arrive from social media, referrals, or search, on mobile first.
- Visitors are skeptical of fitness marketing and respond to calm, specific, honest communication.
- Most visitors are expected to be from Egypt, with some visitors from other countries. English remains available for international visitors.

### 3.4 Not the audience

People seeking a quick fix, an extreme diet, a rapid transformation, or results without effort. The site says so honestly in the "Who This Is NOT For" section.

---

## 4. Coaching Philosophy (Content Framework)

The methodology is communicated as a four-step system:

| Step | Meaning |
|---|---|
| **Assess** | Understand current situation, goals, lifestyle, schedule, challenges, constraints. |
| **Design** | Build a personalized strategy around the individual. |
| **Execute** | Implement training, nutrition, habits, and behaviors. |
| **Optimize** | Track progress and adjust based on results, feedback, lifestyle changes, goals, and real-world constraints. |

**Tone rule:** the coaching must never read as "here is your workout, here is your diet, good luck." It reads as an evolving system built around the client.

---

## 5. The Offer

### 5.1 Primary offer

**Individual 45-Minute Coaching Session.**

The site must state clearly:

| Element | Status |
|---|---|
| What the session is | Content to be drafted with client input `[CONTENT REQUIRED]` |
| Who it is for | Busy professionals (see §3) |
| What happens during the session | `[CONTENT REQUIRED]` — agenda/structure of the 45 minutes |
| What is discussed | `[CONTENT REQUIRED]` |
| What the client leaves with (deliverables) | `[CONTENT REQUIRED]` |
| Value of the session | Derived from the above; no unsupported claims |
| Duration | 45 minutes (confirmed) |
| Delivery format (online / video platform) | `[DECISION REQUIRED]` DR-09 (brief FAQ implies online) |
| **Price** | `[DECISION REQUIRED]` DR-03 — must be visible once confirmed, no interaction gate |
| **Refund / money-back guarantee** | No refund or money-back guarantee will be offered. |

### 5.2 Entry offer

**Free 15-Minute Intro Call** — a low-commitment step to understand the coaching before buying.

### 5.3 Possible future offers (not in v1 scope unless approved)

The brief cites MAP Training's session-package model and Rob Goodwin's no-long-term-commitment consultations as reference for flexibility. Whether session packages are offered now or later is `[DECISION REQUIRED]` DR-07. The architecture must not block adding a packages block to the Offer section later.

---

## 6. Conversion Model

### 6.1 Primary and secondary CTAs (confirmed)

| Type | Label (EN) | Audience |
|---|---|---|
| **Primary** | Book a Free 15-Minute Intro Call | Visitors who want to understand before committing |
| **Secondary** | Book Your First Coaching Session | Visitors ready to start |

Arabic labels: `[CONTENT REQUIRED]` (must convey the same meaning and the same primary/secondary hierarchy; not literal word-for-word if unnatural).

### 6.2 Booking and payment flow — not yet decided

The brief lists two contact mechanisms: a booking link (e.g., Calendly) and a contact form. The customer journey and payment flow are **not finalized**. Options for the client to choose from:

| Option | Description | Pros | Cons |
|---|---|---|---|
| **A. Two booking paths** | Intro CTA → free 15-min event type. Session CTA → paid 45-min event type (payment at booking). | Lowest friction; fewest steps; clear analytics | Requires a payment-capable booking tool; payment provider availability depends on location/currency |
| **B. Book first, pay after** | Both CTAs book a slot; payment link is sent after intro call or before the session. | No payment tooling on-site | Extra manual step; risk of no-shows; weaker `booking_completed` meaning for paid sessions |
| **C. Enquiry-led** | Contact form (and/or messaging channel) as the main path; booking handled manually. | Simplest to build | Highest friction for ready-to-start visitors; slowest response |

**Recommendation (for discussion, not a decision):** Option A as the main path, plus a lightweight contact form or direct message channel as a fallback for undecided visitors. This follows the "reduce friction" principle and keeps the site static-first.

`[DECISION REQUIRED]` DR-05 (flow), DR-06 (payment provider and currency), DR-12 (contact channels).

### 6.3 Conversion principles

- Every visitor sees a CTA in the hero, at natural decision points, in the Offer section, and in the Final CTA.
- Header carries a persistent CTA (sticky on mobile is allowed only if it does not obscure content or reduce accessibility).
- No fake urgency, no countdowns, no scarcity claims, no manipulative patterns.
- Price and the no-refund policy are never hidden behind a click or form.

---

## 7. Visitor Journey and Information Architecture

### 7.1 Journey

**Recognition → Trust → Understanding → Value → Qualification → Action**

| Visitor question | Answered by |
|---|---|
| Is this for someone like me? | Hero, The Problem |
| Does this coach understand my problem? | The Problem |
| Why should I trust him? | About Me, Results & Testimonials |
| How does his coaching work? | Coaching Approach, How Coaching Works |
| What will I actually get? | What You Can Achieve, Coaching Offer |
| Is this right for me? | Who This Is NOT For, FAQ |
| What does it cost? | Coaching Offer |
| What happens if I book? | Coaching Offer, How Coaching Works, FAQ, booking flow |
| What should I do next? | Final CTA |

### 7.2 Page structure

Single long-form landing page (per language), plus separate legal pages.

1. Hero
2. The Problem
3. About Me
4. Coaching Approach
5. How Coaching Works
6. What You Can Achieve
7. Results & Testimonials
8. Coaching Offer
9. Who This Is NOT For
10. FAQ
11. Final CTA
12. Footer

**Structure decision log:** the client's proposed order is kept unchanged. Rationale: it follows the Recognition → Trust → Understanding → Value → Qualification → Action journey. Two additions that do not alter the order: (a) a persistent header CTA and in-page anchor navigation; (b) separate Privacy Policy and Terms & Conditions pages. Any later reordering (e.g., moving the Offer earlier for returning visitors) must be justified by UX reasoning or analytics.

### 7.3 Navigation

- Minimal: logo/wordmark, a small set of anchor links (e.g., Approach, How it works, Results, Offer, FAQ), language switcher, primary CTA.
- Mobile: intentionally designed compact navigation, CTA always reachable.
- Anchor scrolling respects reduced motion and keeps focus management correct.

---

## 8. Section Requirements

Each section has one primary message. "Content status" identifies dependencies on client input.

### 8.1 Hero

- **Purpose:** in seconds, communicate who he helps, with what, and how the approach differs.
- **Must include:** clear headline, short value proposition, professional photo of Mostafa, primary CTA, secondary CTA (visually subordinate).
- **Rules:** no unrealistic promises, no "get shredded fast," no motivational cliché.
- **Content status:** headline and value proposition drafts to be produced in Spec Kit copy stage and approved by client. Photo `[CONTENT REQUIRED]`.
- **Draft direction only (not approved):** headline themes around "a strategy that fits your life," "sustainable," "personalized for busy professionals."

### 8.2 The Problem

- **Purpose:** make the visitor feel understood.
- **Must include:** relatable situations from the brief (no time, starts well then stops, unsure which advice to follow, constantly restarting diets/workouts) and the reframe: the problem is not effort but the lack of a clear, sustainable strategy.
- **Rules:** no fear-based messaging, no shaming.

### 8.3 About Me

- **Purpose:** Story + Credibility + Connection. Not a CV.
- **Must include:** who Mostafa is, why he started The Fitness Formula, why he understands these problems.
- **Content status:** story `[CONTENT REQUIRED]`; credentials and experience `[CONTENT REQUIRED]` (none may be invented); personal photography `[CONTENT REQUIRED]`.

### 8.4 Coaching Approach

- **Purpose:** show a clear methodology.
- **Must include:** Assess → Design → Execute → Optimize, each with a short plain-language explanation; the message that the plan is built around the client and evolves.
- **Design note:** a visual treatment that reinforces the sequence without turning into a dashboard or card grid.

### 8.5 How Coaching Works

- **Purpose:** answer "when I sign up, what actually happens?"
- **Must cover (from the brief):** Initial Assessment, Goal Setting, Training Guidance, Nutrition Guidance, Habit Development, Progress Tracking, Accountability, Adjustments when needed.
- **Dependency:** claims must match what the 45-minute session model actually delivers. Whether ongoing support between sessions exists is `[DECISION REQUIRED]` DR-10. The copy must not imply services that are not offered.

### 8.6 What You Can Achieve

- **Purpose:** broaden outcomes beyond weight loss without overpromising.
- **Outcomes (from the brief):** fat loss; building muscle and strength; better body composition; better energy; better fitness habits; better sleep and lifestyle; a healthy routine sustainable long term.
- **Key message:** the goal is a system you can live with, not a two-month transformation.
- **Rules:** phrase as what coaching supports, never as guaranteed outcomes; no medical claims; no numeric result claims unless real and supplied.

### 8.7 Results & Testimonials

- **Purpose:** credible proof.
- **Supports:** client testimonials and progress stories presenting the complete coaching journey with selected context and details, not merely a pair of photos. The client expects to provide images later; do not use photos of clients/other people by default. Any person's image requires explicit approval and appropriate consent.
- **Architecture requirement:** data-driven and extensible (see §9). New items can be added without redesign.
- **Content status:** `[TESTIMONIAL REQUIRED]`, `[RESULT CONTENT REQUIRED]`. No fabricated testimonials or placeholder quotes that could be mistaken for real clients.
- **Launch behavior:** if fewer than the minimum verified items exist at launch, the section renders an approved fallback or is omitted. `[DECISION REQUIRED]` DR-14.
- **Consent:** client written consent is required for every testimonial and any image of a person. Do not assume before/after photos or photos of clients will be used.

### 8.8 Coaching Offer

- **Purpose:** make the offer and price unmistakably clear.
- **Must include:** what the session is; what is discussed; what the client leaves with; the value; **visible price** (DR-03); clear notice that refunds/money-back guarantees are not offered; both CTAs.
- **Rules:** price is displayed in the section itself, in the visitor's chosen language, with currency clearly stated. Terms for cancellations/rescheduling remain to be supplied and must not imply a refund.

### 8.9 Who This Is NOT For

- **Purpose:** honest self-qualification.
- **Content (from the brief):** not suited to people unwilling to commit or change anything, looking for a quick fix or shortcut, wanting results without effort, or wanting a harsh diet or rapid transformation only.
- **Balance:** end with who it is suited to: people who want real, keepable results.
- **Tone:** direct and respectful, not arrogant or exclusionary.

### 8.10 FAQ

- **Purpose:** remove remaining objections; reinforce qualification.
- **Scope:** 5–7 questions initially. Draft questions and answers may be improvised for launch, then revised with the client later; no answer may assert an unconfirmed service or policy. Current starter topics:
  1. Do I need a gym?
  2. Is it suitable for beginners?
  3. Is the coaching online?
  4. Will I get a diet plan?
  5. How often do I need a session?
  6. How do we track progress?
  7. If my circumstances or goals change, how is the plan adjusted?
- **Answers:** initial drafts can be prepared by the project team and reviewed/updated later; questions depending on DR-09, DR-10, DR-16 must be marked for confirmation.
- **Behavior:** accessible accordion, smooth open/close, works without JavaScript animation, extensible list.

### 8.11 Final CTA

- **Purpose:** one strong, simple closing decision.
- **Must include:** exactly two clear choices — the free intro call (for those who need to understand more) and the first coaching session (for those ready to start).
- **Rules:** no extra distractions; brief reassurance line supported by confirmed facts.

### 8.12 Footer

- **Must include:** contact information, social media, booking links, Privacy Policy, Terms & Conditions, any other required legal links, language switcher, copyright.
- **Content status:** WhatsApp number and social media links `[CONTENT REQUIRED]` (client will provide); legal text `[CONTENT REQUIRED]` (see §15).

---

## 9. Content Architecture for Extensibility

The client wants to add proof and FAQ content later without redesign. The site is content-driven from structured content, not hard-coded markup.

### 9.1 Testimonial / result item (minimum fields)

| Field | Notes |
|---|---|
| `id` | Unique |
| `type` | testimonial / progress story / result |
| `displayName` | Full name, first name, or initials, per client consent |
| `consent` | Recorded permission, and what it covers |
| `language` | ar / en / both (one item may have both translations) |
| `quote` / `story` | Real client words |
| `resultSummary` | Optional, only factual and supplied |
| `images` | Optional, with alt text; before/after only with consent |
| `date` | Optional |
| `order` / `featured` | Display control |

### 9.2 FAQ item

`id`, `question` (ar/en), `answer` (ar/en), `order`, `published`.

### 9.3 Editing model

How the client edits content after launch (files in the repo, a git-based CMS, or a headless CMS) is `[DECISION REQUIRED]` DR-13. Default position: no CMS unless the client needs to edit content without a developer. Any CMS must be justified by that need.

---

## 10. Bilingual Requirements (Arabic + English)

Bilingual is a core requirement affecting design, content, SEO, and engineering. It is not a translation plugin added at the end.

### 10.1 Functional requirements

| ID | Requirement |
|---|---|
| L-01 | Every landing-page section, legal page, and CTA exists in both Arabic and English. |
| L-02 | Arabic uses full **RTL** layout with mirrored spacing, alignment, icons that imply direction, carousels, and accordions; English uses LTR. |
| L-03 | Each language has its own URL (e.g., `/en/` and `/ar/`, exact scheme decided in Spec Kit) so pages are indexable and shareable. |
| L-04 | A visible, accessible language switcher in the header and footer. It preserves the current section/anchor where possible. |
| L-05 | `lang` and `dir` attributes are set correctly per page; `hreflang` alternates and canonical URLs are correct. |
| L-06 | Default language and first-visit detection behavior `[DECISION REQUIRED]` DR-01. Detection, if used, must never trap the user; their explicit choice persists. |
| L-07 | Arabic copy uses Egyptian Arabic (approved, DR-02). The brand voice must feel equally human and premium in both languages. |
| L-08 | Arabic is written natively for the audience, not machine-translated. Client review of both languages is required before launch. |
| L-09 | Testimonials and FAQ items support per-language content and per-item language availability. |
| L-10 | Numerals, dates, currency, and time zones are handled consistently per language and audience (DR-17). Numeral style (Western vs Arabic-Indic) `[DECISION REQUIRED]`. |
| L-11 | Forms, validation messages, booking-tool embeds, and any third-party UI support both languages, or the limitation is documented. |

### 10.2 Design implications

- A typography system with **matched Arabic and Latin typefaces** (weight, x-height, and visual color balanced) — selected in the Design System stage.
- Arabic text generally needs more line height and often larger size than Latin at the same visual weight; type scales are defined per script.
- Image composition, hero layout, and text placement are tested in both directions; photography with a clear subject direction should not conflict with RTL flow.
- No letter-spacing or uppercase treatments applied to Arabic text.
- The brand wordmark: how "The Fitness Formula" and "C/ Mostafa Kheder" appear in Arabic contexts `[DECISION REQUIRED]` (Latin wordmark retained, Arabic wordmark, or both).

### 10.3 QA implications

Every acceptance criterion in §17 applies to both languages, including accessibility, layout, and analytics.

---

## 11. Design Requirements

### 11.1 Direction

Clean, minimal, modern, premium, professional, approachable, editorial, personal-brand focused, fitness-oriented without aggression.

**Use:** strong typography, generous whitespace, professional photography, clear hierarchy, intentional composition, subtle motion, high-quality imagery, strong visual storytelling.

**Avoid:** generic gym templates; aggressive bodybuilding aesthetics; heavy black/red fitness styling; generic motivational quotes; excessive gradients; neon/cyber looks; card overuse; dashboard-like layouts; glassmorphism excess; excessive animation; fake urgency; cheap fitness-marketing patterns.

### 11.2 References (inspiration only — do not copy)

| Reference | Used for |
|---|---|
| Dan Go (dango.co) | Storytelling, personal brand, coaching philosophy, premium feel, photography, typography, authority (primary reference) |
| Matt West Fitness (mattwestfitness.com) | Simplicity, whitespace, busy-professional positioning, clear communication |
| Daniel Perfetto (danielperfetto.com) | Premium visual identity, photography, typography, personal-brand presentation |
| Rob Goodwin Fitness (robgoodwinfitness.com) | Individual consultations, session-based coaching, low-commitment entry |
| MAP Training (maptrainingfit.com) | Session booking, session packages, flexible service model |

**Reference rule:** no replication of layouts, copy, branding, colors, components, visual identity, or page structure. The final identity is original.

### 11.3 Photography and imagery

- Professional photography of Mostafa is central to the concept. `[CONTENT REQUIRED]` — photoshoot brief to be produced in Spec Kit (shot list, aspect ratios for hero/about/inline, both mobile and desktop crops).
- No generic stock gym imagery. If stock is used at all, it must be restrained and approved.
- Image direction: natural, confident, human; avoid aggressive flexing/bodybuilding poses.

### 11.4 Component inventory (for the Design System stage)

Header/nav, language switcher, primary and secondary buttons, text links, hero, section headings, editorial text blocks, method sequence (Assess/Design/Execute/Optimize), step list (How Coaching Works), outcomes list, testimonial/result presentation (extensible), offer block with price and no-refund notice, qualification (NOT-for) block, FAQ accordion, final CTA block, contact form, booking embed/link treatment, footer, legal-page layout, cookie/consent UI.

Required states for interactive components: default, hover, focus-visible, active, disabled, loading, error, success.

### 11.5 Motion

**Preferred:** subtle reveals, image transitions, hover feedback, button states, smooth accordions, scroll-based storytelling where it genuinely helps.

**Avoid:** animation on every element, long loaders, distracting parallax, heavy effects that hurt performance.

**Required:** honor `prefers-reduced-motion` (replace movement with instant or fade-only states). Motion never carries essential information.

---

## 12. Responsive Design

Mobile-first, with intentionally designed layouts (not scaled desktop).

| Breakpoint class | Requirement |
|---|---|
| Mobile | Primary design target. Compact nav, thumb-reachable CTAs, single-column storytelling, tuned type scale, cropped hero designed for portrait. |
| Tablet | Purpose-designed intermediate layouts; no awkward stretched mobile or squeezed desktop. |
| Desktop | Editorial layouts with generous whitespace and strong hierarchy. |
| Large desktop | Max content widths and image scaling prevent stretching; composition remains intentional. |

Each of these is designed deliberately: navigation, typography, images, spacing, CTA placement, sections, testimonials, FAQ, forms, and booking interactions. Both LTR and RTL variants are verified at every breakpoint.

---

## 13. Accessibility

Target: **WCAG 2.2 AA where practical.**

- Semantic HTML landmarks and a single logical heading hierarchy per page.
- Full keyboard operability, visible focus, logical focus order, skip link.
- Color contrast meeting AA for text and UI components in both languages.
- Accessible accordions (FAQ), navigation, language switcher, and forms (labels, errors, instructions, programmatic association).
- Meaningful alt text for informative images; decorative images hidden from assistive tech.
- Touch targets sized per WCAG 2.2 target-size guidance.
- Reduced-motion support; no content that flashes.
- Correct `lang` switching for mixed-language content so screen readers pronounce properly.
- Third-party booking embeds: accessibility limitations are assessed and a keyboard-accessible link fallback is provided.

---

## 14. Performance Requirements

| ID | Requirement |
|---|---|
| P-01 | Mobile Core Web Vitals (p75): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. |
| P-02 | Hero image optimized, correctly sized, preloaded where appropriate; below-fold images lazy-loaded. |
| P-03 | Responsive image sets (modern formats, multiple widths) with explicit dimensions to prevent layout shift. |
| P-04 | Font strategy for two scripts: subset, `font-display` behavior defined, minimal weights, preloading only critical files. Arabic fonts are often heavy — budget explicitly. |
| P-05 | Minimal JavaScript. The page must be readable and CTAs usable before non-critical scripts load. |
| P-06 | Third-party scripts (analytics, pixel, booking embed) load after consent where required and do not block rendering. |
| P-07 | Compression, HTTP caching with sensible cache lifetimes, and a CDN. |
| P-08 | No new dependency without a documented reason. |
| P-09 | Working budgets (proposed, to be confirmed in Spec Kit): total initial JavaScript, total image weight above the fold, and font payload per language. `[TBD]` |

---

## 15. SEO

| ID | Requirement |
|---|---|
| S-01 | Semantic HTML, one `h1` per page, logical heading order. |
| S-02 | Unique title and meta description per language and page. |
| S-03 | Open Graph and social-card metadata per language, with a designed share image. |
| S-04 | Canonical URLs and `hreflang` alternates between Arabic and English versions. |
| S-05 | `sitemap.xml` listing all language versions; `robots.txt`. |
| S-06 | Descriptive alt text for images. |
| S-07 | Structured data where accurate and appropriate (e.g., `Person`/`ProfessionalService`, `Offer`, `FAQPage`). Only mark up content that is visible on the page and true (price, guarantee, FAQs). |
| S-08 | Clean, readable, stable URLs. |
| S-09 | Fast, mobile-friendly, crawlable without JavaScript dependence for main content. |
| S-10 | No keyword stuffing. Keyword strategy for Arabic and English is written for the real audience (busy professionals), `[TBD]` research in Spec Kit. |

---

## 16. Analytics, Tracking, Privacy

### 16.1 Requirements

- Ready for **Google Analytics (GA4)** and **Meta Pixel**.
- A consent mechanism appropriate to the audience's jurisdictions loads tracking only as permitted. Legal basis and banner behavior `[DECISION REQUIRED]` DR-15.
- Event names are consistent, documented, and fired only where accurate measurement is possible.

### 16.2 Event plan

| Event | Fires when | Measurability note |
|---|---|---|
| `cta_click` | Any CTA is clicked | Parameters: CTA type, section/placement, language |
| `intro_call_click` | Intro-call CTA clicked | Always measurable |
| `coaching_session_click` | First-session CTA clicked | Always measurable |
| `booking_started` | Visitor begins a booking | Only if the booking tool exposes a start signal (embed events or redirect); otherwise not implemented |
| `booking_completed` | Booking (and, if applicable, payment) completed | Only via provider confirmation, redirect to a confirmation page, or webhook; otherwise not implemented. Must distinguish free intro vs paid session |
| `contact_form_started` | First interaction with the form | Measurable |
| `contact_form_submitted` | Successful submission | Measurable after success response only |
| `language_switch` (optional recommendation) | Language changed | Measurable |

**Rule:** a tracking event that cannot be measured accurately is not created. Which booking events are feasible depends on DR-05/DR-06.

### 16.3 Privacy notes

- No personal data collected beyond what the contact form or booking tool requires.
- Data handling, retention, and processors are documented in the Privacy Policy (`[CONTENT REQUIRED]`).

---

## 17. Technical Approach

### 17.1 Philosophy

Use the simplest architecture that satisfies the requirements. This is a marketing + personal-brand + conversion experience, not an application.

### 17.2 Architectural constraints

- Static-first delivery (pre-rendered pages) for speed, SEO, and reliability.
- **No** authentication, database, custom API layer, admin dashboard, or CRUD unless a requirement explicitly justifies it.
- Booking and payments handled by a third-party service (DR-05, DR-06), integrated by link or embed.
- Contact form (if kept) submitted to a managed form/serverless endpoint with spam protection; the site has no self-hosted backend by default.
- HTTPS/SSL on all pages; sensible security headers.
- Compatible with modern browsers (current and previous major versions of Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome). Exact support matrix `[TBD]` in Spec Kit.
- Internationalization and RTL are first-class in the chosen framework and content model.
- Analytics and pixel integration behind a consent-aware loader.

### 17.3 Deferred to Spec Kit

Framework and tooling selection, i18n implementation, content storage format, image pipeline, hosting/CDN, form provider, booking-tool selection, CI/CD, environments, and monitoring. Each decision must be justified against §14 (performance), §15 (SEO), §10 (bilingual), and maintainability.

---

## 18. Legal and Compliance

| Item | Status |
|---|---|
| Privacy Policy (both languages) | `[CONTENT REQUIRED]` |
| Terms & Conditions (both languages), including session terms, cancellation/rescheduling, and the no-refund policy | `[CONTENT REQUIRED]` — legal review recommended |
| Cookie/consent approach | `[DECISION REQUIRED]` DR-15 |
| Health disclaimer (e.g., not medical advice; consult a physician before starting a program) | `[CONTENT REQUIRED]` — wording from the client, ideally reviewed by a qualified professional |
| Testimonial and before/after consent | `[DECISION REQUIRED]` process; consent records kept by the client |
| Business/legal entity name and contact details for footer/legal pages | `[CONTENT REQUIRED]` |

**Claims policy:** no medical claims, no unsupported transformation claims, no fabricated credentials, no invented statistics, no guaranteed outcomes. The no-refund policy must be stated consistently with client-approved Terms.

---

## 19. Content Inventory and Ownership

| Content item | Owner | Status |
|---|---|---|
| Mostafa's story and "why The Fitness Formula" | Client | `[CONTENT REQUIRED]` |
| Credentials, certifications, experience | Client | `[CONTENT REQUIRED]` — none invented |
| Professional photography (hero, about, supporting) | Client / photographer | `[CONTENT REQUIRED]` |
| Session structure: agenda, topics, deliverables | Client | `[CONTENT REQUIRED]` |
| Price and currency | Client | `[DECISION REQUIRED]` DR-03 |
| Guarantee terms | Client | `[DECISION REQUIRED]` DR-04 |
| FAQ answers | Client, with copy support | `[CONTENT REQUIRED]` |
| Testimonials and full coaching-journey stories/details; images may follow later | Client | `[TESTIMONIAL REQUIRED]` `[RESULT CONTENT REQUIRED]` |
| Arabic (Egyptian) and English copy (all sections) | Copywriter + client review | To be produced in Spec Kit |
| WhatsApp number and social media links | Client | `[CONTENT REQUIRED]` |
| Legal pages | Client / legal | `[CONTENT REQUIRED]` |
| Brand assets (logo/wordmark, existing colors, if any) | Client | `[CONTENT REQUIRED]` — existence unknown; if none, identity is created in the Design System stage |

---

## 20. Decision Register

| ID | Decision | Options / notes | Blocks |
|---|---|---|---|
| **DR-01** | Default language and first-visit behavior | Arabic default, English default, or browser-language detection with a persistent user choice | IA, SEO, analytics |
| **DR-02** | Arabic copy register | Egyptian Arabic (approved) | All Arabic copy, tone |
| **DR-03** | Session price and currency (and whether multiple currencies are shown) | Depends on DR-17 | Offer section, payment |
| **DR-04** | Refund / money-back guarantee | No refund or money-back guarantee (approved) | Offer section, Terms |
| **DR-05** | Booking/customer-journey flow | Option A / B / C (§6.2) | Conversion design, analytics, integrations |
| **DR-06** | Payment provider and where payment happens | Depends on business location, currency, and audience | Booking flow, legal |
| **DR-07** | Session packages in v1 or later | Brief references MAP Training's package model; current offer is single sessions | Offer section, pricing, payments |
| **DR-08** | Domain name(s), hosting, and email | Language-specific paths vs domains | Deployment, SEO |
| **DR-09** | Session delivery platform and format | Online video platform; confirm online-only | Offer copy, FAQ |
| **DR-10** | What support exists between sessions | E.g., messaging, tracking reviews, none; determines what "How Coaching Works" may claim | §8.5 and FAQ copy |
| **DR-11** | Who conducts the free intro call and what it covers | Mostafa personally or another team member; qualification steps | Booking setup, copy |
| **DR-12** | Contact channels | WhatsApp number and social media links (approved); exact details supplied by client | Footer, fallback CTA |
| **DR-13** | Post-launch content editing model | Repo files, git-based CMS, headless CMS, developer-managed | Architecture |
| **DR-14** | Launch behavior when proof content is limited | Fallback module vs omit section; minimum number of items | §8.7 |
| **DR-15** | Cookie/consent and legal basis for tracking | Depends on audience jurisdictions | Analytics, legal |
| **DR-16** | Whether a diet/nutrition plan is delivered, and in what form | FAQ answer and offer claims depend on it | FAQ, Offer, legal |
| **DR-17** | Audience geography and time zones | Mostly Egypt; some international visitors (approved). Currency, payment, and booking hours still need definition. | Pricing, booking, SEO |
| **DR-18** | Wordmark treatment in Arabic contexts | Latin, Arabic, or both | Brand/design |
| **DR-19** | Blog/content hub after launch | May be added after launch; excluded from v1 (approved) | Architecture |

---

## 21. Assumptions

1. The brief's Booking link and Contact Form remain candidates; no tool has been selected.
2. The site is a single landing page per language plus legal pages.
3. Photography can be produced or supplied before visual design is finalized.
4. Copywriting for both languages is part of the Spec Kit/design workstream and requires client approval.
5. The brand identity (logo, palette) may not yet exist; if not, it is created within the Design System stage, respecting §11.1.
6. Third-party booking/payment tools will be chosen by DR-05/DR-06 and may constrain analytics.

## 22. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Missing real proof (testimonials, credentials) weakens trust | Design a proof layer that works with little content; never fabricate; plan content collection early (DR-14) |
| Undecided booking/payment flow delays build | Resolve DR-05/DR-06 before Wireframes; design both CTAs to work with any option |
| Weak Arabic copy or RTL layout damages the premium feel | Native Arabic copywriting, RTL-first design review, bilingual QA |
| Heavy Arabic and Latin fonts hurt performance | Font subsetting, limited weights, performance budget (P-04, P-09) |
| Third-party embeds hurt performance/accessibility | Prefer link or lazy-loaded embed; provide fallback link |
| Guarantee and pricing terms create legal exposure | Client-approved terms, legal review, consistent wording across site and Terms |
| Look drifts toward a generic fitness template | Enforce §11 avoid-list and reference rule at every design review |
| Tracking events that cannot be measured accurately | Only implement events feasible under the selected booking flow (§16.2) |

---

## 23. Acceptance Criteria

**Product and content**

- AC-01: All 12 sections are present in the specified order in both languages.
- AC-02: The session price is visible in the Offer section without any click or form; the no-refund policy is stated clearly and consistently.
- AC-03: Both CTAs appear in the hero (primary prominent), Offer, and Final CTA, and work end to end in both languages.
- AC-04: No invented credentials, testimonials, results, statistics, pricing, or guarantees appear anywhere. All unresolved items remain tagged until resolved.
- AC-05: Testimonial/result and FAQ items can be added by following the documented process without changing layout code.

**Bilingual**

- AC-06: Arabic pages render RTL correctly at all breakpoints; English renders LTR; `lang`, `dir`, `hreflang`, and canonical tags are correct.
- AC-07: The language switcher works via keyboard and pointer and preserves the visitor's place where feasible.
- AC-08: Arabic copy has been reviewed and approved by the client.

**Accessibility**

- AC-09: Automated accessibility checks pass, and manual keyboard and screen-reader spot checks pass for nav, FAQ accordion, language switcher, and forms in both languages.
- AC-10: `prefers-reduced-motion` disables non-essential movement.

**Performance and technical**

- AC-11: Mobile field or lab metrics meet §14 P-01 on the primary landing page in both languages.
- AC-12: Site is served over HTTPS; images are responsive and lazy-loaded appropriately; no unjustified third-party scripts.
- AC-13: Site works on the agreed modern-browser matrix, iOS Safari, and Android Chrome.

**SEO and analytics**

- AC-14: Titles, meta descriptions, Open Graph tags, sitemap, and robots.txt are present for both languages; structured data validates and matches visible content.
- AC-15: GA4 and Meta Pixel are integrated behind the approved consent behavior; every implemented event in §16.2 is verified in real conditions; events that cannot be measured are absent.

**Legal**

- AC-16: Privacy Policy, Terms & Conditions, and the health disclaimer are live in both languages and linked in the footer.

---

## 24. Spec Kit Handoff

### 24.1 What Spec Kit should produce from this PRD

1. **Product/UX specification:** journey maps, page/section specs with content requirements, states, and edge cases (including empty proof states).
2. **Content and copy specification:** message hierarchy, tone guidelines in both languages, the copy deck per section, CTA wording, FAQ drafts.
3. **Design System:** bilingual type system, color and spacing principles, component library with all required states, motion principles, photography direction.
4. **Wireframes:** mobile-first, in LTR and RTL.
5. **Visual design:** premium personal-brand look consistent with §11.
6. **Technical specification:** stack selection with justification, i18n/RTL approach, content model (§9), integrations (booking, payment, forms, analytics, consent), performance budgets, deployment.
7. **QA plan:** functional, responsive, accessibility, performance, SEO, analytics, bilingual, and legal checklists tied to §23.

### 24.2 Blocking decisions before Wireframes

DR-01, DR-02, DR-03, DR-04, DR-05, DR-06, DR-07, DR-10, DR-17.

### 24.3 Blocking content before Visual Design

Photography direction and assets, Mostafa's story, credentials, and session details.

### 24.4 Guardrails for downstream stages

- Do not start implementation until the PRD is approved and the required specifications are sufficiently defined.
- Do not add backend, CMS, or dependencies without a documented product reason.
- Resolve decisions in the Decision Register; never resolve them silently.
- Keep every design and technical choice consistent with: **Expertise + Personalization + Structure + Trust + Sustainability + Premium Simplicity.**

---

## Appendix A — Content and Copy Guardrails

**Do:** be clear, concise, human, confident, practical, and trust-building; speak to real-life constraints; sell the coaching system and its value.

**Do not:** use fitness clichés, overpromise, fake authority, aggressive sales language, fear-based messaging, medical claims, unsupported transformation claims, "get shredded fast" messaging, or unrealistic promises.

## Appendix B — Client Brief Traceability

| Brief requirement | Where addressed |
|---|---|
| Goals of the site | §1.2, §2 |
| Audience and problems | §3 |
| Positioning | §1.3 |
| Design direction, Dan Go inspiration | §11 |
| Landing page structure (12 sections) | §7.2, §8 |
| Coaching Offer, price, guarantee | §5, §8.8 |
| Main CTA and low friction; Calendly vs form | §6 |
| Technical requirements (responsive, fast, HTTPS, SEO, images, browsers, GA, Meta Pixel) | §12, §14, §15, §16, §17 |
| Five design references and how to combine them | §11.2 |
| Bilingual (added by client after the brief) | §10 |
