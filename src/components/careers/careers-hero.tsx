import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { careersPageContent } from '@/content/careers-page';
import type { Locale } from '@/lib/site';

export function CareersHero({ locale }: { locale: Locale }) {
  const t = careersPageContent[locale];
  return (
    <section className="inbs-careers-hero" aria-labelledby="inbs-careers-title">
      <div className="inbs-careers-hero-grid" aria-hidden="true"/>
      <div className="site-shell inbs-careers-hero-inner">
        <div className="inbs-careers-hero-copy">
          <p className="inbs-careers-kicker inbs-careers-hero-kicker"><span aria-hidden="true"/>{t.heroEyebrow}</p>
          <h1 id="inbs-careers-title"><span>{t.heroTitleOne}</span><span>{t.heroTitleTwo}</span></h1>
          <p className="inbs-careers-hero-lead">{t.heroLead}</p>
          <a className="inbs-careers-hero-action" href="#careers-why">{t.heroAction}<ArrowDown size={19} aria-hidden="true"/></a>
        </div>
        <div className="inbs-careers-hero-art" aria-hidden="true">
          <div className="inbs-careers-art-frame">
            <div className="inbs-careers-art-top"><span>INBS / 01</span><span>{t.heroVisualTop}</span></div>
            <div className="inbs-careers-art-orbit inbs-careers-art-orbit--outer"><i/></div>
            <div className="inbs-careers-art-orbit inbs-careers-art-orbit--inner"><i/></div>
            <div className="inbs-careers-art-cross" aria-hidden="true"/>
            <span className="inbs-careers-art-word">{t.heroVisualWord}</span>
            <div className="inbs-careers-art-bottom"><span>{t.heroVisualCaption}</span><ArrowUpRight size={21}/></div>
          </div>
        </div>
        <div className="inbs-careers-hero-bottom"><span>{t.heroLocation}</span><span>INBS / CAREERS</span></div>
      </div>
    </section>
  );
}
