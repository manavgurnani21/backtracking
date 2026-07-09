import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Manav Gurnani — Software Engineer · ML Systems',
  description:
    'Portfolio of Manav Gurnani: ML systems, cloud infrastructure, and the software brains of an autonomous Cadillac. Follow the road.',
};

const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <Nav />
        <main className="wrap">{children}</main>
        <footer className="site wrap">
          <span>Manav Gurnani</span>
          <span>Davis → Seattle → the open road</span>
        </footer>
      </body>
    </html>
  );
}
