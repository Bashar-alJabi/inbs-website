import { homeContent } from '@/content/home';
import type { Locale } from '@/lib/site';
import { Reveal, SmoothScroll } from './motion-elements';
import { HeroExperience } from './hero-experience';
import { AboutPreview } from './about-preview';
import { ServicesShowcase } from './services-showcase';

/** Homepage shell. Additional sections will be added after their design is approved. */
export function Homepage({locale}:{locale:Locale}){
  const t=homeContent[locale];
  return <main className="homepage">
    <SmoothScroll />
    <HeroExperience locale={locale}/>
    <section className="proof-strip" aria-label={locale==='ar'?'معلومات عن الشركة':'Company facts'}>
      <div className="site-shell proof-inner">
        <Reveal delay={0.04}><div className="proof-item"><span>{t.founded}</span><strong>{t.foundedValue}</strong></div></Reveal>
        <Reveal delay={0.14}><div className="proof-item"><span>{t.city}</span><strong>{t.cityValue}</strong></div></Reveal>
        <Reveal delay={0.24}><p>{t.intro}</p></Reveal>
      </div>
    </section>
    <AboutPreview locale={locale}/>
    <ServicesShowcase locale={locale}/>
  </main>;
}
