import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const origin=(process.env.E2E_BASE_URL||'http://127.0.0.1:3000').replace(/\/$/,'');
const browser=await chromium.launch({headless:true});
const failures=[];
const report=(name,error)=>{failures.push({name,message:String(error?.stack||error)});console.error('FAIL',name,String(error?.message||error))};
async function test(name,fn){try{await fn();console.log('PASS',name)}catch(e){report(name,e)}}
const sizes=[{name:'mobile',width:390,height:844},{name:'tablet',width:768,height:1024},{name:'desktop',width:1440,height:900}];
for(const locale of ['en','ar']){
 for(const size of sizes){
  for(const theme of ['light','dark']){
   const key=[locale,size.name,theme].join('/');
   const context=await browser.newContext({viewport:{width:size.width,height:size.height},deviceScaleFactor:1,reducedMotion:'reduce',colorScheme:theme});
   await context.addInitScript(t=>localStorage.getItem('inbs-theme')||localStorage.setItem('inbs-theme',t),theme);
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',error=>errors.push(String(error)));
   await test(key+' page renders',async()=>{
    const res=await page.goto(origin+'/'+locale,{waitUntil:'networkidle',timeout:45000});
    assert.equal(res?.status(),200);
    assert.equal(await page.locator('html').getAttribute('lang'),locale);
    assert.equal(await page.locator('html').getAttribute('dir'),locale==='ar'?'rtl':'ltr');
    assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('.inbs-services-option').count(),10);
    assert.equal(await page.locator('.inbs-achievement').count(),4);
    assert.equal(await page.locator('.inbs-institutions-name').count(),12);
    assert.equal(await page.locator('.inbs-institutions-track').getAttribute('dir'),'ltr');
    await page.locator('.inbs-services').scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:window.innerWidth}));
    assert.ok(widths.scroll <= widths.inner+3,'Horizontal overflow: '+JSON.stringify(widths));
    assert.equal(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.complete&&i.naturalWidth===0).length),0,'Broken image');
    assert.deepEqual(errors,[],'Browser JavaScript errors');
   });
   await test(key+' accessible landmarks',async()=>{
    const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
    const serious=a.violations.filter(v=>v.impact==='critical'||v.impact==='serious');
    assert.equal(serious.length,0,serious.map(v=>v.id+': '+v.nodes.map(n=>n.target.join(' ')).join(', ')).join(' | '));
   });
   if(size.name==='desktop'){
    await test(key+' services hover updates preview',async()=>{
     await page.locator('.inbs-services-option').nth(2).hover();
     await page.waitForTimeout(650);
     assert.match(await page.locator('.inbs-services-photo img').getAttribute('src'),/website-services.webp/);
     assert.match(await page.locator('.inbs-services-detail-link').getAttribute('href'),/website-services/);
    });
   }
   await test(key+' side menu and escape',async()=>{
    await page.getByRole('button',{name:locale==='ar'?'فتح القائمة':'Open menu'}).click();
    const drawer=page.getByRole('dialog',{name:locale==='ar'?'قائمة الصفحات':'Site navigation'});
    await drawer.waitFor({state:'visible'});
    assert.equal(await drawer.locator('nav a').count()>=6,true);
    await page.keyboard.press('Escape');
    await drawer.waitFor({state:'hidden'});
   });
   if(size.name==='desktop'&&theme==='light'){
    await test(key+' theme toggle and persistence',async()=>{
     await page.getByRole('button',{name:locale==='ar'?'تبديل المظهر الفاتح والداكن':'Toggle light and dark mode'}).click();
     assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
     await page.reload({waitUntil:'networkidle'});
     assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
    });
   }
   await context.close();
  }
 }
}
await test('service WebP files and metadata',async()=>{
 for(const slug of ['businessmen-services','real-estate-services','website-services','typing-services','tourism-services','financial-services','consultation-services','customs-services','cargo-services','citizenship-immigration-services']){
  const response=await fetch(origin+'/images/services/'+slug+'.webp');
  assert.equal(response.status,200,slug+' HTTP '+response.status);
  assert.match(response.headers.get('content-type')||'',/image\/webp/,slug);
  assert.ok((await response.arrayBuffer()).byteLength>12000,slug+' unexpectedly small');
 }
});
await test('navigation endpoints and security',async()=>{
 for(const locale of ['en','ar']){
  for(const slug of ['about','services','contact','team','privacy-policy','terms','services/businessmen-services','services/citizenship-and-immigration-services']){
   const res=await fetch(origin+'/'+locale+'/'+slug);
   assert.equal(res.status,200,locale+'/'+slug);
  }
 }
 const nope=await fetch(origin+'/en/invalid-unlisted-page');
 assert.equal(nope.status,404);
 const home=await fetch(origin+'/en');
 for(const h of ['x-content-type-options','x-frame-options','referrer-policy']) assert.ok(home.headers.get(h),h);
 const robots=await fetch(origin+'/robots.txt');assert.equal(robots.status,200);
 const sitemap=await fetch(origin+'/sitemap.xml');assert.equal(sitemap.status,200);
});
await browser.close();
console.log('\nHomepage E2E:',failures.length?'FAILED ('+failures.length+')':'PASSED');
if(failures.length)process.exitCode=1;
