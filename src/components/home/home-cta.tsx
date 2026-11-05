import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { homeContent } from '@/content/home';
import { routes } from '@/lib/routes';
import type { Locale } from '@/lib/site';

/** Localized, page-owned CTA; visual presentation follows the common CTA design tokens. */
export function HomeCta({ locale }: { locale: Locale }) {
  const t = homeContent[locale];
  return (
    <section className="inbs-editorial-cta inbs-editorial-cta--home" aria-labelledby="inbs-home-closing-title">
      <div className="site-shell inbs-editorial-cta-inner">
        <Reveal className="inbs-editorial-cta-heading">
          <p className="inbs-editorial-cta-kicker"><span aria-hidden="true"/>{t.ctaEyebrow}</p>
          <h2 id="inbs-home-closing-title">{t.ctaTitle.split('\n').map((line,index)=><span key={index}>{line}</span>)}</h2>
        </Reveal>
        <Reveal className="inbs-editorial-cta-body" delay={0.12}>
          <p>{t.ctaText}</p>
          <Link className="inbs-editorial-cta-action inbs-editorial-cta-primary" href={routes.page(locale,'contact')}>
            {t.ctaButton}<ArrowUpRight size={20} aria-hidden="true"/>
          </Link>
          <Link className="inbs-editorial-cta-action inbs-editorial-cta-secondary" href={routes.page(locale,'services')} >
            {t.primary}<ArrowUpRight size={20} aria-hidden="true"/>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
