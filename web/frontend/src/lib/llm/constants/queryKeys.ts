export const messageKeys = {
  all: ['messages'] as const,
  thread: (threadId: string) => [...messageKeys.all, threadId] as const,
};

export const threadKeys = {
  all: ['threads'] as const,
};
