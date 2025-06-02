import type {
  ExternalStoreThreadData,
  ThreadMessageLike,
} from '@assistant-ui/react';
import { AssistantRuntimeProvider } from '@assistant-ui/react';
import React, { useState } from 'react';

import { useShallow } from 'zustand/shallow';

import { useLLMStore } from '@store/providers/LLMStoreProvider';

import { useCreateLLMRuntime } from '../runtime/useCreateLLMRuntime';
import { useLLMListener } from '../runtime/useLLMListener';
import { useMessageState } from '../runtime/useMessageState';

export function CustomAssistantRuntimeProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { messages, isRunning, addMessage, setMessages, setIsRunning } =
    useLLMStore(
      useShallow((state) => ({
        messages: state.messages,
        isRunning: state.isRunning,
        addMessage: state.addMessage,
        setMessages: state.setMessages,
        setIsRunning: state.setIsRunning,
      })),
    );
  const [currentThreadId, setCurrentThreadId] = useState('default');
  const [threads, setThreads] = useState<
    ExternalStoreThreadData<'regular' | 'archived'>[]
  >([{ threadId: 'default', status: 'regular', title: '기본 스레드' }]);

  const [isRunning, setIsRunning] = useState(false);

  const { messages, sendMessage, setMockMessageState } =
    useMessageState(currentThreadId);

  const addLLMMessage = (m: ThreadMessageLike) => {
    setMockMessageState((prev) => ({
      ...prev,
      [currentThreadId]: [...(prev[currentThreadId] ?? []), m],
    }));
  };

  const currentThread = threads.find((t) => t.threadId === currentThreadId);

  const runtime = useCreateLLMRuntime({
    messages,
    isRunning,
    setMessages,
    currentThreadId,
    threads,
    setCurrentThreadId,
  });
  useLLMListener(runtime, setIsRunning);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
