import type { Metadata } from 'next';
import { siteUrl, siteIndexable } from '@/lib/seo';
import './globals.css';
import '../styles/navigation.css';
import '../styles/home.css';
import '../styles/site-layout.css';
import '../styles/tokens.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: { index: siteIndexable, follow: siteIndexable },
  title: { default: 'INBS | Businessmen Services in Dubai', template: '%s | INBS' },
  description: 'International Network Businessmen Services, established in Dubai in 2003.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
