import type { ReactNode } from 'react';

/** Shared About-only presentational helpers, with no translated copy in JSX. */
export function AboutLines({ text }: { text: string }) {
  return <>{text.split('\n').map((line, index) =>
    <span className="inbs-about-line" key={index}>{line}</span>
  )}</>;
}

export function AboutSectionLabel({ children }: { children: ReactNode }) {
  return <p className="inbs-story-label"><span aria-hidden="true" />{children}</p>;
}
