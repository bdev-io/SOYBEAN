import React from 'react';

import { cn } from '@lib/utils';

export function Card({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
} & React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex w-[100%] flex-1 items-center justify-center',
        'border-border bg-card hover:bg-card-hover focus-visible:ring-ring',
        'rounded-lg border p-4 shadow-sm',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
