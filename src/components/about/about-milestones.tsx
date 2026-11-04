import { Reveal } from '@/components/shared/reveal';
import { companyMilestones } from '@/content/milestones';
import { aboutPageContent } from '@/content/about';
import type { Locale } from '@/lib/site';

/** Integrated editorial feature inside the About story, not a second Home metrics strip. */
export function AboutMilestones({ locale }: { locale: Locale }) {
  const t = aboutPageContent[locale];
  const [featured, ...supporting] = companyMilestones;
  return <div className="inbs-story-milestones" role="group" aria-label={t.milestonesEyebrow}>
    <Reveal className="inbs-story-milestones-feature">
      <p className="inbs-story-milestones-kicker">{t.milestonesEyebrow}</p>
      <div className="inbs-story-milestones-feature-figure">
        <strong dir="ltr">{featured.value.toLocaleString('en-US')}<span>+</span></strong>
        <span>{featured[locale]}</span>
      </div>
    </Reveal>
    <div className="inbs-story-milestones-details">
      {supporting.map((fact, index) =>
        <Reveal key={fact.en} delay={index * 0.08} className="inbs-story-milestones-detail">
          <span className="inbs-story-milestones-detail-no" aria-hidden="true">{String(index + 2).padStart(2, '0')}</span>
          <div className="inbs-story-milestones-detail-copy">
            <strong dir="ltr">{fact.value.toLocaleString('en-US')}<span>+</span></strong>
            <span>{fact[locale]}</span>
          </div>
        </Reveal>
      )}
    </div>
  </div>;
}
