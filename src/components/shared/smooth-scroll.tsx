'use client';

import { useEffect } from 'react';

/** Optional smooth scrolling on fine-pointer devices; native scroll is the fallback. */
export function SmoothScroll() {
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) return;

    let active = true;
    let frame = 0;
    let destroy: (() => void) | undefined;

    import('lenis').then(({ default: Lenis }) => {
      if (!active) return;
      const lenis = new Lenis({ duration: 1.1, autoRaf: false });
      const root = document.documentElement;
      const syncDrawerLock = () => {
        if (root.hasAttribute('data-inbs-drawer-open')) lenis.stop();
        else lenis.start();
      };
      const observer = new MutationObserver(syncDrawerLock);
      observer.observe(root, { attributes: true, attributeFilter: ['data-inbs-drawer-open'] });
      syncDrawerLock();
      destroy = () => { observer.disconnect(); lenis.destroy(); };
      const loop = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    });

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      destroy?.();
    };
  }, []);

  return null;
}
