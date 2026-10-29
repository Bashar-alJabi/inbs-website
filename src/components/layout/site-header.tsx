import Link from 'next/link';
import Image from 'next/image';
import { pages, type Locale } from '@/lib/site';
import { LanguageSwitcher } from './language-switcher';
export function SiteHeader({locale}:{locale:Locale}) {
 const home=locale==='ar'?'الرئيسية':'Home';
 return <header className="site-header"><div className="site-shell header-inner">
  <Link className="wordmark" href={`/${locale}`} aria-label="INBS home"><Image src="/brand/inbs-logo.png" alt="International Network Businessmen Services" width={150} height={75} priority className="official-logo"/></Link>
  <nav className="site-nav" aria-label={locale==='ar'?'التنقل الرئيسي':'Main navigation'}>
   <Link href={`/${locale}`}>{home}</Link>
   {pages.slice(0,7).map(p=><Link key={p.slug} href={`/${locale}/${p.slug}`}>{p[locale]}</Link>)}
  </nav>
  <div className="header-actions">
   <LanguageSwitcher locale={locale} />
   <details className="mobile-nav"><summary aria-label={locale==='ar'?'فتح القائمة':'Open menu'}>☰</summary><nav aria-label={locale==='ar'?'قائمة الجوال':'Mobile navigation'}><Link href={`/${locale}`}>{home}</Link>{pages.map(p=><Link key={p.slug} href={`/${locale}/${p.slug}`}>{p[locale]}</Link>)}</nav></details>
  </div></div></header>
}
