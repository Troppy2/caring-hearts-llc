# Caring Heart Assisted Living — Website

Single-page brochure site. **React 18 + TypeScript + Vite**, plain CSS with design
tokens (no Tailwind, no UI framework) so the accessibility minimums are easy to audit.

## Develop

```bash
npm install       # install dependencies (React, React-DOM, Vite, TypeScript)
npm run dev       # start the dev server
npm run build     # type-check (tsc) + production build to dist/
npm run preview   # preview the production build locally
```

## Where content lives

All copy, contact info, and imagery references live in **one file**:
[`src/content/site-content.json`](src/content/site-content.json). Components never
hardcode text — edit the JSON and the whole site updates. No redeploy-by-code needed
for a phone number or address change.

### Placeholders (`null` = "Untitled")

Any field set to `null` in the JSON is content **not stated in the client's
requirements documents** (the brochure + business card in `docs/`). Rather than
invent copy or use misleading stock imagery, the UI renders a visible **"Untitled"**
marker (dashed underline) or a dashed **photo placeholder**. Fill these in with real,
client-confirmed content before launch:

- Hero home photo + caption, founder photo, gallery photos
- Service / facility descriptions and all section intros

Everything currently shown as real text is quoted or paraphrased directly from the
requirements documents.

> **Emails:** two contact emails appear across the source material and **both** are
> shown on the site (`business.emails` in the JSON): `CaringheartALF@outlook.com`
> (brochure) and `Seray.lansana25@gmail.com` (business card).

## Contact form

The form works with no custom backend. Set `VITE_CONTACT_FORM_ENDPOINT` (see
[`.env.example`](.env.example)) to a form-backend-as-a-service endpoint (Formspree,
Web3Forms, etc.). With no endpoint set, the form still validates and confirms, then
steers families to the phone/email — it is never a dead end. Secrets stay out of the
bundle: only `VITE_`-prefixed vars are exposed, and `.env` is git-ignored.

## Deploy (Vercel)

Infra is committed at the repo root in [`../vercel.json`](../vercel.json) — it points
Vercel at this `frontend/` subdirectory (Vite framework, `frontend/dist` output). Add
`VITE_CONTACT_FORM_ENDPOINT` in the Vercel project's Environment Variables if you wire
up the form. CI (type-check + build) runs on every push/PR via
[`../.github/workflows/ci.yml`](../.github/workflows/ci.yml).
