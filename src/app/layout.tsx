import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'INBS | Businessmen Services in Dubai', template: '%s | INBS' },
  description: 'International Network Businessmen Services, established in Dubai in 2003.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
