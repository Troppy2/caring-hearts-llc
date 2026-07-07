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

Submits via **Formspree** (form-backend-as-a-service) using `@formspree/react` — no
custom backend or database. The form ID defaults to the project's Formspree form and
can be overridden with `VITE_FORMSPREE_FORM_ID` (see [`.env.example`](.env.example));
it's a public identifier, not a secret.

On top of Formspree, the form adds: client-side validation (name required, email **or**
phone required, message required), a **1-message-per-minute** rate limit (localStorage,
survives reloads), a hidden honeypot (`_gotcha`) for spam, and a graceful error path
that steers families to the phone number if submission fails. Manage notification
recipients and spam rules in the Formspree dashboard.

## Deploy (Vercel)

**The Vercel project's Root Directory must be `frontend`.** Vercel reads config relative
to the Root Directory, so the deploy config lives here in
[`vercel.json`](vercel.json) (Vite framework, `npm run build` → `dist`, `cleanUrls`,
asset caching) — not at the repo root.

- Import the repo, set **Root Directory = `frontend`**.
- Add `VITE_CONTACT_FORM_ENDPOINT` under Environment Variables if you wire up the form.

CI (type-check + build) runs on every push/PR via
[`../.github/workflows/ci.yml`](../.github/workflows/ci.yml).
