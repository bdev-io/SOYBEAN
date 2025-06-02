/* eslint-disable react-refresh/only-export-components */
'use client';

import { createContext, use, useRef } from 'react';
import type { ReactNode } from 'react';

import type { createSessionStore, SessionStore } from '@store/sessions';

import { useStore } from 'zustand';

import { sharedSessionStore } from '@store/sessions';

export type SessionStoreApi = ReturnType<typeof createSessionStore>;

export const SessionStoreContext = createContext<SessionStoreApi | undefined>(
  undefined,
);

export type SessionStoreProviderProps = {
  children: ReactNode;
};

export const SessionStoreProvider = ({
  children,
}: SessionStoreProviderProps) => {
  const storeRef = useRef<SessionStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = sharedSessionStore;
  }

  return (
    <SessionStoreContext value={storeRef.current}>
      {children}
    </SessionStoreContext>
  );
};

export const useSessionStore = <T,>(
  selector: (store: SessionStore) => T,
): T => {
  const counterStoreContext = use(SessionStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useSessionStore must be used within SessionStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
