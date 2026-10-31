'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight, ArrowLeft, BriefcaseBusiness, Building2, Globe2, FileText, Plane, Landmark, MessagesSquare, Container, Ship, Fingerprint } from 'lucide-react';
import { serviceSlugs, serviceNames, type Locale } from '@/lib/site';
import { homeContent } from '@/content/home';
import { Reveal } from './motion-elements';

const images = [3,1,2,9,4,5,6,7,8,10].map(n=>`/images/services/service${n}${n===6?'.jpeg':'.jpg'}`);
const symbols = [BriefcaseBusiness, Building2, Globe2, FileText, Plane, Landmark, MessagesSquare, Container, Ship, Fingerprint] as const;

export function ServicesShowcase({locale}:{locale:Locale}){
 const [selected,setSelected]=useState(0);
 const reduced=useReducedMotion();
 const t=homeContent[locale];
 const slug=serviceSlugs[selected];
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
     {serviceSlugs.map((item,i)=><Link key={item} href={`/${locale}/services/${item}`} className={'inbs-services-option'+(selected===i?' is-active':'')} onMouseEnter={()=>setSelected(i)} onFocus={()=>setSelected(i)}>
      <span className="inbs-services-option-icon">{(()=>{const ServiceIcon=symbols[i];return <ServiceIcon size={21} strokeWidth={1.65} aria-hidden="true"/>})()}</span>
      <span className="inbs-services-option-name">{serviceNames[item][locale]}</span>
      <ArrowUpRight className="inbs-services-option-arrow" size={19} aria-hidden="true"/>
     </Link>)}
    </div>
    <div className="inbs-services-display">
     <div className="inbs-services-display-top"><span>INBS / {locale==='ar'?'الخدمات':'SERVICES'}</span><span>{String(selected+1).padStart(2,'0')} / {String(serviceSlugs.length).padStart(2,'0')}</span></div>
     <div className="inbs-services-visual" aria-hidden="true">
      <div className="inbs-services-gridlines"/>
      <div className="inbs-services-orbit orbit-one"/><div className="inbs-services-orbit orbit-two"/>
      <AnimatePresence mode="wait">
       <motion.div key={slug} className="inbs-services-photo" initial={reduced?false:{opacity:0,scale:1.07}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:.5,ease:[.22,1,.36,1]}}>
        <Image src={images[selected]} alt={serviceNames[slug][locale]} fill sizes="(max-width: 700px) 80vw, 42vw" className="inbs-services-photo-image"/>
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
   <Reveal className="inbs-services-end"><span>{locale==='ar'?'استكشف كل ما نقدمه':'DISCOVER THE FULL NETWORK'}</span><Link className="inbs-about-link inbs-services-all-link" href={`/${locale}/services`}><span>{t.allServices}</span><ArrowUpRight size={20}/></Link></Reveal>
  </div>
 </section>;
}
