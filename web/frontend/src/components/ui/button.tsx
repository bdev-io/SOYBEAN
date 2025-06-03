import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';

import { cn } from '@lib/utils/index';

const buttonVariants = cva(
  "aria-invalid:border-destructive font-button2-medium inline-flex shrink-0 cursor-pointer items-center justify-center gap-[4px] whitespace-nowrap rounded-[6px] outline-none transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          'bg-primary bg-blue-normal text-primary-foreground disabled:bg-blue-light-active disabled:border-blue-light-active hover:bg-blue-normal-hover disabled:border',
        destructive:
          'bg-destructive hover:bg-destructive/90 dark:bg-destructive/60 text-primary-foreground text-white',
        outline:
          'text-gray-70 border-gray-30 disabled:text-gray-40 bg-background hover:text-gray-80 disabled:bg-gray-5 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border',
        primaryOutline:
          'text-primary border-primary disabled:text-gray-30 bg-background hover:text-blue-normal-hover hover:border-blue-normal-hover disabled:bg-gray-5 disabled:border-gray-20 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border',
        secondary:
          'text-secondary-foreground bg-secondary hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 border',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        /** sm < md < default < lg */
        default: 'h-[44px] px-[24px] py-[10px]',
        sm: 'h-[32px] px-[12px] py-[4px]',
        md: 'h-[40px] px-[24px] py-[8px]',
        lg: 'h-[48px] px-[24px] py-[12px]',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
