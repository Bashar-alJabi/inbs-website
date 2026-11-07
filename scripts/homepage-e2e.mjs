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
const expectedServiceSlugs=[
 'businessmen-services','real-estate-services','website-services',
 'citizenship-and-immigration-services','typing-services','tourism-services',
 'financial-services','consultation-services','customs-services','cargo-services',
];
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
    const desktopType=await page.evaluate(()=>{
      const px=selector=>parseFloat(getComputedStyle(document.querySelector(selector)).fontSize);
      return {
        heroBrand:px('.inbs-hero-eyebrow'),
        related:px('.inbs-hero-service-strip'),
        footerBrand:px('.inbs-footer-top p'),
        nav:[...document.querySelectorAll('.inbs-primary-nav a')].map(a=>({
          href:a.getAttribute('href'),
          px:parseFloat(getComputedStyle(a).fontSize),
        })),
      };
    });
    if(size.width>=1151){
      assert.equal(desktopType.heroBrand,14,'Desktop hero brand label');
      assert.equal(desktopType.related,14,'Desktop related-service links');
      assert.equal(desktopType.footerBrand,14,'Desktop footer brand label');
      assert.deepEqual(desktopType.nav.map(a=>a.href),
        ['/'+locale,'/'+locale+'/about','/'+locale+'/services'],
        'Primary navigation must include Home, About and Services only');
      assert.ok(desktopType.nav.every(a=>a.px===15),'Desktop nav links should be 15px');
      const primary=page.locator('.inbs-primary-nav');
      assert.equal(await primary.getByRole('link',{name:locale==='ar'?'فريق العمل':'Our Team'}).count(),0);
    }else{
      assert.equal(desktopType.heroBrand,11,'Small-screen hero brand remains unchanged');
      assert.equal(desktopType.related,12,'Small-screen service strip remains unchanged');
      assert.equal(desktopType.footerBrand,11,'Small-screen footer brand remains unchanged');
    }
    assert.equal(await page.locator('.inbs-services-option').count(),10);
    assert.deepEqual(
      await page.locator('.inbs-services-option').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href'))),
      expectedServiceSlugs.map(slug=>'/'+locale+'/services/'+slug),
      'Homepage services must use canonical ordering',
    );
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
    assert.equal(await drawer.locator('nav a[href="/'+locale+'/team"]').count(),1,
      'Our Team must remain available in the drawer');
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
  assert.equal(await page.locator('.inbs-hero-cta').getAttribute('href'),
    '/'+locale+'/services/real-estate-services');
  await page.getByRole('button',{name:locale==='ar'?'الشريحة التالية':'Next slide'}).click();
  await page.waitForTimeout(1000);
  assert.equal(await page.locator('.inbs-hero-cta').getAttribute('href'),
    '/'+locale+'/services/website-services','Third slide CTA must target Website Services');
  assert.equal((await page.locator('.inbs-hero-cta').innerText()).trim(),
    locale==='ar'?'اكتشف خدمات المواقع الإلكترونية':'Explore Website Services');
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
    assert.deepEqual(
      await page.locator('.inbs-story-capability').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href'))),
      expectedServiceSlugs.map(slug=>'/'+locale+'/services/'+slug),
      'About service capabilities must follow canonical ordering',
    );
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
    const brandBlueStop=size.width<=760
      ? 'rgba(12, 66, 112, 0.72)'
      : 'rgba(15, 79, 130, 0.89)';
    assert.ok(heroBlend.fade.includes(brandBlueStop),
      'Hero fade missing the intentional responsive INBS blue tint: '+heroBlend.fade);
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
// Dedicated services page: both languages, themes, and responsive viewports.
for (const locale of ['en','ar']) {
 for (const size of sizes) {
  for (const theme of ['light','dark']) {
   const key='services/'+[locale,size.name,theme].join('/');
   const context=await browser.newContext({
    viewport:{width:size.width,height:size.height},
    reducedMotion:'reduce',colorScheme:theme,
   });
   await context.addInitScript(t=>localStorage.setItem('inbs-theme',t),theme);
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',e=>errors.push(String(e)));
   await test(key+' page and canonical service links',async()=>{
    const response=await page.goto(origin+'/'+locale+'/services',{waitUntil:'networkidle',timeout:45000});
    assert.equal(response?.status(),200);
    assert.equal(await page.locator('.inbs-services-page h1').count(),1);
    assert.equal(await page.locator('html').getAttribute('dir'),locale==='ar'?'rtl':'ltr');
    assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
    const cards=page.locator('.inbs-services-entry-link');
    assert.equal(await cards.count(),10,'Must list ten canonical services');
    assert.equal(await cards.first().getAttribute('href'),
      '/'+locale+'/services/businessmen-services');
    assert.deepEqual(
      await cards.evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href'))),
      expectedServiceSlugs.map(slug=>'/'+locale+'/services/'+slug),
      'Services directory must use canonical ordering',
    );
    assert.equal(await page.locator('.inbs-services-entry-image img').count(),10);
    assert.equal(await page.locator('.inbs-services-hero-art-network').count(),0,'Old repeated network removed');
    assert.equal(await page.locator('.inbs-services-hero-frame-dot').count(),2,'Both photo edges need a traveler');
    assert.equal(await page.locator('.inbs-services-hero-art-window img').getAttribute('src')!==null,true);
    for(const name of ['hero-services-1.webp','hero-services-2.webp']){
      const image=page.locator('.inbs-services-hero-art img[src*="'+name+'"]');
      assert.equal(await image.count(),1,'Dedicated Pexels hero missing: '+name);
      const response=await fetch(origin+'/images/services/'+name);
      assert.equal(response.status,200,'Missing local hero WebP: '+name);
      assert.match(response.headers.get('content-type')||'',/image\/webp/);
    }
    assert.equal(await page.locator('.inbs-editorial-cta--services .inbs-editorial-cta-primary').getAttribute('href'),
      '/'+locale+'/contact');
    const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:innerWidth}));
    assert.ok(dims.scroll<=dims.inner+3,'Horizontal overflow: '+JSON.stringify(dims));
    assert.deepEqual(errors,[],'Services page JavaScript errors');
   });
   await test(key+' accessibility',async()=>{
    const analysis=await new AxeBuilder({page})
      .include('.inbs-services-page')
      .withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
    const serious=analysis.violations.filter(v=>v.impact==='serious'||v.impact==='critical');
    assert.equal(serious.length,0,
      serious.map(v=>v.id+': '+v.nodes.map(n=>n.target.join(' ')).join(', ')).join(' | '));
   });
   await context.close();
  }
 }
}

