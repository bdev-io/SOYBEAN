'use client';

import React from 'react';

import ArchiveChat from '@app/archive-assistant/(components)/ArchiveChat';

export default function page() {
  return (
    <div className='h-[calc(100vh-65px)] w-full p-[24px]'>
      <ArchiveChat />
    </div>
  );
}
