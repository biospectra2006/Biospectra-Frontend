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
      className="group relative bg-white border border-slate-100 shadow-md shadow-slate-900/5 rounded-xl p-5 transition-all duration-200 overflow-hidden flex flex-col active:scale-[0.98] touch-manipulation"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
        <Book size={80} className="text-emerald-600 rotate-12" />
      </div>
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1.5">Regular Issue</span>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-black group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              {issue.order}
            </div>
            <h3 className="text-base md:text-lg font-black text-slate-900" style={{ fontFamily: 'var(--font-crimson-pro), serif' }}>
              {monthLabel} Issue
            </h3>
          </div>
        </div>
        <div className="bg-slate-50 text-slate-400 p-1.5 rounded-md group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
          <Book size={14} />
        </div>
      </div>
      <div className="mb-4 relative z-10">
        <p className="text-slate-500 text-xs font-medium mb-3 leading-relaxed line-clamp-2">
          {articleCount === null
            ? 'Loading article count…'
            : `This issue contains ${articleCount} peer-reviewed scientific papers covering various fields of biological research.`}
        </p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-slate-600 font-black text-[9px] uppercase tracking-widest">
            <FileText size={10} className="text-emerald-900" />
            <span>{articleCount === null ? '—' : articleCount} Papers</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-600 font-black text-[9px] uppercase tracking-widest">
            <Calendar size={10} className="text-emerald-900" />
            <span>{monthLabel} {year}</span>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 group-hover:text-emerald-700 transition-colors">
          View Contents
        </span>
        <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all group-hover:translate-x-1">
          <ChevronRight size={12} />
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
    <div className="relative min-h-screen overflow-hidden" style={{ background: '#f8fafc' }}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full opacity-10 blur-[120px]" style={{ background: P.emerald }} />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full opacity-10 blur-[100px]" style={{ background: P.violet }} />
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full opacity-5 blur-[110px]" style={{ background: P.deepGreen }} />
      </div>

      <div className="relative z-10 pt-24 pb-12">
        <div className="w-full px-6 md:px-12 lg:px-24">
          <header className="max-w-2xl mx-auto mb-12">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full flex flex-col items-center text-center">
              <h1
                className="text-3xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent mb-4"
                style={{ fontFamily: 'var(--font-crimson-pro), serif', backgroundImage: `linear-gradient(135deg, ${P.deepGreen}, ${P.richPurple})` }}
              >
                Journal Issues
              </h1>
              <p className="text-sm md:text-base text-textBody leading-relaxed opacity-70 font-medium">
                A legacy of scientific excellence. Browse our complete collection of peer-reviewed biological research, spanning over three decades of discovery.
              </p>
            </motion.div>
          </header>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
            {/* Sidebar — year picker */}
            <aside className="lg:w-1/3 xl:w-1/4 shrink-0">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="sticky top-20">
                <div className="bg-white/80 backdrop-blur-xl border border-white p-4 shadow-xl shadow-slate-900/5 rounded-2xl overflow-hidden relative group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-900 to-violet-400 opacity-30" />
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-900"><Calendar size={18} /></div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-emerald-900">Volumes</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-full">{years.length} Yrs</span>
                      <Link href="/archive/index">
                        <button className="flex items-center gap-1.5 px-3 py-1 bg-emerald-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-sm active:scale-95">
                          More <ChevronRight size={10} />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      placeholder="Filter by year..."
                      value={yearQuery}
                      onChange={(e) => setYearQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 focus:border-emerald-900/20 focus:bg-white focus:ring-4 focus:ring-emerald-900/5 rounded-xl text-xs font-bold transition-all outline-none"
                    />
                  </div>
                  <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[350px] pr-2 pb-2 lg:pb-0 custom-scrollbar" style={{ scrollbarWidth: 'thin' }} data-lenis-prevent>
                    {filteredYears.length > 0 ? (
                      filteredYears.map((year) => {
                        const vol = year - 2005;
                        const isActive = activeYear === year;
                        return (
                          <button
                            key={year}
                            onClick={() => handleYearChange(year)}
                            className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-left whitespace-nowrap touch-manipulation ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'hover:bg-emerald-50 text-slate-600 hover:text-emerald-700'}`}
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                          >
                            <div className="flex items-center space-x-3">
                              <span className={`text-[10px] font-black tracking-tighter ${isActive ? 'text-white/80' : 'text-slate-400 group-hover:text-emerald-700/60'}`}>
                                VOL.{vol.toString().padStart(2, '0')}
                              </span>
                              <span className="text-xs font-black tracking-wider uppercase">{year}</span>
                            </div>
                            {isActive && <ChevronRight size={14} className="opacity-80" />}
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
            <main className="lg:w-2/3 xl:w-3/4 flex-grow">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="flex flex-col md:flex-row gap-3 mb-6 items-stretch md:items-center">
                <div className="relative flex-grow group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors"><Search size={16} /></div>
                  <input
                    type="text"
                    placeholder={`Search in Vol. ${activeVolume} (${activeYear})...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-md border border-white shadow-md shadow-slate-900/5 rounded-xl focus:ring-4 focus:ring-emerald-900/5 transition-all outline-none text-xs font-bold placeholder:text-slate-400 text-slate-700"
                  />
                </div>
                <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-md border border-white px-4 py-3 rounded-xl shadow-md shadow-slate-900/5">
                  <div className="p-1.5 rounded-lg bg-emerald-900 text-white"><Layers size={14} /></div>
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-500 leading-none mb-1">Active Volume</h4>
                    <p className="text-xs font-black text-emerald-900 leading-none">Vol. {activeVolume} ({activeYear})</p>
                  </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
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
