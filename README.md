# INBS Website

Official bilingual frontend website for **International Network Businessmen Services (INBS)**, Dubai.

## Status and branches

The bilingual **Home and About pages**, shared shell, and centralized routing/navigation were promoted to `main` through PR #23. The bilingual **Services landing page** and footer navigation updates passed owner visual review and both CI workflows, then were squash-merged into `redesign` via PR #24. Promotion to `main` is tracked in PR #25. The **Our Team** page is in development on `feature/team-page`, with no unverified employee biographies or portraits. Individual service detail pages and other unfinished routes continue to display branded Coming Soon pages. This is **not a completed public production launch**.

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

`npm run test:smoke` checks a **running** server (by default http://localhost:3000); run `npm run start` after building or set `SMOKE_BASE_URL`. Browser/accessibility testing runs in GitHub Actions via `scripts/homepage-e2e.mjs`.

## Find the right file

- `src/app/[locale]/`: routes and locale layout.
- `src/components/home/`: homepage sections; `src/components/about/`: About page; `src/components/services/`: Services landing page; `src/components/team/`: Team editorial page; `src/components/layout/`: shared header, footer and navigation.
- `src/content/`: bilingual content for home, About, shared layout, services and contact.
- `src/lib/site.ts`: locales and bilingual page labels; `src/lib/routes.ts`: locale-aware URL builders.
- `src/content/services.ts`: authoritative service catalog; `src/content/navigation.ts`: menu selections.
- `messages/ar.json` / `messages/en.json`: Coming Soon UI translations.
- `public/brand/` and `public/images/`: logo and image assets.
- `src/styles/` and `src/app/globals.css`: visual styles.

**Content ownership:** see `docs/CONTENT-MANAGEMENT.md`. Shared contact details, service names and page-specific content have designated owners; nontechnical editors should still use a reviewed change workflow.

## Documentation and handoff

- [Project and handoff guide](docs/PROJECT-GUIDE.md): actual architecture, content ownership, localization, route map and maintenance procedures.
- [Foundation, page and launch checklist](docs/FOUNDATION-CHECKLIST.md): recurring page reviews and pending launch work.
- [Coding guidance](AGENTS.md): contributor rules.

**Documentation is part of every page/feature's definition of done.** Update these documents to reflect actual changes and check off only work that has been verified.

## Source of truth and approvals

The earlier [INBS repository](https://github.com/Bashar-alJabi/inbs) is the reference for established company copy and services; confirm changes with the company. Do not invent company metrics, employee identities, testimonials or official affiliations, and do not alter the official logo. Keep work in a feature branch, obtain owner approval before merging and preserve both languages.
