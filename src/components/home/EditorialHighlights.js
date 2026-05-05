'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Globe } from 'lucide-react';
import Image from 'next/image';

const EditorialHighlights = ({ colors, assets }) => {
  const P = colors;
  return (
    <section className="min-h-[100svh] flex flex-col justify-center py-20 lg:py-0" style={{ background: P.neutral, borderTop: `1px solid ${P.borderSoft}`, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)', width: '100%' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          <div className="relative w-full max-w-[420px] mx-auto aspect-[4/3.5] order-2 lg:order-1 mt-8 lg:mt-0">
            <div className="absolute top-[5%] right-[5%] w-[85%] h-[85%] bg-emerald-900/[0.03] border border-emerald-900/10 -rotate-2" />
            <div className="absolute bottom-[5%] left-[5%] w-[75%] h-[75%] bg-emerald-900/[0.02] border border-emerald-900/5 rotate-1" />
            <motion.div initial={{ opacity: 0, x: -30, y: 30 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ position: 'absolute', left: 0, bottom: 0, width: '65%', zIndex: 10 }} className="hover:z-30 transition-transform duration-500 hover:-translate-y-3">
              <div style={{ background: '#fff', padding: 'clamp(6px, 1.2vw, 10px)', border: `1px solid ${P.borderSoft}`, boxShadow: '0 15px 40px -10px rgba(25,103,75,0.15)' }}>
                <Image src={assets.awardImg} alt="Research Excellence Award" width={400} height={300} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30, y: -30 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} style={{ position: 'absolute', right: 0, top: 0, width: '60%', zIndex: 20 }} className="hover:z-30 transition-transform duration-500 hover:-translate-y-3">
              <div style={{ background: '#fff', padding: 'clamp(6px, 1.2vw, 10px)', border: `1px solid ${P.borderSoft}`, boxShadow: '0 20px 50px -15px rgba(25,103,75,0.2)' }}>
                <Image src={assets.biospectraCover} alt="Biospectra Journal Cover" width={400} height={500} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </motion.div>
          </div>

          <div className="max-w-[550px] order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-[1.5px] bg-accent-mid" />
              <span className="text-label">Editorial Excellence</span>
            </div>
            <h2 className="heading-section mb-4" style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: P.deepPurple }}>Guided by Academic Rigor</h2>
            <p className="text-editorial text-sm opacity-85 leading-relaxed mb-6">Our journal is steered by a distinguished editorial board comprising leading scientists from premier global institutions.</p>
            <div className="flex flex-col gap-4">
              {[
                { icon: ShieldCheck, title: 'Peer-Reviewed', desc: 'A rigorous double-blind vetting process ensuring research integrity.' },
                { icon: Layers, title: 'Interdisciplinary', desc: 'Covering Molecular Biology, Zoology, and Biotechnology.' },
                { icon: Globe, title: 'Global Reach', desc: 'Indexed worldwide for innovative contributions to research.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 + 0.2, duration: 0.6 }} style={{ background: P.white, border: `1px solid ${P.borderSoft}`, padding: 'clamp(14px, 2.5vw, 20px)', display: 'flex', gap: 'clamp(14px, 2.5vw, 20px)', alignItems: 'flex-start', position: 'relative' }} className="group hover:bg-white transition-all duration-500 hover:shadow-lg">
                  <div style={{ position: 'absolute', left: -1, top: -1, bottom: -1, width: 3, background: `linear-gradient(to bottom, ${P.deepPurple}, ${P.magenta})`, transformOrigin: 'top', transform: 'scaleY(0)', transition: 'transform 0.5s ease' }} className="group-hover:scale-y-100" />
                  <div style={{ padding: 10, background: P.lavenderMist, border: `1px solid ${P.borderSoft}`, display: 'flex', borderRadius: '4px' }}><item.icon size={18} color={P.richPurple} /></div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 'clamp(16px, 1.8vw, 18px)', fontWeight: 800, color: P.deepPurple, marginBottom: 4, letterSpacing: '0.01em' }} className="group-hover:text-magenta transition-colors duration-300">{item.title}</h4>
                    <p style={{ fontSize: '12px', color: P.textBody, margin: 0, lineHeight: 1.5 }} className="opacity-90">{item.desc}</p>
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
