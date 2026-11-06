import { Reveal } from '@/components/shared/reveal';
import { serviceDetailContent } from '@/content/service-detail-catalog';
import type { Locale } from '@/lib/site';
import type { ServiceSlug } from '@/content/services';

export function ServiceProcess({ locale, slug }: { locale: Locale; slug: ServiceSlug }) {
  const t = serviceDetailContent[slug][locale];
  return (
    <section className="inbs-detail-process" aria-labelledby="inbs-detail-process-title">
      <div className="site-shell">
        <Reveal className="inbs-detail-process-header">
          <p className="inbs-detail-kicker"><span aria-hidden="true"/>{t.processEyebrow}</p>
          <h2 id="inbs-detail-process-title">{t.processTitle}</h2>
          <p>{t.processLead}</p>
        </Reveal>
        <div className="inbs-detail-process-steps">
          {t.steps.map((step,index)=>(
            <Reveal className="inbs-detail-process-step" key={step.title} delay={index * 0.07}>
              <span className="inbs-detail-process-number" aria-hidden="true">0{index+1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
