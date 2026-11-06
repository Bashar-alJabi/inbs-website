/**
 * Download licensed editorial stock images and produce local, replaceable WebP assets.
 * Run: node scripts/prepare-service-editorial-images.mjs
 * Requires npm ci (sharp is installed with Next.js).
 */
import sharp from 'sharp';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';

const groups = {
  'businessmen-services': [7433848, 3184291],
  'real-estate-services': [12283947, 8142052],
  'website-services': [12902996, 450035],
  'typing-services': [9550363, 4792525],
  'tourism-services': [28730135, 39894364],
  'financial-services': [8297220, 4386373],
  'consultation-services': [8067939, 3184325],
  'customs-services': [6595777, 1427541],
  'cargo-services': [1544372, 5156696],
  'citizenship-and-immigration-services': [14547467, 10959397],
};
const directory = path.resolve('public/images/services/editorial');
await mkdir(directory,{recursive:true});

for (const [slug, ids] of Object.entries(groups)) {
  for (const [index,id] of ids.entries()) {
    const name=`${slug}-${String(index+1).padStart(2,'0')}.webp`;
    const url=`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
    const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
    if(!response.ok)throw new Error(`${name}: Pexels returned HTTP ${response.status} for image ${id}`);
    const type=response.headers.get('content-type')||'';
    if(!type.startsWith('image/'))throw new Error(`${name}: unexpected content type ${type}`);
    const bytes=Buffer.from(await response.arrayBuffer());
    const output=await sharp(bytes).rotate().resize({width:1320,withoutEnlargement:true})
      .webp({quality:78,effort:5}).toBuffer();
    const metadata=await sharp(output).metadata();
    if(metadata.format!=='webp'||!metadata.width||!metadata.height)throw new Error(`${name}: invalid WebP`);
    await writeFile(path.join(directory,name),output);
    console.log(`${name}: ${metadata.width}x${metadata.height}, ${output.length} bytes`);
  }
}
console.log('Prepared all 20 editorial WebP images.');
