import { Reveal } from '@/components/shared/reveal';
import { companyMilestones } from '@/content/milestones';
import { aboutPageContent } from '@/content/about';
import type { Locale } from '@/lib/site';

/** Quiet editorial metrics between the company story and its principles. */
export function AboutMilestones({ locale }: { locale: Locale }) {
  const t = aboutPageContent[locale];
  return <section className="inbs-story-milestones" aria-labelledby="inbs-story-milestones-heading">
    <div className="site-shell">
      <Reveal className="inbs-story-milestones-head">
        <h2 id="inbs-story-milestones-heading">{t.milestonesEyebrow}</h2>
        <span aria-hidden="true" className="inbs-story-milestones-rule"/>
      </Reveal>
      <div className="inbs-story-milestones-list">
        {companyMilestones.map((fact, index) =>
          <Reveal key={fact.en} delay={index * 0.06} className="inbs-story-milestone">
            <span className="inbs-story-milestone-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <strong className="inbs-story-milestone-value" dir="ltr">{fact.value.toLocaleString('en-US')}<span>+</span></strong>
            <span className="inbs-story-milestone-label">{fact[locale]}</span>
          </Reveal>
        )}
      </div>
    </div>
  </section>;
}
