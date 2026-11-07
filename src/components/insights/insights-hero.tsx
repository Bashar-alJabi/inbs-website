import type { Locale } from '@/lib/site';
import { insightsPageContent } from '@/content/insights-page';
export function InsightsHero({locale}:{locale:Locale}){
 const t=insightsPageContent[locale];
 return <section className="inbs-insights-hero" aria-labelledby="inbs-insights-title">
  <div className="inbs-insights-hero-decor" aria-hidden="true"><div className="inbs-insights-hero-square inbs-insights-hero-square--outer"><i/></div><div className="inbs-insights-hero-square inbs-insights-hero-square--inner"><i/></div><span>INBS</span></div>
  <div className="site-shell inbs-insights-hero-inner">
   <p className="inbs-insights-kicker">{t.eyebrow}</p>
   <h1 id="inbs-insights-title"><span>{t.titleOne}</span><span>{t.titleTwo}</span></h1>
   <p className="inbs-insights-hero-lead">{t.lead}</p>
   <div className="inbs-insights-hero-foot"><span>{locale==='ar'?'دبي / الإمارات العربية المتحدة':'DUBAI / UNITED ARAB EMIRATES'}</span><span>INBS / EDITORIAL</span></div>
  </div>
 </section>;
}
