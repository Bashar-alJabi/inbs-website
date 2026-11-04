import type { MetadataRoute } from 'next';
import { localeAlternates, siteIndexable, siteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteIndexable) return [];

  // Only completed public pages belong here; unfinished routes remain noindex.
  return ['', '/about'].flatMap(path =>
    ['en', 'ar'].map(locale => ({
      url: `${siteUrl}/${locale}${path}`,
      alternates: { languages: localeAlternates(path) },
      changeFrequency: 'monthly' as const,
      priority: path ? 0.8 : 1,
    })),
  );
}
