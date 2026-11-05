import { Reveal } from '@/components/shared/reveal';
import { teamPageContent } from '@/content/team-page';
import type { Locale } from '@/lib/site';

export function TeamPrinciples({ locale }: { locale: Locale }) {
  const t = teamPageContent[locale];
  return (
    <section className="inbs-team-principles" aria-labelledby="inbs-team-principles-title">
      <div className="site-shell">
        <Reveal className="inbs-team-principles-head">
          <p className="inbs-team-kicker"><span aria-hidden="true"/>{t.principlesEyebrow}</p>
          <h2 id="inbs-team-principles-title">{t.principlesTitle}</h2>
        </Reveal>
        <div className="inbs-team-principles-grid">
          {t.principles.map((principle, index) =>
            <Reveal key={principle.code} className="inbs-team-principle" delay={index * 0.07}>
              <span className="inbs-team-principle-code">{principle.code}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
