/* eslint-disable react-refresh/only-export-components */
'use client';

import { createContext, use, useRef } from 'react';
import type { ReactNode } from 'react';

import type { createLLMStore, LLMStore } from '@store/llm';

import { useStore } from 'zustand';

import { sharedLLMStore } from '@store/llm';

export type LLMStoreApi = ReturnType<typeof createLLMStore>;

export const LLMStoreContext = createContext<LLMStoreApi | undefined>(
  undefined,
);

export const useLLMStore = <T,>(selector: (store: LLMStore) => T): T => {
  const context = use(LLMStoreContext);
  if (!context) {
    throw new Error('useLLMStore must be used within a LLMStoreProvider');
  }
  return useStore(context, selector);
};

export const LLMStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<LLMStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = sharedLLMStore;
  }

  return <LLMStoreContext value={storeRef.current}>{children}</LLMStoreContext>;
};
