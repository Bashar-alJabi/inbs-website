# INBS — Project and Handoff Guide

## Purpose and current state

INBS is a bilingual (English/Arabic) company website built with Next.js App Router, React and TypeScript. The goal is accessible, maintainable and performant presentation of verified company services.

**As of 7 November 2026:** Home, About, Services landing, Team and all ten bilingual service-detail routes are merged into `main` (service milestone PR #29 → redesign, PR #31 → main). Contact is integrated into `main`. Careers is merged into `main`; applications use shared email and mobile WhatsApp details. Insights includes six bilingual editorial guides, official reference links, topic filters and article detail pages, approved for integration. Legal Information is implemented on `feature/legal-page`, with company compliance approval required before public indexing. Development releases are not company compliance, service-program or public indexing approval.

Current maintenance work is tracked separately from page development. Do not merge or deploy an unfinished change without the owner's approval.

## Branch and release workflow

1. Start `feature/<page-or-task>` from `redesign`, with focused changes only.
2. Keep factual content separate from presentation where practical; don't add folders or abstractions without a real consumer.
3. Implement and review both `/en` and `/ar`, responsive breakpoints, light/dark modes, keyboard behavior and reduced motion.
4. Run lint, TypeScript, build and applicable browser/HTTP tests; record failures and fixes honestly.
5. **Update the documentation and recurring checklist in the same PR**, including new routes, assets, dependencies, content edit locations, known limitations and test evidence.
6. Review the local or available deployment preview and obtain owner approval. Merge into `redesign` using a PR; promote an approved milestone to `main` using a separate reviewed PR.

No direct commits to `main`. A green CI build is necessary but not proof of complete visual/manual review.

## Live route map

The `[locale]` URL segment is either `en` or `ar`; `/en` and `/ar` are the implemented homepages.

| Route (both languages) | Current state |
| --- | --- |
| `/[locale]` | **Implemented homepage** |
| `/[locale]/about` | Implemented and promoted to `main` (PRs #21 and #23) |
| `/[locale]/services` | Implemented on `main` |
| `/[locale]/services/[slug]` | Ten bilingual service-detail pages implemented on `main`; detail routes remain `noindex` pending company-side content review |
| `/[locale]/team` | Implemented on `main` |
| `/[locale]/insights` | Dedicated bilingual Insights landing and six localized articles; approved for integration |
| `/[locale]/careers` | Implemented on `main` |
| `/[locale]/contact` | Implemented on `main` |
| `/[locale]/legal` | Dedicated bilingual legal information page (privacy, website terms, notices), under company compliance review |
| `/[locale]/privacy-policy` and `/[locale]/terms` | Permanent redirects to `/[locale]/legal` |

Known page slugs and bilingual labels live in `src/lib/site.ts`; service slugs come from the canonical `src/content/services.ts` catalog and are re-exported by `site.ts`. Localized URL helpers are in `src/lib/routes.ts` and shared menu selections in `src/content/navigation.ts` (PR #22). Existing service URLs remain unchanged. The old privacy-policy and terms URLs redirect to the single legal landing route; see `next.config.ts`. The dedicated `src/app/[locale]/about/page.tsx` owns About. The dedicated `src/app/[locale]/services/[slug]/page.tsx` renders all ten recognized service detail pages. The dedicated `src/app/[locale]/contact/page.tsx` replaces Contact's placeholder; `src/content/contact-page.ts` owns localized copy, while `src/content/contact.ts` owns official contact details. The fallback `src/app/[locale]/[...slug]/page.tsx` returns 404 for unknown routes; all catalog pages now have dedicated routes. Contact uses direct telephone, email, map and social links, without a form, submission endpoint or message persistence. Unknown paths are 404. A `why-inbs` page was mentioned in the earlier roadmap but is **not** a recognized route in the current `pages` array; explicitly decide whether to add it before documenting it as available.

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
    about/                standalone About story sections\n    services/             Services landing page (feature branch)
    layout/               header, footer, Coming Soon, language and cursor UI
    shared/               reusable Reveal and SmoothScroll
  content/                bilingual copy, service catalog, shared layout and contact data
  i18n/                   next-intl request configuration
  lib/                    site locale/routes and SEO helpers
  styles/                 design tokens, home/about page CSS and site-layout CSS
```

### Rendering and responsibility

- `src/app/layout.tsx`: global styles and default metadata; intentionally passes through `children` without a document shell.
- `src/app/[locale]/layout.tsx`: validates locale, sets `html lang/dir`, provides messages and displays shared header/footer.
- `src/app/not-found.tsx`: standalone 404 document. This root fallback replaces the locale layout, so it owns its own `html lang/dir` and `body`, using the existing pathname-based EN/AR selection (English fallback for unsupported locales). Keep exactly one document owner in each render path; adding a document shell to the pass-through root layout would require revisiting both owners. The existing 404 copy, styles and overflow cleanup remain in this file.
- `src/app/[locale]/page.tsx`: homepage route, locale validation and metadata; `src/components/home/homepage.tsx`: homepage section composition.
- `src/components/home/`: Hero, About preview, Services showcase, Achievements and Institutions; client components are used only where interaction or animation requires them.
- `src/app/[locale]/about/page.tsx`: About route and metadata; `src/components/about/about-page.tsx` only composes `AboutHero`, `AboutIntro`, `AboutPrinciples` and `AboutNetwork`. They share tiny presentational helpers in `src/components/about/about-ui.tsx`, bilingual content in `src/content/about.ts`, and scoped rules in `src/styles/about.css`.
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
- `src/app/robots.ts`, `src/app/sitemap.ts`, and page metadata govern crawlers and canonical/alternate URLs. The sitemap includes only completed, implemented routes (Home, About, Services, Team) when indexing is enabled.
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

## Page component ownership (November 2026)

Every page matches the Home/About composition pattern. `src/components/<page>/<page>-page.tsx` imports section components but contains no section JSX. Team sections: `team-hero.tsx`, `team-story.tsx` (integrates the approach, three principles and seven photo slots), and `team-cta.tsx`. Services sections: `services-hero.tsx`, `services-directory.tsx`, `services-cta.tsx`. Home and About CTAs are `home-cta.tsx` and `about-cta.tsx`. See `AGENTS.md` for mandatory architecture rules. Shared CSS for CTA consistency is a deliberate **style** abstraction, not a shared React component.


## Service-detail architecture — PR #29

All ten bilingual service pages use `src/components/service-detail/service-detail-page.tsx` as a thin composition layer with separate Hero, Overview, Offerings, Process and CTA components. The owner-approved Businessmen Services layout is shared; offering group counts and copy vary per service. Bilingual descriptions are in `src/content/service-details.ts` (Businessmen reference) and `src/content/service-detail-catalog.ts` (all ten effective service records), while authoritative labels, slugs and images remain in `src/content/services.ts`. Content is still awaiting review; detail route indexing is disabled. See `docs/SERVICE-DETAIL-PAGES-PLAN.md`.

## Insights editorial content

Six bilingual articles live in `src/content/insights.ts`, with landing text in `src/content/insights-page.ts`. Each entry has a stable slug, category, English and Arabic title, summary, structured article sections and an official reference URL. Add both locale variants together and verify current requirements against the linked primary authority. The `/[locale]/insights/[slug]` route generates its article pages from this catalog; topic filters run client-side without a CMS or external API. Article photos are six optimized local WebP files at `public/images/insights/<slug>.webp`, plus the distinct `insights-hero.webp` background image, with provenance in `public/images/insights/SOURCES.md`; replacing a photo with the same filename requires no code edit. Articles are educational, not legal or tax advice. Never add fictitious dates, authors, testimonials or regulatory promises.

## Legal Information page — company review required

Implemented in `src/app/[locale]/legal/page.tsx` with separate components in `src/components/legal/`, scoped styles in `src/styles/legal.css`, and bilingual content in `src/content/legal-page.ts`. Existing `/en|ar/privacy-policy` and `/en|ar/terms` permanent redirects are retained. The policy page uses `noindex` regardless of global `SITE_INDEXABLE` until company-specific operational disclosures are checked and approved. Privacy copy deliberately does **not** assert unverified cookie behavior, analytics, retention periods, processing locations, suppliers or data-sharing practices. Confirm these with INBS's legal/compliance owner and hosting/service providers, then revise the text and metadata before final public legal sign-off.

## Homepage UAE interactive map

- The Home page renders a separate copy of the Contact page's interactive UAE map **immediately before the final Home CTA**.
- Home-only logic and markup: `src/components/home/home-uae-map.tsx`; Home-only path data: `src/content/home-uae-map.ts` (original SVG source attribution preserved); Home-only map styles: `src/styles/home.css`.
- The map shares **no React component or path-data file** with Contact. Adjust the Home map independently without changing the Contact version.
- Its section gradient matches the final effective `.inbs-achievements` gradient in both light and dark themes. Office marker, mouse-following pointer line, emirate labels and reduced-motion behavior are copied intact.
