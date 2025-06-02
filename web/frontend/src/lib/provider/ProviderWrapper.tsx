'use client';

import React from 'react';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { FileUploadManagerStoreProvider } from '@store/providers/FileUploaderProvider';
import { GlobalStoreProvider } from '@store/providers/GlobalStoreProvider';
import { LLMStoreProvider } from '@store/providers/LLMStoreProvider';
import { PersistentStoreProvider } from '@store/providers/PersistentProvider';
import { SessionStoreProvider } from '@store/providers/SessionStoreProvider';
import { TauriStoreProvider } from '@store/providers/TauriProvider';

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
            {/* 파일 업로드 스토어 provider */}
            <FileUploadManagerStoreProvider>
              {/* nuqs provider */}
              <NuqsAdapter>
                {/* 글로벌 로딩 provider */}
                <GlobalLoader>
                  <LLMStoreProvider>
                    <TauriStoreProvider>{children}</TauriStoreProvider>
                  </LLMStoreProvider>
                </GlobalLoader>
              </NuqsAdapter>
            </FileUploadManagerStoreProvider>
          </GlobalStoreProvider>
        </PersistentStoreProvider>
      </SessionStoreProvider>
    </>
  );
}
