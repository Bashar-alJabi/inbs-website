import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { CustomCursor } from '@/components/layout/custom-cursor';
import { isLocale, locales } from '@/lib/site';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="locale-app">
          <CustomCursor />
          <SiteHeader locale={locale} />
          {children}
          <SiteFooter locale={locale} />
        </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
