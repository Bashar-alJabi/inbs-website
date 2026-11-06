import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComingSoon } from '@/components/layout/coming-soon';
import { BusinessmenDetailPage } from '@/components/service-detail/service-detail-page';
import { businessmenDetailContent } from '@/content/service-details';
import { serviceCatalog, serviceSlugs, type ServiceSlug } from '@/content/services';
import { isLocale, locales } from '@/lib/site';
import { routes } from '@/lib/routes';
import { localeAlternates, siteUrl } from '@/lib/seo';
import '@/styles/service-detail.css';

type Params = { locale: string; slug: string };
const isServiceSlug = (slug: string): slug is ServiceSlug => serviceSlugs.some(item => item === slug);

export function generateStaticParams() {
  return locales.flatMap(locale => serviceSlugs.map(slug => ({ locale, slug })));
}

export async function generateMetadata({params}: {params: Promise<Params>}): Promise<Metadata> {
  const {locale, slug} = await params;
  if (!isLocale(locale) || !isServiceSlug(slug)) return {};
  const title = serviceCatalog[slug][locale];
  if (slug !== 'businessmen-services') return {title, robots:{index:false,follow:true}};
  const description = businessmenDetailContent[locale].heroLead;
  const path = routes.service(locale,slug);
  return {
    title, description,
    alternates:{canonical:`${siteUrl}${path}`,languages:localeAlternates(`/services/${slug}`)},
    openGraph:{title,description,url:`${siteUrl}${path}`,siteName:'INBS',type:'website',locale:locale==='ar'?'ar_AE':'en_US'},
    // Keep the first detail page unindexed until the full milestone is approved.
    robots:{index:false,follow:true},
  };
}

export default async function ServiceDetail({params}:{params:Promise<Params>}) {
  const {locale,slug} = await params;
  if(!isLocale(locale) || !isServiceSlug(slug)) notFound();
  if(slug === 'businessmen-services') return <BusinessmenDetailPage locale={locale}/>;
  return <ComingSoon locale={locale} title={serviceCatalog[slug][locale]}/>;
}
