'use client';
import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const JournalModel3D = dynamic(() => import('@/components/common/JournalModel3D'), { ssr: false });

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

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-center"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full flex-grow overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/assets/new-Landing/og-green.png"
            alt="Green DNA"
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />

        </div>

        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden" 
          style={{ WebkitMaskImage: maskImage, maskImage: maskImage }} 
        >
          <Image
            src="/assets/new-Landing/just-dna.png"
            alt="Purple DNA Reveal"
            fill
            style={{ objectFit: 'cover' }}
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
          {/* Top Left Marker */}
          <div className="absolute top-[10%] left-[5%] flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-4 h-px bg-white/20" />
              <div className="w-px h-4 bg-white/20" />
            </div>
            <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest">COORD_A1</span>
          </div>

          {/* Center Vertical Axis */}
          <div className="absolute top-0 bottom-0 left-[50%] w-px bg-linear-to-b from-transparent via-white/10 to-transparent" />
          
          {/* Bottom Right Data Block */}
          <div className="absolute bottom-[10%] right-[5%] flex flex-col items-end gap-1">
             <div className="w-12 h-px bg-white/30" />
             <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.3em]">SEC_ARCHIVE_DATA</span>
          </div>

          {/* Large Background Text */}
          <div className="absolute top-[12%] left-[4%] pointer-events-none" style={{ fontSize: 'clamp(100px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.8, color: '#fff', letterSpacing: '-0.05em', opacity: 0.04 }}>
             BIO
          </div>
          <div className="absolute bottom-[5%] right-[4%] pointer-events-none" style={{ fontSize: 'clamp(100px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.8, color: '#fff', letterSpacing: '-0.05em', opacity: 0.04 }}>
             SCI
          </div>
        </div>

        <div className="relative w-full min-h-[100svh] flex flex-row items-stretch z-10">
          <div className="flex flex-col justify-center flex-1 w-full px-6 lg:pl-[5%] lg:pr-8 z-20 py-20 lg:py-24 relative">
            {/* Structural corner decorations */}
            <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-white/10 rounded-tl-lg pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-white/10 rounded-br-lg pointer-events-none" />
            
            <span className="text-white/60 font-mono tracking-[0.2em] text-[9px] lg:text-[10px] uppercase mb-4 animate-pulse">VOL. 17 / ISS. 2</span>
            <h1 className="font-medium leading-none mb-4 drop-shadow-2xl" style={{ fontSize: 'clamp(48px, 7vw, 100px)', color: '#ffffff', letterSpacing: '0.05em', textShadow: '0 4px 40px rgba(255,255,255,0.35)', fontFamily: 'var(--font-crimson-pro), Georgia, serif' }}>
              BIOSPECTRA
            </h1>
            <div className="flex flex-col pl-3 lg:pl-4 border-l border-white/30 ml-1 mb-8">
              <span className="text-white/60 font-medium tracking-[0.2em] lg:tracking-[0.3em] text-[8.5px] lg:text-[11px] leading-relaxed uppercase block">INTERNATIONAL BIANNUAL REFEREED</span>
              <span className="text-white font-bold tracking-[0.15em] lg:tracking-[0.2em] text-[10px] lg:text-[13px] leading-tight uppercase mt-1" style={{fontFamily: 'var(--font-inter), sans-serif'}}>JOURNAL OF LIFE SCIENCES</span>
            </div>
            <div className="flex flex-row items-center gap-5 lg:gap-6">
              <Link href="/archive">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 text-white border border-white/20 backdrop-blur-md font-bold tracking-[0.2em] text-[8px] lg:text-[10px] uppercase py-3 px-6 rounded shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white hover:text-black transition-all flex items-center gap-3 group"
                >
                  <span>Explore Issues</span>
                  <ArrowRight size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.button>
              </Link>
              <div className="flex flex-col border-l border-white/20 pl-5 lg:pl-6 py-1">
                <span className="text-white/40 font-mono tracking-[0.2em] text-[7px] lg:text-[8px] uppercase mb-1">IMPACT FACTOR</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-black tracking-widest text-[#e8d5ff] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] text-xs lg:text-sm leading-none">SJIF 8.546</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.6)]" />
                </div>
              </div>
            </div>
            <div className="hidden sm:block mt-8 lg:mt-14 border-l border-white/20 pl-4">
              <p className="text-white/45 text-[11px] lg:text-[12px] leading-[2] max-w-[380px] font-medium tracking-[0.04em]">
                An International Biannual Refereed Journal of Life Sciences dedicated to the advancement of biological scientific knowledge since 2006.
              </p>
              <span className="text-white/50 font-mono text-[10px] mt-1 block">(ISSN: 0973-7057)</span>
            </div>
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
            <div className="relative z-10 w-[260px] sm:w-[320px] lg:w-[400px] h-[380px] lg:h-[520px] pointer-events-auto">
              <JournalModel3D />
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
