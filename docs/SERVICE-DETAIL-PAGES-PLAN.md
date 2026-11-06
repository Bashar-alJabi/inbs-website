# Service detail pages — implementation milestone

Status: Planning only. No service detail page has been implemented by this initial commit.

## Scope

Implement all **ten** bilingual service detail pages on the single branch `feature/service-detail-pages` and under one draft PR targeting `redesign`. Work through and review individual services incrementally without creating separate feature branches or PRs.

Service URL slugs (keep unchanged):
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

## Constraints

- Reuse the canonical names, slugs and preview image references in `src/content/services.ts`; do not duplicate the service catalog.
- Preserve Next.js architecture, localized routes `/[locale]/services/[slug]`, English/Arabic, RTL, SEO, responsive design, light/dark and accessibility.
- Place section components and editorial text in maintainable, appropriately scoped modules; reuse truly generic behavior without introducing a giant shared conditional component.
- Do not invent company-specific offerings, prices, legal claims, statistics or guarantees. Content and imagery require review.
- Keep unfinished routes and other approved pages unchanged.
- Minimize Vercel preview deployments by grouping reviewed updates.
- Before merge: owner visual approval for all ten service pages; complete lint, TypeScript, production build, route/asset smoke, Playwright and axe in both locales and relevant viewports.
- Merge this single PR into `redesign` only when all pages pass. Promote the completed milestone to `main` through the normal separate release PR.

## Progress

- [x] Create the shared feature branch from `redesign`.
- [x] Open a single draft PR for the ten-page milestone.
- [x] Establish the initial editorial page architecture and bilingual content structure (Businessmen Services reference).
- [ ] Review the implemented Businessmen Services reference page visually; implement and review remaining nine service detail pages.
- [ ] Update project documentation/checklists to reflect final implementation.
- [ ] Pass final-head CI and owner review.
- [ ] Merge into `redesign`, then promote to `main`.

## First implementation — Businessmen Services

- Implemented `/en/services/businessmen-services` and `/ar/services/businessmen-services` using the existing service image and canonical name.
- Built page-local Hero, Overview, Offerings, Process and CTA sections, with all bilingual copy in `src/content/service-details.ts`.
- Grouped the owner's supplied services into five scannable areas; wording intentionally avoids guarantees about external approval and bank outcomes.
- Remaining nine detail routes continue to show Coming Soon and remain unindexed; Businessmen Services is also noindex pending visual approval.
- Next: review rendered layout, mobile / RTL and light / dark appearance; verify CI before marking this reference page approved.
