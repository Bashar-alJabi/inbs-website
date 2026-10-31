import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { homeContent, aboutDetails } from '@/content/home';
import type { Locale } from '@/lib/site';

/** Company introduction; facts and translations live in src/content/home.ts. */
export function AboutPreview({ locale }: { locale: Locale }) {
 const content = homeContent[locale];
 const details = aboutDetails[locale];
 return <section className="inbs-about-preview" aria-labelledby="inbs-about-heading">
  <div className="site-shell inbs-about-inner">
   <div className="inbs-about-intro">
    <p className="inbs-about-kicker"><span className="inbs-about-kicker-mark" aria-hidden="true" />{content.aboutEyebrow}</p>
    <h2 id="inbs-about-heading">{content.aboutTitle.split('\n').map((line, index) => <span key={line} className={index===1?'inbs-about-heading-accent':undefined}>{line}</span>)}</h2>
   </div>
   <div className="inbs-about-copy">
    <p>{details.intro}</p>
    <p className="inbs-about-supporting">{details.supporting}</p>
    <Link className="inbs-about-link" href={`/${locale}/about`}><span>{content.aboutLink}</span><ArrowUpRight size={20} aria-hidden="true" /></Link>
   </div>
   <div className="inbs-about-art" aria-hidden="true">
    <svg className="inbs-about-network" viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg">
     <circle cx="225" cy="225" r="220" className="inbs-network-ring"/>
     <circle cx="225" cy="225" r="146" className="inbs-network-ring"/>
     <path d="M69.437 69.437L380.563 380.563 M380.563 69.437L69.437 380.563" className="inbs-network-lines"/>
     <circle cx="225" cy="225" r="16" className="inbs-network-hub"/>
     <circle cx="225" cy="225" r="26" className="inbs-network-halo"/>
     <circle r="6" className="inbs-network-traveler"><animateMotion dur="15s" begin="-2s" repeatCount="indefinite" path="M225 225 L328.237 121.763 A146 146 0 0 1 328.237 328.237 L380.563 380.563 A220 220 0 0 1 69.437 380.563 L121.763 328.237 A146 146 0 0 1 121.763 121.763 L225 225" /></circle>
     <circle r="5" className="inbs-network-traveler"><animateMotion dur="19s" begin="-8s" repeatCount="indefinite" path="M225 225 L121.763 121.763 A146 146 0 0 0 121.763 328.237 L69.437 380.563 A220 220 0 0 0 69.437 69.437 L121.763 121.763 L225 225" /></circle>
     <circle r="5.5" className="inbs-network-traveler"><animateMotion dur="23s" begin="-15s" repeatCount="indefinite" path="M225 225 L328.237 328.237 A146 146 0 0 0 121.763 328.237 L69.437 380.563 A220 220 0 0 1 380.563 380.563 L328.237 328.237 A146 146 0 0 1 328.237 121.763 L225 225" /></circle>
    </svg>
   </div>
   <div className="inbs-about-pillars" aria-label={details.pillarsLabel}>
    {details.pillars.map((pillar, index) => <article className="inbs-about-pillar" key={pillar.title}>
     <span className="inbs-about-pillar-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span>
     <h3>{pillar.title}</h3>
     <p>{pillar.text}</p>
    </article>)}
   </div>
   <div className="inbs-about-footnote" aria-hidden="true"><span>INBS</span><span>2003 — {locale==='ar'?'دبي':'DUBAI'}</span></div>
  </div>
 </section>;
}
