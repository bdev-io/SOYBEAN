'use client';

import { createStore } from 'zustand/vanilla';

interface GlobalState {
  isLoading: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null> | null;
}

interface GlobalActions {
  setLoading: (_: boolean) => void;
  setScrollRef: (scrollRef: React.RefObject<HTMLDivElement | null>) => void;
  scrollToTop: () => void;
}
export type GlobalStore = GlobalState & GlobalActions;

export const globalStoreInitState: GlobalState = {
  isLoading: false,
  scrollRef: null,
};

export const createGlobalStore = (
  initState: GlobalState = globalStoreInitState,
) => {
  return createStore<GlobalStore>((set, get) => ({
    ...initState,

    setLoading: (isLoading) =>
      set({
        isLoading,
      }),

    setScrollRef: (scrollRef) => set({ scrollRef }),
    scrollToTop: () => {
      const ref = get().scrollRef?.current;
      if (ref) {
        ref.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (!ref && typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
  }));
};

export const sharedGlobalStore = createGlobalStore();
