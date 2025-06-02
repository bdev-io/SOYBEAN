/** DOC: 이 스토어는, 계속 값을 유지하고 있어야 하는 상태를 관리함. */
'use client';

import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

interface SessionState {}

interface SessionActions {
  resetState: () => void;
}

export type SessionStore = SessionState & SessionActions;

/** DOC: 초기 상태 */
export const SessionStoreInitState: SessionState = {};

export const createSessionStore = (
  initState: SessionState = SessionStoreInitState,
) => {
  return createStore(
    persist<SessionStore>(
      (set) => ({
        ...initState,

        resetState: () => set({ ...initState }),
      }),
      {
        name: 'session-store',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
};

export const sharedSessionStore = createSessionStore();
