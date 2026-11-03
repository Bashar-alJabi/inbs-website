import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const origin=(process.env.E2E_BASE_URL||'http://127.0.0.1:3000').replace(/\/$/,'');
const serviceSources=JSON.parse(
 await readFile(new URL('../public/images/services/SOURCES.json',import.meta.url),'utf8'),
);
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
    const subtitleSizes=await page.locator('.homepage .inbs-section-kicker').evaluateAll(
      nodes=>nodes.map(node=>parseFloat(getComputedStyle(node).fontSize))
    );
    assert.equal(subtitleSizes.length,3,
      'Home has three editorial subtitles: About, Services and Achievements');
    const min=size.width<=760?(locale==='ar'?14:13):(locale==='ar'?18:17);
    const max=size.width<=760?(locale==='ar'?16:15):(locale==='ar'?20:19);
    assert.ok(subtitleSizes.every(px=>px>=min&&px<=max),
      'Home subtitle outside shared '+min+'–'+max+'px range: '+subtitleSizes);
    assert.ok(subtitleSizes.every(px=>Math.abs(px-subtitleSizes[0])<.1),
      'Home subtitles do not share a computed font-size: '+subtitleSizes);
    await page.locator('.inbs-services').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1100);
    const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:window.innerWidth}));
    assert.ok(widths.scroll <= widths.inner+3,'Horizontal overflow: '+JSON.stringify(widths));
    assert.equal(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.complete&&i.naturalWidth===0).length),0,'Broken image');
    assert.deepEqual(errors,[],'Browser JavaScript errors');
   });
   await test(key+' accessible landmarks',async()=>{
    const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
    const serious=a.violations.filter(v=>v.impact==='critical'||v.impact==='serious');
    assert.equal(serious.length,0,serious.map(v=>v.id+': '+v.nodes.map(n=>n.target.join(' ')+(n.failureSummary?' ('+n.failureSummary+')':'')).join(', ')).join(' | '));
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
// Exercise real motion and hero controls separately from reduced-motion audit.
for(const locale of ['en','ar']){
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
 const page=await context.newPage();
 await test(locale+' normal-motion hero and ticker',async()=>{
  await page.goto(origin+'/'+locale,{waitUntil:'networkidle'});
  const initial=await page.locator('.inbs-slide h1').innerText();
  await page.getByRole('button',{name:locale==='ar'?'الشريحة التالية':'Next slide'}).click();
  await page.waitForTimeout(1000);
  assert.notEqual(await page.locator('.inbs-slide h1').innerText(),initial);
  await page.getByRole('button',{name:locale==='ar'?'إيقاف الشرائح مؤقتاً':'Pause slides'}).click();
  assert.equal(await page.getByRole('button',{name:locale==='ar'?'تشغيل الشرائح':'Play slides'}).count(),1);
  assert.match(await page.locator('.inbs-institutions-track').evaluate(e=>getComputedStyle(e).animationName),/inbs-institutions-marquee/);
  assert.equal(await page.locator('.inbs-institutions-window').getAttribute('tabindex'),'0');
 });
 await context.close();
}
// Verify the shared language switch and full-viewport not-found experience.
for(const locale of ['en','ar']){
 const alternate=locale==='en'?'ar':'en';
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage();
 await test(locale+' language switch preserves service URL',async()=>{
  const res=await page.goto(origin+'/'+locale+'/services/cargo-services',{waitUntil:'domcontentloaded'});
  assert.equal(res?.status(),200);
  const switcher=page.locator('.inbs-header a[hreflang="'+alternate+'"]');
  assert.equal(await switcher.count(),1,'Expected a single header language switcher');
  assert.equal(await switcher.getAttribute('href'),'/'+alternate+'/services/cargo-services');
  await switcher.click();
  await page.waitForURL('**/'+alternate+'/services/cargo-services');
  assert.equal(await page.locator('html').getAttribute('lang'),alternate);
  assert.equal(await page.locator('html').getAttribute('dir'),alternate==='ar'?'rtl':'ltr');
 });
 await test(locale+' 404 localized and viewport-contained',async()=>{
  const response=await page.goto(origin+'/'+locale+'/invalid-unlisted-page',{waitUntil:'domcontentloaded'});
  assert.equal(response?.status(),404);
  const notFound=page.locator('.inbs-not-found');
  await notFound.waitFor({state:'visible'});
  assert.equal(await notFound.getAttribute('lang'),locale);
  assert.equal(await notFound.locator('h1').count(),1);
  assert.equal(await notFound.locator('.inbs-not-found-orbit').count(),3);
  assert.equal(await notFound.locator('.inbs-not-found-primary').getAttribute('href'),'/'+locale);
  const bounds=await notFound.boundingBox();
  assert.ok(bounds && bounds.y===0 && Math.abs(bounds.height-844)<=1,
   '404 must cover the mobile viewport: '+JSON.stringify(bounds));
 });
 await context.close();
}
// About page regression coverage: all locales, themes and responsive widths.
for(const locale of ['en','ar']){
 for(const size of sizes){
  for(const theme of ['light','dark']){
   const key='about/'+[locale,size.name,theme].join('/');
   const context=await browser.newContext({
    viewport:{width:size.width,height:size.height},
    reducedMotion:'reduce',colorScheme:theme,
   });
   await context.addInitScript(t=>localStorage.setItem('inbs-theme',t),theme);
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',e=>errors.push(String(e)));
   await test(key+' renders correctly',async()=>{
    const res=await page.goto(origin+'/'+locale+'/about',{waitUntil:'networkidle',timeout:45000});
    assert.equal(res?.status(),200);
    assert.equal(await page.locator('html').getAttribute('lang'),locale);
    assert.equal(await page.locator('html').getAttribute('dir'),locale==='ar'?'rtl':'ltr');
    assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
    assert.equal(await page.locator('.inbs-about-page h1').count(),1);
    const sharedLabels=await page.locator('.inbs-story-label.inbs-section-kicker')
      .evaluateAll(nodes=>nodes.map(node=>parseFloat(getComputedStyle(node).fontSize)));
    assert.equal(sharedLabels.length,3,'About has three editorial section labels');
    const expectedMin=size.width<=760?(locale==='ar'?14:13):(locale==='ar'?18:17);
    const expectedMax=size.width<=760?(locale==='ar'?16:15):(locale==='ar'?20:19);
    assert.ok(sharedLabels.every(px=>px>=expectedMin&&px<=expectedMax),
      'About subtitle outside shared '+expectedMin+'–'+expectedMax+'px range: '+sharedLabels);
    assert.ok(sharedLabels.every(px=>Math.abs(px-sharedLabels[0])<.1),
      'About subtitles must have the same computed size: '+sharedLabels);
    assert.equal(await page.locator('.inbs-story-principle').count(),3);
    assert.equal(await page.locator('.inbs-story-capability').count(),10);
    assert.equal(await page.locator('.inbs-story-capability').first().getAttribute('href'),
      '/'+locale+'/services/businessmen-services');
    assert.equal(await page.locator('.inbs-story-capability').last().getAttribute('href'),
      '/'+locale+'/services/citizenship-and-immigration-services');
    assert.equal(await page.locator('.inbs-story-outro').count(),0,'Redundant contact CTA');
    assert.equal(await page.locator('.inbs-story-all-services.inbs-about-link').count(),1);
    assert.equal(await page.locator('.inbs-story-hero-art animateMotion').count(),3);
    const network=await page.locator('.inbs-story-hero-art svg').evaluate(svg=>{
      const paths=[...svg.querySelectorAll('path')];
      const rings=[...svg.querySelectorAll(':scope > circle')];
      const travelers=[...svg.querySelectorAll('.inbs-story-traveler')];
      const routeStrings=[...svg.querySelectorAll('animateMotion')].map(m=>m.getAttribute('path'));
      return {
        paths:paths.map(p=>p.getAttribute('d')),
        ellipseCount:svg.querySelectorAll('ellipse').length,
        outerRing:rings.some(c=>c.getAttribute('r')==='265'),
        innerRing:rings.some(c=>c.getAttribute('r')==='188'),
        hub:rings.some(c=>c.getAttribute('cx')==='300'&&c.getAttribute('r')==='12'),
        halo:rings.some(c=>c.getAttribute('cx')==='300'&&c.getAttribute('r')==='22'),
        travelerCount:travelers.length,
        routes:routeStrings,
      };
    });
    assert.deepEqual(network.paths,['M35 300 H565 M300 35 V565'],
      'No extra visible lines or spokes may be drawn');
    assert.equal(network.ellipseCount,1);
    assert.ok(network.innerRing&&network.outerRing&&network.hub&&network.halo);
    assert.equal(network.travelerCount,3);
    for(const route of network.routes){
      assert.ok(route.startsWith('M300 300 L')&&route.endsWith(' L300 300'),
        'Every animation must depart from and return to the central hub');
    }
    const type=await page.evaluate(()=>{
      const label=document.querySelector('.inbs-story-label');
      const body=document.querySelector('.inbs-story-principle p');
      const link=document.querySelector('.inbs-story-all-services');
      const articles=[...document.querySelectorAll('.inbs-story-principle')];
      return {
        label:parseFloat(getComputedStyle(label).fontSize),
        body:parseFloat(getComputedStyle(body).fontSize),
        underline:getComputedStyle(link,'::after').bottom,
        gutters:articles.map(article=>{
          const box=article.getBoundingClientRect();
          const text=article.querySelector('p').getBoundingClientRect();
          return {left:text.left-box.left,right:box.right-text.right};
        }),
      };
    });
    assert.ok(type.label >= (size.width<=760?(locale==='ar'?14:13):(locale==='ar'?18:17)),
      'Section kicker outside shared responsive sizing: '+type.label);
    assert.ok(type.body>=18,'Principle text too small: '+type.body);
    assert.equal(type.underline,'0px','CTA underline must match Home');
    if(size.width>1100){
      for(const gutter of type.gutters){
        assert.ok(gutter.left>=25&&gutter.right>=25,
          'Principle body touches divider: '+JSON.stringify(gutter));
      }
    }
    await page.locator('.inbs-story-network').scrollIntoViewIfNeeded();
    // Shared Reveal transitions should finish before the axe contrast audit.
    await page.waitForTimeout(1000);
    const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:innerWidth}));
    assert.ok(widths.scroll<=widths.inner+3,'Horizontal overflow: '+JSON.stringify(widths));
    assert.equal(await page.locator('.inbs-about-page img').evaluateAll(
      images=>images.filter(i=>i.complete&&i.naturalWidth===0).length),0,'Broken About image');
    const heroSource=await page.locator('.inbs-story-hero-visual img').getAttribute('src');
    assert.match(heroSource,/hero-about\.webp/,'About must use its dedicated photo');
    const heroBlend=await page.locator('.inbs-story-hero').evaluate(hero=>{
      const visual=hero.querySelector('.inbs-story-hero-visual');
      const heroRect=hero.getBoundingClientRect();
      const photoRect=visual.getBoundingClientRect();
      const fade=getComputedStyle(hero,'::after').backgroundImage;
      const vertical=getComputedStyle(hero.querySelector('.inbs-story-hero-veil')).backgroundImage;
      return {
        left:Math.abs(heroRect.left-photoRect.left),
        right:Math.abs(heroRect.right-photoRect.right),
        fade,vertical,
      };
    });
    assert.ok(heroBlend.left<1&&heroBlend.right<1,
      'Hero photo must extend edge to edge without an RTL seam: '+JSON.stringify(heroBlend));
    assert.match(heroBlend.fade,/linear-gradient\(/);
    assert.ok(heroBlend.fade.includes(locale==='ar'?'270deg':'90deg'),
      'Hero gradient must fade inward from the text side in both locales');
    assert.ok(heroBlend.fade.includes('rgba(15, 79, 130, 0.89)'),
      'Hero fade should carry a subtle INBS blue rather than only dark navy');
    assert.match(heroBlend.vertical,/linear-gradient\(/);
    assert.deepEqual(errors,[],'About JavaScript errors');
   });
   await test(key+' accessibility',async()=>{
    const result=await new AxeBuilder({page})
      .include('.inbs-about-page')
      .withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
    const serious=result.violations.filter(v=>v.impact==='critical'||v.impact==='serious');
    assert.equal(serious.length,0,
      serious.map(v=>v.id+': '+v.nodes.map(n=>n.target.join(' ')).join(', ')).join(' | '));
   });
   await context.close();
  }
 }
}
// Sample actual animated positions, not just SVG path attribute strings.
// The point must stay on a painted axis/circle/ellipse throughout the loop.
await test('about orbit dots stay on drawn geometry through their cycles',async()=>{
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
 const page=await context.newPage();
 await page.goto(origin+'/en/about',{waitUntil:'domcontentloaded'});
 const result=await page.locator('.inbs-story-hero-art svg').evaluate(svg=>{
  const movers=[...svg.querySelectorAll('.inbs-story-traveler')];
  const samples=[];
  const cos=Math.cos(Math.PI/5),sin=Math.sin(Math.PI/5);
  // Ellipse is rotated -36 degrees, so convert points into ellipse coordinates.
  const c36=Math.cos(Math.PI/5),s36=Math.sin(Math.PI/5);
  for(let t=0;t<=24;t+=.3){
   svg.setCurrentTime(t);
   const inverse=svg.getScreenCTM().inverse();
   for(let i=0;i<movers.length;i++){
    const point=new DOMPoint(0,0).matrixTransform(movers[i].getScreenCTM()).matrixTransform(inverse);
    const dx=point.x-300,dy=point.y-300;
    const radial=Math.hypot(dx,dy);
    const axisDistance=Math.min(Math.abs(dx),Math.abs(dy));
    const ex=dx*c36-dy*s36,ey=dx*s36+dy*c36;
    const ellipseDistance=Math.abs(Math.hypot(ex/265,ey/96)-1)*96;
    const distance=Math.min(axisDistance,Math.abs(radial-188),Math.abs(radial-265),ellipseDistance);
    samples.push({i,t,x:point.x,y:point.y,distance});
   }
  }
  return samples.reduce((worst,p)=>p.distance>worst.distance?p:worst,{distance:0});
 });
 assert.ok(result.distance<3.5,'Orbit traveler left visible rails: '+JSON.stringify(result));
 await context.close();
});
await test('service WebP files and metadata',async()=>{
 assert.equal(serviceSources.length,10,'Expected 10 documented services');
 for(const {slug} of serviceSources){
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
