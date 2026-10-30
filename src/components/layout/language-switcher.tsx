'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { alternateLocale, type Locale } from '@/lib/site';

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const alternate = alternateLocale(locale);
  const segments = pathname.split('/').filter(Boolean);
  const translatedPath = '/' + [alternate, ...segments.slice(1)].join('/');
  return <Link className="language-link" lang={alternate} href={translatedPath} hrefLang={alternate}>
    {locale === 'en' ? 'العربية' : 'English'}
  </Link>;
}
