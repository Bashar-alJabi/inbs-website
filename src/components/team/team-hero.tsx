import { ArrowDown } from 'lucide-react';
import { teamPageContent } from '@/content/team-page';
import type { Locale } from '@/lib/site';

export function TeamHero({ locale }: { locale: Locale }) {
  const t = teamPageContent[locale];
  return (
    <section className="inbs-team-hero" aria-labelledby="inbs-team-title">
      <div className="inbs-team-hero-glow" aria-hidden="true"/>
      <div className="site-shell inbs-team-hero-inner">
        <div className="inbs-team-gallery" aria-label={t.galleryLabel} role="group">
          <div className="inbs-team-photo inbs-team-photo--event" role="img" aria-label={t.photoEvent}/>
          <div className="inbs-team-photo inbs-team-photo--portrait" role="img" aria-label={t.photoPortrait}/>
          <div className="inbs-team-photo inbs-team-photo--office" role="img" aria-label={t.photoOffice}/>
          <svg className="inbs-team-gallery-trails" viewBox="0 0 1100 540" preserveAspectRatio="none" aria-hidden="true">
            <path id="inbs-team-route-one" d="M160 125 C180 38 335 20 447 85 S635 124 730 75" />
            <path id="inbs-team-route-two" d="M816 410 C760 505 604 514 500 467 S289 424 218 483" />
            <circle r="4.5" className="inbs-team-gallery-traveler">
              <animateMotion dur="17s" repeatCount="indefinite" path="M160 125 C180 38 335 20 447 85 S635 124 730 75"/>
            </circle>
            <circle r="3.5" className="inbs-team-gallery-traveler inbs-team-gallery-traveler--second">
              <animateMotion dur="21s" begin="-9s" repeatCount="indefinite" path="M816 410 C760 505 604 514 500 467 S289 424 218 483"/>
            </circle>
            <circle cx="160" cy="125" r="3" className="inbs-team-gallery-node"/>
            <circle cx="730" cy="75" r="3" className="inbs-team-gallery-node"/>
            <circle cx="218" cy="483" r="3" className="inbs-team-gallery-node"/>
          </svg>
        </div>
        <div className="inbs-team-hero-story">
          <div className="inbs-team-hero-copy">
            <h1 id="inbs-team-title"><span>{t.titleOne}</span><span>{t.titleTwo}</span></h1>
          </div>
          <div className="inbs-team-hero-side">
            <p className="inbs-team-hero-lead">{t.lead}</p>
            <a href="#team-approach" className="inbs-team-link">{t.explore}<ArrowDown size={19} aria-hidden="true"/></a>
          </div>
        </div>
        <div className="inbs-team-hero-footer"><span>{t.location}</span><span>{t.signature}</span></div>
      </div>
    </section>
  );
}
