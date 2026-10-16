'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Globe, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import ImageLightboxModal from '@/components/common/ImageLightboxModal';

const EditorialHighlights = ({ colors, assets }) => {
  const P = colors;
  const [activeModalItem, setActiveModalItem] = useState(null);

  const coverSrc = typeof assets.biospectraCover === 'string' ? assets.biospectraCover : assets.biospectraCover?.src;
  const awardSrc = typeof assets.awardImg === 'string' ? assets.awardImg : assets.awardImg?.src;

  return (
    <section className="relative overflow-hidden flex flex-col justify-center py-12 lg:py-16" style={{ background: '#eef4ec', borderTop: `1px solid ${P.borderSoft}` }}>
      {/* Background Lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex justify-between px-[5%] opacity-[0.03]">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-px h-full bg-slate-900" />
          ))}
        </div>
      </div>

      <div className="relative z-10" style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)', width: '100%' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Interactive Stacked Images */}
          <div className="relative w-full max-w-[380px] mx-auto aspect-[4/3.5] order-2 lg:order-1 mt-6 lg:mt-0">
            <div className="absolute top-[5%] right-[5%] w-[85%] h-[85%] bg-[#133215]/[0.02] border border-[#133215]/5 -rotate-2 pointer-events-none" />
            <div className="absolute bottom-[5%] left-[5%] w-[75%] h-[75%] bg-[#133215]/[0.01] border border-[#133215]/5 rotate-1 pointer-events-none" />
            
            {/* Award Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30, y: 30 }} 
              whileInView={{ opacity: 1, x: 0, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }} 
              style={{ position: 'absolute', left: 0, bottom: 0, width: '65%', zIndex: 10 }} 
              className="hover:z-30 transition-transform duration-500 hover:-translate-y-2 cursor-pointer group"
              onClick={() => setActiveModalItem({
                title: 'Research Excellence Recognition',
                subtitle: 'Madhawi-Shyam Educational Trust & Biospectra',
                src: awardSrc,
                filename: 'Biospectra_Research_Award.jpg'
              })}
              title="Click to view and download"
            >
              <div style={{ background: '#fff', padding: '6px', border: `1px solid rgba(19,50,21,0.08)`, boxShadow: '0 10px 30px -10px rgba(19,50,21,0.1)' }} className="relative overflow-hidden rounded-sm">
                <Image src={assets.awardImg} alt="Research Excellence Award" width={400} height={300} style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#133215] text-[11px] font-bold shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <ZoomIn size={13} className="text-[#92B775]" />
                    <span>View & Download</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Biospectra Cover Image - Click to Open & Download */}
            <motion.div 
              initial={{ opacity: 0, x: 30, y: -30 }} 
              whileInView={{ opacity: 1, x: 0, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, delay: 0.2 }} 
              style={{ position: 'absolute', right: 0, top: 0, width: '60%', zIndex: 20 }} 
              className="hover:z-30 transition-transform duration-500 hover:-translate-y-2 cursor-pointer group"
              onClick={() => setActiveModalItem({
                title: 'Biospectra Journal Cover',
                subtitle: 'An International Biannual Refereed Journal of Life Sciences (ISSN: 0973-7057)',
                src: coverSrc,
                filename: 'Biospectra_Journal_Cover.jpg'
              })}
              title="Click to view and download full journal cover"
            >
              <div style={{ background: '#fff', padding: '6px', border: `1px solid rgba(19,50,21,0.08)`, boxShadow: '0 15px 40px -10px rgba(19,50,21,0.15)' }} className="relative overflow-hidden rounded-sm">
                <Image src={assets.biospectraCover} alt="Biospectra Journal Cover" width={400} height={500} style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#133215] text-[11px] font-bold shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <ZoomIn size={13} className="text-[#92B775]" />
                    <span>View & Download</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="max-w-[500px] order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1.5px]" style={{ background: 'rgba(19,50,21,0.2)' }} />
              <span className="font-mono tracking-[0.2em] text-[9px] uppercase" style={{ color: 'rgba(19,50,21,0.4)' }}>Editorial Excellence</span>
            </div>
            <h2 className="heading-section mb-3" style={{ fontSize: 'clamp(22px, 2.5vw, 28px)', color: '#133215', fontWeight: 800 }}>Guided by Academic Rigor</h2>
            <p className="text-[13px] leading-relaxed mb-6" style={{ color: 'rgba(19,50,21,0.6)' }}>Our journal is steered by a distinguished editorial board comprising leading scientists from premier global institutions.</p>
            <div className="flex flex-col gap-3">
              {[
                { icon: ShieldCheck, title: 'Peer-Reviewed', desc: 'A rigorous double-blind vetting process ensuring research integrity.' },
                { icon: Layers, title: 'Interdisciplinary', desc: 'Covering Molecular Biology, Zoology, and Biotechnology.' },
                { icon: Globe, title: 'Global Reach', desc: 'Indexed worldwide for innovative contributions to research.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }} style={{ background: '#ffffff', border: `1px solid rgba(19,50,21,0.06)`, padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start', borderRadius: '4px' }} className="group transition-all duration-500 hover:shadow-lg">
                  <div style={{ padding: 8, background: '#eef4ec', border: `1px solid rgba(19,50,21,0.05)`, display: 'flex', borderRadius: '4px' }}><item.icon size={16} color="#133215" /></div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '16px', fontWeight: 800, color: '#133215', marginBottom: 2 }}>{item.title}</h4>
                    <p style={{ fontSize: '12px', color: 'rgba(19,50,21,0.6)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Download Modal mounted to document.body */}
      <ImageLightboxModal
        isOpen={!!activeModalItem}
        onClose={() => setActiveModalItem(null)}
        src={activeModalItem?.src}
        title={activeModalItem?.title}
        subtitle={activeModalItem?.subtitle}
        filename={activeModalItem?.filename}
      />
    </section>
  );
};

export default EditorialHighlights;
