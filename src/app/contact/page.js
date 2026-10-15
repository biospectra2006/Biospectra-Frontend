'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck, UploadCloud, ArrowRight, Loader2, Pencil, MessageSquare } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const ContactContent = () => {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  
  const [inquiryType, setInquiryType] = useState(typeParam === 'submission' ? 'submission' : 'general');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { success: boolean, message: string }

  // Dynamic Contact Settings
  const [settings, setSettings] = useState({
    contactPhone: '+91 94313 89253',
    contactWhatsapp: '+91 94313 89253',
    contactEmail: 'biospectra@yahoo.com',
    contactAddress: 'Madhawi Shyam Educational Trust, Ranchi, Jharkhand, India.',
    workingHours: 'Mon–Sat, 10:00 AM – 4:00 PM'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/settings`);
        if (res.ok) {
          const data = await res.json();
          setSettings(prev => ({
            contactPhone: data.contactPhone || prev.contactPhone,
            contactWhatsapp: data.contactWhatsapp || data.contactPhone || prev.contactWhatsapp,
            contactEmail: data.contactEmail || prev.contactEmail,
            contactAddress: data.contactAddress || prev.contactAddress,
            workingHours: data.workingHours || prev.workingHours
          }));
        }
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    };
    fetchSettings();
  }, []);

  const rawWhatsapp = settings.contactWhatsapp || settings.contactPhone || '+91 94313 89253';
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}`;

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
    <div className="relative min-h-screen overflow-hidden pt-32 pb-12 px-4 md:px-8 flex flex-col justify-center" style={{ background: '#eef4ec' }}>
      {/* Background Lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex justify-between px-[5%] opacity-[0.03]">
           {[...Array(12)].map((_, i) => (
             <div key={i} className="w-px h-full bg-slate-900" />
           ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row border border-slate-200"
        >
          {/* LEFT PANEL - CONTACT INFO */}
          <div className="lg:w-5/12 bg-[#133215] p-6 md:p-10 relative overflow-hidden text-white flex flex-col justify-between">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="relative z-10 mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: '#ffffff', fontFamily: 'var(--font-playfair), serif' }}>
                  Contact Us
                </h2>
                <a
                  href="http://localhost:5173"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white text-xs font-bold transition-all border border-white/15 shadow-sm"
                  title="Edit Contact details in Admin Panel"
                >
                  <Pencil size={12} />
                  <span>Edit</span>
                </a>
              </div>
              <p className="text-emerald-100/90 text-sm leading-relaxed max-w-sm font-medium">
                Have a question or want to send a paper? We're happy to help. Reach out to us anytime.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              {/* WhatsApp Button */}
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3.5 px-4 py-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 rounded-2xl transition-all duration-200 group text-white hover:scale-[1.02] shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-md">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-200 uppercase tracking-widest block">WhatsApp Us</span>
                  <span className="text-white font-bold text-sm tracking-wide">{rawWhatsapp}</span>
                </div>
              </a>

              {/* Phone */}
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-white/20 transition-all shadow-lg">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-100/70 uppercase tracking-widest block mb-1">Phone</span>
                  <a href={`tel:${settings.contactPhone}`} className="text-white font-bold text-sm hover:text-emerald-300 transition-colors drop-shadow-md">
                    {settings.contactPhone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-white/20 transition-all shadow-lg">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-100/70 uppercase tracking-widest block mb-1">Email</span>
                  <a href={`mailto:${settings.contactEmail}`} className="text-white font-bold text-sm hover:text-emerald-300 transition-colors drop-shadow-md">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-white/20 transition-all shadow-lg">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-100/70 uppercase tracking-widest block mb-1">Address</span>
                  <p className="text-white font-bold text-sm leading-relaxed drop-shadow-md">
                    {settings.contactAddress}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-emerald-100/70 uppercase tracking-widest block mb-1">Working Hours</span>
                <span className="font-bold text-emerald-50 text-sm drop-shadow-md">{settings.workingHours}</span>
              </div>
              <Clock size={20} className="text-emerald-100/50" />
            </div>
          </div>

          {/* RIGHT PANEL - FORM */}
          <div className="lg:w-7/12 p-6 md:p-10 bg-white">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-playfair), serif' }}>
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
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                        inquiryType === type.id 
                          ? 'bg-[#133215] text-white shadow-md' 
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
                  <label className="group flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-50 border border-emerald-200 cursor-pointer hover:bg-emerald-100 hover:border-emerald-400 transition-all shrink-0" title="Upload Word (.doc, .docx) documents only">
                    <UploadCloud size={16} className="text-emerald-600" />
                    <span className="text-[11px] font-black uppercase tracking-[0.15em] text-emerald-800">
                      {file ? file.name.slice(0, 15) + '...' : 'Upload Word Doc'}
                    </span>
                    <input type="file" className="hidden" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => setFile(e.target.files[0])} />
                  </label>
                )}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-grow group bg-[#133215] text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-3 text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#133215]/10 hover:bg-[#133215]/90 hover:shadow-[#133215]/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
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

const Contact = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#eef4ec]" />}>
      <ContactContent />
    </Suspense>
  );
};

export default Contact;
