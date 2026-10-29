import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { isLocale, locales } from '@/lib/site';
export function generateStaticParams(){return locales.map(locale=>({locale}))}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {
 const {locale}=await params;
 if(!isLocale(locale)) notFound();
 return <div className="locale-app" dir={locale==='ar'?'rtl':'ltr'} lang={locale}><SiteHeader locale={locale}/>{children}<SiteFooter locale={locale}/></div>
}
