import type { AppendMessage, ThreadMessageLike } from '@assistant-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { messageKeys } from '@lib/llm/constants/queryKeys';

export function useStoreIntegration(currentThreadId: string) {
  const queryClient = useQueryClient();
  const [mockMessageState, setMockMessageState] = useState<
    Record<string, ThreadMessageLike[]>
  >({
    [currentThreadId]: [],
  });

  const { data: messages = [] } = useQuery({
    queryKey: messageKeys.thread(currentThreadId),
    queryFn: async (): Promise<ThreadMessageLike[]> => {
      await new Promise((r) => setTimeout(r, 100));
      return mockMessageState[currentThreadId] ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const sendMessage = useMutation({
    mutationFn: async (message: AppendMessage): Promise<ThreadMessageLike> => {
      const input =
        message.content[0]?.type === 'text'
          ? message.content[0].text
          : '입력 없음';

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

      const optimisticMessage: ThreadMessageLike = {
        role: 'user',
        content: message.content,
        id: `temp-${Date.now()}`,
        createdAt: new Date(),
      };

      setMockMessageState((prev) => ({
        ...prev,
        [currentThreadId]: [
          ...(prev[currentThreadId] ?? []),
          optimisticMessage,
        ],
      }));

      queryClient.setQueryData<ThreadMessageLike[]>(
        messageKeys.thread(currentThreadId),
        (old = []) => [...old, optimisticMessage],
      );

      return {
        previousMessages: queryClient.getQueryData(
          messageKeys.thread(currentThreadId),
        ),
        tempId: optimisticMessage.id,
      };
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
    onError: (error, _, context) => {
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

  return { messages, sendMessage, setMockMessageState };
}
