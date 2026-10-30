'use client';
import { useEffect, useRef } from 'react';

/** Decorative enhancement only: native pointer stays visible and functional. */
export function CustomCursor() {
 const cursor = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const el = cursor.current;
  if (!el) return;
  const eligible = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let x = 0, y = 0;
  const move = (event: PointerEvent) => {
   if (!eligible.matches || reduced.matches || event.pointerType !== 'mouse') return;
   x = event.clientX; y = event.clientY;
   if (!frame) frame = requestAnimationFrame(() => {
    el.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
    el.dataset.visible = 'true';
    frame = 0;
   });
   el.dataset.active = (event.target instanceof Element && event.target.closest('a, button, [role="button"]')) ? 'true' : 'false';
  };
  const hide = () => { el.dataset.visible = 'false'; };
  const preferences = () => { if (!eligible.matches || reduced.matches) hide(); };
  window.addEventListener('pointermove', move, {passive:true});
  document.addEventListener('pointerleave', hide);
  window.addEventListener('blur', hide);
  eligible.addEventListener('change', preferences);
  reduced.addEventListener('change', preferences);
  return () => {
   cancelAnimationFrame(frame);
   window.removeEventListener('pointermove', move);
   document.removeEventListener('pointerleave', hide);
   window.removeEventListener('blur', hide);
   eligible.removeEventListener('change', preferences);
   reduced.removeEventListener('change', preferences);
  };
 }, []);
 return <div ref={cursor} className="inbs-custom-cursor" aria-hidden="true" />;
}
