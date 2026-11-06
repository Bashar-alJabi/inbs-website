# Editorial imagery — local WebP files

All **20** images displayed within the **AREAS OF SERVICE** sections are local WebP assets in `public/images/services/editorial/`. Each of the ten service pages has **two** images. The first appears after the opening offering; the second appears near the end of the section (full-width when needed).

## Editing or replacing an image

Replace the matching `.webp` file below **with the exact same filename**. You do not need to edit a React component, import, or content file. Keep it a genuine WebP image (recommended width ~1320px, compressed to a reasonable size). The site serves the updated image from `/images/services/editorial/<filename>`. If a preview seems stale, rebuild/redeploy or clear the image optimization cache.

## Pexels source IDs

Stock photos are examples only. None depicts verified INBS premises, clients, staff, delivered projects, assets, partnerships, or endorsements. Verify any identifiable faces, brands or trademark rights for public campaigns.

| File in public | Original Pexels image |
| --- | --- |
| `businessmen-services-01.webp` | [Pexels 7433848](https://www.pexels.com/photo/7433848/) |
| `businessmen-services-02.webp` | [Pexels 3184291](https://www.pexels.com/photo/3184291/) |
| `real-estate-services-01.webp` | [Pexels 12283947](https://www.pexels.com/photo/12283947/) |
| `real-estate-services-02.webp` | [Pexels 8142052](https://www.pexels.com/photo/8142052/) |
| `website-services-01.webp` | [Pexels 12902996](https://www.pexels.com/photo/12902996/) |
| `website-services-02.webp` | [Pexels 450035](https://www.pexels.com/photo/450035/) |
| `typing-services-01.webp` | [Pexels 9550363](https://www.pexels.com/photo/9550363/) |
| `typing-services-02.webp` | [Pexels 6170182](https://www.pexels.com/photo/6170182/) |
| `tourism-services-01.webp` | [Pexels 28730135](https://www.pexels.com/photo/28730135/) |
| `tourism-services-02.webp` | [Pexels 39894364](https://www.pexels.com/photo/39894364/) |
| `financial-services-01.webp` | [Pexels 8297220](https://www.pexels.com/photo/8297220/) |
| `financial-services-02.webp` | [Pexels 4386373](https://www.pexels.com/photo/4386373/) |
| `consultation-services-01.webp` | [Pexels 8067939](https://www.pexels.com/photo/8067939/) |
| `consultation-services-02.webp` | [Pexels 3184325](https://www.pexels.com/photo/3184325/) |
| `customs-services-01.webp` | [Pexels 6595777](https://www.pexels.com/photo/6595777/) |
| `customs-services-02.webp` | [Pexels 1427541](https://www.pexels.com/photo/1427541/) |
| `cargo-services-01.webp` | [Pexels 1544372](https://www.pexels.com/photo/1544372/) |
| `cargo-services-02.webp` | [Pexels 5156696](https://www.pexels.com/photo/5156696/) |
| `citizenship-and-immigration-services-01.webp` | [Pexels 14547467](https://www.pexels.com/photo/14547467/) |
| `citizenship-and-immigration-services-02.webp` | [Pexels 10959397](https://www.pexels.com/photo/10959397/) |

The files were downloaded from Pexels and converted to WebP in the repository. The conversion recipe is available in `scripts/prepare-service-editorial-images.mjs`, but normally you should **replace an individual file**, rather than rerunning the script (which regenerates all 20).

Pexels's license permits use on commercial websites, subject to restrictions on standalone redistribution and implied endorsements. See https://www.pexels.com/license and https://help.pexels.com/hc/en-us/articles/360042295214-Can-I-use-the-photos-and-videos-for-a-commercial-project.

**Runtime:** all editorial image references use relative local paths, not an external CDN. The site does not depend on Pexels availability for these images.
