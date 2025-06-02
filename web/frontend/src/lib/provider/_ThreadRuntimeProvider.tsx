/* eslint-disable react-refresh/only-export-components */
import {
  AssistantRuntimeProvider,
  useExternalStoreRuntime,
} from '@assistant-ui/react';
import type {
  AppendMessage,
  ExternalStoreThreadData,
  ThreadMessageLike,
} from '@assistant-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { useTauriStore } from '@store/providers/TauriProvider';

export const messageKeys = {
  all: ['messages'] as const,
  thread: (threadId: string) => [...messageKeys.all, threadId] as const,
};

export const threadKeys = {
  all: ['threads'] as const,
};

// TODO: tauri와 zustand 구독 형태로 추후 변경(key값 정해지고 기능구현때 수정)
export function TanStackQueryRuntimeProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  const tauriStore = useTauriStore((store) => store);

  const [currentThreadId, setCurrentThreadId] = useState('default');
  const [mockThreads, setMockThreads] = useState<
    ExternalStoreThreadData<'regular'>[]
  >([{ threadId: 'default', status: 'regular', title: '기본 스레드' }]);

  const [mockMessageState, setMockMessageState] = useState<
    Record<string, ThreadMessageLike[]>
  >(() => ({
    default: [],
  }));

  const { data: messages = [] } = useQuery({
    queryKey: messageKeys.thread(currentThreadId),
    queryFn: async (): Promise<ThreadMessageLike[]> => {
      await new Promise((r) => setTimeout(r, 100));
      return mockMessageState[currentThreadId] ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const convertMessage = (message: ThreadMessageLike): ThreadMessageLike => ({
    ...message,
  });

  const sendMessage = useMutation({
    mutationFn: async (message: AppendMessage): Promise<ThreadMessageLike> => {
      const input =
        message.content[0]?.type === 'text'
          ? message.content[0].text
          : '입력 없음';
      // NOTE: 호출
      // await events.llmInputEvent.emit({
      //   user_input: input,
      // });

      const response: ThreadMessageLike = {
        role: 'assistant',
        content: [
          { type: 'text', text: `🧪 모의 응답: "${input}"에 대한 응답입니다.` },
        ],
        id: `mock-${Date.now()}`,
        createdAt: new Date(),
      };
      setMockMessageState((prev) => ({
        ...prev,
        [currentThreadId]: [...(prev[currentThreadId] ?? []), response],
      }));
      return response;
    },

    onMutate: async (message: AppendMessage) => {
      await queryClient.cancelQueries({
        queryKey: messageKeys.thread(currentThreadId),
      });
      const previousMessages = queryClient.getQueryData<ThreadMessageLike[]>(
        messageKeys.thread(currentThreadId),
      );
      const optimisticMessage: ThreadMessageLike = {
        role: 'user',
        content: message.content,
        id: `temp-${Date.now()}`,
        createdAt: new Date(),
      };
      queryClient.setQueryData<ThreadMessageLike[]>(
        messageKeys.thread(currentThreadId),
        (old = []) => [...old, optimisticMessage],
      );
      setMockMessageState((prev) => ({
        ...prev,
        [currentThreadId]: [
          ...(prev[currentThreadId] ?? []),
          optimisticMessage,
        ],
      }));
      return { previousMessages, tempId: optimisticMessage.id };
    },

    onSuccess: (response, variables, context) => {
      queryClient.setQueryData<ThreadMessageLike[]>(
        messageKeys.thread(currentThreadId),
        (old = []) =>
          old
            .filter((m) => m.id !== context?.tempId)
            .concat([
              {
                role: 'user',
                content: variables.content,
                id: `user-${Date.now()}`,
                createdAt: new Date(),
              },
              response,
            ]),
      );
    },
    onError: (error, variables, context) => {
      console.error('💥 Message 전송 중 오류 발생:', error);
      if (context?.previousMessages) {
        queryClient.setQueryData(
          messageKeys.thread(currentThreadId),
          context.previousMessages,
        );
        setMockMessageState((prev) => ({
          ...prev,
          [currentThreadId]: context.previousMessages ?? [],
        }));
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: messageKeys.thread(currentThreadId),
      });
    },
  });

  const addLLMMessage = (message: ThreadMessageLike) => {
    setMockMessageState((prev) => ({
      ...prev,
      [currentThreadId]: [...(prev[currentThreadId] ?? []), message],
    }));
  };

  useEffect(() => {
    const llmResponse = tauriStore.getLLMResponse();

    if (llmResponse) {
      console.log('LLMResponse :', llmResponse);

      const optimisticMessage: ThreadMessageLike = {
        role: 'assistant',
        content: llmResponse.server_text,
        id: `temp-${Date.now()}`,
        createdAt: new Date(),
      };
      addLLMMessage(optimisticMessage);
    }
  }, [tauriStore.llmResponseQueue]);

  const runtime = useExternalStoreRuntime({
    messages,
    isRunning: sendMessage.isPending,
    onNew: async (message) => {
      await sendMessage.mutateAsync(message);
    },
    setMessages: (newMessages) => {
      queryClient.setQueryData(
        messageKeys.thread(currentThreadId),
        newMessages,
      );
      setMockMessageState((prev) => ({
        ...prev,
        [currentThreadId]: newMessages,
      }));
    },
    convertMessage,
    adapters: {
      threadList: {
        threadId: currentThreadId,
        threads: mockThreads.filter((t) => t.status === 'regular'),
        onSwitchToNewThread: () => {
          const newId = `thread-${Date.now()}`;
          const newThread: ExternalStoreThreadData<'regular'> = {
            threadId: newId,
            status: 'regular',
            title: '추가 스레드',
          };
          setMockThreads((prev) => [...prev, newThread]);
          setMockMessageState((prev) => ({ ...prev, [newId]: [] }));
          setCurrentThreadId(newId);
        },
        onSwitchToThread: (threadId) => {
          setCurrentThreadId(threadId);
        },
        onRename: (threadId, newTitle) => {
          setMockThreads((prev) =>
            prev.map((t) =>
              t.threadId === threadId ? { ...t, title: newTitle } : t,
            ),
          );
        },
        onDelete: (threadId) => {
          setMockThreads((prev) => prev.filter((t) => t.threadId !== threadId));
          setMockMessageState((prev) => {
            const next = { ...prev };
            delete next[threadId];
            return next;
          });
          if (threadId === currentThreadId) {
            setCurrentThreadId('default');
          }
        },
      },
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
