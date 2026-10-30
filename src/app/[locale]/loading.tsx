/** Only rendered while a route segment is actually loading; no artificial delay. */
export default function Loading() {
 return <main className="inbs-loading" role="status" aria-live="polite">
  <div className="inbs-loading-mark" aria-hidden="true">INBS</div>
  <span className="inbs-loading-line" aria-hidden="true" />
  <span className="sr-only">Loading… / جارٍ التحميل…</span>
 </main>;
}
