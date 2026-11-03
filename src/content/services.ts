/**
 * Authoritative service catalog.
 *
 * Edit a service's names, image or slug here only. Object order controls
 * display order throughout the site; UI icons are selected by slug.
 * Slugs are public URLs: changing one requires redirect planning.
 */
export const serviceCatalog = {
  'businessmen-services': {
    en: 'Businessmen Services', ar: 'خدمات رجال الأعمال',
    image: '/images/services/businessmen-services.webp',
  },
  'real-estate-services': {
    en: 'Real Estate Services', ar: 'الخدمات العقارية',
    image: '/images/services/real-estate-services.webp',
  },
  'website-services': {
    en: 'Website Services', ar: 'خدمات المواقع الإلكترونية',
    image: '/images/services/website-services.webp',
  },
  'typing-services': {
    en: 'Typing Services', ar: 'خدمات الطباعة',
    image: '/images/services/typing-services.webp',
  },
  'tourism-services': {
    en: 'Tourism Services', ar: 'الخدمات السياحية',
    image: '/images/services/tourism-services.webp',
  },
  'financial-services': {
    en: 'Financial Services', ar: 'الخدمات المالية',
    image: '/images/services/financial-services.webp',
  },
  'consultation-services': {
    en: 'Consultation', ar: 'الاستشارات',
    image: '/images/services/consultation-services.webp',
  },
  'customs-services': {
    en: 'Customs Services', ar: 'الخدمات الجمركية',
    image: '/images/services/customs-services.webp',
  },
  'cargo-services': {
    en: 'Cargo Services', ar: 'خدمات الشحن',
    image: '/images/services/cargo-services.webp',
  },
  'citizenship-and-immigration-services': {
    en: 'Citizenship & Immigration Services', ar: 'خدمات الجنسية والهجرة',
    image: '/images/services/citizenship-immigration-services.webp',
  },
} as const;

export type ServiceSlug = keyof typeof serviceCatalog;
export const serviceSlugs = Object.keys(serviceCatalog) as ServiceSlug[];

/** Backward-compatible name lookup; references catalog, not a second copy. */
export const serviceNames: Record<ServiceSlug, { en: string; ar: string }> = serviceCatalog;
