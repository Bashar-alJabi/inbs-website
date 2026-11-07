import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalPage } from '@/components/legal/legal-page';
import { legalPageContent } from '@/content/legal-page';
import { isLocale, locales } from '@/lib/site';
import { routes } from '@/lib/routes';
import { localeAlternates, siteUrl } from '@/lib/seo';
import '@/styles/legal.css';

type Params={locale:string};
export function generateStaticParams(){return locales.map(locale=>({locale}))}

export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
 const {locale}=await params;if(!isLocale(locale))return {};
 const title=locale==='ar'?'المعلومات القانونية | INBS':'Legal Information | INBS';
 const description=legalPageContent[locale].heroLead;
 const url=`${siteUrl}${routes.page(locale,'legal')}`;
 return {title,description,alternates:{canonical:url,languages:localeAlternates('/legal')},
  openGraph:{title,description,url,siteName:'INBS',type:'website',locale:locale==='ar'?'ar_AE':'en_US'},
  // Operational privacy and legal policies require company confirmation before indexing.
  robots:{index:false,follow:true}};
}
export default async function Page({params}:{params:Promise<Params>}){
 const {locale}=await params;if(!isLocale(locale))notFound();
 return <LegalPage locale={locale}/>;
}
