import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { contactPageContent } from '@/content/contact-page';
import { companyContact } from '@/content/contact';
import { routes } from '@/lib/routes';
import type { Locale } from '@/lib/site';

/** Consistent page-ending editorial surface with a direct email action, no form. */
export function ContactClosing({ locale }: { locale: Locale }) {
  const t = contactPageContent[locale];
  return (
    <section className="inbs-editorial-cta inbs-editorial-cta--contact" aria-labelledby="inbs-contact-closing-title">
      <div className="site-shell inbs-editorial-cta-inner">
        <Reveal className="inbs-editorial-cta-heading">
          <p className="inbs-editorial-cta-kicker"><span aria-hidden="true"/>{t.closingEyebrow}</p>
          <h2 id="inbs-contact-closing-title">{t.closingTitle.split('\n').map((line,index)=><span key={index}>{line}</span>)}</h2>
        </Reveal>
        <Reveal className="inbs-editorial-cta-body" delay={0.12}>
          <p>{t.closingText}</p>
          <a className="inbs-editorial-cta-action inbs-editorial-cta-primary" href={companyContact.emailHref}>
            {t.closingAction}<ArrowUpRight size={20} aria-hidden="true"/>
          </a>
          <Link className="inbs-editorial-cta-action inbs-editorial-cta-secondary" href={routes.page(locale,'services')}>
            {t.closingSecondary}<ArrowUpRight size={20} aria-hidden="true"/>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
