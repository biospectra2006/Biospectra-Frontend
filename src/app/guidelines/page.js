'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Guidelines = () => {
  return (
    <div className="relative min-h-screen selection:bg-emerald-200 overflow-hidden" style={{ background: '#fdfbf7' }}>
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
          <div className="max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-2xl shadow-xl shadow-emerald-900/[0.03] border border-emerald-50 relative">
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-2xl pointer-events-none">
              <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-emerald-500/5 rotate-45 transform" />
            </div>
          
          <div className="border-b border-emerald-100 pb-5 mb-6 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-black text-slate-900 mb-2 font-serif"
            >
              Guidelines to Authors
            </motion.h1>
            <p className="text-emerald-700 font-bold tracking-widest text-[11px] uppercase">
              BIOSPECTRA JOURNAL: ISSN-0973-7057
            </p>
          </div>

          <div className="prose prose-slate prose-emerald max-w-none">
            
            {/* Aims and Objectives */}
            <h2 className="text-xl font-bold font-serif text-slate-900 mb-3 flex items-center">
              <span className="w-6 h-px bg-emerald-500 mr-3"></span> Aims and Objectives
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4 text-[13px] md:text-sm">
              <strong>BIOSPECTRA: ISSN:0973-7057</strong> is an innovative, refereed, biannual (every March and September) multicolumn research journal in the field of Life Sciences published by the Madhawi-Shyam Educational Trust, Ranchi, Jharkhand, India (Reg. No. 20560/IV-1815/2005). It is dedicated to cover wide spectrum original research papers under following categories:
            </p>
            <ul className="space-y-2 mb-8 text-slate-700 text-[13px] md:text-sm">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2.5 mt-1 shrink-0 text-[10px]">●</span>
                <span><strong>Review Articles:</strong> On any pre-published idea or topic with the latest information and with more than 50 references.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2.5 mt-1 shrink-0 text-[10px]">●</span>
                <span><strong>Invited Articles:</strong> Covering conceptual write-up of 4-6 page materials on burning topics of Life science research without the standard format of a full-length research paper.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2.5 mt-1 shrink-0 text-[10px]">●</span>
                <span><strong>Full-Length Papers:</strong> Covering standard write-up span of 6-8 Page maker pages (10-12 MS Word pages) double space typed material with tables and graphs/figs. Photographs up to 4-6, may also be accommodated in black and white strictly in the standard format given below.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2.5 mt-1 shrink-0 text-[10px]">●</span>
                <span><strong>Popular Articles:</strong> On any burning issue of Life Science without constraints of standard format limitations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2.5 mt-1 shrink-0 text-[10px]">●</span>
                <span><strong>Research/Short Communications:</strong> Covering standard write-up span of 3-5 pages.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2.5 mt-1 shrink-0 text-[10px]">●</span>
                <span><strong>Research News:</strong> Covering important national/international discoveries of common man interest, also information on conference, symposia and seminar.</span>
              </li>
            </ul>

            {/* Standard Format */}
            <h2 className="text-xl font-bold font-serif text-slate-900 mb-3 flex items-center">
              <span className="w-6 h-px bg-emerald-500 mr-3"></span> Format for Full-Length Papers
            </h2>
            <ul className="space-y-2 mb-8 text-slate-700 text-[13px] md:text-sm">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2.5 mt-1 shrink-0 text-[10px]">●</span>
                <span>The materials should be typed in double space MS Word on one side only of A-4 size paper.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2.5 mt-1 shrink-0 text-[10px]">●</span>
                <span>One of the names of the authors should be asterisked as the correspondent author to be given in the foot space with email-id / Mobile number.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2.5 mt-1 shrink-0 text-[10px]">●</span>
                <span>A brief abstract and keywords (not more than 10) should precede the introduction.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2.5 mt-1 shrink-0 text-[10px]">●</span>
                <span>The entire write-up should be arranged under the heads: Introduction, Materials & Methods, Results & Discussion, Tables, Graphs/Fig. & Photographs, Acknowledgment and References.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2.5 mt-1 shrink-0 text-[10px]">●</span>
                <span>All references should be numbered according to the sequence of the text, arranged serially without alphabetical consideration and superscript in the text as and where mentioned.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2.5 mt-1 shrink-0 text-[10px]">●</span>
                <span>The article should be submitted 45 days in advance, in one soft copy and two hard copies for mailing to the referees.</span>
              </li>
            </ul>

            {/* References */}
            <h2 className="text-xl font-bold font-serif text-slate-900 mb-3 flex items-center">
              <span className="w-6 h-px bg-emerald-500 mr-3"></span> References Style Guide
            </h2>
            <p className="text-slate-700 mb-3 text-[13px] md:text-sm">References of Book and Journal should be written as follows:</p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 text-[13px] md:text-sm space-y-5">
              <div>
                <h4 className="font-bold text-slate-900 mb-1.5 font-serif text-base">Books</h4>
                <ol className="list-decimal list-outside ml-4 space-y-1.5 text-slate-700">
                  <li>Lee G. R., Foerster J., Lukenth J., Paraskevas F., Greer J. P. & Rodgers G.M. 1999. Winthrobes Clinical Hematology, Vol. 1, 10th edition.</li>
                  <li>Fange R. 1992. Fish blood cells, in Fish Physiology, edited by W. S. Hoar, D. J. Randall & A. P. Farrel.</li>
                </ol>
              </div>
              
              <div className="pt-3 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1.5 font-serif text-base">Journals</h4>
                <ol className="list-decimal list-outside ml-4 space-y-1.5 text-slate-700" start="3">
                  <li>Exley C., Chappell J. S. & Brichall J. D. 1991. A mechanism of acute aluminium toxicity in fish, <em>J. theoretical Biol.</em> 15(1): 42-47</li>
                </ol>
              </div>
              
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 mt-3">
                <p className="text-emerald-800 text-[12px] italic m-0">
                  In no case should the references cited in the text and in the reference column miss reciprocal placing.
                </p>
              </div>
            </div>

            {/* General */}
            <h2 className="text-xl font-bold font-serif text-slate-900 mb-3 flex items-center">
              <span className="w-6 h-px bg-emerald-500 mr-3"></span> General Information
            </h2>
            <div className="space-y-3 text-slate-700 text-[13px] md:text-sm">
              <p className="leading-relaxed text-justify">
                At least one of the authors (in a group of 3 co-authors only) must be a member of the journal under the trust, MSET. The membership can be procured by filling up the form as per any of the subscription options given thereon. All remittances should be in favour of Madhawi Shyam Educational Trust, Ranchi.
              </p>
              <p className="leading-relaxed font-bold pb-2 text-justify">
                Authors are requested not to plagiarize the pre-published materials in verbatim in order to help us in achieving the quality control of the journal. The editorial board is not responsible for any duplication or dispute in the write-up of the article.
              </p>
            </div>

          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
