import { homeContent } from '@/content/home';
import type { Locale } from '@/lib/site';
import { SmoothScroll } from './motion-elements';
import { HeroExperience } from './hero-experience';

/** Homepage shell. Additional sections will be added after their design is approved. */
export function Homepage({locale}:{locale:Locale}){
  const t=homeContent[locale];
  return <main className="homepage">
    <SmoothScroll />
    <HeroExperience locale={locale}/>
    <section className="proof-strip" aria-label={locale==='ar'?'معلومات عن الشركة':'Company facts'}>
      <div className="site-shell proof-inner">
        <div><span>{t.founded}</span><strong>{t.foundedValue}</strong></div>
        <div><span>{t.city}</span><strong>{t.cityValue}</strong></div>
        <p>{t.intro}</p>
      </div>
    </section>
  </main>;
}
