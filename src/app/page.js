import dynamic from 'next/dynamic';

import Hero from '@/components/home/Hero';

const SectionSkeleton = ({ height = 'min-h-[400px]' }) => (
  <div className={`w-full ${height} bg-[#eef4ec] animate-pulse flex flex-col justify-center items-center py-24 px-6`}>
    <div className="w-64 h-10 bg-[#92B775]/20 rounded-md mb-12"></div>
    <div className="w-full max-w-6xl h-64 bg-[#133215]/5 rounded-xl"></div>
  </div>
);

const GoverningBodies    = dynamic(() => import('@/components/home/GoverningBodies'), { loading: () => <SectionSkeleton height="min-h-[500px]" /> });
const LatestArticles     = dynamic(() => import('@/components/home/LatestArticles'), { loading: () => <SectionSkeleton height="min-h-[800px]" /> });
const EditorialHighlights = dynamic(() => import('@/components/home/EditorialHighlights'), { loading: () => <SectionSkeleton height="min-h-[600px]" /> });
const Recognition        = dynamic(() => import('@/components/home/Recognition'), { loading: () => <SectionSkeleton height="min-h-[400px]" /> });

const P = {
  deepPurple:   '#133215',
  richPurple:   '#133215',
  vivid:        '#92B775',
  magenta:      '#92B775',
  white:        '#ffffff',
  neutral:      '#eef4ec',
  offWhite:     '#F3E8D3',
  lavenderMist: '#e6e6fa',
  lavenderSoft: '#e0e0ff',
  borderSoft:   'rgba(19,50,21,0.1)',
  textBody:     '#133215',
  textMuted:    '#92B775',
};

const assets = {
  biospectraCover: '/assets/content/biospectra.jpg',
  awardImg:        '/assets/content/award2.jpg',
  certificateImg:  '/assets/content/certificate_of_indexing.jpg',
  msetLogo:        '/assets/logo/mset-logo-png-removebg-preview.png',
  iccbLogo:        '/assets/logo/iccb-logo-removebg-preview.png',
};

const Home = () => {
  return (
    <main className="flex flex-col w-full min-h-screen bg-[#eef4ec]">
      <Hero />
      <GoverningBodies colors={P} assets={assets} />
      <LatestArticles colors={P} />
      <EditorialHighlights colors={P} assets={assets} />
      <Recognition colors={P} assets={assets} />
    </main>
  );
};

export default Home;

