import Link from 'next/link';
import { alternateLocale, pages, type Locale } from '@/lib/site';
export function SiteHeader({locale, segments=[]}:{locale:Locale; segments?:string[]}) {
 const home=locale==='ar'?'الرئيسية':'Home';
 const current=segments.join('/');
 return <header className="site-header"><div className="site-shell header-inner">
  <Link className="wordmark" href={`/${locale}`} aria-label="INBS home">INBS<span className="wordmark-dot">.</span><small>INTERNATIONAL NETWORK<br/>BUSINESSMEN SERVICES</small></Link>
  <nav className="site-nav" aria-label={locale==='ar'?'التنقل الرئيسي':'Main navigation'}>
   <Link href={`/${locale}`}>{home}</Link>
   {pages.slice(0,7).map(p=><Link key={p.slug} aria-current={current===p.slug?'page':undefined} href={`/${locale}/${p.slug}`}>{p[locale]}</Link>)}
  </nav>
  <div className="header-actions">
   <Link className="language-link" lang={alternateLocale(locale)} href={`/${alternateLocale(locale)}${current?'/'+current:''}`}>{locale==='en'?'العربية':'English'}</Link>
   <details className="mobile-nav"><summary aria-label={locale==='ar'?'فتح القائمة':'Open menu'}>☰</summary><nav aria-label={locale==='ar'?'قائمة الجوال':'Mobile navigation'}><Link href={`/${locale}`}>{home}</Link>{pages.map(p=><Link key={p.slug} href={`/${locale}/${p.slug}`}>{p[locale]}</Link>)}</nav></details>
  </div></div></header>
}
