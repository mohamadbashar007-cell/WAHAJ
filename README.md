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
- `src/data/behance-projects.json`: complete galleries for the six selected projects from `behance.net/mazenmagdy29`, with ordered image rows, source URLs and dimensions. Images are hosted locally in `public/projects/behance/` with 800px and up-to-1920px WebP versions. Dedicated `/design/:project/` pages include keyboard-accessible enlargement; the existing Wesal, Kroma and Pain case studies share these galleries.
- `node scripts/import-behance.mjs`: imports project images on Windows using curl and Sharp. Download cache lives in `artifacts/behance/`; remove cached HTML and `.image` files to refresh source data. The importer fails on unknown projects, pagination or unsupported modules instead of silently omitting content. `npm run images` skips these already-optimized galleries.
- `node scripts/qa-behance.mjs`: verifies every gallery asset, direct project routes at domain and subdirectory roots, mobile/desktop layout, image counts, keyboard navigation and focus restoration against the production build.
- The motion section features a locally served Durra product-campaign reel with automatic playback, a play/pause control and reduced-motion support. The new Durra case gallery is built from the supplied campaign artwork.

## Routes and verification

The build generates fifteen static HTML entry points, each with its own title and description, including `/work/wesal/` and the other selected projects. They work at a domain root or a GitHub Pages project subdirectory. Existing `#/...` links are translated to the new routes. These are static entry points with client-rendered page bodies, not full server-side rendering.

`node scripts/qa.mjs` tests the production output at both deployment roots, responsive widths, navigation, keyboard focus, the custom cursor and the unconfigured form fallback. `node scripts/qa-contact.mjs` tests direct submission with intercepted local requests; it never sends an enquiry to a real recipient. The scripts use local Chrome on Windows; adjust the executable path for another environment. Screenshots and results are written under `artifacts/refinement/`.

For future changes, review locally before pushing or publishing.
