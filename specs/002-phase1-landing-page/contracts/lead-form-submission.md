# Contract: LeadForm → Web3Forms

**Provider**: Web3Forms. See [research.md](../research.md) R3.
**Endpoint**: `POST https://api.web3forms.com/submit`

The same `<form>` works in two modes:

- **Mode A**: no scripts. A native HTML form post, followed by a redirect.
- **Mode B**: with scripts. `fetch` with a JSON response.

## Fields sent

| Name | Mode | Value | Visible |
|---|---|---|---|
| `access_key` | A + B | `VITE_WEB3FORMS_KEY` | hidden |
| `subject` | A + B | `New lead ({lang}) — The Fitness Formula` | hidden |
| `from_name` | A + B | `The Fitness Formula website` | hidden |
| `redirect` | A only | `{siteUrl}/{lang}/thanks/?name={encoded name}` (see note) | hidden |
| `botcheck` | A + B | Must be empty. A visually hidden checkbox, excluded from the accessibility tree and from tab order | hidden |
| `name` | A + B | 1 to 80 characters | yes |
| `whatsapp` | A + B | Mode B: normalised E.164. Mode A: raw input, with the pattern checked by the browser | yes |
| `goal` | A + B | 1 to 500 characters | yes |
| `struggle` | A + B | 1 to 500 characters | yes |
| `contact_time` | A + B | `morning` \| `afternoon` \| `evening` \| `anytime` | yes (select) |
| `lang` | A + B | `en` \| `ar` | hidden |
| `source` | A + B | Section id of the triggering CTA (`hero`, `process`, `offer`, `final-cta`, `direct`) | hidden |

**Note on `redirect` in Mode A**: a static field can't include the visitor's name. So
`/{lang}/thanks/` shows a generic confirmation, "Thanks. I'll reach out…". If
`?name=` is present, it adds the name as plain text through `textContent`. The name is only
there if an optional progressive script has set it.

Only these 5 personal fields are collected (spec FR-032).

## Mode A: without scripts

1. The browser checks `required`, `maxlength`, and the pattern `^\+?[0-9 ]{8,20}$` on
   `whatsapp`, then posts `application/x-www-form-urlencoded`.
2. Web3Forms emails the site manager and replies with a 302 to `redirect`.
3. `/{lang}/thanks/` renders the `thanks` copy in the page language, with links back to the
   page and to the booking page.

## Mode B: with scripts

**Request**: `fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(fields) })`. The body omits `redirect`.

| Response | UI state | Behaviour |
|---|---|---|
| 200, `{ "success": true }` | `success` | The form is replaced in place by `copy.form.success` with `{name}` filled in, then focus moves to that message, which has `tabindex="-1"` and `role="status"` |
| 200/4xx, `{ "success": false, "message" }` | `error` | Input is kept. `copy.form.errorGeneric` is shown with the booking and WhatsApp links. The provider's message is logged to the console only and never shown |
| Network failure or 10 s timeout | `error` | `copy.form.errorOffline` is shown, with the same fallbacks |
| Second submit while `submitting` | — | Ignored. The button has `aria-disabled="true"` |

**Client-side validation**, before any request is sent:

- Validation runs on submit, and again on blur once a field has been touched.
- Each error is linked to its field through `aria-describedby` and `aria-invalid="true"`.
- Focus moves to the first invalid field.
- The messages come from `copy.form.errors.*` in the page language.

## Tests that bind this contract

- **Unit**: WhatsApp normalisation.
  - `01012345678` → `+201012345678`
  - `+44 7700 900123` → `+447700900123`
  - `123` is rejected.
- **Unit**: the success message renders the name as text. For example `<b>x</b>` appears as
  literal characters.
- **E2E (Playwright, route mocked)**:
  - success, provider failure, offline, and double submit;
  - no request is sent while any field is invalid;
  - the payload contains exactly the keys listed in the table above, with `redirect` absent.
- **E2E, no scripts** (`javaScriptEnabled: false`, route mocked with a 302 to `/en/thanks/`):
  the confirmation page renders in the right language.
- **Manual (quickstart V6)**: one real submission per language reaches the inbox, and the
  redirect works on the free plan.
