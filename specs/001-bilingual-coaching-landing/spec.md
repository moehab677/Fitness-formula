# Feature Specification: Bilingual Coaching Landing Page

**Feature Branch**: `001-bilingual-coaching-landing`

**Created**: 2026-09-23

**Status**: Draft

**Input**: User description: "Build a static-first, mobile-optimized coaching landing page with strict bilingual routing (English LTR / Egyptian Arabic RTL). Scaffold independent routes, local JSON/Markdown content schemas, 12-section vertical flow, scroll-triggered image sequence animation, and enforce WCAG 2.2 AA, prefers-reduced-motion, and mobile Core Web Vitals."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Landing Page in Preferred Language (Priority: P1)

A visitor arrives at the site (via social media, referral, or search) and experiences the complete coaching narrative in their preferred language — Egyptian Arabic (RTL) or English (LTR) — with every section, CTA, and piece of content fully rendered in that language and direction.

**Why this priority**: The entire site exists to convert visitors into coaching clients. If the page does not render correctly and completely in the visitor's language, no downstream conversion is possible. This is the foundational experience upon which every other story depends.

**Independent Test**: Navigate to `/en` and `/ar` independently. Verify all 12 sections render with correct content, correct text direction, correct `lang`/`dir` attributes, and no layout breakage at mobile, tablet, and desktop widths.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to `/en`, **When** the page loads, **Then** all 12 sections render in English with `dir="ltr"`, the `<html>` element has `lang="en"`, and all text, CTAs, and navigation are in English.
2. **Given** a visitor navigates to `/ar`, **When** the page loads, **Then** all 12 sections render in Egyptian Arabic with `dir="rtl"`, the `<html>` element has `lang="ar"`, and all text, CTAs, and navigation are in Arabic.
3. **Given** either language variant, **When** the visitor scrolls through all sections, **Then** the vertical flow follows the exact order: Hero → The Problem → About Me → Coaching Approach → How Coaching Works → What You Can Achieve → Results & Testimonials → Coaching Offer → Who This Is NOT For → FAQ → Final CTA → Footer.
4. **Given** a visitor on a mobile device (viewport ≤ 480 px), **When** they view any section, **Then** the layout is purpose-designed for mobile (single-column storytelling, thumb-reachable CTAs, tuned type scale) — not a scaled desktop view.

---

### User Story 2 - Switch Language Without Losing Position (Priority: P1)

A visitor who is browsing in one language wants to switch to the other language and continue reading from approximately the same place on the page.

**Why this priority**: Bilingual visitors (common in the Egyptian audience) may switch languages to compare phrasing, share a link in the other language, or simply prefer the other version. A language switch that resets to the top of the page is a significant UX failure for a long-form landing page.

**Independent Test**: Scroll to the FAQ section on `/en`, click the language switcher, and verify the page loads `/ar` scrolled to or near the FAQ section.

**Acceptance Scenarios**:

1. **Given** a visitor is viewing the Coaching Offer section on `/en`, **When** they activate the language switcher, **Then** the page navigates to `/ar` and scrolls to or near the Coaching Offer section.
2. **Given** the language switcher, **When** a keyboard-only user focuses it and presses Enter/Space, **Then** it toggles the language identically to pointer interaction.
3. **Given** any language switch, **When** the new page loads, **Then** the visitor's language preference persists for subsequent visits (via a non-tracking storage mechanism such as `localStorage`).

---

### User Story 3 - Engage with CTAs to Book (Priority: P1)

A visitor who has been persuaded by the narrative wants to take action — either booking a free 15-minute intro call (primary CTA) or booking a first coaching session (secondary CTA).

**Why this priority**: Conversion is the site's reason for existing. CTAs that are broken, hidden, or unreachable directly prevent revenue.

**Independent Test**: Click the primary and secondary CTA from the Hero, Coaching Offer, and Final CTA sections in both languages. Verify each navigates to the correct booking destination.

**Acceptance Scenarios**:

1. **Given** a visitor on any section containing CTAs (Hero, Coaching Offer, Final CTA), **When** they click the primary CTA ("Book a Free 15-Minute Intro Call" / Arabic equivalent), **Then** they are directed to the booking destination for the free intro call.
2. **Given** the same sections, **When** they click the secondary CTA ("Book Your First Coaching Session" / Arabic equivalent), **Then** they are directed to the booking destination for the paid session.
3. **Given** either CTA, **When** the page is rendered without JavaScript (or before JS loads), **Then** the CTAs remain visible and functional as standard links.
4. **Given** the sticky header on mobile, **When** the visitor scrolls, **Then** the persistent CTA remains reachable without obscuring content or reducing accessibility.

