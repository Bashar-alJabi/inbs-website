'use client';

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export function Reveal({children,delay=0}:{children:ReactNode;delay?:number}) {
 const reduced = useReducedMotion();
 return <motion.div initial={reduced?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.08}} transition={{duration:.8,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}

/** Progressive enhancement. Native scrolling remains the accessible fallback. */
export function SmoothScroll() {
 useEffect(()=>{
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;
  let active=true; let frame=0; let destroy:(()=>void)|undefined;
  import('lenis').then(({default:Lenis})=>{
   if(!active)return;
   const lenis=new Lenis({duration:1.1,autoRaf:false});
   destroy=()=>lenis.destroy();
   const loop=(time:number)=>{lenis.raf(time);frame=requestAnimationFrame(loop)};
   frame=requestAnimationFrame(loop);
  });
  return ()=>{active=false;cancelAnimationFrame(frame);destroy?.()};
 },[]);
 return null;
}
