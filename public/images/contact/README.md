# Contact Hero photography

This folder intentionally contains **no photographs yet**. The owner will upload three real INBS location photographs from their local computer.

## Required filenames

| File | Placement | Suggested image |
| --- | --- | --- |
| `contact-building.webp` | Large building backdrop blended with the navy Contact Hero | Exterior of the actual office building; ideally landscape, width ≥ 1600px |
| `contact-office.webp` | Primary large editorial frame in the Hero | Actual interior office photo; preferably portrait, width ≥ 900px |
| `contact-door.webp` | Secondary overlapping frame | Actual entrance/door photo; preferably portrait, width ≥ 700px |

Save all files directly in **`public/images/contact/`** as valid optimized WebP images with exactly these filenames. They are referenced by stable CSS paths in `src/styles/contact.css`. **No JSX/TS/TypeScript, CSS, imports or Next config changes are needed after uploading.**

The placeholders appear as solid navy-blue frames before the photos are uploaded. Do not merge the Contact feature until the owner has supplied the three images and inspected the result in both languages, light/dark and responsive layouts.

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
