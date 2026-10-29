import Link from 'next/link';
import { pages, type Locale } from '@/lib/site';
export function SiteFooter({locale}:{locale:Locale}) {
 return <footer className="site-footer"><div className="site-shell footer-grid">
  <div><strong className="footer-brand">INBS<span>.</span></strong><p>{locale==='ar'?'الشبكة العالمية لخدمات رجال الأعمال':'International Network Businessmen Services'}</p><p>{locale==='ar'?'دبي، الإمارات العربية المتحدة':'Dubai, United Arab Emirates'}</p></div>
  <div><h2>{locale==='ar'?'روابط مهمة':'Explore'}</h2>{pages.slice(0,7).map(p=><Link key={p.slug} href={`/${locale}/${p.slug}`}>{p[locale]}</Link>)}</div>
  <div><h2>{locale==='ar'?'التواصل':'Get in touch'}</h2><a href="mailto:info@inbs-uae.com">info@inbs-uae.com</a><a href="tel:+971508866555">+971 50 886 6555</a><p>ParkLane Tower, Office 1720<br/>Business Bay, Dubai</p></div>
 </div><div className="site-shell footer-bottom"><span>© {new Date().getFullYear()} INBS</span><div>{pages.slice(-2).map(p=><Link key={p.slug} href={`/${locale}/${p.slug}`}>{p[locale]}</Link>)}</div></div></footer>
}
