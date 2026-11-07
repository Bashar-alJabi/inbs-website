import { Reveal } from '@/components/shared/reveal';
import { legalPageContent } from '@/content/legal-page';
import type { Locale } from '@/lib/site';

export function LegalOverview({ locale }: { locale: Locale }) {
 const t=legalPageContent[locale];
 return <section className="inbs-legal-overview" id="legal-overview" aria-labelledby="inbs-legal-overview-title">
  <div className="site-shell inbs-legal-overview-inner">
   <Reveal><p className="inbs-legal-section-kicker">{t.introEyebrow}</p><h2 id="inbs-legal-overview-title">{t.introTitle}</h2></Reveal>
   <Reveal delay={0.12}><p>{t.introLead}</p></Reveal>
  </div>
 </section>;
}
