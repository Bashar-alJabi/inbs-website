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
    <span className="inbs-about-art-orbit inbs-about-art-orbit-outer" />
    <span className="inbs-about-art-orbit inbs-about-art-orbit-inner" />
    <span className="inbs-about-art-node inbs-about-art-node-one" />
    <span className="inbs-about-art-node inbs-about-art-node-two" />
    <span className="inbs-about-art-node inbs-about-art-node-three" />
    <span className="inbs-about-art-spoke inbs-about-art-spoke-a"><span className="inbs-about-art-pulse" /></span>
    <span className="inbs-about-art-spoke inbs-about-art-spoke-b"><span className="inbs-about-art-pulse" /></span>
    <span className="inbs-about-art-spoke inbs-about-art-spoke-c"><span className="inbs-about-art-pulse" /></span>
    <span className="inbs-about-art-spoke inbs-about-art-spoke-d"><span className="inbs-about-art-pulse" /></span>
    <span className="inbs-about-art-center" />
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
