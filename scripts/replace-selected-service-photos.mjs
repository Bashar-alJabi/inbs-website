/**
 * One-time curated replacement of exactly eleven user-selected INBS service images.
 * Keep all public filenames stable so no page/component changes are needed.
 * Provenance lives in SOURCES.json and EDITORIAL-PHOTO-SOURCES.md.
 */
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const replacements = [
  {file:'public/images/services/businessmen-services.webp',id:8112156,kind:'hero'},
  {file:'public/images/services/editorial/businessmen-services-01.webp',id:36733333,kind:'editorial'},
  {file:'public/images/services/editorial/real-estate-services-01.webp',id:35027041,kind:'editorial'},
  {file:'public/images/services/editorial/real-estate-services-02.webp',id:34277650,kind:'editorial'},
  {file:'public/images/services/editorial/tourism-services-01.webp',id:3879065,kind:'editorial'},
  {file:'public/images/services/editorial/tourism-services-02.webp',id:40624401,kind:'editorial'},
  {file:'public/images/services/financial-services.webp',id:7567485,kind:'hero'},
  {file:'public/images/services/consultation-services.webp',id:8133856,kind:'hero'},
  {file:'public/images/services/customs-services.webp',id:24244232,kind:'hero'},
  {file:'public/images/services/editorial/cargo-services-01.webp',id:20821680,kind:'editorial'},
  {file:'public/images/services/editorial/citizenship-and-immigration-services-01.webp',id:35065648,kind:'editorial'},
];

for (const {file,id,kind} of replacements) {
  const url=`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1800`;
  const response=await fetch(url,{signal:AbortSignal.timeout(45000),headers:{'User-Agent':'INBS-Image-Curation/1.0'}});
  if(!response.ok)throw new Error(`${file}: HTTP ${response.status} from Pexels photo ${id}`);
  if(!(response.headers.get('content-type')||'').startsWith('image/'))throw new Error(`${file}: unexpected content type`);
  const input=Buffer.from(await response.arrayBuffer());
  if(input.length<10000||input.length>22000000)throw new Error(`${file}: implausible download size ${input.length}`);
  const transformed=sharp(input).rotate();
  const output=kind==='hero'
    ? await transformed.resize(1440,1000,{fit:'cover',position:'attention'}).modulate({brightness:1.10,saturation:1.04}).webp({quality:82,effort:5}).toBuffer()
    : await transformed.resize({width:1320,withoutEnlargement:true}).webp({quality:79,effort:5}).toBuffer();
  const metadata=await sharp(output).metadata();
  if(metadata.format!=='webp'||!metadata.width||!metadata.height)throw new Error(`Invalid WebP for ${file}`);
  await mkdir(path.dirname(file),{recursive:true});
  await writeFile(file,output);
  console.log(`Replaced ${file} with Pexels photo ${id}: ${metadata.width}×${metadata.height}, ${output.length} bytes`);
}
console.log('Eleven exact replacement paths prepared. Other images untouched.');
