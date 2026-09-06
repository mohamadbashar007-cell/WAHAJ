# WAHAJ

React, TypeScript and Vite. The original navy/yellow identity, custom cursor and motion are retained. The site is English-only.

## Local preview

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

For the static production output, run `npm run build`, then `npm run preview -- --host 127.0.0.1`. Building and previewing do not upload or publish anything.

## Contact setup

Copy `.env.example` to `.env.local` and set the real public `VITE_CONTACT_EMAIL`. With only an email address configured, submitting opens an email draft and clearly explains that the visitor still needs to send it. If neither contact option is configured, visitors can prepare, copy and download their brief; the site does not claim to receive enquiries.

For direct submission, set `VITE_CONTACT_ENDPOINT` to an HTTPS form endpoint. It receives POST JSON with `name`, `company`, `email`, `phone`, `type`, `timeline`, `budget`, `brief`, `_gotcha`, `subject` and `message`. Return a successful HTTP status and JSON `{"ok":true}` only after accepting the enquiry. Other responses, network failures and a 15-second timeout keep the entered details available for retry or download. The endpoint must allow the deployed site origin through CORS, validate input, handle spam/rate limits and deliver or store the enquiry server-side. No backend or delivery provider is included in this static repository.

All `VITE_` settings are public browser configuration. Never put provider API keys there. Keep credentials on the receiving server. The Pages workflow reads the two contact settings from repository variables when a deployment is eventually authorized.

## Content and images

- `src/data/projects.ts`: selected project information.
- `src/data/case-studies.ts`: project scope and editorial descriptions based on existing portfolio content. No invented metrics or testimonials.
- `src/data/page-meta.json`: shared browser and static-page metadata.
- `npm run images`: creates responsive WebP variants and their manifest while preserving original images. Run after changing project imagery, then rebuild.
- The motion section remains a labeled WAHAJ identity animation study with a pause control. No client video, testimonials or team details have been added without source material.

## Routes and verification

The build generates nine static HTML entry points, each with its own title and description, including `/work/wesal/` and the other selected projects. They work at a domain root or a GitHub Pages project subdirectory. Existing `#/...` links are translated to the new routes. These are static entry points with client-rendered page bodies, not full server-side rendering.

`node scripts/qa.mjs` tests the production output at both deployment roots, responsive widths, navigation, keyboard focus, the custom cursor and the unconfigured form fallback. `node scripts/qa-contact.mjs` tests direct submission with intercepted local requests; it never sends an enquiry to a real recipient. The scripts use local Chrome on Windows; adjust the executable path for another environment. Screenshots and results are written under `artifacts/refinement/`.

For future changes, review locally before pushing or publishing.