---

### User Story 4 - Read FAQ via Accessible Accordion (Priority: P2)

A visitor with remaining questions wants to browse the FAQ section. The accordion must be fully accessible (keyboard-operable, screen-reader-friendly) and work correctly in both RTL and LTR.

**Why this priority**: FAQs address final objections before conversion. An inaccessible or broken accordion blocks a significant percentage of visitors from getting the information they need to decide.

**Independent Test**: Navigate to the FAQ section in both `/en` and `/ar`. Open and close each accordion item via keyboard and pointer. Verify correct ARIA attributes, focus management, and animation behavior.

**Acceptance Scenarios**:

1. **Given** the FAQ section with multiple items, **When** a visitor clicks an item, **Then** the answer expands smoothly. **When** they click again, **Then** it collapses.
2. **Given** keyboard navigation, **When** a user presses Tab to focus an FAQ item and presses Enter or Space, **Then** the item toggles open/closed and focus remains on the trigger.
3. **Given** `prefers-reduced-motion: reduce` is enabled, **When** an FAQ item is toggled, **Then** the expand/collapse occurs instantly (no slide animation) or with a single opacity fade ≤ 150 ms.
4. **Given** the Arabic variant, **When** the accordion chevron/icon is rendered, **Then** it mirrors correctly for RTL (pointing left when collapsed if the LTR version points right).

---

### User Story 5 - Experience Scroll-Triggered Image Sequence Animation (Priority: P2)

As a visitor scrolls through the narrative, a custom scroll-triggered image sequence animation plays — creating a video-like effect using initial and final frames synced to scroll position — that enhances the storytelling without distracting from the content.

**Why this priority**: The scroll-driven image sequence is a signature interaction that differentiates The Fitness Formula from generic fitness templates. However, it is an enhancement — the content must remain fully accessible and perceivable without it.

**Independent Test**: Scroll through the section containing the image sequence on both `/en` and `/ar`. Verify the animation plays smoothly, syncs to scroll position, mirrors correctly for RTL, and degrades gracefully when reduced motion is preferred.

**Acceptance Scenarios**:

1. **Given** a visitor scrolling through the section containing the image sequence, **When** the section enters the viewport, **Then** the image sequence begins playing from the initial frame, advancing through frames proportionally to scroll progress, and reaching the final frame when the section exits the viewport.
2. **Given** the RTL variant, **When** the image sequence plays, **Then** any directional elements within the sequence (composition, overlaid text direction) are appropriate for RTL viewing.
3. **Given** `prefers-reduced-motion: reduce`, **When** the section enters the viewport, **Then** the image sequence is replaced with a single representative static image — no frame-by-frame animation occurs.
4. **Given** a slow network or mid-tier device, **When** the image sequence section is reached, **Then** all frames needed for the visible scroll range have loaded (via progressive/lazy loading of frames ahead of scroll position), and no blank or flickering frames appear.

---

### User Story 6 - Browse Real Testimonials and Results (Priority: P2)

A visitor wants to see real client testimonials and coaching results to build trust before booking. The testimonials render dynamically from structured data and display correctly in both languages.

**Why this priority**: Social proof is critical to conversion for a personal-brand coaching site. The testimonial system must also be extensible so the client can add new proof over time without a developer.

**Independent Test**: Add a new testimonial entry to the local JSON data file, rebuild the site, and verify it appears correctly in the Results & Testimonials section in the correct language(s).

**Acceptance Scenarios**:

1. **Given** testimonial data entries exist in the content store, **When** the Results & Testimonials section renders, **Then** each testimonial displays the `displayName`, `quote`, and optional `resultSummary` and images, respecting the `order` field.
2. **Given** a testimonial with `language: "ar"`, **When** viewing the `/ar` page, **Then** the testimonial appears. **When** viewing `/en`, **Then** it does not appear (unless it also has English content).
3. **Given** zero testimonials exist at launch, **When** the section renders, **Then** an approved fallback state is shown, or the section is omitted entirely — no empty or broken UI appears.
4. **Given** a new testimonial entry is added to the data file with all required fields, **When** the site is rebuilt, **Then** the testimonial appears in the correct position without any component or layout code changes.

---

### User Story 7 - Consent-Aware Analytics Tracking (Priority: P3)

The site tracks visitor behavior (CTA clicks, language switches, form interactions) via GA4 and Meta Pixel, but only after the visitor explicitly grants consent through the consent mechanism.

