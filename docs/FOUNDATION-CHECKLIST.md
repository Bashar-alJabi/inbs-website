# INBS — Foundation and launch checklist

## Completed: SEO and basic headers
- [x] Centralized public origin in `src/lib/seo.ts`; `SITE_URL` overrides tentative `https://inbs-uae.com`.
- [x] Explicit `SITE_INDEXABLE=true` opt-in. Defaults to noindex and robots.txt disallow.
- [x] Localized homepage canonical/hreflang and Open Graph; sitemap includes only the published homepage locales.
- [x] Baseline response security headers.

## Before expanding homepage
- [ ] Accessibility audit: keyboard, focus, RTL, motion, contrast, desktop/mobile, both themes.
- [ ] Performance: measure Lighthouse and LCP/CLS/INP on realistic deployment.
- [x] Basic HTTP smoke script for EN/AR pages, RTL, core images, robots: `SMOKE_BASE_URL=https://preview.example npm run test:smoke`.
- [ ] Browser interaction tests for theme, menu focus, links, keyboard and mobile (not covered by HTTP smoke checks).
- [x] Lightweight route-loading fallback: displayed only when a segment is really pending; no forced loading delay.
- [x] Non-blocking decorative cursor accent: fine mouse only, native pointer preserved, reduced-motion fallback.
- [ ] Review loading and cursor appearance in Arabic/English and both themes on real devices.

## With each page
- [ ] Keep Arabic and English complete and equivalent; headings, metadata, image alt, accessibility, canonical/hreflang, and links.
- [ ] Include in sitemap only after the page replaces ComingSoon. Keep incomplete pages noindex.
- [ ] Verified structured data for Organization/LocalBusiness; do not invent company details.

## Before launch and handoff to Hostinger
- [ ] Confirm company domain and hosting Next.js runtime support.
- [ ] Set `SITE_URL` in deployment environment, enable `SITE_INDEXABLE=true` only after site is ready.
- [ ] Full crawl, structured data, sitemap, robots, SEO, accessibility, security and performance audits on final URL.
- [ ] Brand OG/social image and favicon, Search Console, privacy-conscious analytics and consent if applicable.
- [ ] Complete real Contact form with validation, anti-spam, secure submission, Privacy and Terms pages.
- [ ] Assess and test CSP based on real scripts; avoid untested restrictive policies.
- [ ] Configure HTTPS, redirects, cache behavior, error monitoring, backups and maintenance.

A passing build alone does not establish visual quality.
