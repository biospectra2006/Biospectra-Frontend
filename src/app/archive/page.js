import React, { Suspense } from 'react';
import ArchiveClient from '@/components/archive/ArchiveClient';

export const metadata = {
  title: 'Journal Archive',
  description: 'Explore the complete publication history of Biospectra. Browse volumes and issues of peer-reviewed biological research dating back to 2006.',
};

const ArchivePage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-slate-400 font-bold tracking-widest">LOADING ARCHIVE...</div>
      </div>
    }>
      <ArchiveClient />
    </Suspense>
  );
};

export default ArchivePage;
