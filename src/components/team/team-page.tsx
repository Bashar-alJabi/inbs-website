import { ArrowDown } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { EditorialCta } from '@/components/shared/editorial-cta';
import { teamPageContent } from '@/content/team-page';
import type { Locale } from '@/lib/site';

/**
 * Identity-free Team landing page.
 * Real employee cards must not be added without approved names, positions and photos.
 */
export function TeamPage({ locale }: { locale: Locale }) {
  const t = teamPageContent[locale];
  return <main className="inbs-team-page">
    <section className="inbs-team-hero" aria-labelledby="inbs-team-title">
      <div className="inbs-team-hero-glow" aria-hidden="true"/>
      <div className="site-shell inbs-team-hero-grid">
        <div className="inbs-team-hero-copy">
          <p className="inbs-team-kicker inbs-team-hero-eyebrow"><span aria-hidden="true"/>{t.eyebrow}</p>
          <h1 id="inbs-team-title"><span>{t.titleOne}</span><span>{t.titleTwo}</span></h1>
          <p className="inbs-team-hero-lead">{t.lead}</p>
          <a href="#team-approach" className="inbs-team-link">{t.explore}<ArrowDown size={19} aria-hidden="true"/></a>
        </div>
        <div className="inbs-team-art" aria-hidden="true">
          <div className="inbs-team-art-outline"/>
          <div className="inbs-team-art-panel inbs-team-art-panel-one"><span>01</span></div>
          <div className="inbs-team-art-panel inbs-team-art-panel-two"><span>02</span></div>
          <div className="inbs-team-art-panel inbs-team-art-panel-three"><span>03</span></div>
          <div className="inbs-team-art-line inbs-team-art-line-one"/>
          <div className="inbs-team-art-line inbs-team-art-line-two"/>
          <span className="inbs-team-art-marker inbs-team-art-marker-one"/>
          <span className="inbs-team-art-marker inbs-team-art-marker-two"/>
          <span className="inbs-team-art-marker inbs-team-art-marker-three"/>
          <span className="inbs-team-art-caption" dir="ltr">INBS / PEOPLE FIRST</span>
        </div>
        <div className="inbs-team-hero-footer"><span>{t.location}</span><span>{t.signature}</span></div>
      </div>
    </section>

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

    <section className="inbs-team-note" aria-labelledby="inbs-team-note-title">
      <div className="site-shell inbs-team-note-grid">
        <Reveal>
          <p className="inbs-team-kicker"><span aria-hidden="true"/>{t.noteEyebrow}</p>
          <h2 id="inbs-team-note-title">{t.noteTitle}</h2>
        </Reveal>
        <Reveal delay={0.1}><p>{t.noteBody}</p></Reveal>
      </div>
    </section>

    <EditorialCta locale={locale} variant="team"/>
  </main>;
}
