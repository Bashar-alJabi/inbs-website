import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { companyContact } from '@/content/contact';
import { legalPageContent } from '@/content/legal-page';
import type { Locale } from '@/lib/site';

const ids=['privacy','terms','notices'] as const;
export function LegalSections({ locale }: { locale: Locale }) {
 const t=legalPageContent[locale];
 const sections=[
  {id:ids[0],title:t.privacyTitle,entries:t.privacy},
  {id:ids[1],title:t.termsTitle,entries:t.terms},
  {id:ids[2],title:t.noticesTitle,entries:t.notices},
 ] as const;
 return <section className="inbs-legal-sections" aria-label={t.navLabel}>
  <div className="site-shell inbs-legal-layout">
   <aside className="inbs-legal-sidebar">
    <p>INBS / LEGAL</p><strong>{t.navLabel}</strong>
    <nav aria-label={t.navLabel}><ol>{sections.map((s,i)=><li key={s.id}><a href={`#legal-${s.id}`}><span aria-hidden="true">{String(i+1).padStart(2,'0')}</span>{s.title}</a></li>)}</ol></nav>
   </aside>
   <div className="inbs-legal-document">
    {sections.map((s,i)=><section key={s.id} id={`legal-${s.id}`} aria-labelledby={`legal-heading-${s.id}`}>
     <div className="inbs-legal-document-heading"><span>{String(i+1).padStart(2,'0')} / 03</span><h2 id={`legal-heading-${s.id}`}>{s.title}</h2></div>
     <div className="inbs-legal-document-entries">{s.entries.map((entry,j)=><div key={j} className="inbs-legal-entry"><h3>{entry[0]}</h3><p>{entry[1]}</p></div>)}</div>
    </section>)}
    <div className="inbs-legal-resources">
     <h2>{t.officialHeading}</h2>
     <div>{t.officialLinks.map(link=><a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={18} aria-hidden="true"/></a>)}</div>
     <p>{t.privacyNote}</p>
    </div>
    <div className="inbs-legal-contact-strip">
     <span>{locale==='ar'?'التواصل بشأن الخصوصية':'PRIVACY / ENQUIRIES'}</span>
     <a href={companyContact.emailHref}>{companyContact.email}<ArrowUpRight size={18} aria-hidden="true"/></a>
     <Link href={`/${locale}/contact`}>{locale==='ar'?'بيانات التواصل':'Contact details'}</Link>
    </div>
   </div>
  </div>
 </section>;
}
