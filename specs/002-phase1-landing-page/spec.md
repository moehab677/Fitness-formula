# Feature Specification: Phase 1 Landing Page (Master Specification)

**Feature Branch**: `002-phase1-landing-page`

**Created**: 2026-09-27

**Status**: Draft

**Input**: User description: "Create the master technical specification for Phase 1 of
'The Fitness Formula' landing page based on the v2.2.0 constitution and the extracted design
tokens. A 12-section, responsive, static-first, bilingual (English LTR / Arabic RTL) landing
page built without a custom backend, covering styling and layout architecture, JSON-driven
content, the dual-path CTA and lead form, core reusable components, and all 12 sections."

**Governing documents**: Constitution v2.3.0 (`.specify/memory/constitution.md`), PRD v1.0
(`PRD-v1.0-The-Fitness-Formula.md`), and the design-system export
(`design/stitch/design-system/`). This specification supersedes
`specs/001-bilingual-coaching-landing/spec.md` for Phase 1 wherever the two conflict. For
example, spec 001 still uses the old CTA labels and has no lead form.

## Clarifications

### Session 2026-09-29

- Q: How should the page be structured now that final English copy exists? → A: 11 sections
  in this order: 01 Hero, 02 My Story, 03 My Approach, 04 How Coaching Works, 05 Pricing,
  06 Client Transformations, 07 Testimonials (screenshot carousel), 08 Who This Isn't For,
  09 FAQ, 10 Final CTA, 11 Footer. "The Problem" and "What You Can Achieve" are removed (no
  approved copy). This supersedes the order and count in User Story 1 and FR-038; the
  per-section requirements in FR-038 still apply to the sections that remain.
- Q: Where do the screenshot testimonials go? → A: Their own section, after Client
  Transformations.
- Q: Transformation result wording? → A: Version 2 of the supplied copy, verbatim
  (including "Body fat: −3.5%" and "−5% body fat").
- Q: What does "Read his/her story" link to? → A: The client's Facebook post, supplied per
  client; the link renders only once its URL is set.

### Session 2026-09-28

- Q: When someone opens the root address with no language in the URL and no saved choice,
  which language should they see? → A: Always English. The browser language is not
  detected, and a saved choice still takes priority.
- Q: If there are no approved testimonials at launch, what should Results & Testimonials show?
  → A: That case does not apply. The client has supplied 8 real testimonial images (Arabic
  WhatsApp chat screenshots) in `design/stitch/testimonials/` (1.jpg to 8.jpg). Section 07
  launches with them and is always shown. A missing-content state is only a safety net for
  the build.
- Q: Should the Arabic page show numbers as Western digits (700) or Eastern Arabic digits
  (٧٠٠)? → A: Western digits everywhere on the Arabic page, including prices, durations,
  step numbers and section numbers (PRD DR-17 resolved).
- Q: On phones, should the header stay pinned to the top while the visitor scrolls? → A: It
  hides while scrolling down and reappears on any scroll up. It is always visible at the top
  of the page.
- Q: On desktop, which side should the photo sit on in the photo sections? → A: The sides
  alternate. 01 Hero has text first and photo last, 03 My Story has photo first, and 05 How
  Coaching Works has text first. The Arabic page mirrors this.
- Q: How should the Arabic-only testimonial screenshots appear on the English page? → A: The
  same original Arabic screenshots appear, unaltered, on both pages. On the English page, a
  human-written English translation sits directly beneath each screenshot.
- Q: Screenshot 5 mentions reducing painkillers. Keep it, crop it, or drop it? → A: Crop the
  painkiller sentences out of the image, to comply with the PRD's ban on medical claims.
- Q: Have all clients consented to their messages being shown publicly? → A: Yes, explicit
  consent is confirmed for all 8 testimonials.
- Q: How should the neon-green logo sit with the olive accent? → A: Show the logo in
  grayscale (monochrome) so its green does not clash with Accent #B7C96B.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the Offer in My Language (Priority: P1)

A busy professional arrives from social media on a phone. They read the whole coaching story,
from Hero to Footer, in their own language (Egyptian Arabic, right-to-left, or English,
left-to-right). Every section, label, price and message appears in that language and
direction, laid out for a phone rather than as a shrunken desktop page.

**Why this priority**: Without a complete, correct page in the visitor's language, no
conversion can happen. Every other story depends on this one.

**Independent Test**: Open the English and Arabic pages at 390 px, 768 px and 1440 px. Check
that all 12 sections appear in order, with the correct language, direction and layout, and
that no raw placeholder text or wrong-language text is visible.

**Acceptance Scenarios**:

