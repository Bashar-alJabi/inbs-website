import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { insightArticles, type InsightArticle } from '@/content/insights';
import { insightsPageContent } from '@/content/insights-page';
import type { Locale } from '@/lib/site';
export function InsightCard({article,locale}:{article:InsightArticle;locale:Locale}){
 const t=article.content[locale],ui=insightsPageContent[locale];
 const number=String(insightArticles.indexOf(article)+1).padStart(2,'0');
 return <article className="inbs-insights-card">
   <Link className={`inbs-insights-card-art inbs-insights-art--${article.category}`} href={`/${locale}/insights/${article.slug}`} aria-label={t.title}>
     <Image src={`/images/insights/${article.slug}.webp`} alt={t.title} fill sizes="(max-width: 600px) 100vw, (max-width: 950px) 50vw, 33vw" />
     <span className="inbs-insights-card-index" aria-hidden="true">{number}</span>
     <ArrowUpRight size={26} aria-hidden="true"/>
   </Link>
   <div className="inbs-insights-card-content"><span className="inbs-insights-meta">{t.categoryLabel}</span>
    <h3><Link href={`/${locale}/insights/${article.slug}`}>{t.title}</Link></h3>
    <p>{t.summary}</p>
    <Link className="inbs-insights-read" href={`/${locale}/insights/${article.slug}`}>{ui.read}<ArrowUpRight size={18} aria-hidden="true"/></Link>
   </div>
 </article>;
}
