'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, Info, Send } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

const Submit = () => {
  const [submitted, setSubmitted] = useState(false);
  const P = {
    deepPurple: '#064e3b',    // Emerald
    richPurple: '#19674b',
    magenta:    '#3eb489',    // Mint
    textBody:   '#1e293b',
    textMuted:  '#64748b',
    lavenderMist: '#f0fdf4',
    border:     'rgba(25,103,75,0.1)',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div 
        className="pt-40 pb-20 min-h-screen flex items-center justify-center"
        style={{ background: '#fdfcff' }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ background: 'white', border: `1px solid ${P.border}` }}
          className="max-w-md mx-auto p-12 shadow-2xl shadow-emerald-900/10 text-center"
        >
          <div 
            style={{ background: P.lavenderMist, color: P.magenta }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-10"
          >
            <CheckCircle size={40} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-3xl font-black mb-4 uppercase">Submission Received</h2>
          <p style={{ color: P.textBody }} className="text-sm mb-10 leading-relaxed opacity-80">
            Thank you for your submission to Biospectra Journal. Our editorial board will review your manuscript and get back to you via email within 45 days.
          </p>
          <button 
            onClick={() => setSubmitted(false)} 
            style={{ background: P.deepPurple }}
            className="w-full py-4 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-800 transition-all"
          >
            Submit Another Article
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="pt-40 pb-20 min-h-screen"
      style={{ background: '#fdfcff' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
          {/* Form Side */}
          <div className="lg:w-3/5">
            <div 
              style={{ background: 'white', border: `1px solid ${P.border}` }}
              className="p-8 md:p-14 shadow-xl shadow-emerald-900/5 relative"
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: 6, height: 100, background: P.magenta }} />
              
              <div className="mb-12">
                <h1 
                  style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
                  className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase"
                >
                  Submit Article
                </h1>
                <p style={{ color: P.textMuted }} className="text-sm font-medium">Please provide your original research or review manuscript details.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label style={{ color: P.deepPurple }} className="text-[10px] font-black uppercase tracking-[0.1em]">Author(s) Name *</label>
                    <input type="text" required className="w-full px-4 py-3 border-b border-slate-200 bg-slate-50/30 focus:border-magenta focus:bg-white outline-none transition-all text-sm placeholder:text-slate-300" placeholder="Full names" />
                  </div>
                  <div className="space-y-2">
                    <label style={{ color: P.deepPurple }} className="text-[10px] font-black uppercase tracking-[0.1em]">Email Address *</label>
                    <input type="email" required className="w-full px-4 py-3 border-b border-slate-200 bg-slate-50/30 focus:border-magenta focus:bg-white outline-none transition-all text-sm placeholder:text-slate-300" placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label style={{ color: P.deepPurple }} className="text-[10px] font-black uppercase tracking-[0.1em]">Manuscript Subject *</label>
                    <input type="text" required className="w-full px-4 py-3 border-b border-slate-200 bg-slate-50/30 focus:border-magenta focus:bg-white outline-none transition-all text-sm placeholder:text-slate-300" placeholder="General subject" />
                  </div>
                  <div className="space-y-2">
                    <label style={{ color: P.deepPurple }} className="text-[10px] font-black uppercase tracking-[0.1em]">Research Area *</label>
                    <select className="w-full px-4 py-3 border-b border-slate-200 bg-slate-50/30 focus:border-magenta focus:bg-white outline-none transition-all text-sm appearance-none">
                      <option>Zoology</option>
                      <option>Botany</option>
                      <option>Biotechnology</option>
                      <option>Life Science - General</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label style={{ color: P.deepPurple }} className="text-[10px] font-black uppercase tracking-[0.1em]">Upload Manuscript (Doc/PDF) *</label>
                  <label className="block border-2 border-dashed border-emerald-100 p-12 text-center hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer group">
                    <input type="file" className="hidden" />
                    <Upload className="mx-auto text-emerald-300 group-hover:text-emerald-600 mb-4 transition-colors" size={32} />
                    <p style={{ color: P.textBody }} className="font-bold text-sm">Click to upload or drag and drop</p>
                    <p style={{ color: P.textMuted }} className="text-[10px] mt-2 uppercase tracking-widest">Maximum file size 10MB</p>
                  </label>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    style={{ background: P.deepPurple }}
                    className="w-full py-5 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-emerald-800 transition-all flex items-center justify-center active:scale-[0.98]"
                  >
                    Send Submission <Send size={16} className="ml-3" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Instructions Side */}
          <div className="lg:w-2/5 space-y-10">
            <div 
              style={{ background: `linear-gradient(135deg, ${P.deepPurple}, #022c22)`, color: 'white' }}
              className="p-10 shadow-3xl relative border border-emerald-900/20 overflow-hidden"
            >
              <div 
                style={{ position: 'absolute', bottom: -50, right: -50, width: 200, height: 200, background: P.magenta, opacity: 0.1, borderRadius: '50%' }}
              />
              <h3 
                style={{ fontFamily: 'var(--font-crimson-pro), serif' }}
                className="text-2xl font-bold mb-10 flex items-center italic"
              >
                Guidelines for Authors
              </h3>
              <div className="space-y-8 text-sm opacity-90">
                {[
                  'Materials typed in double space MS Word on A-4 size paper.',
                  'Submit at least 45 days in advance for editorial board review.',
                  'References must follow academic standards and be numbered.',
                  'Original research only — plagiarism is strictly prohibited.'
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div 
                      style={{ background: P.magenta }}
                      className="w-6 h-6 flex items-center justify-center text-[10px] font-black shrink-0"
                    >
                      {i + 1}
                    </div>
                    <p className="leading-relaxed font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div 
              style={{ background: 'white', border: `1px solid ${P.border}` }}
              className="p-8 shadow-xl shadow-emerald-900/5 group"
            >
              <h4 
                style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
                className="text-xl font-bold mb-4 flex items-center uppercase tracking-tight"
              >
                <Info size={18} style={{ color: P.magenta }} className="mr-3" /> Need Help?
              </h4>
              <p style={{ color: P.textBody }} className="text-sm leading-relaxed opacity-80">
                If you encounter any issues with the online submission system, please email your manuscript directly to <strong>biospectra@yahoo.com</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
