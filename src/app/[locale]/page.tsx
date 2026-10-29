import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/site';
import { ComingSoon } from '@/components/layout/coming-soon';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;
 return {title:locale==='ar'?'الرئيسية':'Home',robots:{index:false,follow:true}};
}
export default async function Home({params}:{params:Promise<{locale:string}>}) {
 const {locale}=await params;if(!isLocale(locale)) notFound();
 return <ComingSoon locale={locale} title={locale==='ar'?'الصفحة الرئيسية':'The next chapter begins here'}/>;
}
