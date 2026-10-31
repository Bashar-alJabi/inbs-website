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
     <path d="M5 225H445 M225 5V445 M69.4 69.4L380.6 380.6 M380.6 69.4L69.4 380.6" className="inbs-network-lines"/>
     <circle cx="225" cy="225" r="16" className="inbs-network-hub"/>
     <circle cx="225" cy="225" r="26" className="inbs-network-halo"/>
     <circle r="6" className="inbs-network-traveler"><animateMotion dur="15s" begin="-2s" repeatCount="indefinite" path="M225 225 L328 122 A146 146 0 0 1 371 225 L445 225 A220 220 0 0 1 335 415 L298 351 A146 146 0 0 0 225 371 L225 225" /></circle>
     <circle r="5" className="inbs-network-traveler"><animateMotion dur="19s" begin="-8s" repeatCount="indefinite" path="M225 225 L122 122 A146 146 0 0 0 79 225 L5 225 A220 220 0 0 0 115 415 L152 351 A146 146 0 0 1 225 371 L225 225" /></circle>
     <circle r="5.5" className="inbs-network-traveler"><animateMotion dur="23s" begin="-15s" repeatCount="indefinite" path="M225 225 L225 79 A146 146 0 0 1 351 152 L416 115 A220 220 0 0 1 335 35 L298 99 A146 146 0 0 0 225 79 L225 225" /></circle>
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
