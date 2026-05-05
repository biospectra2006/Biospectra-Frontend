'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck, UploadCloud, ArrowRight, Loader2 } from 'lucide-react';

const Contact = () => {
  const [inquiryType, setInquiryType] = useState('general');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { success: boolean, message: string }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('inquiryType', inquiryType);
    if (file) {
      formData.append('file', file);
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${baseUrl}/contact`, {
        method: 'POST',
        // Note: Do not set Content-Type header manually when using FormData
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ success: true, message: data.message });
        setFullName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
        setFile(null);
        setInquiryType('general'); 
      } else {
        setStatus({ success: false, message: data.message || 'Failed to send message.' });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus({ success: false, message: 'Server error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-20 pb-12 px-4 md:px-8 bg-slate-50 flex flex-col justify-center">
      <div className="relative z-10 max-w-5xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row border border-slate-200"
        >
          {/* LEFT PANEL - CONTACT INFO */}
          <div className="lg:w-5/12 bg-emerald-900 p-6 md:p-10 relative overflow-hidden text-white flex flex-col justify-between">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="relative z-10 mb-12">
              <h2 className="text-2xl md:text-3xl font-black mb-3 tracking-tight" style={{ color: '#ffffff', fontFamily: 'var(--font-crimson-pro), serif' }}>
                Contact Us
              </h2>
              <p className="text-emerald-100/90 text-sm leading-relaxed max-w-sm font-medium">
                Have a question or want to send a paper? We're happy to help. Reach out to us anytime.
              </p>
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-white/20 transition-all shadow-lg">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-100/70 uppercase tracking-widest block mb-1.5">Address</span>
                  <p className="text-white font-bold text-sm leading-relaxed drop-shadow-md">
                    Madhawi Shyam Educational Trust,<br />
                    Ranchi, Jharkhand, India.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-white/20 transition-all shadow-lg">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-100/70 uppercase tracking-widest block mb-1.5">Email</span>
                  <a href="mailto:biospectra@yahoo.com" className="text-white font-bold text-sm hover:text-emerald-300 transition-colors drop-shadow-md">
                    biospectra@yahoo.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-white/20 transition-all shadow-lg">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-100/70 uppercase tracking-widest block mb-1.5">Phone</span>
                  <p className="text-white font-bold text-sm drop-shadow-md">
                    +91 94313 89253
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-emerald-100/70 uppercase tracking-widest block mb-1">Working Hours</span>
                <span className="font-bold text-emerald-50 text-sm drop-shadow-md">Mon–Sat, 10:00 AM – 4:00 PM</span>
              </div>
              <Clock size={20} className="text-emerald-100/50" />
            </div>
          </div>

          {/* RIGHT PANEL - FORM */}
          <div className="lg:w-7/12 p-6 md:p-10 bg-white">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-crimson-pro), serif' }}>
                Send Us a Message
              </h3>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 text-emerald-900 rounded-full border border-emerald-100 shadow-sm">
                <ShieldCheck size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Safe & Secure</span>
              </div>
            </div>

            {status && (
              <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${status.success ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3 mb-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">What is this about?</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'general', label: 'General Question' },
                    { id: 'submission', label: 'Submit a Paper' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setInquiryType(type.id)}
                      className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        inquiryType === type.id 
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/10 border border-emerald-500' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Name</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="e.g. John Doe" 
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm font-bold text-slate-900 placeholder-slate-400" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Email <span className="text-red-400">*</span></label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="john@university.edu" 
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm font-bold text-slate-900 placeholder-slate-400" 
                  />
                </div>
              </div>

              <div className={`grid grid-cols-1 ${inquiryType === 'submission' ? 'md:grid-cols-2' : ''} gap-6`}>
                {inquiryType === 'submission' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Phone Number <span className="text-red-400">*</span></label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+91 98765 43210" 
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm font-bold text-slate-900 placeholder-slate-400" 
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Subject</label>
                  <input 
                    type="text" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder={inquiryType === 'submission' ? "Title of your paper" : "What is your question about?"} 
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm font-bold text-slate-900 placeholder-slate-400" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Message</label>
                <textarea 
                  rows={3} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Write your message here..." 
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm font-bold text-slate-900 placeholder-slate-400 resize-none" 
                />
              </div>

              <div className={`pt-3 flex ${inquiryType === 'submission' ? 'gap-3' : ''}`}>
                {inquiryType === 'submission' && (
                  <label className="group flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-50 border border-emerald-200 cursor-pointer hover:bg-emerald-100 hover:border-emerald-400 transition-all shrink-0">
                    <UploadCloud size={16} className="text-emerald-600" />
                    <span className="text-[11px] font-black uppercase tracking-[0.15em] text-emerald-800">
                      {file ? file.name.slice(0, 15) + '...' : 'Upload Paper'}
                    </span>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
                  </label>
                )}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-grow group bg-emerald-900 text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-3 text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/10 hover:bg-emerald-800 hover:shadow-emerald-900/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> <span>Sending...</span></>
                  ) : (
                    <><span>Send Message</span><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
