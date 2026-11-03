/** One authoritative service catalog for labels, slugs and images. */
export const services = [
  { slug: 'businessmen-services', en: 'Businessmen Services', ar: 'خدمات رجال الأعمال', image: '/images/services/businessmen-services.webp' },
  { slug: 'real-estate-services', en: 'Real Estate Services', ar: 'الخدمات العقارية', image: '/images/services/real-estate-services.webp' },
  { slug: 'website-services', en: 'Website Services', ar: 'خدمات المواقع الإلكترونية', image: '/images/services/website-services.webp' },
  { slug: 'typing-services', en: 'Typing Services', ar: 'خدمات الطباعة', image: '/images/services/typing-services.webp' },
  { slug: 'tourism-services', en: 'Tourism Services', ar: 'الخدمات السياحية', image: '/images/services/tourism-services.webp' },
  { slug: 'financial-services', en: 'Financial Services', ar: 'الخدمات المالية', image: '/images/services/financial-services.webp' },
  { slug: 'consultation-services', en: 'Consultation', ar: 'الاستشارات', image: '/images/services/consultation-services.webp' },
  { slug: 'customs-services', en: 'Customs Services', ar: 'الخدمات الجمركية', image: '/images/services/customs-services.webp' },
  { slug: 'cargo-services', en: 'Cargo Services', ar: 'خدمات الشحن', image: '/images/services/cargo-services.webp' },
  { slug: 'citizenship-and-immigration-services', en: 'Citizenship & Immigration Services', ar: 'خدمات الجنسية والهجرة', image: '/images/services/citizenship-immigration-services.webp' },
] as const;
export type ServiceSlug = (typeof services)[number]['slug'];
export const serviceSlugs: readonly ServiceSlug[] = services.map(service => service.slug);
export const serviceNames: Record<ServiceSlug, { en: string; ar: string }> =
  Object.fromEntries(services.map(({ slug, en, ar }) => [slug, { en, ar }])) as Record<ServiceSlug, { en: string; ar: string }>;
