import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { businessmenDetailContent } from '@/content/service-details';
import { routes } from '@/lib/routes';
import type { Locale } from '@/lib/site';

/** Page-owned CTA; shares only the editorial CTA visual stylesheet. */
export function BusinessmenCta({ locale }: { locale: Locale }) {
  const t = businessmenDetailContent[locale];
  return (
    <section className="inbs-editorial-cta inbs-editorial-cta--businessmen" aria-labelledby="inbs-detail-closing-title">
      <div className="site-shell inbs-editorial-cta-inner">
        <Reveal className="inbs-editorial-cta-heading">
          <p className="inbs-editorial-cta-kicker"><span aria-hidden="true"/>{t.closingEyebrow}</p>
          <h2 id="inbs-detail-closing-title">{t.closingTitle}</h2>
        </Reveal>
        <Reveal className="inbs-editorial-cta-body" delay={0.12}>
          <p>{t.closingText}</p>
          <Link className="inbs-editorial-cta-action inbs-editorial-cta-primary" href={routes.page(locale,'contact')}>
            {t.closingPrimary}<ArrowUpRight size={20} aria-hidden="true"/>
          </Link>
          <Link className="inbs-editorial-cta-action inbs-editorial-cta-secondary" href={routes.page(locale,'services')}>
            {t.closingSecondary}<ArrowUpRight size={20} aria-hidden="true"/>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
