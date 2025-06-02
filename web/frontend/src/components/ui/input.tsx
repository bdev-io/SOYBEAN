import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';

import { cn } from '@src/lib/utils';

const inputVariants = cva(
  'placeholder:text-gary-40 font-body2-regular hover:border-blue-normal-hover focus-visible:border-blue-normal-active disabled:border-gray-30 disabled:bg-gray-5 aria-invalid:focus-visible:ring-0 aria-invalid:focus-visible:outline-none flex h-full w-full min-w-0 bg-transparent px-[12px] py-[10px] text-black outline-none outline-none transition-[color,box-shadow,border,outline,ring] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:text-black disabled:pointer-events-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'border-gray-30 aria-invalid:border-error rounded-md border ring-[#D6E1FF] focus-visible:ring-2',
        underline:
          'border-gray-30 aria-invalid:border-b-error rounded-none border-b ring-offset-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        inputVariants({
          variant,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Input };
