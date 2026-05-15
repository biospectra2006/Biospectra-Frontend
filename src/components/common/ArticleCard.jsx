'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Emerald & Lavender palette
const P = {
  deepEmerald:  '#064e3b',
  emerald:      '#19674b',
  mint:         '#3eb489',
  lavender:     '#9e9eff',
  purple:       '#7c3aed',
  white:        '#ffffff',
  mintMist:     '#f0fdf4',
  border:       'rgba(25, 103, 75, 0.1)',
  textBody:     '#1e293b',
  textMuted:    '#64748b',
};

const ArticleCard = ({ article }) => {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [hovered, setHovered] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    router.push(`/article/${article.id}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: '#ffffff',
        border: `1px solid ${hovered ? 'rgba(6,78,59,0.15)' : 'rgba(6,78,59,0.06)'}`,
        padding: 'clamp(20px, 3vw, 24px)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '8px',
        boxShadow: hovered ? '0 10px 30px -10px rgba(6,78,59,0.1)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Top Accent Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: '#064e3b',
          transformOrigin: 'left',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Category + Badges row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
            <div
              style={{
                width: 4, height: 4, borderRadius: '50%',
                background: '#3eb489',
              }}
            />
            <span style={{
              fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em',
              color: '#19674b',
            }}>
              {article.category}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: 6, width: '100%' }}>
            <span style={{
              fontSize: '7px', fontWeight: 800, padding: '2px 6px', borderRadius: 2, letterSpacing: '0.05em',
              color: '#3eb489',
              background: 'rgba(62,180,137,0.06)',
              border: '1px solid rgba(62,180,137,0.15)',
            }}>
              PEER REVIEWED
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: '9px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <Calendar size={10} style={{ marginRight: 4, color: '#3eb489', opacity: 0.6 }} />
          {mounted
            ? new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
            : '...'}
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: 'clamp(16px, 2vw, 19px)',
          fontWeight: 800,
          color: '#064e3b',
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
          marginBottom: 10,
        }}
        className="line-clamp-2"
        dangerouslySetInnerHTML={{ __html: article.title }}
      />

      {/* Authors */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <div
          style={{
            padding: 5,
            background: 'rgba(6,78,59,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
            borderRadius: '50%',
          }}
        >
          <User size={10} color="#19674b" />
        </div>
        <span style={{ fontSize: '10px', fontWeight: 700, color: '#1e293b', opacity: 0.9 }}>
          {article.authors.length > 2 
            ? `${article.authors[0]}, ${article.authors[1]} et al.` 
            : article.authors.join(', ')}
        </span>
      </div>

      {/* Abstract */}
      <p
        style={{ fontSize: '12px', color: '#1e293b', lineHeight: 1.7, marginBottom: 20, flex: 1, opacity: 0.75 }}
        className="line-clamp-3"
        dangerouslySetInnerHTML={{ __html: article.abstract }}
      />

      {/* Footer */}
      <div
        style={{
          paddingTop: 16,
          borderTop: `1px solid rgba(6,78,59,0.06)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
        }}
      >
        <div style={{ fontSize: 8.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b' }}>
          Vol. {article.volume} • No. {article.issue}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 9,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#19674b',
          }}
        >
          Read Full
          <ArrowRight
            size={12}
            style={{
              marginLeft: 6,
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
