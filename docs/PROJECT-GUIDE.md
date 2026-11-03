# INBS — Project and Handoff Guide

## Purpose and current state

INBS is a bilingual (English/Arabic) company website built with Next.js App Router, React and TypeScript. The goal is accessible, maintainable and performant presentation of verified company services.

**As of November 2026:** the bilingual homepage and shared site shell are implemented and promoted to `main`, including the cleanup milestone (PR #19 to `redesign`, PR #20 to `main`). The bilingual About page is being developed in draft PR #21 on `feature/about-page`; it is **not merged yet**. Other known URLs still display **Coming Soon**. This guide describes the feature branch implementation separately from the approved production branch.

Current maintenance work is tracked separately from page development. Do not merge or deploy an unfinished change without the owner's approval.

## Branch and release workflow

1. Start `feature/<page-or-task>` from `redesign`, with focused changes only.
2. Keep factual content separate from presentation where practical; don't add folders or abstractions without a real consumer.
3. Implement and review both `/en` and `/ar`, responsive breakpoints, light/dark modes, keyboard behavior and reduced motion.
4. Run lint, TypeScript, build and applicable browser/HTTP tests; record failures and fixes honestly.
5. **Update the documentation and recurring checklist in the same PR**, including new routes, assets, dependencies, content edit locations, known limitations and test evidence.
6. Review Vercel preview and obtain owner approval. Merge into `redesign` using a PR; promote an approved milestone to `main` using a separate reviewed PR.

No direct commits to `main`. A green CI build is necessary but not proof of complete visual/manual review.

## Live route map

The `[locale]` URL segment is either `en` or `ar`; `/en` and `/ar` are the implemented homepages.

| Route (both languages) | Current state |
| --- | --- |
| `/[locale]` | **Implemented homepage** |
| `/[locale]/about` | Implemented on feature branch (draft PR #21), not merged |
| `/[locale]/services` | Coming Soon |
| `/[locale]/services/[slug]` | Coming Soon for ten recognized service slugs |
| `/[locale]/team` | Coming Soon |
| `/[locale]/insights` | Coming Soon |
| `/[locale]/careers` | Coming Soon |
| `/[locale]/contact` | Coming Soon |
| `/[locale]/privacy-policy` | Coming Soon |
| `/[locale]/terms` | Coming Soon |

Known page slugs live in `src/lib/site.ts`; service slugs come from the canonical `src/content/services.ts` catalog and are re-exported by `site.ts`. The dedicated `src/app/[locale]/about/page.tsx` owns About. The dynamic fallback `src/app/[locale]/[...slug]/page.tsx` resolves unfinished recognized URLs and displays `ComingSoon`; it excludes About from generated params. Unknown paths are 404. A `why-inbs` page was mentioned in the earlier roadmap but is **not** a recognized route in the current `pages` array; explicitly decide whether to add it before documenting it as available.

When a page is developed, give it its own Next.js route and replace the Coming Soon rendering. Link to the actual route, not to a homepage anchor as a substitute.

## Current project layout

```text
.github/workflows/        CI: validate, homepage browser audit, image preparation
docs/                     developer guide and recurring checklists
messages/                 next-intl translations (currently Coming Soon)
public/brand/             official logo
public/images/            homepage hero and service photography
scripts/                  smoke, browser audit and image preparation
src/
  app/                    root layout, SEO endpoints, global CSS
    [locale]/             translated shell, home route, temporary fallback pages
  components/
    home/                 homepage sections
    about/                standalone About story sections
    layout/               header, footer, Coming Soon, language and cursor UI
    shared/               reusable Reveal and SmoothScroll
  content/                bilingual copy, service catalog, shared layout and contact data
  i18n/                   next-intl request configuration
  lib/                    site locale/routes and SEO helpers
  styles/                 design tokens, home/about page CSS and site-layout CSS
```

### Rendering and responsibility

- `src/app/layout.tsx`: global styles and default metadata.
- `src/app/[locale]/layout.tsx`: validates locale, sets `html lang/dir`, provides messages and displays shared header/footer.
- `src/app/[locale]/page.tsx`: homepage route, locale validation and metadata; `src/components/home/homepage.tsx`: homepage section composition.
- `src/components/home/`: Hero, About preview, Services showcase, Achievements and Institutions; client components are used only where interaction or animation requires them.
- `src/app/[locale]/about/page.tsx` and `src/components/about/about-page.tsx`: About route/metadata and sections, with dedicated `src/styles/about.css` and bilingual `src/content/about.ts`.
- `src/components/layout/`: shared chrome and temporary pages.
- `src/styles/tokens.css`: design variables; `globals.css`, `site-layout.css`, `home.css`: other styles.

**Known cleanup work:** some legacy CSS selectors and unused legacy images still exist; the duplicate language-switching and reveal components have been consolidated. Review their references before removing them; never change rendered appearance accidentally.

## Where content currently lives

| Content | File | Notes |
| --- | --- | --- |
| Homepage text and About preview | `src/content/home.ts` | English and Arabic |
| Hero slides, images and links | `src/content/hero.ts` | English and Arabic |
| Page slugs and titles | `src/lib/site.ts` | Service names and slugs are re-exported from the service catalog |
| Service slugs, EN/AR names and image paths | `src/content/services.ts` | Single slug-keyed catalog and display order |
| Shared header/footer copy | `src/content/layout.ts` | Localized UI labels and descriptions |
| Coming Soon UI messages | `messages/en.json`, `messages/ar.json` | Loaded with `next-intl` |
| Achievement figures and captions | `src/components/home/home-achievements.tsx` | Currently embedded in UI; keep values unchanged unless owner approves |
| Institution names and icons | `src/components/home/home-institutions.tsx` | Currently embedded in UI; keep unchanged unless owner approves |
| Contact, map and social links | `src/content/contact.ts` | Reused by footer and future contact sections |
| Service image files and provenance | `public/images/services/` | Read `README.md` and `SOURCES.json` there |

**Editing convention:** see [`CONTENT-MANAGEMENT.md`](CONTENT-MANAGEMENT.md) for the authoritative content ownership map, translation rules and service editing workflow. This is a structured TypeScript content layer, not a visual CMS. Nontechnical staff should still provide approved edits for developer review.

## Language, layout and design

- The public routes are prefixed `/en` and `/ar`; default `/` redirects to `/en`.
- Arabic uses `dir="rtl"`, English `dir="ltr"`. Validate Arabic layout rather than mirroring blindly.
- The site supports light and dark themes, responsive layouts and reduced-motion preferences.
- The official company logo is `public/brand/inbs-logo.png`; do not redesign or approximate it. Institution symbols on the homepage are **generic illustrative icons**, not official third-party logos or proof of partnership.
- Brand foundations include `#05478F`, `#1365AF`, `#6BB3EC`, `#EFFAFB`; use design tokens rather than scattering hard-coded values.
- Do not add fictitious testimonials, partnerships, staff identities, guarantees or unapproved company facts. Verify published statistics with the owner before claiming accuracy.

## SEO, security and publication

- `src/lib/seo.ts` centralizes `SITE_URL` and `SITE_INDEXABLE`. Indexing is off unless `SITE_INDEXABLE=true`.
- `src/app/robots.ts`, `src/app/sitemap.ts`, and page metadata govern crawlers and canonical/alternate URLs. The sitemap currently includes only published homepages when indexing is enabled.
- `next.config.ts` sets basic security response headers; this is not a substitute for deployment security testing.
- No custom backend is currently implemented. Do not claim Contact forms, hosting migration, Search Console, structured data or analytics are complete unless verified.
- Confirm final domain, hosting/runtime and environment variables before production launch. Never commit secrets.

## Tests and evidence

```bash
npm ci
npm run lint
npx tsc --noEmit
npm run build
# with the app running:
npm run test:smoke
```

- `.github/workflows/validate.yml` runs baseline validation and production HTTP smoke tests on relevant PRs.
- `.github/workflows/homepage-e2e.yml` runs `scripts/homepage-e2e.mjs` using Playwright and axe; it tests bilingual homepage scenarios, responsive sizes, light/dark, reduced/normal motion, navigation, browser errors and key accessibility checks.
- These automated homepage checks succeeded for the approved homepage milestone. **Manual real-device usability and dedicated Lighthouse/Core Web Vitals measurements are not documented as completed.**
- Record checks per PR and update `docs/FOUNDATION-CHECKLIST.md`; do not turn unchecked work into a completed claim based on unrelated checks.

## Every page / PR: required handoff notes

Each page or cleanup PR must include:
1. Purpose, changed files and the page(s) affected.
2. Content/asset ownership, sources/licences and new editing locations.
3. EN/AR, RTL, mobile/tablet/desktop, light/dark and interaction/accessibility review notes.
4. Lint, type-check, production build, applicable smoke/E2E checks, plus preview link and any manual review evidence.
5. SEO decisions (metadata, canonical/hreflang, sitemap/noindex), changed dependencies and environment/configuration changes.
6. Known limitations, approvals needed and next steps.
7. Updated `README.md` if setup/stack/current phase changes, this guide if architecture/ownership/routes change, and the checklist **after every completed page** and **before every milestone release**.

## End-of-project company handoff

Before handing over, complete and document: real company-approved content in both languages; all intended routes; SEO and site indexing; accessibility and device testing; performance; HTTPS/hosting, environment variables, redirects, security and backups; forms and privacy requirements; asset licences; editing instructions; dependencies and update process; monitoring/incident ownership; and a final smoke test on the live domain. See `FOUNDATION-CHECKLIST.md` for open items.

## Roles

- **Developer:** implementation, technical QA, dependency/security maintenance and documentation accuracy.
- **Company content owner:** approve factual copy, statistics, contact details, logos, photographs and legal text.
- **Project owner:** approve design milestones and merges to the accepted branches.

Only check off completed work with evidence; keep the guide accurate to the checked-in code.
