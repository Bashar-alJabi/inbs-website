'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, House, Compass } from 'lucide-react';

/** Global not-found route; identify locale from path without depending on locale layout. */
export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] === 'ar' ? 'ar' : 'en';
  const ar = locale === 'ar';
  return (
    <main className="inbs-not-found" lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <div className="inbs-not-found-glow" aria-hidden="true" />
      <div className="site-shell inbs-not-found-inner">
        <p className="inbs-not-found-kicker"><span aria-hidden="true" /> INBS / {ar ? 'الصفحة غير موجودة' : 'PAGE NOT FOUND'}</p>
        <div className="inbs-not-found-number" aria-hidden="true">404<span>.</span></div>
        <h1>{ar ? 'يبدو أنك وصلت إلى طريق غير موجود.' : 'This page is off the map.'}</h1>
        <p className="inbs-not-found-description">
          {ar ? 'قد يكون الرابط تغيّر أو أن الصفحة لم تعد متاحة. يمكنك العودة للرئيسية أو استكشاف خدماتنا.'
            : 'The link may have changed or the page is no longer available. Return home or explore what we offer.'}
        </p>
        <div className="inbs-not-found-actions">
          <Link className="inbs-not-found-primary" href={`/${locale}`}><House size={18} aria-hidden="true" /> {ar ? 'العودة للرئيسية' : 'Back to homepage'} <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link className="inbs-not-found-secondary" href={`/${locale}/services`}><Compass size={18} aria-hidden="true" /> {ar ? 'استكشف خدماتنا' : 'Explore services'}</Link>
        </div>
        <div className="inbs-not-found-bottom"><span>INBS</span><span>{ar ? 'دبي · الإمارات العربية المتحدة' : 'DUBAI · UNITED ARAB EMIRATES'}</span></div>
      </div>
      <div className="inbs-not-found-orbit orbit-a" aria-hidden="true" />
      <div className="inbs-not-found-orbit orbit-b" aria-hidden="true" />
    </main>
  );
}
