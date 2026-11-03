import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, FacebookIcon } from './social-icons';
import { pages, serviceSlugs, serviceNames, type Locale } from '@/lib/site';
import { Reveal } from '@/components/shared/reveal';
import { companyContact, socialLinks } from '@/content/contact';

const socialIcons = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  return <footer className="inbs-footer">
    <div className="inbs-footer-glow" aria-hidden="true" /><span className="inbs-footer-watermark" aria-hidden="true">INBS</span>
    <div className="site-shell inbs-footer-container">
      <Reveal variant="footer">
        <div className="inbs-footer-top">
          <div><p>{locale === 'ar' ? 'الشبكة العالمية لخدمات رجال الأعمال' : 'INTERNATIONAL NETWORK BUSINESSMEN SERVICES'}</p>
            <h2>{locale === 'ar' ? 'شريكك في عالم الأعمال.' : 'Your partner in business.'}</h2></div>
          <Link href={`/${locale}/contact`}>{locale === 'ar' ? 'تواصل معنا' : 'Contact us'}<ArrowUpRight size={20} /></Link>
        </div>
      </Reveal>
      <div className="inbs-footer-grid">
        <Reveal variant="footer" delay={0.05}>
          <div className="inbs-footer-about">
            <Image src="/brand/inbs-logo.png" width={195} height={96} alt="INBS" />
            <p>{locale === 'ar' ? 'تأسست الشبكة العالمية لخدمات رجال الأعمال في دبي عام 2003، وتقدم لعملائها مجموعة متنوعة من الخدمات التي تلبي احتياجاتهم.' : 'Founded in Dubai in 2003, International Network Businessmen Services supports clients across a diverse range of services.'}</p>
            <div className="inbs-socials" aria-label="Social media">{socialLinks.map(({ id, label, href }) => {
              const Icon = socialIcons[id];
              return <a key={id} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon /></a>;
            })}</div>
          </div>
        </Reveal>
        <Reveal variant="footer" delay={0.12}>
          <div><h3>{locale === 'ar' ? 'روابط مهمة' : 'Quick links'}</h3>{pages.slice(0, 7).map(p => <Link key={p.slug} href={`/${locale}/${p.slug}`}>{p[locale]}</Link>)}</div>
        </Reveal>
        <Reveal variant="footer" delay={0.18}>
          <div><h3>{locale === 'ar' ? 'خدماتنا' : 'Services'}</h3>{serviceSlugs.slice(0, 6).map(s => <Link key={s} href={`/${locale}/services/${s}`}>{serviceNames[s][locale]}</Link>)}</div>
        </Reveal>
        <Reveal variant="footer" delay={0.24}>
          <div className="inbs-footer-contact">
            <h3>{locale === 'ar' ? 'تواصل معنا' : 'Contact details'}</h3>
            <a href={companyContact.emailHref}><Mail size={18} aria-hidden="true" /><span>{companyContact.email}</span></a>
            <a href={companyContact.phoneHref}><Phone size={18} aria-hidden="true" /><span className="inbs-phone-number" dir="ltr">{companyContact.phone}</span></a>
            <a href={companyContact.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" /><span>{companyContact.address[locale]} <ArrowUpRight size={14} className="map-external" /></span></a>
          </div>
        </Reveal>
      </div>
      <div className="inbs-footer-bottom">
        <span className="inbs-copyright">© {new Date().getFullYear()} INBS <span>{locale === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}</span></span>
        <div>{pages.slice(-2).map(p => <Link key={p.slug} href={`/${locale}/${p.slug}`}>{p[locale]}</Link>)}</div>
      </div>
    </div>
  </footer>;
}
