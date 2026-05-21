import dynamic from 'next/dynamic';

import Hero from '@/components/home/Hero';

const GoverningBodies    = dynamic(() => import('@/components/home/GoverningBodies'));
const LatestArticles     = dynamic(() => import('@/components/home/LatestArticles'));
const EditorialHighlights = dynamic(() => import('@/components/home/EditorialHighlights'));
const Recognition        = dynamic(() => import('@/components/home/Recognition'));

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
    <main className="flex flex-col w-full min-h-screen bg-[#eef4ec] selection:bg-[#92B775]">
      <Hero />
      <GoverningBodies colors={P} assets={assets} />
      <LatestArticles colors={P} />
      <EditorialHighlights colors={P} assets={assets} />
      <Recognition colors={P} assets={assets} />
    </main>
  );
};

export default Home;

