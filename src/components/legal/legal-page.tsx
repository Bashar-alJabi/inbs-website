import type { Locale } from '@/lib/site';
import { LegalHero } from './legal-hero';
import { LegalOverview } from './legal-overview';
import { LegalSections } from './legal-sections';
import { LegalCta } from './legal-cta';

/** Legal page composition: editorial overview, detailed notices, then contact CTA. */
export function LegalPage({ locale }: { locale: Locale }) {
 return <main className="inbs-legal-page">
  <LegalHero locale={locale}/>
  <LegalOverview locale={locale}/>
  <LegalSections locale={locale}/>
  <LegalCta locale={locale}/>
 </main>;
}
