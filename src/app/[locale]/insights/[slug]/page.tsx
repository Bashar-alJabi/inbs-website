import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightsArticle } from '@/components/insights/insights-article';
import { findInsight,insightArticles } from '@/content/insights';
import { isLocale,locales } from '@/lib/site';
import { localeAlternates,siteIndexable,siteUrl } from '@/lib/seo';
import '@/styles/insights.css';
type Params={locale:string;slug:string};
export function generateStaticParams(){return locales.flatMap(locale=>insightArticles.map(a=>({locale,slug:a.slug})))}
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
 const {locale,slug}=await params;if(!isLocale(locale))return {};
 const a=findInsight(slug);if(!a)return {};
 const t=a.content[locale],url=`${siteUrl}/${locale}/insights/${slug}`;
 return {title:`${t.title} | INBS`,description:t.summary,
 alternates:{canonical:url,languages:localeAlternates(`/insights/${slug}`)},
 openGraph:{title:t.title,description:t.summary,url,siteName:'INBS',type:'article',locale:locale==='ar'?'ar_AE':'en_US'},
 robots:{index:siteIndexable,follow:siteIndexable}};
}
export default async function Page({params}:{params:Promise<Params>}){
 const {locale,slug}=await params;if(!isLocale(locale))notFound();
 const article=findInsight(slug);if(!article)notFound();
 return <InsightsArticle locale={locale} article={article}/>;
}
