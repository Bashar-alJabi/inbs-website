# Ten bilingual service-detail pages

## Scope and review status

All ten service-detail URLs are implemented on `feature/service-detail-pages` under one draft PR #29 targeting `redesign`. **Implementation is not the same as owner visual approval or public launch.** The approved Businessmen Services layout is the common reference.

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
- All ten detail pages stay `noindex` pending complete content review and production-release permission. The sitemap remains limited to the previously approved site pages.
- Requests for regulated financial, customs or immigration outcomes are phrased as enquiries and service coordination, not guarantees. Programme rules, qualification, accreditation, fees and availability must be independently verified where applicable.

## Verification and release

- [x] Ten route implementations, twenty bilingual page variants.
- [x] Page-local section composition and canonical services catalog integration.
- [x] Tailored offering groups from owner-provided services.
- [x] Add 20 localized, lazy-loaded editorial WebP images in `public/` within AREAS OF SERVICE only; record original Pexels sources.
- [x] Replace external Pexels runtime references with local optimized WebP files. Verify all 20 files are present on the feature branch.
- [x] Added smoke coverage for all twenty routes and unknown slugs.
- [x] Added browser route/link assertions for all twenty variants, plus sampled mobile/tablet/desktop, theme, RTL and WCAG axe audits; image count and load assertions added for editorial photos.
- [ ] Final-head GitHub CI: ESLint, TypeScript, production build, HTTP smoke and Playwright/axe.
- [ ] Owner review of the remaining nine page layouts and their bilingual editorial content.
- [ ] Company-side validation of regulated descriptions, programme status, and service provision rights.
- [ ] Once all checks and reviews pass, owner-authorized merge of PR #29 to `redesign`; promote to `main` by a separate release PR.

The old `[...slug]` fallback continues to handle unfinished non-service pages. No other published page is intentionally redesigned.
