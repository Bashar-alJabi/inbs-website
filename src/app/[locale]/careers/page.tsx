import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CareersPage } from '@/components/careers/careers-page';
import { careersPageContent } from '@/content/careers-page';
import { isLocale, locales } from '@/lib/site';
import { routes } from '@/lib/routes';
import { localeAlternates, siteIndexable, siteUrl } from '@/lib/seo';
import '@/styles/careers.css';

type Params = { locale: string };

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === 'ar' ? 'الوظائف | INBS' : 'Careers | INBS';
  const description = careersPageContent[locale].heroLead;
  const url = `${siteUrl}${routes.page(locale,'careers')}`;
  return {
    title: { absolute: title }, description,
    alternates: { canonical:url, languages:localeAlternates('/careers') },
    openGraph: { title, description, url, siteName:'INBS', type:'website', locale:locale==='ar'?'ar_AE':'en_US' },
    robots: { index:siteIndexable, follow:siteIndexable },
  };
}

export default async function Careers({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CareersPage locale={locale}/>;
}
