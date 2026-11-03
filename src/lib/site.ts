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
export const serviceSlugs = [
  'businessmen-services', 'real-estate-services', 'website-services',
  'typing-services', 'tourism-services', 'financial-services',
  'consultation-services', 'customs-services', 'cargo-services',
  'citizenship-and-immigration-services',
] as const;
export const serviceNames: Record<(typeof serviceSlugs)[number], {en:string; ar:string}> = {
  'businessmen-services': {en:'Businessmen Services',ar:'خدمات رجال الأعمال'},
  'real-estate-services': {en:'Real Estate Services',ar:'الخدمات العقارية'},
  'website-services': {en:'Website Services',ar:'خدمات المواقع الإلكترونية'},
  'typing-services': {en:'Typing Services',ar:'خدمات الطباعة'},
  'tourism-services': {en:'Tourism Services',ar:'الخدمات السياحية'},
  'financial-services': {en:'Financial Services',ar:'الخدمات المالية'},
  'consultation-services': {en:'Consultation',ar:'الاستشارات'},
  'customs-services': {en:'Customs Services',ar:'الخدمات الجمركية'},
  'cargo-services': {en:'Cargo Services',ar:'خدمات الشحن'},
  'citizenship-and-immigration-services': {en:'Citizenship & Immigration Services',ar:'خدمات الجنسية والهجرة'},
};
export function alternateLocale(locale:Locale):Locale {return locale==='en'?'ar':'en'}
