'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ArticleCard from '@/components/common/ArticleCard';

const LatestArticles = ({ colors, articles, loading, onScroll }) => {
  const P = colors;
  return (
    <section style={{ background: P.white, borderTop: `1px solid ${P.borderSoft}`, padding: 'clamp(60px, 8vw, 100px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-16 gap-8">
          <div style={{ maxWidth: 650 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1.5, background: P.richPurple }} />
              <span style={{ fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, color: P.magenta }}>Recent Publications</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 900, color: P.deepPurple, lineHeight: 1.1, letterSpacing: '0.01em', margin: '0 0 16px 0' }}>Latest Research Articles</h2>
            <p style={{ fontSize: 'clamp(12px, 1.5vw, 14px)', color: P.textBody, lineHeight: 1.7, margin: 0, letterSpacing: '0.01em' }} className="opacity-80">Explore the most recent peer-reviewed studies published in Biospectra, covering breakthrough biological discoveries.</p>
          </div>
          <Link href="/archive" className="w-full sm:w-auto">
            <button 
              className="w-full group px-8 py-3 font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2"
              style={{
                border: `1.5px solid ${P.richPurple}`,
                color: P.richPurple,
                background: 'transparent',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = P.richPurple;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = P.richPurple;
              }}
            >
              Full Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        <div className="relative group/carousel -mx-6 px-6">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden xl:block">
            <button onClick={() => onScroll('left')} className="p-3.5 bg-white border border-slate-100 text-richPurple hover:bg-richPurple hover:text-white transition-all shadow-lg rounded-none"><ChevronLeft size={22} /></button>
          </div>

          <div id="article-scroll-container" className="flex items-stretch gap-5 sm:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 px-4">
            {loading ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="snap-start shrink-0 w-[290px] sm:w-[350px] lg:w-[380px] h-[450px] bg-slate-50 animate-pulse rounded-2xl border border-slate-100" />
              ))
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <div key={article.id} className="snap-start shrink-0 w-[290px] sm:w-[350px] lg:w-[380px]">
                  <ArticleCard article={article} />
                </div>
              ))
            ) : (
              <div className="w-full py-20 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200"><p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No recent publications found</p></div>
            )}
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden xl:block">
            <button onClick={() => onScroll('right')} className="p-3.5 bg-white border border-slate-100 text-richPurple hover:bg-richPurple hover:text-white transition-all shadow-lg rounded-none"><ChevronRight size={22} /></button>
          </div>
        </div>

        <div style={{ marginTop: 24, padding: '0 4px' }}>
          <motion.div whileHover={{ y: -4 }} style={{ background: P.lavenderMist, border: `1px solid ${P.borderSoft}`, padding: 'clamp(32px, 5vw, 48px)', display: 'flex', alignItems: 'center', gap: 'clamp(20px, 4vw, 40px)', width: '100%', maxWidth: 1000, margin: '0 auto' }} className="flex-col md:flex-row text-center md:text-left">
            <div style={{ border: `1.5px solid ${P.borderSoft}`, background: P.white, padding: 16, display: 'flex', borderRadius: '4px' }}><BookOpen size={24} color={P.richPurple} /></div>
            <div className="flex-1">
              <h4 className="heading-section text-black mb-1" style={{ fontSize: 'var(--font-md)' }}>Contribute to Science</h4>
              <p className="text-editorial text-sm opacity-90">We invite original research papers and review articles from scholars worldwide. Join our academic community today.</p>
            </div>
            <div className="w-full md:w-auto pt-6 md:pt-0">
              <Link href="/submit" className="w-full">
                <button style={{ width: '100%', background: `linear-gradient(135deg, ${P.deepPurple}, ${P.richPurple})`, color: '#fff', border: 'none', padding: '14px 36px', fontSize: 10.5, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.25s ease', boxShadow: '0 6px 20px rgba(25,103,75,0.2)' }}>Submit Paper</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
