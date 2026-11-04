import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { serviceCatalog, serviceSlugs } from '@/content/services';
import { servicesPageContent } from '@/content/services-page';
import { routes } from '@/lib/routes';
import type { Locale } from '@/lib/site';

/** Services landing page. All actual service names, images and slugs use the canonical catalog. */
export function ServicesPage({ locale }: { locale: Locale }) {
  const t = servicesPageContent[locale];
  return <main className="inbs-services-page">
    <section className="inbs-services-hero" aria-labelledby="inbs-services-page-title">
      <div className="inbs-services-hero-aura" aria-hidden="true"/>
      <div className="site-shell inbs-services-hero-inner">
        <div className="inbs-services-hero-copy">
          <p className="inbs-services-kicker inbs-services-hero-kicker"><span aria-hidden="true"/>{t.eyebrow}</p>
          <h1 id="inbs-services-page-title"><span>{t.titleOne}</span><span>{t.titleTwo}</span></h1>
          <p className="inbs-services-hero-lead">{t.introduction}</p>
          <a className="inbs-services-hero-discover" href="#service-directory">{t.browse}<ArrowDown size={20} aria-hidden="true"/></a>
        </div>
        <div className="inbs-services-hero-art" aria-hidden="true">
          <div className="inbs-services-hero-art-window">
            <Image src={serviceCatalog['businessmen-services'].image} alt="" fill priority sizes="(max-width: 800px) 70vw, 34vw" />
          </div>
          <div className="inbs-services-hero-art-small">
            <Image src={serviceCatalog['real-estate-services'].image} alt="" fill sizes="(max-width: 800px) 40vw, 18vw"/>
          </div>
          <svg className="inbs-services-hero-art-network" viewBox="0 0 400 400" fill="none" focusable="false">
            <circle cx="200" cy="200" r="145"/>
            <circle cx="200" cy="200" r="190"/>
            <path d="M0 200 H400 M200 0 V400"/>
            <circle className="inbs-services-hero-traveler" r="4.5"><animateMotion dur="21s" repeatCount="indefinite" path="M200 200 L390 200 A190 190 0 0 1 10 200 A190 190 0 0 1 390 200 L200 200"/></circle>
          </svg>
          <div className="inbs-services-hero-art-caption">INBS / DUBAI</div>
        </div>
        <div className="inbs-services-hero-bottom"><span>{t.location}</span><span>INBS / {String(serviceSlugs.length).padStart(2,'0')}</span></div>
      </div>
    </section>

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

    <section className="inbs-services-closing" aria-labelledby="inbs-services-closing-title">
      <div className="site-shell inbs-services-closing-inner">
        <Reveal>
          <p className="inbs-services-kicker inbs-section-kicker"><span aria-hidden="true"/>{t.closingEyebrow}</p>
          <h2 id="inbs-services-closing-title">{t.closingTitle}</h2>
        </Reveal>
        <Reveal className="inbs-services-closing-end" delay={0.12}>
          <p>{t.closingText}</p>
          <Link href={routes.page(locale,'contact')} className="inbs-services-closing-action">{t.closingAction}<ArrowUpRight size={20} aria-hidden="true"/></Link>
        </Reveal>
      </div>
    </section>
  </main>;
}
