'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, ExternalLink, FileText } from 'lucide-react';

/**
 * Parses academic text notation into HTML with superscripts.
 * Converts ^a, ^b, ^ab, ^a*, ^1, ^1* etc. into <sup> tags.
 * The * after a marker denotes the corresponding author.
 * Examples:
 *   "Rajendra Prasad Singh^a*" → "Rajendra Prasad Singh<sup>a</sup>*"
 *   "Umapati Sahay^b"          → "Umapati Sahay<sup>b</sup>"
 *   "^a Department of Zoology" → "<sup>a</sup>Department of Zoology"
 */
const parseAcademicText = (text) => {
  if (!text) return '';
  // Match ^{markers}[optional *] — markers can be letters, digits, or comma-separated
  return text.replace(/\^([a-zA-Z0-9,]+)(\*?)/g, (match, markers, asterisk) => {
    return `<sup>${markers}</sup>${asterisk}`;
  });
};

/**
 * Parses the affiliation string into individual lines with superscripts.
 * Affiliations can be separated by | (pipe), ; (semicolon followed by ^), or newlines.
 * Each line is expected to start with ^a, ^b, etc.
 */
const parseAffiliations = (text) => {
  if (!text) return '';
  // Split by pipe, semicolon-before-caret, or newline
  const parts = text.split(/\s*\|\s*|\n|(?:;\s*(?=\^))/).filter(s => s.trim());
  return parts.map(part => parseAcademicText(part.trim())).join('<br/>');
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
  
  const title = cleanText(article.title);
  const authorsRaw = cleanText(Array.isArray(article.authors) ? article.authors.join(', ') : article.authors);
  const authorsParsed = parseAcademicText(authorsRaw);
  const affiliationParsed = parseAffiliations(article.affiliation);
  const abstract = cleanText(article.abstract);
  const keywords = Array.isArray(article.keywords) ? article.keywords.join(', ') : (article.keywords || '');
  const date = mounted ? new Date(article.date || article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '...';

  return (
    <div className="min-h-screen bg-[#F9FBF7] text-slate-900 font-serif selection:bg-green-100">
      {/* Top Navbar Simulation / Back Button */}
      <div className="border-b border-slate-200 bg-white/50 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto px-4 max-w-5xl py-4 flex items-center justify-between">
          <Link 
            href="/archive" 
            className="inline-flex items-center text-xs font-sans font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={14} className="mr-2" /> BACK TO ARCHIVE
          </Link>
          <div className="hidden md:flex space-x-6 text-[11px] font-sans font-bold text-slate-600 uppercase tracking-wider">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/archive" className="hover:text-blue-600">Issues</Link>
            <Link href="/about" className="hover:text-blue-600">About us</Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Article Header */}
          <header className="mb-6 text-center border-b border-slate-100 pb-6">
            <h1 
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <div className="mb-6 mt-4 flex flex-col items-center pt-2">
              <p className="text-lg font-bold text-slate-800 mb-2" dangerouslySetInnerHTML={{ __html: authorsParsed }} />
              {affiliationParsed && (
                <p className="text-sm text-slate-500 italic leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: affiliationParsed }} />
              )}
            </div>

            <div className="flex flex-col items-center space-y-2 text-sm text-slate-500 font-medium">
              <p>Published: {date}</p>
              {article.doi && article.doi !== "#" && (
                <p>DOI: <a href={article.doi.startsWith('http') ? article.doi : `https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{article.doi}</a></p>
              )}
            </div>
          </header>

          {/* Abstract Section */}
          <section className="mb-12 bg-white/40 p-8 rounded-2xl border border-slate-200/50 shadow-sm">
            <div className="text-base leading-relaxed text-slate-800 text-justify">
              <span className="font-bold text-[#133215]">Abstract&ndash;</span> <span dangerouslySetInnerHTML={{ __html: abstract }} />
            </div>
          </section>

          {/* Keywords Section */}
          {keywords && (
            <section className="mb-12 text-sm">
              <span className="font-bold">Keywords:</span> {keywords}
            </section>
          )}

          {/* Download Link */}
          <section className="mb-12 border-t border-slate-100 pt-8">
            <a 
              href={article.pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-blue-600 font-bold hover:underline"
            >
              <Download size={18} className="mr-2" /> Download Pdf
            </a>
          </section>

          {/* Full Text Section */}
          <section className="mt-16">
            <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">Full Text</h2>
            <div className="text-base leading-relaxed text-slate-800 space-y-6 text-justify">
              {article.content ? (
                article.content.split('\n').map((para, i) => (
                  para.trim() && <p key={i}>{para.trim()}</p>
                ))
              ) : (
                <div className="bg-slate-50 p-8 rounded-lg border border-slate-100 text-center italic text-slate-500">
                  The full digital version of this research paper is currently being processed. Please refer to the official PDF for complete data, figures, and methodology.
                </div>
              )}
            </div>
          </section>

          {/* Published Info */}
          <footer className="mt-20 pt-10 border-t border-slate-200 text-sm text-slate-500">
            <p className="italic">
              Published in <Link href="/archive" className="text-blue-600 hover:underline font-bold">Biospectra</Link> ({article.category?.issue?.year?.year || '2024'}) {article.category?.title || 'Scientific Paper'}
            </p>
            <div className="mt-8 flex items-center space-x-4 grayscale opacity-50">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest">ISSN: 0973-7057</span>
            </div>
          </footer>
        </motion.article>
      </div>
    </div>
  );
};

export default ArticleClient;
