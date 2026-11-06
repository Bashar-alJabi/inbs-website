import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { serviceCatalog } from '@/content/services';
import { serviceDetailContent } from '@/content/service-detail-catalog';
import { routes } from '@/lib/routes';
import type { Locale } from '@/lib/site';
import type { ServiceSlug } from '@/content/services';

export function ServiceHero({ locale, slug }: { locale: Locale; slug: ServiceSlug }) {
  const t = serviceDetailContent[slug][locale];
  const service = serviceCatalog[slug];
  return (
    <section className="inbs-detail-hero" aria-labelledby="inbs-detail-title">
      <div className="site-shell inbs-detail-hero-inner">
        <div className="inbs-detail-hero-copy">
          <p className="inbs-detail-kicker"><span aria-hidden="true" />{t.eyebrow}</p>
          <Link href={routes.page(locale,'services')} className="inbs-detail-back">
            {t.back}<ArrowUpRight aria-hidden="true" size={17}/>
          </Link>
          <h1 id="inbs-detail-title">{service[locale]}</h1>
          <p className="inbs-detail-hero-lead">{t.heroLead}</p>
          <a href="#service-detail-overview" className="inbs-detail-discover">
            {t.discover}<ArrowDown aria-hidden="true" size={20}/>
          </a>
        </div>
        <div className="inbs-detail-hero-visual">
          <div className="inbs-detail-hero-photo">
            <Image src={service.image} alt="" fill priority sizes="(max-width: 760px) 88vw, 42vw" />
          </div>
          <div className="inbs-detail-hero-orbit" aria-hidden="true"/>
          <span className="inbs-detail-photo-caption">{t.photoCaption}</span>
        </div>
      </div>
    </section>
  );
}
