import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { routes } from '@/lib/routes';
import { Reveal } from '@/components/shared/reveal';
import { businessmenDetailContent } from '@/content/service-details';
import type { Locale } from '@/lib/site';

export function BusinessmenOfferings({ locale }: { locale: Locale }) {
  const t = businessmenDetailContent[locale];
  return (
    <section className="inbs-detail-offerings" aria-labelledby="inbs-detail-offerings-title">
      <div className="site-shell">
        <Reveal className="inbs-detail-section-head">
          <div>
            <p className="inbs-detail-kicker"><span aria-hidden="true"/>{t.offeringsEyebrow}</p>
            <h2 id="inbs-detail-offerings-title">{t.offeringsTitle}</h2>
          </div>
          <p>{t.offeringsLead}</p>
        </Reveal>
        <div className="inbs-detail-offering-grid">
          {t.offerings.map((area, index) => (
            <Reveal className="inbs-detail-offering" key={area.number} delay={(index % 2) * 0.08}>
              <div className="inbs-detail-offering-heading">
                <span className="inbs-detail-offering-index" aria-hidden="true">{area.number}</span>
                <Link className="inbs-detail-offering-action" href={routes.page(locale, 'contact')} aria-label={`${t.closingPrimary} — ${area.title}`}>
                  <ArrowUpRight size={23} aria-hidden="true"/>
                </Link>
              </div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <ul>
                {area.items.map(item=><li key={item}>{item}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
