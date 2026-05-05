import React from 'react';
import ArchiveClient from '@/components/archive/ArchiveClient';

export const metadata = {
  title: 'Journal Archive',
  description: 'Explore the complete publication history of Biospectra. Browse volumes and issues of peer-reviewed biological research dating back to 2006.',
};

const ArchivePage = () => {
  return <ArchiveClient />;
};

export default ArchivePage;
