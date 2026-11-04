'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { Reveal } from '@/components/shared/reveal';
import { companyMilestones } from '@/content/milestones';
import { aboutPageContent } from '@/content/about';
import type { Locale } from '@/lib/site';

function MilestoneCount({ value }: { value: number }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (reduced) {
      setCount(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1900;
    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [visible, reduced, value]);

  return <strong ref={ref} dir="ltr">{count.toLocaleString('en-US')}<span>+</span></strong>;
}

/** Four alternating milestones connected by one continuous zigzag path. */
export function AboutMilestones({ locale }: { locale: Locale }) {
  const t = aboutPageContent[locale];
  const desktopPath = 'M 125 145 L 250 145 L 375 275 L 500 275 L 625 145 L 750 145 L 875 275';
  const mobilePath = 'M 100 83 L 200 83 L 300 203 L 200 203 L 100 323 L 200 323 L 300 443';

  return <div className="inbs-story-milestones" role="group" aria-label={t.milestonesEyebrow}>
    <div className="inbs-story-milestones-grid">
      <svg className="inbs-story-milestones-network inbs-story-milestones-network--desktop" viewBox="0 0 1000 350" preserveAspectRatio="none" aria-hidden="true">
        <path className="inbs-story-milestones-network-path" d={desktopPath}/>
        {[{x:125,y:145},{x:375,y:275},{x:625,y:145},{x:875,y:275}].map(({x,y}) =>
          <circle className="inbs-story-milestones-network-node" key={x} cx={x} cy={y} r="4"/>
        )}
        <circle className="inbs-story-milestones-network-traveler" r="5">
          <animateMotion dur="22s" repeatCount="indefinite" path={desktopPath}/>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="22s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <svg className="inbs-story-milestones-network inbs-story-milestones-network--mobile" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path className="inbs-story-milestones-network-path" d={mobilePath}/>
        {[{x:100,y:83},{x:300,y:203},{x:100,y:323},{x:300,y:443}].map(({x,y}) =>
          <circle className="inbs-story-milestones-network-node" key={y} cx={x} cy={y} r="5"/>
        )}
        <circle className="inbs-story-milestones-network-traveler" r="4.5">
          <animateMotion dur="24s" repeatCount="indefinite" path={mobilePath}/>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="24s" repeatCount="indefinite"/>
        </circle>
      </svg>
      {companyMilestones.map((fact, index) =>
        <Reveal key={fact.en} delay={index * 0.06} className={`inbs-story-milestone inbs-story-milestone--${index + 1}`}>
          <MilestoneCount value={fact.value}/>
          <span className="inbs-story-milestone-caption">{fact[locale]}</span>
        </Reveal>
      )}
    </div>
  </div>;
}
