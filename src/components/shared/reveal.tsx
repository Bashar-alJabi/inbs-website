'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Keep the existing footer entrance timing distinct from homepage sections. */
  variant?: 'section' | 'footer';
};

/** Shared once-per-viewport reveal; respects the user's reduced-motion preference. */
export function Reveal({ children, delay = 0, className, variant = 'section' }: RevealProps) {
  const reduced = useReducedMotion();
  const footer = variant === 'footer';

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: footer ? 32 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: footer ? 0.12 : 0.08 }}
      transition={{ duration: footer ? 0.72 : 0.8, delay, ease: [.22, 1, .36, 1] }}
    >
      {children}
    </motion.div>
  );
}
