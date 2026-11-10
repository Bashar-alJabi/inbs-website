# Ten bilingual service-detail pages

## Scope and review status

All ten service-detail URLs are implemented on the current audited branch. PR #29 records the original development milestone; current audit integration follows the branch workflow in `PROJECT-GUIDE.md`. Production launch and regulated service eligibility remain separate company-side decisions. The approved Businessmen Services layout is the common reference.

## Implemented routes

Each slug below renders at `/en/services/[slug]` and `/ar/services/[slug]` using its existing image and label from `src/content/services.ts`:

- `businessmen-services`
- `real-estate-services`
- `website-services`
- `typing-services`
- `tourism-services`
- `financial-services`
- `consultation-services`
- `customs-services`
- `cargo-services`
- `citizenship-and-immigration-services`

## Page design and code ownership

- Route: `src/app/[locale]/services/[slug]/page.tsx`; validates known service slugs and locale, generates localized canonical/hreflang and Open Graph metadata.
- Composition: `src/components/service-detail/service-detail-page.tsx`; renders Hero, Overview, Offerings, Process and CTA from five separate page-section modules in the same directory.
- Copy: `src/content/service-details.ts` contains the owner-approved reference Businessmen Services copy; `src/content/service-detail-catalog.ts` contains localized copy for all remaining services and shared labels. It does not duplicate canonical service names or images.
- Visual design: `src/styles/service-detail.css` follows the approved responsive, light/dark, RTL/LTR, reduced-motion design. Shared closing CTA styles stay in `src/styles/editorial-cta.css`.
- **AREAS OF SERVICE** groups differ by service (3–5 cards) based on the owner's notes. All card action text and arrows form one accessible localized Contact link. The rest of the page sections retain the same structure.
- Existing category WebP images remain in Hero. Twenty locally hosted Pexels-derived WebP editorial photos are shown **only** inside AREAS OF SERVICE (two per service), one near the start and one near the end. Images live in `public/images/services/editorial/` and can be replaced by name. Source IDs are recorded in `public/images/services/EDITORIAL-PHOTO-SOURCES.md`.
- As of the 8 November 2026 audit preparation, all ten detail pages follow the central `SITE_INDEXABLE` gate. Their twenty localized URLs enter the sitemap only when the gate is enabled. Indexing remains disabled; no launch or content/compliance approval is implied by this preparation.
- Requests for regulated financial, customs or immigration outcomes are phrased as enquiries and service coordination, not guarantees. Programme rules, qualification, accreditation, fees and availability must be independently verified where applicable.

## Release notes

- Canonical catalog order is Businessmen → Real Estate → Website → Citizenship & Immigration → Typing → Tourism → Financial → Consultation → Customs → Cargo. Footer displays the first six, plus its existing full-directory link.
- Home Hero slide 3 primary CTA now links to Website Services (EN/AR); no other hero content or interactions change.
- Exactly 30 unique service-photo source IDs (10 hero and 20 editorial) and 30 distinct local WebP assets, with image source and filename safeguards in smoke checks.
- Services landing small Hero photo (`hero-services-2.webp`) replaced with approved candidate source while preserving the original file path; no hero layout changes.
- Reduced-motion Reveal transitions no longer animate or temporarily reduce contrast.

## Verification and release

- [x] Ten route implementations, twenty bilingual page variants.
- [x] Page-local section composition and canonical services catalog integration.
- [x] Tailored offering groups from owner-provided services.
- [x] Add 20 localized, lazy-loaded editorial WebP images in `public/` within AREAS OF SERVICE only; record original Pexels sources.
- [x] Replace external Pexels runtime references with local optimized WebP files. Verify all 20 files are present on the feature branch.
- [x] Added smoke coverage for all twenty routes and unknown slugs.
- [x] Added browser route/link assertions for all twenty variants, plus sampled mobile/tablet/desktop, theme, RTL and WCAG axe audits; image count and load assertions added for editorial photos.
- [ ] Final-head GitHub CI: ESLint, TypeScript, production build, HTTP smoke and Playwright/axe.
- [x] Owner requested final QA and branch promotion after iterative visual review of layouts, photo placement and service ordering.
- [ ] Company-side validation of regulated descriptions, programme status, and service provision rights (must precede unqualified public claims or enabling indexing).
- [ ] After current audit-head checks and owner approval, integrate the audit branch through a reviewed PR; promotion to `main` and deployment require separate authorization and integration checks.

The `[...slug]` fallback returns 404 for unknown paths; every catalog page has a dedicated route. No other published page is intentionally redesigned.
