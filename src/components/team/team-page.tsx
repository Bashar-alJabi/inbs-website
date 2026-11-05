import type { Locale } from '@/lib/site';
import { TeamHero } from './team-hero';
import { TeamStory } from './team-story';
import { TeamCta } from './team-cta';

/** Page composition only. Each section owns its markup. */
export function TeamPage({ locale }: { locale: Locale }) {
  return <main className="inbs-team-page">
    <TeamHero locale={locale}/>
    <TeamStory locale={locale}/>
    <TeamCta locale={locale}/>
  </main>;
}
