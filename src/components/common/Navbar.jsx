'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home',           path: '/' },
  { name: 'Issues',         path: '/archive' },
  { name: 'About',          path: '/about' },
  { name: 'Contact',        path: '/contact' },
  { name: 'Editorial Board',path: '/editorial' },
  { name: 'Guidelines',     path: '/guidelines' },
  { name: 'Gallery',        path: '/gallery' },
];

const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered,  setHovered]  = useState(null);
  const [sjifNumber, setSjifNumber] = useState('8.546');
  const pathname = usePathname();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_URL}/settings`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.sjifNumber) setSjifNumber(data.sjifNumber);
        }
      } catch (err) {
        console.error('Navbar settings fetch error:', err);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const isHomePage = pathname === '/';
  const isTransparent = isHomePage && !scrolled;

  return (
    <>
      <nav
        className="fixed z-[100] transition-all duration-500"
        style={{
          top: 0, left: 0, right: 0, width: '100%',
          background: isTransparent
            ? 'transparent'
            : 'rgba(238, 244, 236, 0.95)',
          backdropFilter: isTransparent ? 'none' : 'blur(20px)',
          WebkitBackdropFilter: isTransparent ? 'none' : 'blur(20px)',
          borderBottom: isTransparent ? 'none' : '1px solid rgba(19, 50, 21, 0.08)',
          boxShadow: isTransparent 
            ? 'none' 
            : (scrolled ? '0 4px 30px rgba(19, 50, 21, 0.06)' : 'none'),
        }}
      >
        {/* Top accent line */}
        {!isTransparent && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, #92B775 0%, #133215 50%, #92B775 100%)',
            opacity: 0.4,
            pointerEvents: 'none',
          }} />
        )}

        <div
          className="mx-auto flex items-center justify-between"
          style={{ 
            maxWidth: 1600,
            padding: '0 clamp(16px, 3vw, 48px)', 
            height: scrolled ? 56 : 64,
            transition: 'height 0.3s ease',
          }}
        >

          {/* ── BRAND ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group outline-none">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0 rounded-lg overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                padding: 3,
              }}
            >
              <Image
                src="/assets/logo/mset-logo.png"
                alt="MSET Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0 rounded-lg overflow-hidden"
              style={{
                background: '#ffffff',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(19,50,21,0.15)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                padding: 3,
              }}
            >
              <Image
                src="/assets/logo/iccb.png"
                alt="ICCB Logo"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </motion.div>

            <div className="flex flex-col min-w-0 pr-2">
              <span className="transition-colors duration-500 font-bold leading-tight"
                style={{
                  fontSize: 'clamp(13px, 1.8vw, 18px)',
                  letterSpacing: '-0.01em',
                  color: isTransparent ? '#ffffff' : '#133215',
                  fontFamily: 'var(--font-playfair), serif'
                }}
              >
                Madhawi Shyam Educational Trust
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="transition-colors duration-500 tracking-[0.08em] uppercase font-semibold hidden md:block" 
                  style={{ 
                    fontSize: 'clamp(7px, 0.8vw, 8.5px)',
                    color: isTransparent ? 'rgba(255,255,255,0.65)' : '#92B775',
                    fontFamily: 'var(--font-inter), sans-serif'
                  }}
                >
                  International Consortium of Contemporary Biologists • <span style={{ color: isTransparent ? 'rgba(255,255,255,0.45)' : '#c5a059' }}>Reg. No. 20560/IV-1815/2005</span>
                </span>

              </div>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden lg:flex items-center gap-0.5 ml-auto">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              const isHov = hovered === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onMouseEnter={() => setHovered(link.name)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative transition-all duration-200"
                  style={{
                    padding: '6px 14px',
                    fontSize: 11,
                    fontWeight: isActive ? 800 : 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    borderRadius: 6,
                    fontFamily: 'var(--font-inter), sans-serif',
                    color: isTransparent 
                      ? (isActive || isHov ? '#ffffff' : 'rgba(255,255,255,0.7)')
                      : (isActive ? '#133215' : (isHov ? '#133215' : 'rgba(19,50,21,0.55)')),
                    background: isTransparent
                      ? (isHov && !isActive ? 'rgba(255,255,255,0.08)' : 'transparent')
                      : (isHov && !isActive ? 'rgba(19,50,21,0.04)' : 'transparent'),
                  }}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-3 right-3 rounded-full"
                      style={{
                        height: 2,
                        background: isTransparent
                          ? '#ffffff'
                          : 'linear-gradient(90deg, #133215, #92B775)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(v => !v)}
            className="lg:hidden flex items-center justify-center outline-none"
            style={{
              width: 40, height: 40, borderRadius: 10,
              background: isOpen ? '#133215' : 'transparent',
              border: isOpen ? 'none' : (isTransparent ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(19,50,21,0.12)'),
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <X size={18} color="#92B775" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Menu size={18} color={isTransparent ? '#ffffff' : '#133215'} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-[110]"
              style={{ background: 'rgba(19, 50, 21, 0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-[120] flex flex-col"
              style={{
                width: 'min(300px, 82vw)',
                background: '#eef4ec',
                boxShadow: '-16px 0 60px rgba(19, 50, 21, 0.12)',
                borderLeft: '1px solid rgba(19,50,21,0.08)',
              }}
            >
              {/* Drawer top accent */}
              <div style={{ height: 3, background: 'linear-gradient(90deg, #92B775, #133215)' }} />

              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(19,50,21,0.06)' }}>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#92B775', fontFamily: 'var(--font-inter), sans-serif' }}>
                  Menu
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: 32, height: 32, borderRadius: 8, background: 'rgba(19,50,21,0.06)',
                    border: '1px solid rgba(19,50,21,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  }}
                >
                  <X size={14} color="#133215" />
                </motion.button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-3 py-3 flex-1 overflow-y-auto gap-0.5">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.06 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className="group"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '12px 14px', borderRadius: 10, textDecoration: 'none',
                          background: isActive ? 'rgba(19,50,21,0.08)' : 'transparent',
                          border: isActive ? '1px solid rgba(19,50,21,0.1)' : '1px solid transparent',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span style={{
                          fontSize: 14,
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? '#133215' : 'rgba(19,50,21,0.7)',
                          letterSpacing: '0.02em',
                        }}>
                          {link.name}
                        </span>
                        <ChevronRight 
                          size={14} 
                          style={{ 
                            color: isActive ? '#92B775' : 'rgba(19,50,21,0.2)',
                            transition: 'all 0.2s ease',
                          }} 
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer footer */}
              <div className="px-4 pb-6 pt-3" style={{ borderTop: '1px solid rgba(19,50,21,0.06)' }}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.04 + 0.15 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#92B775] animate-pulse" />
                    <span style={{ fontSize: 9, color: '#133215', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-inter), sans-serif' }}>
                      SJIF {sjifNumber}
                    </span>
                  </div>
                  <p style={{ textAlign: 'center', fontSize: 9, color: 'rgba(19,50,21,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-inter), sans-serif' }}>
                    Biospectra Journal • ISSN: 0973-7057
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
