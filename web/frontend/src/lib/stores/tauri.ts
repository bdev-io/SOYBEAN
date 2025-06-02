'use client';

/** DOC: 이 스토어는, 계속 값을 유지하고 있어야 하는 상태를 관리함. */

import type { ThreadMessageLike } from '@assistant-ui/react';
import type { LLMResponse } from '@lib/tauri';

import { createStore } from 'zustand/vanilla';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface CustomLLMChatState {
  messages: ThreadMessageLike[];
  isRunning: boolean;
}

interface CustomLLMChatActions {
  addMessage: (message: ThreadMessageLike) => void;
  setMessages: (messages: ThreadMessageLike[]) => void;
  setIsRunning: (isRunning: boolean) => void;
  updateMessage: (id: string, updates: Partial<ThreadMessageLike>) => void;
}

interface TauriState {
  llmResponseQueue: LLMResponse[];
}

interface TauriActions {
  resetState: () => void;
  getLLMResponse: () => LLMResponse | undefined;
  addLLMResponse: (response: LLMResponse) => void;
}

export type TauriStore = TauriState & TauriActions;

/** DOC: 초기 상태 */
export const tauriStoreInitState: TauriState = {
  llmResponseQueue: [],
};

export const createTauriStore = (
  initState: TauriState = tauriStoreInitState,
) => {
  return createStore(
    immer(
      persist<TauriStore>(
        (set, _get) => ({
          ...initState,

          /// NOTE: LLM Custom Runtime 관리부



          /// NOTE: LLM 응답 관리부
          getLLMResponse: () => {
            let response: LLMResponse | undefined;
            set((state) => {
              response = state.llmResponseQueue.shift();
            });
            return response;
          },

          addLLMResponse: (response: LLMResponse) =>
            set((state) => {
              state.llmResponseQueue.push(response);
            }),

          resetState: () => set(() => ({ ...initState })),
        }),
        {
          name: 'tauri-store',
          storage: createJSONStorage(() => localStorage),
        },
      ),
    ),
  );
};

export const sharedTauriStore = createTauriStore();
