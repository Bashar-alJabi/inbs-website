import type { Locale } from '@/lib/site';
import { ContactHero } from './contact-hero';
import { ContactChannels } from './contact-channels';
import { ContactVisit } from './contact-visit';
import { ContactClosing } from './contact-closing';

/** Page composition only. No form or submission backend. */
export function ContactPage({ locale }: { locale: Locale }) {
  return <main className="inbs-contact-page">
    <ContactHero locale={locale}/>
    <ContactChannels locale={locale}/>
    <ContactVisit locale={locale}/>
    <ContactClosing locale={locale}/>
  </main>;
}
