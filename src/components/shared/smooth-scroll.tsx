'use client';

import { useEffect } from 'react';

/** Progressive enhancement; native scrolling remains available. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(pointer: coarse)').matches) return;
    let active = true;
    let frame = 0;
    let destroy: (() => void) | undefined;
    import('lenis').then(({ default: Lenis }) => {
      if (!active) return;
      const lenis = new Lenis({ duration: 1.1, autoRaf: false });
      destroy = () => lenis.destroy();
      const loop = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    }).catch(() => { /* Native scrolling remains functional. */ });
    return () => { active = false; cancelAnimationFrame(frame); destroy?.(); };
  }, []);
  return null;
}
