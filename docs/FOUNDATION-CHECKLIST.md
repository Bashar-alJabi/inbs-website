# INBS — Development, QA and Company Handoff Checklist

**How to use this document:** Update it **after every completed page or feature**, when requirements change, **before every PR merge**, and again **before each release to `main` and final company handoff**. A checked box means the work was actually verified, not simply planned. Record evidence in the PR (CI link, preview, screenshots, test summary). Keep unfinished work unchecked. This checklist describes current evidence as of **November 2026**.

Milestone sections retain historical CI/approval records. Current audit results are recorded at the end; use [`HOSTINGER-LAUNCH-CHECKLIST.md`](HOSTINGER-LAUNCH-CHECKLIST.md) for future publication. Historical page-development TODOs do not imply that their implemented routes are still placeholders.

## A. Baseline / completed homepage milestone

- [x] Two locale-prefixed homepages (`/en` and `/ar`) with proper `lang` and RTL/LTR handling.
- [x] Shared header, navigation, footer, language switching, light/dark theme and responsive homepage implementation.
- [x] Historical Coming Soon fallback was implemented for the original milestone; its unused component/styles were removed during the final audit. All catalog routes now have dedicated pages; unknown paths return 404.
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
- [x] All ten Team WebP files are present and pass asset checks; three Hero images have localized accessible descriptions.
- [x] Integrated TeamStory replaces the draft middle sections and keeps seven editorial photo frames.
- [ ] Retain company sign-off for final photo placement and publication permissions; file presence does not establish rights.

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
- [x] All three Contact WebPs are tracked and displayed by the implemented gallery/viewer.
- [ ] Company confirms final image crops and publication permissions on both locales/themes and device classes.
- [x] Remove Contact from Coming Soon fallback and add opt-in SEO metadata, localized canonical/hreflang and sitemap entries.
- [x] Add HTTP smoke checks and browser checks for EN/AR, RTL, light/dark, mobile/tablet/desktop, no form, links, overflow and axe.
- [x] Align internal-page Hero title, lead, kicker, and CTA dimensions with shared design tokens across About, Services, all service details, Team and Contact (Home slider excluded).
- [ ] Verify exact-head lint, TypeScript, production build, HTTP smoke, Playwright and axe checks before merge, not after each visual tweak.
- [ ] Owner visual approval and authorization for merge to `redesign` (and later `main`).
- [ ] Confirm operational availability of the existing Careers WhatsApp destination before launch; it uses the shared mobile number. Contact remains a direct-link page without a form.
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
- [ ] Verify the approved direct telephone/email/map/social links and Careers email/WhatsApp destinations. No Contact form, submission endpoint or recruitment backend is implemented or required by the current scope.
- [ ] Privacy Policy, Terms and required legal/contact statements are approved.
- [ ] Confirm photos, brand elements, icons and licenses; no unsupported affiliation or endorsement claims.

### SEO, security and performance
- [ ] Confirm production domain and hosting support for the selected Next.js runtime.
- [ ] After launch approval, set `SITE_URL` to the official HTTPS origin and `SITE_INDEXABLE=true` in build/runtime **before the final Production build**; rebuild and verify deployed robots/sitemap. Follow the Hostinger checklist; test/preview indexing stays disabled.
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

## Home UAE map — feature/home-uae-map (7 November 2026)

- [x] Copy Contact UAE map and pointer behavior into a standalone Home component and Home-only emirate path source.
- [x] Insert map immediately before Home CTA, matching Milestones gradient for light and dark themes.
- [x] Preserve localization, office marker, reduced-motion support, and Contact's existing map unchanged.
- [x] Add homepage browser assertions for render, map labels, placement and gradient parity.
- [x] Owner approved the Home map and authorized promotion through `redesign` to `main` (7 November 2026).
- [x] Feature-head CI validated production build, smoke, responsive browser and accessibility tests prior to promotion.
- [ ] Verify promotion PR CI and deployment independently after merging.

## Home interaction fixes — INBS-A01 / INBS-A02 (8 November 2026)

