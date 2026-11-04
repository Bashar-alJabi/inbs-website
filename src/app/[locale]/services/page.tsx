import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServicesPage } from '@/components/services/services-page';
import { servicesPageContent } from '@/content/services-page';
import { isLocale, locales } from '@/lib/site';
import { routes } from '@/lib/routes';
import { localeAlternates, siteIndexable, siteUrl } from '@/lib/seo';
import '@/styles/services.css';

type Params = { locale: string };

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === 'ar' ? 'خدماتنا' : 'Our Services';
  const description = servicesPageContent[locale].introduction;
  return {
    title, description,
    alternates: { canonical: `${siteUrl}${routes.page(locale,'services')}`, languages: localeAlternates('/services') },
    openGraph: {
      title, description, url: `${siteUrl}${routes.page(locale,'services')}`,
      siteName: 'INBS', type: 'website', locale: locale === 'ar' ? 'ar_AE' : 'en_US',
    },
    robots: { index: siteIndexable, follow: siteIndexable },
  };
}

export default async function Services({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ServicesPage locale={locale}/>;
}
