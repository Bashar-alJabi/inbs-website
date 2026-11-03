import { Reveal } from '@/components/shared/reveal';
import { aboutPageContent } from '@/content/about';
import type { Locale } from '@/lib/site';
import { AboutLines, AboutSectionLabel } from './about-ui';

export function AboutIntro({ locale }: { locale: Locale }) {
  const t = aboutPageContent[locale];
  return <section id="our-story" className="inbs-story-intro" aria-labelledby="inbs-story-intro-heading">
    <div className="site-shell inbs-story-intro-grid">
      <Reveal className="inbs-story-intro-heading">
        <AboutSectionLabel>{t.introEyebrow}</AboutSectionLabel>
        <h2 id="inbs-story-intro-heading"><AboutLines text={t.introTitle}/></h2>
        <div className="inbs-story-year" aria-label={`${t.foundedLabel} ${t.foundedValue}`}>
          <span>{t.foundedValue}</span><span>{t.foundedLabel}</span>
        </div>
      </Reveal>
      <Reveal className="inbs-story-intro-body" delay={0.12}>
        <p className="inbs-story-quote">{t.introQuote}</p>
        <div className="inbs-story-intro-rule" aria-hidden="true"/>
        {t.introParagraphs.map(paragraph =>
          <p className="inbs-story-body-copy" key={paragraph}>{paragraph}</p>
        )}
      </Reveal>
    </div>
  </section>;
}
