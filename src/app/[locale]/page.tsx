import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Homepage } from '@/components/home/homepage';
import { isLocale } from '@/lib/site';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> {
 const {locale}=await params;
 return {title:locale==='ar'?'الرئيسية | الشبكة العالمية لخدمات رجال الأعمال':'International Network Businessmen Services',description:locale==='ar'?'خدمات رجال الأعمال والاستشارات والعقارات والسياحة والشحن في دبي منذ 2003.':'INBS offers business services, consulting, real estate, tourism and cargo services in Dubai. Established in 2003.'};
}
export default async function Home({params}:{params:Promise<{locale:string}>}) {
 const {locale}=await params;
 if(!isLocale(locale))notFound();
 return <Homepage locale={locale}/>;
}
