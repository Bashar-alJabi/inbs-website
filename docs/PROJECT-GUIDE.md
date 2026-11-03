# INBS — Project Architecture and Handoff Guide

_Last reviewed: 2026-11-03. Based on the merged homepage milestone (PR #16 into `redesign`, PR #17 into `main`)._

## Purpose and current status

INBS is a bilingual (English/Arabic, RTL/LTR) corporate website built with Next.js 16 App Router, React 19 and TypeScript. The application is frontend-only; it does not contain a custom backend or content management interface.

**Implemented:** shared layout (header, footer, navigation, language/theme controls), homepage sections (hero, company facts, about preview, 10-service interactive showcase, achievements and service-centre ticker), locale-aware routes, Coming Soon placeholders, base SEO, responsive styling and automated checks.

**Not yet implemented:** the actual content pages for About, Services, individual services, Team, Insights, Careers, Contact, Privacy and Terms. They currently use the generic Coming Soon route. The homepage milestone is merged; this does **not** mean the full website is launch-ready.

## Branch and release policy

- `feature/*` or `docs/*`: scoped changes based on `redesign`.
- `redesign`: integration branch for reviewed changes.
- `main`: company-facing approved milestone; the homepage milestone was promoted here via PR #17.
- Create PRs, run checks and review previews; never merge without owner approval. Keep `main` protected from direct feature commits.
- Merge commits can make branch histories differ even when all changes have been promoted. Compare content and PR status, not commit counts alone.

## Route map (current implementation)

Both `/en` and `/ar` are supported; visiting `/` redirects to `/en`.

| URL (replace `[locale]` with `en` or `ar`) | Current state |
| --- | --- |
| `/[locale]` | Implemented homepage |
| `/[locale]/about` | Coming Soon |
| `/[locale]/services` | Coming Soon |
| `/[locale]/services/[service-slug]` | Coming Soon for the ten registered service slugs |
| `/[locale]/team` | Coming Soon |
| `/[locale]/insights` | Coming Soon |
| `/[locale]/careers` | Coming Soon |
| `/[locale]/contact` | Coming Soon |
| `/[locale]/privacy-policy` | Coming Soon |
| `/[locale]/terms` | Coming Soon |

Routes and supported service slugs are defined in `src/lib/site.ts` and rendered through `src/app/[locale]/[...slug]/page.tsx` until replaced with real pages. An earlier roadmap mentioned `why-inbs`, but it is **not registered as a current route**; decide its scope before adding it. Do not use homepage anchors in place of actual page routes.

## Actual folder responsibilities

```text
src/
  app/
    layout.tsx                  # Global metadata and stylesheet imports
    page.tsx                    # Redirect / to /en
    globals.css                 # Global, fallback and placeholder styles
    [locale]/
      layout.tsx                # HTML lang/dir, translation provider, site shell
      page.tsx                  # Homepage route and localized metadata
      [...slug]/page.tsx        # Temporary Coming Soon route for registered pages
    icon.tsx                    # Generated icon using official logo
    not-found.tsx               # 404
    robots.ts, sitemap.ts      # Search crawler policy / sitemap
  components/
    home/                       # Homepage-only visual sections and motion helpers
    layout/                     # Shared header, footer, navigation and placeholders
  content/
    home.ts                     # Bilingual homepage and About-preview copy
    hero.ts                     # Bilingual hero slides and image references
  i18n/request.ts               # next-intl request config
  lib/
    site.ts                     # Locales, page routes, service slugs and labels
    seo.ts                      # SITE_URL, SITE_INDEXABLE, language alternates
  styles/
    tokens.css                  # Fonts and shared design variables
    site-layout.css             # Shared header/footer styles
    home.css                    # Homepage visual styles
messages/
  en.json, ar.json              # next-intl UI messages (currently Coming Soon)
public/
  brand/inbs-logo.png           # Official logo
  images/hero-*.webp            # Homepage hero images
  images/services/             # Service WebP images, legacy JPEGs, source records
scripts/
  smoke.mjs                     # HTTP smoke tests
  homepage-e2e.mjs              # Playwright / axe browser audit
  prepare-service-images.mjs    # Asset preparation utility
.github/workflows/
  validate.yml                  # Lint, TS, build and smoke checks
  homepage-e2e.yml              # Browser, RTL, responsiveness and accessibility
  prepare-service-images.yml    # Legacy branch-specific image preparation
docs/
  PROJECT-GUIDE.md
  FOUNDATION-CHECKLIST.md
```

Next.js reserved filenames (such as `layout.tsx`, `page.tsx`, `robots.ts` and `sitemap.ts`) must keep their framework-specific locations. Do not create empty folders or split a small component merely for symmetry.

## Where edits belong

| Change | Primary location |
| --- | --- |
| Homepage copy | `src/content/home.ts` |
| Hero slides, CTA labels and images | `src/content/hero.ts` |
| Service URLs and displayed service names | `src/lib/site.ts` |
| Homepage service photos | `public/images/services/*.webp` and image mapping in `src/components/home/services-showcase.tsx` |
| Homepage achievements figures | `src/components/home/home-achievements.tsx` (currently hardcoded; must be verified before publication) |
| Institutional-centre names | `src/components/home/home-institutions.tsx` (currently hardcoded) |
| Contact details and social URLs | `src/components/layout/site-footer.tsx` (currently hardcoded) |
| Header and navigation behavior | `src/components/layout/site-header.tsx` |
| Coming Soon messages | `messages/en.json` and `messages/ar.json` |
| Global palette and typography | `src/styles/tokens.css` (review duplicate older variables in `globals.css`) |
| Homepage appearance | `src/styles/home.css` |
| Shared header/footer appearance | `src/styles/site-layout.css` |
| Indexing configuration | `src/lib/seo.ts` and deployment environment |

**Handoff limitation:** content is not yet completely centralized. Editing TypeScript/TSX files requires a developer; there is no editor-facing CMS. Future cleanup should centralize validated services, metrics, institution and contact data without rewriting working UI unnecessarily.

## Content integrity and brand

- The legacy INBS repository (`Bashar-alJabi/inbs`) is the primary reference for company descriptions and services; it is read-only for this redesign.
- Keep all ten existing service categories and confirm names/copy with the company.
- Do not modify the official logo or invent partnerships, endorsements, testimonials or staff biographies.
- The homepage's achievements counters are presently hardcoded (`25+` years, `30+` awards, `85+` projects, `25,320+` clients). **Do not treat these as verified figures.** Obtain written approval/source evidence; reconcile the years figure with the stated 2003 founding date.
- The institutional ticker depicts service authorities/centres, **not** official logos or proof of partnership.
- Service WebP image provenance is documented in `public/images/services/SOURCES.json` and its README; review licence restrictions and identifiable-person implications before publication.
- Validate phone, email, address, opening hours and social profiles against current company records before launch.

## Development and validation

Requirements: supported Node.js LTS and npm. Use `npm ci` before testing.

```bash
npm ci
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

For local HTTP smoke tests, start the production server (`npm run start`) and run `npm run test:smoke`. `scripts/homepage-e2e.mjs` is executed by `.github/workflows/homepage-e2e.yml` using Playwright and axe on a built production server.

The homepage CI covers EN/AR, desktop/tablet/mobile, light/dark themes, menu interactions, service previews, reduced motion, asset URLs and selected WCAG A/AA checks. This is **automated coverage**, not proof of complete manual-device, Lighthouse, security, legal or production-host testing.

Standards: strict TypeScript, descriptive components, semantic HTML, keyboard access, focus styles, responsive layout, correct Arabic RTL, reduced-motion support, server components by default and no unnecessary dependencies.

## Search indexing and publishing

- `SITE_URL` overrides the configured origin (otherwise `https://inbs-uae.com` is a tentative fallback).
- `SITE_INDEXABLE` must explicitly equal `true` to allow indexing; otherwise indexing stays disabled.
- The current sitemap includes only homepage locales when indexing is enabled. Do not add Coming Soon routes.
- Every finished new page needs localized title, description, canonical/hreflang and suitable indexability before promotion.
- Verify production domain, hosting compatibility, legal pages, contact submission, SEO, accessibility, performance and security before any public launch.

## Known cleanup / handoff backlog

1. Confirm or correct homepage achievements and company/contact claims.
2. Consolidate duplicated localization logic (currently in the header and `language-switcher.tsx`); review whether the latter is unused.
3. Consider reusing shared reveal animation across `motion-elements.tsx` and `footer-reveal.tsx`.
4. Centralize service metadata and image mapping to avoid parallel arrays; move verified institution/contact facts out of components.
5. Audit old CSS selectors and duplicated color tokens before deleting; retain styles that are genuinely used.
6. Check legacy `service*.jpg/jpeg` and default SVG assets for references before removing them.
7. Review the branch-specific image-generation workflow and its write permissions; avoid scripts that edit UI code as an image-preparation side effect.
8. Keep this guide and the checklist updated in the same PR whenever file ownership, routing or editorial workflow changes.

## Ownership and PR handoff

- Developer: architecture, CI, accessibility, dependencies, SEO, production release and implementation.
- Company approver/editor: verify factual copy, metrics, legal claims, media and contact details. Nontechnical edits still need a developer or a separately approved content management system.
- Every PR should summarize scope, changed files, any dependencies, checks actually run, screenshots/previews, both languages, and outstanding approvals.

See [FOUNDATION-CHECKLIST.md](FOUNDATION-CHECKLIST.md) for current verified checks and launch blockers.
