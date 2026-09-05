# WAHAJ

React 19 + TypeScript + Vite. English and Arabic creative studio website.

- `npm run dev`: development.
- `npm run build`: type-check, production build, route metadata and sitemap generation.
- `npm run preview`: production preview at http://localhost:4173.
- `npm run test:ui`: browser layout, navigation and accessibility checks against the preview.
- `npm run audit:lighthouse`: local mobile Lighthouse reports in `artifacts/`.

Copy `.env.example` to `.env.local` and configure an activated public form endpoint and verified contact details. Never store secret service API keys in VITE_ variables. Rebuild after changing these values.

Form UI tests use an isolated Vite server on port 5174 with `VITE_FORM_ENDPOINT=http://127.0.0.1:5174/__qa__/brief`; `npm run test:form` intercepts every submission. This is a test fixture, not a production delivery service.

See [IMPLEMENTATION.md](IMPLEMENTATION.md) for the completed work, validation evidence and remaining owner-supplied content.
