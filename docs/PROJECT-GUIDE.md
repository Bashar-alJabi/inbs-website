# INBS — Project and Handoff Guide

## Purpose
A premium, trustworthy bilingual company website, built as a frontend-only Next.js application. It must be easy for developers to extend and for company staff to locate and edit textual content.

## Current phase
The foundation is the **shared infrastructure**, not the design of the homepage. It establishes routing, reusable components, brand tokens, content boundaries and contributor documentation before any full page is designed.

## Canonical routes
Every route is available in both languages by replacing `/en` with `/ar`.

| Route | Purpose |
| --- | --- |
| `/[locale]` | Home |
| `/[locale]/about` | About |
| `/[locale]/services` | Service index |
| `/[locale]/services/[slug]` | Individual service |
| `/[locale]/why-inbs` | Why INBS |
| `/[locale]/team` | Real team photos and verified biographies |
| `/[locale]/insights` | Articles when approved content is available |
| `/[locale]/careers` | Careers |
| `/[locale]/contact` | Contact |
| `/[locale]/privacy-policy` | Privacy |
| `/[locale]/terms` | Terms |

Unfinished pages must show a branded Coming Soon page at their own URL. **Never use homepage anchor links instead of page navigation.**

## Content and brand
- Primary source: the existing INBS repository (English and Arabic translation data and service pages).
- Keep all ten existing service categories; review source inconsistencies before publishing rewritten text.
- Official logo is immutable. Colors sampled from the provided logo include `#05478F`, `#1365AF`, `#6BB3EC`, `#EFFAFB`. Secondary neutrals may support contrast and accessibility.
- Preserve authentic team images; do not invent staff identities or testimonials.
- Contact details, working hours and company history must come from the old site unless the company provides updated information.
- Avoid unsupported guarantees about licensing, visa outcomes, financial results or approvals.

## Architecture (target)
```text
src/
  app/
    [locale]/          # page routes and language-specific layout
    globals.css        # global style and design tokens
  components/
    layout/            # navigation, header, footer
    ui/                # accessible reusable primitives
    sections/          # shared page sections, when justified
  content/             # typed company and service data
  i18n/                # locale configuration and translation helpers
  lib/                 # small pure utilities
messages/
  en.json
  ar.json
public/
  brand/
  images/
docs/
  PROJECT-GUIDE.md
```

**Folders are added only when used.** Avoid creating a large empty architecture.

## Coding standards
- TypeScript strict mode. Prefer Server Components; use Client Components only for interactions.
- Keep page files concise and presentational. Put shared information in typed data files.
- Small descriptive components. No giant one-file pages, dead code, duplicate logic, or unnecessary dependencies.
- Mobile-first CSS. Use semantic landmarks, accessible labels, keyboard navigation, visible focus states, meaningful image alt text and reduced-motion support.
- Respect RTL layout and language metadata. Do not translate URLs or structured data ad hoc.
- SEO per page (title, description, canonical/hreflang, sitemap) before production.
- Never commit keys. Forms must use a vetted free-tier external provider (Formspree is a candidate) and include required privacy text.
- Prefer Next.js built-in features over extra libraries unless a clear need exists.

## Ownership and review
- Developer: build, test, maintain dependencies, document changes.
- Company editor: update approved text and assets in the designated content folders; no need to change layout code.
- Each PR must document: changed files, new dependencies, pages affected, local checks, preview link and any items awaiting company approval.

## Definition of done for foundation
- Locale-prefixed routes and correct Arabic/English direction
- Shared, accessible header/footer and language switcher
- Dedicated Coming Soon route content for unfinished pages
- Typed services/content source from the original site
- Brand tokens and official logo asset
- Lint, TypeScript and production build checks
- Clear README and handoff instructions

A documentation-only commit does **not** mean the foundation itself is finished.
