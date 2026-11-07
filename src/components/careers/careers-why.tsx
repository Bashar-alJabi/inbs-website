import { Reveal } from '@/components/shared/reveal';
import { careersPageContent } from '@/content/careers-page';
import type { Locale } from '@/lib/site';

export function CareersWhy({ locale }: { locale: Locale }) {
  const t = careersPageContent[locale];
  return (
    <section className="inbs-careers-why" id="careers-why" aria-labelledby="inbs-careers-why-title">
      <div className="site-shell">
        <div className="inbs-careers-why-heading">
          <Reveal>
            <p className="inbs-careers-kicker"><span aria-hidden="true"/>{t.whyEyebrow}</p>
            <h2 id="inbs-careers-why-title">{t.whyTitle.split('\n').map((line,i)=><span key={i}>{line}</span>)}</h2>
          </Reveal>
          <Reveal delay={0.1}><p className="inbs-careers-why-lead">{t.whyLead}</p></Reveal>
        </div>
        <div className="inbs-careers-reasons">
          {t.reasons.map((reason,i)=>(
            <Reveal className="inbs-careers-reason" key={reason.number} delay={i*.08}>
              <span className="inbs-careers-reason-number">{reason.number} /</span>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
              <span className="inbs-careers-reason-rule" aria-hidden="true"/>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