1. **Given** a visitor opens the English page, **When** it loads, **Then** all 11 sections
   render in English, left-to-right, in the Manrope typeface, in this order: 01 Hero, 02 My
   Story, 03 My Approach, 04 How Coaching Works, 05 Pricing, 06 Client Transformations,
   07 Testimonials, 08 Who This Isn't For, 09 FAQ, 10 Final CTA, 11 Footer (clarification
   2026-09-29).
2. **Given** a visitor opens the Arabic page, **When** it loads, **Then** the same 11 sections
   render in Egyptian Arabic, right-to-left, in IBM Plex Sans Arabic. Layout, icons and
   alignment are mirrored.
3. **Given** a 390 px wide phone, **When** the visitor reaches a section with photography,
   **Then** the photo fills the full screen width at the top of the section, and the text sits
   below it on a dark ground that the photo blends into.
4. **Given** a 1200 px or wider screen, **When** the visitor reaches a section with
   photography, **Then** the photo and the text sit side by side in two columns. In the
   Arabic layout the order of the columns is mirrored.
5. **Given** a screen wider than 1440 px, **When** any section renders, **Then** content stays
   within a 1440 px centered canvas and does not stretch.

---

### User Story 2 - Tell the Coach About My Goals (Primary CTA) (Priority: P1)

A visitor who is interested but unsure chooses the primary action, "[ GET STARTED ] Tell me
about your goals". They fill in a short five-field form (name, WhatsApp number, goal,
struggle, preferred contact time) and send it. The form is replaced by a personal
confirmation that uses their name. The coach receives the details by email.

**Why this priority**: This is the site's main lead-capture path. It carries the lowest
friction for visitors who are not ready to book.

**Independent Test**: From the Hero, Coaching Offer and Final CTA sections in both
languages, activate the primary CTA, submit valid details, and check that (a) the
confirmation appears with the visitor's name, and (b) the site manager's inbox receives one
email with all five values.

**Acceptance Scenarios**:

1. **Given** any section containing the dual CTAs, **When** the visitor activates the primary
   CTA, **Then** they are taken to the lead form, and keyboard focus moves to the form's
   first field.
2. **Given** the lead form, **When** the visitor submits with any required field empty or
   with an invalid WhatsApp number, **Then** submission is blocked. Each invalid field shows
   an inline message in the visitor's language, and focus moves to the first invalid field.
3. **Given** valid input, **When** the visitor submits, **Then** a sending state is shown, the
   submit control cannot be activated twice, and on success the form is replaced by the
   message: "Thanks, [Name]. I'll reach out to understand where you are today and recommend
   the right next step." ([Name] is the submitted name.) The Arabic page shows the approved
   Egyptian Arabic equivalent.
4. **Given** the submission service fails or the visitor is offline, **When** they submit,
   **Then** the form stays filled in. An error message in their language explains the
   problem and offers the direct booking link and WhatsApp as alternatives.
5. **Given** the visitor's browser has scripts disabled, **When** they activate the primary
   CTA and submit the form, **Then** the submission still reaches the site manager, and the
   visitor sees a confirmation page in their language.

---

### User Story 3 - Book a Session Directly (Secondary CTA) (Priority: P1)

A visitor who already knows what they want chooses "Already know what you need? Book a
session", or "BOOK A SESSION" after reading the prices. The booking page opens in a new tab.

**Why this priority**: This is the direct revenue path for visitors who are ready to buy.

**Independent Test**: Activate every secondary CTA and the "BOOK A SESSION" button in both
languages. Check that each one opens the configured booking page in a new tab.

**Acceptance Scenarios**:

1. **Given** any dual-CTA placement, **When** the visitor views it, **Then** the primary CTA
   comes first in visual and reading order. The secondary CTA follows it and is clearly less
   prominent.
2. **Given** the secondary CTA, **When** it is activated, **Then** the booking page opens in a
   new tab, and the original page does not lose its place.
3. **Given** the Coaching Offer section, **When** the visitor reads past the guarantee,
   **Then** a prominent "BOOK A SESSION" button leads to the same booking page.

---

### User Story 4 - See the Price and Terms Clearly (Priority: P1)

A visitor wants to know the cost before committing. The Coaching Offer section shows both
options, the terms and the guarantee, with no clicks or forms required.

**Why this priority**: Hidden or unclear pricing damages trust and wastes intro calls.

**Independent Test**: Scroll to the Coaching Offer section in both languages and check every
price, duration, saving, term and guarantee string against the approved pricing content.

**Acceptance Scenarios**:

