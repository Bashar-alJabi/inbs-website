import { ArrowDown } from 'lucide-react';
import { preload } from 'react-dom';
import { contactPageContent } from '@/content/contact-page';
import { ContactHeroGallery } from './contact-hero-gallery';
import type { Locale } from '@/lib/site';

/**
 * Building photo blends into the dark Hero; three compact photo thumbnails replace
 * the former text card. CSS references fixed public WebP filenames so the
 * owner can supply/replace photographs without editing component code.
 */
export function ContactHero({ locale }: { locale: Locale }) {
  // Discover the measured LCP background before CSS without changing its rendering.
  preload('/images/contact/contact-building.webp', { as: 'image', fetchPriority: 'high' });
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
        <ContactHeroGallery label={t.heroGalleryLabel} closeLabel={t.heroClosePhoto} photos={[
          {key:'building',label:t.heroBuildingAlt,path:'/images/contact/contact-building.webp'},
          {key:'office',label:t.heroOfficeAlt,path:'/images/contact/contact-office.webp'},
          {key:'door',label:t.heroDoorAlt,path:'/images/contact/contact-door.webp'},
        ]}/>
        <p className="inbs-contact-hero-bottom">{t.heroLocation}</p>
      </div>
    </section>
  );
}
