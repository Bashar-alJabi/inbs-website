import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { pages,type Locale } from '@/lib/site';

export function SiteFooter({locale}:{locale:Locale}){
 return <footer className="site-footer"><div className="site-shell"><div className="footer-top"><div><p className="footer-kicker">INBS / DUBAI</p><h2>{locale==='ar'?'نصنع روابط تدفع أعمالك إلى الأمام.':'Connections that move business forward.'}</h2></div><Link className="footer-inquiry" href={`/${locale}/contact`}>{locale==='ar'?'تواصل معنا':'Get in touch'}<ArrowUpRight size={20}/></Link></div>
 <div className="footer-grid"><div className="footer-about"><Image src="/brand/inbs-logo.png" alt="INBS" width={150} height={75} className="footer-logo"/><p>{locale==='ar'?'الشبكة العالمية لخدمات رجال الأعمال، دبي منذ عام 2003.':'International Network Businessmen Services, Dubai. Established in 2003.'}</p></div>
 <div><h3>{locale==='ar'?'استكشف':'Explore'}</h3>{pages.slice(0,7).map(p=><Link key={p.slug} href={`/${locale}/${p.slug}`}>{p[locale]}</Link>)}</div>
 <div><h3>{locale==='ar'?'التواصل':'Contact'}</h3><a href="mailto:info@inbs-uae.com">info@inbs-uae.com</a><a href="tel:+971508866555" dir="ltr">+971 50 886 6555</a><p>ParkLane Tower, Office 1720<br/>Business Bay, Dubai</p></div></div>
 <div className="footer-bottom"><span>© {new Date().getFullYear()} INBS</span><span>INTERNATIONAL NETWORK BUSINESSMEN SERVICES</span><div>{pages.slice(-2).map(p=><Link key={p.slug} href={`/${locale}/${p.slug}`}>{p[locale]}</Link>)}</div></div></div></footer>
}
