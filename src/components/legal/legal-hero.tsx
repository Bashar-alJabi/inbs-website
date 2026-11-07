import { ArrowDown } from 'lucide-react';
import { legalPageContent } from '@/content/legal-page';
import type { Locale } from '@/lib/site';

export function LegalHero({ locale }: { locale: Locale }) {
 const t=legalPageContent[locale];
 return <section className="inbs-legal-hero" aria-labelledby="inbs-legal-title">
  <div className="inbs-legal-hero-art" aria-hidden="true"><span className="inbs-legal-art-frame"/><span className="inbs-legal-art-frame inbs-legal-art-frame--inside"/><span className="inbs-legal-art-word">INBS</span></div>
  <div className="site-shell inbs-legal-hero-inner">
   <p className="inbs-legal-kicker"><span aria-hidden="true"/>{t.heroEyebrow}</p>
   <h1 id="inbs-legal-title">{t.heroTitle}</h1>
   <p className="inbs-legal-hero-lead">{t.heroLead}</p>
   <a className="inbs-legal-hero-jump" href="#legal-overview">{locale==='ar'?'اقرأ المعلومات القانونية':'Explore legal information'}<ArrowDown size={19} aria-hidden="true"/></a>
   <div className="inbs-legal-hero-foot"><span>{t.heroCaption}</span><span>INBS / LEGAL</span></div>
  </div>
 </section>;
}