1. **Given** the Coaching Offer section, **When** it renders, **Then** it shows exactly two
   options:
   - "1-to-1 Fitness Consultation", 45 minutes, 700 EGP per session.
   - "4 Sessions", 4 × 45 minutes, 2,000 EGP, "Save 800 EGP".
2. **Given** the pricing options, **When** the visitor reads below them, **Then** "No
   subscription. No long-term commitment." appears first, then "100% Money-Back Guarantee.
   If you don't feel the session was valuable, you get your money back. No questions
   asked.", then the "BOOK A SESSION" button.
3. **Given** the Arabic page, **When** the prices render, **Then** numbers and currency use
   Western digits with the Arabic currency label (for example "700 جنيه" and "45 دقيقة").
   Eastern Arabic digits (٠–٩) never appear.

---

### User Story 5 - Switch Language Without Losing My Place (Priority: P2)

A bilingual visitor switches between Arabic and English and continues from the same
section. Their choice is remembered on the next visit.

**Why this priority**: Many Egyptian visitors read both languages. Being sent back to the
top of a long page on every switch is frustrating.

**Independent Test**: Scroll to the FAQ on the English page, switch language, and check that
the Arabic page opens at the FAQ. Reload the root address and check that Arabic is
remembered.

**Acceptance Scenarios**:

1. **Given** a visitor viewing any section, **When** they switch language from the header or
   footer, **Then** the other language opens at the same section.
2. **Given** keyboard-only use, **When** the switcher is focused and activated, **Then** it
   behaves exactly as it does with a pointer. Its accessible name states the target language
   in that language (for example "العربية" or "English").
3. **Given** a visitor has chosen a language, **When** they return later, **Then** that
   language opens by default, and they can always switch again.

---

### User Story 6 - Get Answers and Check Fit (Priority: P2)

A hesitant visitor reads "Who This Is NOT For" and opens FAQ items to resolve their last
doubts.

**Why this priority**: Pre-qualification improves the quality of leads. FAQs remove the last
objections before conversion.

**Independent Test**: Open and close every FAQ item using both keyboard and pointer, in both
languages, and with reduced motion switched on.

**Acceptance Scenarios**:

1. **Given** the FAQ section, **When** it renders, **Then** only published questions appear,
   in their configured order, in the visitor's language.
2. **Given** a question, **When** it is activated with a pointer, Enter or Space, **Then** its
   answer expands or collapses, its expanded state is announced, and focus stays on the
   question.
3. **Given** reduced motion is preferred, **When** a question is toggled, **Then** the answer
   appears instantly or with a fade of at most 150 ms.
4. **Given** scripts are disabled, **When** the FAQ renders, **Then** all answers are visible.

---

### User Story 7 - Trust Real Proof (Priority: P3)

A visitor looks for evidence that the coaching works. The Results & Testimonials section shows
only real, consented client proof. At launch this is 8 WhatsApp chat screenshots from
clients, written in Arabic. They are shown on both language pages, and the English page adds
a translation beneath each one.

**Why this priority**: Proof builds trust. Real testimonial images exist at launch, and the
structure must let more be added later without design changes.

**Independent Test**: Render the section with zero, one and several testimonial entries, and
with entries for only one language.

**Acceptance Scenarios**:

1. **Given** consented testimonials exist for the current language, **When** the section
   renders, **Then** each shows its testimonial image (or quote or story), display name and
   optional result summary, in the configured order.
   - Each image has alt text in the page's language.
   - An image that shows written words, such as a chat screenshot, also has a full text
     transcription in that language. The transcription is available to screen readers and
     can be revealed on screen.
2. **Given** an Arabic screenshot testimonial with an approved English translation, **When**
   the English page renders, **Then** the original, unaltered Arabic screenshot is shown with
   the human-written English translation directly beneath it. A testimonial with no English
   translation is not shown on the English page.
3. **Given** (safety net only) no eligible testimonials for a language, **When** that page
   renders, **Then** the build warns. The section shows only its heading and the dual CTAs.
   No empty grid, placeholder quote or invented proof
   appears.
4. **Given** a new entry is added to the testimonial content, **When** the site is rebuilt,
   **Then** it appears without any change to page structure or components.

---

### Edge Cases

- **Root address with no language**: the visitor is sent to their remembered language. If
  there is none, they are sent to English (the default language; PRD DR-01 resolved). The
  browser's language is not used, and the wrong language never flashes on screen first.
- **Invalid content entries**: an entry missing a required field (for example a testimonial
  without consent, or an FAQ without an answer in one language) fails the build with a clear
  message. It is never silently rendered half-empty.
- **Content present in one language only**: pricing, journey steps and FAQs need both
  languages to publish. Testimonials may be single-language (Story 7).
