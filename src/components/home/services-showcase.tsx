'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight, ArrowLeft, BriefcaseBusiness, Building2, Globe2, FileText, Plane, Landmark, MessagesSquare, Container, Ship, Fingerprint } from 'lucide-react';
import { serviceSlugs, serviceNames, type Locale } from '@/lib/site';
import { homeContent } from '@/content/home';
import { Reveal } from './motion-elements';

const symbols = [BriefcaseBusiness, Building2, Globe2, FileText, Plane, Landmark, MessagesSquare, Container, Ship, Fingerprint] as const;

export function ServicesShowcase({locale}:{locale:Locale}){
 const [selected,setSelected]=useState(0);
 const reduced=useReducedMotion();
 const t=homeContent[locale];
 const slug=serviceSlugs[selected];
 const Icon=symbols[selected];
 const move=(step:number)=>setSelected(n=>(n+step+serviceSlugs.length)%serviceSlugs.length);
 return <section className="inbs-services" aria-labelledby="inbs-services-heading">
  <div className="site-shell inbs-services-inner">
   <Reveal className="inbs-services-heading">
    <div className="inbs-services-overline"><span className="inbs-services-overline-line"/>{t.offering}</div>
    <div className="inbs-services-heading-row">
     <h2 id="inbs-services-heading">{t.offeringTitle.split('\n').map(line=><span key={line}>{line}</span>)}</h2>
     <p>{t.offeringDescription}</p>
    </div>
   </Reveal>
   <div className="inbs-services-stage">
    <div className="inbs-services-index" aria-label={locale==='ar'?'اختر خدمة':'Choose a service'}>
     {serviceSlugs.map((item,i)=><button key={item} type="button" className={'inbs-services-option'+(selected===i?' is-active':'')} onMouseEnter={()=>setSelected(i)} onFocus={()=>setSelected(i)} onClick={()=>setSelected(i)} aria-pressed={selected===i}>
      <span className="inbs-services-option-no">{String(i+1).padStart(2,'0')}</span>
      <span className="inbs-services-option-name">{serviceNames[item][locale]}</span>
      <ArrowUpRight className="inbs-services-option-arrow" size={19} aria-hidden="true"/>
     </button>)}
    </div>
    <div className="inbs-services-display">
     <div className="inbs-services-display-top"><span>INBS / {locale==='ar'?'الخدمات':'SERVICES'}</span><span>{String(selected+1).padStart(2,'0')} / {String(serviceSlugs.length).padStart(2,'0')}</span></div>
     <div className="inbs-services-visual" aria-hidden="true">
      <div className="inbs-services-gridlines"/>
      <div className="inbs-services-orbit orbit-one"/><div className="inbs-services-orbit orbit-two"/>
      <AnimatePresence mode="wait">
       <motion.div key={slug} className="inbs-services-symbol" initial={reduced?false:{opacity:0,scale:.85,rotate:-9}} animate={{opacity:1,scale:1,rotate:0}} exit={reduced?{opacity:0}:{opacity:0,scale:1.08,rotate:6}} transition={{duration:.5,ease:[.22,1,.36,1]}}>
        <Icon size={108} strokeWidth={.9}/>
       </motion.div>
      </AnimatePresence>
      <span className="inbs-services-visual-mark">INBS</span>
     </div>
     <div className="inbs-services-display-bottom">
      <AnimatePresence mode="wait">
       <motion.div key={slug} initial={reduced?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={reduced?{opacity:0}:{opacity:0,y:-10}} transition={{duration:.4}}>
        <span className="inbs-services-selected-label">{locale==='ar'?'الخدمة المختارة':'SELECTED SERVICE'}</span>
        <h3>{serviceNames[slug][locale]}</h3>
       </motion.div>
      </AnimatePresence>
      <Link className="inbs-services-detail-link" href={`/${locale}/services/${slug}`} aria-label={`${t.serviceLink}: ${serviceNames[slug][locale]}`}><ArrowUpRight size={24}/></Link>
     </div>
     <div className="inbs-services-mobile-controls">
      <button type="button" onClick={()=>move(-1)} aria-label={locale==='ar'?'الخدمة السابقة':'Previous service'}>{locale==='ar'?<ArrowRight/>:<ArrowLeft/>}</button>
      <button type="button" onClick={()=>move(1)} aria-label={locale==='ar'?'الخدمة التالية':'Next service'}>{locale==='ar'?<ArrowLeft/>:<ArrowRight/>}</button>
     </div>
    </div>
   </div>
   <Reveal className="inbs-services-end"><span>{locale==='ar'?'استكشف كل ما نقدمه':'DISCOVER THE FULL NETWORK'}</span><Link href={`/${locale}/services`}>{t.allServices}<ArrowUpRight size={18}/></Link></Reveal>
  </div>
 </section>;
}
