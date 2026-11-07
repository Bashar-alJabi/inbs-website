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

**PR #19 cleanup milestone (3 November 2026):** all 15 work items were reviewed/implemented and successfully merged to `redesign`, then promoted to `main` via PR #20 after green CI. The manual, read-only image-preparation workflow has not been exercised end to end. Company achievements and institution content remain subject to authorized owner verification.

## About page — merged PR #21 (`feature/about-page` → `redesign`)

- [x] Implement separate bilingual About route with its own scoped styles and content ownership.
- [x] Preserve existing company history (Dubai, established 2003), service slugs and shared navigation.
- [x] Use licensed local Dubai photo already recorded in the service-image provenance.
- [x] Add EN/AR metadata and opt-in sitemap entries without changing the default noindex policy.
- [x] Add About smoke and browser checks covering locale, RTL, responsive, themes, links and major accessibility violations.
- [x] Integrate approved supplied mission/goals/relationships themes in concise bilingual content without adding unsupported figures or affiliations.
- [x] Display all 10 canonical service entries; remove duplicate footer-adjacent contact CTA, use the homepage-style rounded-footer handoff and section-link interaction.
- [x] Add traveling SVG hero signals with reduced-motion support while preserving the existing network geometry.
- [x] Refactor About into independently maintained Hero, Intro, Principles, Network and local visual helper modules (composition-only page entry).
- [x] Remove off-rail decorative dots, align both SVG axes to the outer circle, and constrain ellipse traveler to the visible path.
- [x] Increase editorial section labels and principle descriptions, add RTL divider clearance, and reuse the Home About link styling without duplicate underline offsets.
- [x] Add browser regression assertions for SVG geometry, 10 services, typography, RTL clearance and hover underline baseline.
- [x] CI lint, TypeScript, production build, HTTP smoke, Playwright and axe passed on final PR head `aa262fb` before merge: [Validate website](https://github.com/Bashar-alJabi/inbs-website/actions/runs/41853315959), [Browser/accessibility audit](https://github.com/Bashar-alJabi/inbs-website/actions/runs/41853315951).
- [ ] Review deployed preview visually in both languages, light/dark, mobile/desktop, and capture feedback.
- [x] Owner requested About merge to `redesign`; PR #21 squash merged as `a13bc51`.
- [ ] Final visual confirmation of the latest About state after maintenance changes; promote to `main` separately.

## Shared links and navigation cleanup — merged PR #22 (`feature/site-content-navigation-audit` → `redesign`)

- [x] Keep `src/content/services.ts` and `src/lib/site.ts` as the canonical service and page-name sources, without changing service URLs.
- [x] Add `src/lib/routes.ts` for page/service URL generation and `src/content/navigation.ts` for shared header/drawer/footer selections.
- [x] Update the nav, footer, Home/About CTAs, fallback links and relevant metadata to reuse shared routes.
- [x] Key mobile-drawer icons by stable page slug; use `src/content/contact.ts` for shared drawer email.
- [x] Restore the subtle decorative founding-year styling and expose the year via accessible text instead of forcing dark visual contrast.
- [x] Exact-head PR #22 automated CI on `654f16f`: [Validate website](https://github.com/Bashar-alJabi/inbs-website/actions/runs/41856221285) and [Browser/accessibility audit](https://github.com/Bashar-alJabi/inbs-website/actions/runs/41856221344) both successful.
- [x] Exact-head CI on documentation commit `208e004` passed: [Validate website](https://github.com/Bashar-alJabi/inbs-website/actions/runs/41859234291), [Browser/accessibility audit](https://github.com/Bashar-alJabi/inbs-website/actions/runs/41859234322). PR #22 squash merged as `55541ca` after owner requested promotion.
- [ ] Capture final manual preview review for latest content on both locales/themes/device classes (automated checks do not replace visual sign-off).
- [ ] Before promoting `redesign` to `main`, reconcile their divergent histories (7 commits unique to `main` at review time) and verify the combined changes.
- [ ] Create and review a separate `redesign` → `main` PR; test that final integration head and deployment. Do not equate integration with full public launch.

## Footer navigation and future legal page — merged into `redesign` via PR #24

- [x] Replace Privacy Policy in Quick Links with Home; retain six nonlegal page links from the canonical page catalog.
- [x] Show five services plus a localized link to the full Services landing page, without hardcoding service names.
- [x] Combine both legal destinations into one `/[locale]/legal` placeholder in the catalog and footer; retain old links as permanent locale-specific redirects.
- [x] Add dedicated smoke and browser assertions for both locales, footer link counts and redirects.
- [ ] Obtain approved legal copy covering privacy and terms before implementing or publishing the final legal page.
- [x] Owner approved final visual review and both exact-head CI checks passed before PR #24 squash merge: [Validate](https://github.com/Bashar-alJabi/inbs-website/actions/runs/41881051213) and [browser/axe](https://github.com/Bashar-alJabi/inbs-website/actions/runs/41881052075).

## Services landing page — merged into `redesign` via PR #24

- [x] Add dedicated bilingual /en/services and /ar/services route with page-specific copy and scoped styling.
- [x] Use the canonical ten-service catalog for names, images, ordering and links, without changing detail-page status.
- [x] Add locale-aware metadata and opt-in sitemap entries for the completed landing route.
- [x] Add dedicated service-route smoke and responsive, theme, RTL and axe browser assertions.
- [x] Lint, TypeScript, production build, smoke, Playwright and axe all passed on feature head `0162eb6` (workflow links above).
- [x] Owner completed the Services visual review and signed off on the final styling/RTL fixes.
- [x] Owner authorized conditional promotion; PR #24 squash merged to `redesign` as `171e8cd`.
- [ ] Final `redesign` → `main` PR #25 CI, merge verification and deployment review.

## Cross-page ending CTA consistency — feature/team-page

- [x] Add page-specific closing CTAs to Home and About using the approved existing Home copy and new localized About text.
- [x] Use page-local CTA components with shared editorial CTA CSS for Home, About, Services and Team; retain distinct localized wording.
- [x] Add EN/AR and light/dark browser checks confirming matching backgrounds, heading sizes, padding, button geometry, hover transitions, two links, and distinct copy.
- [ ] Owner reviewed the finished Team page and cross-page closing CTA presentation (5 November 2026).

## Team hero photo gallery — feature/team-page

- [x] Replace the prior Services-like split hero with a centered, three-image editorial gallery and copy underneath.
- [x] Use the three owner-supplied WebP images directly at `public/images/team/hero-01.webp` through `hero-03.webp`, without SVG mockups.
- [x] Use responsive tilted side frames, a dominant central frame, and separate curved-trail traveling dots; support reduced motion and RTL.
- [ ] Owner uploaded all ten Team WebP images and approved final visual placement; three Hero images have localized accessible descriptions.
- [ ] After Hero approval, replace the draft middle sections with the approved integrated Team Story.

## Team page — feature/team-page (initial draft)

- [x] Implement bilingual team editorial page using a dedicated route, content module and scoped stylesheet.
- [x] Avoid invented names, roles, staff counts or representations of stock photographs as company employees.
- [x] Add metadata, localized canonical/hreflang, default noindex policy and opt-in sitemap entry.
- [x] Add route and accessibility/browser tests for EN/AR, desktop/tablet/mobile, light/dark, and links.
- [ ] Verify CI on the final commit before promotion to `redesign` or `main`; owner visual approval recorded 5 November 2026.
- [ ] Add named team profiles and authentic portraits only after explicit content approval.

## Contact page — feature/contact-page (7 November 2026)

- [x] Dedicated bilingual Contact route with a building-backdrop editorial Hero, two photo frames, direct contact channels, office location and social links, plus page-ending CTA.
- [x] **No contact form**: no inputs, submission endpoint, data collection, new dependencies or messaging backend.
- [x] Centralize displayed phone, email, office address, map destination and official social destinations in `src/content/contact.ts`; page-local EN/AR copy lives in `src/content/contact-page.ts`.
- [x] Configure stable public WebP paths for the real building, office interior and office door photos; preserve the building as the dominant Hero background, with three compact square clickable/focusable photos (building, office, door) in the lower building area and a moving border dot on each (disabled for reduced motion). Click opens a full-screen viewer with Escape, backdrop and close control.
- [ ] Owner uploads all three WebPs to `public/images/contact/` and reviews real image crops on desktop/mobile, Arabic/English and light/dark. Do not treat missing photo files as QA-complete.
- [x] Remove Contact from Coming Soon fallback and add opt-in SEO metadata, localized canonical/hreflang and sitemap entries.
- [x] Add HTTP smoke checks and browser checks for EN/AR, RTL, light/dark, mobile/tablet/desktop, no form, links, overflow and axe.
- [x] Align internal-page Hero title, lead, kicker, and CTA dimensions with shared design tokens across About, Services, all service details, Team and Contact (Home slider excluded).
- [ ] Verify exact-head lint, TypeScript, production build, HTTP smoke, Playwright and axe checks before merge, not after each visual tweak.
- [ ] Owner visual approval and authorization for merge to `redesign` (and later `main`).
- [ ] Confirm phone number supports WhatsApp **before** adding a WhatsApp link; it is intentionally omitted to avoid claiming an unverified messaging channel.
- [ ] Obtain company confirmation of contact details and business hours if hours are added later.

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

## Page architecture consistency — feature/team-page

- [x] Separate Team Hero/Story/CTA into page-local components; TeamPage composes these three sections only.
- [x] Split Services Hero/Directory/CTA into page-local components; ServicesPage now composes sections only.
- [x] Move each CTA into its corresponding Home/About/Services/Team folder; retain shared CSS for intentionally uniform visual design.
- [x] Document mandatory component boundaries and merge/test policy in root AGENTS.md.
- [x] Owner reviewed and approved Team page visuals for merging (5 November 2026).
- [ ] Validate final feature-head CI, production smoke, and browser accessibility audit before merging.

## Team visual narrative restructure — feature/team-page

- [x] Remove the text-only Team Note and its unapproved staff-profile placeholder copy.
- [x] Combine How We Work and What Guides Us in one page-local TeamStory section.
- [x] Integrate seven WebP-only image slots into opening, principle beats and closing instead of a gallery strip; no placeholder filenames or numbers are shown.
- [x] Owner uploaded hero-01.webp through hero-03.webp and story-04.webp through story-10.webp; all ten paths and WebP signatures verified.
- [x] Owner visually reviewed Team composition before requesting integration (5 November 2026).
- [ ] Company-side photo ownership/publication permissions remain to be documented before final public launch.

## Careers page — feature/careers-page (7 November 2026)

- [x] Owner reviewed Careers visuals and explicitly requested the full validation and merge workflow.
- [x] Four page-local sections: Careers Hero, Why Join INBS, Apply, and standard page-ending CTA; no Open Positions section.
- [x] Both languages have page-owned copy in `src/content/careers-page.ts`; Arabic copy is Modern Standard Arabic.
- [x] Applications link to the additional email first, official email second, and the shared mobile number via WhatsApp; Arabic number isolated as LTR.
- [x] Dedicated locale route, metadata, sitemap integration, responsive/light/dark styles and reduced-motion orbit behavior implemented.
- [x] Production HTTP smoke and Playwright/axe coverage added for Careers in both locales, three viewport sizes and both themes.
- [ ] Verify final feature-head CI (lint, types, build, smoke, browser/axe), and check integration-branch CI after merge.
- [ ] Verify updated main branch and production deployment after integration; site-wide launch approval remains a separate milestone.

## Insights page — feature/insights-page (7 November 2026)

- [x] Six substantial bilingual editorial guides with four meaningful sections each, translated in Modern Standard Arabic and English; no fabricated article authors, dates or testimonials.
- [x] Primary official reference links for business licensing, mainland/free zone options, work permits, family residence and VAT; explanatory disclaimer for changing requirements.
- [x] Dedicated Insights Hero, featured guide, filterable library and standard closing CTA, with page-local components.
- [x] Each article has a localized canonical route, SEO metadata, source link and related content; unknown slugs return 404.
- [x] Shared catalog drives cards, category filters, article pages and sitemap in both languages; no CMS, API or external image dependency.
- [x] Six distinct article Pexels sources plus a separate Insights Hero photo converted to WebP and committed under stable `public/images/insights/<slug>.webp` names; source and photographer credits documented in `SOURCES.md`.
- [x] Added production HTTP smoke paths and browser/axe coverage for both languages, responsive sizes, modes, filters and every guide.
- [x] Owner visual approval and authorization to merge (7 November 2026).
- [ ] Verify final feature-head CI (including accessibility and article contents navigation) and resolve any issues before promotion.
- [ ] Verify production deployment and current regulatory facts before public indexing.

## Legal Information — feature/legal-page (7 November 2026)

- [x] Dedicated English/Arabic policy page with privacy, terms, important notices, official reference links and contact CTA.
- [x] Existing privacy-policy and terms redirects retained to unified localized `/legal`.
- [x] Content reflects visible front-end behavior (no on-site enquiry form) without inventing cookie/retention/data-transfer promises.
- [x] Legal disclosures marked `noindex` pending operational and company legal validation.
- [ ] Company confirms legal entity information and real-world data processing, and authorizes final legal notice.
- [x] Owner approved visual design and requested promotion through `redesign` to `main` (7 November 2026).
- [ ] Verify final feature-head CI (lint, types, build, smoke, browser/axe) and promotion PR CI.
- [ ] Check production deployment independently; the Legal page remains `noindex` by owner preference.
