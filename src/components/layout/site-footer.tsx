import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, FacebookIcon } from './social-icons';
import { serviceNames, type Locale } from '@/lib/site';
import { footerQuickPages, footerLegalPages, footerServiceSlugs } from '@/content/navigation';
import { routes } from '@/lib/routes';
import { Reveal } from '@/components/shared/reveal';
import { companyContact, socialLinks } from '@/content/contact';
import { layoutContent } from '@/content/layout';

const socialIcons = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = layoutContent[locale];
  return <footer className="inbs-footer">
    <div className="inbs-footer-glow" aria-hidden="true" /><span className="inbs-footer-watermark" aria-hidden="true">INBS</span>
    <div className="site-shell inbs-footer-container">
      <Reveal variant="footer">
        <div className="inbs-footer-top">
          <div><p>{t.footerBrand}</p>
            <h2>{t.footerHeading}</h2></div>
          <Link href={routes.page(locale,'contact')}>{t.contact}<ArrowUpRight size={20} /></Link>
        </div>
      </Reveal>
      <div className="inbs-footer-grid">
        <Reveal variant="footer" delay={0.05}>
          <div className="inbs-footer-about">
            <Image src="/brand/inbs-logo.png" width={195} height={96} alt="INBS" />
            <p>{t.footerAbout}</p>
            <div className="inbs-socials" aria-label="Social media">{socialLinks.map(({ id, label, href }) => {
              const Icon = socialIcons[id];
              return <a key={id} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon /></a>;
            })}</div>
          </div>
        </Reveal>
        <Reveal variant="footer" delay={0.12}>
          <div><h3>{t.quickLinks}</h3><Link href={routes.home(locale)}>{t.home}</Link>{footerQuickPages.map(p => <Link key={p.slug} href={routes.page(locale,p.slug)}>{p[locale]}</Link>)}</div>
        </Reveal>
        <Reveal variant="footer" delay={0.18}>
          <div><h3>{t.services}</h3>{footerServiceSlugs.map(s => <Link key={s} href={routes.service(locale,s)}>{serviceNames[s][locale]}</Link>)}<Link className="inbs-footer-more-services" href={routes.page(locale,'services')}>{t.moreServices}<ArrowUpRight size={15} aria-hidden="true" /></Link></div>
        </Reveal>
        <Reveal variant="footer" delay={0.24}>
          <div className="inbs-footer-contact">
            <h3>{t.contactDetails}</h3>
            {companyContact.emails.map(email => (
              <a key={email.href} href={email.href}><Mail size={18} aria-hidden="true" /><span>{email.label}</span></a>
            ))}
            {companyContact.phones.map(phone => (
              <a key={phone.href} href={phone.href}><Phone size={18} aria-hidden="true" /><span className="inbs-phone-number" dir="ltr">{phone.label}</span></a>
            ))}
            <a href={companyContact.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" /><span>{companyContact.address[locale]} <ArrowUpRight size={14} className="map-external" /></span></a>
          </div>
        </Reveal>
      </div>
      <div className="inbs-footer-bottom">
        <span className="inbs-copyright">© {new Date().getFullYear()} INBS <span>{t.rights}</span></span>
        <div>{footerLegalPages.map(p => <Link key={p.slug} href={routes.page(locale,p.slug)}>{p[locale]}</Link>)}</div>
      </div>
    </div>
  </footer>;
}
