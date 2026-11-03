'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Compass, House } from 'lucide-react';

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] === 'ar' ? 'ar' : 'en';
  const arabic = locale === 'ar';

  return (
    <main className="inbs-not-found" lang={locale} dir={arabic ? 'rtl' : 'ltr'}>
      <div className="inbs-not-found-aura" aria-hidden="true" />
      <div className="inbs-not-found-ring" aria-hidden="true" />
      <div className="site-shell inbs-not-found-content">
        <p className="inbs-not-found-kicker">
          <span className="inbs-not-found-kicker-line" aria-hidden="true" />
          {arabic ? 'الشبكة العالمية لخدمات رجال الأعمال' : 'INTERNATIONAL NETWORK BUSINESSMEN SERVICES'}
        </p>

        <div className="inbs-not-found-code" aria-hidden="true">
          404<span>.</span>
        </div>

        <h1>{arabic ? 'يبدو أن هذه الصفحة غير موجودة.' : 'Looks like this page is missing.'}</h1>
        <p className="inbs-not-found-description">
          {arabic
            ? 'قد يكون الرابط تغيّر أو لم تعد الصفحة متاحة. يمكنك العودة إلى الرئيسية أو متابعة استكشاف خدماتنا.'
            : 'This link may have changed or the page is no longer available. Head back home or continue exploring our services.'}
        </p>

        <div className="inbs-not-found-actions">
          <Link className="inbs-not-found-primary" href={`/${locale}`}>
            <House size={18} aria-hidden="true" />
            <span>{arabic ? 'العودة للرئيسية' : 'Back to homepage'}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link className="inbs-not-found-secondary" href={`/${locale}/services`}>
            <Compass size={18} aria-hidden="true" />
            <span>{arabic ? 'استكشف خدماتنا' : 'Explore our services'}</span>
          </Link>
        </div>

        <div className="inbs-not-found-signature" aria-hidden="true">
          <span>INBS</span>
          <span>{arabic ? 'دبي، الإمارات العربية المتحدة' : 'DUBAI · UNITED ARAB EMIRATES'}</span>
        </div>
      </div>
    </main>
  );
}
