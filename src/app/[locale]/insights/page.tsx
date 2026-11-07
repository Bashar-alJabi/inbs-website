import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightsPage } from '@/components/insights/insights-page';
import { insightsPageContent } from '@/content/insights-page';
import { isLocale,locales } from '@/lib/site';
import { localeAlternates,siteIndexable,siteUrl } from '@/lib/seo';
import '@/styles/insights.css';
type Params={locale:string};
export function generateStaticParams(){return locales.map(locale=>({locale}))}
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
 const {locale}=await params;if(!isLocale(locale))return {};
 const title=locale==='ar'?'المقالات | INBS':'Insights | INBS';
 const description=insightsPageContent[locale].lead;
 const url=`${siteUrl}/${locale}/insights`;
 return {title,description,alternates:{canonical:url,languages:localeAlternates('/insights')},
 openGraph:{title,description,url,siteName:'INBS',type:'website',locale:locale==='ar'?'ar_AE':'en_US'},
 robots:{index:siteIndexable,follow:siteIndexable}};
}
export default async function Page({params}:{params:Promise<Params>}){
 const {locale}=await params;if(!isLocale(locale))notFound();
 return <InsightsPage locale={locale}/>;
}
