'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const madhaviImg = '/assets/logo/madhavi.jpg';
const award1Img = '/assets/content/award2.jpg';
const award2Img = '/assets/content/award2(2).jpg';
const award3Img = '/assets/content/award1.jpg';

const AboutClient = () => {
  const [sections, setSections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSections = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_URL}/about`);
        const data = await res.json();
        setSections(data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  const getSection = (type) => sections.find(s => s.sectionType === type);

  const P = {
    deepPurple: '#133215',    // Brand Dark Green
    richPurple: '#133215',
    magenta:    '#92B775',    // Brand Lime Green
    textBody:   '#133215',
    lavenderMist: 'transparent',
    border: 'rgba(19, 50, 21, 0.1)',
  };

  const heroSection = getSection('hero');
  const founderSection = getSection('founder');
  const historySection = getSection('history');
  const missionSection = getSection('mission');
  const publicationSection = getSection('publication');

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Academic Profile</p>
      </div>
    );
  }

  return (
    <div className="relative pt-20 md:pt-32 pb-20 min-h-screen overflow-hidden" style={{ background: '#F9FBF7' }}>
      {/* Background Lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex justify-between px-[5%] opacity-[0.03]">
           {[...Array(12)].map((_, i) => (
             <div key={i} className="w-px h-full bg-slate-900" />
           ))}
        </div>
      </div>

      <section className="relative px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-10 md:mb-16 text-center">
            <div style={{ width: 40, height: 2, background: P.magenta, marginBottom: 16 }} />
            <h1 style={{ fontFamily: 'var(--font-playfair), serif', color: P.deepPurple }} className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight mb-3 uppercase px-4 md:px-0 leading-tight">{heroSection?.title || 'Madhawi Shyam Educational Trust'}</h1>
            <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.3em]" style={{ color: P.magenta }}>{heroSection?.content || 'Excellence in Scientific Research'}</span>
          </motion.div>

          {founderSection && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center mb-12 md:mb-20 w-full px-2">
              <div className="p-1 md:p-2 bg-white shadow-2xl shadow-emerald-900/10 mb-6" style={{ border: `1px solid ${P.border}` }}>
                {(() => {
                  const rawSrc = founderSection.images?.[0] || madhaviImg;
                  const imgSrc = rawSrc.startsWith('http') || rawSrc.startsWith('/') ? rawSrc : `/${rawSrc}`;
                  
                  return (
                    <Image 
                      src={imgSrc} 
                      alt="Founders of MSET" 
                      width={800} 
                      height={400} 
                      className="w-full max-w-[600px] md:max-w-[700px] h-auto object-cover" 
                      priority 
                      onError={(e) => {
                        e.target.src = madhaviImg;
                        e.target.srcset = "";
                      }}
                    />
                  );
                })()}
              </div>
              <div className="text-center px-4">
                <p style={{ color: P.deepPurple, letterSpacing: '0.05em' }} className="font-bold text-[10px] md:text-sm uppercase leading-relaxed">{founderSection.content}</p>
                <p className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-60 mt-2">{founderSection.title}</p>
              </div>
            </motion.div>
          )}

          {/* BRAND IDENTITY TITLES - Centered & Bold */}
          <div className="w-full flex flex-col items-center gap-6 mb-16 text-center">
            {publicationSection && (
              <div className="flex flex-col gap-6">
                <p 
                  className="font-medium text-sm md:text-base leading-tight tracking-tight uppercase"
                  style={{ color: P.deepPurple }}
                >
                  Regn. No: 20560/IV-1815/2005 & its Life Science Academic & Research Body/Forum:
                </p>
                <p 
                  className="font-medium text-sm md:text-base leading-tight tracking-tight uppercase"
                  style={{ color: P.deepPurple }}
                >
                  International Consortium of Contemporary Biologists (ICCB) its official publication
                </p>
                <p 
                  className="font-light text-sm md:text-base leading-tight tracking-tight uppercase"
                  style={{ color: P.deepPurple }}
                >
                  <span className="font-bold">BIOSPECTRA:</span> ISSN-0973-7057 (An International Biannual Referred Journal of Life Sciences)
                </p>
              </div>
            )}
          </div>

          {/* MAIN HISTORY TEXT - Justified & Clean */}
          <div className="w-full mb-20 max-w-5xl px-6 md:px-0">
             <div 
               className="text-[14px] md:text-lg leading-[1.8] text-justify font-medium"
               style={{ color: P.deepPurple, opacity: 0.95 }}
             >
                {historySection?.content?.split('\n').map((para, i) => (
                  <p key={i} className="mb-8 first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:leading-[1] first-letter:text-[#133215]">
                    {para}
                  </p>
                )) || "Trust History..."}
             </div>
          </div>

          <div className="w-full">
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', color: P.deepPurple }} className="text-2xl font-black text-center mb-10 uppercase tracking-tight">Recognition & Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[award1Img, award2Img, award3Img].map((imgSrc, idx) => (
                <motion.div key={idx} whileHover={{ y: -5 }} style={{ background: 'white', border: `1px solid ${P.border}` }} className="p-1.5 shadow-sm group">
                  <div className="overflow-hidden aspect-[4/3] relative">
                    <Image src={imgSrc} alt={`Award ceremony ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutClient;
