import { uaeEmiratePaths } from '@/content/uae-map';

/** Decorative UAE map, with the INBS office marker anchored to Business Bay, Dubai. */
const emirateLabels = {
  en: [
    { name: 'Abu Dhabi', x: 315, y: 417 },
    { name: 'Dubai', x: 554, y: 245 },
    { name: 'Sharjah', x: 664, y: 215 },
    { name: 'Ajman', x: 628, y: 151 },
    { name: 'Umm Al Quwain', x: 617, y: 80 },
    { name: 'Ras Al Khaimah', x: 699, y: 32 },
    { name: 'Fujairah', x: 721, y: 179 },
  ],
  ar: [
    { name: 'أبوظبي', x: 315, y: 417 },
    { name: 'دبي', x: 554, y: 245 },
    { name: 'الشارقة', x: 664, y: 215 },
    { name: 'عجمان', x: 628, y: 151 },
    { name: 'أم القيوين', x: 617, y: 80 },
    { name: 'رأس الخيمة', x: 699, y: 32 },
    { name: 'الفجيرة', x: 721, y: 179 },
  ],
} as const;

export function ContactUaeDivider({ locale }: { locale: 'en' | 'ar' }) {
  return (
    <section className="inbs-contact-uae-divider" aria-hidden="true">
      <svg className="inbs-contact-uae-art" viewBox="0 0 760 613" fill="none" focusable="false">
        <g className="inbs-contact-uae-emirates">
          {uaeEmiratePaths.map(({ id, path }) => (
            <path key={id} d={path} />
          ))}
        </g>
        <g className="inbs-contact-uae-labels">
          {emirateLabels[locale].map(({ name, x, y }) => (
            <text key={name} x={x} y={y} textAnchor="middle" direction={locale === 'ar' ? 'rtl' : 'ltr'}>{name}</text>
          ))}
        </g>
        {/* Park Lane Tower, Business Bay (25.18548 N, 55.26178 E), placed on the UAE map. */}
        <g className="inbs-contact-uae-office">
          <circle className="inbs-contact-uae-office-halo" cx="585" cy="158" r="22" />
          <circle className="inbs-contact-uae-office-halo inbs-contact-uae-office-halo--outer" cx="585" cy="158" r="49" />
          <circle className="inbs-contact-uae-office-pulse" cx="585" cy="158" r="12" />
          <circle className="inbs-contact-uae-office-dot" cx="585" cy="158" r="5.5" />
          <g className="inbs-contact-uae-orbit inbs-contact-uae-orbit--near">
            <circle cx="607" cy="158" r="3.5"/>
          </g>
          <g className="inbs-contact-uae-orbit inbs-contact-uae-orbit--far">
            <circle cx="634" cy="158" r="3"/>
          </g>
        </g>
      </svg>
    </section>
  );
}
