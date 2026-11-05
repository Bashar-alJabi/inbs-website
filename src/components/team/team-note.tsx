import { Reveal } from '@/components/shared/reveal';
import { teamPageContent } from '@/content/team-page';
import type { Locale } from '@/lib/site';

export function TeamNote({ locale }: { locale: Locale }) {
  const t = teamPageContent[locale];
  return (
    <section className="inbs-team-note" aria-labelledby="inbs-team-note-title">
      <div className="site-shell inbs-team-note-grid">
        <Reveal>
          <p className="inbs-team-kicker"><span aria-hidden="true"/>{t.noteEyebrow}</p>
          <h2 id="inbs-team-note-title">{t.noteTitle}</h2>
        </Reveal>
        <Reveal delay={0.1}><p>{t.noteBody}</p></Reveal>
      </div>
    </section>
  );
}
