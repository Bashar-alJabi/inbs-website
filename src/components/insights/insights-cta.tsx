import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { insightsPageContent } from '@/content/insights-page';
import { routes } from '@/lib/routes';
import type { Locale } from '@/lib/site';
export function InsightsCta({locale}:{locale:Locale}){
 const t=insightsPageContent[locale];
 return <section className="inbs-editorial-cta inbs-editorial-cta--insights" aria-labelledby="inbs-insights-cta-title">
 <div className="site-shell inbs-editorial-cta-inner">
 <Reveal className="inbs-editorial-cta-heading">
 <p className="inbs-editorial-cta-kicker"><span aria-hidden="true"/>{t.ctaEyebrow}</p>
 <h2 id="inbs-insights-cta-title">{t.ctaTitle.split('\n').map((line,i)=><span key={i}>{line}</span>)}</h2>
 </Reveal>
 <Reveal className="inbs-editorial-cta-body" delay={0.12}>
 <p>{t.ctaLead}</p>
 <Link className="inbs-editorial-cta-action inbs-editorial-cta-primary" href={routes.page(locale,'contact')}>{t.ctaAction}<ArrowUpRight size={20} aria-hidden="true"/></Link>
 <Link className="inbs-editorial-cta-action inbs-editorial-cta-secondary" href={routes.page(locale,'services')}>{t.ctaSecondary}<ArrowUpRight size={20} aria-hidden="true"/></Link>
 </Reveal></div></section>;
}
