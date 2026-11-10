# Hostinger — final publication checklist

Future launch procedure only: nothing here authorizes deployment, infrastructure changes or enabling indexing on a test/preview instance. Company launch approval and owner authorization are required. All boxes remain unchecked until verified on the actual hosting account and official domain.

## Before the final Production build

- [ ] Confirm the approved release commit and company approval for content, legal notices, image rights and public indexing. Legal remains permanently `noindex`.
- [ ] Verify that the selected Hostinger plan/runtime supports a persistent Node.js Next.js application, dynamic App Router routes and image optimization. This repository is not a static `out/` or plain FTP/HTML deployment. CI currently uses Node.js 24; confirm compatibility on the chosen runtime.
- [ ] Record the company-approved canonical HTTPS origin (without `/en`, `/ar` or another path) and whether `www` is canonical. Do not infer domain approval from the code's fallback value.
- [ ] Set both variables in the **build environment before `npm run build`**, and keep the same values in the running application's environment:

  ```text
  SITE_URL=https://<company-approved-official-domain>
  SITE_INDEXABLE=true
  ```

- [ ] Use exactly `true` for the launch gate. Keep it disabled on local/preview instances. Store deployment environment values through the authorized hosting process, not in committed environment files.
- [ ] Run `npm ci`, `npm run lint`, `npx tsc --noEmit`, then `npm run build` sequentially on the approved release. Run production smoke/browser checks on the resulting release environment as appropriate. Indexing-specific tests must reflect its intended policy; the audit suite's default HTTP policy intentionally expects a non-indexable test server.
- [ ] Build after setting the final origin/indexing values: `robots.txt` and `sitemap.xml` are generated during the build. Reusing an earlier non-indexable build or changing runtime variables alone can leave stale crawl endpoints.
- [ ] Configure the authorized Node service to run `npm run start` with the host-assigned port/environment, process restart policy and logs. Preserve the known working release and matching environment configuration for rollback.
- [ ] Verify approved HTTPS/certificate, domain/proxy behavior, security headers and access controls. Make any infrastructure changes only under separate owner authorization.

## Immediately after authorized publication

- [ ] Fetch `https://<official-domain>/robots.txt`: HTTP 200, public crawling allowed, no blanket `Disallow: /`, and a sitemap URL on the same official origin. `/api/` remains excluded by the existing policy.
- [ ] Fetch `/sitemap.xml`: HTTP 200, 46 unique localized URLs, all 20 service-detail URLs and 12 article URLs, correct EN/AR/x-default alternates, and no Legal URLs. Check for preview/old-domain references.
- [ ] Check representative Home, service and article HTML: one INBS in each title, correct description, official-origin Canonical, EN/AR/x-default hreflang and Open Graph. Public pages permit indexing; both Legal pages still emit `noindex`.
- [ ] Verify all 48 localized page routes, `/` locale redirect, permanent privacy/terms redirects, and actual HTTP 404 for unknown pages/services/articles. Confirm no redirect loops or canonical-origin conflicts.
- [ ] Verify images/fonts, logo/favicon, language/theme switching, mobile Drawer scrolling, Hero controls, Contact viewer, both independent maps and critical contact/application links. Confirm no Console/hydration errors or new overflow/layout shifts.
- [ ] Run final production smoke and relevant browser/accessibility checks; measure Lighthouse separately from real-user LCP/CLS/INP. Retain any `noindex` SEO-score limitation on previews in test evidence.
- [ ] Record monitoring/incident ownership, rollback steps and company acceptance. Submit the verified sitemap to Search Console only through the authorized company process.

Known maintenance notes: one intentional native-image ESLint warning in `src/app/icon.tsx` (`ImageResponse` logo), and the deferred Moderate minimatch advisory in development tooling. Production audit currently reports zero vulnerabilities. Recheck security at launch without forcing incompatible major-version changes.
