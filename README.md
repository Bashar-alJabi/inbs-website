# INBS Website

Official bilingual frontend website for **International Network Businessmen Services (INBS)**, Dubai.

## Status and branches

Home, About, Services, Team, Contact and ten service-detail pages are integrated in `main`. The Careers page is being developed on `feature/careers-page` for owner review. Insights and Legal continue to show Coming Soon. A development milestone is **not** company-wide content or compliance approval for a public launch.

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
- `src/components/home/`: homepage sections; `src/components/about/`: About page; `src/components/services/`: Services landing page; `src/components/team/`: Team editorial page; `src/components/service-detail/`: shared service-detail section composition; `src/components/contact/`: direct-contact page without a form; `src/components/careers/`: Careers editorial page, email application steps and standalone CTA; `src/components/layout/`: shared header, footer and navigation.
- `src/content/`: bilingual content for home, About, shared layout, services, contact and Careers.
- `src/lib/site.ts`: locales and bilingual page labels; `src/lib/routes.ts`: locale-aware URL builders.
- `src/content/services.ts`: authoritative service catalog; `src/content/navigation.ts`: menu selections.
- `messages/ar.json` / `messages/en.json`: Coming Soon UI translations.
- `public/brand/` and `public/images/`: logo and image assets.
- `src/styles/` and `src/app/globals.css`: visual styles.

**Content ownership:** see `docs/CONTENT-MANAGEMENT.md`. Shared contact details, service names and page-specific content have designated owners; nontechnical editors should still use a reviewed change workflow.

## Documentation and handoff

- [Project and handoff guide](docs/PROJECT-GUIDE.md): actual architecture, content ownership, localization, route map and maintenance procedures.
- [Foundation, page and launch checklist](docs/FOUNDATION-CHECKLIST.md): recurring page reviews and pending launch work.
- [Coding guidance](AGENTS.md): **mandatory page composition, section ownership, CTA and review rules**.

**Documentation is part of every page/feature's definition of done.** Update these documents to reflect actual changes and check off only work that has been verified.

## Source of truth and approvals

The earlier [INBS repository](https://github.com/Bashar-alJabi/inbs) is the reference for established company copy and services; confirm changes with the company. Do not invent company metrics, employee identities, testimonials or official affiliations, and do not alter the official logo. Keep work in a feature branch, obtain owner approval before merging and preserve both languages.
