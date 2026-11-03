import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { aboutPageContent } from '@/content/about';
import { serviceCatalog, serviceSlugs } from '@/content/services';
import type { Locale } from '@/lib/site';
import { AboutLines, AboutSectionLabel } from './about-ui';

export function AboutNetwork({ locale }: { locale: Locale }) {
  const t = aboutPageContent[locale];
  return <section className="inbs-story-network" aria-labelledby="inbs-story-network-heading">
    <div className="site-shell">
      <Reveal className="inbs-story-network-heading">
        <AboutSectionLabel>{t.networkEyebrow}</AboutSectionLabel>
        <h2 id="inbs-story-network-heading"><AboutLines text={t.networkTitle}/></h2>
        <p>{t.networkLead}</p>
      </Reveal>
      <div className="inbs-story-capabilities">
        {serviceSlugs.map((slug, index) =>
          <Link href={`/${locale}/services/${slug}`} className="inbs-story-capability" key={slug}>
            <span className="inbs-story-capability-no">{String(index + 1).padStart(2, '0')}</span>
            <span className="inbs-story-capability-name">{serviceCatalog[slug][locale]}</span>
            <ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true"/>
          </Link>
        )}
      </div>
      <Link className="inbs-about-link inbs-story-all-services" href={`/${locale}/services`}>
        <span>{t.allServices}</span><ArrowUpRight size={20} aria-hidden="true"/>
      </Link>
    </div>
  </section>;
}
