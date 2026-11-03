# INBS homepage service photography

These 10 WebP images are adapted from Pexels photographs. The source page of each image, its Pexels photo ID, and the applicable license page are recorded in [SOURCES.json](./SOURCES.json).

License reference: https://www.pexels.com/license/

Pexels permits free use, including commercial website use, subject to its license restrictions. Do not infer permission to use identifiable people or trademarks for endorsements. No source photograph is presented as a photograph of INBS staff or clients.

The service images are stored locally as optimized WebP files. The website resolves their paths from `src/content/services.ts`; the previous `service1.jpg`–`service10.jpg`/`.jpeg` copies were removed because the current website and preparation script no longer use them. If rollback is needed, the legacy files remain available in Git history.

To regenerate assets from their original source URLs, use `node scripts/prepare-service-images.mjs` in a Node environment with dependencies installed.
