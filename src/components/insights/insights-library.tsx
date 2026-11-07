'use client';
import { useState } from 'react';
import { insightArticles, type InsightCategory } from '@/content/insights';
import { insightsPageContent } from '@/content/insights-page';
import { InsightCard } from './insight-card';
import type { Locale } from '@/lib/site';
type Filter='all'|InsightCategory;
const categories:Filter[]=['all','setup','people','compliance'];
export function InsightsLibrary({locale}:{locale:Locale}){
 const [filter,setFilter]=useState<Filter>('all');
 const t=insightsPageContent[locale];
 const visible=insightArticles.filter(a=>filter==='all'||a.category===filter);
 return <section className="inbs-insights-library" id="insights-library" aria-labelledby="inbs-insights-library-title">
  <div className="site-shell">
   <div className="inbs-insights-library-header">
    <div><p className="inbs-insights-section-kicker">{t.libraryEyebrow}</p><h2 id="inbs-insights-library-title">{t.libraryTitle}</h2></div>
    <p>{t.libraryLead}</p>
   </div>
   <div className="inbs-insights-filters" role="group" aria-label={locale==='ar'?'تصفية المقالات حسب الموضوع':'Filter articles by topic'}>
    {categories.map(cat=><button key={cat} type="button" aria-pressed={filter===cat} className={filter===cat?'is-active':''} onClick={()=>setFilter(cat)}>{cat==='all'?t.all:t.categories[cat]}</button>)}
   </div>
   <div className="inbs-insights-cards">
    {visible.map(a=><InsightCard key={a.slug} article={a} locale={locale}/>)}
   </div>
  </div>
 </section>;
}
