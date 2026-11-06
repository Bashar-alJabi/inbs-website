import type { Locale } from '@/lib/site';
import { BusinessmenHero } from './businessmen-hero';
import { BusinessmenOverview } from './businessmen-overview';
import { BusinessmenOfferings } from './businessmen-offerings';
import { BusinessmenProcess } from './businessmen-process';
import { BusinessmenCta } from './businessmen-cta';

/** Composition only; each section owns its own markup and the copy lives in content. */
export function BusinessmenDetailPage({ locale }: { locale: Locale }) {
  return (
    <main className="inbs-service-detail">
      <BusinessmenHero locale={locale} />
      <BusinessmenOverview locale={locale} />
      <BusinessmenOfferings locale={locale} />
      <BusinessmenProcess locale={locale} />
      <BusinessmenCta locale={locale} />
    </main>
  );
}
