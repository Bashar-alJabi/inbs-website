import { homeContent } from '@/content/home';
import type { Locale } from '@/lib/site';
import { Reveal } from './motion-elements';

/** Compact company facts strip between the hero and About sections. */
export function CompanyFacts({ locale }: { locale: Locale }) {
  const t = homeContent[locale];

  return (
    <section className="proof-strip" aria-label={locale === 'ar' ? 'معلومات عن الشركة' : 'Company facts'}>
      <div className="site-shell proof-inner">
        <Reveal delay={0.04}><div className="proof-item"><span>{t.founded}</span><strong>{t.foundedValue}</strong></div></Reveal>
        <Reveal delay={0.14}><div className="proof-item"><span>{t.city}</span><strong>{t.cityValue}</strong></div></Reveal>
        <Reveal delay={0.24}><p>{t.intro}</p></Reveal>
      </div>
    </section>
  );
}
