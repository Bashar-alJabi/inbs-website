# INBS — Coding Agent Guidelines

Read `README.md` and `docs/PROJECT-GUIDE.md` before editing. Follow these rules for **every page and every change**.

## Architecture — mandatory
- Follow the established Home/About structure consistently on all pages: `src/components/<page>/<page>-page.tsx` is a **small composition file only**, importing and arranging separate section components from the same page directory.
- Each meaningful section (Hero, Intro, Directory, Gallery, Principles, CTA, etc.) gets its **own page-local TSX component**. Never place an entire page's large JSX markup in one component.
- Each page owns its own CTA component in its own page directory (`home-cta.tsx`, `about-cta.tsx`, `services-cta.tsx`, `team-cta.tsx`). Do **not** introduce a shared CTA React component that switches behavior by page name. Shared visual CSS rules and design tokens are appropriate where identical styles are intentional.
- Only extract into `src/components/shared/` when the same generic behavior is genuinely reusable across unrelated sections (e.g. Reveal). Avoid over-abstraction, duplicated data sources, wrappers for single-use markup, and unnecessary new layers.
- Keep translated content in `src/content/`, routing in `src/lib/routes.ts`, scoped styles in existing page CSS files or purposefully shared styles, and assets in `public/`. Use the canonical services catalog.
- Preserve the current project's architecture. Review comparable existing implementations **before** authoring a new page. Keep refactors narrow and do not redesign existing approved sections unintentionally.
- Review imports, TSX syntax, referenced exports, style selectors, and EN/AR text for missing commas or invalid JSX before pushing.

## Quality and workflow
- Edit only `Bashar-alJabi/inbs-website`; the old `inbs` repository is reference-only.
- Work on `feature/*` from `redesign`. Never push directly to `redesign` or `main`, or merge without explicit owner authorization.
- Keep both locales and RTL/LTR, mobile/responsive, light/dark, accessibility and reduced motion functional.
- No fabricated staff names, photos, company metrics, testimonials or endorsements. Do not alter the official logo.
- Use correct existing localized routes. Contact CTAs navigate to `/[locale]/contact` even while that page shows Coming Soon.
- For iterative visual changes, review changed files and use focused checks; batch edits to minimize Vercel deployment pressure. Do not poll CI repeatedly. Before merge, require full lint, TypeScript, production build, smoke and Playwright/axe checks.
- Never report a check as passed unless it actually passed on the relevant commit. Correct failures and update docs/checklist when architecture or content ownership changes.
