import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AboutPage } from '@/components/about/about-page';
import { isLocale, locales } from '@/lib/site';
import { localeAlternates, siteIndexable, siteUrl } from '@/lib/seo';
import '@/styles/about.css';

type Params = { locale: string };

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === 'ar' ? 'من نحن' : 'About Us';
  const description = locale === 'ar'
    ? 'تعرّف على الشبكة العالمية لخدمات رجال الأعمال INBS، التي تأسست في دبي عام 2003، ونهجها وشبكة خدماتها المتنوعة.'
    : 'Meet International Network Businessmen Services (INBS), established in Dubai in 2003. Discover our approach and connected services.';
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/${locale}/about`, languages: localeAlternates('/about') },
    openGraph: {
      title, description, url: `${siteUrl}/${locale}/about`,
      siteName: 'INBS', type: 'website', locale: locale === 'ar' ? 'ar_AE' : 'en_US',
    },
    robots: { index: siteIndexable, follow: siteIndexable },
  };
}

export default async function About({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <AboutPage locale={locale} />;
}