// Edge travelers must animate on each photograph's real CSS border path.
await test('services photo border travelers animate independently',async()=>{
 const context=await browser.newContext({
   viewport:{width:1440,height:900},reducedMotion:'no-preference',
 });
 const page=await context.newPage();
 try {
   await page.goto(origin+'/en/services',{waitUntil:'domcontentloaded'});
   const dots=page.locator('.inbs-services-hero-frame-dot');
   assert.equal(await dots.count(),2);
   const read=()=>dots.evaluateAll(elements=>elements.map(el=>{
     const style=getComputedStyle(el);
     return {path:style.offsetPath,distance:parseFloat(style.offsetDistance),animation:style.animationName};
   }));
   const before=await read();
   assert.ok(before.every(d=>d.path!=='none'&&d.animation.includes('inbs-services-border-travel')),
     'Both photo travelers must use a border motion path: '+JSON.stringify(before));
   await page.waitForTimeout(300);
   const after=await read();
   assert.ok(after.every((d,i)=>Math.abs(d.distance-before[i].distance)>.5),
     'Both photo dots must actually move along their own borders: '+JSON.stringify({before,after}));
 } finally { await context.close(); }
});

// The small traveler must trace the visual middle of its border, at both widths.
for (const width of [390, 1440]) {
 await test('services small traveler stays on photo border at '+width+'px',async()=>{
  const context=await browser.newContext({
   viewport:{width,height:900},reducedMotion:'no-preference',
  });
  const page=await context.newPage();
  try {
   await page.goto(origin+'/en/services',{waitUntil:'domcontentloaded'});
   const points=await page.locator('.inbs-services-hero-art-small').evaluate(frame=>{
    const dot=frame.querySelector('.inbs-services-hero-frame-dot');
    if(!dot)throw new Error('Missing small border traveler');
    dot.style.animation='none';
    const rect=frame.getBoundingClientRect();
    const half=parseFloat(getComputedStyle(frame).borderTopWidth)/2;
    const distances=[];
    for(const pct of [0,12.5,25,37.5,50,62.5,75,87.5]){
     dot.style.offsetDistance=pct+'%';
     const d=dot.getBoundingClientRect();
     const x=d.left+d.width/2,y=d.top+d.height/2;
     const nearest=Math.min(
      Math.abs(x-(rect.left+half)),
      Math.abs(x-(rect.right-half)),
      Math.abs(y-(rect.top+half)),
      Math.abs(y-(rect.bottom-half))
     );
     distances.push({pct,distance:nearest});
    }
    return distances;
   });
   assert.ok(points.every(p=>p.distance<=4),
    'Small dot moves away from border centerline: '+JSON.stringify(points));
  } finally { await context.close(); }
 });
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
// One reusable closing component: same geometry, typography, links and interaction.
for(const locale of ['en','ar']){
 for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce',colorScheme:theme});
  await context.addInitScript(t=>localStorage.setItem('inbs-theme',t),theme);
  const page=await context.newPage();
  await test('closing CTAs / '+locale+' / '+theme,async()=>{
   const appearances=[];
   const copy=[];
   for(const [route,name,secondary] of [['','home','services'],['about','about','services'],['services','services','team'],['team','team','services']]){
    await page.goto(origin+'/'+locale+(route?'/'+route:''),{waitUntil:'domcontentloaded',timeout:15000});
    await page.waitForFunction(expected=>document.documentElement.getAttribute('data-theme')===expected,theme,{timeout:10000});
    const section=page.locator('.inbs-editorial-cta--'+name);
    await section.waitFor({state:'attached',timeout:10000});
    // Next.js may attach the section before its route stylesheet has finished loading.
    // Assert the resolved theme background only after the load and style have settled.
    await page.waitForLoadState('load');
    await page.waitForFunction(({name,theme})=>{
      const element=document.querySelector('.inbs-editorial-cta--'+name);
      const expected=theme==='dark'?'rgb(17, 46, 67)':'rgb(234, 241, 246)';
      return element!==null&&getComputedStyle(element).backgroundColor===expected;
    },{name,theme},{timeout:10000});
    assert.equal(await section.count(),1,name+' should have exactly one closing CTA');
    const snapshot=await section.evaluate(el=>{
      const style=n=>getComputedStyle(n);
      const links=[...el.querySelectorAll('.inbs-editorial-cta-action')];
      return {
       background:style(el).backgroundColor,
       headingSize:style(el.querySelector('h2')).fontSize,
       paddingTop:style(el).paddingTop,
       paddingBottom:style(el).paddingBottom,
       sectionHeight:el.getBoundingClientRect().height,
       links:links.map(link=>({
        size:style(link).fontSize,
        weight:style(link).fontWeight,
        minHeight:style(link).minHeight,
        transition:style(link).transition,
        iconTransition:style(link.querySelector('svg')).transition
       }))
      };
    });
    appearances.push(snapshot);
    const heading=await section.locator('h2').innerText();
    copy.push(heading);
    assert.ok(heading.trim().length>10,name+' CTA missing localized heading');
    assert.equal(await section.locator('a').count(),2,name+' must have two actions');
    assert.equal(await section.locator('a').first().getAttribute('href'),'/'+locale+'/contact','Primary CTA must link to Contact page');
    assert.equal(await section.locator('a').nth(1).getAttribute('href'),'/'+locale+'/'+secondary);
    assert.equal(await section.locator('.inbs-editorial-cta-action svg').count(),2);
    assert.ok(snapshot.sectionHeight<550,'CTA '+name+' is too tall at desktop: '+snapshot.sectionHeight);
   }
   const reference=appearances[0];
   for(const item of appearances.slice(1)){
    for(const key of ['background','headingSize','paddingTop','paddingBottom'])assert.equal(item[key],reference[key],'CTA mismatch: '+key);
    assert.deepEqual(item.links,reference.links,'Action fonts/hover transitions must match');
   }
   assert.equal(new Set(copy).size,4,'All four CTAs should have distinct messages');
  });
  await context.close();
 }
}
await test('footer navigation uses one legal page and a full-services link',async()=>{
 for(const locale of ['en','ar']){
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await context.newPage();
  try{
   await page.goto(origin+'/'+locale+'/services',{waitUntil:'domcontentloaded'});
   const quick=page.locator('.inbs-footer-grid h3').nth(0).locator('..').locator('a');
   assert.equal(await quick.count(),7,'Home plus six nonlegal quick pages');
   assert.equal(await quick.first().getAttribute('href'),'/'+locale);
   assert.equal(await quick.filter({hasText:/privacy policy|سياسة الخصوصية/i}).count(),0);
   const services=page.locator('.inbs-footer-grid h3').nth(1).locator('..').locator('a');
   assert.equal(await services.count(),7,'Six service links plus the directory link');
   assert.deepEqual(
     await services.evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href'))),
     [...expectedServiceSlugs.slice(0,6).map(slug=>'/'+locale+'/services/'+slug),'/'+locale+'/services'],
     'Footer services must be the first six canonical entries',
   );
   const legal=page.locator('.inbs-footer-bottom a');
   assert.equal(await legal.count(),1,'Only one legal page is linked');
   assert.equal(await legal.first().getAttribute('href'),'/'+locale+'/legal');
   for(const previous of ['privacy-policy','terms']){
    const response=await fetch(origin+'/'+locale+'/'+previous,{redirect:'manual'});
    assert.ok([301,308].includes(response.status),previous+' must redirect permanently');
    assert.equal(new URL(response.headers.get('location'),origin).pathname,'/'+locale+'/legal');
   }
  } finally { await context.close(); }
 }
});
// Our Team: bilingual, responsive, accessible, no fictional employee profiles.
for(const locale of ['en','ar']){
 for(const size of sizes){
  for(const theme of ['light','dark']){
   const context=await browser.newContext({viewport:{width:size.width,height:size.height},reducedMotion:'reduce',colorScheme:theme});
   await context.addInitScript(t=>localStorage.setItem('inbs-theme',t),theme);
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',error=>errors.push(String(error)));
   await test('team/'+[locale,size.name,theme].join('/')+' page and accessibility',async()=>{
    const res=await page.goto(origin+'/'+locale+'/team',{waitUntil:'networkidle',timeout:45000});
    assert.equal(res?.status(),200);
    assert.equal(await page.locator('html').getAttribute('lang'),locale);
    assert.equal(await page.locator('html').getAttribute('dir'),locale==='ar'?'rtl':'ltr');
    await page.waitForFunction(expected=>document.documentElement.getAttribute('data-theme')===expected,theme);
    assert.equal(await page.locator('.inbs-team-page').count(),1);
    assert.equal(await page.locator('.inbs-team-page h1').count(),1);
    assert.equal(await page.locator('.inbs-team-story').count(),1);
    assert.equal(await page.locator('.inbs-team-story-entry').count(),3);
    assert.equal(await page.locator('.inbs-team-story-photo').count(),7);
    assert.equal(await page.locator('.inbs-team-note').count(),0);
    assert.equal(await page.locator('.inbs-team-gallery .inbs-team-photo').count(),3);
    assert.equal(await page.locator('.inbs-team-gallery-traveler').count(),2);
    assert.equal(await page.locator('.inbs-team-hero-story h1').count(),1);
    assert.equal(await page.locator('.inbs-editorial-cta--team .inbs-editorial-cta-primary').getAttribute('href'),'/'+locale+'/contact');
    assert.equal(await page.locator('.inbs-editorial-cta--team .inbs-editorial-cta-secondary').getAttribute('href'),'/'+locale+'/services');
    const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:innerWidth}));
    assert.ok(dims.scroll<=dims.inner+3,'Team horizontal overflow: '+JSON.stringify(dims));
    const violations=(await new AxeBuilder({page}).include('.inbs-team-page').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()).violations;
    assert.deepEqual(violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
    assert.deepEqual(errors,[]);
   });
   await context.close();
  }
 }
}
// Every service detail route: bilingual content, correct counts and links.
// Run the more expensive accessibility audit on representative content densities.
const detailSlugs=[
 'businessmen-services','real-estate-services','website-services',
 'typing-services','tourism-services','financial-services',
 'consultation-services','customs-services','cargo-services',
 'citizenship-and-immigration-services',
];
const areaCounts=[5,3,3,3,3,3,3,3,4,3];
const editorialCounts=[2,2,2,2,2,2,2,2,2,2];
for(const locale of ['en','ar']){
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 const page=await context.newPage();
 for(const [index,slug] of detailSlugs.entries()){
  await test('service detail / '+locale+' / '+slug,async()=>{
   const res=await page.goto(origin+'/'+locale+'/services/'+slug,{waitUntil:'domcontentloaded',timeout:45000});
   assert.equal(res?.status(),200);
   assert.equal(await page.locator('html').getAttribute('lang'),locale);
   assert.equal(await page.locator('html').getAttribute('dir'),locale==='ar'?'rtl':'ltr');
   assert.equal(await page.locator('.inbs-service-detail').getAttribute('data-service'),slug);
   assert.equal(await page.locator('.inbs-service-detail h1').count(),1);
   assert.equal(await page.locator('.inbs-detail-offering').count(),areaCounts[index]);
   const figures=page.locator('.inbs-detail-offering-photo');
   assert.equal(await figures.count(),editorialCounts[index]);
   assert.equal(await figures.locator('img[loading="lazy"]').count(),editorialCounts[index]);
   for(const src of await figures.locator('img').evaluateAll(imgs=>imgs.map(img=>img.getAttribute('src'))))
     assert.ok(decodeURIComponent(src||'').includes('/images/services/editorial/'), 'Editorial photos must use local public WebP assets');
   assert.equal(await figures.locator('figcaption').count(),editorialCounts[index]);
   for(const alt of await figures.locator('img').evaluateAll(imgs=>imgs.map(img=>img.alt)))
     assert.ok(alt.length>10,'Editorial image needs descriptive localized alt');

   assert.equal(await page.locator('.inbs-detail-process-step').count(),3);
   const actions=page.locator('.inbs-detail-offering-action');
   assert.equal(await actions.count(),areaCounts[index]);
   for(const label of await actions.allInnerTexts())assert.equal(label.trim(),locale==='ar'?'ابدأ الخدمة':'Start this service');
   for(const href of await actions.evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href'))))assert.equal(href,'/'+locale+'/contact');
   const closing=page.locator('.inbs-editorial-cta--service-detail');
   assert.equal(await closing.count(),1);
   assert.equal(await closing.locator('a').count(),2);
   assert.equal(await closing.locator('a').first().getAttribute('href'),'/'+locale+'/contact');
   assert.equal(await closing.locator('a').nth(1).getAttribute('href'),'/'+locale+'/services');
   assert.equal(await page.locator('.inbs-detail-hero-index,.inbs-detail-disclaimer').count(),0);
   const broken=await page.locator('.inbs-detail-hero-photo img').evaluate(img=>img.complete&&img.naturalWidth===0);
   assert.equal(broken,false,'Broken service image');
  });
 }
 await context.close();
}
for(const locale of ['en','ar']){
 for(const size of sizes){
  for(const theme of ['light','dark']){
   const context=await browser.newContext({viewport:{width:size.width,height:size.height},reducedMotion:'reduce',colorScheme:theme});
   await context.addInitScript(t=>localStorage.setItem('inbs-theme',t),theme);
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',error=>errors.push(String(error)));
   for(const slug of ['businessmen-services','website-services','cargo-services','citizenship-and-immigration-services']){
    await test('service visual & axe / '+[locale,size.name,theme,slug].join('/'),async()=>{
     const res=await page.goto(origin+'/'+locale+'/services/'+slug,{waitUntil:'domcontentloaded',timeout:45000});
     assert.equal(res?.status(),200);
     await page.waitForFunction(expected=>document.documentElement.getAttribute('data-theme')===expected,theme);
     const editorial=page.locator('.inbs-detail-offering-photo').first();
     await editorial.scrollIntoViewIfNeeded();
     await page.waitForFunction(() => {
       const img=document.querySelector('.inbs-detail-offering-photo img');
       return img?.complete;
     },null,{timeout:20000});
     const loaded=await editorial.locator('img').evaluate(img=>img.naturalWidth>0);
     assert.ok(loaded,'Locally hosted editorial WebP photo should load');
     await page.locator('.inbs-detail-process').scrollIntoViewIfNeeded();
     const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:innerWidth}));
     assert.ok(widths.scroll<=widths.inner+3,'Horizontal overflow: '+JSON.stringify(widths));
     const violations=(await new AxeBuilder({page}).include('.inbs-service-detail').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()).violations;
     assert.deepEqual(violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
     assert.deepEqual(errors,[]);
     errors.length=0;
    });
   }
   await context.close();
  }
 }
}
// Dedicated Contact page: direct links only, never a form or submission API.
for(const locale of ['en','ar']){
 for(const size of sizes){
  for(const theme of ['light','dark']){
   const context=await browser.newContext({viewport:{width:size.width,height:size.height},reducedMotion:'reduce',colorScheme:theme});
   await context.addInitScript(t=>localStorage.setItem('inbs-theme',t),theme);
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',error=>errors.push(String(error)));
   await test('contact/'+[locale,size.name,theme].join('/')+' direct channels and accessibility',async()=>{
    const response=await page.goto(origin+'/'+locale+'/contact',{waitUntil:'domcontentloaded',timeout:45000});
    assert.equal(response?.status(),200);
    assert.equal(await page.locator('html').getAttribute('lang'),locale);
    assert.equal(await page.locator('html').getAttribute('dir'),locale==='ar'?'rtl':'ltr');
    await page.waitForFunction(t=>document.documentElement.getAttribute('data-theme')===t,theme);
    assert.equal(await page.locator('.inbs-contact-page').count(),1);
    assert.equal(await page.locator('.inbs-contact-page h1').count(),1);
    assert.equal(await page.locator('.inbs-contact-hero-gallery button.inbs-contact-hero-photo').count(),3);
    assert.equal(await page.locator('.inbs-contact-photo-traveler').count(),3);
    assert.equal(await page.locator('.inbs-contact-hero-panel,.inbs-contact-rings').count(),0);
    const heroImagePaths=await page.evaluate(()=>{
      const imageOf=selector=>getComputedStyle(document.querySelector(selector)).backgroundImage;
      return [
        imageOf('.inbs-contact-hero-building'),
        imageOf('.inbs-contact-hero-photo--building .inbs-contact-photo-image'),
        imageOf('.inbs-contact-hero-photo--office .inbs-contact-photo-image'),
        imageOf('.inbs-contact-hero-photo--door .inbs-contact-photo-image'),
      ];
    });
    for(const [i,name] of ['contact-building.webp','contact-building.webp','contact-office.webp','contact-door.webp'].entries())
      assert.ok(heroImagePaths[i].includes('/images/contact/'+name),
        'Contact Hero slot must reference its stable local WebP filename: '+name);
    assert.equal(await page.locator('.inbs-contact-hero-signal').count(),0);
    const thumbs=page.locator('.inbs-contact-hero-photo');
    for(let i=0;i<3;i++){
      const tile=thumbs.nth(i);
      const dimensions=await tile.boundingBox();
      assert.ok(dimensions && Math.abs(dimensions.width-dimensions.height)<4,'Hero thumbnail must be square');
      await tile.focus();
      assert.equal(await tile.evaluate(node=>node===document.activeElement),true,'Thumbnail must be keyboard focusable');
    }
    await thumbs.first().click();
    assert.equal(await page.getByRole('dialog').count(),1,'Click opens full-size photo viewer');
    assert.ok((await page.getByRole('dialog').locator('img').getAttribute('src')||'').includes('contact-building.webp'));
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('dialog').count(),0,'Escape closes full-size photo viewer');
    const scene=await page.locator('.inbs-contact-hero-gallery').boundingBox();
    const large=await page.locator('.inbs-contact-hero-building').boundingBox();
    assert.ok(scene&&large,'Hero building and thumbnail gallery must render');
    assert.equal(await page.locator('.inbs-contact-page form,.inbs-contact-page input,.inbs-contact-page textarea').count(),0);
    assert.equal(await page.locator('.inbs-contact-channel').count(),2);
    assert.equal(await page.locator('.inbs-contact-social-links a').count(),3);
    assert.equal(await page.locator('.inbs-contact-channel-value[href^="tel:"]').count(),2,'Both mobile and landline should be shown');
    assert.equal(await page.locator('.inbs-contact-channel-value[href^="mailto:"]').count(),2,'Both official and additional email should be shown');
    assert.equal(await page.locator('.inbs-contact-visit address').count(),1);
    assert.equal(await page.locator('.inbs-contact-map-embed[loading="lazy"]').count(),1,'Office map is embedded');
    assert.equal(await page.locator('.inbs-contact-uae-divider').count(),1,'Dedicated UAE map divider is present');
    assert.equal(await page.locator('.inbs-contact-uae-emirates path').count(),7,'All seven emirates are outlined');
    assert.equal(await page.locator('.inbs-contact-uae-labels text').count(),7,'All seven emirates are labeled');
    assert.equal(await page.locator('.inbs-contact-uae-office-dot').count(),1,'Office location is marked');
    assert.equal(await page.locator('.inbs-contact-uae-pointer-line').count(),0,'Mouse interaction stays hidden with reduced motion');
    assert.equal(await page.locator('.inbs-contact-visit-map-action[target="_blank"][rel="noopener noreferrer"]').count(),1);
    assert.equal(await page.locator('.inbs-editorial-cta--contact .inbs-editorial-cta-primary').getAttribute('href'),'mailto:info@inbs-uae.com');
    assert.equal(await page.locator('.inbs-editorial-cta--contact .inbs-editorial-cta-secondary').getAttribute('href'),'/'+locale+'/services');
    const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:innerWidth}));
    assert.ok(widths.scroll<=widths.inner+3,'Horizontal overflow '+JSON.stringify(widths));
    const violations=(await new AxeBuilder({page}).include('.inbs-contact-page').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()).violations;
    assert.deepEqual(violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
    assert.deepEqual(errors,[]);
   });
   await context.close();
  }
 }
}
// Careers: four dedicated sections, email and WhatsApp actions, RTL, accessibility.
for(const locale of ['en','ar']){
 for(const size of sizes){
  for(const theme of ['light','dark']){
   const context=await browser.newContext({viewport:{width:size.width,height:size.height},reducedMotion:'reduce',colorScheme:theme});
   await context.addInitScript(t=>localStorage.setItem('inbs-theme',t),theme);
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',error=>errors.push(String(error)));
   await test('careers/'+[locale,size.name,theme].join('/')+' layout, application links and accessibility',async()=>{
    const response=await page.goto(origin+'/'+locale+'/careers',{waitUntil:'domcontentloaded',timeout:45000});
    assert.equal(response?.status(),200);
    assert.equal(await page.locator('html').getAttribute('lang'),locale);
    assert.equal(await page.locator('html').getAttribute('dir'),locale==='ar'?'rtl':'ltr');
    await page.waitForFunction(t=>document.documentElement.getAttribute('data-theme')===t,theme);
    assert.equal(await page.locator('.inbs-careers-page').count(),1);
    assert.equal(await page.locator('.inbs-careers-page h1').count(),1);
    assert.equal(await page.locator('.inbs-careers-hero').count(),1);
    assert.equal(await page.locator('.inbs-careers-why').count(),1);
    assert.equal(await page.locator('.inbs-careers-apply').count(),1);
    assert.equal(await page.locator('.inbs-editorial-cta--careers').count(),1);
    assert.equal(await page.locator('.inbs-careers-reason').count(),3);
    assert.equal(await page.locator('.inbs-careers-apply-steps li').count(),3);
    assert.equal(await page.locator('.inbs-careers-page form,.inbs-careers-page input,.inbs-careers-page textarea').count(),0);
    assert.equal(await page.locator('.inbs-careers-art-orbit').count(),2);
    assert.equal(await page.locator('.inbs-careers-art-cross').count(),0);
    assert.equal(await page.locator('.inbs-careers-apply-address a[href^="mailto:"]').count(),2);
    const email=page.locator('.inbs-careers-apply-address a[href^="mailto:"]').first();
    assert.equal(await email.textContent()!==null,true);
    assert.ok((await email.getAttribute('href')).startsWith('mailto:jalal.omar2021@gmail.com?subject='));
    const applyHref=await page.locator('.inbs-careers-apply-button').getAttribute('href');
    assert.ok(applyHref.startsWith('mailto:jalal.omar2021@gmail.com?subject='));
    assert.equal(await page.locator('.inbs-careers-apply-address a[href="mailto:info@inbs-uae.com"]').count(),1);
    assert.equal(await page.locator('.inbs-careers-apply-whatsapp a').getAttribute('href'),'https://wa.me/971508866555');
    assert.equal(await page.locator('.inbs-careers-apply-whatsapp bdi').getAttribute('dir'),'ltr');
    assert.equal((await page.locator('.inbs-careers-apply-whatsapp bdi').textContent()).trim(),'+971 50 886 6555');
    assert.equal(await page.locator('.inbs-careers-hero-action').getAttribute('href'),'#careers-why');
    assert.equal(await page.locator('.inbs-editorial-cta--careers .inbs-editorial-cta-primary').getAttribute('href'),'/'+locale+'/contact');
    assert.equal(await page.locator('.inbs-editorial-cta--careers .inbs-editorial-cta-secondary').getAttribute('href'),'/'+locale+'/services');
    const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:innerWidth}));
    assert.ok(widths.scroll<=widths.inner+3,'Horizontal overflow '+JSON.stringify(widths));
    const violations=(await new AxeBuilder({page}).include('.inbs-careers-page').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()).violations;
    assert.deepEqual(violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
    assert.deepEqual(errors,[]);
   });
   await context.close();
  }
 }
}
// Insights: published bilingual editorial guides, topic filtering and article routes.
for(const locale of ['en','ar']){
 for(const size of sizes){
  for(const theme of ['light','dark']){
   const context=await browser.newContext({viewport:{width:size.width,height:size.height},reducedMotion:'reduce',colorScheme:theme});
   await context.addInitScript(t=>localStorage.setItem('inbs-theme',t),theme);
   const page=await context.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(String(error)));
   await test('insights/'+[locale,size.name,theme].join('/')+' cards, filters and accessibility',async()=>{
    const response=await page.goto(origin+'/'+locale+'/insights',{waitUntil:'domcontentloaded',timeout:45000});
    assert.equal(response?.status(),200);
    assert.equal(await page.locator('html').getAttribute('lang'),locale);
    assert.equal(await page.locator('html').getAttribute('dir'),locale==='ar'?'rtl':'ltr');
    await page.waitForFunction(t=>document.documentElement.getAttribute('data-theme')===t,theme);
    assert.equal(await page.locator('.inbs-insights-page h1').count(),1);
    assert.equal(await page.locator('.inbs-insights-hero').count(),1);
    assert.equal(await page.locator('.inbs-insights-featured').count(),1);
    assert.equal(await page.locator('.inbs-insights-library').count(),1);
    assert.equal(await page.locator('.inbs-editorial-cta--insights').count(),1);
    assert.equal(await page.locator('.inbs-insights-library .inbs-insights-card').count(),6);
    assert.equal(await page.locator('.inbs-insights-filters button').count(),4);
    await page.locator('.inbs-insights-filters button').nth(1).click();
    assert.equal(await page.locator('.inbs-insights-library .inbs-insights-card').count(),3);
    assert.equal(await page.locator('.inbs-insights-filters button').nth(1).getAttribute('aria-pressed'),'true');
    await page.locator('.inbs-insights-filters button').first().click();
    assert.equal(await page.locator('.inbs-insights-library .inbs-insights-card').count(),6);
    const photos=page.locator('.inbs-insights-library .inbs-insights-card-art img');
    assert.equal(await photos.count(),6,'All insights cards must use a local photo');
    for(const slug of ['starting-a-business-in-dubai','mainland-or-free-zone','understanding-uae-work-permits','family-residency-preparation','vat-registration-business-planning','renewing-a-dubai-trade-licence']){
     assert.equal(await page.locator(`.inbs-insights-card-art img[src*="${slug}.webp"]`).count(),1,`Missing local photo for ${slug}`);
    }
    assert.equal(await page.locator('.inbs-insights-featured-art img').count(),1);
    const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:innerWidth}));
    assert.ok(widths.scroll<=widths.inner+3,'Horizontal overflow '+JSON.stringify(widths));
    const violations=(await new AxeBuilder({page}).include('.inbs-insights-page').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()).violations;
    assert.deepEqual(violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
    assert.deepEqual(errors,[]);
   });
   await context.close();
  }
 }
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage();
 for(const slug of ['starting-a-business-in-dubai','mainland-or-free-zone','understanding-uae-work-permits','family-residency-preparation','vat-registration-business-planning','renewing-a-dubai-trade-licence']){
  await test('insights/'+locale+'/'+slug+' full article',async()=>{
   const response=await page.goto(origin+'/'+locale+'/insights/'+slug,{waitUntil:'domcontentloaded',timeout:45000});
   assert.equal(response?.status(),200);
   assert.equal(await page.locator('.inbs-insights-article-page h1').count(),1);
   assert.equal(await page.locator('.inbs-insights-article-sections>section').count(),4);
   assert.equal(await page.locator('.inbs-insights-article-source a[target="_blank"][rel="noopener noreferrer"]').count(),1);
   assert.equal(await page.locator('.inbs-insights-related .inbs-insights-card').count(),2);
   assert.ok((await page.locator('.inbs-insights-article-back').getAttribute('href'))==='/'+locale+'/insights');
   const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:innerWidth}));
   assert.ok(widths.scroll<=widths.inner+3,'Horizontal overflow '+JSON.stringify(widths));
   const violations=(await new AxeBuilder({page}).include('.inbs-insights-article-page').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()).violations;
   assert.deepEqual(violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
  });
 }
 await context.close();
}
await test('navigation endpoints and security',async()=>{
 for(const locale of ['en','ar']){
  for(const slug of ['about','services','contact','team','careers','privacy-policy','terms','services/businessmen-services','services/citizenship-and-immigration-services']){
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
