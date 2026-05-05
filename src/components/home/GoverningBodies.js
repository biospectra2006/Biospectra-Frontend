'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const GoverningBodies = ({ colors, assets }) => {
  const P = colors;
  return (
    <section style={{ background: P.neutral, borderTop: `1px solid ${P.borderSoft}`, padding: 'clamp(40px, 5vw, 60px) 0' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'clamp(20px, 4vw, 30px)' }}>
          <h2 className="heading-section text-center" style={{ fontSize: 'var(--font-lg)', color: P.deepPurple }}>
            OUR GOVERNING BODIES
          </h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-richPurple to-magenta my-6 mx-auto" />
          <p className="text-editorial text-center max-w-[500px] mx-auto text-base opacity-80">
            Biospectra is officially published under the stewardship of these distinguished academic organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-[1000px] mx-auto">
          {[
            { name: 'Madhawi Shyam Educational Trust', acronym: 'MSET', desc: 'A dedicated foundation committed to advancing higher education and scientific research across the biological sciences.', logo: assets.msetLogo },
            { name: 'International Consortium of Contemporary Biologists', acronym: 'ICCB', desc: 'An international fellowship of scientists and researchers fostering global collaboration and innovation in modern biology.', logo: assets.iccbLogo },
          ].map((body, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                background: P.white,
                border: `1px solid ${P.borderSoft}`,
                padding: 'clamp(20px, 3vw, 32px) clamp(16px, 3vw, 24px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
              }}
              className="group hover:bg-white transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5"
            >
              <div
                style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 3, background: `linear-gradient(90deg, ${P.deepPurple}, ${P.magenta})`, transformOrigin: 'left', transform: 'scaleX(0)', transition: 'transform 0.5s ease' }}
                className="group-hover:scale-x-100"
              />
              <div className="h-20 sm:h-24 flex items-center justify-center mb-6 sm:mb-8">
                <Image src={body.logo} alt={body.name} width={100} height={100} style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }} className="group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-label mb-4">{body.acronym}</div>
              <h3 className="heading-section text-black mb-4" style={{ fontSize: 'var(--font-md)' }}>{body.name}</h3>
              <div className="w-6 h-[1.5px] bg-border-soft mb-5 group-hover:w-16 transition-all duration-500" />
              <p className="text-editorial text-sm opacity-90">{body.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoverningBodies;
