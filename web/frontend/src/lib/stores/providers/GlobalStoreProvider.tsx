/* eslint-disable react-refresh/only-export-components */
'use client';

import { createContext, use, useRef } from 'react';
import type { ReactNode } from 'react';

import type { createGlobalStore, GlobalStore } from '@store/globals';

import { useStore } from 'zustand';

import { sharedGlobalStore } from '@store/globals';

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(
  undefined,
);

export type GlobalStoreProviderProps = {
  children: ReactNode;
};

export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const storeRef = useRef<GlobalStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = sharedGlobalStore;
  }

  return (
    <GlobalStoreContext value={storeRef.current}>{children}</GlobalStoreContext>
  );
};

export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
  const counterStoreContext = use(GlobalStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useGlobalStore must be used within GlobalStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
