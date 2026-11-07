import { ArrowDown } from 'lucide-react';
import { contactPageContent } from '@/content/contact-page';
import type { Locale } from '@/lib/site';

/**
 * Building photo blends into the dark Hero; two editorial photo frames replace
 * the former text card. CSS references fixed public WebP filenames so the
 * owner can supply/replace photographs without editing component code.
 */
export function ContactHero({ locale }: { locale: Locale }) {
  const t = contactPageContent[locale];
  return (
    <section className="inbs-contact-hero" aria-labelledby="inbs-contact-title">
      <div className="inbs-contact-hero-building" aria-hidden="true"/>
      <div className="site-shell inbs-contact-hero-grid">
        <div className="inbs-contact-hero-copy">
          <p className="inbs-contact-kicker inbs-contact-hero-kicker"><span aria-hidden="true"/>{t.eyebrow}</p>
          <h1 id="inbs-contact-title"><span>{t.heroTitleOne}</span><span className="inbs-contact-highlight">{t.heroTitleTwo}</span></h1>
          <p className="inbs-contact-hero-lead">{t.heroLead}</p>
          <a className="inbs-contact-hero-discover" href="#contact-channels">{t.heroExplore}<ArrowDown size={19} aria-hidden="true"/></a>
        </div>
        <div className="inbs-contact-hero-gallery" role="group" aria-label={t.heroGalleryLabel}>
          <button className="inbs-contact-hero-photo inbs-contact-hero-photo--office" type="button" aria-label={t.heroOfficeAlt}>
            <span className="inbs-contact-photo-image" aria-hidden="true"/>
            <span className="inbs-contact-photo-traveler" aria-hidden="true"/>
          </button>
          <button className="inbs-contact-hero-photo inbs-contact-hero-photo--door" type="button" aria-label={t.heroDoorAlt}>
            <span className="inbs-contact-photo-image" aria-hidden="true"/>
            <span className="inbs-contact-photo-traveler" aria-hidden="true"/>
          </button>
        </div>
        <p className="inbs-contact-hero-bottom">{t.heroLocation}</p>
      </div>
    </section>
  );
}
