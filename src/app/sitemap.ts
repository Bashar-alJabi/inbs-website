import type { MetadataRoute } from 'next';
import { localeAlternates, siteIndexable, siteUrl } from '@/lib/seo';
import { routes } from '@/lib/routes';
import { locales } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteIndexable) return [];

  // Only completed public pages belong here; unfinished routes remain noindex.
  return ['', '/about', '/services'].flatMap(path =>
    locales.map(locale => ({
      url: `${siteUrl}${path === '/about' ? routes.page(locale, 'about') : path === '/services' ? routes.page(locale, 'services') : routes.home(locale)}`,
      alternates: { languages: localeAlternates(path) },
      changeFrequency: 'monthly' as const,
      priority: path ? 0.8 : 1,
    })),
  );
}
