import type { Metadata } from 'next';
import './globals.css';
import { DemoSwitcher } from '@/components/DemoSwitcher';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'RecyConnect — Recyclable-Material B2B Marketplace',
  description:
    'Turn recyclable waste into real opportunities. Connect industrial material suppliers with verified recycling factories through one transparent marketplace.',
  keywords: [
    'recyclable marketplace',
    'scrap recycling',
    'OCC cardboard',
    'PET flakes recycling',
    'metal scrap buyer',
    'b2b circular economy',
    'recycling factory matching',
  ],
  authors: [{ name: 'RecyConnect' }],
  openGraph: {
    title: 'RecyConnect — Connect · Recycle · Impact',
    description:
      'Digital marketplace connecting verified recyclable material suppliers and recycling factories with transparent specs, matching, and status tracking.',
    url: 'https://recyconnect.com',
    siteName: 'RecyConnect',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-forest-900 forest-grid-bg text-charcoal selection:bg-forest-700 selection:text-white">
        <DemoSwitcher />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
