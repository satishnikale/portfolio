import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { RevealObserver } from '@/components/layout/RevealObserver';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { site } from '@/content/site';
import { getResumeLinks } from '@/lib/resume';
import './globals.css';

// Fonts are bundled in ./fonts (SIL Open Font License) so builds never depend on reaching Google Fonts.
const geist = localFont({
  src: './fonts/Geist-Variable.woff2',
  weight: '100 900',
  variable: '--font-geist',
  display: 'swap',
});
const geistMono = localFont({
  src: './fonts/GeistMono-Variable.woff2',
  weight: '100 900',
  variable: '--font-geist-mono',
  display: 'swap',
});
const instrumentSerif = localFont({
  src: './fonts/InstrumentSerif-Italic.woff2',
  weight: '400',
  style: 'italic',
  variable: '--font-instrument-serif',
  display: 'swap',
});

const defaultTitle = `${site.name} — ${site.title} in Pune`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s · ${site.name}` },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0d0d0c',
};

// Runs before first paint. The page is dark by default (the class is rendered on <html>);
// this only switches to light when the visitor previously chose it, and flags JS for reveal animations.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('theme')==='light')d.classList.remove('dark')}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  const resume = getResumeLinks();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`dark ${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SiteHeader resume={resume} />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
