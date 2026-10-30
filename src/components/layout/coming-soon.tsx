'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/site';
export function ComingSoon({locale,title}:{locale:Locale;title:string}) {
 const t = useTranslations('ComingSoon');
 return <main className="coming-soon"><div className="site-shell coming-content"><div className="section-kicker">INBS / {t('label')}</div>
 <span className="coming-number" aria-hidden="true">01 — INBS</span><h1>{title}<span className="blue-period">.</span></h1>
 <p>{t('description')}</p>
 <div className="coming-actions"><Link className="solid-button" href={`/${locale}`}>{t('home')} <span aria-hidden="true">↗</span></Link><Link className="text-button" href={`/${locale}/contact`}>{t('contact')} ↗</Link></div></div><div className="coming-decor" aria-hidden="true"><span/><span/><span/></div></main>
}
