'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';


const EditorialBoard = () => {
  const [members, setMembers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMembers = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/editorial`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        
        if (data && data.length > 0) {
          setMembers(data);
        } else {
          setMembers([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const categorized = React.useMemo(() => {
    return {
      core: members.filter(m => m.memberType === 'core'),
      national_advisory: members.filter(m => m.memberType === 'national_advisory'),
      national_editor: members.filter(m => m.memberType === 'national_editor'),
      foreign_editor: members.filter(m => m.memberType === 'foreign_editor'),
      strategic: members.filter(m => m.memberType === 'strategic')
    };
  }, [members]);

  const P = {
    deepPurple: '#064e3b',    // Emerald
    richPurple: '#19674b',
    magenta:    '#3eb489',    // Mint
    gold:       '#c5a059',
    textBody:   '#1e293b',
    textMuted:  '#64748b',
    lavender:   '#f0fff4',
    white:      '#ffffff',
    border:     'rgba(25, 103, 75, 0.08)',
    glass:      'rgba(255, 255, 255, 0.7)',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen selection:bg-emerald-200 overflow-hidden" style={{ background: '#fdfbf7' }}>
      {/* Background Lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute inset-0 flex justify-between px-[5%] opacity-[0.03]">
           {[...Array(12)].map((_, i) => (
             <div key={i} className="w-px h-full bg-slate-900" />
           ))}
        </div>
      </div>

      <div className="relative z-10 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600 mb-6 border border-emerald-100">
                Scientific Directory
              </span>
              <h1 
                style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
                className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
              >
                Editorial Board
              </h1>
              <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed uppercase tracking-widest opacity-80">
                Biospectra Journal Global Team • Shaping the Future of Biological Sciences
              </p>
              <div className="mt-10 flex justify-center items-center gap-4">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-emerald-200" />
                <div className="w-2 h-2 rotate-45 border border-emerald-300" />
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-emerald-200" />
              </div>
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
            
            {/* Executive Editorial Team */}
            <section>
              <div className="flex items-center gap-6 mb-12 px-4">
                <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-2xl font-black uppercase tracking-wider shrink-0">
                  Executive Leadership
                </h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-100 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {categorized.core?.map((member, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative bg-white p-8 rounded-2xl shadow-sm border border-emerald-50 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-magenta rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <span style={{ color: P.magenta }} className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">
                      {member.role}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-2xl font-bold mb-4 leading-tight">
                      {member.name}
                    </h3>
                    
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center text-[11px] font-medium text-gray-400 group-hover:text-emerald-600 transition-colors"
                      >
                        <Mail size={12} className="mr-2" />
                        {member.email}
                      </a>
                    )}
                    
                    <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-10 transition-opacity">
                      <span className="text-4xl font-black italic text-emerald-900">{idx + 1}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>            {/* National Advisory Board Section */}
            <section className="px-4">
              <div className="flex items-center gap-6 mb-10">
                <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-xl font-bold uppercase tracking-widest shrink-0">
                  National Advisory Board
                </h2>
                <div className="h-[1px] flex-grow bg-emerald-100/50" />
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {categorized.national_advisory?.map((member, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="flex flex-col p-5 bg-white rounded-xl border border-emerald-50/50 hover:bg-emerald-50/30 transition-colors group"
                  >
                    <h4 style={{ color: P.deepPurple }} className="font-bold text-sm mb-1 group-hover:text-emerald-700 transition-colors">{member.name}</h4>
                    <div className="flex items-center gap-2">
                      {member.department && (
                        <span className="text-[10px] font-bold text-magenta uppercase tracking-tight">{member.department}</span>
                      )}
                      {member.location && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="text-[10px] text-gray-400 italic">{member.location}</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* National Editors Section */}
            <section className="px-4">
              <div className="flex items-center gap-6 mb-10">
                <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-xl font-bold uppercase tracking-widest shrink-0">
                  National Editorial Panel
                </h2>
                <div className="h-[1px] flex-grow bg-emerald-100/50" />
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {categorized.national_editor?.map((member, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-emerald-50/40 hover:border-emerald-200 transition-all group"
                  >
                    <h4 className="text-xs font-bold text-gray-800 mb-1 group-hover:text-emerald-700 transition-colors">{member.name}</h4>
                    <p className="text-[10px] text-gray-400 leading-tight">
                      {member.department && <span className="text-emerald-400 font-semibold">{member.department}</span>}
                      {member.location && <span> • {member.location}</span>}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </div>

            {/* Bottom Row: Foreign & Strategic */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 pt-10 lg:pt-12 border-t border-emerald-100 px-4">
              
              {/* Foreign Editors */}
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-xl font-bold uppercase tracking-widest">
                    International Correspondents
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categorized.foreign_editor?.map((member, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-5 bg-emerald-900/5 rounded-xl border border-emerald-100/20">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                        <span className="text-xs font-bold text-emerald-600">{member.location?.substring(0, 2).toUpperCase() || 'GL'}</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-800 mb-0.5">{member.name}</h4>
                        <p className="text-[10px] text-emerald-500 font-medium uppercase tracking-wider">{member.location || 'International'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Strategic Team */}
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-xl font-bold uppercase tracking-widest">
                    Strategic Resourcing
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categorized.strategic?.map((member, idx) => (
                    <div key={idx} className="group p-5 bg-white rounded-xl border border-emerald-50 hover:bg-emerald-900 hover:border-emerald-900 transition-all duration-300">
                      <h4 className="text-sm font-bold text-gray-800 group-hover:text-white transition-colors mb-1">{member.name}</h4>
                      <span className="text-[9px] font-black tracking-widest uppercase text-magenta group-hover:text-emerald-200 transition-colors">
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

            </div>

        </div>
      </div>
      
      {/* Scroll to Top Hint */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-10 h-10 rounded-full bg-white shadow-lg border border-emerald-100 flex items-center justify-center text-emerald-500 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default EditorialBoard;
