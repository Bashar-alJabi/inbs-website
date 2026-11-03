'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import { motion } from 'motion/react';
import { alternateLocale, type Locale } from '@/lib/site';

/** Keep the current page path when switching between the two supported locales. */
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const alternate = alternateLocale(locale);
  const segments = (pathname ?? `/${locale}`).split('/').filter(Boolean);
  const translatedPath = '/' + [alternate, ...segments.slice(1)].join('/');

  return (
    <Link
      href={translatedPath}
      className="inbs-icon-button"
      lang={alternate}
      hrefLang={alternate}
      aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      title={locale === 'ar' ? 'English' : 'العربية'}
    >
      <motion.span whileHover={{ rotate: -13, scale: 1.13 }}>
        <Languages size={20} aria-hidden="true" />
      </motion.span>
    </Link>
  );
}