- [x] Show the existing Hero slide controls below the primary and related-service CTA links on viewports up to 760px. Use compact 32px visible outlines and 16px icons inside unchanged 44px touch targets. Preserve the desktop presentation, existing labels/images, 7.5-second autoplay interval and Reduced Motion guard.
- [x] Pause the institutions ticker on focus and focus-within as well as hover; provide an inset keyboard focus outline. Leaving focus/hover resumes the existing 42-second animation. In Chromium touch emulation, tapping the existing focusable window pauses it and tapping outside resumes it; no extra control or JavaScript was needed.
- [x] Add `scripts/home-motion-e2e.mjs` and call its `runHomeMotionTests({browser, origin, test})` from the existing `scripts/homepage-e2e.mjs` suite. The focused module checks EN/AR, RTL/LTR, light/dark, widths 320/390/768/1440, both motion preferences, keyboard, mouse or touch, timing, overflow, overlap and Console/hydration errors.
- [x] Local Production validation on the uncommitted A01/A02 working tree based on `375471d`: 32 focused matrix cases plus two real-time touch Pause/Resume cases passed. The two existing desktop Hero/ticker cases also passed. Virtual-clock assertions use the visible slide index; real-time cases separately verify that the heading changes after Resume.
- [x] Focused axe checks using the already-available axe-core: 16 locale/theme/viewport combinations, before and after ticker focus, with no violations in the slide controls or ticker. This is not a claim that the full browser/axe suite passed.
- [x] Compare Hero geometry with the 16 baseline captures: heading/primary-CTA bounds and Hero height remained unchanged. Review updated mobile screenshots with the compact control row below the CTA links; the control row and keyboard focus indicator are the intended visible additions.
- [x] Final local lint and TypeScript checks passed; lint retained the same four pre-existing warnings and no errors. The current Production build passed; no dependencies or lockfile changes were made.
- [x] Owner requested the compact mobile control row below all CTA links and authorized committing/pushing A01/A02 after focused validation. Physical touch devices, Safari/WebKit and the full CI/browser suite remain part of pre-merge validation.
- [ ] Obtain separate owner authorization before any PR, merge or deployment. This batch covers A01/A02 only; A03/A04 and all other audit items remain untouched.

## Drawer and reduced-motion fixes — INBS-A03 / INBS-A04 (8 November 2026)

- [x] Lock native background scrolling while the Drawer is open, preserving the page position and existing inline styles. Keep scrollbar space only when a classic scrollbar occupied it; opening with overlay scrollbars must not narrow the page. Restore scrolling and focus without a scroll jump on close or unmount.
- [x] Coordinate the Drawer lock with `SmoothScroll`: observe the root `data-inbs-drawer-open` attribute, stop/start Lenis and disconnect the observer on cleanup. `data-lenis-prevent` on the Drawer preserves its native wheel/touch scrolling even while Lenis is stopped. Close on pathname/history changes and prevent the Drawer from reopening on Back/Forward.
- [x] Respect Reduced Motion for Drawer entry/exit and the backdrop. Preserve the normal 0.38-second Drawer transition, easing and EN/AR slide directions. Correct the Services reduced-motion selector list and its hover/focus specificity, including RTL arrows; retain normal image zoom and arrow movement.
- [x] Add `scripts/drawer-motion-e2e.mjs`, exporting `runDrawerMotionTests({browser, origin, test})` for focused runs and invoking it from the existing browser suite. No dependencies or lockfile changes were needed.
- [x] Local Production validation on the A03/A04 working tree based on `3284ba2`: 32 Drawer cases passed across EN/AR, light/dark, widths 320/390/768/1440 and both motion preferences. Each includes a short 420px-high viewport, real mouse or Chromium-emulated touch gestures, keyboard focus trapping, Escape/backdrop/button closing, scroll/focus/style restoration, navigation/history cleanup, overflow and Console/hydration checks.
- [x] All 16 focused Services hover/keyboard cases passed at widths 390/1440 across both locales, themes and motion preferences. Wait for the existing viewport Reveal to settle before placing the mouse, and assert actual hover/focus-visible state; normal zoom remains 1.055 and reduced-motion transforms are removed.
- [x] Four additional EN/AR geometry/Lenis-inertia checks passed with classic and overlay scrollbars. Eight scoped Drawer axe checks passed without violations at 390px width and heights 420/844 in both locales/themes. Capture eight screenshots and review representative EN/AR light/dark long/short views; no Drawer visual redesign was introduced.
- [x] Production build, ESLint, TypeScript and `git diff --check` passed. ESLint retains four pre-existing warnings and no errors. A01/A02, both independent maps, content, SEO and hosting settings were not changed.
- [ ] Physical iOS/Android and Safari/WebKit checks, and the full browser/CI suite, remain for pre-merge validation. Only focused tests were run for this batch. Owner authorized Commit/Push to `feature/final-codebase-audit`; PR, merge, deployment and A05 require separate instructions.

## 404 document language — INBS-A05 (8 November 2026)

