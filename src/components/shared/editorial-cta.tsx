import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { homeContent } from '@/content/home';
import { aboutPageContent } from '@/content/about';
import { companyContact } from '@/content/contact';
import { routes } from '@/lib/routes';
import type { Locale } from '@/lib/site';
import '@/styles/editorial-cta.css';

/** The surfaces and layout are shared; the intent and copy stay page-specific. */
export function EditorialCta({ locale, variant }: { locale: Locale; variant: 'home' | 'about' }) {
  const home = homeContent[locale];
  const about = aboutPageContent[locale];
  const isHome = variant === 'home';
  const eyebrow = isHome ? home.ctaEyebrow : about.ctaEyebrow;
  const title = isHome ? home.ctaTitle : about.ctaTitle;
  const description = isHome ? home.ctaText : about.ctaText;
  const action = isHome ? home.ctaButton : about.ctaAction;
  const secondary = isHome ? home.primary : about.ctaSecondary;
  const secondaryHref = isHome ? routes.page(locale, 'services') : routes.page(locale, 'team');
  const id = `inbs-${variant}-closing-title`;
  return <section className={`inbs-editorial-cta inbs-editorial-cta--${variant}`} aria-labelledby={id}>
    <div className="site-shell inbs-editorial-cta-inner">
      <Reveal className="inbs-editorial-cta-heading">
        <p className="inbs-editorial-cta-kicker"><span aria-hidden="true"/>{eyebrow}</p>
        <h2 id={id}>{title.split('\n').map((line,i)=><span key={i}>{line}</span>)}</h2>
      </Reveal>
      <Reveal className="inbs-editorial-cta-body" delay={0.12}>
        <p>{description}</p>
        <a className="inbs-editorial-cta-primary" href={companyContact.emailHref}>{action}<ArrowUpRight size={20} aria-hidden="true"/></a>
        <Link className="inbs-editorial-cta-secondary" href={secondaryHref}>{secondary}<ArrowUpRight size={18} aria-hidden="true"/></Link>
      </Reveal>
    </div>
  </section>;
}
