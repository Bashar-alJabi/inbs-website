'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

type Photo = { key: 'building' | 'office' | 'door'; label: string; path: string };
type Props = { label: string; closeLabel: string; photos: [Photo, Photo, Photo] };

export function ContactHeroGallery({ label, closeLabel, photos }: Props) {
  const [opened, setOpened] = useState<Photo | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!opened) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpened(null);
      if (event.key === 'Tab') {
        // The lightbox has one focusable control; keep keyboard focus in it.
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      opener.current?.focus();
    };
  }, [opened]);

  return (
    <>
      <div className="inbs-contact-hero-gallery" role="group" aria-label={label}>
        {photos.map(photo => (
          <button key={photo.key} type="button"
            className={`inbs-contact-hero-photo inbs-contact-hero-photo--${photo.key}`}
            aria-label={photo.label}
            onClick={event => {
              opener.current = event.currentTarget;
              setOpened(photo);
            }}>
            <span className="inbs-contact-photo-image" aria-hidden="true"/>
            <span className="inbs-contact-photo-traveler" aria-hidden="true"/>
          </button>
        ))}
      </div>
      {opened && createPortal(
        <div className="inbs-contact-photo-lightbox" role="presentation"
          onMouseDown={event => { if (event.target === event.currentTarget) setOpened(null); }}>
          <div className="inbs-contact-photo-lightbox-panel" role="dialog" aria-modal="true" aria-label={opened.label}>
            <button ref={closeButton} type="button" className="inbs-contact-photo-lightbox-close"
              aria-label={closeLabel} onClick={() => setOpened(null)}><X size={23} aria-hidden="true"/></button>
            <Image src={opened.path} alt={opened.label} className="inbs-contact-photo-lightbox-image" fill sizes="100vw"/>
          </div>
        </div>, document.body
      )}
    </>
  );
}
