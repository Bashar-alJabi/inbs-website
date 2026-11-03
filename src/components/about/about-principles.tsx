import { MoveUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { aboutPageContent } from '@/content/about';
import type { Locale } from '@/lib/site';
import { AboutLines, AboutSectionLabel } from './about-ui';

export function AboutPrinciples({ locale }: { locale: Locale }) {
  const t = aboutPageContent[locale];
  return <section className="inbs-story-principles" aria-labelledby="inbs-story-principles-heading">
    <div className="site-shell">
      <Reveal className="inbs-story-section-head">
        <div>
          <AboutSectionLabel>{t.philosophyEyebrow}</AboutSectionLabel>
          <h2 id="inbs-story-principles-heading"><AboutLines text={t.philosophyTitle}/></h2>
        </div>
        <p>{t.philosophyLead}</p>
      </Reveal>
      <div className="inbs-story-principle-grid">
        {t.principles.map((item, index) =>
          <Reveal key={item.number} delay={index * 0.08}>
            <article className="inbs-story-principle">
              <span className="inbs-story-principle-number">{item.number}</span>
              <span className="inbs-story-principle-glyph" aria-hidden="true">
                <MoveUpRight size={28} strokeWidth={1.2}/>
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          </Reveal>
        )}
      </div>
    </div>
  </section>;
}
