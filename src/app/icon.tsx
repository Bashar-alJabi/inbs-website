import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 128, height: 128 };
export const contentType = 'image/png';

/** Use the actual official logo asset, never a recreated wordmark. */
export default async function Icon() {
 const logo = await readFile(join(process.cwd(), 'public', 'brand', 'inbs-logo.png'));
 const source = `data:image/png;base64,${logo.toString('base64')}`;
 return new ImageResponse(
  <div style={{ display:'flex', width:'100%', height:'100%', alignItems:'center', justifyContent:'center', background:'transparent', padding:0 }}>
   <img src={source} alt="" width={128} height={128} style={{objectFit:'contain'}} />
  </div>,
  size,
 );
}
