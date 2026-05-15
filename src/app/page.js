'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getLatestArticles } from '@/services/api';

// ── Hero loads immediately with a dark skeleton so no white flash ─────────────
import Hero from '@/components/home/Hero';

// ── Below-fold sections are lazy — not visible on first paint anyway ──────────
const GoverningBodies    = dynamic(() => import('@/components/home/GoverningBodies'));
const LatestArticles     = dynamic(() => import('@/components/home/LatestArticles'));
const EditorialHighlights = dynamic(() => import('@/components/home/EditorialHighlights'));
const Recognition        = dynamic(() => import('@/components/home/Recognition'));

// ── Palette ───────────────────────────────────────────────────────────────────
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

// ── Shared Assets ─────────────────────────────────────────────────────────────
const assets = {
  biospectraCover: '/assets/content/biospectra.jpg',
  awardImg:        '/assets/content/award2.jpg',
  certificateImg:  '/assets/content/certificate_of_indexing.jpg',
  msetLogo:        '/assets/logo/mset-logo-png-removebg-preview.png',
  iccbLogo:        '/assets/logo/iccb-logo-removebg-preview.png',
};

const Home = () => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getLatestArticles(6);
        const transformed = data.map(art => ({
          id: art._id,
          title: art.title,
          authors: art.authors.includes(',') ? art.authors.split(',').map(a => a.trim()) : [art.authors],
          abstract: art.abstract || 'No abstract available.',
          category: art.category?.title || 'Research',
          date: art.createdAt,
          volume: art.category?.issue?.year?.year ? art.category.issue.year.year - 2005 : '?',
          issue: art.category?.issue?.order || '?'
        }));
        setLatestArticles(transformed);
      } catch (error) {
        console.error('Error fetching latest articles:', error);
      } finally {
        setLoadingArticles(false);
      }
    };
    fetchArticles();
  }, []);

  const handleScroll = (direction) => {
    const container = document.getElementById('article-scroll-container');
    if (container) {
      const amount = window.innerWidth < 768 ? 320 : 380;
      container.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#eef4ec] selection:bg-[#92B775]">
      {/* Hero renders immediately — dark background so no white flash */}
      <Hero />

      {/* Below-fold: lazy loaded, won't block first paint */}
      <GoverningBodies colors={P} assets={assets} />
      <LatestArticles
        colors={P}
        articles={latestArticles}
        loading={loadingArticles}
        onScroll={handleScroll}
      />
      <EditorialHighlights colors={P} assets={assets} />
      <Recognition colors={P} assets={assets} />
    </main>
  );
};

export default Home;

