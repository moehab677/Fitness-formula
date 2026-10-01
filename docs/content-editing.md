# Content Editing

All launch content lives in `src/data/` and `src/data/copy/`. Keep copy as plain text; the
content validator rejects markup and Eastern or Persian numerals.

## Add an FAQ

Add a unique kebab-case item to `src/data/faqs.json` with English and Arabic question and
answer text, a unique positive `order`, and `published: true`. Questions must end with `?` or
`؟`. Mark any answer awaiting a client decision with its `needsConfirmation` id and leave it
unpublished until confirmed.

## Add a testimonial

Obtain recorded consent before publishing. Add the source image under
`design/stitch/testimonials/`, add an image job to `assets.config.json`, then add the item to
`src/data/testimonials.json` with consent, alt text, exact transcription, and a human-written
translation for each language in which it will appear. Do not infer or invent a client's
words. Item 5's compliance crop must remain in the image pipeline.

## Change a price

Edit the matching tier in `src/data/pricing.json`. Keep currency EGP and duration at 45
minutes. Update the bundle note to equal the single-session price times the bundle count minus
the bundle price.

## Reorder sections

Reorder the entries in `src/sections/registry.json` and `src/sections/registry.ts` together.
Keep the section ids stable so anchors and language switching continue to work.

Run `npm run build` after edits. Validation errors identify the file, entry or key, and rule
that failed.
