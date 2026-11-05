# Content & Translation Management

This document defines **where to edit content** in the INBS bilingual site. Keep components focused on rendering. Avoid creating another copy of service names, image lists, or URLs.

## Choose the right owner

| Information | Edit here | Notes |
| --- | --- | --- |
| Supported languages and page route labels | `src/lib/site.ts` | The route list contains titles for EN/AR and stable URL slugs. |
| Localized page and service URL builders | `src/lib/routes.ts` | Use `routes.home`, `routes.page`, and `routes.service` in links; do not hand-build localized URLs. |
| Header, drawer, footer page/service selections | `src/content/navigation.ts` | Defines which existing page and service records appear in each area, without duplicating their labels. |
| Service URL slugs, order, EN/AR names, and images | `src/content/services.ts` | **One catalog, keyed by slug.** Do not create aligned arrays for these values. |
| Home page marketing copy and About preview | `src/content/home.ts` | `homeContent.en/ar` and `aboutDetails.en/ar`. |
| About hero photo, source and regeneration | `public/images/about/hero-about.webp`, `public/images/about/SOURCE.json`, `scripts/prepare-about-image.mjs` | Dedicated Pexels skyline photo; no coupling to service-image catalog. |
| Full About page copy and principles | `src/content/about.ts` | `aboutPageContent.en/ar`; reuse the canonical service names from `src/content/services.ts`. |\n| Services landing page headings and editorial copy | `src/content/services-page.ts` | Landing page only; never duplicate names, slugs or images from `src/content/services.ts`. |
| Team landing copy (no unverified staff names/photos) | `src/content/team-page.ts` | People-first editorial introduction; approved real team profiles are a separate content requirement. |
| Services landing hero photos | `public/images/services/HERO-SOURCES.json` and `hero-services-{1,2}.webp` | Two independently sourced Pexels photos; convert with `scripts/prepare-services-hero-images.mjs`. Not service catalog previews. |
| Hero slides, CTA labels, related-service short labels, hero images | `src/content/hero.ts` | `heroSlides.en/ar`; service targets are typed as `ServiceSlug`. |
| Public contact details, map and social links | `src/content/contact.ts` | Shared with future Contact and other components. |
| Header, navigation and footer text | `src/content/layout.ts` | Shared bilingual labels and copy, without mixing into component markup. |
| Strings rendered using `next-intl` | `messages/en.json`, `messages/ar.json` | Currently used by Coming Soon. Add matching keys to both locales. |
| Visual icons, layout and animation | `src/components/` and `src/styles/` | Not content or translation stores. |

### Editing a service

In `src/content/services.ts`, one record owns the route, two display names and preview image:

```ts
'cargo-services': {
  en: 'Cargo Services',
  ar: 'خدمات الشحن',
  image: '/images/services/cargo-services.webp',
},
```

The key is the stable public URL slug. Its position determines display order. The services showcase chooses the icon **by slug**, never by parallel array index. Routes and footer links use the same catalog. The hero uses those slugs for its related links, while its shorter promotional labels remain in `hero.ts`.

- Change a service **name or image** in this catalog only; preserve the slug unless redirects are planned.
- To add a service, add the catalog record and its icon mapping in `src/components/home/services-showcase.tsx`, then provide the preview asset. TypeScript checks for an icon matching every slug.
- The hero's `image` property is a **hero slide background**, not a service preview. Maintain it separately.
- Keep each translation equivalent in meaning, not necessarily word-for-word.
- Do not modify company achievements or institution names as part of content restructuring.

### Editing navigation and links

