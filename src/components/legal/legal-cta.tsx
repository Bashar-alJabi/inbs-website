import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { legalPageContent } from '@/content/legal-page';
import { routes } from '@/lib/routes';
import type { Locale } from '@/lib/site';
export function LegalCta({locale}:{locale:Locale}){
 const t=legalPageContent[locale];
 return <section className="inbs-editorial-cta inbs-editorial-cta--legal" aria-labelledby="inbs-legal-cta-title">
  <div className="site-shell inbs-editorial-cta-inner">
   <Reveal className="inbs-editorial-cta-heading">
    <p className="inbs-editorial-cta-kicker"><span aria-hidden="true"/>{locale==='ar'?'لنتواصل':'LET’S TALK'}</p>
    <h2 id="inbs-legal-cta-title">{t.contactTitle}</h2>
   </Reveal>
   <Reveal className="inbs-editorial-cta-body" delay={0.12}>
    <p>{t.contactLead}</p>
    <Link className="inbs-editorial-cta-action inbs-editorial-cta-primary" href={routes.page(locale,'contact')}>{t.contactAction}<ArrowUpRight size={20} aria-hidden="true"/></Link>
    <Link className="inbs-editorial-cta-action inbs-editorial-cta-secondary" href={routes.page(locale,'services')}>{t.contactSecondary}<ArrowUpRight size={20} aria-hidden="true"/></Link>
   </Reveal>
  </div>
 </section>;
}
