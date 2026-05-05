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
        background: hovered ? 'rgba(248, 245, 255, 0.98)' : 'rgba(255, 255, 255, 0.96)',
        border: `1px solid ${hovered ? 'rgba(124,58,237,0.2)' : P.border}`,
        padding: 'clamp(28px, 4vw, 36px) clamp(20px, 4vw, 30px)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '12px',
        boxShadow: 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Top Accent Line — purple gradient slides in on hover */}
      <div
        style={{
          position: 'absolute',
          top: -1,
          left: -1,
          right: -1,
          height: 3,
          background: `linear-gradient(90deg, ${P.purple}, ${P.lavender})`,
          transformOrigin: 'left',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          borderRadius: '12px 12px 0 0',
        }}
      />

      {/* Category + Badges row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
          {/* Category */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <div
              style={{
                width: 5, height: 5, borderRadius: '50%',
                background: hovered ? P.purple : P.mint,
                transition: 'background 0.3s',
              }}
            />
            <span style={{
              fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em',
              color: hovered ? P.purple : P.emerald,
              transition: 'color 0.3s',
            }}>
              {article.category}
            </span>
          </div>
          
          {/* Scientific Status Badges */}
          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            <span style={{
              fontSize: '7.5px', fontWeight: 800, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.08em',
              color: hovered ? P.purple : P.mint,
              background: hovered ? 'rgba(124,58,237,0.08)' : 'rgba(62,180,137,0.08)',
              border: hovered ? '1px solid rgba(124,58,237,0.2)' : '1px solid rgba(62,180,137,0.2)',
              transition: 'all 0.3s',
            }}>
              PEER REVIEWED
            </span>
            <span style={{
              fontSize: '7.5px', fontWeight: 800, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.08em',
              color: hovered ? P.purple : P.emerald,
              background: hovered ? 'rgba(124,58,237,0.05)' : 'rgba(25,103,75,0.06)',
              border: hovered ? '1px solid rgba(124,58,237,0.15)' : `1px solid ${P.border}`,
              transition: 'all 0.3s',
            }}>
              OPEN ACCESS
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px', color: P.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>
          <Calendar size={11} style={{ marginRight: 6, color: hovered ? P.lavender : P.mint, opacity: 0.8, transition: 'color 0.3s' }} />
          {mounted
            ? new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
            : '...'}
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-crimson-pro), serif',
          fontSize: 'clamp(20px, 2.5vw, 22px)',
          fontWeight: 800,
          color: hovered ? P.purple : P.deepEmerald,
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          marginBottom: 14,
          transition: 'color 0.3s',
        }}
        className="line-clamp-2"
      >
        {article.title}
      </h3>

      {/* Authors */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <div
          style={{
            padding: 6,
            background: hovered ? 'rgba(124,58,237,0.08)' : 'rgba(25,103,75,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            borderRadius: '50%',
            transition: 'background 0.3s',
          }}
        >
          <User size={12} color={hovered ? P.purple : P.emerald} style={{ transition: 'color 0.3s' }} />
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: P.textBody, opacity: 0.9 }}>
          {article.authors.length > 2 
            ? `${article.authors[0]}, ${article.authors[1]} et al.` 
            : article.authors.join(', ')}
        </span>
      </div>

      {/* Abstract */}
      <p
        style={{ fontSize: '13px', color: P.textBody, lineHeight: 1.8, marginBottom: 32, flex: 1, opacity: hovered ? 1 : 0.8, transition: 'opacity 0.3s' }}
        className="line-clamp-3"
      >
        {article.abstract}
      </p>

      {/* Footer — vol/issue + Read Full */}
      <div
        style={{
          paddingTop: 20,
          borderTop: `1px solid ${hovered ? 'rgba(124,58,237,0.1)' : P.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          transition: 'border-color 0.3s',
        }}
      >
        <div style={{ fontSize: 9, fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.15em', color: P.textMuted }}>
          Vol. {article.volume} • No. {article.issue}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 10,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: hovered ? P.purple : P.emerald,
            transition: 'color 0.3s',
          }}
        >
          Read Full
          <ArrowRight
            size={14}
            style={{
              marginLeft: 8,
              transform: hovered ? 'translateX(6px)' : 'translateX(0)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
