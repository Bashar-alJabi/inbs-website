import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContactPage } from '@/components/contact/contact-page';
import { isLocale, locales } from '@/lib/site';
import { routes } from '@/lib/routes';
import { localeAlternates, siteIndexable, siteUrl } from '@/lib/seo';
import '@/styles/contact.css';

type Params = { locale: string };

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === 'ar' ? 'تواصل معنا' : 'Contact Us';
  const description = locale === 'ar'
    ? 'تواصل مع الشبكة العالمية لخدمات رجال الأعمال INBS عبر الهاتف أو البريد الإلكتروني، وتعرّف إلى عنوان مكتبنا في الخليج التجاري، دبي.'
    : 'Contact International Network Businessmen Services (INBS) by phone or email, and find our office in Business Bay, Dubai.';
  const path = routes.page(locale, 'contact');
  return {
    title, description,
    alternates: { canonical: `${siteUrl}${path}`, languages: localeAlternates('/contact') },
    openGraph: { title, description, url: `${siteUrl}${path}`, siteName:'INBS', type:'website', locale: locale === 'ar' ? 'ar_AE' : 'en_US' },
    robots: { index: siteIndexable, follow: siteIndexable },
  };
}

export default async function Contact({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactPage locale={locale}/>;
}
