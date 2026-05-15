'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, Loader2, Search } from 'lucide-react';
import { getIssueData } from '@/services/api';

const IssueClient = ({ params }) => {
  const unwrappedParams = React.use(params);
  const volume = parseInt(unwrappedParams.volume);
  const issue = parseInt(unwrappedParams.issue);

  // volume = year - 2005 => year = volume + 2005
  const targetYear = volume + 2005;

  const [localSearch, setLocalSearch] = React.useState('');
  const [currentIssueData, setCurrentIssueData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const data = await getIssueData(targetYear, issue);
        if (!cancelled) setCurrentIssueData(data);
      } catch (error) {
        console.error('Error fetching issue data:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [targetYear, issue]);

  const P = {
    deepPurple: '#064e3b',    // Emerald
    richPurple: '#19674b',
    magenta:    '#3eb489',    // Mint
    textBody:   '#1e293b',
    textMuted:  '#64748b',
    lavenderMist: '#f0fff4',
    border:     'rgba(25, 103, 75, 0.1)',
  };


  const filteredCategories = useMemo(() => {
    if (!currentIssueData) return [];
    return currentIssueData.categories.map(cat => ({
      ...cat,
      articles: (cat.articles || [])
        .filter(art => {
          if (!localSearch) return true;
          const titleMatch = art.title.toLowerCase().includes(localSearch.toLowerCase());
          const authorsStr = Array.isArray(art.authors) ? art.authors.join(', ') : (art.authors || '');
          const authorMatch = authorsStr.toLowerCase().includes(localSearch.toLowerCase());
          return titleMatch || authorMatch;
        })
        .sort((a, b) => {
          const pageA = parseInt((a.pages || '').split('-')[0]) || 0;
          const pageB = parseInt((b.pages || '').split('-')[0]) || 0;
          return pageA - pageB;
        })
    })).filter(cat => cat.articles.length > 0);
  }, [currentIssueData, localSearch]);

  const hasArticles = filteredCategories.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
        <div className="relative">
          <Loader2 className="animate-spin text-accent-green" size={48} />
          <div className="absolute inset-0 blur-xl bg-purple-400/20 rounded-full animate-pulse" />
        </div>
        <p className="mt-6 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Accessing Repository</p>
      </div>
    );
  }

  return (
    <div 
      className="pt-20 pb-24 min-h-screen relative overflow-hidden"
      style={{ 
        background: '#F9FBF7',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="w-full">
            {/* Navigation Back */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <Link href={`/archive?year=${targetYear}`}>
                <button 
                  style={{ color: P.textMuted, border: `1px solid ${P.border}`, background: 'white' }}
                  className="flex items-center gap-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] hover:text-white hover:bg-accent-green transition-all duration-300 rounded-sm shadow-sm w-fit"
                >
                  <ArrowLeft size={12} /> Back to Archive
                </button>
              </Link>
            </div>

            {/* Header and Search Container */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              {/* TOC Header */}
              <header className="text-left border-l-4 border-accent-green pl-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-start"
                >
                  <span 
                    style={{ color: P.magenta }}
                    className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 opacity-60"
                  >
                    Scholarly Repository
                  </span>
                  <h1 
                    style={{ fontFamily: 'var(--font-playfair), serif', color: P.deepPurple }}
                    className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-none"
                  >
                    Biospectra
                  </h1>
                  <div 
                    className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] opacity-80"
                    style={{ color: P.textBody }}
                  >
                    <span>Volume {volume}</span>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: P.magenta }} />
                    <span>Issue {issue}</span>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: P.magenta }} />
                    <span className="text-magenta">{targetYear}</span>
                  </div>
                </motion.div>
              </header>

              {/* Prominent Search Bar */}
              <div className="w-full lg:w-96 shrink-0">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text"
                    placeholder="Search articles by title, author..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-purple-100 shadow-sm rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Contents List */}
            <main className="max-w-4xl mx-auto">
              {hasArticles ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12"
                >
                  {(() => {
                    let globalArticleIndex = 1;
                    return filteredCategories.map((category) => (
                      <section key={category._id} id={category.title.replace(/\s+/g, '-').toLowerCase()}>
                        <div className="bg-emerald-900 px-3 py-1 mb-6">
                          <h2 
                            style={{ fontFamily: 'var(--font-playfair), serif', color: '#ffffff' }}
                            className="text-lg font-bold uppercase tracking-wider"
                          >
                            {category.title}
                          </h2>
                        </div>
                        
                        <div className="space-y-5 px-1">
                          {category.articles.map((article) => {
                            const currentIndex = globalArticleIndex++;
                            return (
                              <article key={article._id} className="group">
                                <Link href={`/article/${article._id}`} className="block hover:bg-slate-50 transition-colors -mx-2 px-2 py-1 rounded">
                                  <div className="flex items-start justify-between gap-4">
                                    
                                    <div className="flex items-start gap-3 flex-grow">
                                      <span 
                                        className="text-base font-bold text-slate-800 shrink-0 min-w-[24px]"
                                        style={{ fontFamily: 'var(--font-playfair), serif' }}
                                      >
                                        {currentIndex}.
                                      </span>
                                      <div>
                                        <h3 
                                          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                          className="text-base font-semibold text-slate-900 leading-snug group-hover:underline decoration-slate-400 underline-offset-2"
                                          dangerouslySetInnerHTML={{ __html: article.title }}
                                        />
                                        <p 
                                          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                                          className="text-[13px] font-medium italic text-slate-500 mt-1"
                                        >
                                          {article.authors}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Pages */}
                                    <div className="shrink-0 text-right mt-1">
                                      <span 
                                        style={{ fontFamily: 'var(--font-playfair), serif' }}
                                        className="text-sm text-slate-600"
                                      >
                                        {article.pages || ''}
                                      </span>
                                    </div>

                                  </div>
                                </Link>
                              </article>
                            );
                          })}
                        </div>
                      </section>
                    ));
                  })()}
                </motion.div>
              ) : (
                <div className="text-center py-24 bg-white/50 backdrop-blur-sm border-2 border-dashed border-purple-100 rounded-xl">
                  <BookOpen size={48} style={{ color: P.border }} className="mx-auto mb-6 opacity-30" />
                  <h2 style={{ fontFamily: 'var(--font-playfair), serif', color: P.deepPurple }} className="text-2xl font-bold mb-3">No Articles Found</h2>
                  <p style={{ color: P.textMuted }} className="text-sm max-w-sm mx-auto opacity-70">
                    {localSearch ? "Try searching for a different keyword or author." : `The articles for Volume ${volume}, Issue ${issue} are currently available in physical format.`}
                  </p>
                </div>
              )}
            </main>
        </div>

        {/* Branding Footer */}
        <div 
          style={{ borderTop: `1px solid ${P.border}` }}
          className="mt-24 pt-10 text-center"
        >
          <p style={{ color: P.textMuted }} className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
            Madhawi Shyam Educational Trust
          </p>
          <p style={{ color: P.textMuted }} className="text-[10px] uppercase opacity-60">
            Biospectra Journal • ISSN: 0973-7057
          </p>
        </div>
      </div>
    </div>
  );
};

export default IssueClient;
