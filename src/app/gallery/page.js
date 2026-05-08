'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Search, Calendar, Loader2 } from 'lucide-react';
import Image from 'next/image';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';


const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [query, setQuery] = useState('');

  const P = {
    deepPurple: '#064e3b',    // Emerald
    magenta:    '#3eb489',    // Mint
    textBody:   '#1e293b',
    textMuted:  '#64748b',
    border:     'rgba(25, 103, 75, 0.1)',
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_BASE}/gallery`);
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return images;
    return images.filter(item =>
      item.title?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
    );
  }, [query, images]);

  return (
    <div className="relative min-h-screen selection:bg-emerald-200 overflow-hidden" style={{ background: '#fdfbf7' }}>
      {/* Background Lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute inset-0 flex justify-between px-[5%] opacity-[0.03]">
           {[...Array(12)].map((_, i) => (
             <div key={i} className="w-px h-full bg-slate-900" />
           ))}
        </div>
      </div>

      <div className="relative z-10 pt-28 pb-14">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Compact Header */}
        <div className="text-center mb-8 max-w-lg mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
            <div style={{ width: 30, height: 2, background: P.magenta, marginBottom: 12 }} />
            <h1 
              style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
              className="text-2xl md:text-3xl font-black mb-2 tracking-tight uppercase"
            >
              Scientific Gallery
            </h1>
            <p style={{ color: P.textBody }} className="text-xs leading-relaxed opacity-70">
              Research discoveries, award ceremonies, and life science observations.
            </p>
          </motion.div>
        </div>

        {/* Compact Search */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search size={14} style={{ color: P.textMuted }} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by title, category or date…"
            style={{ border: `1px solid ${P.border}` }}
            className="w-full pl-10 pr-4 py-2.5 bg-white text-xs text-slate-800 placeholder-slate-300 shadow-lg shadow-emerald-900/5 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all rounded-lg"
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: P.textMuted }} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={14} />
            </button>
          )}
        </div>

        {query && (
          <p className="text-center text-[10px] font-bold uppercase tracking-widest mb-6" style={{ color: P.textMuted }}>
            Found <span style={{ color: P.magenta }}>{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Content */}
        {loading ? (
          <div className="text-center py-16">
            <Loader2 size={24} className="animate-spin mx-auto" style={{ color: P.magenta }} />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filtered.length === 0 ? (
              <div style={{ color: P.textMuted }} className="col-span-full text-center py-16 text-xs font-medium border border-dashed border-purple-100 italic rounded-lg">No images found.</div>
            ) : filtered.map((item) => (
              <motion.div
                key={item._id}
                layoutId={`img-${item._id}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSelectedImg(item)}
                className="group relative aspect-square overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-400 bg-slate-50 rounded-lg"
                style={{ border: `1px solid ${P.border}` }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Overlay */}
                <div 
                  style={{ background: 'linear-gradient(to top, rgba(6,78,59,0.85), transparent 60%)' }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
                >
                  <span style={{ color: P.magenta }} className="text-[8px] font-black uppercase tracking-[0.15em] mb-0.5">{item.category}</span>
                  <p className="text-white font-bold text-[10px] line-clamp-2 leading-snug">{item.title}</p>
                </div>
                <div 
                  style={{ background: 'rgba(255,255,255,0.25)' }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all w-6 h-6 rounded-full flex items-center justify-center text-white backdrop-blur-sm"
                >
                  <Maximize2 size={10} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-slate-950/95 flex items-center justify-center p-4 md:p-8"
          >
            <button className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <motion.div
              layoutId={`img-${selectedImg._id}`}
              className="relative max-w-4xl w-full bg-white shadow-2xl overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={selectedImg.imageUrl}
                  alt={selectedImg.title}
                  fill
                  className="object-contain bg-black"
                  unoptimized
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ color: P.magenta }} className="text-[9px] font-black uppercase tracking-[0.2em]">{selectedImg.category}</span>
                  <div className="flex-grow h-[1px]" style={{ background: P.border }} />
                  {selectedImg.createdAt && (
                    <span style={{ color: P.textMuted }} className="flex items-center text-[9px] font-bold uppercase">
                      <Calendar size={10} className="mr-1.5" /> {new Date(selectedImg.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
                <h3 
                  style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
                  className="text-xl font-bold mb-2"
                >
                  {selectedImg.title}
                </h3>
                <p style={{ color: P.textBody }} className="text-xs leading-relaxed opacity-75 max-w-2xl">
                  {selectedImg.description || 'Part of the Biospectra research documentation. Contributed by researchers associated with the Madhawi Shyam Educational Trust.'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  </div>
);
};

export default Gallery;
