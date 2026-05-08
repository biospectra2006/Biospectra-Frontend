'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Recognition = ({ colors, assets }) => {
  const P = colors;
  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${P.deepPurple}, #022c22)`, color: '#fff', borderTop: `1px solid rgba(255,255,255,0.1)`, padding: 'clamp(40px, 6vw, 80px) 0' }}>
      {/* Background Lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex justify-between px-[5%] opacity-[0.05]">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-px h-full bg-white" />
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: `rgba(25,103,75,0.2)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)', position: 'relative', zIndex: 10 }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          <div className="w-full lg:w-[55%] text-center lg:text-left">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="flex items-center justify-center lg:justify-start gap-12 mb-4">
                <div style={{ width: 32, height: 1.5, background: P.magenta }} />
                <span style={{ fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, color: P.magenta }}>Official Accreditation</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 'clamp(34px, 6vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '0.01em', margin: '0 0 16px 0' }}>World-Class Scientific Standards</h2>
              <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: '0 0 24px 0', letterSpacing: '0.01em', maxWidth: 600 }} className="mx-auto lg:mx-0">Biospectra is proud to be part of the <strong style={{ color: '#fff', fontWeight: 700 }}>SJIF Journals Master List</strong>, a recognition of our unwavering dedication to scientific quality and research impact.</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-flex', flexDirection: 'column', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(62,180,137,0.3)', padding: '24px 40px', borderRadius: '4px' }}>
                  <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 800, color: P.magenta, marginBottom: 10 }}>SJIF Impact Factor</span>
                  <div className="flex items-baseline gap-4">
                    <span style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 'clamp(44px, 6vw, 60px)', fontWeight: 900, background: `linear-gradient(135deg, #fff, ${P.magenta})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>8.546</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>(2023)</span>
                  </div>
                </motion.div>
                
                <div className="flex flex-col items-center sm:items-start gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: P.magenta }} />
                    <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.9)' }}>PEER REVIEWED</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: P.magenta }} />
                    <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.9)' }}>GLOBAL INDEXING</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-[40%] flex justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.8, rotate: 10 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }} className="relative group">
              <div className="absolute inset-0 bg-magenta/20 blur-[60px] rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.15)', padding: 12, boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
                <Image src={assets.certificateImg} alt="SJIF Certificate" width={450} height={600} style={{ width: '100%', maxWidth: 380, height: 'auto', display: 'block' }} className="shadow-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recognition;
