'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
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

const P = {
  deepGreen:  '#064e3b',
  emerald:    '#19674b',
  richPurple: '#9e9eff',
  violet:     '#7c3aed',
  textBody:   '#1e293b',
  textMuted:  '#64748b',
};

const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered,  setHovered]  = useState(null);
  const pathname = usePathname();

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
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          background: isTransparent
            ? 'transparent'
            : (scrolled ? 'rgba(253, 251, 247, 0.98)' : 'rgba(253, 251, 247, 0.85)'),
          backdropFilter: isTransparent ? 'none' : 'blur(12px)',
          WebkitBackdropFilter: isTransparent ? 'none' : 'blur(12px)',
          borderBottom: isTransparent ? 'none' : '1px solid rgba(5, 150, 105, 0.1)',
          boxShadow: isTransparent 
            ? 'none' 
            : (scrolled ? '0 10px 30px rgba(0,0,0,0.06)' : '0 4px 20px rgba(0,0,0,0.02)'),
          overflow: 'hidden',
        }}
      >
        {/* Top shimmer line — glass highlight effect */}
        {!isTransparent && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent 0%, rgba(5, 150, 105, 0.4) 40%, rgba(109, 40, 217, 0.4) 70%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        )}


        <div
          className="mx-auto flex items-center justify-between"
          style={{ padding: '0 clamp(20px, 3vw, 44px)', height: 64 }}
        >

          {/* ── BRAND BLOCK ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group outline-none">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-10 h-10 sm:w-[54px] sm:h-[54px] flex-shrink-0"
              style={{
                borderRadius: 0,
                padding: 0,
                background: 'transparent',
                border: 'none',
              }}
            >
              <Image
                src="/assets/logo/mset-logo.png"
                alt="MSET Logo"
                fill
                className="object-contain transition-all duration-500"
                priority
              />
            </motion.div>

            {/* Vertical divider */}
            <div style={{ 
              width: 1, 
              height: 28, 
              background: isTransparent 
                ? 'rgba(255,255,255,0.2)' 
                : 'rgba(0,0,0,0.1)', 
              flexShrink: 0 
            }} className="block mx-2 sm:mx-3" />

            <div className="flex flex-col flex-shrink min-w-0 pr-2">
              <span className={`transition-colors duration-500`}
                style={{
                  fontSize: 'clamp(12px, 1.8vw, 18px)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  fontWeight: 900,
                  color: isTransparent ? '#ffffff' : '#1e293b',
                  fontFamily: 'var(--font-crimson-pro), serif'
                }}
              >
                Madhawi Shyam Educational Trust
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`transition-colors duration-500 tracking-[0.05em] uppercase font-bold leading-tight hidden sm:block`} 
                  style={{ 
                    fontSize: 'clamp(7px, 1vw, 9px)',
                    color: isTransparent ? 'rgba(255,255,255,0.8)' : '#64748b'
                  }}>
                  International Consortium of Contemporary Biologists
                </span>
                <div className={`w-1 h-1 rounded-full hidden sm:block ${isTransparent ? 'bg-emerald-900/20' : 'bg-slate-200'}`} />
                <span className={`transition-colors duration-500 font-mono`} 
                  style={{ 
                    fontSize: 'clamp(7px, 1vw, 9px)', 
                    letterSpacing: '0.05em',
                    color: isTransparent ? 'rgba(255,255,255,0.6)' : '#94a3b8'
                  }}>
                  ISSN: 0973-7057
                </span>
              </div>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden lg:flex items-center gap-2 ml-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              const isHov = hovered === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                   onMouseEnter={() => setHovered(link.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={`text-label transition-all duration-300`}
                  style={{
                    position: 'relative',
                    padding: '8px 14px',
                    fontSize: 10,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    borderRadius: 10,
                    color: isTransparent 
                      ? (isActive || isHov ? '#ffffff' : 'rgba(255,255,255,0.7)')
                      : (isActive ? '#047857' : (isHov ? '#059669' : '#64748b')),
                    fontWeight: isActive ? 900 : 600
                  }}
                >
                  {/* Simple text hover indicator or just color shift */}
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${isTransparent ? 'bg-white' : 'bg-emerald-600'}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
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
              width: 42, height: 42, borderRadius: 12,
              background: isOpen ? `linear-gradient(135deg, ${P.emerald}, #3eb489)` : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <X size={20} color="#fff" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Menu size={20} color={isTransparent ? '#ffffff' : P.emerald} />
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
              className="lg:hidden fixed inset-0 z-[90]"
              style={{ background: 'rgba(6,78,59,0.7)' }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-[95] flex flex-col"
              style={{
                width: 'min(320px, 85vw)',
                background: 'rgba(255,255,255,1)',
                boxShadow: '-12px 0 60px rgba(25,103,75,0.15)',
                borderLeft: '1px solid rgba(25,103,75,0.12)',
              }}
            >
              {/* Drawer top accent */}
              <div style={{ height: 3, background: `linear-gradient(90deg, ${P.deepGreen}, #3eb489)` }} />

              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(25,103,75,0.08)' }}>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: P.textMuted }}>
                  Navigation
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: 34, height: 34, borderRadius: 8, background: 'rgba(25,103,75,0.07)',
                    border: '1px solid rgba(25,103,75,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  }}
                >
                  <X size={15} color={P.emerald} />
                </motion.button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-4 py-4 flex-1 overflow-y-auto gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.08 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '13px 16px', borderRadius: 12, textDecoration: 'none',
                          background: isActive ? `linear-gradient(135deg, rgba(6,78,59,0.07), rgba(62,180,137,0.05))` : 'transparent',
                          border: isActive ? `1px solid rgba(25,103,75,0.15)` : '1px solid transparent',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span style={{
                          fontSize: 15,
                          fontFamily: 'var(--font-crimson-pro), serif',
                          fontWeight: isActive ? 900 : 700,
                          color: isActive ? P.deepGreen : P.textBody,
                          letterSpacing: '0.01em',
                        }}>
                          {link.name}
                        </span>
                        {isActive && (
                          <div style={{ width: 7, height: 7, borderRadius: '50%', background: `linear-gradient(135deg, ${P.emerald}, #3eb489)`, flexShrink: 0 }} />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer footer */}
              <div className="px-4 pb-8 pt-4" style={{ borderTop: '1px solid rgba(25,103,75,0.08)' }}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 + 0.15 }}
                >

                  <p style={{ textAlign: 'center', fontSize: 9, color: P.textMuted, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16, opacity: 0.7 }}>
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
