'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ArticleCard from '@/components/common/ArticleCard';

const LatestArticles = ({ colors, articles, loading, onScroll }) => {
  const P = colors;
  return (
    <section style={{ background: '#fcf8f3', borderTop: `1px solid ${P.borderSoft}`, padding: 'clamp(40px, 5vw, 60px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div style={{ maxWidth: 650 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 24, height: 1.5, background: '#19674b' }} />
              <span style={{ fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, color: '#3eb489' }}>Recent Publications</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 900, color: '#064e3b', lineHeight: 1.1, letterSpacing: '0.01em', margin: '0 0 12px 0' }}>Latest Research Articles</h2>
            <p style={{ fontSize: '14px', color: '#064e3b', lineHeight: 1.6, margin: 0, opacity: 0.7 }} className="max-w-[500px]">Explore the most recent peer-reviewed studies published in Biospectra, covering breakthrough biological discoveries.</p>
          </div>
          <Link href="/archive" className="w-full sm:w-auto">
            <button 
              className="w-full group px-6 py-2.5 font-bold uppercase tracking-widest text-[9px] transition-all flex items-center justify-center gap-2"
              style={{
                border: `1.5px solid rgba(6, 78, 59, 0.15)`,
                color: '#064e3b',
                background: 'transparent',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Full Archive <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform opacity-50" />
            </button>
          </Link>
        </div>

        <div className="relative group/carousel -mx-6 px-6">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden xl:block">
            <button onClick={() => onScroll('left')} className="p-3 bg-white border border-emerald-900/10 text-emerald-900 hover:bg-emerald-900 hover:text-white transition-all shadow-lg rounded-full"><ChevronLeft size={20} /></button>
          </div>

          <div id="article-scroll-container" className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-4">
            {loading ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[340px] h-[400px] bg-white animate-pulse rounded-xl border border-emerald-900/5" />
              ))
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <div key={article.id} className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[340px]">
                  <ArticleCard article={article} />
                </div>
              ))
            ) : (
              <div className="w-full py-20 text-center bg-white/50 rounded-xl border border-dashed border-emerald-900/10"><p className="text-emerald-900/30 font-bold uppercase tracking-widest text-[10px]">No recent publications found</p></div>
            )}
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden xl:block">
            <button onClick={() => onScroll('right')} className="p-3 bg-white border border-emerald-900/10 text-emerald-900 hover:bg-emerald-900 hover:text-white transition-all shadow-lg rounded-full"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div style={{ marginTop: 24, padding: '0 4px' }}>
          <motion.div whileHover={{ y: -4 }} style={{ background: '#ffffff', border: `1px solid rgba(6,78,59,0.08)`, padding: 'clamp(24px, 4vw, 32px)', display: 'flex', alignItems: 'center', gap: 'clamp(20px, 4vw, 40px)', width: '100%', maxWidth: 1000, margin: '0 auto', borderRadius: '8px' }} className="flex-col md:flex-row text-center md:text-left">
            <div style={{ border: `1.5px solid rgba(6,78,59,0.05)`, background: '#fcf8f3', padding: 14, display: 'flex', borderRadius: '50%' }}><BookOpen size={22} color="#19674b" /></div>
            <div className="flex-1">
              <h4 className="heading-section text-[#064e3b] mb-1" style={{ fontSize: '18px', fontWeight: 800 }}>Contribute to Science</h4>
              <p className="text-emerald-900/60 text-sm">We invite original research papers and review articles from scholars worldwide. Join our academic community today.</p>
            </div>
            <div className="w-full md:w-auto pt-6 md:pt-0">
              <Link href="/submit" className="w-full">
                <button style={{ width: '100%', background: '#064e3b', color: '#fff', border: 'none', padding: '12px 32px', fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.25s ease', borderRadius: '4px' }}>Submit Paper</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
