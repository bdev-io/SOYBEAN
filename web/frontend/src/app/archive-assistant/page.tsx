'use client';

import React from 'react';

import { CustomAssistantRuntimeProvider } from '@lib/llm/provider/CustomAssistantRuntimeProvider';

import ArchiveChat from './(components)/ArchiveChat';

export default function page() {
  return (
    <div className='h-[calc(100vh-65px)] w-full p-[24px]'>
      <CustomAssistantRuntimeProvider>
        <ArchiveChat />
      </CustomAssistantRuntimeProvider>
    </div>
  );
}
