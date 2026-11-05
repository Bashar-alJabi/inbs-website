import type { Locale } from '@/lib/site';
import { TeamHero } from './team-hero';
import { TeamIntro } from './team-intro';
import { TeamPrinciples } from './team-principles';
import { TeamNote } from './team-note';
import { TeamCta } from './team-cta';

/** Page composition only. Each section owns its markup. */
export function TeamPage({ locale }: { locale: Locale }) {
  return <main className="inbs-team-page">
    <TeamHero locale={locale}/>
    <TeamIntro locale={locale}/>
    <TeamPrinciples locale={locale}/>
    <TeamNote locale={locale}/>
    <TeamCta locale={locale}/>
  </main>;
}
