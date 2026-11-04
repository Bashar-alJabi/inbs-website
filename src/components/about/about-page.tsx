import type { Locale } from '@/lib/site';
import { AboutHero } from './about-hero';
import { AboutIntro } from './about-intro';
import { AboutMilestones } from './about-milestones';
import { AboutPrinciples } from './about-principles';
import { AboutNetwork } from './about-network';

/** Page composition only. Sections, content and styles have separate owners. */
export function AboutPage({ locale }: { locale: Locale }) {
  return <main className="inbs-about-page" id="top">
    <AboutHero locale={locale}/>
    <AboutIntro locale={locale}/>
    <AboutMilestones locale={locale}/>
    <AboutPrinciples locale={locale}/>
    <AboutNetwork locale={locale}/>
  </main>;
}
