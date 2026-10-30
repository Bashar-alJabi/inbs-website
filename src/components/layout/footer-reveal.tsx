'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/** One-time entrance when the footer enters the viewport. Native content stays visible when reduced motion is enabled. */
export function FooterReveal({children,delay=0}:{children:ReactNode;delay?:number}){
  const reduced=useReducedMotion();
  return <motion.div initial={reduced?false:{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.12}} transition={{duration:.72,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}