- [x] Inspect the pass-through Root Layout, the document-owning Locale Layout and root not-found boundary. Let `src/app/not-found.tsx` declaratively return its own `html lang/dir` and `body` because this fallback replaces the locale document. No layout, routing/configuration, CSS or DOM language mutation was needed; keep the existing standalone 404 UI and English fallback for unsupported locales.
- [x] Add `scripts/not-found-e2e.mjs`, exporting `runNotFoundTests({browser, origin, test})`, and integrate it into the existing browser suite. Extend its earlier 404 check to assert document `lang` and `dir` too.
- [x] Local Production validation on the A05 working tree based on `c08e0f6`: all nine focused cases passed. They cover 54 hydrated 404 states (27 direct and 27 App Router navigations), EN/AR, LTR/RTL, 390/1440px and light/dark preference contexts, unknown pages/services/articles, and unsupported/unprefixed locales. Assert actual HTTP 404 for direct responses, exactly one non-nested document/body, localized text, standalone geometry, return-home cleanup and navigation without full reload.
- [x] No JavaScript, hydration or document-nesting errors in the focused runs. Distinguish the expected browser network message for each requested HTTP 404 from application Console errors; unexpected asset errors still fail the tests. Three direct Dev checks and two EN/AR internal-navigation/recovery checks also passed via the existing localhost Dev server, without changing its configuration or stopping it.
- [x] Eight axe checks of the complete hydrated 404 document passed without violations. Compare the EN/AR 390px captures against pre-change baselines: main markup, heading bounds and background are identical; screenshot pixels are identical in EN and differ by one color channel in AR, with no visible design change.
- [x] Production build, ESLint, TypeScript and `git diff --check` passed. ESLint retains four existing warnings and no errors. Next.js's initial server error shell remains unchanged; document-language assertions apply after hydration, as scoped by A05. No dependencies, content, SEO settings, A01–A04 behavior or hosting settings changed.
- [ ] Full browser/CI checks and physical-device/Safari validation remain for pre-merge review. Owner authorized Commit/Push to `feature/final-codebase-audit` only; no PR, merge, deployment or A06 work in this batch.

## SEO titles, Insights sources and service indexing — INBS-A06 / INBS-A09 (8 November 2026)

