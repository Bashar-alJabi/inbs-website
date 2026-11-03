# INBS — Development, QA and Company Handoff Checklist

**How to use this document:** Update it **after every completed page or feature**, when requirements change, **before every PR merge**, and again **before each release to `main` and final company handoff**. A checked box means the work was actually verified, not simply planned. Record evidence in the PR (CI link, preview, screenshots, test summary). Keep unfinished work unchecked. This checklist describes current evidence as of **November 2026**.

## A. Baseline / completed homepage milestone

- [x] Two locale-prefixed homepages (`/en` and `/ar`) with proper `lang` and RTL/LTR handling.
- [x] Shared header, navigation, footer, language switching, light/dark theme and responsive homepage implementation.
- [x] Branded Coming Soon fallback for recognized but unfinished routes.
- [x] Official company logo asset and service/hero images committed locally.
- [x] Central `SITE_URL` and opt-in `SITE_INDEXABLE=true` in `src/lib/seo.ts`; indexing disabled by default.
- [x] Homepage canonical/hreflang/Open Graph metadata, robots and sitemap for home locales only.
- [x] Baseline security headers in `next.config.ts`.
- [x] HTTP smoke script for languages, RTL, homepage images, official logo and robots.
- [x] CI production build, ESLint and TypeScript checks passed for the homepage PR milestone.
- [x] Playwright browser and axe automated checks passed for the homepage milestone: EN/AR, mobile/tablet/desktop, both themes, reduced/normal motion cases, navigation, images, menu, basic security headers and major accessibility violations.
- [x] Reduced-motion support for decorative cursor and relevant homepage animations.
- [x] Homepage approved and merged via PR #16 to `redesign`, then PR #17 to `main`.

**Scope note:** These are automated test results, not a claim of exhaustive manual accessibility, performance or real-device testing.

## B. Open cleanup / maintainability work

- [x] Centralize contact details, map URL and social links in `src/content/contact.ts` (footer consumes them).
- [x] Consolidate service slugs, EN/AR names and images in `src/content/services.ts`; map showcase icons by slug.
- [x] Extract shared header/footer and homepage copy, document translation/content ownership in `docs/CONTENT-MANAGEMENT.md`. Other page-local UI strings can be migrated when each page is implemented.
- [x] Reuse the shared `LanguageSwitcher` in the header.
- [x] Use shared `Reveal` and mount `SmoothScroll` once in the locale layout, retaining reduced-motion behavior.
- [x] Extract the company facts strip into `src/components/home/company-facts.tsx`.
- [x] Remove verified obsolete CSS selectors for the pre-redesign header/footer and hero video. The final visual regression audit in both locales/themes/viewports is separately pending below.
- [x] Remove 10 unused legacy service JPEGs and 5 default Next.js SVGs; preserve active WebPs, source metadata and licences.
- [x] Make service image preparation read verified source metadata and use manual, read-only workflow with downloadable artifacts, no auto-push.
- [x] Add workflow concurrency, remove obsolete feature-branch triggers, improve smoke logs and retain independent lint/type/build/HTTP/E2E validation. Some checks intentionally run in both CI jobs.
- [x] Review and retain approved generated favicon; implement bilingual branded 404.
- [ ] Obtain authorized verification of company metrics before final publication; the 25/30/85/25,320 values and count animation were verified unchanged against `redesign`.
- [ ] Obtain approved content verification of institution representations before final publication; all institution names/icons were verified unchanged against `redesign`.

**PR #19 cleanup status (3 November 2026):** all 15 agreed work items are implemented or reviewed on `feature/project-cleanup`; no merge performed. This does not mean release-ready. Full CI and preview review are still required on the final PR commit. The image-preparation workflow was made read-only and manual but has not been exercised end to end; do not mark its runtime verification complete. The displayed achievements and institution content were not edited, but are still subject to authorized company verification.

## C. Repeat after **every page** (copy these tasks to the page PR)

