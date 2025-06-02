/* eslint-disable react-refresh/only-export-components */
'use client';

import { createContext, use, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import type { LLMResponse } from '@lib/tauri';
import type { createTauriStore, TauriStore } from '@store/tauri';
import type { Event } from '@tauri-apps/api/event';

import { useStore } from 'zustand';

import { events } from '@lib/tauri';
import { sharedTauriStore } from '@store/tauri';

// --------------------
// Context 정의
// --------------------
export type TauriStoreApi = ReturnType<typeof createTauriStore>;

export const TauriStoreContext = createContext<TauriStoreApi | undefined>(
  undefined,
);

export const useTauriStore = <T,>(selector: (store: TauriStore) => T): T => {
  const context = use(TauriStoreContext);
  if (!context) {
    throw new Error('useTauriStore must be used within a TauriStoreProvider');
  }
  return useStore(context, selector);
};

// --------------------
// 이벤트 구독 함수 (hook 사용 금지)
// --------------------
export const subscribeTauriSentEvent = async (
  store: TauriStoreApi,
): Promise<() => void> => {
  const unsubscribe = await events.llmResponse.listen(
    (event: Event<LLMResponse>) => {
      console.log('LLMResponse received:', event);
      store.getState().addLLMResponse(event.payload); // ✅ 안전하게 상태 접근
    },
  );

  return () => {
    unsubscribe();
  };
};

// --------------------
// 내부 Provider: 이벤트 구독
// --------------------
export const TauriStoreInnerEventProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const store = use(TauriStoreContext); // ✅ Hook은 컴포넌트 내부에서만 사용

  useEffect(() => {
    if (!store) {
      console.error('TauriStoreContext is not available');
      return;
    }

    let unsubscribeFn: (() => void) | undefined;

    subscribeTauriSentEvent(store)
      .then((unsub) => {
        unsubscribeFn = unsub;
      })
      .catch((err) => {
        console.error('Failed to subscribe to LLMResponse event:', err);
      });

    return () => {
      if (unsubscribeFn) {
        try {
          unsubscribeFn();
          console.log('Unsubscribed from LLMResponse event');
        } catch (err) {
          console.error('Error during unsubscription:', err);
        }
      }
    };
  }, [store]);

  return <>{children}</>;
};

// --------------------
// 최상위 Provider
// --------------------
export const TauriStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<TauriStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = sharedTauriStore;
  }

  return (
    <TauriStoreContext value={storeRef.current}>
      <TauriStoreInnerEventProvider>{children}</TauriStoreInnerEventProvider>
    </TauriStoreContext>
  );
};
