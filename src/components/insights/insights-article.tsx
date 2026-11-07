import Link from 'next/link';
import Image from 'next/image';
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
    <Image className="inbs-insights-article-hero-image" src={`/images/insights/${article.slug}.webp`} alt="" fill sizes="100vw" priority />
    <div className="site-shell">
     <Link className="inbs-insights-article-back" href={`/${locale}/insights`}><ArrowLeft size={18} aria-hidden="true"/>{ui.back}</Link>
     <p className="inbs-insights-kicker">{t.categoryLabel} / INBS INSIGHTS</p>
     <h1>{t.title}</h1><p className="inbs-insights-article-intro">{t.summary}</p>
    </div>
   </header>
   <div className="inbs-insights-article-body">
    <div className="site-shell inbs-insights-article-layout">
     <div className="inbs-insights-article-sections">{t.sections.map((sec,i)=><section key={sec.heading} id={`insight-section-${i+1}`}>
      <span className="inbs-insights-article-number">{String(i+1).padStart(2,'0')}</span>
      <h2>{sec.heading}</h2><p>{sec.body}</p>
     </section>)}
     <div className="inbs-insights-article-source"><span>{ui.source}</span><a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">{locale==='ar'?'الاطلاع على الإرشادات الرسمية':'Read the official guidance'}<ArrowUpRight size={17} aria-hidden="true"/></a><p>{ui.notice}</p></div>
     </div>
     <aside className="inbs-insights-article-aside" aria-label={ui.articleContents}>
      <span>INBS / INSIGHTS</span>
      <strong>{t.categoryLabel}</strong>
      <nav aria-label={ui.articleContents}>
       <p className="inbs-insights-aside-label">{ui.articleContents}</p>
       <ol>{t.sections.map((sec,i)=><li key={sec.heading}>
        <a href={`#insight-section-${i+1}`}>
         <span aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
         <span>{sec.heading}</span>
        </a>
       </li>)}</ol>
      </nav>
     </aside>
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
