'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const GoverningBodies = ({ colors, assets }) => {
  const P = colors;
  return (
    <section className="relative overflow-hidden" style={{ background: '#fcf8f3', borderTop: `1px solid ${P.borderSoft}`, padding: 'clamp(40px, 5vw, 60px) 0' }}>
      {/* Background Lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex justify-between px-[5%] opacity-[0.03]">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-px h-full bg-slate-900" />
          ))}
        </div>
      </div>

      <div className="relative z-10" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'clamp(30px, 5vw, 40px)' }}>
          <span className="text-emerald-900/40 font-mono tracking-[0.3em] text-[9px] uppercase mb-3">Official Publication</span>
          <h2 className="heading-section text-center" style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: '#064e3b', letterSpacing: '0.05em' }}>
            OUR GOVERNING BODIES
          </h2>
          <div className="h-[1.5px] w-10 bg-emerald-900/20 my-4 mx-auto" />
          <p className="text-editorial text-center max-w-[500px] mx-auto text-sm text-emerald-900/70 leading-relaxed">
            Biospectra is officially published under the stewardship of these distinguished academic organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 max-w-[900px] mx-auto">
          {[
            { name: 'Madhawi Shyam Educational Trust', acronym: 'MSET', desc: 'A dedicated foundation committed to advancing higher education and scientific research across the biological sciences.', logo: assets.msetLogo },
            { name: 'International Consortium of Contemporary Biologists', acronym: 'ICCB', desc: 'An international fellowship of scientists and researchers fostering global collaboration and innovation in modern biology.', logo: assets.iccbLogo },
          ].map((body, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                background: '#ffffff',
                border: `1px solid rgba(6, 78, 59, 0.08)`,
                padding: 'clamp(24px, 4vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: '4px',
              }}
              className="group hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500"
            >
              <div className="h-20 sm:h-24 flex items-center justify-center mb-6">
                <Image src={body.logo} alt={body.name} width={100} height={100} style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }} className="group-hover:scale-105 transition-transform duration-500 ease-out" />
              </div>
              <span className="text-emerald-900/40 font-mono tracking-[0.2em] text-[9px] uppercase mb-3">{body.acronym}</span>
              <h3 className="heading-section text-[#064e3b] mb-3" style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700 }}>{body.name}</h3>
              <div className="w-6 h-[1px] bg-emerald-900/10 mb-4 group-hover:w-16 group-hover:bg-emerald-900/30 transition-all duration-500" />
              <p className="text-emerald-900/60 text-[13px] leading-relaxed max-w-[280px]">{body.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoverningBodies;
