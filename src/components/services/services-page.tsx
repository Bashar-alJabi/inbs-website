import type { Locale } from '@/lib/site';
import { ServicesHero } from './services-hero';
import { ServicesDirectory } from './services-directory';
import { ServicesCta } from './services-cta';

/** Page composition only. All service data comes from the canonical catalog. */
export function ServicesPage({ locale }: { locale: Locale }) {
  return <main className="inbs-services-page">
    <ServicesHero locale={locale}/>
    <ServicesDirectory locale={locale}/>
    <ServicesCta locale={locale}/>
  </main>;
}
