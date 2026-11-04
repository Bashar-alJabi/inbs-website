import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root=process.cwd();
const folder=path.join(root,'public/images/services');
const sources=JSON.parse(await fs.readFile(path.join(folder,'HERO-SOURCES.json'),'utf8'));
if(sources.license!=='https://www.pexels.com/license/'||sources.assets?.length!==2)
  throw new Error('Unexpected hero photo metadata');
const allowed=new Set(['hero-services-1.webp','hero-services-2.webp']);
const only=process.argv[2];
if(only&&!allowed.has(only))throw new Error('Unknown requested hero image');
for(const item of sources.assets.filter(x=>!only||x.filename===only)){
  if(!allowed.has(item.filename)||!Number.isSafeInteger(item.id)||item.id<=0||
    item.sourceImage!==`https://images.pexels.com/photos/${item.id}/pexels-photo-${item.id}.jpeg`||
    !item.page?.startsWith('https://www.pexels.com/photo/'))
    throw new Error('Invalid Pexels source for '+item.filename);
  const response=await fetch(item.sourceImage+'?auto=compress&cs=tinysrgb&w=1600',{
    headers:{'User-Agent':'INBS-Website-Image-Preparation/1.0'},
    signal:AbortSignal.timeout(45000),
  });
  if(!response.ok)throw new Error(`Cannot retrieve Pexels photo ${item.id}: ${response.status}`);
  const input=Buffer.from(await response.arrayBuffer());
  if(input.length<20000||input.length>12000000)throw new Error('Unexpected Pexels download size');
  const target=path.join(folder,item.filename);
  await sharp(input).rotate()
    .resize(item.filename.includes('-1')?1100:1000,item.filename.includes('-1')?1400:900,{
      fit:'cover',position:'attention',withoutEnlargement:true,
    })
    .webp({quality:78,effort:6}).toFile(target);
  const info=await sharp(target).metadata(),size=(await fs.stat(target)).size;
  if(info.format!=='webp'||info.width<600||info.height<700||size>650000)
    throw new Error('Hero photo conversion validation failed: '+item.filename);
  console.log(`${item.filename}: ${info.width}x${info.height} (${size} bytes) from Pexels ${item.id}`);
}
