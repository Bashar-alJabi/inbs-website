import { Reveal } from '@/components/shared/reveal';
import { companyMilestones } from '@/content/milestones';
import { aboutPageContent } from '@/content/about';
import type { Locale } from '@/lib/site';

/** Open, connected typography: a four-node editorial network, not a metrics card. */
export function AboutMilestones({ locale }: { locale: Locale }) {
  const t = aboutPageContent[locale];
  return <div className="inbs-story-milestones" role="group" aria-label={t.milestonesEyebrow}>
    <p className="inbs-story-milestones-kicker">{t.milestonesEyebrow}</p>
    <div className="inbs-story-milestones-axis" aria-hidden="true">
      <span className="inbs-story-milestones-axis-dot"/>
    </div>
    {companyMilestones.map((fact, index) =>
      <Reveal key={fact.en} delay={index * 0.06} className={`inbs-story-milestone inbs-story-milestone--${index + 1}`}>
        <span className="inbs-story-milestone-anchor" aria-hidden="true"/>
        <span className="inbs-story-milestone-overline">{String(index + 1).padStart(2, '0')} / INBS</span>
        <strong dir="ltr">{fact.value.toLocaleString('en-US')}<span>+</span></strong>
        <span className="inbs-story-milestone-caption">{fact[locale]}</span>
      </Reveal>
    )}
  </div>;
}
