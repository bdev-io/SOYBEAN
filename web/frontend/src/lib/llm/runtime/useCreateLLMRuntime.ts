import { useExternalStoreRuntime } from '@assistant-ui/react';
import type {
  ExternalStoreThreadData,
  ThreadMessageLike,
} from '@assistant-ui/react';

export function useCreateLLMRuntime({
  messages,
  isRunning,
  setMessages,
  currentThreadId,
  threads,
  setCurrentThreadId,
}: {
  messages: ThreadMessageLike[];
  isRunning: boolean;
  onNew: (msg: ThreadMessageLike) => Promise<void>;
  setMessages: (m: ThreadMessageLike[]) => void;
  currentThreadId: string;
  threads: ExternalStoreThreadData<'regular'>[];
  setCurrentThreadId: (id: string) => void;
}) {
  return useExternalStoreRuntime({
    messages,
    isRunning,
    threads,
    setMessages,
    currentThreadId,
    setCurrentThreadId,
  });
}
