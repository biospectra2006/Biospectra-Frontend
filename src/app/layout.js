import { Inter, Crimson_Pro, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import SmoothScroll from '@/components/common/SmoothScroll';
import LoadingBar from '@/components/common/LoadingBar';
import ScrollToTop from '@/components/common/ScrollToTop';
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://mset-biospectra.org'),
  title: {
    default: 'BIOSPECTRA | MSET International Journal of Life Sciences',
    template: '%s | BIOSPECTRA',
  },
  description: 'BIOSPECTRA is an International Biannual Refereed Journal of Life Sciences published by Madhawi Shyam Educational Trust (MSET). Reg. No. 20560/IV-1815/2005.',
  keywords: [
    'Biospectra', 'Life Sciences Journal', 'Biological Research', 'Academic Publication', 
    'MSET', 'Zoology Research', 'Botany Papers', 'Biotechnology Journal', 
    'Peer Reviewed Science', 'International Bio-Sciences Journal', 'Environmental Science Research'
  ],
  authors: [{ name: 'Madhawi Shyam Educational Trust' }],
  creator: 'MSET',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mset-biospectra.org',
    siteName: 'BIOSPECTRA Journal',
    title: 'BIOSPECTRA | MSET International Journal of Life Sciences',
    description: 'An International Biannual Refereed Journal of Life Sciences published by Madhawi Shyam Educational Trust.',
    images: [
      {
        url: '/assets/biospectra.jpg',
        width: 800,
        height: 1000,
        alt: 'Biospectra Journal Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIOSPECTRA | Academic Journal of Life Sciences',
    description: 'An International Biannual Refereed Journal of Life Sciences.',
    images: ['/assets/biospectra.jpg'],
  },
  icons: {
    icon: '/icon.jpg',
    apple: '/icon.jpg',
  },
};

export const viewport = {
  themeColor: '#fdfcff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${crimsonPro.variable} ${playfair.variable}`} style={{ background: '#eef4ec' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Periodical",
              "name": "BIOSPECTRA",
              "issn": "0973-7057",
              "publisher": {
                "@type": "Organization",
                "name": "Madhawi Shyam Educational Trust (MSET)",
                "url": "https://mset-biospectra.org"
              },
              "description": "International Biannual Refereed Journal of Life Sciences",
              "url": "https://mset-biospectra.org",
              "image": "https://mset-biospectra.org/assets/biospectra.jpg",
              "inLanguage": "en-US",
              "periodicity": "Biannual"
            })
          }}
        />
      </head>
      <body className="antialiased" style={{ background: '#eef4ec' }}>
        <ScrollToTop />
        <Suspense fallback={null}>
          <LoadingBar />
        </Suspense>
        <SmoothScroll>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
