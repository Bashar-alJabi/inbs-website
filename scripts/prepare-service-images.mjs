import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// SOURCES.json is the single source for licensed photo IDs and provenance.
const sourceFile = path.join(process.cwd(), 'public/images/services/SOURCES.json');
const entries = JSON.parse(await fs.readFile(sourceFile, 'utf8'));
if (!Array.isArray(entries) || entries.length !== 10) {
  throw new Error('Expected ten licensed service image sources');
}
const seen = new Set();
for (const item of entries) {
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) ||
    !Number.isSafeInteger(item.id) || item.id <= 0 ||
    !item.url?.startsWith('https://www.pexels.com/photo/') ||
    item.license !== 'https://www.pexels.com/license/' ||
    seen.has(item.slug)
  ) throw new Error('Invalid or duplicate service image source');
  seen.add(item.slug);
}
const directory = path.join(process.cwd(),'public/images/services');
await fs.mkdir(directory,{recursive:true});
for(const item of entries){
 const url = `https://images.pexels.com/photos/${item.id}/pexels-photo-${item.id}.jpeg?auto=compress&cs=tinysrgb&w=1800`;
 const response=await fetch(url,{headers:{'User-Agent':'INBS-Website-Image-Preparation/1.0'}});
 if(!response.ok)throw new Error(`Unable to fetch ${item.slug}: HTTP ${response.status}`);
 const input=Buffer.from(await response.arrayBuffer());
 if(input.length<10000||input.length>20000000)throw new Error(`Unreasonable image size for ${item.slug}`);
 const filename=`${item.slug}.webp`;
 await sharp(input).rotate().resize(1440,1000,{fit:'cover',position:'attention'}).modulate({brightness:1.12,saturation:1.07}).webp({quality:83,effort:5}).toFile(path.join(directory,filename));
 console.log(`Prepared ${filename}`);
}
// Service image paths are declared in src/content/services.ts.
// Preparing image assets must not rewrite component source code.
console.log(`All ${entries.length} service images prepared; source metadata was left unchanged.`);
