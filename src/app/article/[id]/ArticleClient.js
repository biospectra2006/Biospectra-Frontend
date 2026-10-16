'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';

/**
 * Parses academic text notation into HTML with superscripts.
 * Converts ^a, ^b, ^ab, ^a*, ^1, ^1* etc. into <sup> tags.
 */
const parseAcademicText = (text) => {
  if (!text) return '';
  return text.replace(/(\*?)\^([a-zA-Z0-9,]+)(\*?)/g, (match, starBefore, markers, starAfter) => {
    return `<sup>${starBefore}${markers}${starAfter}</sup>`;
  });
};

/**
 * Decodes HTML entities for supported formatting tags (i, sub, sup, b, strong, em).
 */
const decodeFormattingTags = (text) => {
  if (!text) return '';
  return text
    .replace(/&lt;(\/?(i|em|b|strong|sub|sup|span))&gt;/gi, '<$1>')
    .replace(/&lt;(\/?(i|em|b|strong|sub|sup|span))\s+([^&]*)&gt;/gi, '<$1 $3>');
};

/**
 * Parses the affiliation string into individual lines with superscripts.
 */
const parseAffiliations = (text) => {
  if (!text) return '';
  const parts = text.split(/\s*\|\s*|\n|(?:;\s*(?=\^))/).filter(s => s.trim());
  return parts.map(part => parseAcademicText(decodeFormattingTags(part.trim()))).join('<br/>');
};

const ArticleClient = ({ article }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!article) return (
    <div className="pt-40 pb-20 min-h-screen bg-white flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Article Not Found</h2>
      <Link href="/archive" className="text-blue-600 font-serif hover:underline">Return to Archive</Link>
    </div>
  );

  const cleanText = (text) => (text || '').replace(/\s+/g, ' ').trim();
  
  const title = decodeFormattingTags(cleanText(article.title));
  const authorsRaw = cleanText(Array.isArray(article.authors) ? article.authors.join(', ') : article.authors);
  const authorsParsed = parseAcademicText(decodeFormattingTags(authorsRaw));
  const affiliationParsed = parseAffiliations(article.affiliation);
  const abstract = decodeFormattingTags(cleanText(article.abstract));
  const keywordsRaw = Array.isArray(article.keywords) ? article.keywords.join(', ') : (article.keywords || '');
  const keywords = decodeFormattingTags(cleanText(keywordsRaw));

  // Published in calculation: [Journal Name, Volume, Issue, Year]
  const issueYear = article.category?.issue?.year?.year || article.year;
  const volume = issueYear ? (issueYear - 2005) : article.volume;
  const issueTitle = article.category?.issue?.title || (article.issue ? `Issue ${article.issue}` : '');
  
  const publishedParts = ['Biospectra'];
  if (volume) publishedParts.push(`Volume ${volume}`);
  if (issueTitle) publishedParts.push(issueTitle);
  if (issueYear) publishedParts.push(`${issueYear}`);
  const publishedIn = publishedParts.join(', ');

  return (
    <div className="min-h-screen bg-[#F9FBF7] text-slate-900 font-serif selection:bg-[#133215] selection:text-white">
      {/* Top Navbar Simulation / Back Button */}
      <div className="border-b border-slate-200 bg-white/70 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto px-4 max-w-4xl py-3 flex items-center justify-between">
          <Link 
            href="/archive" 
            className="inline-flex items-center text-xs font-sans font-bold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft size={14} className="mr-1.5" /> BACK TO ARCHIVE
          </Link>
          <div className="flex space-x-5 text-xs font-sans font-bold text-slate-600 uppercase tracking-wider">
            <Link href="/" className="hover:text-emerald-700">Home</Link>
            <Link href="/archive" className="hover:text-emerald-700">Issues</Link>
            <Link href="/about" className="hover:text-emerald-700">About us</Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 p-6 md:p-8 rounded-2xl border border-slate-200/60 shadow-sm"
        >
          {/* 1. Title */}
          <h1 
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-snug"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {/* 2. Author Name */}
          <div className="mb-2">
            <p className="text-base md:text-lg font-bold text-slate-800" dangerouslySetInnerHTML={{ __html: authorsParsed }} />
          </div>

          {/* 3. Designation */}
          {affiliationParsed && (
            <div className="mb-4">
              <p className="text-sm text-slate-600 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: affiliationParsed }} />
            </div>
          )}

          {/* 4. Published in: [Journal Name, Volume, Issue, Year] */}
          <div className="mb-5">
            <div className="text-xs md:text-sm text-emerald-900 bg-emerald-50 border border-emerald-200/70 rounded-lg px-3.5 py-1.5 inline-block font-sans">
              <span className="font-semibold text-emerald-950/70">Published in: </span>
              <span className="font-bold">{publishedIn}</span>
            </div>
          </div>

          {/* 5. Abstract */}
          {abstract && (
            <section className="mb-5 bg-[#F9FBF7] p-5 md:p-6 rounded-xl border border-slate-200/70">
              <div className="text-sm md:text-[15px] leading-relaxed text-slate-800 text-justify">
                <span className="font-bold text-[#133215]">Abstract&ndash; </span>
                <span dangerouslySetInnerHTML={{ __html: abstract }} />
              </div>
            </section>
          )}

          {/* 6. Keywords */}
          {keywords && (
            <section className="mb-6 text-xs md:text-sm text-slate-700 bg-slate-50/80 px-4 py-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
              <span className="font-bold text-slate-900">Keywords: </span>
              <span dangerouslySetInnerHTML={{ __html: keywords }} />
            </section>
          )}

          {/* 7. Download PDF button */}
          {article.pdfUrl ? (
            <section className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <a 
                href={article.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#133215] hover:bg-[#1a441d] text-white font-sans text-xs md:text-sm font-bold rounded-xl shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download size={16} />
                <span>Download PDF</span>
              </a>
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-400">
                ISSN: 0973-7057
              </span>
            </section>
          ) : null}
        </motion.article>
      </div>
    </div>
  );
};

export default ArticleClient;
