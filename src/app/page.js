'use client';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { getLatestArticles } from '@/services/api';

// ── Optimized Lazy-Loaded Components ──────────────────────────────────────────
// We use dynamic imports for all major sections to ensure the initial JS bundle 
// is as small as possible, significantly improving the 'Time to Interactive'.
const Hero = dynamic(() => import('@/components/home/Hero'), { 
  loading: () => <div className="h-screen w-full bg-[#0a001a] animate-pulse" />
});

const GoverningBodies = dynamic(() => import('@/components/home/GoverningBodies'));
const LatestArticles = dynamic(() => import('@/components/home/LatestArticles'));
const EditorialHighlights = dynamic(() => import('@/components/home/EditorialHighlights'));
const Recognition = dynamic(() => import('@/components/home/Recognition'));

// ── Palette (Centralized Theme) ──────────────────────────────────────────────
const P = {
  deepPurple:   '#064e3b', // Switching Deep Purple to Deep Emerald for headers
  richPurple:   '#19674b', // Emerald
  vivid:        '#9e9eff', // Lavender
  magenta:      '#3eb489', // Mint
  white:        '#ffffff',
  neutral:      '#fdfcff',
  offWhite:     '#fdfcff',
  lavenderMist: '#e6e6fa',
  lavenderSoft: '#e0e0ff',
  borderSoft:   'rgba(25,103,75,0.1)',
  textBody:     '#1e293b',
  textMuted:    '#64748b',
};

// ── Shared Assets ────────────────────────────────────────────────────────────
const assets = {
  biospectraCover: '/assets/biospectra.jpg',
  awardImg:        '/assets/award2.jpg',
  certificateImg:  '/assets/cerificate of indexing.jpg',
  msetLogo:        '/assets/mset-logo-png-removebg-preview.png',
  iccbLogo:        '/assets/iccb-logo-removebg-preview.png',
};

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [latestArticles, setLatestArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    setMounted(true);
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
      container.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white selection:bg-emerald-100">
      <AnimatePresence mode="wait">
        {mounted && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            
            <GoverningBodies colors={P} assets={assets} />
            
            <LatestArticles 
              colors={P} 
              articles={latestArticles} 
              loading={loadingArticles} 
              onScroll={handleScroll}
            />
            
            <EditorialHighlights colors={P} assets={assets} />
            
            <Recognition colors={P} assets={assets} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
