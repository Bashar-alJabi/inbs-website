# Content & Translation Management

This document defines **where to edit content** in the INBS bilingual site. Keep components focused on rendering. Avoid creating another copy of service names, image lists, or URLs.

## Choose the right owner

| Information | Edit here | Notes |
| --- | --- | --- |
| Supported languages and page route labels | `src/lib/site.ts` | The route list contains titles for EN/AR and stable URL slugs. |
| Service URL slugs, order, EN/AR names, and images | `src/content/services.ts` | **One catalog, keyed by slug.** Do not create aligned arrays for these values. |
| Home page marketing copy and About preview | `src/content/home.ts` | `homeContent.en/ar` and `aboutDetails.en/ar`. |
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