**Why this priority**: Analytics are essential for measuring conversion effectiveness, but consent compliance is legally required and ethically non-negotiable. Incorrect implementation creates legal liability.

**Independent Test**: Load the page with consent denied, verify zero tracking requests are made. Grant consent, click a CTA, and verify the correct event fires with the correct parameters.

**Acceptance Scenarios**:

1. **Given** a first-time visitor, **When** the page loads and no consent has been granted, **Then** no GA4 or Meta Pixel scripts load and no tracking data is transmitted.
2. **Given** the consent mechanism, **When** the visitor grants consent, **Then** GA4 and Meta Pixel scripts load and subsequent interactions fire the approved events (`cta_click`, `intro_call_click`, `coaching_session_click`, `language_switch`, etc.) with correct parameters including language tag.
3. **Given** the visitor denies or revokes consent, **When** they continue browsing, **Then** all tracking scripts are unloaded or disabled and no further data is transmitted.

---

### Edge Cases

- What happens when a visitor navigates to the root URL `/` without a language prefix? The site redirects to the default language route (governed by DR-01) without a flash of unstyled or wrong-language content.
- What happens when a testimonial entry has malformed or missing required fields (`id`, `displayName`, `consent`, `quote`)? The entry is skipped during rendering and a build-time warning is logged — no runtime crash or blank card.
- What happens when the image sequence frames fail to load (network error, corrupted file)? The section degrades gracefully to a static fallback image; no blank area or JavaScript error is shown to the visitor.
- What happens when a visitor has JavaScript disabled? All CTAs remain functional as standard links. The FAQ accordion renders with all answers visible (no collapsed state). The image sequence section shows the static fallback. The page content and navigation are fully readable.
- What happens when a booking embed or third-party service is unavailable? A fallback link to the booking provider's standalone page is displayed. No broken iframe or empty embed wrapper is shown.
- What happens when both Arabic and Latin text appear in the same sentence (e.g., brand name "The Fitness Formula" within Arabic prose)? The `<span lang="en" dir="ltr">` wrapper ensures correct bidirectional rendering without breaking the surrounding Arabic text flow.

## Requirements *(mandatory)*

### Functional Requirements

**Routing & Language**

- **FR-001**: The site MUST serve two independent, pre-rendered routes: `/en` (English, LTR) and `/ar` (Egyptian Arabic, RTL), each as a complete landing page.
- **FR-002**: Each route MUST set `lang` and `dir` attributes on the `<html>` element (`lang="en" dir="ltr"` or `lang="ar" dir="rtl"`).
- **FR-003**: Each route MUST include `<link rel="alternate" hreflang="...">` tags pointing to the other language variant, plus a self-referencing canonical URL.
- **FR-004**: A persistent, accessible language switcher MUST appear in the header and footer. It MUST preserve the visitor's approximate scroll position (section-level anchor) when switching. It MUST be keyboard-operable (focusable, activated via Enter/Space).
- **FR-005**: The visitor's language preference MUST persist across visits via a non-tracking mechanism (e.g., `localStorage`). First-visit detection behavior is governed by DR-01.

**Page Structure (12 Sections)**

- **FR-006**: Each language route MUST render exactly 12 sections in this vertical order:
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
- **FR-007**: Each section MUST use a semantic HTML landmark (`<header>`, `<main>`, `<section>`, `<footer>`) with a unique `id` for anchor navigation.
- **FR-008**: A minimal in-page anchor navigation MUST appear in the header, linking to key sections (Approach, How it works, Results, Offer, FAQ).

**CTAs & Conversion**

- **FR-009**: The site MUST display two CTA types: a primary CTA ("Book a Free 15-Minute Intro Call") and a secondary CTA ("Book Your First Coaching Session"), each with localized labels in both languages.
- **FR-010**: CTAs MUST appear in the Hero (both), Coaching Offer (both), and Final CTA (both) sections. The primary CTA MUST be visually prominent; the secondary CTA visually subordinate.
- **FR-011**: A persistent CTA MUST appear in the sticky header on mobile. It MUST NOT obscure page content or reduce accessibility.
- **FR-012**: CTAs MUST be functional as standard `<a>` links before and without JavaScript.
- **FR-013**: CTA destinations MUST support third-party booking embeds or link-outs. A placeholder integration point MUST exist so the booking provider can be configured without code changes.

**FAQ Accordion**

