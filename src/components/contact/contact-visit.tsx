import { ArrowUpRight, MapPin } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { companyContact } from '@/content/contact';
import { contactPageContent } from '@/content/contact-page';
import type { Locale } from '@/lib/site';

export function ContactVisit({ locale }: { locale: Locale }) {
  const t = contactPageContent[locale];
  return (
    <section className="inbs-contact-visit" aria-labelledby="inbs-contact-visit-title">
      <div className="site-shell inbs-contact-visit-grid">
        <Reveal className="inbs-contact-visit-copy">
          <p className="inbs-contact-kicker"><span aria-hidden="true"/>{t.visitEyebrow}</p>
          <h2 id="inbs-contact-visit-title">{t.visitTitle}</h2>
          <p className="inbs-contact-visit-lead">{t.visitLead}</p>
          <div className="inbs-contact-visit-address">
            <span>{t.locationLabel}</span>
            <address>{companyContact.address[locale]}</address>
          </div>
          <a className="inbs-contact-visit-map-action" href={companyContact.mapUrl} target="_blank" rel="noopener noreferrer">
            {t.mapAction}<ArrowUpRight size={21} aria-hidden="true"/>
          </a>
          <p className="inbs-contact-map-note">{t.mapNote}</p>
        </Reveal>
        <Reveal className="inbs-contact-map-scene" delay={0.1}>
          <div className="inbs-contact-map-grid" aria-hidden="true"/>
          <span className="inbs-contact-map-large" aria-hidden="true">DUBAI</span>
          <div className="inbs-contact-map-target" aria-hidden="true">
            <span/><MapPin size={36} strokeWidth={1.4}/>
          </div>
          <div className="inbs-contact-map-address">
            <MapPin size={19} aria-hidden="true"/>
            <span>{companyContact.address[locale]}</span>
          </div>
          <a className="inbs-contact-map-overlay" href={companyContact.mapUrl} target="_blank" rel="noopener noreferrer" aria-label={t.mapAction}/>
        </Reveal>
      </div>
    </section>
  );
}
