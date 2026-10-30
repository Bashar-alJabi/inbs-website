/** Route-level loading state, with no artificial delay or blocking overlay. */
export default function Loading() {
 return (
  <main className="inbs-loading" role="status" aria-live="polite" aria-atomic="true">
    <div className="inbs-loading-identity" aria-hidden="true">
      <span className="inbs-loading-wordmark">INBS<span className="inbs-loading-dot">.</span></span>
      <span className="inbs-loading-rule"/>
      <span className="inbs-loading-subtitle inbs-loading-subtitle-en">International Network Businessmen Services</span>
      <span className="inbs-loading-subtitle inbs-loading-subtitle-ar">الشبكة العالمية لخدمات رجال الأعمال</span>
    </div>
    <div className="inbs-loading-progress" aria-hidden="true"><span/></div>
    <span className="sr-only">Loading… / جارٍ التحميل…</span>
  </main>
 );
}
