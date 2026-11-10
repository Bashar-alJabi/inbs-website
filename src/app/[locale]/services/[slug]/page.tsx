import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetailPage } from '@/components/service-detail/service-detail-page';
import { serviceDetailContent } from '@/content/service-detail-catalog';
import { serviceCatalog, serviceSlugs, type ServiceSlug } from '@/content/services';
import { isLocale, locales } from '@/lib/site';
import { routes } from '@/lib/routes';
import { localeAlternates, siteIndexable, siteUrl } from '@/lib/seo';
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
  const description = serviceDetailContent[slug][locale].heroLead;
  const path = routes.service(locale,slug);
  return {
    title, description,
    alternates:{canonical:`${siteUrl}${path}`,languages:localeAlternates(`/services/${slug}`)},
    openGraph:{title,description,url:`${siteUrl}${path}`,siteName:'INBS',type:'website',locale:locale==='ar'?'ar_AE':'en_US'},
    // Public indexing remains gated by the central launch switch.
    robots:{index:siteIndexable,follow:siteIndexable},
  };
}

export default async function ServiceDetail({params}:{params:Promise<Params>}) {
  const {locale,slug} = await params;
  if(!isLocale(locale) || !isServiceSlug(slug)) notFound();
  return <ServiceDetailPage locale={locale} slug={slug}/>;
}
