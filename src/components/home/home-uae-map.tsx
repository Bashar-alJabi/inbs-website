'use client';
import { useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { useReducedMotion } from 'motion/react';
import { homeUaeEmiratePaths } from '@/content/home-uae-map';

/** Homepage-local copy of the interactive UAE office map; independently editable from Contact. */
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

export function HomeUaeMap({ locale }: { locale: 'en' | 'ar' }) {
  const sectionRef = useRef<HTMLElement>(null);
  const officeRef = useRef<SVGCircleElement>(null);
  const reducedMotion = useReducedMotion();
  const [cursor, setCursor] = useState<{ x: number; y: number; officeX: number; officeY: number; width: number; height: number } | null>(null);

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || reducedMotion) return;
    const bounds = sectionRef.current?.getBoundingClientRect();
    const office = officeRef.current?.getBoundingClientRect();
    if (!bounds || !office) return;
    setCursor({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      officeX: office.left + office.width / 2 - bounds.left,
      officeY: office.top + office.height / 2 - bounds.top,
      width: bounds.width,
      height: bounds.height,
    });
  };

  const dx = cursor ? cursor.officeX - cursor.x : 0;
  const dy = cursor ? cursor.officeY - cursor.y : 0;
  const bend = Math.min(Math.hypot(dx, dy) * .18, 74);
  const curve = cursor
    ? `M ${cursor.x} ${cursor.y} Q ${cursor.x + dx * .5 + (-dy / (Math.hypot(dx, dy) || 1)) * bend} ${cursor.y + dy * .5 + (dx / (Math.hypot(dx, dy) || 1)) * bend} ${cursor.officeX} ${cursor.officeY}`
    : null;

  return (
    <section ref={sectionRef} className="inbs-home-uae-divider"
      aria-label={locale === 'ar' ? 'خريطة الإمارات مع موقع مكتب INBS في دبي' : 'UAE map showing the INBS office in Dubai'}
      onPointerMove={onPointerMove} onPointerLeave={() => setCursor(null)} onPointerCancel={() => setCursor(null)}>
      <svg className="inbs-home-uae-art" viewBox="0 0 760 613" fill="none" focusable="false">
        <g className="inbs-home-uae-emirates">
          {homeUaeEmiratePaths.map(({ id, path }) => (
            <path key={id} d={path} />
          ))}
        </g>
        <g className="inbs-home-uae-labels">
          {emirateLabels[locale].map(({ name, x, y }) => (
            <text key={name} x={x} y={y} textAnchor="middle" direction={locale === 'ar' ? 'rtl' : 'ltr'}>{name}</text>
          ))}
        </g>
        {/* Park Lane Tower, Business Bay (25.18548 N, 55.26178 E), placed on the UAE map. */}
        <g className="inbs-home-uae-office">
          <circle className="inbs-home-uae-office-halo" cx="585" cy="158" r="22" />
          <circle className="inbs-home-uae-office-halo inbs-home-uae-office-halo--outer" cx="585" cy="158" r="49" />
          <circle className="inbs-home-uae-office-pulse" cx="585" cy="158" r="12" />
          <circle ref={officeRef} className="inbs-home-uae-office-dot" cx="585" cy="158" r="5.5" />
          <g className="inbs-home-uae-orbit inbs-home-uae-orbit--near">
            <circle cx="607" cy="158" r="3.5"/>
          </g>
          <g className="inbs-home-uae-orbit inbs-home-uae-orbit--far">
            <circle cx="634" cy="158" r="3"/>
          </g>
        </g>
      </svg>
      {cursor && curve && (
        <>
          <svg className="inbs-home-uae-pointer-line" aria-hidden="true">
            <defs>
              <marker id="inbs-home-uae-pointer-arrow" viewBox="0 0 12 12"
                refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto">
                <path d="M2 2 L10 6 L2 10" fill="none" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>
            <path d={curve} markerEnd="url(#inbs-home-uae-pointer-arrow)"/>
          </svg>
          <span className="inbs-home-uae-pointer-label" aria-hidden="true"
            style={{
              left: Math.max(10, Math.min(cursor.width - 65, cursor.x + 14)),
              top: Math.max(10, Math.min(cursor.height - 30, cursor.y + 14)),
            }}>INBS</span>
        </>
      )}
    </section>
  );
}
