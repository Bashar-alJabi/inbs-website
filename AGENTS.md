# INBS Coding Agent Guidelines

Read `README.md` and `docs/PROJECT-GUIDE.md` before editing.

- Only the new `inbs-website` repository is modified. Old `inbs` is read-only source material.
- Never commit directly to `main`. Base feature branches on `redesign`.
- Keep changes scoped to the current pull request.
- Keep content separate from components. Use clear, descriptive naming and a small, consistent folder structure.
- Support English and Arabic, including `dir="rtl"` where appropriate.
- Each navigation item must route to its own page; unfinished routes display Coming Soon.
- Preserve the official INBS logo and company facts. Never fabricate team bios, statistics or testimonials.
- Build mobile-first, accessible, performant pages. Prefer native Next.js APIs and Server Components.
- Update documentation if an implementation or content editing workflow changes.
- Report `npm run lint` and `npm run build` results; do not claim tests passed unless run.
- Never merge a PR without the owner's explicit approval.
