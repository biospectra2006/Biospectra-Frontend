'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Eye, ZoomIn } from 'lucide-react';
import ImageLightboxModal from '@/components/common/ImageLightboxModal';

const Recognition = ({ colors, assets }) => {
  const P = colors;
  const [sjifNumber, setSjifNumber] = useState('8.592');
  const [sjifYear, setSjifYear] = useState('2023');
  const [certificateImage, setCertificateImage] = useState(assets.certificateImg);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_URL}/settings`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.sjifNumber) setSjifNumber(data.sjifNumber);
          if (data.sjifYear) setSjifYear(data.sjifYear);
          if (data.certificateImageUrl) setCertificateImage(data.certificateImageUrl);
        }
      } catch (err) {
        console.error('Recognition settings fetch error:', err);
      }
    };
    fetchSettings();
  }, []);

  const certSrc = typeof certificateImage === 'string' ? certificateImage : certificateImage?.src || '';

  return (
    <section className="relative overflow-hidden" style={{ background: '#eef4ec', color: '#133215', borderTop: `1px solid ${P.borderSoft}`, padding: 'clamp(40px, 6vw, 80px) 0' }}>
      {/* Background Lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex justify-between px-[5%] opacity-[0.05]">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-px h-full bg-[#133215]" />
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: `rgba(146, 183, 117, 0.1)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)', position: 'relative', zIndex: 10 }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          <div className="w-full lg:w-[55%] text-center lg:text-left">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div style={{ width: 36, height: 2, background: '#92B775', borderRadius: 1 }} />
                <span style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 800, color: '#92B775', fontFamily: 'var(--font-inter), sans-serif' }}>Official Accreditation</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(36px, 5.5vw, 52px)', fontWeight: 800, color: '#133215', lineHeight: 1.08, letterSpacing: '-0.01em', margin: '0 0 20px 0' }}>
                World-Class Scientific<br className="hidden lg:block" /> Standards
              </h2>
              <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'rgba(19,50,21,0.7)', lineHeight: 1.85, margin: '0 0 32px 0', letterSpacing: '0.01em', maxWidth: 540, fontFamily: 'var(--font-inter), sans-serif' }} className="mx-auto lg:mx-0">
                Biospectra is proud to be part of the <strong style={{ color: '#133215', fontWeight: 700 }}>SJIF Journals Master List</strong>, a recognition of our unwavering dedication to scientific quality and research impact.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                {/* Clickable SJIF Card with modern sans-serif font */}
                <motion.div 
                  whileHover={{ scale: 1.03, translateY: -2 }} 
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsModalOpen(true);
                    }
                  }}
                  title="Click to view and download official SJIF Certificate"
                  className="group cursor-pointer select-none transition-all duration-300"
                  style={{ 
                    display: 'inline-flex', 
                    flexDirection: 'column', 
                    background: 'rgba(19,50,21,0.05)', 
                    border: '1.5px solid rgba(19,50,21,0.12)', 
                    padding: '20px 30px', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(19,50,21,0.04)'
                  }}
                >
                  <span style={{ fontSize: 9.5, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 800, color: '#133215', marginBottom: 6, fontFamily: 'var(--font-inter), sans-serif' }}>
                    SJIF Impact Factor
                  </span>
                  
                  <div className="flex items-baseline gap-2.5">
                    {/* Modern, bold, clean numerical font */}
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: 'clamp(42px, 5.5vw, 54px)', 
                        fontWeight: 900, 
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        background: 'linear-gradient(135deg, #133215 0%, #235427 50%, #92B775 100%)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent', 
                        backgroundClip: 'text' 
                      }}
                    >
                      {sjifNumber}
                    </span>
                    <span 
                      style={{ 
                        fontSize: 'clamp(13px, 1.3vw, 15px)', 
                        color: 'rgba(19,50,21,0.55)', 
                        fontWeight: 700, 
                        fontFamily: 'var(--font-inter), sans-serif',
                        letterSpacing: '0.01em'
                      }}
                    >
                      ({sjifYear})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-[#133215]/10 text-[#133215]/60 group-hover:text-[#133215] text-[10px] font-bold uppercase tracking-wider transition-colors">
                    <Eye size={12} className="text-[#92B775]" />
                    <span>View Certificate</span>
                  </div>
                </motion.div>
                
                <div className="flex flex-col items-center sm:items-start gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#92B775', boxShadow: '0 0 8px rgba(146,183,117,0.4)' }} />
                    <span style={{ fontWeight: 700, letterSpacing: '0.12em', color: '#133215', fontSize: 13, textTransform: 'uppercase', fontFamily: 'var(--font-inter), sans-serif' }}>Peer Reviewed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#92B775', boxShadow: '0 0 8px rgba(146,183,117,0.4)' }} />
                    <span style={{ fontWeight: 700, letterSpacing: '0.12em', color: '#133215', fontSize: 13, textTransform: 'uppercase', fontFamily: 'var(--font-inter), sans-serif' }}>Global Indexing</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Certificate on Right - Clickable with Hover Zoom */}
          <div className="w-full lg:w-[40%] flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.85, rotate: 6 }} 
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 1, ease: 'easeOut' }} 
              onClick={() => setIsModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsModalOpen(true);
                }
              }}
              className="relative group cursor-pointer"
              title="Click to view and download full certificate"
            >
              <div className="absolute inset-0 bg-[#92B775]/20 blur-[60px] rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div style={{ background: '#ffffff', border: '1px solid rgba(19,50,21,0.08)', padding: 14, borderRadius: 8, boxShadow: '0 25px 50px rgba(19,50,21,0.08), 0 8px 20px rgba(19,50,21,0.04)' }} className="transition-transform duration-300 group-hover:scale-[1.02] relative overflow-hidden">
                <Image 
                  src={certificateImage} 
                  alt="SJIF Certificate" 
                  width={450} 
                  height={600} 
                  style={{ width: '100%', maxWidth: 380, height: 'auto', display: 'block', borderRadius: 4 }} 
                  className="shadow-lg border border-black/5" 
                  unoptimized={typeof certificateImage === 'string' && certificateImage.startsWith('http')}
                />
                
                {/* Floating pill indicator on hover */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#133215] text-xs font-black uppercase tracking-wider shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn size={14} className="text-[#92B775]" />
                    <span>View & Download</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Certificate Lightbox / Download Modal mounted to document.body */}
      <ImageLightboxModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={certSrc}
        title="Official SJIF Accreditation Certificate"
        subtitle={`Scientific Journal Impact Factor: ${sjifNumber} · (${sjifYear})`}
        filename={`SJIF_Certificate_${sjifYear}.jpg`}
      />
    </section>
  );
};

export default Recognition;
