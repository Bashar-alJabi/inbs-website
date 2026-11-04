import { Reveal } from '@/components/shared/reveal';
import { companyMilestones } from '@/content/milestones';
import { aboutPageContent } from '@/content/about';
import type { Locale } from '@/lib/site';

/** Four staggered metrics connected by one continuous, angled network path. */
export function AboutMilestones({ locale }: { locale: Locale }) {
  const t = aboutPageContent[locale];
  const path = 'M 125 145 L 250 145 L 375 275 L 500 275 L 625 145 L 750 145 L 875 275';

  return <div className="inbs-story-milestones" role="group" aria-label={t.milestonesEyebrow}>
    <p className="inbs-story-milestones-kicker">{t.milestonesEyebrow}</p>
    <div className="inbs-story-milestones-grid">
      <svg className="inbs-story-milestones-network" viewBox="0 0 1000 350" preserveAspectRatio="none" aria-hidden="true">
        <path className="inbs-story-milestones-network-path" d={path}/>
        {[{x:125,y:145},{x:375,y:275},{x:625,y:145},{x:875,y:275}].map(({x,y}) =>
          <circle className="inbs-story-milestones-network-node" key={x} cx={x} cy={y} r="4"/>
        )}
        <circle className="inbs-story-milestones-network-traveler" r="4.5">
          <animateMotion dur="20s" repeatCount="indefinite" path={path}/>
          <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.1;0.9;1" dur="20s" repeatCount="indefinite"/>
        </circle>
      </svg>
      {companyMilestones.map((fact, index) =>
        <Reveal key={fact.en} delay={index * 0.06} className={`inbs-story-milestone inbs-story-milestone--${index + 1}`}>
          <span className="inbs-story-milestone-overline">{String(index + 1).padStart(2, '0')} / INBS</span>
          <strong dir="ltr">{fact.value.toLocaleString('en-US')}<span>+</span></strong>
          <span className="inbs-story-milestone-caption">{fact[locale]}</span>
        </Reveal>
      )}
    </div>
  </div>;
}
