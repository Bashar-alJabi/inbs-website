# INBS Website

Official frontend website for **International Network Businessmen Services (INBS)**, Dubai.

## Project status

The website is under active development. Approved changes are reviewed through pull requests into `redesign`, then selectively promoted to the company-facing `main` branch.

- `main`: company-facing preview of the approved work so far.
- `redesign`: accepted redesign work.
- `feature/*`: isolated, reviewable changes (one feature or page per PR).

## Technology

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- Arabic and English, including right-to-left support
- Vercel previews for pull requests
- No custom backend

The project uses `next-intl` for localization and Motion and Lenis for progressive animations.

## Run locally

Requirements: current Node.js LTS and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

Before a change is merged:

```bash
npm run lint
npm run build
```

## Where to change content

When the corresponding pages are implemented:

- `src/content/`: factual company information and service catalog
- `messages/en.json`, `messages/ar.json`: translated UI text
- `public/brand/`: official company logo
- `public/images/`: approved image assets
- `src/components/`: reusable layout and interface components
- `src/app/[locale]/`: page routes

**Do not edit services directly inside UI components.** Content must stay separate from presentation.

## Source of truth

The existing [INBS site repository](https://github.com/Bashar-alJabi/inbs) is the primary source for company copy and services. External profiles are not authoritative. Preserve approved facts, do not invent metrics, testimonials or legal claims. The official logo must remain unchanged.

## Handoff and development guidelines

See [docs/PROJECT-GUIDE.md](docs/PROJECT-GUIDE.md) for architecture, languages, page map, design tokens, and how the site is maintained. See [AGENTS.md](AGENTS.md) for coding conventions.

## Pull-request workflow

1. Create a fresh `feature/<page-or-task>` branch from `redesign`.
2. Keep the PR limited to one page or a shared foundation change.
3. Include screenshots, translation checks, navigation checks and build results.
4. Review the Vercel preview.
5. Merge into `redesign` after approval. Promote reviewed milestones to `main` when a company preview is needed, after validation.