- **Long names in the confirmation**: names up to 80 characters wrap cleanly. Names are shown
  as plain text, and any markup in them is not interpreted.
- **Repeated submissions**: a second submission within the same page view is blocked while
  one is in progress. After success the form is not shown again on that page view.
- **Spam**: automated submissions are filtered by the form service's spam protection without
  adding a visible puzzle for real visitors.
- **Photo fails to load**: the section keeps its layout and dark ground, and text stays
  readable.
- **Text too tall for its photo on mobile**: the text area grows downward. Text never overlaps
  the unblended part of the photo.
- **Mixed-script text** (for example "The Fitness Formula" inside Arabic): the Latin text
  keeps its direction and is announced in English by screen readers.
- **Very narrow screens (320 px)**: every section remains usable with no horizontal
  scrolling.
- **Booking page unavailable**: the secondary CTA still opens the booking address. Its
  availability is outside the site's control and is documented in Assumptions.

## Requirements *(mandatory)*

### Functional Requirements

#### A. Visual System and Theme

- **FR-001**: The page MUST use a "Premium Dark Theme" built only from the constitution's
  tokens: Ink, Charcoal, Paper, White, Muted, Line, Line-dark and Accent. No other colours
  may appear.
- **FR-002**: The dark theme MUST alternate dark and light sections, as in the
  "alternating" design screens:
  - **Dark sections** (Ink or Charcoal ground, Paper text, Accent highlights): 01 Hero, 03 My
    Story, 05 How Coaching Works, 07 Results & Testimonials, 09 Who This Is NOT For and 11
    Final CTA. 12 Footer uses Ink.
  - **Light sections** (Paper ground, Ink text, Accent-Dark for accent text): 02 The Problem,
    04 Coaching Approach, 06 What You Can Achieve, 08 Coaching Offer and 10 FAQ.
  - Every section that contains photography MUST be a dark section.
  - Next to each other, Ink and Charcoal dark sections MAY swap for rhythm. Two neighbouring
    sections MUST NOT share the same ground, except 11 Final CTA and 12 Footer, which are
    separated by a `line-dark` hairline.
  - White MAY be used only for raised elements, such as cards and form fields, on either
    ground.
