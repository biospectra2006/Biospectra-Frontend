'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FALLBACK_GUIDELINES = [
  {
    title: 'Aims and Objectives',
    content: `<p><strong>BIOSPECTRA: ISSN:0973-7057</strong> is an innovative, refereed, biannual (every March and September) multicolumn research journal in the field of Life Sciences published by the Madhawi-Shyam Educational Trust, Ranchi, Jharkhand, India (Reg. No. 20560/IV-1815/2005). It is dedicated to cover wide spectrum original research papers under following categories:</p>
<ul>
<li><strong>Review Articles:</strong> On any pre-published idea or topic with the latest information and with more than 50 references.</li>
<li><strong>Invited Articles:</strong> Covering conceptual write-up of 4-6 page materials on burning topics of Life science research without the standard format of a full-length research paper.</li>
<li><strong>Full-Length Papers:</strong> Covering standard write-up span of 6-8 Page maker pages (10-12 MS Word pages) double space typed material with tables and graphs/figs. Photographs up to 4-6, may also be accommodated in black and white strictly in the standard format given below.</li>
<li><strong>Popular Articles:</strong> On any burning issue of Life Science without constraints of standard format limitations.</li>
<li><strong>Research/Short Communications:</strong> Covering standard write-up span of 3-5 pages.</li>
<li><strong>Research News:</strong> Covering important national/international discoveries of common man interest, also information on conference, symposia and seminar.</li>
</ul>`
  },
  {
    title: 'Format for Full-Length Papers',
    content: `<ul>
<li>The materials should be typed in double space MS Word on one side only of A-4 size paper.</li>
<li>One of the names of the authors should be asterisked as the correspondent author to be given in the foot space with email-id / Mobile number.</li>
<li>A brief abstract and keywords (not more than 10) should precede the introduction.</li>
<li>The entire write-up should be arranged under the heads: Introduction, Materials & Methods, Results & Discussion, Tables, Graphs/Fig. & Photographs, Acknowledgment and References.</li>
<li>All references should be numbered according to the sequence of the text, arranged serially without alphabetical consideration and superscript in the text as and where mentioned.</li>
<li>The article should be submitted 45 days in advance, in one soft copy and two hard copies for mailing to the referees.</li>
</ul>`
  },
  {
    title: 'References Style Guide',
    content: `<p>References of Book and Journal should be written as follows:</p>
<div class="bg-[#eef4ec]/50 border border-[#92B775]/20 rounded-xl p-5 mb-4 space-y-4">
  <div>
    <h4 class="font-bold text-[#133215] mb-2 font-serif text-base">Books</h4>
    <ol class="list-decimal list-outside ml-5 space-y-1 text-[#133215]/80">
      <li>Lee G. R., Foerster J., Lukenth J., Paraskevas F., Greer J. P. & Rodgers G.M. 1999. Winthrobes Clinical Hematology, Vol. 1, 10th edition.</li>
      <li>Fange R. 1992. Fish blood cells, in Fish Physiology, edited by W. S. Hoar, D. J. Randall & A. P. Farrel.</li>
    </ol>
  </div>
  <div class="pt-3 border-t border-[#92B775]/10">
    <h4 class="font-bold text-[#133215] mb-2 font-serif text-base">Journals</h4>
    <ol class="list-decimal list-outside ml-5 space-y-1 text-slate-700" start="3">
      <li>Exley C., Chappell J. S. & Brichall J. D. 1991. A mechanism of acute aluminium toxicity in fish, <em>J. theoretical Biol.</em> 15(1): 42-47</li>
    </ol>
  </div>
  <div class="bg-[#92B775]/10 p-3 rounded-lg border border-[#92B775]/20">
    <p class="text-[#133215]/80 text-[12px] italic m-0">
      In no case should the references cited in the text and in the reference column miss reciprocal placing.
    </p>
  </div>
</div>`
  },
  {
    title: 'General Information',
    content: `<p>At least one of the authors (in a group of 3 co-authors only) must be a member of the journal under the trust, MSET. The membership can be procured by filling up the form as per any of the subscription options given thereon. All remittances should be in favour of Madhawi Shyam Educational Trust, Ranchi.</p>
<p class="font-bold pt-2">Authors are requested not to plagiarize the pre-published materials in verbatim in order to help us in achieving the quality control of the journal. The editorial board is not responsible for any duplication or dispute in the write-up of the article.</p>`
  }
];

const Guidelines = () => {
  const [sections, setSections] = useState(FALLBACK_GUIDELINES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/guidelines`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setSections(data);
          }
        }
      } catch (err) {
        console.warn('Failed to load guidelines from backend, using fallbacks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuidelines();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: '#eef4ec' }}>
      {/* Background Lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute inset-0 flex justify-between px-[5%] opacity-[0.03]">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-px h-full bg-slate-900" />
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-6 md:p-12 rounded-2xl shadow-xl shadow-[#133215]/[0.03] border border-[#92B775]/10 relative">
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-2xl pointer-events-none">
              <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-[#92B775]/5 rotate-45 transform" />
            </div>

            <div className="border-b border-[#92B775]/10 pb-6 mb-8 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontFamily: 'var(--font-playfair), serif', color: '#133215' }}
                className="text-3xl md:text-5xl font-black mb-3"
              >
                Guidelines to Authors
              </motion.h1>
              <p className="text-[#92B775] font-bold tracking-[0.2em] text-[10px] uppercase">
                BIOSPECTRA JOURNAL: ISSN-0973-7057
              </p>
            </div>

            <div className="prose prose-slate prose-emerald max-w-none guidelines-body">
              <style>{`
                .guidelines-body p {
                  color: #334155;
                  line-height: 1.7;
                  margin-bottom: 1rem;
                  font-size: 0.875rem;
                }
                .guidelines-body ul {
                  list-style: none;
                  padding-left: 0;
                  margin-bottom: 1.5rem;
                  display: flex;
                  flex-direction: column;
                  gap: 0.5rem;
                }
                .guidelines-body ul li {
                  position: relative;
                  padding-left: 1.25rem;
                  color: #334155;
                  font-size: 0.875rem;
                  line-height: 1.6;
                }
                .guidelines-body ul li::before {
                  content: "●";
                  position: absolute;
                  left: 0;
                  color: #92B775;
                  font-size: 0.75rem;
                  top: 0.1rem;
                }
                .guidelines-body ol {
                  margin-bottom: 1rem;
                  padding-left: 1.25rem;
                }
                .guidelines-body h4 {
                  color: #133215;
                  font-family: var(--font-playfair), serif;
                  margin-top: 1rem;
                  margin-bottom: 0.5rem;
                }
              `}</style>

              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 border-4 border-[#133215] border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-xs font-bold text-[#133215]/60 uppercase tracking-widest">Loading guidelines...</p>
                </div>
              ) : (
                sections.map((section, idx) => (
                  <motion.div
                    key={section._id || idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="mb-8"
                  >
                    <h2 
                      className="text-xl font-bold font-serif text-[#133215] mb-4 flex items-center" 
                      style={{ fontFamily: 'var(--font-playfair), serif' }}
                    >
                      <span className="w-8 h-px bg-[#92B775]/40 mr-4"></span>
                      {section.title}
                    </h2>
                    <div 
                      className="guideline-content"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
