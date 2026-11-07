import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { insightArticles } from '@/content/insights';
import { insightsPageContent } from '@/content/insights-page';
import { Reveal } from '@/components/shared/reveal';
import type { Locale } from '@/lib/site';
export function InsightsFeatured({locale}:{locale:Locale}){
 const article=insightArticles[0],t=article.content[locale],ui=insightsPageContent[locale];
 return <section className="inbs-insights-featured" aria-labelledby="inbs-insights-featured-title">
  <div className="site-shell inbs-insights-featured-inner">
   <Reveal className="inbs-insights-featured-copy">
    <p className="inbs-insights-section-kicker">{ui.featured}</p>
    <h2 id="inbs-insights-featured-title">{t.title}</h2>
    <p>{t.summary}</p>
    <Link className="inbs-insights-featured-link" href={`/${locale}/insights/${article.slug}`}>{ui.read}<ArrowUpRight size={20} aria-hidden="true"/></Link>
   </Reveal>
   <Link className="inbs-insights-featured-art" href={`/${locale}/insights/${article.slug}`} aria-label={t.title}>
     <Image src={`/images/insights/${article.slug}.webp`} alt={t.title} fill sizes="(max-width: 950px) 100vw, 45vw" priority />
     <strong aria-hidden="true">INBS / INSIGHTS</strong>
   </Link>
  </div>
 </section>;
}
