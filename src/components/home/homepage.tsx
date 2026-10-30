import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { homeContent } from '@/content/home';
import { serviceSlugs, type Locale } from '@/lib/site';
import { Reveal, SmoothScroll } from './motion-elements';
import { HeroExperience } from './hero-experience';

function Arrow({locale}:{locale:Locale}){return locale==='ar'?<ArrowLeft size={17}/>:<ArrowUpRight size={17}/>}

export function Homepage({locale}:{locale:Locale}){
 const t=homeContent[locale];
 return <main className="homepage">
  <SmoothScroll />
  <HeroExperience locale={locale}/>
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
