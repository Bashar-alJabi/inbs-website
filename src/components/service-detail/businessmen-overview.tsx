import { Reveal } from '@/components/shared/reveal';
import { businessmenDetailContent } from '@/content/service-details';
import type { Locale } from '@/lib/site';

export function BusinessmenOverview({ locale }: { locale: Locale }) {
  const t = businessmenDetailContent[locale];
  return (
    <section className="inbs-detail-overview" id="businessmen-overview" aria-labelledby="inbs-detail-overview-title">
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
