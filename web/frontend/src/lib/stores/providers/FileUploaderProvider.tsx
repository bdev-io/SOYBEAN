/* eslint-disable react-refresh/only-export-components */
'use client';

import { createContext, use, useRef } from 'react';
import type { ReactNode } from 'react';

import type {
  createFileUploadManagerStore,
  FileUploadManagerStore,
} from '@store/fileUploadManagerStore';

import { useStore } from 'zustand';

import { sharedFileUploadManagerStore } from '@store/fileUploadManagerStore';

// 타입 추출
export type FileUploadManagerStoreApi = ReturnType<
  typeof createFileUploadManagerStore
>;

// Context 생성
export const FileUploadManagerStoreContext = createContext<
  FileUploadManagerStoreApi | undefined
>(undefined);

export type FileUploadManagerStoreProviderProps = {
  children: ReactNode;
};

// Provider 컴포넌트
export const FileUploadManagerStoreProvider = ({
  children,
}: FileUploadManagerStoreProviderProps) => {
  const storeRef = useRef<FileUploadManagerStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = sharedFileUploadManagerStore;
  }

  return (
    <FileUploadManagerStoreContext value={storeRef.current}>
      {children}
    </FileUploadManagerStoreContext>
  );
};

// 훅에서 전역 상태 사용하기 위한 custom hook
export const useFileUploadManagerStore = <T,>(
  selector: (store: FileUploadManagerStore) => T,
): T => {
  const storeContext = use(FileUploadManagerStoreContext);
  if (!storeContext) {
    throw new Error(
      'useFileUploadManagerStore must be used within FileUploadManagerStoreProvider',
    );
  }

  return useStore(storeContext, selector);
};
