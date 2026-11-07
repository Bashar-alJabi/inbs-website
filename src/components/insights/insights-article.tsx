import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { insightsPageContent } from '@/content/insights-page';
import type { InsightArticle } from '@/content/insights';
import { insightArticles } from '@/content/insights';
import { InsightCard } from './insight-card';
import { InsightsCta } from './insights-cta';
import type { Locale } from '@/lib/site';
export function InsightsArticle({article,locale}:{article:InsightArticle;locale:Locale}){
 const t=article.content[locale],ui=insightsPageContent[locale];
 const more=insightArticles.filter(a=>a.slug!==article.slug).slice(0,2);
 return <main className="inbs-insights-page inbs-insights-article-page">
  <article>
   <header className="inbs-insights-article-hero">
    <div className="site-shell">
     <Link className="inbs-insights-article-back" href={`/${locale}/insights`}><ArrowLeft size={18} aria-hidden="true"/>{ui.back}</Link>
     <p className="inbs-insights-kicker">{t.categoryLabel} / INBS INSIGHTS</p>
     <h1>{t.title}</h1><p className="inbs-insights-article-intro">{t.summary}</p>
    </div>
   </header>
   <div className="inbs-insights-article-body">
    <div className="site-shell inbs-insights-article-layout">
     <div className="inbs-insights-article-sections">{t.sections.map((sec,i)=><section key={sec.heading}>
      <span className="inbs-insights-article-number">{String(i+1).padStart(2,'0')}</span>
      <h2>{sec.heading}</h2><p>{sec.body}</p>
     </section>)}
     <div className="inbs-insights-article-source"><span>{ui.source}</span><a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">{locale==='ar'?'الاطلاع على الإرشادات الرسمية':'Read the official guidance'}<ArrowUpRight size={17} aria-hidden="true"/></a><p>{ui.notice}</p></div>
     </div>
     <aside className="inbs-insights-article-aside" aria-label={locale==='ar'?'معلومات المقال':'Article details'}><span>INBS / INSIGHTS</span><strong>{t.categoryLabel}</strong><i aria-hidden="true"/></aside>
    </div>
   </div>
  </article>
  <section className="inbs-insights-related" aria-labelledby="inbs-insights-related-title"><div className="site-shell">
   <p className="inbs-insights-section-kicker">{ui.related}</p><h2 id="inbs-insights-related-title">{ui.relatedTitle}</h2>
   <div className="inbs-insights-cards">{more.map(a=><InsightCard key={a.slug} article={a} locale={locale}/>)}</div>
  </div></section>
  <InsightsCta locale={locale}/>
 </main>;
}
