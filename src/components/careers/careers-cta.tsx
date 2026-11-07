import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { careersPageContent } from '@/content/careers-page';
import { routes } from '@/lib/routes';
import type { Locale } from '@/lib/site';

export function CareersCta({ locale }: { locale: Locale }) {
  const t = careersPageContent[locale];
  return (
    <section className="inbs-editorial-cta inbs-editorial-cta--careers" aria-labelledby="inbs-careers-closing-title">
      <div className="site-shell inbs-editorial-cta-inner">
        <Reveal className="inbs-editorial-cta-heading">
          <p className="inbs-editorial-cta-kicker"><span aria-hidden="true"/>{t.closingEyebrow}</p>
          <h2 id="inbs-careers-closing-title">{t.closingTitle.split('\n').map((line,i)=><span key={i}>{line}</span>)}</h2>
        </Reveal>
        <Reveal className="inbs-editorial-cta-body" delay={0.12}>
          <p>{t.closingLead}</p>
          <Link className="inbs-editorial-cta-action inbs-editorial-cta-primary" href={routes.page(locale,'contact')}>
            {t.closingAction}<ArrowUpRight size={20} aria-hidden="true"/>
          </Link>
          <Link className="inbs-editorial-cta-action inbs-editorial-cta-secondary" href={routes.page(locale,'services')}>
            {t.closingSecondary}<ArrowUpRight size={20} aria-hidden="true"/>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
