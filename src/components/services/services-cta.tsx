import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { servicesPageContent } from '@/content/services-page';
import { routes } from '@/lib/routes';
import type { Locale } from '@/lib/site';

/** Localized, page-owned CTA; visual presentation follows the common CTA design tokens. */
export function ServicesCta({ locale }: { locale: Locale }) {
  const t = servicesPageContent[locale];
  return (
    <section className="inbs-editorial-cta inbs-editorial-cta--services" aria-labelledby="inbs-services-closing-title">
      <div className="site-shell inbs-editorial-cta-inner">
        <Reveal className="inbs-editorial-cta-heading">
          <p className="inbs-editorial-cta-kicker"><span aria-hidden="true"/>{t.closingEyebrow}</p>
          <h2 id="inbs-services-closing-title">{t.closingTitle.split('\n').map((line,index)=><span key={index}>{line}</span>)}</h2>
        </Reveal>
        <Reveal className="inbs-editorial-cta-body" delay={0.12}>
          <p>{t.closingText}</p>
          <Link className="inbs-editorial-cta-action inbs-editorial-cta-primary" href={routes.page(locale,'contact')}>
            {t.closingAction}<ArrowUpRight size={20} aria-hidden="true"/>
          </Link>
          <Link className="inbs-editorial-cta-action inbs-editorial-cta-secondary" href={routes.page(locale,'team')} >
            {t.closingSecondary}<ArrowUpRight size={20} aria-hidden="true"/>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
