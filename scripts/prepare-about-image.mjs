import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/** One licensed About hero asset, documented independently of service photography. */
const root = process.cwd();
const folder = path.join(root, 'public/images/about');
const source = JSON.parse(await fs.readFile(path.join(folder,'SOURCE.json'),'utf8'));
if (
  source.filename !== 'hero-about.webp' ||
  !Number.isSafeInteger(source.id) || source.id <= 0 ||
  !source.url?.startsWith('https://www.pexels.com/photo/') ||
  source.license !== 'https://www.pexels.com/license/' ||
  source.sourceImage !== `https://images.pexels.com/photos/${source.id}/pexels-photo-${source.id}.jpeg`
) throw new Error('Invalid About hero photo provenance');

const url = `${source.sourceImage}?auto=compress&cs=tinysrgb&w=2200`;
const response = await fetch(url, {
  headers: {'User-Agent':'INBS-Website-Image-Preparation/1.0'},
  signal: AbortSignal.timeout(30000),
});
if (!response.ok) throw new Error(`Unable to fetch About hero photo (HTTP ${response.status})`);
const input = Buffer.from(await response.arrayBuffer());
if (input.length < 20000 || input.length > 20000000) throw new Error('Unexpected About hero source size');

const output = path.join(folder,source.filename);
await sharp(input)
  .rotate()
  .resize(1920,1280,{fit:'cover',position:'attention',withoutEnlargement:true})
  .webp({quality:83,effort:6})
  .toFile(output);
const meta = await sharp(output).metadata();
const stats = await fs.stat(output);
if (meta.format !== 'webp' || meta.width < 1200 || meta.height < 700 || stats.size > 900000)
  throw new Error('About hero image failed dimension, format or compression validation');
console.log(`Created ${source.filename}: ${meta.width}x${meta.height}, ${stats.size} bytes from Pexels photo ${source.id}`);
