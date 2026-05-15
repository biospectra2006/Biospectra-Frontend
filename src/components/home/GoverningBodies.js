'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const GoverningBodies = ({ colors, assets }) => {
  const P = colors;
  return (
    <section className="relative overflow-hidden" style={{ background: '#eef4ec', borderTop: `1px solid ${P.borderSoft}`, padding: 'clamp(40px, 5vw, 60px) 0' }}>
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
          <span className="text-[#92B775] font-mono tracking-[0.3em] text-[9px] uppercase mb-3">Official Publication</span>
          <h2 className="heading-section text-center" style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: '#133215', letterSpacing: '0.05em' }}>
            OUR GOVERNING BODIES
          </h2>
          <div className="h-[1.5px] w-10 my-4 mx-auto" style={{ background: 'rgba(19,50,21,0.2)' }} />
          <p className="text-editorial text-center max-w-[500px] mx-auto text-sm leading-relaxed" style={{ color: 'rgba(19,50,21,0.7)' }}>
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
                border: `1px solid rgba(19, 50, 21, 0.08)`,
                padding: 'clamp(24px, 4vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: '4px',
              }}
              className="group hover:shadow-xl transition-all duration-500"
            >
              <div className="h-20 sm:h-24 flex items-center justify-center mb-6">
                <Image src={body.logo} alt={body.name} width={100} height={100} style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }} className="group-hover:scale-105 transition-transform duration-500 ease-out" />
              </div>
              <span className="font-mono tracking-[0.2em] text-[9px] uppercase mb-3" style={{ color: 'rgba(19,50,21,0.4)' }}>{body.acronym}</span>
              <h3 className="heading-section mb-3" style={{ color: '#133215', fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700 }}>{body.name}</h3>
              <div className="w-6 h-[1px] mb-4 group-hover:w-16 transition-all duration-500" style={{ background: 'rgba(19,50,21,0.1)' }} />
              <p className="text-[13px] leading-relaxed max-w-[280px]" style={{ color: 'rgba(19,50,21,0.6)' }}>{body.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoverningBodies;
