import type { Locale } from '@/lib/site';
import type { ServiceSlug } from '@/content/services';
import { ServiceHero } from './service-hero';
import { ServiceOverview } from './service-overview';
import { ServiceOfferings } from './service-offerings';
import { ServiceProcess } from './service-process';
import { ServiceCta } from './service-cta';

/** Composition only. All service pages use the approved editorial sections. */
export function ServiceDetailPage({locale,slug}:{locale:Locale;slug:ServiceSlug}) {
  return (
    <main className="inbs-service-detail" data-service={slug}>
      <ServiceHero locale={locale} slug={slug} />
      <ServiceOverview locale={locale} slug={slug} />
      <ServiceOfferings locale={locale} slug={slug} />
      <ServiceProcess locale={locale} slug={slug} />
      <ServiceCta locale={locale} slug={slug} />
    </main>
  );
}
