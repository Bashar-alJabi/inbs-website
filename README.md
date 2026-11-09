# INBS Website

Official bilingual frontend website for **International Network Businessmen Services (INBS)**, Dubai.

## Status and branches

The audited `feature/final-codebase-audit` branch implements Home, About, Services, Team, Contact, Careers, Insights, Legal, ten service-detail pages and six articles in both languages (48 localized routes). Legal remains permanently `noindex`; all other pages follow `SITE_INDEXABLE`, which is disabled for testing. Audit work on this branch is not yet merged or deployed. Company content, legal and publication approval remain separate from engineering validation.

- `main`: company-facing approved milestone.
- `redesign`: integration branch for accepted redesign work.
- `feature/*`: isolated page or maintenance work, branched from `redesign` and merged by PR after approval.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, `next-intl`, Motion, Lenis and Lucide React. Frontend only; no custom backend.

## Run locally

Use a compatible Node.js version (CI uses Node.js 24) and npm:

```bash
npm ci
npm run dev
```

Open http://localhost:3000/en or http://localhost:3000/ar.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

After building, start Production in a separate terminal with `npm run start`, then run `npm run test:smoke`. Its default origin is http://localhost:3000; `SMOKE_BASE_URL` overrides it. Run the complete browser/axe suite with `node scripts/homepage-e2e.mjs`; `E2E_BASE_URL` overrides its default http://127.0.0.1:3000.

For local browser QA, temporarily install the tooling with `npm install --no-save --package-lock=false playwright @axe-core/playwright`, then download Chromium with `npx playwright install chromium`. The Linux CI workflow adds `--with-deps`; see `.github/workflows/homepage-e2e.yml`. These tools are not declared application dependencies. Do not run TypeScript concurrently with a build regenerating `.next/types`.

Local/preview builds must remain non-indexable. Final publication requires the approved `SITE_URL` and `SITE_INDEXABLE=true` **before** the final Production build and in its runtime environment; follow [the Hostinger launch checklist](docs/HOSTINGER-LAUNCH-CHECKLIST.md). This is a future launch procedure, not authorization to deploy.

## Find the right file

- `src/app/[locale]/`: routes and locale layout.
- `src/components/home/`: homepage sections; `src/components/about/`: About page; `src/components/services/`: Services landing page; `src/components/team/`: Team editorial page; `src/components/service-detail/`: shared service-detail section composition; `src/components/contact/`: direct-contact page without a form; `src/components/careers/`: Careers editorial page; `src/components/insights/`: Insights landing, library, articles and CTA; `src/components/legal/`: bilingual legal policy sections and CTA; `src/components/layout/`: shared header, footer and navigation.
- `src/content/`: bilingual content for home, About, shared layout, services, contact, Careers, Insights and Legal.
- `src/lib/site.ts`: locales and bilingual page labels; `src/lib/routes.ts`: locale-aware URL builders.
- `src/content/services.ts`: authoritative service catalog; `src/content/navigation.ts`: menu selections.
- `messages/ar.json` / `messages/en.json`: locale bundles still loaded by `next-intl`; legacy Coming Soon messages are retained.
- `public/brand/` and `public/images/`: logo and image assets. Insights uses six article photos and a separate Hero image (all replaceable local WebP) under `public/images/insights/`, with Pexels credits in `SOURCES.md`.
- `src/styles/` and `src/app/globals.css`: visual styles.

**Content ownership:** see `docs/CONTENT-MANAGEMENT.md`. Shared contact details, service names and page-specific content have designated owners; nontechnical editors should still use a reviewed change workflow.

## Documentation and handoff

- [Project and handoff guide](docs/PROJECT-GUIDE.md): actual architecture, content ownership, localization, route map and maintenance procedures.
- [Foundation, page and launch checklist](docs/FOUNDATION-CHECKLIST.md): recurring page reviews and pending launch work.
- [Hostinger launch checklist](docs/HOSTINGER-LAUNCH-CHECKLIST.md): runtime, build-time indexing settings, post-publication checks and rollback prerequisites.
- [Coding guidance](AGENTS.md): **mandatory page composition, section ownership, CTA and review rules**.

**Documentation is part of every page/feature's definition of done.** Update these documents to reflect actual changes and check off only work that has been verified.

## Source of truth and approvals

The earlier [INBS repository](https://github.com/Bashar-alJabi/inbs) is the reference for established company copy and services; confirm changes with the company. Do not invent company metrics, employee identities, testimonials or official affiliations, and do not alter the official logo. Keep work in a feature branch, obtain owner approval before merging and preserve both languages.

## Homepage UAE interactive map

- The Home page renders a separate copy of the Contact page's interactive UAE map **immediately before the final Home CTA**.
- Home-only logic and markup: `src/components/home/home-uae-map.tsx`; Home-only path data: `src/content/home-uae-map.ts` (original SVG source attribution preserved); Home-only map styles: `src/styles/home.css`.
- The map shares **no React component or path-data file** with Contact. Adjust the Home map independently without changing the Contact version.
- Its section gradient matches the final effective `.inbs-achievements` gradient in both light and dark themes. Office marker, mouse-following pointer line, emirate labels and reduced-motion behavior are copied intact.
