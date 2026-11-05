import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TeamPage } from '@/components/team/team-page';
import { teamPageContent } from '@/content/team-page';
import { isLocale, locales } from '@/lib/site';
import { routes } from '@/lib/routes';
import { localeAlternates, siteIndexable, siteUrl } from '@/lib/seo';
import '@/styles/team.css';

type Params = { locale: string };

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === 'ar' ? 'فريق العمل' : 'Our Team';
  const description = teamPageContent[locale].lead;
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${routes.page(locale, 'team')}`, languages: localeAlternates('/team') },
    openGraph: {
      title, description, url: `${siteUrl}${routes.page(locale, 'team')}`,
      siteName: 'INBS', type: 'website', locale: locale === 'ar' ? 'ar_AE' : 'en_US',
    },
    robots: { index: siteIndexable, follow: siteIndexable },
  };
}

export default async function Team({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <TeamPage locale={locale}/>;
}
