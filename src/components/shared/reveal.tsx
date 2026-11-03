'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  distance?: number;
  duration?: number;
  amount?: number;
};

export function Reveal({ children, delay = 0, className, distance = 28, duration = 0.8, amount = 0.08 }: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} initial={reduced ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [.22, 1, .36, 1] }}>
      {children}
    </motion.div>
  );
}
