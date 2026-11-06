import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { routes } from '@/lib/routes';
import { Reveal } from '@/components/shared/reveal';
import { serviceDetailContent } from '@/content/service-detail-catalog';
import {serviceEditorialPhotos,pexelsImage} from '@/content/service-editorial-photos';
import type { Locale } from '@/lib/site';
import type { ServiceSlug } from '@/content/services';

export function ServiceOfferings({ locale, slug }: { locale: Locale; slug: ServiceSlug }) {
  const t = serviceDetailContent[slug][locale];
  const photos = serviceEditorialPhotos[slug];
  return (
    <section className="inbs-detail-offerings" aria-labelledby="inbs-detail-offerings-title">
      <div className="site-shell">
        <Reveal className="inbs-detail-section-head">
          <div>
            <p className="inbs-detail-kicker"><span aria-hidden="true"/>{t.offeringsEyebrow}</p>
            <h2 id="inbs-detail-offerings-title">{t.offeringsTitle}</h2>
          </div>
          <p>{t.offeringsLead}</p>
        </Reveal>
        <div className="inbs-detail-offering-grid">
          {t.offerings.map((area, index) => (
            <Fragment key={area.number}>
            <Reveal className="inbs-detail-offering" delay={(index % 2) * 0.08}>
              <div className="inbs-detail-offering-heading">
                <span className="inbs-detail-offering-index" aria-hidden="true">{area.number}</span>
                <Link className="inbs-detail-offering-action" href={routes.page(locale, 'contact')} aria-label={`${t.closingPrimary} — ${area.title}`}>
                  <span>{t.closingPrimary}</span>
                  <ArrowUpRight size={23} aria-hidden="true"/>
                </Link>
              </div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <ul>
                {area.items.map(item=><li key={item}>{item}</li>)}
              </ul>
            </Reveal>
            {photos.filter(photo => photo.after === index + 1).map(photo => (
              <Reveal className={`inbs-detail-offering-photo${'size' in photo && photo.size === 'wide' ? ' inbs-detail-offering-photo--wide' : ''}`} key={photo.id}>
                <figure>
                  <Image
                    src={pexelsImage(photo.id)}
                    alt={photo.alt[locale]}
                    fill
                    sizes={'size' in photo && photo.size === 'wide'
                      ? '(max-width: 760px) 100vw, 90vw'
                      : '(max-width: 600px) 100vw, (max-width: 1000px) 47vw, 43vw'}
                    quality={75}
                    loading="lazy"
                  />
                  <figcaption>{photo.caption[locale]}</figcaption>
                </figure>
              </Reveal>
            ))}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
