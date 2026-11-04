import { pages } from '@/lib/site';
import { serviceSlugs } from '@/content/services';

/** Shared selections; page and service names always come from their catalogs. */
export const primaryPages = pages.filter(page => page.slug === 'about' || page.slug === 'services');
export const drawerPages = pages.filter(page => page.slug !== 'legal');
export const footerQuickPages = pages.filter(page => page.slug !== 'legal');
export const footerLegalPages = pages.filter(page => page.slug === 'legal');
export const footerServiceSlugs = serviceSlugs.slice(0, 5);
