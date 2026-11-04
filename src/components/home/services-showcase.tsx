'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight, ArrowLeft, BriefcaseBusiness, Building2, Globe2, FileText, Plane, Landmark, MessagesSquare, Container, Ship, Fingerprint } from 'lucide-react';
import type { Locale } from '@/lib/site';
import { routes } from '@/lib/routes';
import { serviceCatalog, serviceSlugs, type ServiceSlug } from '@/content/services';
import { homeContent } from '@/content/home';
import { Reveal } from '@/components/shared/reveal';


const serviceIcons: Record<ServiceSlug, typeof BriefcaseBusiness> = {
 'businessmen-services': BriefcaseBusiness,
 'real-estate-services': Building2,
 'website-services': Globe2,
 'typing-services': FileText,
 'tourism-services': Plane,
 'financial-services': Landmark,
 'consultation-services': MessagesSquare,
 'customs-services': Container,
 'cargo-services': Ship,
 'citizenship-and-immigration-services': Fingerprint,
};

export function ServicesShowcase({locale}:{locale:Locale}){
 const [selected,setSelected]=useState(0);
 const reduced=useReducedMotion();
 const t=homeContent[locale];
 const slug=serviceSlugs[selected];
 const move=(step:number)=>setSelected(n=>(n+step+serviceSlugs.length)%serviceSlugs.length);
 return <section className="inbs-services" aria-labelledby="inbs-services-heading">
  <div className="site-shell inbs-services-inner">
   <Reveal className="inbs-services-heading">
    <div className="inbs-services-overline inbs-section-kicker"><span className="inbs-services-overline-line"/>{t.offering}</div>
    <div className="inbs-services-heading-row">
     <h2 id="inbs-services-heading">{t.offeringTitle.split('\n').map(line=><span key={line}>{line}</span>)}</h2>
     <p>{t.offeringDescription}</p>
    </div>
   </Reveal>
   <Reveal className="inbs-services-stage">
    <div className="inbs-services-index" aria-label={t.serviceSelectAria}>
     {serviceSlugs.map((item,i)=><Link key={item} href={routes.service(locale,item)} className={'inbs-services-option'+(selected===i?' is-active':'')} onMouseEnter={()=>setSelected(i)} onFocus={()=>setSelected(i)}>
      <span className="inbs-services-option-icon">{(()=>{const ServiceIcon=serviceIcons[item];return <ServiceIcon size={21} strokeWidth={1.65} aria-hidden="true"/>})()}</span>
      <span className="inbs-services-option-name">{serviceCatalog[item][locale]}</span>
      <ArrowUpRight className="inbs-services-option-arrow" size={19} aria-hidden="true"/>
     </Link>)}
    </div>
    <div className="inbs-services-display">
     <div className="inbs-services-visual" aria-hidden="true">
      <div className="inbs-services-gridlines"/>
      <div className="inbs-services-orbit orbit-one"/><div className="inbs-services-orbit orbit-two"/>
      <AnimatePresence mode="wait">
       <motion.div key={slug} className="inbs-services-photo" initial={reduced?false:{opacity:0,scale:1.07}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:.5,ease:[.22,1,.36,1]}}>
        <Image src={serviceCatalog[slug].image} alt={serviceCatalog[slug][locale]} fill sizes="(max-width: 700px) 80vw, 42vw" className="inbs-services-photo-image"/>
       </motion.div>
      </AnimatePresence>
      <span className="inbs-services-visual-mark">INBS</span>
     </div>
     <div className="inbs-services-display-bottom">
      <AnimatePresence mode="wait">
       <motion.div key={slug} initial={reduced?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={reduced?{opacity:0}:{opacity:0,y:-10}} transition={{duration:.4}}>
        <span className="inbs-services-selected-label">{t.selectedService}</span>
        <h3>{serviceCatalog[slug][locale]}</h3>
       </motion.div>
      </AnimatePresence>
      <Link className="inbs-services-detail-link" href={routes.service(locale,slug)} aria-label={`${t.serviceLink}: ${serviceCatalog[slug][locale]}`}><ArrowUpRight size={24}/></Link>
     </div>
     <div className="inbs-services-mobile-controls">
      <button type="button" onClick={()=>move(-1)} aria-label={locale==='ar'?'الخدمة السابقة':'Previous service'}>{locale==='ar'?<ArrowRight/>:<ArrowLeft/>}</button>
      <button type="button" onClick={()=>move(1)} aria-label={locale==='ar'?'الخدمة التالية':'Next service'}>{locale==='ar'?<ArrowLeft/>:<ArrowRight/>}</button>
     </div>
    </div>
   </Reveal>
   <Reveal className="inbs-services-end"><span>{t.servicesOutro}</span><Link className="inbs-about-link inbs-services-all-link" href={routes.page(locale,'services')}><span>{t.allServices}</span><ArrowUpRight size={20}/></Link></Reveal>
  </div>
 </section>;
}
