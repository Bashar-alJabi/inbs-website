import type { Locale } from '@/lib/site';
import type { ServiceSlug } from '@/content/services';
import { pages } from '@/lib/site';

export type PageSlug = (typeof pages)[number]['slug'];

/** Canonical locale-aware URLs. Visible labels remain in content catalogs. */
export const routes = {
  home: (locale: Locale) => `/${locale}`,
  page: (locale: Locale, slug: PageSlug) => `/${locale}/${slug}`,
  service: (locale: Locale, slug: ServiceSlug) => `/${locale}/services/${slug}`,
} as const;
