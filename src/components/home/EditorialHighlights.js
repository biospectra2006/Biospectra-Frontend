'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Globe } from 'lucide-react';
import Image from 'next/image';

const EditorialHighlights = ({ colors, assets }) => {
  const P = colors;
  return (
    <section className="flex flex-col justify-center py-12 lg:py-16" style={{ background: '#fcf8f3', borderTop: `1px solid ${P.borderSoft}`, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)', width: '100%' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative w-full max-w-[380px] mx-auto aspect-[4/3.5] order-2 lg:order-1 mt-6 lg:mt-0">
            <div className="absolute top-[5%] right-[5%] w-[85%] h-[85%] bg-emerald-900/[0.02] border border-emerald-900/5 -rotate-2" />
            <div className="absolute bottom-[5%] left-[5%] w-[75%] h-[75%] bg-emerald-900/[0.01] border border-emerald-900/5 rotate-1" />
            <motion.div initial={{ opacity: 0, x: -30, y: 30 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ position: 'absolute', left: 0, bottom: 0, width: '65%', zIndex: 10 }} className="hover:z-30 transition-transform duration-500 hover:-translate-y-2">
              <div style={{ background: '#fff', padding: '6px', border: `1px solid rgba(6,78,59,0.08)`, boxShadow: '0 10px 30px -10px rgba(6,78,59,0.1)' }}>
                <Image src={assets.awardImg} alt="Research Excellence Award" width={400} height={300} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30, y: -30 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} style={{ position: 'absolute', right: 0, top: 0, width: '60%', zIndex: 20 }} className="hover:z-30 transition-transform duration-500 hover:-translate-y-2">
              <div style={{ background: '#fff', padding: '6px', border: `1px solid rgba(6,78,59,0.08)`, boxShadow: '0 15px 40px -10px rgba(6,78,59,0.15)' }}>
                <Image src={assets.biospectraCover} alt="Biospectra Journal Cover" width={400} height={500} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </motion.div>
          </div>

          <div className="max-w-[500px] order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1.5px] bg-emerald-900/20" />
              <span className="text-emerald-900/40 font-mono tracking-[0.2em] text-[9px] uppercase">Editorial Excellence</span>
            </div>
            <h2 className="heading-section mb-3" style={{ fontSize: 'clamp(22px, 2.5vw, 28px)', color: '#064e3b', fontWeight: 800 }}>Guided by Academic Rigor</h2>
            <p className="text-emerald-900/60 text-[13px] leading-relaxed mb-6">Our journal is steered by a distinguished editorial board comprising leading scientists from premier global institutions.</p>
            <div className="flex flex-col gap-3">
              {[
                { icon: ShieldCheck, title: 'Peer-Reviewed', desc: 'A rigorous double-blind vetting process ensuring research integrity.' },
                { icon: Layers, title: 'Interdisciplinary', desc: 'Covering Molecular Biology, Zoology, and Biotechnology.' },
                { icon: Globe, title: 'Global Reach', desc: 'Indexed worldwide for innovative contributions to research.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }} style={{ background: '#ffffff', border: `1px solid rgba(6,78,59,0.06)`, padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start', borderRadius: '4px' }} className="group transition-all duration-500 hover:shadow-lg hover:shadow-emerald-900/5">
                  <div style={{ padding: 8, background: '#fcf8f3', border: `1px solid rgba(6,78,59,0.05)`, display: 'flex', borderRadius: '4px' }}><item.icon size={16} color="#19674b" /></div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: '16px', fontWeight: 800, color: '#064e3b', marginBottom: 2 }}>{item.title}</h4>
                    <p style={{ fontSize: '12px', color: 'rgba(6,78,59,0.6)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialHighlights;