- **FR-003**: Accent (#B7C96B) MUST be the single highlight colour for interactive states,
  active indicators and emphasis on dark grounds.
- **FR-004**: Wherever accent-coloured text or small accent indicators appear on Paper or
  White, the darker accent (#5C6B17, 5.3:1 on Paper) MUST be used instead. Accent MUST NOT
  be used as text on light grounds.
- **FR-005**: Muted text MUST NOT be used below 24 px regular or 18.66 px bold on Paper, as
  set by the constitution's contrast rules.
- **FR-006**: All corners MUST be square, and there MUST be no drop shadows. Surfaces MUST be
  separated by 1 px hairlines or a change of ground.
- **FR-007**: The English page MUST use Manrope and the Arabic page IBM Plex Sans Arabic, each
  with the type roles, sizes, line-heights and Arabic adjustments set out in the
  constitution. Arabic text MUST NOT use letter-spacing or uppercase.
- **FR-008**: Layout MUST be designed for mobile first, with these steps:
  - Mobile: 4 columns below 768 px, with 20 px margins and 16 px gutters.
  - Tablet: 8 columns from 768 px, with 32 px margins and 24 px gutters.
  - Desktop: 12 columns from 1200 px, with 56 px margins and 32 px gutters.
  - Content MUST be capped at 1440 px wide and centred.
- **FR-009**: Spacing MUST use only the constitution's scale: 4, 8, 16, 24 and 40 px, plus
  section rhythm in multiples of 40 px.
- **FR-010**: Design verification MUST be done against the 390 px (mobile) and 1440 px
  (desktop) reference layouts, with 768 px as the tablet check.

#### B. Photography Layout Rule

- **FR-011**: This rule applies to every section that contains photography. At minimum that is
  01 Hero, 03 My Story and 05 How Coaching Works.
  - **Mobile and tablet (below 1200 px)**: the photo is full-bleed (edge to edge, ignoring page
    margins) at the top of the section. Its lower part fades vertically to the section's dark
    ground, where the text begins. This uses the constitution's single permitted gradient
    exception:
    - It is a one-direction fade from transparent to the section's own dark ground token.
    - It covers at most the bottom 50% of the photo.
    - It applies only below 1200 px.
    - It is purely decorative, so it carries no information and needs no alternative for
      reduced motion.
    - Text may start inside the faded area only where its 4.5:1 contrast is met (FR-012).
    - No other gradient may appear anywhere on the page.
  - **Desktop (1200 px and wider)**: the photo and text sit side by side in two columns of
    the 12-column grid. The photo's side alternates by section, in reading order:
    - 01 Hero: text first, photo last (photo on the right in English, left in Arabic).
    - 03 My Story: photo first, text last (photo on the left in English, right in Arabic).
    - 05 How Coaching Works: text first, photo last.
    - Any photo section added later continues the alternation.
    - The text column comes first in reading order in every case, so screen readers and
      keyboard users meet the heading before the photo.
- **FR-012**: Text placed over or next to photography MUST meet 4.5:1 contrast at every point
  where text appears, measured against the darkest and lightest parts behind it.
- **FR-013**: Each photo MUST have separate mobile (portrait) and desktop crops, and space for
  it MUST be reserved so the page does not jump while it loads. Informative photos MUST have
  alt text in the page's language.

#### C. Structured Content

- **FR-014**: Structured content MUST come from four local content files, and not from page
  markup:
  - `journey.json`: the 4 coaching-process steps.
  - `pricing.json`: the 2 pricing options, terms, guarantee and "BOOK A SESSION" button.
  - `faqs.json`: questions and answers.
  - `testimonials.json`: client proof.
- **FR-015**: `journey.json` MUST hold exactly the four steps "01. Free assessment", "02.
  Choose next step", "03. Build plan" and "04. Come back when needed". Each step has an id,
  step number, title and description in both languages, and an order.
- **FR-016**: `pricing.json` MUST hold, for each option:
  - an id and a name in both languages;
  - a duration: minutes, session count and a label in both languages;
  - the price as a number and the currency;
  - a price suffix and an optional note in both languages;
  - a highlight flag and an order.

  It MUST also hold the terms, the guarantee title and text, and the "BOOK A SESSION" label
  in both languages, plus the button's destination.
- **FR-017**: `faqs.json` MUST hold, for each item: an id, the question and answer in both
  languages, an order and a published flag. Launch content is 5 to 7 items, covering the PRD
  §8.10 starter topics.
- **FR-018**: `testimonials.json` MUST hold, for each item:
  - an id and a type (testimonial, progress story, result or screenshot);
  - a display name and a consent record;
  - the languages it is available in;
  - the quote or story in each of those languages, which is required unless the item has an
    image;
  - images, which are required for the screenshot type. Each image has:
    - a reference to its source file in `design/stitch/testimonials/`;
    - alt text in each available language;
    - for any image showing written words, the original-language transcription;
    - for each other page language it appears on, a human-written translation, which is
      shown visibly beneath the image;
  - an optional factual result summary, an optional date, an order and a featured flag.

  Items without recorded consent MUST NOT render.
  - Screenshots MUST be shown unaltered, apart from compression, resizing and the
    compliance crop below.
  - Before publishing, any sentence making a medical or health-treatment claim MUST be
    cropped out of the image, and removed from its transcription and translation.
    Screenshot 5 (reduced painkiller use) MUST be cropped this way.
  - Names or phone numbers that the client has not consented to show MUST be blurred or
    cropped out.
  - Digits inside screenshots are part of the image and are not affected by the
    Western-digit rule.
  - Testimonial images MUST go through the same responsive image process as other photos.
- **FR-019**: Every content file MUST be checked against its schema when the site is built. A
  missing required field, a duplicate id or a missing translation MUST stop the build and
  name the file and entry.
- **FR-020**: All other visible text MUST come from per-language copy content and not be
  written into components. This includes section headings, body copy, CTA labels, form
  labels, validation messages and the confirmation message.
- **FR-021**: Adding, editing, reordering or unpublishing an entry in any of the four content
  files MUST need only a content change and a rebuild.

#### D. Conversion System

- **FR-022**: Primary CTA: the label MUST be "[ GET STARTED ] Tell me about your goals", or the
  approved Egyptian Arabic equivalent. It MUST look like a filled, high-contrast button, and
  it MUST lead to the lead form.
- **FR-023**: Secondary CTA: the label MUST be "Already know what you need? Book a session",
  or the approved Arabic equivalent. It MUST look clearly less prominent than the primary CTA
  (outlined or text style). It MUST open the configured booking address in a new tab without
  giving that tab access to the site's page.
- **FR-024**: The two CTAs MUST appear together, primary first, in 01 Hero, 05 How Coaching
  Works (directly after the journey steps), 08 Coaching Offer and 11 Final CTA.
- **FR-025**: The booking address MUST be set in one site-wide setting, so it can change
  without editing components.
- **FR-026**: There MUST be exactly one lead form on each language page. It MUST sit in the
  Final CTA section, and every primary CTA MUST link to it. The link MUST work without
  scripts. With scripts, it moves the visitor to the form and puts focus on the first field.
- **FR-027**: The lead form MUST collect exactly five required fields, each with a visible
  label linked to its field:
  1. **Name** (1 to 80 characters).
  2. **WhatsApp number**. International format; an Egyptian number without a country code is
     accepted and treated as +20.
  3. **Goal** (up to 500 characters).
  4. **Struggle** (up to 500 characters).
  5. **Preferred time to be contacted**: a choice from a fixed list of time windows, defined
     in copy content.
- **FR-028**: Validation MUST happen inline before sending, with messages in the page's
  language. Error text MUST be linked to its field so screen readers announce it.
- **FR-029**: Submissions MUST go to a managed third-party form service that emails the site
  manager. There MUST be no custom server, database or self-hosted interface. Each submission
  MUST include the page language and the section the visitor came from.
- **FR-030**: While a submission is sending, the form MUST show a sending state and prevent
  duplicate submission. On success, the form MUST be replaced in place by the personalised
  confirmation message (User Story 2), and focus MUST move to it. On failure, the visitor's
  input MUST be kept, and a message in their language MUST offer the booking link and
  WhatsApp.
- **FR-031**: When scripts are disabled, the form MUST still submit, and the visitor MUST land
  on a confirmation page in their language.
- **FR-032**: The form MUST collect no personal data beyond the five fields. The privacy notice
  MUST be linked next to the submit control.

#### E. Reusable Components

Each component MUST support every applicable state (default, hover, focus-visible, active,
disabled, loading, error and success) identically in both languages.

- **FR-033**: **PrimaryCTA** takes a label and a source section. It renders the primary CTA
  style and links to the lead form.
- **FR-034**: **SecondaryCTA** takes a label and a destination. It renders the less prominent
  style and opens the booking address in a new tab. A "prominent" variant renders the pricing
  "BOOK A SESSION" button in the primary style while keeping the booking destination.
- **FR-035**: **LeadForm** covers the fields, validation, sending, success, error and no-script
  behaviour described in FR-026 to FR-032.
- **FR-036**: **SectionLabel** shows the section's number and name (for example "01 — Hero")
  above each section's main heading. It is shown in every section except 12 Footer. It MUST
  not create an extra heading level. Its numbers use the page language's numeral setting.
- **FR-037**: **LanguageSwitcher** appears in the header and footer. It links to the same
  section in the other language, saves the visitor's choice without tracking, and announces
  the target language in that language.

#### F. Page Structure (12 Sections)

- **FR-038**: Each language page MUST render its sections in the order set by the
  2026-09-29 clarification (which removed 02 The Problem and 06 What You Can Achieve below
  and added Client Transformations); the requirements below apply to each remaining section. Each
  section MUST be a distinct, labelled region with a stable anchor id that is the same in
  both languages. There MUST be exactly one top-level heading per page, in Hero.
  1. **01 Hero**
     - Contents: the headline, a short value proposition, the coach's photo and the dual
       CTAs.
     - Layout: follows the photography rule. It is the first thing shown and must load fast.
     - No unrealistic promises.
  2. **02 The Problem**
     - Contents: situations the visitor will recognise (no time, starting and stopping,
       conflicting advice, repeated diets), then the reframe: the problem is the lack of a
       sustainable strategy, not a lack of effort.
     - No fear or shaming language.
  3. **03 My Story**
     - Contents: who Mostafa is, why he started The Fitness Formula, and why he understands
       these problems.
     - Layout: follows the photography rule.
     - Credentials are shown only if the client supplies them.
  4. **04 Coaching Approach**
     - Contents: Assess, Design, Execute, Optimize, each with a one or two sentence
       explanation, and the message that the plan changes with the client.
     - Layout: a numbered sequence, not a card grid.
  5. **05 How Coaching Works**
     - Contents: the 4-step Client Journey from `journey.json`, then the dual CTAs directly
       after it.
     - Layout: follows the photography rule.
     - It MUST NOT describe services the offer does not include (PRD DR-10).
  6. **06 What You Can Achieve**
     - Contents: fat loss, muscle and strength, body composition, energy, habits, sleep and
       lifestyle, and a sustainable routine.
     - Each is written as something coaching supports, never as a guarantee. No medical or
       numeric claims.
  7. **07 Results & Testimonials**
     - Contents: data-driven from `testimonials.json`, with the empty-state behaviour in User
       Story 7.
  8. **08 Coaching Offer**
     - Contents: what the session is and what the client leaves with, then the options from
       `pricing.json` (User Story 4), terms, guarantee, the prominent "BOOK A SESSION"
       button, then the dual CTAs.
  9. **09 Who This Is NOT For**
     - Contents: the honest list of who this does not suit (unwilling to commit, looking for
       a quick fix, wanting results without effort, wanting only a harsh diet or rapid
       transformation). It ends with a positive line about who it suits.
  10. **10 FAQ**
      - Contents: an accessible accordion built from `faqs.json` (User Story 6).
  11. **11 Final CTA**
      - Contents: one closing decision, a brief reassurance line, the dual CTAs and the lead
        form. Nothing else competes for attention.
  12. **12 Footer**
      - Contents: the wordmark, contact details (WhatsApp), social links, the booking link,
        links to the Privacy Policy, Terms & Conditions and health disclaimer, the language
        switcher and copyright.
- **FR-039**: A compact header MUST show:
  - the wordmark;
  - anchor links to Approach, How it works, Results, Offer and FAQ;
  - the language switcher;
  - the primary CTA.

  Below 1200 px the header MUST be at most 64 px tall, and it MUST behave as follows:
  - It is visible at the top of the page.
  - It slides out of view while the visitor scrolls down.
  - It reappears on any scroll up.
  - It also reappears whenever an element inside it receives keyboard focus.
  - When reduced motion is preferred, it appears and hides instantly.
  - It MUST never cover a focused element or the start of a section reached by an in-page
    link; anchor targets are offset by the header height.
  - With scripts disabled, it simply scrolls away with the page.

  From 1200 px it scrolls with the page.
- **FR-040**: A skip link to the main content MUST be the first focusable element.

#### G. Bilingual, Accessibility and Performance Guardrails

- **FR-041**: Each language MUST have its own address, correct page language and direction,
  and cross-links between the two versions for search engines.
- **FR-042**: Icons that point in a direction (arrows, chevrons, step connectors) MUST mirror
  on the Arabic page.
- **FR-043**: The page MUST meet WCAG 2.2 AA in both languages:
  - touch targets of at least 44 × 44 px for CTAs and form controls;
  - a visible 2 px focus indicator;
  - logical focus order;
  - no information conveyed by motion or colour alone.
- **FR-044**: When reduced motion is preferred, reveal animations MUST become instant, or an
  opacity fade of at most 150 ms, with no movement.
- **FR-045**: The page MUST be readable, and every CTA and the lead form MUST work, before
  non-essential scripts load.
- **FR-046**: Third-party services MUST NOT delay the page from appearing or becoming
  readable. This covers the form service, the booking page and any analytics.

#### H. Out of Scope for Phase 1

- **FR-047**: The following are excluded from this specification:
  - the scroll-driven image sequence animation (constitution Principle IV, "MAY");
  - analytics and the consent banner (spec 001 User Story 7);
  - the legal page content itself;
  - any CMS.

  The page structure MUST NOT block adding any of these later.

### Key Entities

- **Journey Step**: one of the four coaching-process stages. It has a stable id, a display
  number (01 to 04), a title and description in both languages, and an order. It is rendered
  in 05 How Coaching Works.
- **Pricing Option**: a purchasable coaching format. It has an id, a name in both languages, a
  duration (minutes and session count), a numeric price, a currency, an optional saving note,
  a highlight flag and an order. It belongs to one Pricing Offer.
- **Pricing Offer**: the set of pricing options plus the shared terms, guarantee and "BOOK A
  SESSION" action. It is rendered in 08 Coaching Offer.
- **FAQ Item**: a question and answer in both languages, with an order and a published flag.
- **Testimonial**: a consented piece of client proof. At launch these are 8 Arabic WhatsApp
  screenshots, shown on both pages with an English translation on the English page. Each has
  a type, display name, consent record, available languages, and either a quote or story, or
  images. Every image has alt text, a transcription, and translations for other page
  languages. It also has an optional result summary, date, featured flag and order.
- **Lead Submission**: what a visitor sends through the lead form. It holds the name, WhatsApp
  number, goal, struggle, preferred contact time, page language, source section and time
  sent. It exists only in the email sent to the site manager and is never stored by the
  site.
- **CTA Configuration**: the primary and secondary labels in both languages, the booking
  address and the lead-form target, defined once for the whole site.
- **Section**: one of the 12 page sections. It has a fixed number, a stable anchor id, a
  heading in both languages, and a flag saying whether it contains photography (which
  applies the photography layout rule).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On both language pages, all 12 sections appear in the specified order, with no
  overlap, clipping or horizontal scrolling, at 320, 390, 768, 1200 and 1440 px widths.
- **SC-002**: A first-time visitor on a mid-range phone over 4G can move from the Hero's
  primary CTA to a submitted lead form in under 90 seconds.
- **SC-003**: 100% of valid test submissions (at least 20 per language) reach the site
  manager's inbox within 2 minutes, with all five values intact. 0% of invalid submissions
  are sent.
- **SC-004**: On a mid-range phone over 4G, the main content appears within 2.5 seconds,
  interactions respond within 200 ms, and layout shift stays at or below 0.1, on both
  language pages.
- **SC-005**: Automated accessibility checks find zero critical or serious issues on both
  language pages at mobile, tablet and desktop widths. A keyboard-only tester can complete
  the lead form, FAQ and language switch without help.
- **SC-006**: Every text and colour pairing on the page meets at least 4.5:1 contrast (3:1
  for large text and interface parts). This includes text over photography.
- **SC-007**: A non-developer can add an FAQ item, a testimonial, or change a price, and see
  it live after a rebuild, by editing one content file only, in under 10 minutes by
  following the documented steps.
- **SC-008**: Switching language returns the visitor to the same section in 95% or more of
  switches, in under 2 seconds.
- **SC-009**: With scripts disabled, every CTA, the lead form submission and all FAQ answers
  still work or are visible on both language pages.
- **SC-010**: In a side-by-side review, the Arabic and English pages show the same sections,
  components and states. The only differences are language, direction and mirroring.

## Assumptions

- **Constitution precedence**: where the PRD and constitution v2.3.0 disagree, the
  constitution wins. In particular, the PRD's "no refund" position (DR-04) is replaced by the
  constitution's "100% Money-Back Guarantee". The PRD's intro-call and first-session CTA
  labels are replaced by the constitution's dual-path labels. The client's legal review of
  the guarantee wording is still recommended before launch.
- **Darker accent token**: #5C6B17 is registered as `accent-dark` in constitution v2.3.0,
  measured at 5.3:1 on Paper and 5.88:1 on White.
- **Lead form location**: one form in 11 Final CTA, with every primary CTA linking to it, was
  chosen as the default. It satisfies the constitution's "inline on-page or in a designated
  section" rule, works without scripts, and avoids pop-up accessibility problems.
- **Form service**: a managed service such as Formspree, Web3Forms or Netlify Forms. It must
  email submissions, support a no-script redirect, and filter spam without a visible
  challenge. The exact provider is chosen during planning.
- **WhatsApp validation**: Egyptian mobile numbers (010, 011, 012, 015 prefixes) are accepted
  with or without +20. Other countries are accepted in international format (8 to 15
  digits).
- **Contact-time choices**: the fixed list is Morning (9–12), Afternoon (12–5), Evening (5–9)
  and "Anytime", in Cairo time, with labels in copy content.
- **Existing data**: `src/data/journey.json` and `src/data/pricing.json` already match this
  specification's content and are kept. `faqs.json` and `testimonials.json` are new.
- **Copy and photography**: final Egyptian Arabic and English copy and the coach's photography
  come from the client and a copywriter. Until approved, clearly marked placeholders are used
  only in non-production builds. Invented testimonials, credentials or statistics are never
  used.
- **Booking**: the booking address is an external scheduling page such as Calendly. Its
  availability, payment handling and accessibility are outside the site's control.
- **Default language**: English is the fixed default for first visits (Clarifications
  2026-09-28). This also makes English the default version for search engines.
- **Numerals**: Western digits are used on both language pages (Clarifications 2026-09-28).
  The existing `pricing.json` Arabic labels that use Eastern digits (for example "٤٥ دقيقة"
  and "وفّر ٨٠٠ جنيه") must be converted.
- **Brand assets**: the logo is `public/logo.png`, the coach's portrait on a neon-green brush
  circle, 1254 × 1254 px.
  - It MUST be shown in grayscale in the header and footer, so it does not clash with the
    olive accent. A pre-made grayscale file is preferred over a browser filter, to save
    processing.
  - It must be resized and compressed for its display size.
  - It needs alt text in each language.
- **Testimonial content**: consent is confirmed for all 8 screenshots (1.jpg to 8.jpg). The
  English translations must be written by a person (no machine translation) and approved by
  the client.
- **Browsers**: current and previous major versions of Chrome, Safari, Firefox and Edge, plus
  iOS Safari and Android Chrome.

### Dependencies

- Constitution v2.3.0, which covers the `accent-dark` token, the mobile photo-fade exception
  and the alternating section grounds. It is in place.
- The client supplies: approved copy in both languages, photography with mobile and desktop
  crops, the booking address, the WhatsApp number, social links, testimonials with consent,
  and legal text.
