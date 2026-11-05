import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { serviceCatalog, serviceSlugs } from '@/content/services';
import { routes } from '@/lib/routes';
import { servicesPageContent } from '@/content/services-page';
import type { Locale } from '@/lib/site';

export function ServicesDirectory({ locale }: { locale: Locale }) {
  const t = servicesPageContent[locale];
  return (
    <section className="inbs-services-directory" id="service-directory" aria-labelledby="inbs-services-directory-title">
          <div className="site-shell">
            <Reveal className="inbs-services-directory-head">
              <div>
                <p className="inbs-services-kicker inbs-section-kicker"><span aria-hidden="true"/>{t.indexLabel}</p>
                <h2 id="inbs-services-directory-title">{t.indexTitle}</h2>
              </div>
              <p className="inbs-services-directory-lead">{t.indexLead}</p>
            </Reveal>
            <div className="inbs-services-directory-grid">
              {serviceSlugs.map((slug, index) =>
                <Reveal key={slug} className="inbs-services-entry" delay={(index % 2) * 0.08}>
                  <Link href={routes.service(locale,slug)} className="inbs-services-entry-link" aria-label={`${t.explore}: ${serviceCatalog[slug][locale]}`}>
                    <div className="inbs-services-entry-image">
                      <Image src={serviceCatalog[slug].image} alt="" fill sizes="(max-width: 700px) 100vw, 47vw" />
                      <span className="inbs-services-entry-index">{String(index+1).padStart(2,'0')}</span>
                      <span className="inbs-services-entry-arrow" aria-hidden="true"><ArrowUpRight size={24}/></span>
                    </div>
                    <div className="inbs-services-entry-bottom">
                      <div>
                        <span className="inbs-services-entry-overline">{t.category} / {String(index+1).padStart(2,'0')}</span>
                        <h3>{serviceCatalog[slug][locale]}</h3>
                      </div>
                      <ArrowUpRight size={23} aria-hidden="true"/>
                    </div>
                  </Link>
                </Reveal>
              )}
            </div>
          </div>
        </section>
    
  );
}
