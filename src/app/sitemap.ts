import type { MetadataRoute } from 'next';
import { localeAlternates, siteIndexable, siteUrl } from '@/lib/seo';
import { routes } from '@/lib/routes';
import { locales } from '@/lib/site';
import { insightArticles } from '@/content/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteIndexable) return [];

  // Only completed public pages belong here; unfinished routes remain noindex.
  const articlePaths = insightArticles.map(article => `/insights/${article.slug}`);
  return ['', '/about', '/services', '/team', '/contact', '/careers', '/insights', ...articlePaths].flatMap(path =>
    locales.map(locale => ({
      url: `${siteUrl}${path === '/about' ? routes.page(locale, 'about') : path === '/services' ? routes.page(locale, 'services') : path === '/team' ? routes.page(locale, 'team') : path === '/contact' ? routes.page(locale, 'contact') : path === '/careers' ? routes.page(locale, 'careers') : path ? `${'${siteUrl}'}/${'${locale}'}${'${path}'}` : routes.home(locale)}`,
      alternates: { languages: localeAlternates(path) },
      changeFrequency: 'monthly' as const,
      priority: path ? 0.8 : 1,
    })),
  );
}
