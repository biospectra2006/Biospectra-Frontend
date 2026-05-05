'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

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
      style={{ background: '#080015', fontFamily: 'var(--font-inter), sans-serif' }}
    >
      {/* subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(62,180,137,0.07) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── MAIN GRID ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-14 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 pb-14 border-b border-white/[0.06]">

          {/* COL 1 — Nav */}
          <nav className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-white/40 hover:text-white text-[15px] font-medium transition-colors duration-150 w-fit"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* COL 2 — Follow us */}
          <div className="flex flex-col gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.45em] text-white/25">
              Follow us
            </p>
            <div className="flex flex-col gap-1">
              <a
                href="mailto:biospectra@yahoo.com"
                className="text-white/50 hover:text-white text-[14px] font-medium transition-colors"
              >
                biospectra@yahoo.com
              </a>
              <span className="text-white/25 text-[14px] font-medium">ISSN: 0973-7057</span>
            </div>
            {/* Social circles */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-all duration-200 group"
                >
                  <Icon size={15} className="text-white/35 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* COL 3 — Address */}
          <div className="flex flex-col gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.45em] text-white/25">
              Address
            </p>
            <div>
              <p className="text-white/55 text-[14px] font-medium leading-relaxed">
                Madhawi Shyam Educational Trust,<br />
                Ranchi,<br />
                Jharkhand, India.
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: '#3eb489' }}
                />
                <span
                  className="text-[10px] font-black uppercase tracking-[0.2em]"
                  style={{ color: '#3eb489' }}
                >
                  SJIF Impact Factor 8.546
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border border-white/8 text-white/20">
                  ESTD. 2006
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border border-white/8 text-white/20">
                  PEER REVIEWED
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <span className="text-[11px] font-medium tracking-widest uppercase text-white/20">
            © {mounted ? new Date().getFullYear() : '2025'} Biospectra Journal. All Rights Reserved.
          </span>
          <div className="flex items-center gap-8">
            <Link href="/guidelines" className="text-[11px] font-medium tracking-widest uppercase text-white/20 hover:text-white/50 transition-colors">
              Author Guidelines
            </Link>
            <Link href="/contact" className="text-[11px] font-medium tracking-widest uppercase text-white/20 hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* ── GIANT BLEED WORDMARK ── */}
      <div className="relative z-10 overflow-hidden" aria-hidden="true">
        <p
          className="font-black text-center whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-crimson-pro), Georgia, serif',
            fontSize: 'clamp(80px, 19.5vw, 280px)',
            lineHeight: 0.82,
            letterSpacing: '-0.03em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            marginBottom: '-0.1em',
            paddingTop: '0.5rem',
          }}
        >
          BIOSPECTRA
        </p>
      </div>
    </footer>
  );
};

export default Footer;
