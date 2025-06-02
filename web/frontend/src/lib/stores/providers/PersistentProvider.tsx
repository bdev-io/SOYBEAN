/* eslint-disable react-refresh/only-export-components */
'use client';

import { createContext, use, useRef } from 'react';
import type { ReactNode } from 'react';

import type {
  createPersistentStore,
  PersistentStore,
} from '@store/persistents';

import { useStore } from 'zustand';

import { sharedPersistentStore } from '@store/persistents';

export type PersistentStoreApi = ReturnType<typeof createPersistentStore>;

export const PersistentStoreContext = createContext<
  PersistentStoreApi | undefined
>(undefined);

export type PersistentStoreProviderProps = {
  children: ReactNode;
};

export const PersistentStoreProvider = ({
  children,
}: PersistentStoreProviderProps) => {
  const storeRef = useRef<PersistentStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = sharedPersistentStore;
  }

  return (
    <PersistentStoreContext value={storeRef.current}>
      {children}
    </PersistentStoreContext>
  );
};

export const usePersistentStore = <T,>(
  selector: (store: PersistentStore) => T,
): T => {
  const counterStoreContext = use(PersistentStoreContext);

  if (!counterStoreContext) {
    throw new Error(
      `usePersistentStore must be used within PersistentStoreProvider`,
    );
  }

  return useStore(counterStoreContext, selector);
};
