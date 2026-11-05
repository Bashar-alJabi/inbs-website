import { Reveal } from '@/components/shared/reveal';
import { teamPageContent } from '@/content/team-page';
import type { Locale } from '@/lib/site';

/**
 * One continuous editorial section: the seven photo slots share space
 * with the approach and its three principles rather than forming a gallery.
 * Real photos are added as /public/images/team/story-04.webp ... story-10.webp.
 */
export function TeamStory({ locale }: { locale: Locale }) {
  const t = teamPageContent[locale];

  return (
    <section className="inbs-team-story" id="team-approach" aria-labelledby="inbs-team-story-title">
      <div className="site-shell">
        <div className="inbs-team-story-opening">
          <Reveal className="inbs-team-story-heading">
            <p className="inbs-team-kicker"><span aria-hidden="true"/>{t.introEyebrow}</p>
            <h2 id="inbs-team-story-title">{t.introTitle}</h2>
            <p className="inbs-team-story-lead">{t.introLead}</p>
          </Reveal>
          <div className="inbs-team-story-opening-visuals" aria-hidden="true">
            <div className="inbs-team-story-photo inbs-team-story-photo--04"/>
            <div className="inbs-team-story-photo inbs-team-story-photo--05"/>
            <span className="inbs-team-story-orbit" />
          </div>
        </div>

        <div className="inbs-team-story-bridge">
          <Reveal className="inbs-team-story-bridge-copy">
            <p className="inbs-team-kicker"><span aria-hidden="true"/>{t.principlesEyebrow}</p>
            <h3>{t.principlesTitle}</h3>
          </Reveal>
          <span className="inbs-team-story-bridge-line" aria-hidden="true"/>
        </div>

        <div className="inbs-team-story-entries">
          {t.principles.map((principle, index) => (
            <div className={`inbs-team-story-entry inbs-team-story-entry--${index + 1}`} key={principle.code}>
              <Reveal className="inbs-team-story-entry-copy" delay={0.07}>
                <span className="inbs-team-story-entry-number" aria-hidden="true">0{index + 1}</span>
                <h4>{principle.title}</h4>
                <p>{principle.description}</p>
              </Reveal>
              <Reveal className="inbs-team-story-entry-visual" delay={0.14}>
                <div className={`inbs-team-story-photo inbs-team-story-photo--0${index + 6}`} aria-hidden="true"/>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="inbs-team-story-finale">
          <Reveal className="inbs-team-story-finale-copy">
            <span className="inbs-team-story-rule" aria-hidden="true"/>
            <p>{t.introBody}</p>
          </Reveal>
          <div className="inbs-team-story-finale-visuals" aria-hidden="true">
            <div className="inbs-team-story-photo inbs-team-story-photo--09"/>
            <div className="inbs-team-story-photo inbs-team-story-photo--10"/>
          </div>
        </div>
      </div>
    </section>
  );
}
