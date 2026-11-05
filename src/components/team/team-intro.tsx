import { Reveal } from '@/components/shared/reveal';
import { teamPageContent } from '@/content/team-page';
import type { Locale } from '@/lib/site';

export function TeamIntro({ locale }: { locale: Locale }) {
  const t = teamPageContent[locale];
  return (
    <section className="inbs-team-intro" id="team-approach" aria-labelledby="inbs-team-intro-title">
      <div className="site-shell inbs-team-intro-grid">
        <Reveal>
          <p className="inbs-team-kicker"><span aria-hidden="true"/>{t.introEyebrow}</p>
          <h2 id="inbs-team-intro-title">{t.introTitle}</h2>
        </Reveal>
        <Reveal className="inbs-team-intro-copy" delay={0.1}>
          <p className="inbs-team-intro-lead">{t.introLead}</p>
          <p>{t.introBody}</p>
        </Reveal>
      </div>
    </section>
  );
}
