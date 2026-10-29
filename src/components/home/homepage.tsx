import Link from 'next/link';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { homeContent } from '@/content/home';
import { serviceSlugs, type Locale } from '@/lib/site';
import { Reveal, SmoothScroll } from './motion-elements';

function Arrow({locale}:{locale:Locale}){return locale==='ar'?<ArrowLeft size={17}/>:<ArrowUpRight size={17}/>}

export function Homepage({locale}:{locale:Locale}){
 const t=homeContent[locale];
 return <main className="homepage">
  <SmoothScroll />
  <section className="hero" aria-labelledby="hero-title">
   <div className="hero-noise" aria-hidden="true"/>
   <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="hero-core"/><span className="axis-label axis-top">25° 11′ N · 55° 16′ E</span><span className="axis-label axis-bottom">INBS / GLOBAL CONNECTIONS</span></div>
   <div className="site-shell hero-inner"><div className="hero-copy">
    <Reveal><p className="overline"><span className="overline-square"/>{t.eyebrow}</p></Reveal>
    <Reveal delay={0.12}><p className="hero-intro">{t.intro}</p></Reveal>
    <Reveal delay={0.2}><h1 id="hero-title">{t.title1}<br/><em>{t.title2}</em></h1></Reveal>
    <Reveal delay={0.35}><p className="hero-lead">{t.lead}</p></Reveal>
    <Reveal delay={0.48}><div className="hero-buttons"><Link className="btn-bright" href={`/${locale}/services`}>{t.primary}<Arrow locale={locale}/></Link><Link className="btn-quiet" href={`/${locale}/about`}>{t.secondary}<Arrow locale={locale}/></Link></div></Reveal>
   </div></div>
   <div className="site-shell hero-bottom"><div className="hero-bottom-line"/><span>01 / 04</span><span>{t.scroll} <ArrowDownRight size={17}/></span></div>
  </section>
  <section className="proof-strip"><div className="site-shell proof-inner"><div><span>{t.founded}</span><strong>{t.foundedValue}</strong></div><div><span>{t.city}</span><strong>{t.cityValue}</strong></div><p>{t.intro}</p></div></section>
  <section className="capabilities section-pad" aria-labelledby="services-title"><div className="site-shell">
    <Reveal><div className="section-heading"><div><p className="eyebrow-dark"><span className="eyebrow-line"/>{t.offering}</p><h2 id="services-title">{t.offeringTitle.split('\n').map((part,i)=><span key={part}>{i>0&&<br/>}{part}</span>)}</h2></div><p>{t.offeringDescription}</p></div></Reveal>
    <div className="services-list">{serviceSlugs.map((slug,index)=><Reveal key={slug} delay={Math.min(index*.035,.25)}><Link className="service-row" href={`/${locale}/services/${slug}`}><span className="service-index">{String(index+1).padStart(2,'0')}</span><span className="service-name">{t.services[index]}</span><span className="service-arrow"><Arrow locale={locale}/></span></Link></Reveal>)}</div>
    <div className="section-action"><Link href={`/${locale}/services`}>{t.allServices}<Arrow locale={locale}/></Link></div>
  </div></section>
  <section className="perspective section-pad" aria-labelledby="about-title"><div className="site-shell perspective-grid"><Reveal><div className="perspective-art" aria-hidden="true"><div className="perspective-disc"/><div className="perspective-rays"/><div className="perspective-annotation">INBS — 2003 / DUBAI</div><span className="perspective-mark">I<span>N</span>BS</span></div></Reveal><div className="perspective-copy"><Reveal><p className="eyebrow-dark"><span className="eyebrow-line"/>{t.aboutEyebrow}</p><h2 id="about-title">{t.aboutTitle.split('\n').map((part,i)=><span key={part}>{i>0&&<br/>}{part}</span>)}</h2><p>{t.aboutText}</p><Link className="inline-link" href={`/${locale}/about`}>{t.aboutLink}<Arrow locale={locale}/></Link></Reveal></div></div></section>
  <section className="final-cta"><div className="site-shell final-cta-inner"><Reveal><p className="overline"><span className="overline-square"/>{t.ctaEyebrow}</p><h2>{t.ctaTitle.split('\n').map((part,i)=><span key={part}>{i>0&&<br/>}{part}</span>)}</h2><p>{t.ctaText}</p><Link className="btn-bright" href={`/${locale}/contact`}>{t.ctaButton}<Arrow locale={locale}/></Link></Reveal><div className="cta-signature" aria-hidden="true">INBS<span>®</span></div></div></section>
 </main>
}
