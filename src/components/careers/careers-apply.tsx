import { ArrowUpRight, FileText, Mail, MessageSquareText } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { careersPageContent } from '@/content/careers-page';
import { companyContact } from '@/content/contact';
import type { Locale } from '@/lib/site';

const steps = [FileText, MessageSquareText, Mail] as const;

export function CareersApply({ locale }: { locale: Locale }) {
  const t = careersPageContent[locale];
  const applicationSteps = [
    { title:t.applyStepOne, description:t.applyStepOneText },
    { title:t.applyStepTwo, description:t.applyStepTwoText },
    { title:t.applyStepThree, description:t.applyStepThreeText },
  ];
  const subject = locale === 'ar' ? 'طلب توظيف - INBS' : 'Career application - INBS';
  const mailto = `${companyContact.emailHref}?subject=${encodeURIComponent(subject)}`;

  return (
    <section className="inbs-careers-apply" id="careers-apply" aria-labelledby="inbs-careers-apply-title">
      <div className="site-shell inbs-careers-apply-inner">
        <Reveal className="inbs-careers-apply-heading">
          <p className="inbs-careers-kicker"><span aria-hidden="true"/>{t.applyEyebrow}</p>
          <h2 id="inbs-careers-apply-title">{t.applyTitle}</h2>
          <p className="inbs-careers-apply-lead">{t.applyLead}</p>
          <div className="inbs-careers-apply-address">
            <span>{t.applyEmailLabel}</span>
            <a href={mailto}>{companyContact.email}<ArrowUpRight size={19} aria-hidden="true"/></a>
          </div>
        </Reveal>
        <div className="inbs-careers-apply-panel">
          <ol className="inbs-careers-apply-steps">
            {applicationSteps.map((step,i)=>{
              const Icon = steps[i];
              return <li key={step.title}>
                <span className="inbs-careers-apply-step-icon"><Icon size={20} aria-hidden="true"/></span>
                <div><span className="inbs-careers-apply-step-number">{String(i+1).padStart(2,'0')}</span><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>;
            })}
          </ol>
          <a className="inbs-careers-apply-button" href={mailto}>{t.applyAction}<ArrowUpRight size={20} aria-hidden="true"/></a>
          <p className="inbs-careers-apply-note">{t.applyNote}</p>
        </div>
      </div>
    </section>
  );
}
