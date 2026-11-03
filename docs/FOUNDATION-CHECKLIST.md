# INBS — Foundation, Homepage and Launch Checklist

_Last updated: 2026-11-03. Checked against the repository after homepage PR #16 and release PR #17._

**Legend:** checked = implemented or verified as specified; unchecked = outstanding, unverified or future work. Automated CI success is not a substitute for production launch approval.

## 1. Foundation and architecture

- [x] Next.js 16 App Router, React 19 and TypeScript with strict mode.
- [x] Locale-prefixed `/en` and `/ar` home routes with correct `lang` and `dir`.
- [x] Shared site header, footer and language/theme controls.
- [x] Dedicated Coming Soon rendering for registered unfinished routes.
- [x] Central service slugs and bilingual names in `src/lib/site.ts`.
- [x] Official INBS logo stored under `public/brand/`.
- [x] Homepage sections split into focused components under `src/components/home/`.
- [ ] Complete handoff cleanup: remove confirmed dead files/styles, consolidate duplicated functionality and centralize editable company data.
- [ ] Verify all public-facing statistics, contact facts and claims with the company.

## 2. Homepage milestone — implemented

- [x] Hero carousel with three localized slides, controls, linked services and photography.
- [x] Company facts, About preview and interactive ten-service showcase.
- [x] Achievements counters and institutional service-centre ticker.
- [x] Responsive mobile, tablet and desktop layouts.
- [x] Light and dark themes; Arabic RTL and English LTR.
- [x] Reduced-motion support for primary interactive effects.
- [x] Locally stored service WebP images with source/license records.
- [x] Homepage PR #16 merged into `redesign`.
- [x] Release PR #17 merged into `main`.
- [ ] Independent approval of homepage achievements figures; their presence in the UI does not validate their accuracy.
- [ ] Final manual design/content sign-off on real devices.

## 3. SEO and baseline security — implemented

- [x] `src/lib/seo.ts` centralizes `SITE_URL` and `SITE_INDEXABLE`; indexing defaults to disabled.
- [x] Localized homepage canonical and hreflang alternates, description and Open Graph metadata.
- [x] Sitemap only lists homepage locales when indexing is enabled.
- [x] `robots.txt` respects the indexing configuration.
- [x] Baseline security response headers configured in `next.config.ts`.
- [ ] Validate all SEO, metadata, robots and security behavior on the final production domain.
- [ ] Add and validate verified Organization/LocalBusiness structured data if approved.
- [ ] Review an appropriate Content Security Policy using the actual deployed assets/scripts.

## 4. Automated validation — implemented for current homepage

- [x] CI `validate.yml`: `npm ci`, ESLint, `tsc --noEmit`, production build and HTTP smoke checks.
- [x] CI `homepage-e2e.yml`: production-server Playwright browser testing and axe accessibility checks.
- [x] Browser coverage of 12 combinations: EN/AR × mobile/tablet/desktop × light/dark.
- [x] Tests for page loading, RTL, horizontal overflow, broken images, menu open/Escape, selected navigation endpoints and image assets.
- [x] Tests for service preview interaction, theme persistence, hero controls and reduced/normal motion scenarios.
- [x] Automated axe checks for serious/critical findings with WCAG 2.0/2.1 A/AA tags.
- [x] Latest PR #17 checks succeeded before its merge to `main`.
- [ ] Manual keyboard and screen-reader audit across representative browsers/devices.
- [ ] Manual contrast, visual, motion and theme review on real devices (not established by automated test pass).
- [ ] Lighthouse/Core Web Vitals assessment (LCP, CLS, INP) on realistic hosting/network conditions.
- [ ] Broader production security assessment beyond baseline HTTP headers and smoke tests.

## 5. New page acceptance criteria (repeat for each page)

- [ ] Complete and approved English/Arabic copy.
- [ ] Accurate route, navigation and locale switching.
- [ ] Responsive layout and light/dark review, including RTL.
- [ ] Keyboard, focus, reduced-motion, accessibility and real-device checks.
- [ ] Optimized images with legitimate usage rights and accurate alt text.
- [ ] Localized metadata, canonical, hreflang and appropriate Open Graph.
- [ ] Add finished pages to sitemap; never index Coming Soon placeholders.
- [ ] CI lint, types, build, smoke and relevant browser tests pass.
- [ ] Owner approves the feature PR before merging.

## 6. Before launch and handoff

- [ ] Confirm approved company domain and target host (including Next.js runtime support if Hostinger is selected).
- [ ] Set deployment `SITE_URL` correctly and enable `SITE_INDEXABLE=true` only at launch approval.
- [ ] Replace Coming Soon pages with approved About, Services, Team, Insights, Careers, Contact, Privacy and Terms content as required.
- [ ] Implement Contact form with validation, spam protection, secure delivery and necessary privacy notice.
- [ ] Verify the official logo, factual metrics, service descriptions, company details, business claims, social URLs, source licences and image permissions.
- [ ] Perform full-site crawl, SEO, accessibility, structured data and performance audits on final production URL.
- [ ] Validate favicon and dedicated social/OG share image; set up Search Console and agreed privacy-conscious analytics.
- [ ] Configure HTTPS, redirects, cache policy, backups, monitoring and documented maintenance/deployment workflow.
- [ ] Review legal pages, cookie/analytics consent needs and applicable regulatory requirements with the company.
- [ ] Update `README.md`, `PROJECT-GUIDE.md` and this checklist for the completed release.

## 7. Cleanup backlog before professional handoff

- [ ] Review `src/app/globals.css` for stale header/footer selectors and overlapping palette variables; remove only after reference checks.
- [ ] Review the unused/duplicated language switcher against `site-header.tsx`.
- [ ] Evaluate combining `Reveal` / `FooterReveal` into one shared motion primitive.
- [ ] Consolidate service labels and associated image paths to avoid order-dependent mappings.
- [ ] Centralize approved achievements, institution names, contact info and social URLs outside presentational components.
- [ ] Review legacy service JPEGs and default SVG files for actual references before deleting.
- [ ] Review `prepare-service-images.mjs` and its branch-specific GitHub workflow for remaining operational need and write access.
- [ ] Refresh `README.md` and project docs as each subsequent page is completed.

**Status note:** The homepage is developed and merged, and its automated tests passed. The broader website, its factual approval process, real-device audits and production launch checklist remain incomplete.
