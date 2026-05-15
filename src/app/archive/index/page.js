'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, ChevronRight, FileText, ArrowLeft, Loader2, Library, BookOpen, Search } from 'lucide-react';
import Link from 'next/link';
import { getJournalTree } from '@/services/api';

const ArchiveIndex = () => {
  const [journalData, setJournalData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tree = await getJournalTree();
        setJournalData(tree);
      } catch (error) {
        console.error('Error fetching archive data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = journalData.map(volume => {
    const filteredIssues = volume.issues.map(issue => {
      const filteredCategories = issue.categories.map(cat => ({
        ...cat,
        articles: (cat.articles || []).filter(art => 
          art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          art.authors.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.articles.length > 0);

      return { ...issue, categories: filteredCategories };
    }).filter(issue => issue.categories.length > 0);

    return { ...volume, issues: filteredIssues };
  }).filter(volume => volume.issues.length > 0);

  const P = {
    deepGreen:  '#064e3b',
    emerald:    '#059669',
    richPurple: '#6d28d9',
    violet:     '#7c3aed',
    textBody:   '#1e293b',
    textMuted:  '#64748b',
    border:     'rgba(5, 150, 105, 0.1)',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
        <div className="relative">
          <Loader2 className="animate-spin text-emerald-600" size={48} />
          <div className="absolute inset-0 blur-xl bg-emerald-400/20 rounded-full animate-pulse" />
        </div>
        <p className="mt-6 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Filtering Repository</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Ultra-Compact Header */}
        <div className="bg-white rounded-xl border border-slate-200 px-5 py-3 shadow-sm mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/archive">
                <button className="p-2 bg-slate-50 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
                  <ArrowLeft size={16} />
                </button>
              </Link>
              <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                <Library className="text-emerald-600" size={20} />
                Master Index
              </h1>
            </div>

            <div className="relative group flex-grow max-w-xs">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600">
                <Search size={14} />
              </div>
              <input 
                type="text" 
                placeholder="Search index..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-500/20 transition-all outline-none text-[10px] font-bold"
              />
            </div>
          </div>
        </div>

        {/* Ultra-Compact Grid Index */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((volume) => (
              <div key={volume.year} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                {/* Volume Header - Slim */}
                <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded">V.{volume.year - 2005}</span>
                    <h2 className="text-sm font-black text-slate-800" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                      {volume.year}
                    </h2>
                  </div>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{volume.issues.length} ISSUES</span>
                </div>

                {/* Issues Content - High Density */}
                <div className="p-4 flex-grow space-y-5">
                  {volume.issues.map((issue) => (
                    <div key={issue._id} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tight">
                          {issue.order === 1 ? 'Mar' : 'Sep'} Issue
                        </span>
                        <Link href={`/issue/${volume.year - 2005}/${issue.order}`}>
                          <button className="text-[7px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors">
                            Full TOC →
                          </button>
                        </Link>
                      </div>

                      <div className="space-y-1.5 border-l border-slate-100 pl-3">
                        {issue.categories.map((cat) => (
                          <div key={cat._id} className="space-y-1">
                            {cat.articles.slice(0, 3).map((art) => (
                              <Link 
                                href={`/article/${art._id}`} 
                                key={art._id}
                                className="block group/art"
                              >
                                <p 
                                  className="text-[10px] font-bold text-slate-600 group-hover/art:text-emerald-700 leading-tight line-clamp-1"
                                  dangerouslySetInnerHTML={{ __html: `• ${art.title}` }}
                                />
                              </Link>
                            ))}
                          </div>
                        ))}
                        {issue.categories.reduce((acc, c) => acc + c.articles.length, 0) > 3 && (
                          <p className="text-[8px] text-slate-300 italic font-medium">
                            + {issue.categories.reduce((acc, c) => acc + c.articles.length, 0) - 3} more papers...
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-2xl border border-dashed border-slate-200 py-20 text-center">
              <Search className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No results found</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ArchiveIndex;
