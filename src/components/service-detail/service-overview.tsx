import { Reveal } from '@/components/shared/reveal';
import { serviceDetailContent } from '@/content/service-detail-catalog';
import type { Locale } from '@/lib/site';
import type { ServiceSlug } from '@/content/services';

export function ServiceOverview({ locale, slug }: { locale: Locale; slug: ServiceSlug }) {
  const t = serviceDetailContent[slug][locale];
  return (
    <section className="inbs-detail-overview" id="service-detail-overview" aria-labelledby="inbs-detail-overview-title">
      <div className="site-shell inbs-detail-overview-grid">
        <Reveal>
          <p className="inbs-detail-kicker"><span aria-hidden="true"/>{t.overviewEyebrow}</p>
          <h2 id="inbs-detail-overview-title">{t.overviewTitle}</h2>
        </Reveal>
        <Reveal className="inbs-detail-overview-copy" delay={0.12}>
          <p className="inbs-detail-overview-lead">{t.overviewLead}</p>
          <p>{t.overviewBody}</p>
        </Reveal>
      </div>
    </section>
  );
}
