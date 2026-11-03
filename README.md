# INBS Website

Official bilingual frontend website for **International Network Businessmen Services (INBS)**, Dubai.

## Status and branches

The **homepage is implemented** in English and Arabic and was reviewed through PR #16 (`feature/homepage` → `redesign`) and PR #17 (`redesign` → `main`). Other routes currently display a branded Coming Soon page until their individual pages are developed. The site is **not a completed production launch**.

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
- `src/components/home/`: homepage sections; `src/components/layout/`: site-wide header, footer and navigation.
- `src/content/`: homepage and hero copy.
- `src/lib/site.ts`: language, page and service identifiers (currently also service labels).
- `messages/ar.json` / `messages/en.json`: Coming Soon UI translations.
- `public/brand/` and `public/images/`: logo and image assets.
- `src/styles/` and `src/app/globals.css`: visual styles.

**Current limitation:** editorial copy and contact details are not yet fully centralized. Refer to the handoff guide before editing and do not assume a nontechnical content editor can safely edit TSX.

## Documentation and handoff

- [Project and handoff guide](docs/PROJECT-GUIDE.md): actual architecture, content ownership, localization, route map and maintenance procedures.
- [Foundation, page and launch checklist](docs/FOUNDATION-CHECKLIST.md): recurring page reviews and pending launch work.
- [Coding guidance](AGENTS.md): contributor rules.

**Documentation is part of every page/feature's definition of done.** Update these documents to reflect actual changes and check off only work that has been verified.

## Source of truth and approvals

The earlier [INBS repository](https://github.com/Bashar-alJabi/inbs) is the reference for established company copy and services; confirm changes with the company. Do not invent company metrics, employee identities, testimonials or official affiliations, and do not alter the official logo. Keep work in a feature branch, obtain owner approval before merging and preserve both languages.
