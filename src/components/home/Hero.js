'use client';
import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import SearchBar from './SearchBar';

const ModelSkeleton = () => (
  <div className="w-full h-[380px] lg:h-[520px] bg-white/5 border border-white/10 rounded-2xl animate-pulse backdrop-blur-sm flex items-center justify-center">
    <div className="w-12 h-12 rounded-full border-t-2 border-white/30 animate-spin"></div>
  </div>
);

const JournalModel3D = dynamic(() => import('@/components/common/JournalModel3D'), { 
  ssr: false,
  loading: () => <ModelSkeleton />
});

const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const mouseX = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });
  const revealSize = useSpring(0, { stiffness: 120, damping: 22 });

  const maskImage = useMotionTemplate`radial-gradient(circle ${revealSize}px at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    
    const xPct = mX / rect.width - 0.5;
    const yPct = mY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
    
    mouseX.set(mX);
    mouseY.set(mY);

    const inDnaZone = mX / rect.width < 0.55;
    revealSize.set(inDnaZone ? 380 : 0);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    revealSize.set(0);
  };

  const [sjifNumber, setSjifNumber] = React.useState('8.546');
  const [heroImageUrl, setHeroImageUrl] = React.useState(null);

  React.useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_URL}/settings`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.sjifNumber) setSjifNumber(data.sjifNumber);
          if (data.heroImageUrl) setHeroImageUrl(data.heroImageUrl);
        }
      } catch (err) {
        console.error('Settings fetch error:', err);
      }
    };
    fetchSettingsData();
  }, []);

  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-center"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full flex-grow overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Image
              src="/assets/landing-bg/green-pallet.png"
              alt="Green DNA"
              fill
              className="object-cover object-[25%_center] md:object-center"
              priority
            sizes="100vw"
          />
          {/* Dark overlays for improved text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent lg:from-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
        </div>

        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden" 
          style={{ WebkitMaskImage: maskImage, maskImage: maskImage }} 
        >
            <Image
              src="/assets/landing-bg/just-dna.png"
              alt="Purple DNA Reveal"
              fill
              className="object-cover object-[25%_center] md:object-center"
              priority
            sizes="100vw"
          />
        </motion.div>

        {/* Structural Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]" 
             style={{ 
               backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
               backgroundSize: '80px 80px',
               maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
               WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
             }} 
        />

        {/* Blueprint Markers */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">

          {/* Center Vertical Axis */}
          <div className="absolute top-0 bottom-0 left-[50%] w-px bg-linear-to-b from-transparent via-white/10 to-transparent" />
          
          {/* Bottom Right Data Block */}
          <div className="absolute bottom-[10%] right-[5%] flex flex-col items-end gap-1">
             <div className="w-12 h-px bg-white/30" />
             <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.3em]">SEC_ARCHIVE_DATA</span>
          </div>

          {/* Large Background Text */}
          <div className="absolute top-[22%] left-[4%] pointer-events-none" style={{ fontSize: 'clamp(100px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.8, color: '#fff', letterSpacing: '-0.05em', opacity: 0.04 }}>
             BIO
          </div>
          <div className="absolute bottom-[5%] right-[4%] pointer-events-none" style={{ fontSize: 'clamp(100px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.8, color: '#fff', letterSpacing: '-0.05em', opacity: 0.04 }}>
             SCI
          </div>
        </div>

        <div className="relative w-full min-h-[100svh] flex flex-row items-stretch z-10">
          <div className="flex flex-col justify-center flex-1 w-full px-6 lg:pl-[5%] lg:pr-8 z-20 pt-32 pb-80 lg:py-24 lg:pb-60 relative mt-12 lg:mt-16">
            {/* Structural corner decorations */}
            <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-white/10 rounded-tl-lg pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-white/10 rounded-br-lg pointer-events-none" />
            
           
            <h1 className="font-normal leading-none mb-5 flex overflow-hidden" style={{ 
              fontSize: 'clamp(40px, 8vw, 75px)', 
              background: 'linear-gradient(180deg, #ffffff 0%, #e2e2e2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.12em', 
              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5)) drop-shadow(0 0 15px rgba(255,255,255,0.1))', 
              fontFamily: 'var(--font-playfair), var(--font-playfair), Georgia, serif' 
            }}>
              {"BIOSPECTRA".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 1, 
                    delay: i * 0.08, 
                    ease: [0.215, 0.61, 0.355, 1] 
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              className="flex flex-col pl-4 lg:pl-5 border-l-[1.5px] border-[#92B775] ml-1 mb-10"
            >
              <span className="text-[#F3E8D3]/90 font-medium tracking-[0.25em] lg:tracking-[0.35em] text-[9px] sm:text-[10px] lg:text-[11px] leading-relaxed uppercase block" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                International Biannual Refereed
              </span>
              <span className="text-white font-bold tracking-[0.15em] lg:tracking-[0.2em] text-[12px] sm:text-[14px] lg:text-[18px] leading-tight uppercase mt-1.5" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Journal of Life Sciences
              </span>
            </motion.div>
            <div className="flex flex-row items-stretch gap-3 lg:gap-4 h-[40px] lg:h-[44px]">
              <Link href="/archive" className="flex-1 sm:flex-none">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-full bg-white/5 text-white border border-white/20 backdrop-blur-md font-bold tracking-[0.2em] text-[8px] sm:text-[9px] uppercase px-4 lg:px-6 rounded-md shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white hover:text-[#133215] transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Issues</span>
                  <ArrowRight size={10} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.button>
              </Link>
              <div className="flex flex-col justify-center bg-white/5 backdrop-blur-md border border-white/20 rounded-md px-3.5 lg:px-4 shadow-[0_0_20px_rgba(255,255,255,0.02)] h-full">
                <span className="text-[#F3E8D3]/70 font-mono tracking-[0.2em] text-[6px] sm:text-[7px] uppercase mb-0.5">IMPACT FACTOR</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-black tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] text-xs sm:text-sm leading-none">SJIF {sjifNumber}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#92B775] animate-pulse shadow-[0_0_10px_rgba(146,183,117,0.6)]" />
                </div>
              </div>
            </div>
            
            {/* Global Search Bar */}
            <div className="mt-6 lg:mt-8 max-w-lg w-full relative z-50">
               <SearchBar />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
              className="hidden sm:block mt-8 lg:mt-10 border-l border-white/20 pl-4 relative z-0"
            >
              <p className="text-white/45 text-[11px] lg:text-[12px] leading-[2] max-w-[380px] font-medium tracking-[0.04em]">
                An International Biannual Refereed Journal of Life Sciences dedicated to the advancement of biological scientific knowledge since 2006.
              </p>
              <span className="text-white/50 font-mono text-[10px] mt-1 block">(ISSN: 0973-7057)</span>
            </motion.div>
          </div>
          <div className="hidden lg:flex relative flex-col items-center justify-center w-[42%] shrink-0 z-10 pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: '80%', height: '70%',
                background: 'radial-gradient(ellipse at center, rgba(190,0,190,0.2) 0%, transparent 70%)',
                zIndex: 0,
              }}
            />
            <div className="relative z-10 w-[260px] sm:w-[320px] lg:w-[400px] h-[380px] lg:h-[520px] pointer-events-auto flex items-center justify-center">
              {heroImageUrl ? (
                <img 
                  src={heroImageUrl} 
                  alt="Hero Visual" 
                  className="w-[85%] sm:w-[80%] max-h-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-md border border-white/10"
                />
              ) : (
                <JournalModel3D />
              )}
            </div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0))' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;