- [ ] Record page name, owner, PR number, preview URL, completion date and any unresolved work.
- [ ] Confirm business copy and data have an approved source; link or document image licenses and alt text.
- [ ] Check Arabic and English are complete, equivalent and correctly displayed (`lang`, RTL/LTR, font and punctuation).
- [ ] Check navigation and internal/external links, language switching, header/footer, breadcrumbs if present, and unknown-route behavior.
- [ ] Test mobile, tablet and desktop layouts and confirm no horizontal overflow, broken images or layout shifts.
- [ ] Check light and dark themes, keyboard/focus behavior, controls/forms, reduced-motion support and accessibility violations.
- [ ] Review image optimization and loading; measure Lighthouse/LCP/CLS/INP if relevant to the change and record results.
- [ ] Provide proper page title, description, canonical/hreflang/Open Graph as appropriate.
- [ ] Add completed indexable routes to sitemap; keep unfinished Coming Soon routes noindex.
- [ ] Run `npm run lint`, `npx tsc --noEmit`, `npm run build` and applicable smoke/browser checks; link actual results.
- [ ] Remove dead code and unneeded assets only after impact checks; verify no duplicate logic or unnecessary dependency.
- [ ] Update `README.md` when run/setup/stack/status changes; update `PROJECT-GUIDE.md` when routes, architecture, content editing or ownership changes.
- [ ] **Always update this checklist** after page completion, including completed evidence and newly discovered TODOs.
- [ ] Obtain owner approval before merging; verify the exact final commit and destination branch.

## D. Repeat before **every PR merge / release to main**

- [ ] Confirm PR scope, changed files, target branch and no unrelated edits.
- [ ] Ensure CI for the exact head commit passes; review failure logs and rerun after fixes.
- [ ] Review deployment preview in both locales and themes; check desktop and mobile.
- [ ] Confirm no exposed secrets, accidental generated files, incorrect rights claims or unapproved content changes.
- [ ] Check new dependencies, external assets, server headers and environment variables.
- [ ] Confirm README, project guide and checklist reflect the actual code and state.
- [ ] Obtain explicit owner merge approval and use reviewed PRs; verify target branch after merge.
- [ ] On milestone release, retest the updated `main` deployment and record any issues separately.

## E. Before final publication and company handoff

### Company content and functionality
- [ ] Company owner signs off on business identity, services, history, statistics, team, contact details and social URLs.
- [ ] Every intended page/service is complete in both languages; remove or clearly exclude temporary Coming Soon destinations.
- [ ] Contact form works end to end with validation, anti-spam, delivery confirmation, consent and error handling.
- [ ] Privacy Policy, Terms and required legal/contact statements are approved.
- [ ] Confirm photos, brand elements, icons and licenses; no unsupported affiliation or endorsement claims.

### SEO, security and performance
- [ ] Confirm production domain and hosting support for the selected Next.js runtime.
- [ ] Configure `SITE_URL`; enable `SITE_INDEXABLE=true` only after final content and crawl checks.
- [ ] Validate robots, sitemap, canonicals, hreflang, Open Graph/favicon, redirects and 404 on the production URL.
- [ ] Add verified Organization/LocalBusiness structured data only from company-approved facts.
- [ ] Verify HTTPS, security headers/CSP feasibility, dependency vulnerabilities and secret management.
- [ ] Run Lighthouse and measure real deployed LCP/CLS/INP; investigate significant regressions.
- [ ] Complete manual keyboard, screen-reader, contrast, zoom and real-device checks for both languages and themes.
- [ ] Set up Search Console and privacy-conscious analytics/consent when required.

### Hosting, operations and maintainability
- [ ] Document Vercel/production hosting setup, domain/DNS, environment variables, deployments and rollback procedure.
- [ ] Configure error monitoring, uptime checks, backups, access roles and incident owner.
- [ ] Document how staff request/approve text, image, service and contact-information changes.
- [ ] Document repository branches, PR review/release process, update cadence and dependency maintenance owner.
- [ ] Confirm no unused starter assets, old build outputs or undocumented automated write workflows remain.
- [ ] Re-run full production smoke tests, document final evidence and capture written company acceptance.
- [ ] **Final docs refresh:** README accurately describes release; project guide matches delivered code; checklist includes verified results, remaining risks and owner assignments.

## Maintenance after handoff

- [ ] At each new page/feature: repeat Sections C and D and update affected docs.
- [ ] At every release: check deployment, SEO/indexing, links and critical journeys; record the release and rollback reference.
- [ ] Periodically: review dependencies/security, external link health, asset licensing, contact info, backups and accessibility/performance regressions.
- [ ] When requirements or hosting change: update the guide, checklist and responsible owner.

**Rule:** Do not check a task without evidence. Do not equate a passing build with visual quality, verified company facts or production launch readiness.
