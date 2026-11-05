import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { servicesPageContent } from '@/content/services-page';
import type { Locale } from '@/lib/site';

export function ServicesHero({ locale }: { locale: Locale }) {
  const t = servicesPageContent[locale];
  return (
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
            <Image src="/images/services/hero-services-1.webp" alt="" fill priority sizes="(max-width: 800px) 70vw, 34vw" />
            <span className="inbs-services-hero-frame-dot" aria-hidden="true" />
          </div>
          <div className="inbs-services-hero-art-small">
            <Image src="/images/services/hero-services-2.webp" alt="" fill sizes="(max-width: 800px) 40vw, 18vw"/>
            <span className="inbs-services-hero-frame-dot" aria-hidden="true" />
          </div>

          <div className="inbs-services-hero-art-caption">INBS / DUBAI</div>
        </div>
        <div className="inbs-services-hero-bottom"><span>{t.location}</span></div>
      </div>
    </section>
  );
}
