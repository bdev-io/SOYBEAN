/** DOC: 이 스토어는, 계속 값을 유지하고 있어야 하는 상태를 관리함. */
'use client';

import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

interface PersistentState {
  hasHydrated: boolean;
}

interface PersistentActions {
  setHasHydrated: (hasHydrated: boolean) => void;
  resetState: () => void;
}

export type PersistentStore = PersistentState & PersistentActions;

/** DOC: 초기 상태 */
export const PersistentStoreInitState: PersistentState = {
  hasHydrated: false,
};

export const createPersistentStore = (
  initState: PersistentState = PersistentStoreInitState,
) => {
  return createStore(
    persist<PersistentStore>(
      (set) => ({
        ...initState,
        setHasHydrated: (hasHydrated) =>
          set({
            hasHydrated,
          }),
        resetState: () => set({ ...initState }),
      }),
      {
        name: 'persistent-store',
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => {
          return (state, error) => {
            if (error) {
              console.error('Rehydrate error', error);
            } else if (state) {
              state.setHasHydrated(true);
            }
          };
        },
      },
    ),
  );
};

export const sharedPersistentStore = createPersistentStore();
