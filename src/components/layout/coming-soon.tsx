import Link from 'next/link';
import type { Locale } from '@/lib/site';
export function ComingSoon({locale,title}:{locale:Locale;title:string}) {
 return <main className="coming-soon"><div className="site-shell coming-content"><div className="section-kicker">INBS / {locale==='ar'?'قريباً':'COMING SOON'}</div>
 <span className="coming-number" aria-hidden="true">01 — INBS</span><h1>{title}<span className="blue-period">.</span></h1>
 <p>{locale==='ar'?'نعمل حالياً على تطوير هذه الصفحة لتقديم تجربة أفضل. يمكن العودة إلى الرئيسية أو التواصل معنا مباشرة.':'We’re crafting a better experience for this page. In the meantime, explore our homepage or get in touch.'}</p>
 <div className="coming-actions"><Link className="solid-button" href={`/${locale}`}>{locale==='ar'?'الصفحة الرئيسية':'Back to home'} <span aria-hidden="true">↗</span></Link><Link className="text-button" href={`/${locale}/contact`}>{locale==='ar'?'التواصل':'Contact us'} ↗</Link></div></div><div className="coming-decor" aria-hidden="true"><span/><span/><span/></div></main>
}
