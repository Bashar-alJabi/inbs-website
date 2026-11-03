import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const entries = [
  {
    "slug": "businessmen-services",
    "id": 8152735,
    "url": "https://www.pexels.com/photo/people-doing-paperwork-at-a-desk-8152735/",
    "license": "https://www.pexels.com/license/"
  },
  {
    "slug": "real-estate-services",
    "id": 36198129,
    "url": "https://www.pexels.com/photo/dubai-skyline-with-modern-skyscrapers-and-reflection-36198129/",
    "license": "https://www.pexels.com/license/"
  },
  {
    "slug": "website-services",
    "id": 36496927,
    "url": "https://www.pexels.com/photo/close-up-of-programmer-typing-code-on-laptop-36496927/",
    "license": "https://www.pexels.com/license/"
  },
  {
    "slug": "typing-services",
    "id": 8867209,
    "url": "https://www.pexels.com/photo/a-person-typing-on-a-wireless-keyboard-8867209/",
    "license": "https://www.pexels.com/license/"
  },
  {
    "slug": "tourism-services",
    "id": 28730135,
    "url": "https://www.pexels.com/photo/dubai-desert-safari-adventure-at-sunset-28730135/",
    "license": "https://www.pexels.com/license/"
  },
  {
    "slug": "financial-services",
    "id": 8297220,
    "url": "https://www.pexels.com/photo/a-person-working-on-the-documents-using-a-calculator-8297220/",
    "license": "https://www.pexels.com/license/"
  },
  {
    "slug": "consultation-services",
    "id": 7433848,
    "url": "https://www.pexels.com/photo/business-partners-having-a-meeting-at-the-office-7433848/",
    "license": "https://www.pexels.com/license/"
  },
  {
    "slug": "customs-services",
    "id": 8783533,
    "url": "https://www.pexels.com/photo/cargo-containers-in-a-port-8783533/",
    "license": "https://www.pexels.com/license/"
  },
  {
    "slug": "cargo-services",
    "id": 6595777,
    "url": "https://www.pexels.com/photo/cargo-ship-at-unloading-containers-6595777/",
    "license": "https://www.pexels.com/license/"
  },
  {
    "slug": "citizenship-immigration-services",
    "id": 7310015,
    "url": "https://www.pexels.com/photo/close-up-shot-of-a-passport-and-tickets-on-top-of-a-laptop-7310015/",
    "license": "https://www.pexels.com/license/"
  }
];
const directory = path.join(process.cwd(),'public/images/services');
await fs.mkdir(directory,{recursive:true});
const written=[];
for(const item of entries){
 const url = `https://images.pexels.com/photos/${item.id}/pexels-photo-${item.id}.jpeg?auto=compress&cs=tinysrgb&w=1800`;
 const response=await fetch(url,{headers:{'User-Agent':'INBS-Website-Image-Preparation/1.0'}});
 if(!response.ok)throw new Error(`Unable to fetch ${item.slug}: HTTP ${response.status}`);
 const input=Buffer.from(await response.arrayBuffer());
 if(input.length<10000||input.length>20000000)throw new Error(`Unreasonable image size for ${item.slug}`);
 const filename=`${item.slug}.webp`;
 await sharp(input).rotate().resize(1440,1000,{fit:'cover',position:'attention'}).modulate({brightness:1.12,saturation:1.07}).webp({quality:83,effort:5}).toFile(path.join(directory,filename));
 written.push(filename);
 console.log(`Prepared ${filename}`);
}
await fs.writeFile(path.join(directory,'SOURCES.json'),JSON.stringify(entries,null,2)+'\n');
const file=path.join(process.cwd(),'src/components/home/services-showcase.tsx');
const current=await fs.readFile(file,'utf8');
const previous="const images = [3,1,2,9,4,5,6,7,8,10].map(n=>\`/images/services/service\${n}\${n===6?'.jpeg':'.jpg'}\`);";
const replacement="const images = "+JSON.stringify(entries.map(e=>"/images/services/"+e.slug+".webp"))+";";
if(!current.includes(previous)&&!current.includes(replacement))throw new Error('Unexpected services image mapping; refusing to replace');
if(current.includes(previous))await fs.writeFile(file,current.replace(previous,replacement));
console.log('All 10 image files prepared; updated service mapping.');
