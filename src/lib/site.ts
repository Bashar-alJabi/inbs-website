export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale => locales.some((locale) => locale === value);
export const pages = [
  { slug: 'about', en: 'About', ar: 'من نحن' },
  { slug: 'services', en: 'Services', ar: 'الخدمات' },
  { slug: 'team', en: 'Our Team', ar: 'الفريق' },
  { slug: 'insights', en: 'Insights', ar: 'مقالات' },
  { slug: 'careers', en: 'Careers', ar: 'الوظائف' },
  { slug: 'contact', en: 'Contact', ar: 'تواصل معنا' },
  { slug: 'privacy-policy', en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  { slug: 'terms', en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
] as const;
// Service labels, slugs and imagery have one source of truth.
export { serviceSlugs, serviceNames } from '@/content/services';
export function alternateLocale(locale:Locale):Locale {return locale==='en'?'ar':'en'}
