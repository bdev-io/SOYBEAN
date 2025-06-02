import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';

import { cn } from '@lib/utils/index';

const badgeVariants = cva(
  'inline-flex h-7 w-20 shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border px-2 py-0.5 text-sm font-medium transition-[color] [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent',
        green:
          'bg-green text-primary-foreground [a&]:hover:bg-secondary/90 border-transparent',
        orange:
          'bg-orange text-primary-foreground [a&]:hover:bg-secondary/90 border-transparent',
        select:
          'border-blue-light-active bg-blue-light text-gray-80 [a&]:hover:bg-secondary/90 border',
        destructive:
          'bg-destructive [a&]:hover:bg-destructive/90 dark:bg-destructive/60 border-transparent text-white',
        accent:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
