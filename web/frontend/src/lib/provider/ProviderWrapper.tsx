'use client';

import React from 'react';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { GlobalStoreProvider } from '@store/providers/GlobalStoreProvider';
import { PersistentStoreProvider } from '@store/providers/PersistentProvider';
import { SessionStoreProvider } from '@store/providers/SessionStoreProvider';

import GlobalLoader from '@app/global-loader';

export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 세션스토리지 스토어 provider */}
      <SessionStoreProvider>
        {/* 로컬스토리지 스토어 provider */}
        <PersistentStoreProvider>
          {/* 전역 스토어 provider */}
          <GlobalStoreProvider>
            {/* nuqs provider */}
            <NuqsAdapter>
              {/* 글로벌 로딩 provider */}
              <GlobalLoader>{children}</GlobalLoader>
            </NuqsAdapter>
          </GlobalStoreProvider>
        </PersistentStoreProvider>
      </SessionStoreProvider>
    </>
  );
}