- Edit **page labels and stable page slugs** in `src/lib/site.ts`; every existing menu uses those records.
- Use `routes.home(locale)`, `routes.page(locale, slug)`, and `routes.service(locale, slug)` from `src/lib/routes.ts` for navigation and CTAs. Do not duplicate URL strings in components.
- Edit **which pages are visible** in each menu and **which services the footer lists** in `src/content/navigation.ts`. The service catalog still controls the names and order.
- Footer Quick Links include Home plus the six nonlegal pages; the Services column lists the first five services and a localized link to the full directory. Labels for Home and the directory CTA live in `src/content/layout.ts`.
- Privacy Policy and Terms & Conditions will be sections of **one future legal page**, `/[locale]/legal`. The footer has one localized "Legal Information" link; historic `/[locale]/privacy-policy` and `/[locale]/terms` URLs permanently redirect to it via `next.config.ts`. Legal copy is not yet approved or published.
- Existing links are preserved. Changing a slug is a public URL change and needs a redirect and link/SEO audit, not just a content edit.
- The language switcher intentionally preserves the current path while replacing the locale segment.

### Translation rules for new and updated pages

1. For bilingual page-specific copy, use a localized content object in `src/content/` (e.g. `homeContent[locale]`). Keep presentation components free of new inline EN/AR strings. Homepage UI labels are in `homeContent` alongside the page copy.
2. For shared layout strings, use `layoutContent[locale]`. For UI messages rendered with `next-intl` (e.g. Coming Soon), use matching keys in both `messages/*.json` files, not a second content dictionary.
3. Keep brand-neutral identifiers, service slugs and image paths outside translations. Only user-visible labels are localized.
4. Preserve intentionally short promotional labels in context (e.g. hero related-service labels); do not substitute long official service names without reviewing the design.
5. Existing inline labels in legacy components may remain until that component is deliberately migrated; **do not start a second competing store for the same text**.
6. Verify both `/en` and `/ar`, RTL, responsive display, links, and dark/light presentation after edits.

`src/lib/site.ts` is for routing, not duplicated service metadata. Existing imports of `serviceNames` and `serviceSlugs` are compatibility re-exports from the one service catalog.

## Validation

Run lint, type checks, build and browser tests through the PR workflows. Check representative paths including `/en/services/cargo-services`, `/ar/services/cargo-services`, homepage service selection, and hero links before approving content changes.

### Page-owned CTAs with shared visual styling

- `src/components/home/home-cta.tsx`, `src/components/about/about-cta.tsx`, `src/components/services/services-cta.tsx`, and `src/components/team/team-cta.tsx` own their respective JSX, translations, navigation, and CTA buttons. There is **no shared CTA React component**.
- All four intentionally share the same CSS presentation in `src/styles/editorial-cta.css` (imported once by root layout) and background token `--inbs-cta-surface` from `src/styles/tokens.css`. Use this shared style layer only for uniform visual treatment; keep page content and behavior local.
- Localized copy lives in the corresponding `src/content/home.ts`, `about.ts`, `services-page.ts`, and `team-page.ts` files.
- Each CTA has a primary link to `/[locale]/contact`; secondary links go to a relevant page (Home/About → Services, Services → Team, Team → Services).

### Team Hero photos

The three photo frames in `src/components/team/team-hero.tsx` load directly from `public/images/team/hero-01.webp`, `hero-02.webp`, and `hero-03.webp` through CSS backgrounds in `src/styles/team.css`. When the files are absent, the frames remain empty. Upload approved WebP files using these exact names and redeploy: the images appear automatically. No fallback files, file checks, JavaScript logic or code changes are required. Crop is controlled by `background-size: cover`; review it after the real photos are added. Update accessible descriptions when images are confirmed.

### Team story — seven integrated photos

The Team page is now strictly **Hero → TeamStory → CTA**. The previous placeholder Team Note is removed. TeamStory combines the former How We Work and What Guides Us copy with seven photo slots, integrated into an editorial layout rather than an isolated gallery. Upload approved WebP images to `public/images/team/story-04.webp`, `story-05.webp`, `story-06.webp`, `story-07.webp`, `story-08.webp`, `story-09.webp`, `story-10.webp`. The CSS references exactly one WebP file per frame; missing files leave visually reserved frames with no fallback or placeholder copy. Desktop/mobile/RTL/dark styles are in `src/styles/team.css`. These editorial images are currently decorative until approved photos and accurate descriptions are available.
