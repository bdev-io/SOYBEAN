'use client';

import React, { Suspense, useEffect, useRef } from 'react';

import { useGlobalStore } from '@store/providers/GlobalStoreProvider';

import { ScrollArea } from '@comp/ui/scroll-area';

export default function ScrollAreaProvider({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const setScrollRef = useGlobalStore((s) => s.setScrollRef);

  useEffect(() => {
    setScrollRef(scrollRef);
  }, [scrollRef, setScrollRef]);

  return (
    <Suspense>
      <ScrollArea ref={scrollRef} className={className}>
        {children}
      </ScrollArea>
    </Suspense>
  );
}
