import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { aboutPageContent } from '@/content/about';
import { serviceCatalog } from '@/content/services';
import type { Locale } from '@/lib/site';

function Lines({ text }: { text: string }) {
  return <>{text.split('\n').map((line, i) =>
    <span className="inbs-about-line" key={i}>{line}</span>
  )}</>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="inbs-story-label"><span aria-hidden="true" />{children}</p>;
}

/** Full About page; content lives in src/content/about.ts and layout in src/styles/about.css. */
export function AboutPage({ locale }: { locale: Locale }) {
  const t = aboutPageContent[locale];

  return <main className="inbs-about-page" id="top">
    <section className="inbs-story-hero" aria-labelledby="inbs-story-heading">
      <div className="inbs-story-hero-visual" aria-hidden="true">
        <Image src="/images/services/real-estate-services.webp" alt="" fill sizes="(max-width: 760px) 100vw, 58vw" priority className="inbs-story-hero-image"/>
        <span className="inbs-story-hero-veil"/>
      </div>
      <div className="inbs-story-hero-art" aria-hidden="true">
        <svg viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="265"/><circle cx="300" cy="300" r="188"/>
          <ellipse cx="300" cy="300" rx="265" ry="96" transform="rotate(-36 300 300)"/>
          <path d="M40 300H560M300 40V560"/>
          <circle cx="110" cy="210" r="6" className="inbs-story-signal"/>
          <circle cx="480" cy="404" r="8" className="inbs-story-signal"/>
          <circle cx="300" cy="300" r="12" className="inbs-story-hub"/>
        </svg>
      </div>
      <div className="site-shell inbs-story-hero-inner">
        <div className="inbs-story-hero-copy">
          <p className="inbs-story-eyebrow"><span aria-hidden="true" />{t.eyebrow}</p>
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
    </section>

    <section id="our-story" className="inbs-story-intro" aria-labelledby="inbs-story-intro-heading">
      <div className="site-shell inbs-story-intro-grid">
        <Reveal className="inbs-story-intro-heading">
          <SectionLabel>{t.introEyebrow}</SectionLabel>
          <h2 id="inbs-story-intro-heading"><Lines text={t.introTitle}/></h2>
          <div className="inbs-story-year" aria-label={`${t.foundedLabel} ${t.foundedValue}`}>
            <span>{t.foundedValue}</span><span>{t.foundedLabel}</span>
          </div>
        </Reveal>
        <Reveal className="inbs-story-intro-body" delay={0.12}>
          <p className="inbs-story-quote">{t.introQuote}</p>
          <div className="inbs-story-intro-rule" aria-hidden="true"/>
          {t.introParagraphs.map((paragraph) => <p className="inbs-story-body-copy" key={paragraph}>{paragraph}</p>)}
        </Reveal>
      </div>
    </section>

    <section className="inbs-story-principles" aria-labelledby="inbs-story-principles-heading">
      <div className="site-shell">
        <Reveal className="inbs-story-section-head">
          <div><SectionLabel>{t.philosophyEyebrow}</SectionLabel><h2 id="inbs-story-principles-heading"><Lines text={t.philosophyTitle}/></h2></div>
          <p>{t.philosophyLead}</p>
        </Reveal>
        <div className="inbs-story-principle-grid">
          {t.principles.map((item, index) => <Reveal key={item.number} delay={index * 0.08}>
            <article className="inbs-story-principle">
              <span className="inbs-story-principle-number">{item.number}</span>
              <span className="inbs-story-principle-glyph" aria-hidden="true"><MoveUpRight size={28} strokeWidth={1.2}/></span>
              <h3>{item.title}</h3><p>{item.body}</p>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section className="inbs-story-network" aria-labelledby="inbs-story-network-heading">
      <div className="site-shell">
        <Reveal className="inbs-story-network-heading">
          <SectionLabel>{t.networkEyebrow}</SectionLabel>
          <h2 id="inbs-story-network-heading"><Lines text={t.networkTitle}/></h2>
          <p>{t.networkLead}</p>
        </Reveal>
        <div className="inbs-story-capabilities">
          {t.capabilities.map(item => <Link href={`/${locale}/services/${item.id}`} className="inbs-story-capability" key={item.id}>
            <span className="inbs-story-capability-no">{item.number}</span>
            <span className="inbs-story-capability-name">{serviceCatalog[item.id][locale]}</span>
            <ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true"/>
          </Link>)}
        </div>
        <Link className="inbs-story-all-services" href={`/${locale}/services`}>{t.allServices}<ArrowUpRight size={18} aria-hidden="true"/></Link>
      </div>
    </section>

    <section className="inbs-story-outro" aria-labelledby="inbs-story-outro-heading">
      <div className="inbs-story-outro-orbit" aria-hidden="true"/>
      <div className="site-shell inbs-story-outro-inner">
        <Reveal>
          <SectionLabel>{t.closingEyebrow}</SectionLabel>
          <h2 id="inbs-story-outro-heading"><Lines text={t.closingTitle}/></h2>
          <p>{t.closingBody}</p>
          <div className="inbs-story-outro-actions">
            <Link href={`/${locale}/contact`} className="inbs-story-outro-primary">{t.contact}<ArrowUpRight size={20} aria-hidden="true"/></Link>
            <Link href={`/${locale}`} className="inbs-story-outro-secondary">{t.home}</Link>
          </div>
        </Reveal>
        <span className="inbs-story-outro-mark" aria-hidden="true">INBS</span>
      </div>
    </section>
  </main>;
}
