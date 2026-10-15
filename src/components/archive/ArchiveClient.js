'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, ChevronRight, FileText, Search, Library, Filter, Calendar, Layers, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getYears, getIssuesByYear, getIssueData } from '@/services/api';

// Lightweight issue card — no heavy animation blocking navigation
const IssueCard = ({ issue, volume, year }) => {
  const [articleCount, setArticleCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getIssueData(year, issue.order)
      .then(data => {
        if (cancelled) return;
        const count = (data.categories || []).reduce(
          (acc, cat) => acc + (cat.articles || []).length, 0
        );
        setArticleCount(count);
      })
      .catch(() => { if (!cancelled) setArticleCount(0); });
    return () => { cancelled = true; };
  }, [year, issue.order]);

  const monthLabel = issue.order === 1 ? 'March' : 'September';
  const href = `/issue/${volume}/${issue.order}`;

  return (
    <Link
      href={href}
      prefetch={true}
      className="group relative bg-white border border-slate-100 shadow-xl shadow-slate-900/5 rounded-[1.25rem] p-5 transition-all duration-300 flex flex-col hover:-translate-y-1"
    >
      <div className={`absolute top-0 right-0 py-1.5 px-4 text-[7px] font-black uppercase tracking-[0.2em] rounded-bl-xl border-l border-b border-[#92B775]/10 ${issue.order === 2 ? 'bg-[#133215] text-[#92B775]' : 'bg-[#eef4ec] text-[#133215]/40'}`}>
         {monthLabel} Release
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-500 ${issue.order === 2 ? 'bg-[#133215] text-white' : 'bg-[#eef4ec] text-[#133215] group-hover:bg-[#133215] group-hover:text-white'}`}>
          {issue.order}
        </div>
        <div>
          <span className="text-[7px] font-black text-[#92B775] uppercase tracking-[0.3em] mb-1 block">Issue Portfolio</span>
          <h3 className="text-base font-black text-[#133215] uppercase tracking-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            {issue.title || `Vol. ${volume}, Issue ${issue.order}`}
          </h3>
        </div>
      </div>

      <div className="space-y-2.5 mb-8">
        <div className="flex items-center gap-2 text-[#133215]/60">
           <div className="w-1 h-1 rounded-full bg-[#92B775]" />
           <span className="text-[10px] font-bold">{monthLabel} {year} Edition</span>
        </div>
        <div className="flex items-center gap-2 text-[#133215]/70">
           <FileText size={12} className="text-[#92B775]/50" />
           <span className="text-[10px] font-black">{articleCount === null ? '—' : articleCount} Peer-Reviewed Papers</span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
           <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#133215]">Open Archive</span>
           <div className="w-8 h-px bg-[#92B775]/20 group-hover:w-12 group-hover:bg-[#133215] transition-all duration-500" />
        </div>
        <div className="w-10 h-10 rounded-full bg-[#eef4ec] flex items-center justify-center text-[#133215]/40 group-hover:bg-[#133215] group-hover:text-white transition-all duration-500">
          <ChevronRight size={14} />
        </div>
      </div>
    </Link>
  );
};

const ArchiveClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlYear = searchParams.get('year');

  const [years, setYears] = useState([]);
  const [issues, setIssues] = useState([]);          // issues for active year
  const [issuesLoading, setIssuesLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState(null);
  const [activeYearId, setActiveYearId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [yearQuery, setYearQuery] = useState('');

  // Step 1: load only the year list (fast — tiny payload)
  useEffect(() => {
    getYears()
      .then(data => {
        setYears(data);
        const initialYear = urlYear
          ? data.find(y => y.year === parseInt(urlYear))
          : data[0];
        if (initialYear) {
          setActiveYear(initialYear.year);
          setActiveYearId(initialYear._id);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [urlYear]);

  // Step 2: load issues whenever active year changes
  useEffect(() => {
    if (!activeYearId) return;
    setIssuesLoading(true);
    setIssues([]);
    getIssuesByYear(activeYearId)
      .then(setIssues)
      .catch(console.error)
      .finally(() => setIssuesLoading(false));
  }, [activeYearId]);

  const handleYearChange = useCallback((year) => {
    const yearDoc = years.find(y => y.year === year);
    if (!yearDoc) return;
    setActiveYear(year);
    setActiveYearId(yearDoc._id);
    setSearchQuery('');
    router.push(`/archive?year=${year}`, { scroll: false });
  }, [years, router]);

  const P = {
    darkGreen:  '#133215',    // Primary Brand Green
    limeGreen:  '#92B775',    // Accent Green
    softGreen:  '#eef4ec',    // Background Green
    textBody:   '#1e293b',
    textMuted:  'rgba(19, 50, 21, 0.6)',
    border:     'rgba(19, 50, 21, 0.1)',
  };

  const activeVolume = activeYear ? activeYear - 2005 : null;

  const filteredYears = useMemo(() => {
    const all = years.map(y => y.year);
    if (!yearQuery) return all;
    return all.filter(y => y.toString().includes(yearQuery));
  }, [yearQuery, years]);

  const filteredIssues = useMemo(() => {
    if (!searchQuery) return issues;
    const lq = searchQuery.toLowerCase();
    return issues.filter(i => {
      const month = i.order === 1 ? 'march' : 'september';
      return month.includes(lq) || i.order.toString().includes(lq);
    });
  }, [searchQuery, issues]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
        <div className="relative">
          <Loader2 className="animate-spin text-emerald-900" size={48} />
          <div className="absolute inset-0 blur-xl bg-emerald-400/20 rounded-full animate-pulse" />
        </div>
        <p className="mt-6 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Accessing Repository Archives</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: '#eef4ec' }}>
      {/* Background Lines & Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Dynamic Watermark */}
        <div className="absolute top-[70%] left-[58%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full">
           <motion.h2 
             key={activeVolume}
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 0.03, scale: 1 }}
             className="text-[18vw] font-black text-slate-900 leading-none whitespace-nowrap"
             style={{ fontFamily: 'var(--font-playfair), serif' }}
           >
             VOL.{activeVolume}
           </motion.h2>
        </div>

        {/* Dynamic Lines (Subtle Grid) */}
        <div className="absolute inset-0 flex justify-between px-[5%] opacity-[0.03]">
           {[...Array(12)].map((_, i) => (
             <div key={i} className="w-px h-full bg-slate-900" />
           ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full opacity-5 blur-[120px]" style={{ background: P.limeGreen }} />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full opacity-5 blur-[100px]" style={{ background: P.darkGreen }} />
      </div>

      <div className="relative z-10 pt-24 pb-12">
        <div className="w-full px-4 md:px-12 lg:px-24">
          <header className="max-w-4xl mb-12">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full flex flex-col items-start text-left">
              <div className="mb-2">
                <h1
                  className="text-4xl md:text-6xl font-black text-[#133215] mb-2"
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  Journal Archive
                </h1>
              </div>
            </motion.div>
          </header>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
            {/* Sidebar — year picker */}
            <aside className="w-full lg:w-1/4 xl:w-1/5 shrink-0">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:sticky lg:top-24 w-full">
                <div className="bg-white/80 backdrop-blur-md border border-[#92B775]/10 p-4 md:p-6 shadow-2xl shadow-[#133215]/[0.02] rounded-2xl md:rounded-[1.5rem] overflow-hidden relative">
                  <div className="flex flex-col mb-4 md:mb-6">
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[#133215] mb-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>Archives Index</h3>
                  </div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                    <input
                      type="text"
                      placeholder="Filter by year..."
                      value={yearQuery}
                      onChange={(e) => setYearQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#eef4ec]/50 border border-[#92B775]/10 focus:border-[#133215]/20 focus:bg-white rounded-xl text-[10px] font-bold transition-all outline-none text-[#133215]"
                    />
                  </div>
                  <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-y-auto lg:max-h-[320px] pr-1 custom-scrollbar" data-lenis-prevent>
                    {filteredYears.length > 0 ? (
                      filteredYears.map((year) => {
                        const vol = year - 2005;
                        const isActive = activeYear === year;
                        return (
                          <button
                            key={year}
                            onClick={() => handleYearChange(year)}
                            className={`group relative flex items-center px-2 py-2 md:py-1.5 rounded-lg transition-all duration-200 text-left whitespace-nowrap`}
                          >
                            <span className={`text-[11px] font-black ${isActive ? 'text-[#133215]' : 'text-slate-500 group-hover:text-[#133215]'}`}>
                              Vol. {vol.toString().padStart(2, '0')}
                            </span>
                            <span className={`ml-2 text-[10px] font-bold ${isActive ? 'text-[#133215]/40' : 'text-slate-300 group-hover:text-slate-400'}`}>
                              ({year})
                            </span>
                            {isActive && (
                              <motion.div layoutId="activeYear" className="absolute bottom-0 left-2 right-2 h-1 bg-[#92B775] rounded-full md:hidden" />
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="text-center py-10 opacity-40 italic text-xs font-bold">No results found.</div>
                    )}
                  </div>
                </div>
              </motion.div>
            </aside>

            {/* Main — issue cards */}
            <main className="w-full lg:w-3/4 xl:w-4/5 flex-grow">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="flex flex-col md:flex-row gap-6 mb-6 items-stretch md:items-end justify-between">
                <div>
                   <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-[1.5px] bg-[#92B775]" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#133215]/40">Current Selection</span>
                   </div>
                   <h2 className="text-2xl md:text-3xl font-black text-[#133215]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                     Volume {activeVolume} <span className="text-[#133215]/20 ml-2 font-light">({activeYear})</span>
                   </h2>
                </div>
              </motion.div>

              {/* Issue cards — no AnimatePresence exit to avoid blocking mobile taps */}
              {issuesLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="animate-spin text-emerald-900" size={32} />
                </div>
              ) : (
                <motion.div
                  key={activeYear + searchQuery}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredIssues.length > 0 ? (
                      filteredIssues.map((issue) => (
                        <IssueCard
                          key={issue._id}
                          issue={issue}
                          volume={activeVolume}
                          year={activeYear}
                        />
                      ))
                    ) : (
                      <div className="col-span-full py-16 px-6 text-center bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-md shadow-slate-900/5">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"><Filter size={24} /></div>
                        <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">No Matching Issues</h3>
                        <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">
                          We couldn&apos;t find any issues matching &quot;{searchQuery}&quot; in this volume.
                        </p>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="mt-6 px-5 py-2 bg-emerald-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/20"
                        >
                          Clear Search
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(5, 150, 105, 0.2); border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(5, 150, 105, 0.4); }
      `}</style>
    </div>
  );
};

export default ArchiveClient;
