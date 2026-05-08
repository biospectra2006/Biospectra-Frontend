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
    deepPurple: '#064e3b',    // Emerald
    richPurple: '#19674b',
    magenta:    '#3eb489',    // Mint
    textBody:   '#1e293b',
    lavenderMist: '#f0fdf4',
    border: 'rgba(25,103,75,0.1)',
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
    <div className="relative pt-32 pb-20 min-h-screen overflow-hidden" style={{ background: '#fdfbf7' }}>
      {/* Background Lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex justify-between px-[5%] opacity-[0.03]">
           {[...Array(12)].map((_, i) => (
             <div key={i} className="w-px h-full bg-slate-900" />
           ))}
        </div>
      </div>

      <section className="relative px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-12 text-center">
            <div style={{ width: 40, height: 2, background: P.magenta, marginBottom: 20 }} />
            <h1 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase">{heroSection?.title || 'Madhawi Shyam Educational Trust'}</h1>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]" style={{ color: P.magenta }}>{heroSection?.content || 'Excellence in Scientific Research'}</span>
          </motion.div>

          {founderSection && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center mb-14 w-full">
              <div className="p-1.5 bg-white shadow-2xl shadow-emerald-900/10 mb-4" style={{ border: `1px solid ${P.border}` }}>
                {(() => {
                  const rawSrc = founderSection.images?.[0] || madhaviImg;
                  const imgSrc = rawSrc.startsWith('http') || rawSrc.startsWith('/') ? rawSrc : `/${rawSrc}`;
                  
                  return (
                    <Image 
                      src={imgSrc} 
                      alt="Founders of MSET" 
                      width={800} 
                      height={400} 
                      className="w-full max-w-[600px] h-auto object-cover" 
                      priority 
                      onError={(e) => {
                        // Use the default Madhavi image if local asset is missing on server
                        e.target.src = madhaviImg;
                        e.target.srcset = "";
                      }}
                    />
                  );
                })()}
              </div>
              <div className="text-center">
                <p style={{ color: P.deepPurple, letterSpacing: '0.05em' }} className="font-bold text-xs md:text-sm uppercase">{founderSection.content}</p>
                <p className="text-[9px] uppercase tracking-widest opacity-60 mt-1">{founderSection.title}</p>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 w-full prose prose-emerald">
            <div style={{ background: 'white', border: `1px solid ${P.border}`, padding: 'clamp(24px, 5vw, 40px)' }} className="relative shadow-sm">
              <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: P.richPurple }} />
              <p style={{ color: P.textBody }} className="text-sm leading-relaxed text-justify m-0">{historySection?.content || "Trust History..."}</p>
            </div>
            <div style={{ background: P.lavenderMist, border: `1px solid ${P.border}`, padding: 'clamp(24px, 5vw, 40px)' }} className="relative">
              <p style={{ color: P.textBody }} className="text-sm leading-relaxed text-justify m-0">{missionSection?.content || "The trust is dedicated to multidimensional creative activities in the field of education..."}</p>
            </div>
          </div>

          {publicationSection && (
            <div className="w-full mb-16 px-6 py-10 bg-white border border-dashed border-emerald-200 text-center flex flex-col items-center">
               <div className="relative w-20 h-20 mb-4">
                 <Image src={publicationSection.images?.[0] || "/assets/logo/biospectra-logo.jpg"} alt="Logo" fill className="object-contain" />
               </div>
               <h3 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-xl font-bold mb-4">{publicationSection.title}</h3>
               <p className="text-sm italic opacity-80 mb-2">{publicationSection.content}</p>
            </div>
          )}

          <div className="w-full">
            <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-2xl font-black text-center mb-10 uppercase tracking-tight">Recognition & Achievements</h2>
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
