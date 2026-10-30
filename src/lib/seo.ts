/** Central public origin; override on final hosting. */
export const siteUrl = (process.env.SITE_URL || 'https://inbs-uae.com').replace(/\/$/, '');
/** Publishing must be explicitly enabled after the final-domain checks. */
export const siteIndexable = process.env.SITE_INDEXABLE === 'true';
export const localeAlternates = (path = '') => ({
 en: `${siteUrl}/en${path}`,
 ar: `${siteUrl}/ar${path}`,
 'x-default': `${siteUrl}/en${path}`,
});
