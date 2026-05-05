'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HomeFooter = ({ colors, assets, mounted }) => {
  const P = colors;
  return (
    <footer style={{ background: P.white, padding: 'clamp(60px, 8vw, 100px) 0', borderTop: `1px solid ${P.borderSoft}` }}>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6 sm:gap-10">
             <Image src={assets.msetLogo} alt="MSET" width={56} height={56} className="opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
             <div style={{ width: 1, height: 40, background: P.borderSoft }} />
             <Image src={assets.iccbLogo} alt="ICCB" width={48} height={48} className="opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
          <p style={{ fontSize: 'clamp(10px, 1.2vw, 11px)', textTransform: 'uppercase', letterSpacing: '0.24em', color: P.textMuted, fontWeight: 700, textAlign: 'center' }}>
            Official Publication of MSET &amp; ICCB • ISSN: 0973-7057
          </p>
        </div>
        
        <div className="w-full max-w-[1200px] h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-50" />
        
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px] gap-10">
          <p style={{ fontSize: 13, color: P.textMuted, opacity: 0.8 }} className="text-center md:text-left">
            &copy; {mounted ? new Date().getFullYear() : '2024'} Biospectra Journal. Empowering biological sciences since 2006.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {['About', 'Editorial Board', 'Archive', 'Contact'].map(item => (
              <Link key={item} href={`/${item.toLowerCase().replace(' ', '')}`} style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, color: P.deepPurple }} className="hover:text-magenta transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
