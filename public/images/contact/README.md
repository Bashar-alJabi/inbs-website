# Contact Hero photography

The owner uploaded three real INBS location photographs. All three are tracked in this folder and displayed in the Contact Hero.

## Required filenames

| File | Placement | Suggested image |
| --- | --- | --- |
| `contact-building.webp` | Large building backdrop blended with the navy Contact Hero | Exterior of the actual office building; ideally landscape, width ≥ 1600px |
| `contact-office.webp` | Small square thumbnail at the lower-left of the building photo | Actual interior office photo; preferably portrait, width ≥ 900px |
| `contact-door.webp` | Second small square thumbnail alongside the office image | Actual entrance/door photo; preferably portrait, width ≥ 700px |

Save all files directly in **`public/images/contact/`** as valid optimized WebP images with exactly these filenames. They are referenced by stable CSS paths in `src/styles/contact.css`. **No JSX/TS/TypeScript, CSS, imports or Next config changes are needed after uploading.**

All three photos are now independent small square thumbnail buttons (building first, then office, then door). Hover gives a subtle zoom; clicking opens a full-screen accessible image viewer, closed by the X button, Escape or the backdrop. A tiny point travels each thumbnail border, unless reduced motion is requested. The larger building backdrop uses a softer blue-to-navy blend. Owner visual approval remains required before merging.

### Local upload workflow

1. Pull `feature/contact-page` and copy the three files into this folder.
2. Run `npm run dev` and review `/en/contact` and `/ar/contact`.
3. Then stage and push only the files:
   ```cmd
   git add public/images/contact/contact-building.webp public/images/contact/contact-office.webp public/images/contact/contact-door.webp
   git commit -m "assets(contact): add real office building, interior and entrance photos"
   git push origin feature/contact-page
   ```

Copyright/permission: these must be photographs the company is entitled to publish. Avoid placing identifiable people or private information in the frame without approval.
