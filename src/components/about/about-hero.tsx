import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { aboutPageContent } from '@/content/about';
import type { Locale } from '@/lib/site';

/**
 * The two straight axes intersect each circular orbit exactly at their radii.
 * Travelers follow the drawn axes and circles, never an invisible shortcut.
 * The ellipse traveler follows the visible ellipse from its first frame.
 */
function HeroNetworkArt() {
  return <div className="inbs-story-hero-art" aria-hidden="true">
    <svg viewBox="0 0 600 600" fill="none">
      <circle cx="300" cy="300" r="265"/>
      <circle cx="300" cy="300" r="188"/>
      <ellipse cx="300" cy="300" rx="265" ry="96" transform="rotate(-36 300 300)"/>
      <path d="M35 300H565 M300 35V565"/>
      <circle cx="300" cy="300" r="5" className="inbs-story-hub"/>
      <circle r="4.5" className="inbs-story-traveler">
        <animateMotion dur="17s" begin="-4s" repeatCount="indefinite"
          path="M300 300 L488 300 A188 188 0 1 1 112 300 A188 188 0 1 1 488 300 L300 300"/>
      </circle>
      <circle r="4" className="inbs-story-traveler">
        <animateMotion dur="23s" begin="-10s" repeatCount="indefinite"
          path="M300 300 L300 35 A265 265 0 1 1 300 565 A265 265 0 1 1 300 35 L300 300"/>
      </circle>
      <g transform="rotate(-36 300 300)">
        <circle r="4.5" className="inbs-story-traveler">
          <animateMotion dur="20s" begin="-13s" repeatCount="indefinite"
            path="M565 300 A265 96 0 1 1 35 300 A265 96 0 1 1 565 300"/>
        </circle>
      </g>
    </svg>
  </div>;
}

export function AboutHero({ locale }: { locale: Locale }) {
  const t = aboutPageContent[locale];
  return <section className="inbs-story-hero" aria-labelledby="inbs-story-heading">
    <div className="inbs-story-hero-visual" aria-hidden="true">
      <Image src="/images/services/real-estate-services.webp" alt="" fill
        sizes="(max-width: 760px) 100vw, 58vw" priority className="inbs-story-hero-image"/>
      <span className="inbs-story-hero-veil"/>
    </div>
    <HeroNetworkArt/>
    <div className="site-shell inbs-story-hero-inner">
      <div className="inbs-story-hero-copy">
        <p className="inbs-story-eyebrow"><span aria-hidden="true"/>{t.eyebrow}</p>
        <h1 id="inbs-story-heading"><span>{t.heroLineOne}</span><span className="inbs-story-hero-accent">{t.heroLineTwo}</span></h1>
        <p className="inbs-story-hero-lead">{t.heroLead}</p>
        <a className="inbs-story-hero-link" href="#our-story">{t.explore}<ArrowDown size={19} aria-hidden="true"/></a>
      </div>
      <div className="inbs-story-hero-bottom">
        <span>{t.scroll}</span>
        <span className="inbs-story-hero-location">{t.imageCaption}</span>
        <span className="inbs-story-hero-established">{t.foundedLabel} <strong>{t.foundedValue}</strong></span>
      </div>
    </div>
  </section>;
}
