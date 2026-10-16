'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, ExternalLink, Loader2, BookOpen } from 'lucide-react';
import Image from 'next/image';

const ImageLightboxModal = ({ isOpen, onClose, src, title, subtitle, filename }) => {
  const [mounted, setMounted] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownload = async () => {
    if (!src) return;
    setDownloading(true);
    try {
      const response = await fetch(src, { mode: 'cors' });
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename || 'Biospectra_Image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(objectUrl), 3000);
    } catch (err) {
      console.warn('Direct blob download failed, falling back to window.open:', err);
      // Fallback: create direct download link or open in new window
      const link = document.createElement('a');
      link.href = src;
      link.target = '_blank';
      link.download = filename || 'Biospectra_Image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8"
          style={{ zIndex: 9999999 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[94vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#f8faf8] border-b border-slate-200">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="w-9 h-9 rounded-xl bg-[#133215]/10 flex items-center justify-center text-[#133215] shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-extrabold text-[#133215] leading-snug truncate">
                    {title || 'Image Preview'}
                  </h3>
                  {subtitle && (
                    <p className="text-[11px] text-slate-500 font-medium truncate">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-[#133215] hover:bg-[#1a421d] text-white text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-75 cursor-pointer"
                  title="Download image"
                >
                  {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                  <span className="hidden sm:inline">Download</span>
                </button>

                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Open full image in new tab"
                >
                  <ExternalLink size={16} />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Close (ESC)"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Image Body */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 bg-[#eef4ec]/50 flex items-center justify-center min-h-[300px]">
              <div className="relative max-w-full bg-white p-2.5 sm:p-3.5 rounded-xl shadow-xl border border-slate-200 flex items-center justify-center">
                <img
                  src={src}
                  alt={title || 'Preview'}
                  style={{ maxHeight: '72vh', maxWidth: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }}
                  className="rounded-lg select-none block"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-2.5 bg-[#f8faf8] border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
              <span className="truncate pr-2">Biospectra: An International Biannual Refereed Journal of Life Sciences</span>
              <span className="text-slate-400 shrink-0">Press ESC to exit</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ImageLightboxModal;
