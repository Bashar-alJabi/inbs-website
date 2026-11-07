import type { Locale } from '@/lib/site';
import { InsightsHero } from './insights-hero';
import { InsightsFeatured } from './insights-featured';
import { InsightsLibrary } from './insights-library';
import { InsightsCta } from './insights-cta';

export function InsightsPage({ locale }: { locale: Locale }) {
 return <main className="inbs-insights-page">
  <InsightsHero locale={locale}/>
  <InsightsFeatured locale={locale}/>
  <InsightsLibrary locale={locale}/>
  <InsightsCta locale={locale}/>
 </main>;
}
