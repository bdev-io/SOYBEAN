import type { AssistantRuntime } from '@assistant-ui/react';
import { useEffect } from 'react';

import { useTauriStore } from '@store/providers/TauriProvider';

export function useLLMListener(
  runtime: AssistantRuntime,
  setIsRunning: (isRunning: boolean) => void,
) {
  const tauriStore = useTauriStore((s) => s);

  useEffect(() => {
    const llmResponse = tauriStore.getLLMResponse();

    if (llmResponse) {
      setIsRunning(true);
      runtime.thread.append(llmResponse.server_text || '응답 없음');
    }
  }, [tauriStore.llmResponseQueue]);
}
