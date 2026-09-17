'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Users, Loader2, X } from 'lucide-react';
import { globalSearch } from '@/services/api';
import Link from 'next/link';

// Parse ^a, ^b, ^ab, ^a*, *^a etc. into <sup> tags for authors
const parseAcademicText = (text) => {
  if (!text) return '';
  return text.replace(/(\*?)\^([a-zA-Z0-9,]+)(\*?)/g, (match, starBefore, markers, starAfter) => {
    return `<sup>${starBefore}${markers}${starAfter}</sup>`;
  });
};

const SearchBar = ({ colors }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ articles: [], editorial: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setResults({ articles: [], editorial: [] });
      setIsSearching(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await globalSearch(query);
        setResults(data);
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalResults = results.articles.length + results.editorial.length;

  return (
    <div ref={searchRef} className="relative w-full max-w-md z-50">
      {/* Search Input Box */}
      <div 
        className={`relative flex items-center bg-white/10 backdrop-blur-md border transition-all duration-300 ${isOpen && query ? 'border-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.15)] rounded-t-2xl' : 'border-white/20 rounded-2xl hover:bg-white/15'}`}
      >
        <div className="pl-4 text-emerald-400/80">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search articles, authors, or editorial board..."
          className="w-full bg-transparent text-white placeholder:text-white/40 px-4 py-3.5 outline-none text-sm font-medium tracking-wide"
        />
        <div className="pr-4">
          {isSearching ? (
            <Loader2 size={16} className="animate-spin text-emerald-400" />
          ) : query ? (
            <button onClick={() => { setQuery(''); setIsOpen(false); }} className="text-white/40 hover:text-white/80 transition-colors">
              <X size={16} />
            </button>
          ) : null}
        </div>
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {isOpen && query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 w-full bg-black/60 backdrop-blur-2xl border-x border-b border-emerald-400/50 rounded-b-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col mb-10"
            style={{ marginBottom: '40px' }}
          >
            <div className="overflow-y-auto custom-scrollbar p-2 max-h-[250px] md:max-h-[320px]" data-lenis-prevent>
              {!isSearching && totalResults === 0 ? (
                <div className="py-8 text-center text-white/50 text-xs font-medium tracking-wide">
                  No results found for "{query}"
                </div>
              ) : (
                <>
                  {/* Articles Section */}
                  {results.articles.length > 0 && (
                    <div className="mb-4">
                      <div className="px-3 py-2 text-[10px] font-bold text-emerald-300 uppercase tracking-[0.2em] mb-1 flex items-center gap-2 border-b border-white/5">
                        <FileText size={12} /> Articles
                      </div>
                      {results.articles.map(article => (
                        <a 
                          key={article._id} 
                          href={article.pdfUrl || '#'} 
                          target="_blank" 
                          rel="noreferrer"
                          className="block px-4 py-3.5 hover:bg-white/10 rounded-xl transition-all duration-300 group hover:pl-5 border border-transparent hover:border-white/5"
                        >
                          <h4 
                            style={{ color: '#ffffff' }}
                            className="font-semibold text-sm leading-tight mb-1 group-hover:text-emerald-400 transition-colors line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: article.title }}
                          />
                          <p 
                            className="text-white/70 text-[11px] font-medium truncate"
                            dangerouslySetInnerHTML={{ __html: parseAcademicText(article.authors) }}
                          />
                          {(article.issue || article.category?.issue) && (
                            <p className="text-emerald-400/80 text-[10px] mt-1.5 font-medium tracking-wide">
                              {article.issue?.year?.year || article.category?.issue?.year?.year} • {article.issue?.title || article.category?.issue?.title}
                            </p>
                          )}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Editorial Section */}
                  {results.editorial.length > 0 && (
                    <div>
                      <div className="px-3 py-2 text-[10px] font-bold text-[#b8b8ff] uppercase tracking-[0.2em] mb-1 flex items-center gap-2 border-b border-white/5">
                        <Users size={12} /> Editorial Board
                      </div>
                      {results.editorial.map(member => (
                        <Link 
                          key={member._id} 
                          href="/editorial"
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3.5 hover:bg-white/10 rounded-xl transition-all duration-300 group hover:pl-5 border border-transparent hover:border-white/5"
                        >
                          <h4 
                            style={{ color: '#ffffff' }}
                            className="text-sm font-medium leading-tight mb-0.5 group-hover:text-[#9e9eff] transition-colors"
                          >
                            {member.name}
                          </h4>
                          <p className="text-white/70 text-[11px] font-medium truncate">
                            {member.role} {member.department ? `• ${member.department}` : ''}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-white/5 border-t border-white/10 px-4 py-2 text-center">
              <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">
                {isSearching ? 'Searching database...' : `Found ${totalResults} results`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