- **FR-014**: The FAQ section MUST render an accordion from structured FAQ data. Each item shows a question; clicking/activating it reveals the answer.
- **FR-015**: The accordion MUST use correct ARIA attributes (`role`, `aria-expanded`, `aria-controls`, `aria-labelledby`) and manage focus correctly.
- **FR-016**: The accordion MUST work without JavaScript (all answers visible in a non-collapsed state as a graceful degradation).
- **FR-017**: Accordion expand/collapse animation MUST respect `prefers-reduced-motion` (instant or ≤ 150 ms opacity fade when reduced motion is preferred).

**Scroll-Triggered Image Sequence Animation**

- **FR-018**: The site MUST include a scroll-triggered image sequence animation that plays a series of image frames (from an initial frame to a final frame) in sync with the visitor's scroll position through a designated section, creating a video-like scroll effect.
- **FR-019**: Frame progression MUST be proportional to scroll progress through the section — the initial frame appears when the section enters the viewport, and the final frame appears when the section exits.
- **FR-020**: Frames MUST be progressively loaded (preloading frames ahead of the current scroll position) to prevent blank or flickering frames on mid-tier devices and variable connections.
- **FR-021**: When `prefers-reduced-motion: reduce` is enabled, the entire image sequence animation MUST be replaced with a single static representative image — no frame-by-frame animation.
- **FR-022**: In RTL mode, any directional visual elements within or overlaying the image sequence MUST mirror correctly.
- **FR-023**: If frames fail to load, the section MUST degrade to a static fallback image with no JavaScript errors visible to the visitor.

**Content Data Schemas**

- **FR-024**: Testimonial content MUST be stored in local structured data (JSON or Markdown with frontmatter) conforming to this schema per item:
  - `id` (unique identifier)
  - `type` (testimonial | progress-story | result)
  - `displayName` (full name, first name, or initials per consent)
  - `consent` (recorded permission and coverage)
  - `language` (ar | en | both)
  - `quote` or `story` (real client words)
  - `resultSummary` (optional, factual only)
  - `images` (optional, with alt text)
  - `date` (optional)
  - `order` (display sequence)
- **FR-025**: FAQ content MUST be stored in local structured data (JSON or Markdown with frontmatter) conforming to this schema per item:
  - `id` (unique identifier)
  - `question` (per language: `question.en`, `question.ar`)
  - `answer` (per language: `answer.en`, `answer.ar`)
  - `order` (display sequence)
  - `published` (boolean, controls visibility)
- **FR-026**: Adding, editing, reordering, or hiding testimonials and FAQs MUST require only data file changes and a site rebuild — no component or layout code changes.

**Accessibility**

- **FR-027**: The site MUST meet WCAG 2.2 AA standards: semantic HTML landmarks, a single logical heading hierarchy per page, full keyboard operability, visible focus indicators, logical focus order, and a skip-to-main-content link.
- **FR-028**: Color contrast MUST meet AA minimums for text and UI components in both languages.
- **FR-029**: All informative images MUST have meaningful alt text; decorative images MUST be hidden from assistive technology.
- **FR-030**: Touch targets MUST meet WCAG 2.2 target-size guidance (minimum 24×24 CSS pixels, recommended 44×44).
- **FR-031**: Mixed-language inline content (e.g., "The Fitness Formula" brand name within Arabic text) MUST use `<span lang="en" dir="ltr">` for correct bidirectional rendering and screen-reader pronunciation.

**Performance**

- **FR-032**: Mobile Core Web Vitals (p75) MUST meet: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 on both language routes.
- **FR-033**: Hero images MUST be preloaded with `fetchpriority="high"`. Below-fold images MUST use `loading="lazy"`.
- **FR-034**: Responsive image sets MUST provide multiple widths (minimum: 640 px, 960 px, 1280 px, 1920 px) in modern formats (WebP + AVIF with JPEG fallback) with explicit `width`/`height` attributes or CSS `aspect-ratio`.
- **FR-035**: Font loading MUST subset Arabic fonts to used Unicode ranges, limit to a maximum of two weights per script, and stay within budget (Arabic ≤ 80 KB compressed, Latin ≤ 50 KB compressed). `font-display: swap` MUST be used. Only the critical weight for above-the-fold text is preloaded.
- **FR-036**: The page MUST be fully readable and all CTAs functional before non-critical JavaScript loads. Total blocking JavaScript MUST stay under 50 KB compressed.

**Analytics & Consent**

