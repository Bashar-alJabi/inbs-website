import { ArrowUpRight } from 'lucide-react';
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
        </Reveal>
        <Reveal className="inbs-contact-map-scene" delay={0.1}>
          <iframe
            className="inbs-contact-map-embed"
            src={companyContact.mapEmbedUrl}
            title={t.mapEmbedTitle}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  );
}
