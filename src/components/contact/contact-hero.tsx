import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { contactPageContent } from '@/content/contact-page';
import { companyContact } from '@/content/contact';
import type { Locale } from '@/lib/site';

export function ContactHero({ locale }: { locale: Locale }) {
  const t = contactPageContent[locale];
  return (
    <section className="inbs-contact-hero" aria-labelledby="inbs-contact-title">
      <div className="inbs-contact-hero-glow" aria-hidden="true"/>
      <div className="site-shell inbs-contact-hero-grid">
        <div className="inbs-contact-hero-copy">
          <p className="inbs-contact-kicker inbs-contact-hero-kicker"><span aria-hidden="true"/>{t.eyebrow}</p>
          <h1 id="inbs-contact-title"><span>{t.heroTitleOne}</span><span className="inbs-contact-highlight">{t.heroTitleTwo}</span></h1>
          <p className="inbs-contact-hero-lead">{t.heroLead}</p>
          <a className="inbs-contact-hero-discover" href="#contact-channels">{t.heroExplore}<ArrowDown size={19} aria-hidden="true"/></a>
        </div>
        <div className="inbs-contact-hero-scene">
          <div className="inbs-contact-rings" aria-hidden="true"><i/><i/><i/><b/></div>
          <div className="inbs-contact-hero-panel">
            <p>{t.heroPanelOverline}</p>
            <MapPin size={28} strokeWidth={1.5} aria-hidden="true"/>
            <h2>{t.heroPanelTitle}</h2>
            <span>{t.heroPanelBody}</span>
            <a href={companyContact.mapUrl} target="_blank" rel="noopener noreferrer" aria-label={t.mapAction}>
              {t.city}<ArrowUpRight size={18} aria-hidden="true"/>
            </a>
          </div>
        </div>
        <p className="inbs-contact-hero-bottom">{t.heroLocation}</p>
      </div>
    </section>
  );
}
