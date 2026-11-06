import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ComingSoon} from '@/components/layout/coming-soon';
import {isLocale,locales,pages} from '@/lib/site';
type Params={locale:string;slug:string[]};
function findTitle(locale:'en'|'ar',slug:string[]):string|null {
 if(slug.length===1){const p=pages.find(p=>p.slug===slug[0]);return p?p[locale]:null}
 return null;
}
export function generateStaticParams(){
 return locales.flatMap(locale=>[
 ...pages.filter(p=>p.slug!=='about'&&p.slug!=='services'&&p.slug!=='team').map(p=>({locale,slug:[p.slug]})),
 ]);
}
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
 const {locale,slug}=await params;
 if(!isLocale(locale)) return {};
 const title=findTitle(locale,slug);
 return title?{title,robots:{index:false,follow:true}}:{};
}
export default async function Page({params}:{params:Promise<Params>}){
 const {locale,slug}=await params;
 if(!isLocale(locale))notFound();
 const title=findTitle(locale,slug);
 if(!title)notFound();
 return <ComingSoon locale={locale} title={title}/>;
}
