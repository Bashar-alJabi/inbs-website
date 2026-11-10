# Contact Hero photography

The owner uploaded three real INBS location photographs. All three are tracked in this folder and displayed in the Contact Hero.

## Required filenames

| File | Placement | Suggested image |
| --- | --- | --- |
| `contact-building.webp` | Large building backdrop and first small square thumbnail | Actual office building exterior |
| `contact-office.webp` | Second small square thumbnail | Actual office interior |
| `contact-door.webp` | Third small square thumbnail | Actual entrance/door |

Save all files directly in **`public/images/contact/`** as valid optimized WebP images with exactly these filenames. They are referenced by stable CSS paths in `src/styles/contact.css`. **No JSX/TS/TypeScript, CSS, imports or Next config changes are needed after uploading.**

All three photos are now independent small square thumbnail buttons (building first, then office, then door). Hover gives a subtle zoom; clicking opens a full-screen accessible image viewer, closed by the X button, Escape or the backdrop. A tiny point travels each thumbnail border, unless reduced motion is requested. The larger building backdrop uses a softer blue-to-navy blend. Owner visual approval remains required before merging.

### Replacing an approved photo

1. Work on the authorized current feature branch and replace only the approved image, preserving its filename and valid WebP format.
2. Run `npm run dev` and review `/en/contact` and `/ar/contact`.
3. Check all three thumbnails, the large backdrop, viewer, keyboard/Escape, mobile/desktop, both themes and both locales. Confirm descriptions still match the image.
4. Follow the repository's owner-authorized validation and commit/push workflow; do not push to a historic page-development branch.

Copyright/permission: these must be photographs the company is entitled to publish. Avoid placing identifiable people or private information in the frame without approval.

## Lossless container cleanup — 9 November 2026

`contact-office.webp` was reduced from 227,632 to 180,112 bytes by removing nonvisual EXIF/XMP metadata and the now-unneeded extended container header. Its original VP8 image payload is byte-identical: no resizing, re-encoding or quality adjustment. Original orientation was 1, with no ICC profile; decoded RGB and browser RGBA comparisons confirm identical 1368×912 pixels. Building and door files, crops, overlays and the fullscreen viewer are unchanged. See `docs/FOUNDATION-CHECKLIST.md` for the measured, limited Contact LCP benefit.
