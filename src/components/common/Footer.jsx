'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Twitter, Linkedin, Youtube, Mail, MapPin, BookOpen, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const [impactFactor, setImpactFactor] = useState('SJIF 8.546');
  const pathname = usePathname();

  useEffect(() => { 
    setMounted(true); 
    const fetchMetrics = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_URL}/about`);
        const data = await res.json();
        const metrics = data.find(s => s.sectionType === 'metrics');
        if (metrics) setImpactFactor(metrics.content);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchMetrics();
  }, []);

  if (pathname !== '/') return null;

  const navLinks = [
    { name: 'Home',            path: '/' },
    { name: 'Archive',         path: '/archive' },
    { name: 'Editorial Board', path: '/editorial' },
    { name: 'About',           path: '/about' },
    { name: 'Guidelines',      path: '/guidelines' },
    { name: 'Contact us',      path: '/contact' },
  ];

  const socials = [
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Twitter,   href: '#', label: 'Twitter'   },
    { Icon: Linkedin,  href: '#', label: 'LinkedIn'  },
    { Icon: Youtube,   href: '#', label: 'YouTube'   },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, #eef4ec 0%, #c8ddb8 120px, #b5d1a0 100%)', 
        fontFamily: 'var(--font-inter), sans-serif' 
      }}
    >
      {/* Decorative top accent line */}
      <div className="w-full h-[3px]" style={{ background: 'linear-gradient(90deg, transparent 0%, #133215 20%, #92B775 50%, #133215 80%, transparent 100%)' }} />

      {/* subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(19,50,21,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-14 pt-16 pb-10">
        
        {/* ── TOP SECTION: Brand + CTA ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-14">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#133215' }}>
              <BookOpen size={22} className="text-[#92B775]" />
            </div>
            <div>
              <h3 className="text-[#133215] text-lg font-bold tracking-wide" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                BIOSPECTRA
              </h3>
              <p className="text-[#133215]/60 text-[11px] font-medium tracking-wider uppercase">
                Journal of Life Sciences
              </p>
            </div>
          </div>
          <Link href="/archive" className="group flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#133215]/30 text-[#133215] text-[12px] font-bold uppercase tracking-widest hover:bg-[#133215] hover:text-[#92B775] hover:border-[#133215] transition-all duration-300">
            <span>Explore Issues</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8 pb-12 border-b border-[#133215]/12">

          {/* COL 1 — Quick Links */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#133215]/60 mb-1">
              Quick Links
            </p>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-[#133215] hover:text-[#133215]/70 text-[14px] font-semibold transition-colors duration-200 w-fit hover:translate-x-1 transform inline-block"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* COL 2 — Connect */}
          <div className="flex flex-col gap-5">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#133215]/60 mb-1">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:biospectra@yahoo.com"
                className="flex items-center gap-2.5 text-[#133215] hover:text-[#133215]/70 text-[14px] font-semibold transition-colors group"
              >
                <Mail size={14} className="text-[#133215]/60 group-hover:text-[#133215] transition-colors" />
                biospectra@yahoo.com
              </a>
              <span className="text-[#133215]/70 text-[13px] font-mono font-medium ml-[26px]">ISSN: 0973-7057</span>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-2.5 mt-1">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg border border-[#133215]/20 flex items-center justify-center hover:border-[#133215]/60 hover:bg-[#133215] transition-all duration-300 group"
                >
                  <Icon size={16} className="text-[#133215]/70 group-hover:text-[#92B775] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* COL 3 — Address + Badges */}
          <div className="flex flex-col gap-5">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#133215]/60 mb-1">
              Address
            </p>
            <div className="flex items-start gap-2.5">
              <MapPin size={14} className="text-[#133215]/60 mt-1 shrink-0" />
              <p className="text-[#133215] text-[14px] font-medium leading-relaxed">
                Madhawi Shyam Educational Trust,<br />
                Ranchi, Jharkhand, India.
              </p>
            </div>
            <div className="flex flex-col gap-3 mt-1">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg" style={{ background: '#133215' }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#92B775', boxShadow: '0 0 8px rgba(146,183,117,0.6)' }} />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#92B775]">
                  Impact Factor {impactFactor}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest border border-[#133215]/25 text-[#133215]/80 hover:bg-[#133215]/5 transition-colors">
                  ESTD. 2006
                </span>
                <span className="px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest border border-[#133215]/25 text-[#133215]/80 hover:bg-[#133215]/5 transition-colors">
                  PEER REVIEWED
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-[#133215]/60">
            © {mounted ? new Date().getFullYear() : '2025'} Biospectra Journal. All Rights Reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link href="/guidelines" className="text-[11px] font-semibold tracking-widest uppercase text-[#133215]/60 hover:text-[#133215] transition-colors">
              Author Guidelines
            </Link>
            <span className="w-1 h-1 rounded-full bg-[#133215]/30" />
            <Link href="/contact" className="text-[11px] font-semibold tracking-widest uppercase text-[#133215]/60 hover:text-[#133215] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* ── GIANT BLEED WORDMARK ── */}
      <div className="relative z-10 overflow-hidden" aria-hidden="true">
        <p
          className="font-black text-center whitespace-nowrap select-none"
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(50px, 12vw, 150px)',
            lineHeight: 0.82,
            letterSpacing: '-0.02em',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(19,50,21,0.12)',
            marginBottom: '0',
            marginTop: '-1rem',
          }}
        >
          BIOSPECTRA
        </p>
      </div>
    </footer>
  );
};

export default Footer;
