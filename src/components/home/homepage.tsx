import type { Locale } from '@/lib/site';
import { CompanyFacts } from './company-facts';
import { HeroExperience } from './hero-experience';
import { AboutPreview } from './about-preview';
import { ServicesShowcase } from './services-showcase';
import { HomeAchievements } from './home-achievements';
import { HomeInstitutions } from './home-institutions';

/** Homepage shell. Additional sections will be added after their design is approved. */
export function Homepage({locale}:{locale:Locale}){
  return <main className="homepage">
    <HeroExperience locale={locale}/>
    <CompanyFacts locale={locale}/>
    <AboutPreview locale={locale}/>
    <ServicesShowcase locale={locale}/>
    <HomeAchievements locale={locale}/>
    <HomeInstitutions locale={locale}/>
  </main>;
}
