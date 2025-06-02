'use client';

import { startTransition } from 'react';

import { parseAsInteger, useQueryState } from 'nuqs';

import { useGlobalStore } from '@store/providers/GlobalStoreProvider';

export default function usePageParams({
  isScroll = true,
}: {
  isScroll?: boolean;
}) {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      history: 'push',
    }),
  );

  const { scrollToTop } = useGlobalStore((s) => s);

  const handlePage = (value: number) => {
    startTransition(async () => {
      await setPage(value);
    });

    if (!isScroll) return;

    scrollToTop();
  };

  return { handlePage, page };
}
