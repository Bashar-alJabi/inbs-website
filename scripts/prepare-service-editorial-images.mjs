/**
 * Download licensed editorial stock images and produce local, replaceable WebP assets.
 * Run: node scripts/prepare-service-editorial-images.mjs
 * Requires npm ci (sharp is installed with Next.js).
 */
import sharp from 'sharp';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';

const groups = {
  'businessmen-services': [36733333, 3184291],
  'real-estate-services': [35027041, 34277650],
  'website-services': [12902996, 450035],
  'typing-services': [9550363, 6170182],
  'tourism-services': [3879065, 40624401],
  'financial-services': [8297220, 4386373],
  'consultation-services': [8067939, 3184325],
  'customs-services': [28438301, 1427541],
  'cargo-services': [20821680, 5156696],
  'citizenship-and-immigration-services': [35065648, 10959397],
};
const directory = path.resolve('public/images/services/editorial');
await mkdir(directory,{recursive:true});

const heroIds = JSON.parse(await readFile(path.resolve('public/images/services/SOURCES.json'),'utf8')).map(entry=>entry.id);
const ids = [...heroIds,...Object.values(groups).flat()];
if(new Set(ids).size !== 30)throw new Error('Each of the 30 service photos must have a unique Pexels source ID');

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
