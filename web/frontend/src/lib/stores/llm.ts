'use client';

/** DOC: 이 스토어는, 계속 값을 유지하고 있어야 하는 상태를 관리함. */

import type { ThreadMessageLike } from '@assistant-ui/react';

import { produce } from 'immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

interface LLMState {
  messages: ThreadMessageLike[];
  isRunning: boolean;
}

interface LLMActions {
  addMessage: (message: ThreadMessageLike) => void;
  setMessages: (messages: ThreadMessageLike[]) => void;
  setIsRunning: (isRunning: boolean) => void;
  updateMessage: (id: string, updates: Partial<ThreadMessageLike>) => void;

  resetState: () => void;
}

export type LLMStore = LLMState & LLMActions;

/** DOC: 초기 상태 */
export const llmStoreInitState: LLMState = {
  messages: [],
  isRunning: false,
};

export const createLLMStore = (initState: LLMState = llmStoreInitState) => {
  return createStore(
    persist(
      immer<LLMStore>((set, _get) => ({
        ...initState,

        addMessage: (message) => {
          set((state) =>
            produce(state, (draft) => {
              (draft.messages as ThreadMessageLike[]).push(message);
            }),
          );
        },

        setMessages: (messages) => {
          set((state) =>
            produce(state, (draft) => {
              (draft.messages as ThreadMessageLike[]) =
                messages as ThreadMessageLike[];
            }),
          );
        },

        setIsRunning: (isRunning) =>
          set((state) => {
            state.isRunning = isRunning;
          }),

        updateMessage: (id, updates) =>
          set((state) => {
            const index = state.messages.findIndex((m) => m.id === id);
            if (index !== -1) {
              Object.assign(state.messages[index], updates);
            }
          }),

        resetState: () => set(() => ({ ...initState })),
      })),
      {
        name: 'llm-store',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};

export const sharedLLMStore = createLLMStore();
