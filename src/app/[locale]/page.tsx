import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Homepage } from '@/components/home/homepage';
import { isLocale } from '@/lib/site';
import { localeAlternates, siteIndexable, siteUrl } from '@/lib/seo';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> {
 const {locale}=await params;
 if(!isLocale(locale)) return {};
 const title = locale==='ar'?'الرئيسية | الشبكة العالمية لخدمات رجال الأعمال':'International Network Businessmen Services';
 const description = locale==='ar'?'خدمات رجال الأعمال والاستشارات والعقارات والسياحة والشحن في دبي منذ 2003.':'INBS offers business services, consulting, real estate, tourism and cargo services in Dubai. Established in 2003.';
 return {alternates:{canonical:`${siteUrl}/${locale}`,languages:localeAlternates()},openGraph:{title,description,url:`${siteUrl}/${locale}`,siteName:'INBS',locale:locale==='ar'?'ar_AE':'en_US',type:'website'},robots:{index:siteIndexable,follow:siteIndexable},title:locale==='ar'?'الرئيسية | الشبكة العالمية لخدمات رجال الأعمال':'International Network Businessmen Services',description};
}
export default async function Home({params}:{params:Promise<{locale:string}>}) {
 const {locale}=await params;
 if(!isLocale(locale))notFound();
 return <Homepage locale={locale}/>;
}
