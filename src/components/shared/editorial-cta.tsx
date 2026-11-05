import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { homeContent } from '@/content/home';
import { aboutPageContent } from '@/content/about';
import { servicesPageContent } from '@/content/services-page';
import { teamPageContent } from '@/content/team-page';
import { companyContact } from '@/content/contact';
import { routes } from '@/lib/routes';
import type { Locale } from '@/lib/site';

type CtaVariant = 'home' | 'about' | 'services' | 'team';

/** All page-ending CTAs share presentation; each page owns its localized message. */
export function EditorialCta({ locale, variant }: { locale: Locale; variant: CtaVariant }) {
  const home = homeContent[locale];
  const about = aboutPageContent[locale];
  const services = servicesPageContent[locale];
  const team = teamPageContent[locale];

  const content = {
    home: {
      eyebrow: home.ctaEyebrow, title: home.ctaTitle, description: home.ctaText,
      primary: home.ctaButton, secondary: home.primary, secondaryHref: routes.page(locale, 'services'),
    },
    about: {
      eyebrow: about.ctaEyebrow, title: about.ctaTitle, description: about.ctaText,
      primary: about.ctaAction, secondary: about.ctaSecondary, secondaryHref: routes.page(locale, 'team'),
    },
    services: {
      eyebrow: services.closingEyebrow, title: services.closingTitle, description: services.closingText,
      primary: services.closingAction, secondary: services.closingSecondary, secondaryHref: routes.page(locale, 'team'),
    },
    team: {
      eyebrow: team.closingEyebrow, title: team.closingTitle, description: team.closingLead,
      primary: team.emailAction, secondary: team.servicesAction, secondaryHref: routes.page(locale, 'services'),
    },
  }[variant];

  const headingId = `inbs-${variant}-closing-title`;

  return <section className={`inbs-editorial-cta inbs-editorial-cta--${variant}`} aria-labelledby={headingId}>
    <div className="site-shell inbs-editorial-cta-inner">
      <Reveal className="inbs-editorial-cta-heading">
        <p className="inbs-editorial-cta-kicker"><span aria-hidden="true"/>{content.eyebrow}</p>
        <h2 id={headingId}>{content.title.split('\n').map((line, index) => <span key={index}>{line}</span>)}</h2>
      </Reveal>
      <Reveal className="inbs-editorial-cta-body" delay={0.12}>
        <p>{content.description}</p>
        <a className="inbs-editorial-cta-action inbs-editorial-cta-primary" href={companyContact.emailHref}>
          {content.primary}<ArrowUpRight size={20} aria-hidden="true"/>
        </a>
        <Link className="inbs-editorial-cta-action inbs-editorial-cta-secondary" href={content.secondaryHref}>
          {content.secondary}<ArrowUpRight size={20} aria-hidden="true"/>
        </Link>
      </Reveal>
    </div>
  </section>;
}
