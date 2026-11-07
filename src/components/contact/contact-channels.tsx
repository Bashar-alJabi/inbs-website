import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, FacebookIcon } from '@/components/layout/social-icons';
import { Reveal } from '@/components/shared/reveal';
import { companyContact, socialLinks } from '@/content/contact';
import { contactPageContent } from '@/content/contact-page';
import type { Locale } from '@/lib/site';

const socialIcons = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;

export function ContactChannels({ locale }: { locale: Locale }) {
  const t = contactPageContent[locale];
  return (
    <section className="inbs-contact-channels" id="contact-channels" aria-labelledby="inbs-contact-channels-title">
      <div className="site-shell">
        <Reveal className="inbs-contact-section-head">
          <div>
            <p className="inbs-contact-kicker"><span aria-hidden="true"/>{t.waysEyebrow}</p>
            <h2 id="inbs-contact-channels-title">{t.waysTitle}</h2>
          </div>
          <p>{t.waysLead}</p>
        </Reveal>
        <div className="inbs-contact-channel-grid">
          <Reveal className="inbs-contact-channel">
            <div className="inbs-contact-channel-top"><span>01 / {t.callLabel}</span><Phone size={25} strokeWidth={1.6} aria-hidden="true"/></div>
            <h3>{t.callTitle}</h3>
            <p>{t.callText}</p>
            <div className="inbs-contact-channel-values">
              {companyContact.phones.map(phone => (
                <a key={phone.href} className="inbs-contact-channel-value" dir="ltr" href={phone.href}>{phone.label}</a>
              ))}
            </div>
            <a className="inbs-contact-channel-action" href={companyContact.phoneHref}>
              {t.phoneAction}<ArrowUpRight size={20} aria-hidden="true"/>
            </a>
          </Reveal>
          <Reveal className="inbs-contact-channel" delay={0.08}>
            <div className="inbs-contact-channel-top"><span>02 / {t.mailLabel}</span><Mail size={25} strokeWidth={1.6} aria-hidden="true"/></div>
            <h3>{t.mailTitle}</h3>
            <p>{t.mailText}</p>
            <div className="inbs-contact-channel-values">
              {companyContact.emails.map(email => (
                <a key={email.href} className="inbs-contact-channel-value" dir="ltr" href={email.href}>{email.label}</a>
              ))}
            </div>
            <a className="inbs-contact-channel-action" href={companyContact.emailHref}>
              {t.emailAction}<ArrowUpRight size={20} aria-hidden="true"/>
            </a>
          </Reveal>
        </div>
        <Reveal className="inbs-contact-social">
          <div>
            <p className="inbs-contact-kicker"><span aria-hidden="true"/>{t.socialEyebrow}</p>
            <h3>{t.socialTitle}</h3>
            <p>{t.socialLead}</p>
          </div>
          <nav aria-label={t.socialTitle} className="inbs-contact-social-links">
            {socialLinks.map(item=>{
              const Icon = socialIcons[item.id];
              return <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer">
                <Icon width={21} height={21}/>
                {item.label}<ArrowUpRight size={17} aria-hidden="true"/>
              </a>;
            })}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
