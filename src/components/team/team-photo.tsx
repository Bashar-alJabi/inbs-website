import Image from 'next/image';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

type TeamPhotoProps = {
  number: '01' | '02' | '03';
  kind: 'event' | 'portrait' | 'office';
  description: string;
};

/** Use the final WebP when present; otherwise render the lightweight SVG mockup. */
export function TeamPhoto({ number, kind, description }: TeamPhotoProps) {
  const filename = `hero-${number}`;
  const isRealPhotoAvailable = existsSync(
    join(process.cwd(), 'public', 'images', 'team', `${filename}.webp`)
  );
  const src = `/images/team/${filename}.${isRealPhotoAvailable ? 'webp' : 'svg'}`;

  return (
    <div className={`inbs-team-photo inbs-team-photo--${kind}`}>
      <Image
        src={src}
        alt={description}
        fill
        sizes="(max-width: 760px) 36vw, (max-width: 1200px) 32vw, 420px"
        priority={number === '02'}
        unoptimized={!isRealPhotoAvailable}
      />
    </div>
  );
}
