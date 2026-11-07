import type { Locale } from '@/lib/site';
import { CareersHero } from './careers-hero';
import { CareersWhy } from './careers-why';
import { CareersApply } from './careers-apply';
import { CareersCta } from './careers-cta';

/** Page composition only. Applications use email, with no submission backend. */
export function CareersPage({ locale }: { locale: Locale }) {
  return <main className="inbs-careers-page">
    <CareersHero locale={locale}/>
    <CareersWhy locale={locale}/>
    <CareersApply locale={locale}/>
    <CareersCta locale={locale}/>
  </main>;
}