- **FR-037**: GA4 and Meta Pixel MUST be integrated behind a consent mechanism. No tracking scripts load or fire events before consent is granted.
- **FR-038**: After consent, the following events MUST fire with correct parameters (CTA type, section/placement, language): `cta_click`, `intro_call_click`, `coaching_session_click`, `contact_form_started`, `contact_form_submitted`, and optionally `language_switch`.
- **FR-039**: After consent is denied or revoked, all tracking MUST cease and no data MUST be transmitted.

### Key Entities

- **Testimonial**: Represents a client endorsement or progress story. Key attributes: unique ID, type classification, display name (consent-governed), language availability, quote/story text, optional result summary, optional images with alt text, display order. A testimonial belongs to one or both languages and is rendered only on the language routes where it has content.
- **FAQ Item**: Represents a single question-and-answer pair. Key attributes: unique ID, bilingual question text, bilingual answer text, display order, published flag. An FAQ item appears in both language routes if it has content for both; otherwise only in the route where content exists.
- **CTA Configuration**: Represents a call-to-action button's properties. Key attributes: label (per language), destination URL, type (primary/secondary), placement sections. CTA destinations are configurable without code changes to support booking provider swaps.
- **Image Sequence**: Represents the scroll-triggered animation asset set. Key attributes: ordered list of frame image paths, fallback static image, section anchor ID, frame count, directional mirroring flag for RTL.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Both language routes (`/en` and `/ar`) render all 12 sections in the correct order with zero layout breakage at mobile (≤ 480 px), tablet (481–1024 px), and desktop (≥ 1025 px) viewports — verified by automated visual regression tests passing on every build.
- **SC-002**: A visitor can switch languages via the language switcher and land within the same section (±1 section tolerance) in under 2 seconds on a 4G connection.
- **SC-003**: Mobile Core Web Vitals (p75) meet LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 on both language routes — verified by Lighthouse CI in the build pipeline.
- **SC-004**: Automated accessibility audits (axe-core) report zero critical or serious violations on both language routes at all three breakpoints.
- **SC-005**: A non-developer can add a new testimonial by creating a single data file entry, rebuilding the site, and seeing the testimonial appear in the correct position — with no component code changes. The same applies to FAQ items.
- **SC-006**: When `prefers-reduced-motion: reduce` is enabled, zero scroll-triggered animations, zero parallax effects, and zero frame-by-frame image sequences play — verified by automated tests that enable the media query and assert no animation properties are active.
- **SC-007**: With consent denied, zero network requests to Google Analytics or Meta Pixel domains are made during a full page browse — verified by integration tests intercepting network traffic.
- **SC-008**: The FAQ accordion is fully operable via keyboard alone (Tab, Enter, Space, arrow keys where applicable) in both language variants — verified by automated interaction tests.
- **SC-009**: The scroll-triggered image sequence plays smoothly (no visible blank frames or flicker) on a mid-tier mobile device (e.g., equivalent to a \$200 Android phone on a 4G connection) — verified by manual testing on a real or emulated device.
- **SC-010**: Arabic and Latin typography render with visually matched weight and density — verified by side-by-side comparison during design review (not automated, as typographic judgment is subjective).

## Assumptions

- **Static-first delivery**: The site is pre-rendered at build time and served from a CDN. There is no server-side runtime, custom API, or database. This assumption aligns with PRD §17.2.
- **Mobile-first audience**: The primary audience browses on mobile devices. Design and performance budgets prioritize mobile viewports. Desktop is intentionally designed but secondary.
- **No user accounts**: There is no authentication, login, dashboard, or client portal. The site is a public marketing and conversion experience.
- **Booking handled externally**: All booking and payment flows are handled by a third-party service (e.g., Calendly). The site integrates via link or lazy-loaded embed, not a custom booking system.
- **Content authored by humans**: All Arabic copy is written natively in Egyptian Arabic by a human copywriter. All English copy is written by a human. No machine translation is used for user-facing text.
- **Photography provided by client**: Professional photography of Mostafa is supplied by the client. No generic stock imagery is used as a primary visual element.
- **Consent mechanism required**: A cookie/consent banner or mechanism is required. The specific legal basis and behavior are governed by DR-15, but the architecture must support consent-gating all analytics from day one.
- **Font choices not yet finalized**: Specific Arabic and Latin typefaces are selected during the Design System stage. The spec constrains the budgets and subsetting requirements, not the specific font families.
- **Image sequence frames provided at build time**: The scroll-triggered image sequence frames are static assets included in the build, not fetched from an external API at runtime.
- **Browser support**: Current and previous major versions of Chrome, Safari, Firefox, Edge, plus iOS Safari and Android Chrome. Exact matrix confirmed in the technical specification stage.
