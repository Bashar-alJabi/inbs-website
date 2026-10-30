import type { MetadataRoute } from 'next';
import { localeAlternates, siteIndexable, siteUrl } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
 if (!siteIndexable) return [];
 return ['en','ar'].map(locale=>({url:`${siteUrl}/${locale}`,alternates:{languages:localeAlternates()},changeFrequency:'monthly' as const,priority:1}));
}
