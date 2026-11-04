import { pages } from '@/lib/site';
import { serviceSlugs } from '@/content/services';

/**
 * Shared navigation selections, keeping names and URL paths in their catalogs.
 * Order in src/lib/site.ts controls page ordering. Footer services show the
 * first six in the canonical service catalog.
 */
export const primaryPages = pages.filter(page => page.slug === 'about' || page.slug === 'services');
export const drawerPages = pages.filter(page => page.slug !== 'privacy-policy' && page.slug !== 'terms');
export const footerQuickPages = pages.slice(0, 7);
export const footerLegalPages = pages.slice(-2);
export const footerServiceSlugs = serviceSlugs.slice(0, 6);
