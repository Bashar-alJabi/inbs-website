/** Decorative transition between the office locator and the closing CTA. */
export function ContactUaeDivider() {
  return (
    <section className="inbs-contact-uae-divider" aria-hidden="true">
      {/* UAE outline projected from Natural Earth country geometry; decorative only. */}
      <svg className="inbs-contact-uae-art" viewBox="0 0 640 410" fill="none" aria-hidden="true" focusable="false">
        <path className="inbs-contact-uae-outline" d="M76.3,208.1 L94.3,203.2 L98.1,230.9 L177.2,215.0 L260.9,217.6 L322.0,220.6 L391.3,152.2 L466.8,87.4 L530.7,25.0 L549.9,59.5 L563.7,139.4 L512.0,139.8 L503.7,205.7 L521.6,219.7 L475.8,239.7 L475.6,281.0 L446.1,322.9 L443.4,363.6 L423.0,385.0 L118.9,334.0 L80.2,231.5 L76.3,208.1 Z"/>
        <path className="inbs-contact-uae-route" d="M358.3 187 Q399 154 449.8 111.1 Q457 103 463.3 96.7"/>
        <circle className="inbs-contact-uae-city inbs-contact-uae-city--abu" cx="358.3" cy="187" r="4"/>
        <circle className="inbs-contact-uae-city inbs-contact-uae-city--dubai" cx="449.8" cy="111.1" r="5.5"/>
        <circle className="inbs-contact-uae-city inbs-contact-uae-city--sharjah" cx="463.3" cy="96.7" r="3.5"/>
        <circle className="inbs-contact-uae-pulse inbs-contact-uae-pulse--dubai" cx="449.8" cy="111.1" r="10"/>
        <circle className="inbs-contact-uae-pulse inbs-contact-uae-pulse--abu" cx="358.3" cy="187" r="9"/>
        <circle className="inbs-contact-uae-traveler" r="3.2">
          <animateMotion dur="12s" repeatCount="indefinite" path="M358.3 187 Q399 154 449.8 111.1 Q457 103 463.3 96.7"/>
        </circle>
      </svg>
    </section>
  );
}
