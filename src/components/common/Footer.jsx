'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, MapPin, Facebook, Twitter, 
  Linkedin, Github, ChevronRight, 
  ArrowUp, Globe, ShieldCheck, Award
} from 'lucide-react';

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080015] pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* ── HIGH-PERFORMANCE DECORATIVE BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-magenta/10 blur-[100px]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-[1400px]">
        {/* ── TOP SECTION: BRAND & ACCREDITATION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-5 group w-fit">
              <div className="relative w-16 h-16 bg-white rounded-2xl shadow-2xl p-2 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
                <Image src="/logo/Biospectra-logo.jpg.jpeg" alt="Biospectra" fill className="object-contain p-1.5" />
              </div>
              <div className="flex flex-col">
                <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: '#ffffff' }} className="text-white text-4xl font-black tracking-tight leading-none mb-1">
                  BIOSPECTRA
                </h2>
                <div className="flex items-center gap-2">
                   <div className="h-px w-6 bg-magenta" />
                   <span className="text-[10px] text-magenta font-black tracking-[0.3em] uppercase" style={{ color: '#3eb489' }}>Scientific Excellence</span>
                </div>
              </div>
            </Link>
            <p className="text-white/50 text-[15px] leading-relaxed max-w-md font-medium italic">
              "An International Biannual Refereed Journal of Life Sciences, committed to the global dissemination of groundbreaking biological research since 2006."
            </p>
            <div className="flex items-center gap-4">
               <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#080015] bg-white flex items-center justify-center p-1.5 shadow-xl" title="MSET">
                    <Image src="/assets/mset-logo-png-removebg-preview.png" alt="MSET" width={24} height={24} />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#080015] bg-white flex items-center justify-center p-1.5 shadow-xl" title="ICCB">
                    <Image src="/assets/iccb-logo-removebg-preview.png" alt="ICCB" width={24} height={24} />
                  </div>
               </div>
               <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest ml-4">Published by MSET & ICCB</span>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Resources Column */}
            <div className="space-y-6">
              <h3 className="text-white/60 font-black text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Resources</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Archive', path: '/archive' },
                  { name: 'Editorial Board', path: '/editorial' },
                  { name: 'Author Guidelines', path: '/guidelines' },
                  { name: 'Gallery', path: '/gallery' },
                  { name: 'Contact', path: '/contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.path} className="text-white/70 hover:text-white text-sm font-bold transition-all flex items-center group">
                      <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-magenta mr-2" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accreditation Column */}
            <div className="space-y-6">
              <h3 className="text-white/60 font-black text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Accreditation</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group cursor-default">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:border-magenta/30 transition-colors">
                    <ShieldCheck size={18} className="text-magenta" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Peer Reviewed</span>
                    <span className="text-white/90 text-[12px] font-bold">Scientific Integrity</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 group cursor-default">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:border-magenta/30 transition-colors">
                    <Award size={18} className="text-magenta" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Impact Factor</span>
                    <span className="text-white/90 text-[12px] font-bold">SJIF 8.546 (2023)</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 group cursor-default">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:border-magenta/30 transition-colors">
                    <Globe size={18} className="text-magenta" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Indexing</span>
                    <span className="text-white/90 text-[12px] font-bold">Global Master List</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Column */}
            <div className="space-y-6">
              <h3 className="text-white/60 font-black text-[11px] uppercase tracking-[0.4em] mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-magenta shrink-0 mt-1" />
                  <div>
                    <span className="text-[9px] text-white/40 font-black uppercase tracking-widest block mb-1">Office</span>
                    <p className="text-white/80 text-[13px] font-bold leading-relaxed">Madhawi Shyam Educational Trust, Ranchi, India.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={18} className="text-magenta shrink-0" />
                  <div>
                    <span className="text-[9px] text-white/40 font-black uppercase tracking-widest block mb-1">Email</span>
                    <a href="mailto:biospectra@yahoo.com" className="text-white/90 hover:text-magenta font-black text-[14px] transition-colors">biospectra@yahoo.com</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM SECTION: UTILITIES & COPYRIGHT ── */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-4">
             <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[9px] font-black uppercase tracking-widest rounded-full">ISSN: 0973-7057</span>
                <span className="px-3 py-1 bg-magenta/10 border border-magenta/20 text-magenta text-[9px] font-black uppercase tracking-widest rounded-full">ESTD. 2006</span>
             </div>
             <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest">
               &copy; {mounted ? new Date().getFullYear() : '2024'} Biospectra Journal. All Rights Reserved.
             </p>
          </div>

          <div className="flex items-center gap-10">
             <div className="flex items-center gap-8">
               {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                 <a key={i} href="#" className="text-white/30 hover:text-magenta transition-all transform hover:scale-125">
                   <Icon size={20} />
                 </a>
               ))}
             </div>
             <div className="w-px h-8 bg-white/5 hidden sm:block" />
             <div className="flex items-center gap-8">
                <Link href="/privacy" className="text-white/30 hover:text-white text-[11px] font-black uppercase tracking-widest transition-colors">Privacy</Link>
                <Link href="/terms" className="text-white/30 hover:text-white text-[11px] font-black uppercase tracking-widest transition-colors">Terms</Link>
             </div>
             <button 
               onClick={scrollToTop} 
               className="group relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:bg-magenta hover:border-magenta hover:shadow-[0_0_30px_rgba(190,0,190,0.3)]"
             >
               <ArrowUp size={20} className="text-white/40 group-hover:text-white transition-colors" />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
