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
      <div className={`absolute top-0 right-0 py-1 px-4 text-[7px] font-black uppercase tracking-[0.2em] rounded-bl-xl border-l border-b border-slate-100 ${issue.order === 2 ? 'bg-[#1e293b] text-white' : 'bg-slate-50 text-slate-400'}`}>
         {monthLabel} Release
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-500 ${issue.order === 2 ? 'bg-[#1e293b] text-white' : 'bg-slate-50 text-slate-900 group-hover:bg-[#1e293b] group-hover:text-white'}`}>
          {issue.order}
        </div>
        <div>
          <span className="text-[7px] font-black text-slate-300 uppercase tracking-[0.3em] mb-0.5 block">Issue Portfolio</span>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter" style={{ fontFamily: 'var(--font-crimson-pro), serif' }}>
            Vol. {volume}, Issue {issue.order}
          </h3>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-slate-500">
           <div className="w-1 h-1 rounded-full bg-slate-200" />
           <span className="text-[10px] font-bold">{monthLabel} {year} Edition</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
           <FileText size={12} className="text-slate-300" />
           <span className="text-[10px] font-black">{articleCount === null ? '—' : articleCount} Peer-Reviewed Papers</span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
           <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-900">Open Archive</span>
           <div className="w-6 h-px bg-slate-200 group-hover:w-10 group-hover:bg-slate-900 transition-all duration-500" />
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#1e293b] group-hover:text-white transition-all duration-500">
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
    deepGreen:  '#19674b',
    emerald:    '#3eb489',
    richPurple: '#9e9eff',
    violet:     '#19674b',
    mint:       '#f0fff4',
    textBody:   '#1e293b',
    textMuted:  '#64748b',
    border:     'rgba(25, 103, 75, 0.1)',
    glass:      'rgba(255, 255, 255, 0.7)',
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
    <div className="relative min-h-screen overflow-hidden" style={{ background: '#fdfbf7' }}>
      {/* Background Lines & Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Dynamic Watermark */}
        <div className="absolute top-[70%] left-[58%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full">
           <motion.h2 
             key={activeVolume}
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 0.03, scale: 1 }}
             className="text-[18vw] font-black text-slate-900 leading-none whitespace-nowrap"
             style={{ fontFamily: 'var(--font-crimson-pro), serif' }}
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
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full opacity-10 blur-[120px]" style={{ background: P.emerald }} />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full opacity-10 blur-[100px]" style={{ background: P.violet }} />
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full opacity-5 blur-[110px]" style={{ background: P.deepGreen }} />
      </div>

      <div className="relative z-10 pt-24 pb-12">
        <div className="w-full px-4 md:px-12 lg:px-24">
          <header className="max-w-4xl mb-12">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full flex flex-col items-start text-left">
              <div className="mb-2">
                <h1
                  className="text-3xl md:text-5xl font-black text-slate-900 mb-2"
                  style={{ fontFamily: 'var(--font-crimson-pro), serif' }}
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
                <div className="bg-white border border-slate-100 p-4 md:p-5 shadow-2xl shadow-slate-900/5 rounded-2xl md:rounded-[1.5rem] overflow-hidden relative">
                  <div className="flex flex-col mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter text-slate-900 mb-1" style={{ fontFamily: 'var(--font-crimson-pro), serif' }}>Archives Index</h3>
                  </div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
                    <input
                      type="text"
                      placeholder="Filter by year..."
                      value={yearQuery}
                      onChange={(e) => setYearQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50/70 border border-slate-100 focus:border-emerald-600/20 focus:bg-white rounded-lg text-[10px] font-bold transition-all outline-none"
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
                            <span className={`text-[11px] font-black ${isActive ? 'text-emerald-700' : 'text-slate-600 group-hover:text-emerald-600'}`}>
                              Vol. {vol.toString().padStart(2, '0')}
                            </span>
                            <span className={`ml-2 text-[10px] font-bold ${isActive ? 'text-emerald-700/40' : 'text-slate-400 group-hover:text-slate-500'}`}>
                              ({year})
                            </span>
                            {isActive && (
                              <motion.div layoutId="activeYear" className="absolute bottom-0 left-2 right-2 h-1 bg-emerald-600 rounded-full md:hidden" />
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
                      <div className="w-3 h-px bg-slate-900" />
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Current Selection</span>
                   </div>
                   <h2 className="text-2xl md:text-3xl font-black text-slate-900" style={{ fontFamily: 'var(--font-crimson-pro), serif' }}>
                     Volume {activeVolume} <span className="text-slate-200 ml-1 font-light">/{activeYear}</span>
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