- [x] Use absolute document titles for Careers, Insights, its articles and Legal to prevent the parent template from adding INBS twice. Local Production comparison with the `ddf3886` baseline confirms exactly 18 corrected titles across 48 localized routes; Canonical, hreflang/x-default, Open Graph and descriptions are unchanged.
- [x] Make all twenty service-detail metadata entries follow `SITE_INDEXABLE` and derive their optional sitemap URLs from the canonical services catalog. Keep Legal permanently `noindex` and excluded. No environment value was changed; the local Production server still returns `noindex`, a disallow-all robots file and an empty sitemap.
- [x] The proposed u.ae work-permit parent URL returned HTTP 404 in Brave; the proposed ICP URL returned HTTP 500 with a maintenance page. Use verified alternatives only: [the government-hosted employment-law PDF, Article 6 on PDF page 7](https://assets.u.ae/api/public/content/eb65a60bbff949fa912eddd566613014?v=7174ed78#page=7) and [GDRFA's family-residence service](https://www.gdrfad.gov.ae/en/services/bf409606-56e2-11ea-0320-0050569629e8). Both returned HTTP 200; the PDF signature/content and the GDRFA heading/description were checked. Only the two `sourceUrl` fields changed; article copy, slugs and other fields match the baseline exactly.
- [x] Add `scripts/seo-regression.mjs` and invoke `runSeoRegressionTests({origin, test})` from the existing browser suite. The optional-origin form runs isolated policy checks only. The loader executes real metadata/content exports with a private environment and rendering-only stubs; it does not mutate `process.env` or start an indexable server.
- [x] All 53 focused checks passed: source URLs, three isolated policies (unset/false/true), default HTTP robots/sitemap policy, and real HTTP metadata for 48 routes. Each isolated policy checks all 48 metadata records; the enabled simulation checks 46 unique sitemap URLs, including all twenty service details with correct EN/AR/x-default alternates, and excludes Legal.
- [x] ESLint, TypeScript, Production build and `git diff --check` passed. ESLint retains four existing warnings and no errors. No full smoke/browser/accessibility suite was rerun; no dependencies, styles, service/article copy, slugs or hosting settings changed.
- [ ] Recheck external sources and public-origin crawling before launch. Owner authorized Commit/Push only; no PR, merge, deployment, global indexing activation or unrelated audit work in this batch.

## Development dependency advisory — INBS-A07 (8 November 2026)

- [x] Reproduce `npm audit --json`: eight Moderate affected-package records from one advisory, [GHSA-g3hv-75wg-m249 / CVE-2026-118764](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249). The root is `minimatch@10.2.6` at `node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch`, marked `dev: true`. The advisory concerns attacker-controlled glob amplification with `optimizationLevel >= 2`; it is not eight independent vulnerabilities.
- [x] Confirm the dependency paths using `npm ls` and `npm explain minimatch`. The eight affected packages are the nodes below (repeated arrows refer to deduplicated packages):

```text
eslint-config-next@16.4.3 (devDependency)
└─ typescript-eslint@8.72.1
   ├─ @typescript-eslint/typescript-estree@8.72.1 → minimatch@10.2.6
   ├─ @typescript-eslint/parser@8.72.1 → typescript-estree
   ├─ @typescript-eslint/utils@8.72.1 → typescript-estree
   └─ @typescript-eslint/eslint-plugin@8.72.1
      ├─ parser / utils → typescript-estree
      └─ @typescript-eslint/type-utils@8.72.1 → utils / typescript-estree
```

- [x] Separate production from development: `npm audit --omit=dev --json` reports zero vulnerabilities; `npm ls minimatch --all --omit=dev` is empty. The separately installed `minimatch@3.1.5` used by ESLint and its other plugins is outside this advisory's affected range.
- [x] Check live npm registry metadata: the latest 10.x release is still 10.2.6, while the maintainer's first patched release is 11.0.1 (latest: 11.0.5). Latest `typescript-eslint` is 8.72.1; its matching `@typescript-eslint/typescript-estree@8.72.1` still requires `minimatch: ^10.2.2`. Both current `eslint-config-next@16.4.3` and latest 16.4.5 require `typescript-eslint: ^8.56.0`, so updating that parent alone cannot resolve the issue.
- [x] Defer the dependency change: a minimatch 11 override crosses the owner's major-version restriction and the parent's declared range. npm's proposed `eslint-config-next@15.5.29` is a major downgrade from the project's Next 16 lint stack. Neither was applied; no install/update, audit fix, overrides, lint-rule exclusions or manifest/lockfile changes were made.
- [x] ESLint, TypeScript, Production build and `git diff --check` passed on the working tree based on `dd6291e`. ESLint retains its four existing warnings and no errors. No additional functional regression or full browser/smoke suite was needed because application code, test configuration and dependency versions are unchanged. The complete audit remains at eight Moderate development records; production remains at zero.
- [ ] Resolve the remaining development advisory when a patched compatible 10.x release or an upstream supported dependency path becomes available, then recheck audit, lint, TypeScript, build and any affected parser/project-glob behavior. This A07 batch records the verified deferral only; owner authorized Commit/Push of this documentation, without PR, merge, deployment or unrelated cleanup.

## Limited unused-code cleanup (8 November 2026)

- [x] Verify candidates through repository-wide references, TypeScript Language Service symbol references and manual review of all five `homeContent` consumers. Inspect dynamic imports and the route tree: only Lenis and locale JSON are dynamically imported; no loader/reflection/spread consumes the removed Home keys, and every catalog page has a dedicated route with unknown URLs handled by `notFound()`.
- [x] Remove the unreferenced `src/components/layout/coming-soon.tsx`, the unused private `OtherSlug` alias, and the unused `cos`/`sin` locals in the About orbit browser test. Retain `ServiceSlug` for the catalog's `satisfies Record<...>` constraint and `c36`/`s36` for the actual geometry calculation.
- [x] Remove exactly seven obsolete Home keys in both EN/AR: `eyebrow`, `title1`, `title2`, `lead`, `secondary`, `scroll`, `aboutText`. The other thirty values per locale and all `aboutDetails` data match the `871be0a` baseline exactly; service-detail catalog JavaScript emitted before/after removing the type alias is byte-identical. `primary` remains used by the Home CTA and `intro` by CompanyFacts.
- [x] Keep the native `<img>` in `src/app/icon.tsx`: it renders the official logo through `ImageResponse` and is used code. Keep the runtime-loaded locale bundles/provider and all CSS, including legacy Coming Soon selectors, outside this cleanup. No dependencies, active copy, styles, images, routes or component behavior changed.
- [x] ESLint, TypeScript, Production build and `git diff --check` passed. Exactly three unused-code warnings were removed; the existing ImageResponse `no-img-element` warning remains (one warning, zero errors), without suppressing it or changing lint rules.
- [x] Eight Production Home comparisons (EN/AR, light/dark, 390/1440px, Reduced Motion) preserve main text, links, accessible labels, image references and section geometry, with no overflow or Console/hydration errors. The icon PNG hash is unchanged. No screenshots were taken.
- [x] Run the existing EN/AR localized 404 assertions, eight targeted service/missing-service/missing-article HTTP checks, and the existing About orbit geometry assertion. Standalone runs needed the suite's valid-page fixture for 404 and a resource-ready fixture for SVG/SMIL; early DOMContentLoaded-only probes raced CSS/animation initialization. No assertion, threshold or test configuration was weakened or changed; the test source only lost the two unused locals.
- [ ] Full browser/smoke/axe checks remain for pre-merge validation. This batch covers confirmed unused code only; no CSS cleanup, PR, merge or deployment was performed. Owner authorized Commit/Push to the same feature branch after focused validation.

## Conservative CSS cleanup (9 November 2026)

- [x] Verify candidates using TypeScript/TSX class-expression analysis, manual review of dynamic classes and animation references, and rendered class inventories for all 48 localized routes. Remove only the obsolete Coming Soon rules, unused legacy dark selectors, unused Home institution/achievement selectors, and the unused Contact hero-panel RTL branches. Preserve live branches in mixed selector lists.
- [x] Remove the unreferenced `header-enter` keyframes and four earlier exact duplicate rules; retain their later copies and the active `header-fade`, Hero/ticker animations and motion preferences. Keep the still-referenced RTL ticker keyframes, design tokens, dynamic state selectors and independent Home/Contact map styles.
- [x] Move the nine shared `.inbs-about-link` rules/branches, including hover, focus-visible, RTL and reduced motion, from `home.css` to `shared-links.css`. Import it before `home.css` so existing page overrides retain their priority. Preserve declaration order and values; the Root Layout changes only by adding this CSS import.
- [x] PostCSS comparison confirms all retained rules, declarations, media contexts and rule order match the baseline, and all moved link declarations remain identical. All 14 CSS files parse successfully.
- [x] All 48 before/after Home/About/Contact comparisons passed: EN/AR, light/dark, 390/1440px, normal/reduced motion, shared-link hover/focus, overflow and JavaScript/hydration checks. Compare computed visual styles and element geometry with a 0.1px font-measurement tolerance; compare link geometry relative to its root during focus scrolling. No screenshot or pixel-identical claim.
- [x] Eight focused existing Home motion cases passed, covering mouse/keyboard/touch Pause/Resume, ticker hover/focus and reduced motion. Eight Home → About → Home internal-navigation cases preserve shared-link base/hover/focus styles in both locales/themes and at both widths.
- [x] Production build, ESLint and TypeScript passed; ESLint retains only the existing ImageResponse `no-img-element` warning. TypeScript was rerun successfully after the build finished generating `.next` types. No content, assets, dependencies, SEO, component behavior or test configuration changed.
- [ ] Full browser/smoke/axe and physical-device checks remain for pre-merge validation. This batch covers CSS cleanup only; owner authorized Commit/Push to the same feature branch, without PR, merge or deployment.

## Team image loading — limited performance batch (9 November 2026)

- [x] Measure the Production build before editing: 16 cold browser loads across Team EN/AR and Home/Contact/Insights/Services EN at 390/1440px. Repeat eight Team loads after the change. Brave headless, fresh contexts, CDP cache disabled, light/reduced motion, 900px height, local unthrottled network/CPU, observed until 2.5 seconds after load; three EN samples per width, one AR sample per width.
- [x] Replace only the seven story CSS backgrounds with native lazy-loaded `Image fill unoptimized` children. Preserve original asset URLs/bytes, decorative semantics, frame dimensions/borders, centered cover crops and all other Team CSS/animations. All ten original image SHA-256 hashes remain identical; Hero, maps, dependencies, fonts, content and routing are unchanged.

| Width | Team images requested before scrolling | Team image transfer before → after | Reduction | EN LCP median before → after |
| --- | --- | --- | --- | --- |
| 390px | 10 → 6 | 3,468,794 → 2,403,876 B | 30.7% | 912 → 908 ms |
| 1440px | 10 → 5 | 3,468,794 → 1,715,854 B | 50.5% | 812 → 564 ms |

- [x] These are initial Team-image network bytes including response headers, not full-visit savings; all original images still load when approached. AR produced the same request counts and image bytes. Team's eleven JavaScript files and their combined 224,482 B transfer remain identical. LCP is an exploratory local median, not a Lighthouse score, causal speed guarantee or field Core Web Vitals result.
- [x] Review the other measured resources without speculative changes: shared CSS is about 15.6 KB transferred, EN font traffic about 25 KB, and AR about 259 KB. Insights still includes article bodies in its client catalog chunk (26,991 B raw / 9,296 B local gzip for the whole chunk, not an estimated removable amount). Font migration, CSS loading isolation and changing client data contracts need separate validation; none were implemented in this batch.
- [x] Sixteen before/after Team comparisons preserve text, links, computed visual styles, frame geometry and crops across EN/AR, light/dark and 320/390/768/1440px, using a 0.15px geometry tolerance for fractional font metrics. No screenshots or pixel-identical claim. All 24 new focused regressions passed, including normal/reduced motion, deferred finale requests, full decoding, no overflow/errors and controlled delayed-image tests with zero added Layout Shift. Add `runTeamImageTests` to the existing browser suite.
- [x] Four additional EN/AR light/dark cases passed with Chromium mobile/touch emulation: real footer-link navigation to Team without a document reload, the section anchor, complete image decoding and scoped Team axe checks with no violations.
- [x] Production build, ESLint, TypeScript, script syntax and `git diff --check` passed. ESLint retains the one existing ImageResponse `no-img-element` warning. Initial EN CLS medians stayed at approximately 0.00091/0.00096; existing initial AR font/layout shifts remain observable (390px: 0.02605 before / 0.02069 after). This is not a claim of zero whole-page CLS or measured INP.
- [ ] Full browser/smoke/axe and physical-device checks remain for pre-merge validation. Owner authorized Commit/Push to the same feature branch only; no PR, merge, deployment or subsequent batch.

## Final pre-merge verification — audit branch (9 November 2026)

- [x] Verify ancestry of A01/A02, A03/A04, A05, A06/A09, the A07 deferral, TypeScript/CSS cleanup and Team performance commits through `daf93ce`. Dependencies/lockfile, hosting/SEO configuration, original image bytes and both independent map implementations match the pre-audit base. This verification changes documentation only, including the A08 handoff corrections and the Hostinger checklist.
- [x] ESLint, TypeScript and Production build passed. One existing `src/app/icon.tsx` ImageResponse native-image warning remains. `npm audit` still reports eight Moderate development-package records from minimatch; production audit reports zero. No forced update, environment change or indexing activation.

| Validation | Passed | Failed |
| --- | ---: | ---: |
| Existing HTTP Smoke | 96 | 0 |
| Existing complete Browser E2E/axe suite | 407 | 10 |
| Additional 48-route × theme × width × motion matrix | 384 | 0 |
| Additional asset HTTP/format checks, including favicon | 27 | 0 |
| Isolated enabled/disabled robots policies | 2 | 0 |
| Total cases, excluding diagnostic reruns | 916 | 10 |

- [x] Run the original browser assertions unchanged with external temporary Playwright 1.57.0 / `@axe-core/playwright` 4.14.0 tooling and available Brave Chromium. The matrix includes EN/AR, LTR/RTL, light/dark, 390/1440px and both motion preferences, 48 scoped main-content axe audits and 32 actual mouse/touch/reduced-motion map checks. Other existing tests cover 320/768px, Drawer/Lenis, Hero controls, viewer, navigation and delayed-image layout stability. Together Smoke and the extra asset checks cover all 57 public images and favicon.
- [x] All 53 existing SEO cases passed, including actual HTTP metadata for all 48 routes and private unset/false/true simulations. Enabled simulation yields 46 sitemap URLs including all 20 service details; both Legal pages stay `noindex` and excluded. Supplemental simulations cover enabled/disabled robots output without changing process environment; the real server remains non-indexable.
- [ ] **Initial merge blockers at `8312fae` (Medium; focused fix recorded below):** nine fresh-context 404 cases sampled geometry before CSS was applied (`scripts/not-found-e2e.mjs`), and the About orbit case sampled SMIL before initialization (`scripts/homepage-e2e.mjs`). A diagnostic cold 404 initially had browser-default margins/static positioning, then became the approved full-viewport layout after CSS activation. All ten original assertions passed diagnostically when load/CSS/fonts/SMIL readiness was awaited. Those diagnostic reruns did not erase the original suite's ten failures, and no application/test fix was committed during that verification.

Lighthouse 13.6.0 completed seven standard local runs, one per listed page/profile, without concurrent browser tests or score tuning. These are lab results with Lighthouse's simulated mobile/desktop profiles, not field LCP/CLS/INP or a before/after regression claim.

| Page | Performance mobile / desktop | LCP mobile / desktop (seconds) |
| --- | --- | --- |
| Home EN | 91 / 99 | 3.35 / 0.79 |
| Home AR | 86 / not run | 4.02 / not run |
| Team EN | 73 / 87 | 14.78 / 2.39 |
| Contact EN | 74 / 95 | 8.03 / 1.49 |

- [x] Accessibility and Best Practices scored 100 in all seven Lighthouse runs; SEO scored 69 because the tested pages intentionally block indexing through metadata/robots (the only failing SEO audit). Observed Lighthouse CLS ranged from 0 to approximately 0.00113. No Lighthouse runtime errors or warnings were reported.
- [ ] **High before public launch:** review simulated mobile LCP, particularly Team (14.78s) and Contact (8.03s). Lighthouse identifies their CSS Hero backgrounds as LCP elements, with late request discovery and image-delivery opportunities. No image/quality, preload, animation or performance change was made in this verification phase.
- [x] Correct obsolete branch/Coming Soon/Contact-form/legal/image instructions, content ownership and service/article editing guidance. Add `HOSTINGER-LAUNCH-CHECKLIST.md` requiring official `SITE_URL` and `SITE_INDEXABLE=true` before the final build and in runtime, rebuilding generated crawl endpoints and checking deployed robots/sitemap. This documents future actions only.
- [ ] Obtain a green original browser suite and owner authorization before PR/merge. Hosting/domain/SSL work, activation of indexing, physical-device/screen-reader approval and final company launch acceptance remain separate; nothing was merged or deployed by this verification.

## Focused merge-blocker fixes — 404 CSS / About SMIL (9 November 2026)

- [x] Distinguish a real application flash from test races. Rendering-frame probes with CSS responses held showed visible browser-default 404 styling on a cold Arabic load; the fallback relied only on Root Layout's CSS dependency. About's initial `(0, 0)` traveler positions came from querying SMIL before initialization, not incorrect motion paths.
- [x] Add only `import './globals.css'` to the standalone `src/app/not-found.tsx`. Next now associates the existing stylesheet with this boundary before revealing its content. No copied CSS, visibility workaround, document mutation, nested document, routing/configuration or layout refactor was introduced. Final colors/fonts match the preceding standalone 404 behavior in EN/AR and both theme preferences.
- [x] Wait for active stylesheet links and `document.fonts.ready` before 404 geometry checks. Add a rendering-frame regression that rejects any visible unstyled 404 frame during direct or internal navigation; waiting for CSS must not conceal an earlier flash. Retain all existing HTTP 404, locale/direction, single-document, links, overflow/navigation recovery and Console assertions.
- [x] Wait for active CSS/fonts, an advancing SVG timeline and finite, initialized transforms for all three About travelers. Preserve the original 0–24s sampling loop, three-rail geometry calculation and `<3.5` tolerance. No fixed sleep, timeout increase or application animation change. AST comparison confirms every original assertion in both test files is retained.
- [x] All ten affected original cases passed: nine 404 cases covering 54 direct/internal states and the existing About orbit geometry case. No warm-page fixture or altered navigation behavior was supplied to these focused runs.
- [x] An additional 48 focused states passed across EN/AR, light/dark preferences, 390/1440px and both motion settings: 16 cold 404 entries with the external font stylesheet response deliberately held, their 16 internal-navigation counterparts, and 16 About motion/reduced-motion states using the original geometry sampler. No unstyled 404 frames, missing styles, duplicate document elements, unexpected Console/hydration errors or changed motion paths were observed. No screenshots were taken.
- [x] Production build, ESLint, TypeScript, script syntax and `git diff --check` passed. The one existing ImageResponse native-image warning remains. The application diff is exactly one CSS import; both layouts, all style declarations, content/assets, maps, dependencies, SEO/indexing and hosting settings are unchanged.
- [ ] Re-run the complete pre-merge suite after the separately authorized performance work, as requested by the owner. The earlier 407/10 full-suite result remains historical; this follow-up reports focused success only. No LCP work, PR, merge or deployment in this batch.

## Team / Contact Hero LCP — focused performance batch (9 November 2026)

- [x] Measure Production before editing at `34703c0`, then compare the same original assets with one page-local React DOM preload per Hero. Team's LCP is the center portrait (`hero-02.webp`, 127,776 B); Contact's is the building backdrop (`contact-building.webp`, 574,458 B). Previously both were discovered through CSS with initial Low priority, later promoted by layout. Only these two measured first-view resources receive an explicit High hint.
- [x] Compare three cold Lighthouse 13.6.0 Mobile samples per page and variant, alternating Team/Contact, fresh Brave headless processes, 412×823, DPR 1.75, CPU slowdown 4, Production localhost, no concurrent browser checks. Keep indexing disabled. The table uses **DevTools actual throttling**, with request latency 562.5ms and download 1,474.56Kbps, identically before/after. Report medians, not the best sample.

| Page | Performance before → after | LCP median before → after | LCP sample ranges before → after | CLS before / after |
| --- | --- | --- | --- | --- |
| Team EN | 71 → 89 | 6.979s → 2.977s | 6.607–7.026s → 2.973–3.001s | 0.000880 / 0.000880 |
| Contact EN | 69 → 69 | 8.612s → 8.260s | 8.590–8.706s → 8.256–8.291s | 0.001195 / 0.001195 |

- [x] Confirm the mechanism, not just scores: median post-TTFB image discovery delay falls from 1,769ms to 48ms for Team and 1,768ms to 54ms for Contact. Median request start moves from about 2.34s to 0.62s. The target files transfer once each, unchanged at 128,234 / 574,916 B including HTTP headers. Team's median image load duration falls from 4.445s to 2.316s; Contact's rises from 6.192s to 7.583s because the earlier request overlaps other transfers. Paint-after-load remains tens of milliseconds. Contact's total LCP benefit is therefore limited (about 4.1%); transfer volume and competing resources remain constraints.
- [x] Also run three samples per page/variant using Lighthouse's **default simulated** mobile method, matching the earlier audit: Team Performance 73 → 73, median LCP 14.862s → 14.784s; Contact 73 → 73, 7.962s → 8.033s. This model does **not** show a reliable improvement. Do not compare its 14.78s result with the DevTools 2.98s value as a before/after gain. These are local lab measurements, not deployed or real-user Core Web Vitals.
- [x] Choose preload over replacing the approved layered backgrounds with `next/image`: the hint fixes discovery while preserving every DOM frame, original byte, crop, overlay and animation. Automatic image optimization would change delivered encodings/quality; unoptimized image elements offer no byte savings. A separate three-sample Contact trial using original unoptimized, lazy, Low-priority thumbnail elements produced median LCP 8.257s versus preload-only 8.260s: no added benefit, so fully revert that experiment.
- [x] All thirteen Team/Contact original image sizes, dimensions and SHA-256 hashes match the baseline. Client JavaScript is unchanged: Team 11 files / 224,482 B, Contact 12 / 241,314 B in the unthrottled network check. No CSS, gallery markup/logic, content, other pages, maps, dependencies, routing, SEO flags or hosting configuration changes.
- [x] All 32 new Hero resource/interaction regressions passed: initial-response hints (HTTP Link header or HTML), single original request at High priority, three original centered cover backgrounds, EN/AR, light/dark, 390/1440px, touch/keyboard/hover and normal/reduced motion. Open/decode/close every Contact fullscreen photo with Escape, close button and backdrop; preserve the existing keyboard/button focus restoration and scroll cleanup. Pointer backdrop dismissal can leave focus on body in the existing viewer; its behavior was not changed by this performance batch.
- [x] All 24 existing Team/Contact responsive and scoped axe cases passed at 390/768/1440px in both locales/themes. All 32 before/after computed-style and geometry comparisons passed (0.15px fractional-metric tolerance), including overlays, masks, text, links, frames and motion styles. No screenshot/pixel-identical claim. No horizontal overflow, missing Hero images, Console or hydration errors observed.
- [x] Production build, TypeScript, ESLint, both changed script syntax checks and `git diff --check` passed. ESLint retains the single existing ImageResponse `no-img-element` warning in `src/app/icon.tsx`. The comprehensive suite was not run in this batch.
- [ ] Contact's roughly eight-second throttled LCP and the unchanged simulated mobile results still need launch performance review. This narrowly proven discovery improvement does not close the earlier launch-performance item or establish a green full suite; the owner explicitly deferred the comprehensive rerun. No PR, merge, deployment or indexing activation.

## Contact Hero transfer — focused follow-up (9 November 2026)

- [x] Rebuild the unchanged `93992ca` Production baseline and collect three fresh Contact EN Mobile Lighthouse 13.6.0 DevTools-throttled samples, then three with only the office image container changed. Same Brave headless, fresh browser/cache, 412×823 / DPR 1.75, CPU slowdown 4, latency 562.5ms / download 1,474.56Kbps, no concurrent checks. Save raw Network logs and traces. Also compare three alternating baseline/optimized pairs with Lighthouse's default simulated mobile profile; each report confirms the expected original/optimized transfer size.
- [x] Identify the bottleneck from the actual baseline traces: building 574,458 B (574,916 B with headers), first at High priority around 0.64s, finishing around 8.22s. Office/door requests are discovered around 2.30–2.46s, dispatched around 2.51–2.66s, become High after layout and finish around 7.30–7.40s / 6.60–6.69s. Their original bodies total 394,118 B, competing with the building. All three thumbnail frames are visible in the measured first viewport (about y=524–623); deferring them until the background finishes would delay visible content. The earlier lazy/Low-priority element trial had no benefit, so do not repeat or retain that markup change.
- [x] Distinguish transfer from rendering: median actual baseline LCP comprises TTFB 574ms, discovery delay 68ms, image load 7,578ms and render delay 60ms (independent medians). Three local blocking CSS files total 21,490 B and finish around 1.50s; Google Fonts CSS is 1,705 B and finishes around 2.30s, well before the building. Local client JavaScript totals 241,314 B; the existing Google Maps iframe also downloads roughly 476KB in this trace. Maps, shared fonts, scripts and CSS are unchanged and outside this Hero-only change.
- [x] Remove only the office file's nonvisual EXIF/XMP containers and unused extended header: 227,632 → 180,112 B, saving 47,520 B (20.9% of that file). Preserve its original VP8 payload byte for byte and its 1368×912 dimensions. Orientation was 1 and no ICC profile was present. Sharp decoded RGB and browser-decoded RGBA are identical; no image quality adjustment, resize, replacement, source/component or CSS change. All other twelve Team/Contact assets retain their original hashes; Home and both maps are untouched.

| Contact Mobile method (3 samples per variant) | Performance median before → after | LCP median before → after | LCP ranges before → after | CLS before → after |
| --- | --- | --- | --- | --- |
| DevTools actual throttling | 69 → 69 | 8.284s → 8.022s | 8.283–8.288s → 7.991–8.039s | 0.001195 → 0.001195 |
| Default simulated, alternating A/B | 72 → 72 | 8.032s → 7.732s | 7.882–8.181s → 7.731–7.733s | 0–0.001195 → 0 |

- [x] Confirm the bounded benefit: Hero transfer falls exactly 969,950 → 922,430 B including headers. In actual throttling, median building load duration falls 7.578s → 7.337s and completion 8.222s → 7.956s; post-load rendering remains about 60–65ms. Saving 47,520 B at this bandwidth corresponds to roughly 258ms of transfer, consistent with the observed 262ms LCP gain. Every optimized sample beats the baseline range in both methods. Performance scores fluctuate and their medians do not improve; this is a modest, repeatable LCP/byte reduction, not a complete fix or field Core Web Vitals claim.
- [x] All 29 focused checks passed: the 16 existing Contact Hero hint/priority/request-reuse/original-image/fullscreen interaction cases across EN/AR, light/dark, 390/1440px, touch/keyboard/hover and normal/reduced motion; the 12 existing Contact responsive/scoped axe cases at 390/768/1440px; and the full 4,990,464-byte browser RGBA comparison with zero differences. All 16 Contact computed-style/geometry comparisons with the baseline passed, including crops, masks, overlays and motion styles (0.15px fractional-metric tolerance). No screenshots, overflow, missing images, Console or hydration errors. Production build, ESLint, TypeScript and `git diff --check` passed; the single pre-existing ImageResponse native-image ESLint warning remains.
- [ ] Continue launch performance review: the dominant building image remains original quality/bytes and Contact LCP is still roughly eight seconds under actual throttling. This batch does not close the earlier launch-performance item or authorize broad image-quality, shared-resource or map changes. No comprehensive suite, PR, merge, deployment or indexing activation.
